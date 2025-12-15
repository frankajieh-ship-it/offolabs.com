# OFFO Launch™ API Documentation

Production-ready REST API for permit and inspection tracking.

## Base URL
```
/api
```

## Authentication
Currently using localStorage for MVP. Production will implement JWT-based authentication.

---

## Launch Endpoints

### `GET /api/launch`
Fetch all launches with optional filtering.

**Query Parameters:**
- `type` (optional): Filter by launch type (`restaurant`, `retail`, `medical`, `fitness`)
- `status` (optional): Filter by status (`active`, `completed`, `overdue`)

**Response:**
```json
{
  "launches": [
    {
      "id": "launch_001",
      "name": "Ember & Oak Restaurant",
      "location": "Downtown San Francisco",
      "address": "245 Market Street, San Francisco, CA 94105",
      "type": "restaurant",
      "targetOpenDate": "2025-01-30T00:00:00.000Z",
      "createdAt": "2024-10-17T00:00:00.000Z",
      "readinessScore": 68,
      "permits": [...],
      "permitsByType": {...}
    }
  ],
  "stats": {
    "total": 5,
    "active": 3,
    "completed": 1,
    "averageReadiness": 72
  }
}
```

**Status Codes:**
- `200` - Success
- `500` - Server error

---

### `POST /api/launch`
Create a new launch.

**Request Body:**
```json
{
  "name": "New Restaurant Launch",
  "location": "San Francisco",
  "address": "123 Main St, San Francisco, CA 94102",
  "type": "restaurant",
  "targetOpenDate": "2025-06-15",
  "permits": [
    {
      "type": "health",
      "title": "Health Permit",
      "priority": "critical",
      "estimatedProcessingDays": 14,
      "agency": "County Health Dept"
    }
  ]
}
```

**Response:**
```json
{
  "launch": {
    "id": "launch_1734253820000",
    "name": "New Restaurant Launch",
    "readinessScore": 0,
    ...
  }
}
```

**Status Codes:**
- `201` - Created
- `400` - Invalid request (missing required fields)
- `500` - Server error

---

### `GET /api/launch/[id]`
Fetch a single launch with metadata.

**Response:**
```json
{
  "launch": {...},
  "metadata": {
    "daysUntilOpen": 45,
    "isOverdue": false,
    "permitStats": {
      "total": 6,
      "approved": 2,
      "pending": 3,
      "critical": 2,
      "overdue": 1
    }
  }
}
```

**Status Codes:**
- `200` - Success
- `404` - Launch not found
- `500` - Server error

---

### `PATCH /api/launch/[id]`
Update launch details.

**Request Body:**
```json
{
  "name": "Updated Name",
  "targetOpenDate": "2025-07-01"
}
```

**Response:**
```json
{
  "launch": {...}
}
```

**Status Codes:**
- `200` - Success
- `404` - Launch not found
- `500` - Server error

---

### `DELETE /api/launch/[id]`
Delete a launch and all associated permits.

**Response:**
```json
{
  "success": true,
  "deletedLaunch": {
    "id": "launch_001",
    "name": "Ember & Oak Restaurant",
    "permitCount": 6
  }
}
```

**Status Codes:**
- `200` - Success
- `404` - Launch not found
- `500` - Server error

---

## Permit Endpoints

### `GET /api/launch/[id]/permits`
Fetch all permits for a launch.

**Response:**
```json
{
  "permits": [
    {
      "id": "permit_001",
      "launchId": "launch_001",
      "type": "health",
      "title": "Health Department Permit",
      "status": "inspection_passed",
      "priority": "critical",
      ...
    }
  ],
  "metadata": {
    "total": 6,
    "approved": 2,
    "pending": 3,
    "critical": 2
  }
}
```

**Status Codes:**
- `200` - Success
- `404` - Launch not found
- `500` - Server error

---

### `POST /api/launch/[id]/permits`
Create a new permit.

**Request Body:**
```json
{
  "type": "fire",
  "title": "Fire Safety Inspection",
  "description": "Annual fire safety compliance",
  "priority": "critical",
  "estimatedProcessingDays": 10,
  "agency": "City Fire Department",
  "applicationDeadline": "2025-02-01"
}
```

**Response:**
```json
{
  "permit": {
    "id": "permit_new_123",
    "status": "not_started",
    "createdAt": "2024-12-15T10:00:00.000Z",
    ...
  }
}
```

**Status Codes:**
- `201` - Created
- `400` - Invalid request (missing required fields)
- `404` - Launch not found
- `500` - Server error

---

### `GET /api/launch/[id]/permits/[permitId]`
Fetch a single permit.

**Response:**
```json
{
  "permit": {...}
}
```

**Status Codes:**
- `200` - Success
- `404` - Launch or permit not found
- `500` - Server error

---

### `PATCH /api/launch/[id]/permits/[permitId]`
Update a permit with status transition validation.

**Request Body:**
```json
{
  "status": "scheduled",
  "inspectionDate": "2025-01-20",
  "inspectorName": "John Smith",
  "inspectorContact": "jsmith@fire.gov"
}
```

**Response:**
```json
{
  "permit": {...},
  "launch": {
    "id": "launch_001",
    "readinessScore": 75
  }
}
```

**Status Codes:**
- `200` - Success
- `400` - Invalid status transition
- `404` - Launch or permit not found
- `500` - Server error

**Error Response (Invalid Transition):**
```json
{
  "error": "Invalid status transition",
  "detail": "Cannot transition from 'approved' to 'scheduled'",
  "allowedTransitions": []
}
```

---

### `DELETE /api/launch/[id]/permits/[permitId]`
Delete a permit.

**Response:**
```json
{
  "success": true,
  "deletedPermit": {...},
  "launch": {
    "id": "launch_001",
    "readinessScore": 70,
    "permitCount": 5
  }
}
```

**Status Codes:**
- `200` - Success
- `404` - Launch or permit not found
- `500` - Server error

---

## Status Workflow

### Valid Status Transitions

```
not_started
  └─> application_submitted
       ├─> scheduled
       │    ├─> inspection_passed
       │    │    ├─> approved ✓ (terminal)
       │    │    └─> scheduled (re-inspect)
       │    ├─> inspection_failed
       │    │    ├─> scheduled (retry)
       │    │    └─> rejected ✗
       │    └─> not_started (reset)
       └─> rejected ✗
            └─> not_started (restart)
```

**Status Definitions:**
- `not_started` - Initial state, no action taken
- `application_submitted` - Application filed with agency
- `scheduled` - Inspection scheduled with date/inspector
- `inspection_passed` - Inspection completed successfully
- `inspection_failed` - Inspection failed, corrective actions required
- `approved` - ✓ Final approval granted (terminal state)
- `rejected` - ✗ Application/permit rejected

---

## Readiness Score Calculation

The readiness score is automatically recalculated on permit updates:

```javascript
// Base score: percentage of approved permits
const baseScore = (approvedCount / totalCount) * 100;

// Critical bonus: extra weight for critical permits
const criticalBonus = (criticalApproved / criticalTotal) * 20;

// Final score (0-100)
readinessScore = Math.min(100, Math.round(baseScore * 0.8 + criticalBonus));
```

**Score Thresholds:**
- `80-100` - Green (Ready to launch)
- `60-79` - Yellow (On track)
- `0-59` - Red (At risk)

---

## Client Usage Examples

### Using the API Client Library

```typescript
import { launchApi, permitApi } from '@/lib/api/launch';

// Fetch all launches
const { data, error } = await launchApi.list();

// Get launch with metadata
const result = await launchApi.get('launch_001');

// Create new launch
const created = await launchApi.create({
  name: 'New Restaurant',
  location: 'Downtown',
  address: '123 Main St',
  type: 'restaurant',
  targetOpenDate: '2025-06-15'
});

// Update permit status
const updated = await permitApi.updateStatus(
  'launch_001',
  'permit_001',
  'scheduled'
);

// Add inspector note
await permitApi.addNote(
  'launch_001',
  'permit_001',
  'Kitchen equipment meets all standards'
);

// Validate transition before calling API
import { isValidStatusTransition } from '@/lib/api/launch';

if (isValidStatusTransition(currentStatus, newStatus)) {
  await permitApi.updateStatus(launchId, permitId, newStatus);
}
```

---

## Error Handling

All endpoints return errors in consistent format:

```json
{
  "error": "Error message",
  "detail": "Additional details (optional)"
}
```

**Common Error Codes:**
- `400` - Bad Request (validation failed)
- `404` - Not Found (resource doesn't exist)
- `500` - Internal Server Error

---

## Rate Limiting

Not implemented in MVP. Production will enforce:
- 100 requests per minute per IP
- 1000 requests per hour per user

---

## Future Enhancements

1. **File Uploads**: `/api/launch/[id]/permits/[permitId]/files`
2. **Webhooks**: Real-time notifications for status changes
3. **Batch Operations**: Update multiple permits at once
4. **Search**: Full-text search across launches and permits
5. **Analytics**: `/api/launch/analytics` for insights
6. **Export**: PDF/Excel export of launch reports

---

## Migration from localStorage to Database

Current MVP uses localStorage. To migrate to a database:

1. Replace `getLaunches()` / `saveLaunches()` in route handlers
2. Use Prisma/Drizzle ORM for database operations
3. Add database connection pooling
4. Implement transaction support for multi-step operations
5. Add database-level constraints and indexes

**Example Migration:**
```typescript
// Before (localStorage)
const launches = getLaunches();

// After (database)
const launches = await db.launch.findMany({
  include: { permits: true }
});
```

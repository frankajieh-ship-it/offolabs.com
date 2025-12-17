# OFFO Launch Platform - Backend Server

Enterprise-grade Node.js/Express backend for the OFFO Launch permit and inspection management platform.

## Features

- **RESTful API** - Complete CRUD operations for projects, permits, and inspections
- **Real-time Updates** - Socket.IO integration for live collaboration
- **Authentication** - JWT-based auth with bcrypt password hashing
- **Municipal Integrations** - Framework for syncing with government APIs
- **Automated Notifications** - Email (nodemailer) and SMS (Twilio) support
- **Background Jobs** - Automated permit syncing and renewal reminders
- **MongoDB/Mongoose** - Robust data modeling with indexes
- **Security** - Helmet, CORS, input validation with express-validator

## Tech Stack

- **Node.js 18+** with ES6 modules
- **Express.js 5.2.1** - Web framework
- **MongoDB** - Database
- **Mongoose 9.0.1** - ODM
- **Socket.IO 4.8.1** - Real-time communication
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Nodemailer** - Email notifications
- **Twilio** - SMS notifications

## Quick Start

### Prerequisites

- Node.js 18 or higher
- MongoDB (local or Atlas)

### Installation

```bash
cd server
npm install
```

### Configuration

1. Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

2. Update `.env` with your configuration:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/offo-launch
CLIENT_URL=http://localhost:3000
JWT_SECRET=your_secure_jwt_secret_here
```

### Run Development Server

```bash
npm run dev
```

Server will start on `http://localhost:5000`

### Run Production Server

```bash
npm start
```

## API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication

All protected routes require a JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

### API Endpoints

#### **Authentication** (`/api/auth`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/register` | Register new user | No |
| POST | `/login` | Login user | No |
| GET | `/me` | Get current user | Yes |
| PUT | `/profile` | Update user profile | Yes |
| PUT | `/password` | Change password | Yes |
| POST | `/logout` | Logout | Yes |

#### **Projects** (`/api/projects`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/` | List all user projects | Yes |
| POST | `/` | Create new project | Yes |
| GET | `/:id` | Get project details with stats | Yes |
| PUT | `/:id` | Update project | Yes |
| POST | `/:id/team` | Add team member | Yes |

#### **Permits** (`/api/permits`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/project/:projectId` | Get permits for project | Yes |
| POST | `/` | Create new permit | Yes |
| GET | `/:id` | Get permit details | Yes |
| PUT | `/:id` | Update permit | Yes |
| PATCH | `/:id/status` | Update permit status | Yes |
| POST | `/:id/documents` | Upload document | Yes |
| POST | `/:id/sync` | Sync with government API | Yes |
| DELETE | `/:id` | Delete permit | Yes |

#### **Inspections** (`/api/inspections`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/permit/:permitId` | Get inspections for permit | Yes |
| GET | `/:id` | Get inspection details | Yes |
| POST | `/` | Create new inspection | Yes |
| PUT | `/:id` | Update inspection | Yes |
| PATCH | `/:id/status` | Update inspection status | Yes |
| POST | `/:id/checklist` | Add checklist item | Yes |
| POST | `/:id/findings` | Add finding | Yes |
| PATCH | `/:id/findings/:findingId` | Update finding status | Yes |
| POST | `/:id/attendees` | Add attendee | Yes |
| DELETE | `/:id` | Delete inspection | Yes |

#### **Notifications** (`/api/notifications`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/` | Get user notifications | Yes |
| GET | `/unread` | Get unread count | Yes |
| PATCH | `/:id/read` | Mark as read | Yes |
| PATCH | `/read-all` | Mark all as read | Yes |
| DELETE | `/:id` | Delete notification | Yes |
| DELETE | `/` | Delete all read | Yes |

### Health Check

```bash
GET /api/health
```

Response:
```json
{
  "status": "healthy",
  "timestamp": "2025-12-16T00:00:00.000Z",
  "version": "1.0.0"
}
```

## Database Models

### User
- Authentication with bcrypt
- Role-based access (admin, project_manager, inspector, contractor, viewer)
- Notification preferences

### Project
- Launch project tracking
- Team collaboration
- Geo-indexed location data

### Permit
- Comprehensive permit lifecycle management
- Document tracking
- Automated sync with government systems
- Timeline tracking

### Inspection
- Scheduling and checklist management
- Findings and corrective actions
- Attendee management

### Notification
- Multi-channel (email, SMS, in-app)
- Status tracking
- Metadata for context

## Real-Time Features (Socket.IO)

### Events

**Client to Server:**
- `project:join` - Join project room
- `project:leave` - Leave project room
- `permit:comment` - Post comment
- `permit:typing` - Typing indicator
- `project:presence` - Announce presence

**Server to Client:**
- `project:updated` - Project changed
- `permit:created` - New permit
- `permit:updated` - Permit changed
- `permit:status_changed` - Status update
- `permit:comment:new` - New comment
- `inspection:created` - New inspection
- `inspection:status_changed` - Inspection status update
- `project:user:joined` - User joined
- `project:user:left` - User left

### Connection Example

```javascript
import io from 'socket.io-client';

const socket = io('http://localhost:5000', {
  auth: {
    token: 'your_jwt_token'
  }
});

// Join a project room
socket.emit('project:join', projectId);

// Listen for updates
socket.on('permit:updated', (permit) => {
  console.log('Permit updated:', permit);
});
```

## Background Services

### Automated Tasks

1. **Permit Sync** (every 6 hours)
   - Syncs permit status with government APIs
   - Updates expiry dates and statuses

2. **Inspection Reminders** (hourly)
   - Checks for upcoming inspections (24-48 hours)
   - Sends email/SMS notifications

3. **Expiry Checks** (daily)
   - Identifies permits expiring within 30 days
   - Marks as requiring renewal

## Integration Service

Framework for connecting with municipal government APIs:

- Health Department
- Fire Department
- Building Department
- Zoning Department

### Sync Functions

```javascript
import { syncPermitStatus, submitPermit, scheduleInspection } from './services/integrationService.js';

// Sync permit status
await syncPermitStatus(permitId);

// Submit new permit
await submitPermit(permitId);

// Schedule inspection
await scheduleInspection(inspectionId);
```

## Notification Service

### Email Notifications

```javascript
import notificationService from './services/notificationService.js';

await notificationService.sendEmailNotification(
  user,
  'Subject',
  '<html>content</html>',
  'system'
);
```

### SMS Notifications

```javascript
await notificationService.sendSMSNotification(
  user,
  'Your message'
);
```

### In-App Notifications

```javascript
await notificationService.sendInAppNotification(
  user,
  'Title',
  'Content',
  { type: 'alert', link: '/path' }
);
```

## Security

- **JWT Authentication** - Secure token-based auth
- **Password Hashing** - Bcrypt with salt rounds of 12
- **Input Validation** - express-validator on all routes
- **CORS** - Configured for frontend origin
- **Helmet** - Security headers
- **Rate Limiting** - (TODO: Add rate limiting)

## Error Handling

All routes return consistent error responses:

```json
{
  "error": "Error message"
}
```

With appropriate HTTP status codes:
- 400 - Bad Request (validation errors)
- 401 - Unauthorized
- 403 - Forbidden
- 404 - Not Found
- 500 - Internal Server Error

## Development

### Scripts

```bash
# Development with auto-reload
npm run dev

# Production
npm start

# Test (TODO)
npm test
```

### Project Structure

```
server/
├── src/
│   ├── middleware/
│   │   └── auth.js          # Authentication middleware
│   ├── models/
│   │   ├── User.js          # User model
│   │   ├── Project.js       # Project model
│   │   ├── Permit.js        # Permit model
│   │   ├── Inspection.js    # Inspection model
│   │   └── Notification.js  # Notification model
│   ├── routes/
│   │   ├── auth.js          # Auth routes
│   │   ├── projects.js      # Project routes
│   │   ├── permits.js       # Permit routes
│   │   ├── inspections.js   # Inspection routes
│   │   └── notifications.js # Notification routes
│   ├── services/
│   │   ├── socketService.js      # Socket.IO setup
│   │   ├── integrationService.js # Municipal API integration
│   │   ├── notificationService.js# Email/SMS notifications
│   │   └── scheduler.js          # Background jobs
│   └── server.js            # Main server file
├── .env                     # Environment variables (git-ignored)
├── .env.example             # Example environment config
├── package.json             # Dependencies
└── README.md                # This file
```

## Deployment

### MongoDB Atlas Setup

1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create cluster
3. Get connection string
4. Update `MONGODB_URI` in `.env`

### Environment Variables for Production

```env
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/offo-launch
JWT_SECRET=very_secure_random_string_here
CLIENT_URL=https://yourdomain.com
```

### Deploy to Cloud

**Heroku:**
```bash
heroku create offo-launch-api
heroku config:set MONGODB_URI=your_mongodb_uri
heroku config:set JWT_SECRET=your_jwt_secret
git push heroku main
```

**Railway/Render/Fly.io:**
- Set environment variables in dashboard
- Connect GitHub repo
- Deploy automatically

## Future Enhancements

- [ ] Rate limiting
- [ ] API documentation with Swagger/OpenAPI
- [ ] Unit and integration tests
- [ ] Document upload to S3/CloudFlare R2
- [ ] Webhook support for government APIs
- [ ] Analytics and reporting endpoints
- [ ] Audit logging
- [ ] Multi-tenancy support

## License

Proprietary - OFFO LAB

## Support

For issues or questions, contact: support@offolab.com

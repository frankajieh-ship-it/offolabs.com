# OFFO Launch Platform - Frontend Implementation

Enterprise-grade React/Next.js frontend for the OFFO Launch™ permit and inspection management platform.

## Features

- **Dual-Mode Operation** - Works in demo mode (localStorage) or connected to backend API
- **Real-time Collaboration** - Socket.IO integration for live updates
- **Authentication** - JWT-based auth with React Context
- **Project Management** - Complete CRUD for projects, permits, and inspections
- **Document Management** - Drag & drop file uploads with progress tracking
- **Responsive Design** - Mobile-first Tailwind CSS design
- **TypeScript** - Full type safety across the application

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **React Query (@tanstack/react-query)** - Server state management
- **Socket.IO Client** - Real-time communication
- **Axios** - HTTP client with interceptors
- **React Hook Form** - Form management
- **React Dropzone** - File upload handling
- **React Hot Toast** - Toast notifications
- **Lucide React** - Modern icon library
- **Recharts** - Data visualization

## Project Structure

```
frontend/
├── src/
│   ├── services/
│   │   └── api.ts                 # API service with demo mode support
│   ├── contexts/
│   │   ├── AuthContext.tsx        # Authentication context
│   │   └── SocketContext.tsx      # Real-time socket context
│   ├── types/
│   │   └── index.ts               # TypeScript types
│   ├── components/
│   │   ├── DocumentUpload.tsx     # Drag & drop file uploads
│   │   ├── PermitCard.tsx         # Permit display component
│   │   ├── StatsGrid.tsx          # Dashboard statistics
│   │   └── TimelineChart.tsx      # Project timeline
│   └── pages/
│       └── ProjectDetail.tsx      # Project detail page
├── app/
│   ├── launch/
│   │   ├── page.tsx               # Launch dashboard
│   │   ├── [launchId]/
│   │   │   └── page.tsx           # Individual project view
│   │   └── new/
│   │       └── page.tsx           # Create new project
│   ├── layout.tsx                 # Root layout with providers
│   └── globals.css                # Global styles
├── package.json
└── LAUNCH_PLATFORM.md             # This file
```

## Quick Start

### Prerequisites

- Node.js 18 or higher
- Backend server running (optional - works in demo mode)

### Installation

```bash
cd frontend
npm install
```

### Environment Configuration

Create `.env.local` file:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:5000

# Demo Mode (set to 'true' to use local storage instead of API)
NEXT_PUBLIC_DEMO_MODE=false
```

### Run Development Server

```bash
npm run dev
```

Frontend will start on `http://localhost:3000`

### Build for Production

```bash
npm run build
npm start
```

## Core Services

### API Service (`src/services/api.ts`)

Unified API service that supports both demo mode and real backend:

```typescript
import { api } from '@/src/services/api';

// Projects
const projects = await api.getProjects();
const project = await api.getProject(id);
await api.createProject(data);
await api.updateProject(id, data);

// Permits
const permits = await api.getPermits(projectId);
const permit = await api.getPermit(id);
await api.updatePermit(id, data);
await api.syncPermit(id);  // Sync with government APIs

// Inspections
const inspections = await api.getInspections(filters);
await api.scheduleInspection(data);

// Documents
await api.uploadDocument(permitId, file);

// Notifications
const notifications = await api.getNotifications();
await api.markNotificationAsRead(id);

// Auth
await api.login(email, password);
await api.register(data);
const user = await api.getUserProfile();
```

**Demo Mode Features:**
- Stores data in `localStorage`
- Pre-populated with sample data
- No backend required for testing
- Perfect for demonstrations and prototyping

### Authentication Context

```typescript
import { useAuth } from '@/src/contexts/AuthContext';

function MyComponent() {
  const { user, token, login, logout, isAuthenticated, isLoading } = useAuth();

  const handleLogin = async () => {
    await login('user@example.com', 'password');
  };

  return (
    <div>
      {isAuthenticated ? (
        <p>Welcome, {user?.name}!</p>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
    </div>
  );
}
```

### Socket.IO Context

```typescript
import { useSocket } from '@/src/contexts/SocketContext';

function ProjectView({ projectId }: { projectId: string }) {
  const { joinProject, leaveProject, sendComment } = useSocket();

  useEffect(() => {
    joinProject(projectId);
    return () => leaveProject(projectId);
  }, [projectId]);

  const handleComment = (comment: string) => {
    sendComment(projectId, permitId, comment);
  };

  return (
    // Your component JSX
  );
}
```

**Socket Events Handled:**
- `permit:updated` - Permit status changes
- `permit:comment:new` - New comments
- `project:updated` - Project changes
- `project:user:joined` - User presence
- `inspection:created` - New inspections
- `inspection:status_changed` - Inspection updates

## Components

### DocumentUpload Component

```typescript
import DocumentUpload from '@/src/components/DocumentUpload';

<DocumentUpload
  projectId={projectId}
  permitId={permitId}
/>
```

**Features:**
- Drag & drop interface
- Progress tracking
- File type validation (PDF, images, Word, Excel)
- Size limit (10MB per file)
- Category organization
- Preview and download

### PermitCard Component

```typescript
import PermitCard from '@/src/components/PermitCard';

<PermitCard
  permit={permit}
  onSync={() => handleSync(permit.id)}
  onStatusUpdate={(status) => handleStatusUpdate(permit.id, status)}
  onClick={() => router.push(`/permits/${permit.id}`)}
/>
```

## Using React Query

```typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/src/services/api';

function ProjectsPage() {
  const queryClient = useQueryClient();

  // Fetch projects
  const { data: projects, isLoading } = useQuery(
    ['projects'],
    () => api.getProjects()
  );

  // Create project mutation
  const createMutation = useMutation(
    (data) => api.createProject(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['projects']);
        toast.success('Project created!');
      }
    }
  );

  return (
    // Your component JSX
  );
}
```

## Routing Structure

- `/` - Main landing page
- `/launch` - Launch dashboard (projects list)
- `/launch/new` - Create new project
- `/launch/[launchId]` - Project detail view
  - Overview tab - Stats, timeline, critical permits
  - Permits tab - All permits with filtering
  - Documents tab - Document upload and management
  - Team tab - Team member management
  - Settings tab - Project settings

## Demo Mode vs Production Mode

### Demo Mode (localStorage)

When `NEXT_PUBLIC_DEMO_MODE=true` or no API URL is set:

- Data stored in browser's `localStorage`
- Pre-populated with sample project "Ember & Oak Restaurant"
- No backend server required
- Perfect for demonstrations, prototyping, or offline work
- File uploads create blob URLs (preview only)

### Production Mode (Backend API)

When `NEXT_PUBLIC_API_URL` is set:

- All operations hit real backend API
- JWT authentication required
- Real-time updates via Socket.IO
- Actual file uploads to server
- Database persistence
- Multi-user collaboration

## TypeScript Types

All types are defined in `src/types/index.ts`:

```typescript
import { User, Project, Permit, Inspection, Notification } from '@/src/types';
```

**Main Types:**
- `User` - User accounts and roles
- `Project` - Launch projects
- `Permit` - Permits with timeline, jurisdiction, inspector
- `Inspection` - Inspection scheduling and results
- `Notification` - Multi-channel notifications

## Styling

Using **Tailwind CSS** with custom configuration:

```tsx
// Example component
<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
  <h2 className="text-lg font-bold text-gray-900 mb-4">
    Project Details
  </h2>
  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
    Save Changes
  </button>
</div>
```

## Toast Notifications

Using `react-hot-toast`:

```typescript
import { toast } from 'react-hot-toast';

// Success
toast.success('Permit synced successfully!');

// Error
toast.error('Failed to upload document');

// Custom icon
toast('New comment added', { icon: '💬' });
```

## Error Handling

### API Errors

Axios interceptors handle common errors:

```typescript
// 401 Unauthorized - Auto logout and redirect
realAPI.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error.response?.data || error);
  }
);
```

### Component Error Boundaries

```typescript
try {
  await api.updatePermit(id, data);
  toast.success('Permit updated!');
} catch (error: any) {
  toast.error(error.message || 'Update failed');
  console.error('Update error:', error);
}
```

## Performance Optimization

- **React Query Caching** - Automatic background refetching
- **Next.js App Router** - Server components and streaming
- **Image Optimization** - Next.js Image component
- **Code Splitting** - Dynamic imports for large components
- **Lazy Loading** - Defer non-critical resources

## Deployment

### Netlify (Recommended)

```bash
npm run build
npx netlify deploy --prod
```

### Vercel

```bash
npm run build
npx vercel --prod
```

### Environment Variables

Set these in your deployment platform:

```
NEXT_PUBLIC_API_URL=https://your-api-url.com
NEXT_PUBLIC_DEMO_MODE=false
```

## Development Tips

### Using with Backend

1. Start backend server: `cd server && npm run dev`
2. Start frontend: `cd frontend && npm run dev`
3. Backend runs on `:5000`, frontend on `:3000`
4. CORS is configured to allow `localhost:3000`

### Demo Mode for Testing

1. Set `NEXT_PUBLIC_DEMO_MODE=true`
2. All data stored in localStorage
3. No backend required
4. Perfect for UI development

### Hot Reload

Both frontend and backend support hot reload:
- Frontend: Next.js Fast Refresh
- Backend: nodemon auto-restart

## Troubleshooting

### CORS Errors

Ensure backend `.env` has:
```
CLIENT_URL=http://localhost:3000
```

### Socket Connection Issues

Check that:
1. Backend is running on port 5000
2. `NEXT_PUBLIC_API_URL` matches backend URL
3. JWT token is valid

### Demo Mode Not Working

Clear localStorage:
```javascript
localStorage.clear();
```

## Future Enhancements

- [ ] Mobile app (React Native)
- [ ] Offline mode with sync
- [ ] Advanced filtering and search
- [ ] Bulk operations
- [ ] Export to PDF/Excel
- [ ] Calendar integration
- [ ] Push notifications
- [ ] Team chat integration
- [ ] Analytics dashboard
- [ ] Audit logs

## License

Proprietary - OFFO LAB

## Support

For issues or questions, contact: support@offolab.com

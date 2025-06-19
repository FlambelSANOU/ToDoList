# Blue Window Ltd Challenge : Full-Stack To-Do List Application

### By Flambel SANOU

A modern, full-stack To-Do List application built with **NestJS** (backend) and **Angular** (frontend), featuring MongoDB integration, real-time updates, and a beautiful user interface.

<div align="center">
### Desktop view
  <img height="" src="./desktopView.png" />

### Mobile view
  <img height="" src="./mobileView.png" />

</div>

## Features

### Core Features
- **CRUD Operations**: Create, Read, Update, Delete tasks
- **Task Management**: Add, edit, delete, and mark tasks as complete
- **Priority Levels**: Low, Medium, High priority classification
- **Categories**: Organize tasks by categories (Work, Personal, Shopping, etc.)
- **Due Dates**: Set deadlines for tasks
- **Real-time Updates**: Instant UI updates when tasks are modified

### Advanced Features
- **Filtering**: Filter tasks by category and priority
- **Modern UI**: Beautiful, responsive design with Bootstrap and custom CSS
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Performance**: Optimized for fast loading and smooth interactions
- **Validation**: Form validation and error handling
- **Auto-increment IDs**: Automatic ID generation for tasks

## Technology Stack

### Backend
- **NestJS**: Progressive Node.js framework
- **MongoDB**: NoSQL database with Mongoose ODM
- **TypeScript**: Type-safe JavaScript
- **Class Validator**: Request validation
- **CORS**: Cross-origin resource sharing

### Frontend
- **Angular 16**: Modern frontend framework
- **TypeScript**: Type-safe development
- **Bootstrap 5**: Responsive UI components
- **Font Awesome**: Beautiful icons
- **RxJS**: Reactive programming

### Database
- **MongoDB Atlas**: Cloud-hosted MongoDB database
- **Mongoose**: MongoDB object modeling

## Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v16 or higher)
- **npm** (v8 or higher)
- **Git**

## Installation & Setup

### 0. Clone the Repository

```bash
git clone https://github.com/FlambelSANOU/ToDoList.git
cd To_Do_List_App
```

### 1. Install Dependencies

```bash
./install.sh
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file (optional - database URL is already configured Only for the test)
echo "DB_URL=mongodb+srv://yabi_events:Entreprise1230@yabievents.xx9vf.mongodb.net/?retryWrites=true&w=majority&appName=YabiEvents" > .env

# Start the development server
npm run start:dev
```

The backend will be running on `http://localhost:3000`

### 3. Frontend Setup

```bash
# Open a new terminal and navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm start
```

The frontend will be running on `http://localhost:4200`

## Usage Guide

### Adding a New Task

1. **Fill in the form** at the top of the page:
   - **Title**: Enter a descriptive title (required, max 255 characters)
   - **Description**: Provide detailed task description (required)
   - **Priority**: Select Low, Medium, or High priority
   - **Category**: Choose or enter a custom category
   - **Due Date**: Set an optional deadline

2. **Click "Add Task"** to create the task

### Managing Tasks

- **Complete a Task**: Check the checkbox next to the task title
- **Edit a Task**: Click the edit button (pencil icon) to modify task details
- **Delete a Task**: Click the delete button (trash icon) to remove the task
- **View Task Details**: Each task shows priority, category, and due date

### Filtering Tasks

- **By Category**: Use the category filter dropdown to show specific categories
- **By Priority**: Use the priority filter to show high, medium, or low priority tasks
- **Clear Filters**: Click "Clear Filters" to show all tasks

## Database Schema

The application uses MongoDB with the following task schema:

```typescript
{
  _id: ObjectId,           // MongoDB auto-generated ID
  id: Number,              // Auto-increment ID
  title: String,           // Task title (max 255 chars)
  description: String,     // Task description
  completed: Boolean,      // Completion status
  priority: String,        // 'low' | 'medium' | 'high'
  dueDate: Date,          // Optional deadline
  category: String,        // Task category
  createdAt: Date,        // Creation timestamp
  updatedAt: Date         // Last update timestamp
}
```

## API Endpoints

### Tasks API (`/tasks`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/tasks` | Get all tasks |
| GET | `/tasks/:id` | Get task by ID |
| POST | `/tasks` | Create new task |
| PATCH | `/tasks/:id` | Update task |
| PATCH | `/tasks/:id/toggle` | Toggle task completion |
| DELETE | `/tasks/:id` | Delete task |
| GET | `/tasks?category=work` | Filter by category |
| GET | `/tasks?priority=high` | Filter by priority |

### Request/Response Examples

**Create Task:**
```json
POST /tasks
{
  "title": "Complete project",
  "description": "Finish the full-stack application",
  "priority": "high",
  "category": "work",
  "dueDate": "2024-01-15T10:00:00Z"
}
```

**Update Task:**
```json
PATCH /tasks/:id
{
  "completed": true,
  "priority": "medium"
}
```

## Testing

### Backend Tests

```bash
cd backend
npm run test
```

### Frontend Tests

```bash
cd frontend
npm run test
```

## Deployment

### Backend Deployment

1. Build the application:
```bash
cd backend
npm run build
```

2. Start production server:
```bash
npm run start:prod
```

### Frontend Deployment

1. Build the application:
```bash
cd frontend
npm run build
```

2. Deploy the `dist/todo-app` folder to your hosting service

## Configuration

### Environment Variables

Create a `.env` file in the backend directory:

```env
DB_URL=mmongodb+srv://yabi_events:Entreprise1230@yabievents.xx9vf.mongodb.net/?retryWrites=true&w=majority&appName=YabiEvents**
PORT=3000
NODE_ENV=development
```

### CORS Configuration

The backend is configured to allow requests from `http://localhost:4200` (Angular dev server). For production, update the CORS configuration in `main.ts`.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- **NestJS** team for the amazing backend framework
- **Angular** team for the powerful frontend framework
- **Bootstrap** for the beautiful UI components
- **MongoDB** for the flexible database solution

## Support

If you encounter any issues or have questions:

1. Go to [My portfolio](https://flambel-sanou.yaba-in.com) and use the contact form.

---

**Happy Task Management!**
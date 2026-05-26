# Three-Tier Application

A complete, production-ready three-tier application with frontend, backend API, and MySQL database.

## Project Structure

```
three-tier-app/
├── frontend/              # Node.js/Express frontend UI
│   ├── package.json
│   ├── server.js
│   └── public/
│       └── index.html     # Beautiful web interface
├── backend/               # Node.js/Express API
│   ├── package.json
│   ├── server.js          # REST API with MySQL integration
│   └── .env.example
├── database/              # MySQL database
│   ├── init.sql           # Database initialization script
│   └── README.md
└── README.md
```

## Components

### 🎨 Frontend
- **Technology**: Node.js + Express
- **Port**: 3000
- **Features**:
  - Beautiful responsive UI
  - Real-time user list display
  - Add new users functionality
  - Auto-refresh every 5 seconds
  - API proxy endpoints

### 🔧 Backend
- **Technology**: Node.js + Express + MySQL
- **Port**: 5000
- **API Endpoints**:
  - `GET /api/users` - Get all users
  - `POST /api/users` - Create a new user
  - `GET /api/users/:id` - Get user by ID
  - `DELETE /api/users/:id` - Delete user
  - `GET /health` - Health check

### 💾 Database
- **Technology**: MySQL 8.0
- **Database**: three_tier_app
- **Port**: 3306
- **Table**: users (id, name, email, created_at)
- **Features**: Auto-initialization with sample data

## Setup Instructions

### Option 1: Using Docker Compose (Recommended)

1. Create a `docker-compose.yml` in the root directory:

```yaml
version: '3.8'

services:
  db:
    image: mysql:8.0
    container_name: three-tier-db
    environment:
      MYSQL_ROOT_PASSWORD: password
      MYSQL_DATABASE: three_tier_app
    ports:
      - "3306:3306"
    volumes:
      - ./database/init.sql:/docker-entrypoint-initdb.d/init.sql
      - db_data:/var/lib/mysql
    healthcheck:
      test: ["CMD", "mysqladmin", "ping", "-h", "localhost"]
      timeout: 20s
      retries: 10

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    container_name: three-tier-backend
    ports:
      - "5000:5000"
    environment:
      DB_HOST: db
      DB_USER: root
      DB_PASSWORD: password
      DB_NAME: three_tier_app
      PORT: 5000
    depends_on:
      db:
        condition: service_healthy
    restart: unless-stopped

  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    container_name: three-tier-frontend
    ports:
      - "3000:3000"
    environment:
      BACKEND_URL: http://backend:5000
    depends_on:
      - backend
    restart: unless-stopped

volumes:
  db_data:
```

2. Create Dockerfiles for frontend and backend

3. Run the application:
```bash
docker-compose up -d
```

4. Access the application:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000/api/users
   - Database: localhost:3306

### Option 2: Local Development

#### Prerequisites
- Node.js 14+
- MySQL Server

#### Database Setup
```bash
mysql -u root -p < database/init.sql
```

#### Backend
```bash
cd backend
npm install
# Create .env file with your database credentials
node server.js
```

#### Frontend
```bash
cd frontend
npm install
node server.js
```

Access at http://localhost:3000

## API Examples

### Get all users
```bash
curl http://localhost:5000/api/users
```

### Create a user
```bash
curl -X POST http://localhost:5000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com"}'
```

### Get specific user
```bash
curl http://localhost:5000/api/users/1
```

### Delete user
```bash
curl -X DELETE http://localhost:5000/api/users/1
```

## Environment Variables

### Backend (.env)
```
DB_HOST=db
DB_USER=root
DB_PASSWORD=password
DB_NAME=three_tier_app
PORT=5000
```

### Frontend
```
BACKEND_URL=http://backend:5000
PORT=3000
```

## Features

✅ Full-stack working application
✅ Responsive web interface
✅ RESTful API
✅ MySQL database with auto-initialization
✅ Error handling
✅ Real-time data updates
✅ Docker-ready (add Dockerfile and docker-compose.yml)
✅ Environment configuration
✅ Health checks

## Notes

- The application includes sample data in the database
- CORS is enabled on the backend
- The frontend automatically refreshes user data every 5 seconds
- All containers will auto-restart if they crash

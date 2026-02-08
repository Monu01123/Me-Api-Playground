# Me-API Playground

A personal portfolio API with a minimal frontend to showcase profile, projects, skills, and work experience. Built with the MERN stack (MongoDB, Express, React, Node.js).

**Live URLs:**
- Frontend: [To be deployed]
- Backend API: [To be deployed]

**Resume:** [Add your resume link here]

## 📋 Table of Contents

- [Architecture](#architecture)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Local Setup](#local-setup)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Deployment](#deployment)
- [Known Limitations](#known-limitations)

## 🏗️ Architecture

```
┌─────────────────┐         ┌─────────────────┐         ┌─────────────────┐
│                 │         │                 │         │                 │
│  React Frontend │────────▶│  Express API    │────────▶│    MongoDB      │
│  (Port 3000)    │         │  (Port 5000)    │         │   Database      │
│                 │         │                 │         │                 │
└─────────────────┘         └─────────────────┘         └─────────────────┘
```

**Components:**
- **Frontend**: React with Material-UI for responsive UI
- **Backend**: Express.js REST API with CORS enabled
- **Database**: MongoDB with Mongoose ODM
- **Deployment**: Frontend on Vercel, Backend on Render/Railway

## ✨ Features

- ✅ Full CRUD operations for profile management
- ✅ Filter projects by skill
- ✅ Global search across profile, projects, skills, and work experience
- ✅ Responsive Material-UI interface
- ✅ RESTful API with proper error handling
- ✅ MongoDB with optimized indexes for fast queries
- ✅ CORS configured for cross-origin requests
- ✅ Environment-based configuration

## 🛠️ Tech Stack

**Backend:**
- Node.js & Express.js
- MongoDB & Mongoose
- CORS, Helmet (security)
- Dotenv (environment variables)

**Frontend:**
- React 18
- Material-UI (MUI)
- Axios
- React Router

## 🚀 Local Setup

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and update:
   ```
   MONGODB_URI=mongodb://localhost:27017/me-api-playground
   PORT=5000
   NODE_ENV=development
   ```
   
   For MongoDB Atlas, use:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/me-api-playground?retryWrites=true&w=majority
   ```

4. **Seed the database:**
   ```bash
   npm run seed
   ```

5. **Start the server:**
   ```bash
   npm run dev
   ```
   
   Server will run on `http://localhost:5000`

6. **Verify health check:**
   ```bash
   curl http://localhost:5000/health
   ```

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env`:
   ```
   REACT_APP_API_URL=http://localhost:5000
   ```

4. **Start the development server:**
   ```bash
   npm start
   ```
   
   Frontend will run on `http://localhost:3000`

## 📚 API Documentation

### Base URL
```
Local: http://localhost:5000
Production: [Your deployed URL]
```

### Endpoints

#### Health Check
```bash
GET /health
```
**Response:**
```json
{
  "status": "OK",
  "message": "Server is running",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

#### Get Profile
```bash
GET /api/profile
```
**Response:** Profile object with all fields

#### Create Profile
```bash
POST /api/profile
Content-Type: application/json

{
  "name": "Your Name",
  "email": "your.email@example.com",
  "skills": ["JavaScript", "Python"],
  ...
}
```

#### Update Profile
```bash
PUT /api/profile
Content-Type: application/json

{
  "name": "Updated Name",
  "skills": ["JavaScript", "Python", "Docker"]
}
```

#### Delete Profile
```bash
DELETE /api/profile
```

#### Get All Projects
```bash
GET /api/projects
```

#### Filter Projects by Skill
```bash
GET /api/projects?skill=python
```

#### Get Top Skills
```bash
GET /api/skills/top
```

#### Search
```bash
GET /api/search?q=react
```
**Response:**
```json
{
  "profile": { ... },
  "projects": [ ... ],
  "skills": [ ... ],
  "work": [ ... ]
}
```

### Sample cURL Commands

```bash
# Health check
curl http://localhost:5000/health

# Get profile
curl http://localhost:5000/api/profile

# Create profile
curl -X POST http://localhost:5000/api/profile \
  -H "Content-Type: application/json" \
  -d @backend/data/profile-data.json

# Filter projects by skill
curl "http://localhost:5000/api/projects?skill=python"

# Search
curl "http://localhost:5000/api/search?q=react"
```

## 🗄️ Database Schema

See [schema.md](./schema.md) for detailed MongoDB schema documentation.

**Key Collections:**
- `profiles`: Stores candidate profile information

**Indexes:**
- Skills index for fast filtering
- Text indexes on projects and profile for full-text search

## 🌐 Deployment

### Backend Deployment (Render/Railway)

1. **Create a new Web Service**
2. **Connect your GitHub repository**
3. **Configure:**
   - Build Command: `cd backend && npm install`
   - Start Command: `cd backend && npm start`
   - Environment Variables:
     - `MONGODB_URI`: Your MongoDB Atlas connection string
     - `NODE_ENV`: `production`
     - `PORT`: `5000` (or auto-assigned)

4. **Deploy and get your backend URL**

### Frontend Deployment (Vercel)

1. **Install Vercel CLI or use Vercel dashboard**
2. **Configure:**
   - Root Directory: `frontend`
   - Framework: Create React App
   - Environment Variable:
     - `REACT_APP_API_URL`: Your deployed backend URL

3. **Deploy:**
   ```bash
   cd frontend
   vercel --prod
   ```

### Post-Deployment

1. **Seed production database:**
   ```bash
   # Update backend/.env with production MONGODB_URI
   npm run seed
   ```

2. **Test endpoints:**
   ```bash
   curl https://your-backend-url.com/health
   curl https://your-backend-url.com/api/profile
   ```

3. **Update README with live URLs**

## ⚠️ Known Limitations

1. **Single Profile Design**: The application is designed to store only one profile. Creating a second profile will return an error.

2. **No Authentication**: Currently, there's no authentication for write operations (POST, PUT, DELETE). Anyone with API access can modify the profile.

3. **Basic Search**: Search is case-insensitive substring matching, not advanced full-text search with ranking.

4. **No Pagination**: All endpoints return complete datasets. For large datasets, pagination should be implemented.

5. **Limited Validation**: Basic validation is in place, but more comprehensive validation (email format, URL validation) could be added.

6. **No Rate Limiting**: API doesn't have rate limiting implemented yet.

## 🔄 Future Enhancements

- Add authentication for write operations
- Implement pagination for large datasets
- Add input validation and sanitization
- Implement rate limiting
- Add automated tests
- Add CI/CD pipeline
- Improve search with ranking and fuzzy matching
- Add analytics and logging

## 📝 License

ISC

---

**Developed for Process Venue Internship Assessment**

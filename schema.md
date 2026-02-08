# MongoDB Schema Documentation

## Collections

### Profile Collection

The application uses a single `profiles` collection to store candidate information.

## Schema Structure

```javascript
{
  name: String (required),
  email: String (required, lowercase),
  education: [
    {
      degree: String,
      institution: String,
      year: String,
      field: String
    }
  ],
  skills: [String],
  projects: [
    {
      title: String (required),
      description: String (required),
      links: {
        github: String,
        live: String,
        demo: String
      },
      technologies: [String],
      year: String
    }
  ],
  work: [
    {
      company: String,
      position: String,
      duration: String,
      description: String,
      technologies: [String]
    }
  ],
  links: {
    github: String,
    linkedin: String,
    portfolio: String,
    twitter: String
  },
  createdAt: Date (auto-generated),
  updatedAt: Date (auto-generated)
}
```

## Indexes

The following indexes are created for optimal query performance:

1. **Skills Index**: `{ skills: 1 }`
   - Purpose: Fast filtering of projects by skill
   - Type: Single field index

2. **Projects Text Index**: `{ 'projects.title': 'text', 'projects.description': 'text' }`
   - Purpose: Full-text search on project titles and descriptions
   - Type: Text index

3. **Profile Text Index**: `{ name: 'text', email: 'text' }`
   - Purpose: Full-text search on profile name and email
   - Type: Text index

## Sample Document

```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "John Doe",
  "email": "john.doe@example.com",
  "education": [
    {
      "degree": "Bachelor of Technology",
      "institution": "Example University",
      "year": "2023-2027",
      "field": "Computer Science"
    }
  ],
  "skills": [
    "JavaScript",
    "Python",
    "React",
    "Node.js",
    "MongoDB"
  ],
  "projects": [
    {
      "title": "AI Chat Assistant",
      "description": "Built an AI chatbot using LangChain",
      "links": {
        "github": "https://github.com/user/project",
        "live": "https://project.vercel.app"
      },
      "technologies": ["Python", "LangChain", "React"],
      "year": "2024"
    }
  ],
  "work": [
    {
      "company": "Tech Startup",
      "position": "Backend Developer Intern",
      "duration": "Jun 2023 - Aug 2023",
      "description": "Developed REST APIs",
      "technologies": ["Node.js", "Express", "MongoDB"]
    }
  ],
  "links": {
    "github": "https://github.com/johndoe",
    "linkedin": "https://linkedin.com/in/johndoe",
    "portfolio": "https://johndoe.com"
  },
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

## Notes

- The application is designed to store a single profile (the candidate's profile)
- All fields except `name`, `email`, `projects.title`, and `projects.description` are optional
- The schema uses Mongoose for validation and automatic timestamp management
- Text indexes enable efficient full-text search across multiple fields

# AI Interview Platform

A full-stack application that leverages Generative AI to provide interview preparation, resume analysis, and insights for candidates.

## Features

- **AI-Powered Insights**: Get feedback on your resume and interview performance using Google's Generative AI.
- **Resume Analysis**: Upload and analyze resumes to identify strengths and areas for improvement.
- **Mock Interviews**: Practice with AI-driven interview coaching.
- **Dashboard**: Track your progress, view analyzed resumes, and manage your profile.
- **Authentication**: Secure login and registration for users.

## Tech Stack

### Frontend
- **React 19** with **Vite**
- **React Router** for navigation
- **Sass/CSS Modules** for styling
- **Axios** for API communication

### Backend
- **Node.js** with **Express**
- **MongoDB** with **Mongoose**
- **Google Generative AI** (@google/generative-ai)
- **JWT** for authentication
- **Multer** for file uploads
- **Zod** for schema validation

## Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB (local or Atlas)
- Google AI API Key (Gemini)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Amaan0907/GenAI_and_Full_Stack_Project.git
   cd GenAI_and_Full_Stack_Project
   ```

2. **Backend Setup**:
   - Navigate to the backend directory: `cd Backend`
   - Install dependencies: `npm install`
   - Create a `.env` file based on `.env.example` and fill in your credentials:
     ```env
     PORT=3000
     MONGODB_URI=your_mongodb_uri
     JWT_SECRET=your_jwt_secret
     GEMINI_API_KEY=your_gemini_api_key
     ```
   - Start the backend server: `npm run dev`

3. **Frontend Setup**:
   - Navigate to the frontend directory: `cd ../Frontend`
   - Install dependencies: `npm install`
   - Create a `.env` file if necessary (check `vite.config.js` or `services/` for environment variables).
   - Start the frontend development server: `npm run dev`

## Deployment

The project is configured for deployment on:
- **Backend**: Render (configured in `config.js` and `server.js`)
- **Frontend**: Vercel (see `Frontend/vercel.json`)

## License

ISC License

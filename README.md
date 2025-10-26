https://right-fit-matcher-smb4.vercel.app/

# MBA Right Fit Matcher

A web application that helps MBA applicants find universities where they have the best chance of admission. The system analyzes your GMAT score, GPA, and work experience, then matches you with programs from a database of 23 top business schools.

## Why I Built This

Getting into business school is competitive. This tool takes the guesswork out of the process by calculating realistic admission probabilities based on how your profile compares to each program's average accepted student.

## How It Works

The matching algorithm considers three main factors:

- GMAT score (40% weight)
- GPA (40% weight)  
- Work experience (20% weight)

For each university, it calculates a match score and admission probability. Schools are ranked by your realistic chances of getting in, not just by their prestige.

## Tech Stack

**Backend:**
- Node.js with Express for the API
- PostgreSQL database hosted on Neon
- RESTful endpoints with proper validation

**Frontend:**
- React with Vite for fast development
- Component-based architecture
- LocalStorage for saving search history

## Features

**Core functionality:**
- University matching based on your profile
- 23 top MBA programs in the database
- Detailed program statistics (avg GMAT, GPA, acceptance rate)

**Filters and sorting:**
- Filter by country
- Filter by minimum admission probability
- Sort by probability, match score, or ranking

**User experience:**
- Dark mode toggle
- Search history (saves your last 5 searches)
- Responsive design for mobile and desktop
- Loading states and error handling

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database
- npm or yarn

### Backend Setup

1. Navigate to the backend folder:
cd backend
npm install


2. Create a .env file in the backend folder:
DATABASE_URL=your_postgresql_connection_string
PORT=3001
NODE_ENV=development



3. Initialize the database:
node src/models/initDb.js
node src/models/seedData.js



4. Start the server:
node src/server.js



The API will run on http://localhost:3001

### Frontend Setup

1. Navigate to the frontend folder:
cd frontend
npm install



2. Create a .env file in the frontend folder:
VITE_API_URL=http://localhost:3001



3. Start the development server:
npm run dev



The app will open at http://localhost:5173

## API Endpoints

**GET /api/universities**
Returns all universities in the database

**GET /api/universities/:id**
Returns a single university by ID

**POST /api/match**
Matches universities based on user profile

Request body:
{
"gmat_score": 720,
"gpa": 3.8,
"work_experience": 5
}


## Project Structure

right-fit-matcher/
├── backend/
│ ├── src/
│ │ ├── config/
│ │ │ └── database.js
│ │ ├── controllers/
│ │ │ ├── matchController.js
│ │ │ └── universityController.js
│ │ ├── models/
│ │ │ ├── initDb.js
│ │ │ └── seedData.js
│ │ ├── routes/
│ │ │ ├── matchRoutes.js
│ │ │ └── universityRoutes.js
│ │ └── server.js
│ └── package.json
│
└── frontend/
├── src/
│ ├── components/
│ │ ├── DarkModeToggle.jsx
│ │ ├── Filters.jsx
│ │ ├── InputForm.jsx
│ │ ├── LoadingSpinner.jsx
│ │ └── ResultsCard.jsx
│ ├── services/
│ │ └── api.js
│ ├── styles/
│ │ ├── DarkModeToggle.css
│ │ ├── Filters.css
│ │ ├── InputForm.css
│ │ └── LoadingSpinner.css
│ ├── App.jsx
│ ├── App.css
│ └── main.jsx
└── package.json


## Design Decisions

**Matching Algorithm:** I weighted GMAT and GPA equally (40% each) because both are critical for MBA admissions. Work experience gets 20% since it matters but varies more between programs.

**Admission Probability:** This isn't just the match score. It factors in each school's acceptance rate to give you a realistic number. A 90% match at Stanford (8% acceptance rate) gives you a different probability than a 90% match at a school with 40% acceptance.

**Component Architecture:** Separated concerns into small components for maintainability. The API service layer keeps all fetch calls in one place.

**LocalStorage:** Used for dark mode preference and search history. This keeps the app stateless on the backend while still providing a good user experience.

## Known Limitations

- Limited to 23 universities (can be expanded)
- Doesn't account for qualitative factors like essays or recommendations
- Admission probabilities are estimates based on statistics
- No user authentication (each session is independent)

## Future Improvements

- Add more universities and programs (MS, PhD, etc.)
- Factor in undergraduate institution prestige
- Include industry/sector preferences
- Export results to PDF
- User accounts to save multiple profiles
- Compare multiple profiles side by side



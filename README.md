# WanderEase 🌍✈️

WanderEase is a smart, AI-powered travel planning application designed to revolutionize how you organize your trips. By combining real-time data with advanced AI, WanderEase allows users to generate custom itineraries, explore destinations on interactive maps, and manage travel details all in one place.

## 🚀 Live Demo

- **Visity the Live Application**: [Insert Live Link Here](https://wander-ease-jqlg-6cj89q3ql-lokesh-singhs-projects-e0c2194d.vercel.app/)


## ✨ Features

- **🤖 AI-Powered Itineraries**: Generate personalized travel plans instantly using Google's Gemini AI.
- **🗺️ Interactive Mapping**: Explore destinations and routes with dynamic Mapbox integration.
- **🔒 Secure Authentication**: Robust user management with secure login and signup using JWT.
- **📅 Trip Management**: Create, save, and manage multiple trip blueprints effortlessly.
- **⛅ Real-Time Insights**: Access weather data and location details for your destinations.
- **🎨 Modern UI/UX**: A sleek, responsive interface built with the latest React best practices and Shadcn UI.

## 🛠️ Tools & Technologies

### Frontend
- **Framework**: [React](https://react.dev/) (via [Vite](https://vitejs.dev/))
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [Shadcn UI](https://ui.shadcn.com/)
- **Mapping**: [Mapbox GL JS](https://www.mapbox.com/)
- **State Management & Data Fetching**: [TanStack Query (React Query)](https://tanstack.com/query)
- **Routing**: [React Router](https://reactrouter.com/)
- **Icons**: [Lucide React](https://lucide.dev/)

### Backend
- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) (with Mongoose)
- **Authentication**: JWT & Bcrypt.js
- **AI Engine**: Google Gemini (via `@google/generative-ai`)
- **Validation**: Express Validator

### External Services
- **Mapbox API** (Maps & Geocoding)
- **OpenWeatherMap API** (Weather Data)
- **Google Gemini API** (AI Generation)

## ⚙️ Getting Started

Follow these steps to set up WanderEase locally on your machine.

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- A MongoDB instance (Local or Atlas)
- API Keys for Mapbox, Google Gemini, and OpenWeatherMap

### 1. Clone the Repository
```bash
git clone https://github.com/lokesh172757/WanderEase.git
cd WanderEase
```

### 2. Backend Configuration
Navigate to the backend directory and install dependencies:
```bash
cd Backend
npm install
```

Create a `.env` file in the `Backend` directory and add your environment variables:
```env
NODE_ENV=development
PORT=8080
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
OPENWEATHERMAP_API_KEY=your_openweathermap_api_key
MAPBOX_API_KEY=your_mapbox_api_key
GOOGLE_GEMINI_API_KEY=your_gemini_api_key
```

Start the backend server:
```bash
npm run dev
```

### 3. Frontend Configuration
Open a new terminal, navigate to the frontend directory, and install dependencies:
```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend` directory:
```env
VITE_API_URL=http://localhost:8080
VITE_MAPBOX_ACCESS_TOKEN=your_mapbox_access_token
```

Start the frontend development server:
```bash
npm run dev
```

Visit `http://localhost:5173` (or the port shown in your terminal) to explore the app.

## 📂 Project Structure

```
WanderEase/
├── Backend/             # Node.js/Express Backend
│   ├── config/          # DB connection and config
│   ├── controllers/     # Route logic
│   ├── models/          # Mongoose models
│   ├── routes/          # API routes
│   ├── middleware/      # Auth and error handling
│   └── server.js        # Entry point
│
├── frontend/            # React Frontend
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── api/         # API service calls
│   │   ├── lib/         # Utilities (utils, shadcn utils)
│   │   └── Main.jsx     # App entry
│   └── public/          # Static assets
└── README.md            # Project Documentation
```

## 🤝 Contributing

Contributions are welcome! Please open an issue or submit a pull request if you have any improvements or bug fixes.



---
Built with ❤️ by [lokesh172757](https://github.com/lokesh172757)
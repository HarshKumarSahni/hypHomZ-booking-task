# Booking Application

A full-stack booking application that allows users to:
- Select product quantity
- Choose from multiple add-ons
- Calculate total price
- Save booking information to the database

## Features
- Modern React frontend with Material-UI
- Node.js/Express backend
- MongoDB database
- Real-time price calculation
- Responsive design

## Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone https://github.com/HarshKumarSahni/booking-app.git
cd booking-app
```

2. Install backend dependencies:
```bash
npm install
```

3. Install frontend dependencies:
```bash
cd client
npm install
cd ..
```

4. Create a `.env` file in the root directory:
```
MONGODB_URI=mongodb://localhost:27017/booking-app
PORT=5000
```

## Running the Application

1. Start the backend server:
```bash
npm run dev
```

2. In a new terminal, start the frontend:
```bash
cd client
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## Project Structure
```
booking-app/
├── client/                 # React frontend
│   ├── public/            # Static files
│   ├── src/               # React components
│   └── package.json       # Frontend dependencies
├── models/                # MongoDB models
├── routes/                # API routes
├── server.js              # Backend server
└── package.json           # Backend dependencies
```

## API Endpoints
- GET `/api/bookings` - Get all bookings
- POST `/api/bookings` - Create a new booking

## Contact
Name - Harsh Kumar Sahni
Project Link: [https://github.com/HarshKumarSahni/booking-app](https://github.com/HarshKumarSahni/booking-app)

## Usage
1. Select the desired quantity of the product
2. Choose any add-ons you want to include
3. The total price will be calculated automatically
4. Click "Book Now" to save your booking

## Technologies Used
- React
- Material-UI
- Node.js
- Express
- MongoDB
- Mongoose
- Axios 

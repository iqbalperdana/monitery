# monitery

Web application for financial management - Work in progress

## Overview

Monitery is a web application for managing personal finances, tracking expenses, and monitoring financial goals.

## Project Structure

monitery/
├── backend/ # Backend server code
├── frontend/ # Frontend React application
└── README.md # Project documentation

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- PostgreSQL

## Getting Started

### Backend Setup

1. Navigate to backend directory:

cd backend

2. Install dependencies:

npm install

3. Copy .env.example to .env and configure environment variables

4. Start backend server:

npm start

### Frontend Setup

1. Navigate to frontend directory:

cd frontend

2. Install dependencies:

npm install

3. Copy .env.example to .env and configure environment variables

4. Start frontend development server:

npm run dev

## Running Concurrently

You can run both backend and frontend simultaneously using:

npm run dev

## Features

Currently implemented features:

- User registration and login
- User authentication
- Invoice generation

Continue adding more features as needed:

- Export invoices to PDF and Image
- Publish invoices to a website
- Expense tracking
- Income management
- Financial reports
- Budget planning
- Transaction history

## Technologies Used

- Backend:
  - Typescript
  - Nest.js
  - PostgreSQL
  - JWT Authentication
- Frontend:
  - React.js
  - Tailwind CSS
  - Axios

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details

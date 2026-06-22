# Panda's Kitchen

A full-stack restaurant web platform built for Panda's Kitchen, a homemade burger restaurant based in Colombo, Sri Lanka. Built as a real-world client project delivering a complete digital presence with online ordering integration and a custom content management system.

## Features

- Dynamic hero image slider with per-slide Uber Eats and PickMe ordering links
- Full menu management across multiple categories — Extras, Beverages, Breakfast Burgers, Regular Burgers, Ultra Max Burgers
- Options section with Sandwiches, Submarines, and Combo Deals
- Product badges — image badges and bottom badges with custom colors
- Original price and current price display with strikethrough formatting
- Special offers and limited-time promotions
- Customer feedback and star rating reviews
- Google Maps integration with exact restaurant pin
- Mobile-responsive design across all sections
- Custom admin dashboard with live system status, item counts, and quick actions

## Tech Stack

**Frontend**
- React 19 + Vite 7
- React Router DOM 7
- Axios
- React Slick
- Custom CSS design system with CSS variables

**Backend**
- Node.js + Express 5
- MongoDB + Mongoose 9
- Cloudinary (image hosting and optimization)
- Multer + multer-storage-cloudinary (file uploads)
- dotenv

**Infrastructure**
- Docker (MongoDB container)
- Cloudinary CDN

## Project Structure

```
Panda's Kitchen/
├── client/                    # React frontend
│   └── src/
│       ├── admin/             # Admin panel pages
│       │   ├── AdminLayout.jsx
│       │   ├── ManageHero.jsx
│       │   ├── ManageMenu.jsx
│       │   ├── ManageExtras.jsx
│       │   ├── ManageBeverages.jsx
│       │   ├── ManageOptions.jsx
│       │   ├── ManageOffers.jsx
│       │   ├── ManageFeedback.jsx
│       │   └── ManageSettings.jsx
│       ├── components/        # Reusable UI components
│       ├── pages/             # Page components
│       └── assets/            # Static assets
└── server/                    # Express backend
    ├── config/                # DB and Cloudinary config
    ├── models/                # Mongoose schemas
    ├── routes/                # REST API routes
    └── utils/                 # Helper utilities
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET/POST/PUT/DELETE | /api/hero | Hero slider slides |
| GET/POST/PUT/DELETE | /api/products | Menu items |
| GET/POST/PUT/DELETE | /api/extras | Extras and Beverages |
| GET/POST/PUT/DELETE | /api/offers | Limited time and special offers |
| GET/POST/PUT/DELETE | /api/feedback | Customer reviews |
| GET/POST/PUT/DELETE | /api/options | Sandwiches and Submarines |
| GET/PUT | /api/settings | Site settings |
| GET | /api/system/status | MongoDB and Cloudinary status |

## Getting Started

### Prerequisites
- Node.js v18+
- Docker (for MongoDB)
- Cloudinary account

### Run MongoDB with Docker

```bash
docker run -d --name pandas-mongo -p 27017:27017 mongo:latest
```

### Backend Setup

```bash
cd server
npm install
npm run dev
```

Create a `.env` file in the server directory:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/pandas_kitchen
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Frontend Setup

```bash
cd client
npm install
npm run dev
```

The app runs at `http://localhost:5173`

The admin panel is available at `http://localhost:5173/admin`

## Admin Panel

- Dashboard with live MongoDB and Cloudinary status, item counts, and quick navigation
- Manage Hero Slider — upload images, set display order, add per-slide Uber and PickMe links
- Manage Menu Sections — add items with image badges, bottom badges, current price, original price, and order links
- Manage Extras — standalone extras section
- Manage Beverages — standalone beverages section
- Manage Options — Sandwiches, Submarines, and Combo Deals under tabbed navigation
- Manage Limited Time Offer — inline editor with image preview
- Manage Special Offers — full CRUD with cinematic card display on frontend
- Manage Happy Customers — add and manage customer reviews with star ratings
- System status monitoring — real-time DB and cloud connection indicators

## Author

**Dakshina Dissanayake**  
Software Engineer  
Final Year Project — Faculty of Information Technology, Horizon Campus  
dakshinabanu@gmail.com  
[GitHub](https://github.com/Dakshinab)

## License

This project was built for a private client. All rights reserved.
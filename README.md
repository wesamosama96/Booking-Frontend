# Safarni 🌍

> Your Ultimate Travel Booking Platform

A full-stack travel booking platform where users can search and book flights, hotels, tours, and car rentals — all in one place. Built with Next.js 15, PostgreSQL, and NextAuth.

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-336791?style=for-the-badge&logo=postgresql)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=for-the-badge&logo=prisma)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-06B6D4?style=for-the-badge&logo=tailwindcss)
![Framer Motion](https://img.shields.io/badge/Framer-Motion-black?style=for-the-badge&logo=framer)

-----

## ✨ Features

### 🏠 Landing Page

- Full-screen parallax hero with floating booking cards
- Quick search bar with tabs (Flights / Hotels / Tours / Cars)
- Popular destinations grid
- Featured tours & hotels sections
- Why Safarni section
- Stats counter (2M+ travelers, 150+ destinations)
- Newsletter CTA

### ✈️ Flights

- Search flights with From / To / Date / Passengers
- Filter by Airline, Stops, Class, Max Price
- Sort by Price, Duration, Rating
- Visual route display with flight path animation
- Detailed flight page with includes and booking sidebar
- Seat availability indicator

### 🏨 Hotels

- Search hotels by City, Stars, Amenities, Price
- Image gallery on detail page
- Full amenities display with icons
- Check-in / Check-out / Guests selector
- Dynamic price calculation per night

### 🗺️ Tours

- Filter by Category, Difficulty, Duration
- Tour highlights and what’s included
- Group size and duration display
- Persons selector with max group validation
- Difficulty badge (Easy / Moderate / Hard)

### 🚗 Car Rentals

- Filter by Type, Brand, Transmission, Location
- Pick-up and Drop-off date selector
- Dynamic total price calculation per days
- Car specs (seats, transmission, features)

### 💳 Checkout

- 2-step flow (Passenger Details → Payment)
- Order summary sidebar
- Booking confirmation with unique reference number
- Saves booking to database

### 👤 Dashboard

- My bookings (All / Flight / Hotel / Tour / Car)
- Stats cards (Total, Upcoming, Spent, Trip Types)
- Cancel booking functionality
- Real-time status updates

### 🔐 Auth

- Email/Password registration & login
- Google OAuth
- NextAuth.js v5 sessions
- Protected routes

-----

## 🛠 Tech Stack

|Layer     |Technology                                 |
|----------|-------------------------------------------|
|Framework |Next.js 15 (App Router + API Routes)       |
|Language  |TypeScript                                 |
|Database  |PostgreSQL (Neon.tech)                     |
|ORM       |Prisma                                     |
|Auth      |NextAuth.js v5 (Google OAuth + Credentials)|
|Styling   |Tailwind CSS v3                            |
|Animations|Framer Motion                              |
|State     |Zustand                                    |
|Icons     |Lucide React                               |
|Deploy    |Vercel                                     |

-----

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/YOUR-USERNAME/safarni.git
cd safarni
npm install
```

### 2. Setup environment variables

Create `.env.local`:

```env
DATABASE_URL="postgresql://..."
NEXTAUTH_SECRET="your-secret"
NEXTAUTH_URL="http://localhost:3000"
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."
```

### 3. Setup database

```bash
npx prisma db push
npx prisma generate
```

### 4. Run development server

```bash
npm run dev
```

Open <http://localhost:3000> 🎉

-----

## 📡 API Routes

```
POST   /api/auth/register          Register new user
GET    /api/auth/[...nextauth]     NextAuth handlers
GET    /api/bookings               Get user bookings
POST   /api/bookings               Create new booking
PATCH  /api/bookings/:id           Update booking status
```

-----

## 🗄 Database Schema

```
User
├── id, name, email, password (hashed)
├── image, emailVerified
└── accounts, sessions, bookings, profile

Profile
├── userId → User
├── phone, nationality, passport
└── dateOfBirth

Booking
├── userId → User
├── type (FLIGHT / HOTEL / TOUR / CAR)
├── status (PENDING / CONFIRMED / CANCELLED / COMPLETED)
├── totalPrice, currency
├── details (Json — stores full item details)
└── stripeId, checkIn, checkOut
```

-----

## 📁 Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── auth/          # NextAuth + Register
│   │   └── bookings/      # CRUD bookings
│   ├── flights/           # Search + Details
│   ├── hotels/            # Search + Details
│   ├── tours/             # Search + Details
│   ├── cars/              # Search + Book
│   ├── checkout/          # 2-step checkout
│   ├── dashboard/         # User dashboard
│   ├── login/             # Auth pages
│   ├── register/
│   └── page.tsx           # Landing page
├── components/
│   ├── Navbar.tsx         # Sticky nav + mobile
│   └── SearchBar.tsx      # Tabbed search widget
├── data/
│   └── mockData.ts        # 6 flights, 6 hotels, 6 tours, 6 cars
├── lib/
│   ├── auth.ts            # NextAuth config
│   ├── db.ts              # Prisma client
│   └── utils.ts           # Helpers
├── store/
│   └── bookingStore.ts    # Zustand booking state
└── types/
    └── index.ts           # TypeScript interfaces
```

-----

## 🔑 Pages

|Route         |Description             |
|--------------|------------------------|
|`/`           |Landing page            |
|`/flights`    |Search & filter flights |
|`/flights/:id`|Flight details + booking|
|`/hotels`     |Search & filter hotels  |
|`/hotels/:id` |Hotel details + booking |
|`/tours`      |Search & filter tours   |
|`/tours/:id`  |Tour details + booking  |
|`/cars`       |Car rentals             |
|`/checkout`   |2-step checkout flow    |
|`/dashboard`  |User bookings & stats   |
|`/login`      |Sign in                 |
|`/register`   |Create account          |

-----

## 🎨 Design System

```
Colors:
  Background:  #0d1117 (Dark 950)
  Card:        #1e2433 (Dark 800)
  Primary:     #3b82f6 (Blue 500)
  Accent:      #f59e0b (Gold)
  Text:        #ffffff

Style:
  Dark theme throughout
  Glass morphism cards
  Smooth Framer Motion animations
  Parallax scrolling on hero
  Responsive — mobile first
```

-----

## 📦 Mock Data Included

|Type   |Count|Examples                                                                |
|-------|-----|------------------------------------------------------------------------|
|Flights|6    |Emirates, Qatar Airways, EgyptAir, Turkish Airlines, Lufthansa          |
|Hotels |6    |Four Seasons Dubai, Burj Al Arab, Ritz-Carlton Istanbul, Nile Ritz Cairo|
|Tours  |6    |Pyramids, Dubai Desert Safari, Istanbul, Petra, Santorini, Kenya Safari |
|Cars   |6    |Toyota, BMW, Mercedes, Rolls-Royce, Hyundai                             |

-----

## 📝 License

MIT License

-----

## 👨‍💻 Author

Built by **Mohammed Sherif** — [GitHub](https://github.com/Mohamed-Sherif-Dev) · [LinkedIn](https://linkedin.com/in/mohammed-sherif-a57445363) · [Portfolio](https://portfolio-mohammed-nine.vercel.app)

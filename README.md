# Restaurant Management System

A comprehensive, full-stack restaurant management application built with Next.js 15, featuring real-time order management, table reservations, menu administration, and analytics dashboard.

## 🏗️ Architecture Overview

This application follows a modern, scalable architecture:

- **Frontend**: Next.js 15 with App Router, React 18, TypeScript
- **State Management**: Zustand for global state, SWR for data fetching
- **UI Framework**: Material-UI, NextUI, TailwindCSS
- **Authentication**: NextAuth.js v5 with JWT strategy
- **Backend API**: RESTful API hosted on Render
- **Database**: Supabase (PostgreSQL)
- **PDF Generation**: React-PDF for invoice generation
- **Maps Integration**: Leaflet for location services
- **Charts**: Recharts for analytics visualization

## ✨ Key Features

### 🍽️ Menu Management
- Create, update, and delete menu items with categories
- Dynamic category management with icon associations
- Real-time menu updates across all interfaces
- Image upload and optimization support

### 📋 Order Management
- Real-time order tracking and status updates
- Order lifecycle: Pending → Processing → Completed
- Invoice generation with PDF export
- Order history and analytics

### 🪑 Table Management
- Interactive table layout designer using Konva
- Drag-and-drop table positioning
- Capacity management and availability tracking
- QR code generation for table ordering

### 📅 Reservation System
- Date/time-based reservation booking
- Capacity validation and conflict detection
- Customer information management
- Reservation status tracking

### 📊 Analytics Dashboard
- Revenue tracking and trends
- Order statistics and insights
- Popular items analysis
- Performance metrics visualization

### 🔐 Authentication & Authorization
- Secure JWT-based authentication
- Role-based access control
- Password management and reset
- Session management with NextAuth.js

## 🛠️ Tech Stack

### Core Framework
- **Next.js 15.1.0** - React framework with App Router
- **React 18.3.1** - UI library
- **TypeScript 5** - Type safety

### UI & Styling
- **Material-UI 5.16.7** - Component library
- **NextUI 2.4.6** - Modern UI components
- **TailwindCSS 3.4.1** - Utility-first CSS
- **Framer Motion 11.3.24** - Animation library
- **React Icons 5.2.1** - Icon library

### State & Data Management
- **Zustand 4.5.4** - Lightweight state management
- **SWR 2.3.2** - Data fetching and caching
- **React Hook Form 7.52.2** - Form management
- **Zod 3.23.8** - Schema validation

### Backend Integration
- **Axios 1.7.9** - HTTP client
- **Ky 1.7.4** - HTTP client alternative
- **NextAuth.js 5.0.0-beta.25** - Authentication
- **Supabase 2.47.5** - Backend as a Service

### Specialized Libraries
- **React-PDF 4.1.5** - PDF generation
- **Konva 9.3.15** & **React-Konva 18.2.10** - Canvas manipulation
- **Leaflet 1.9.4** & **React-Leaflet 5.0.0** - Maps
- **Recharts 2.12.7** - Data visualization
- **QRCode.react 4.1.0** - QR code generation
- **Date-fns 3.6.0** & **Moment 2.30.1** - Date manipulation

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm, yarn, pnpm, or bun
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd restaurant-management-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Environment Setup**
   
   Create a `.env.local` file in the root directory:
   ```env
   # NextAuth Configuration
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-secret-key
   
   # API Configuration
   NEXT_PUBLIC_API_URL=https://api-resturant-management.onrender.com
   
   # Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
restaurant-management-app/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/            # Authentication routes
│   │   ├── (main)/            # Main application routes
│   │   └── api/               # API routes
│   ├── components/            # React components
│   │   ├── auth/              # Authentication components
│   │   ├── global/            # Global components
│   │   ├── layout/            # Layout components
│   │   ├── pages/             # Page-specific components
│   │   ├── pdf/               # PDF generation components
│   │   ├── shared/            # Shared components
│   │   └── ui/                # UI components
│   ├── services/              # API service layers
│   │   ├── actions/           # Server actions
│   │   ├── auth.service.ts
│   │   ├── menu.service.ts
│   │   ├── order.service.ts
│   │   ├── payment.service.ts
│   │   └── reservation.service.ts
│   ├── store/                 # Zustand stores
│   ├── types/                 # TypeScript type definitions
│   ├── utils/                 # Utility functions
│   │   ├── auth/              # Auth utilities
│   │   └── supabase/          # Supabase client
│   ├── helpers/               # Helper functions
│   └── lib/                   # Library configurations
├── public/                    # Static assets
├── restaurant-management-api-readme.md  # API documentation
└── package.json
```

## 🔌 API Integration

The application integrates with a RESTful API hosted at:
```
https://api-resturant-management.onrender.com/restaurant
```

### Authentication

All API requests require an `Authorization` header with a Bearer token:
```typescript
headers: {
  'Authorization': `Bearer ${token}`
}
```

### Key Endpoints

#### Authentication
- `POST /auth/login` - User authentication
- `PATCH /auth/update-password` - Password update

#### Restaurant Management
- `PATCH /main/update-restaurant/:restaurantId` - Update restaurant details

#### Menu Management
- `POST /main/create-menu-item/:restaurantId` - Create menu item
- `PUT /main/update-menu-item/:menuItemId` - Update menu item
- `DELETE /main/delete-menu-item/:menuItemId` - Delete menu item
- `GET /main/get-all-menu-items/:restaurantId` - Get all menu items

#### Category Management
- `POST /main/create-category/:restaurantId` - Create category
- `PUT /main/update-category/:categoryId` - Update category
- `DELETE /main/delete-category/:categoryId` - Delete category
- `GET /main/get-all-categories/:restaurantId` - Get all categories

#### Table Management
- `POST /main/create-table/:restaurantId` - Create table
- `PUT /main/update-table/:tableId` - Update table
- `DELETE /main/delete-table/:tableId` - Delete table
- `GET /main/get-table` - Get table by restaurant ID and number

#### Order Management
- `GET /main/get-all-orders/:restaurantId` - Get all orders
- `PUT /main/update-order-status/:orderId` - Update order status

#### Reservation Management
- `POST /main/add-reservation/:restaurantId` - Create reservation
- `GET /main/get-reservations/:restaurantId` - Get all reservations

#### Invoice Management
- `POST /main/generate-invoice` - Generate invoice for order

For detailed API documentation, see [`restaurant-management-api-readme.md`](./restaurant-management-api-readme.md)

## 🧪 Development Guidelines

### Code Style
- Follow TypeScript best practices
- Use functional components with hooks
- Implement proper error handling
- Write descriptive variable and function names
- Keep components small and focused

### State Management
- Use Zustand for global state
- Use SWR for server state
- Implement optimistic updates where appropriate
- Handle loading and error states

### Type Safety
- Define interfaces for all data structures
- Use Zod for runtime validation
- Avoid `any` types
- Leverage TypeScript strict mode

## 🔒 Security Considerations

- JWT tokens stored securely in HTTP-only cookies
- CSRF protection enabled
- Input validation on both client and server
- SQL injection prevention via parameterized queries
- XSS protection through React's built-in escaping

## 📈 Performance Optimizations

- Image optimization with Next.js Image component
- Code splitting and lazy loading
- SWR caching and revalidation
- Server-side rendering for initial page loads
- Static generation where applicable

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Configure environment variables
4. Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/restaurant-management-app)

### Other Platforms

The application can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- Render

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is private and proprietary.

## 📧 Support

For support and inquiries, please contact the development team.

---

Built with ❤️ using Next.js and modern web technologies

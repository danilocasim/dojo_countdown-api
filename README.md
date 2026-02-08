# DojoCountdown

A MotionMail-like SaaS service that generates dynamic countdown timer images for emails and websites.

## 🚀 Phase 1 - Backend Setup

This is the foundational backend setup with:

- ✅ Express.js server with ES Modules
- ✅ PostgreSQL database with Prisma ORM
- ✅ MVC architecture
- ✅ Security middleware (Helmet, CORS)
- ✅ Request logging (Morgan)
- ✅ Centralized error handling
- ✅ Health check endpoints

## 📁 Project Structure

```
dojo-countdown/
├── prisma/
│   └── schema.prisma       # Database schema
├── generated/
│   └── prisma/             # Generated Prisma client
├── src/
│   ├── app.js              # Express app configuration
│   ├── server.js           # Server entry point
│   ├── controllers/        # Request handlers (thin layer)
│   │   └── health.controller.js
│   ├── services/           # Business logic
│   │   └── health.service.js
│   ├── routes/             # Route definitions
│   │   ├── index.js
│   │   └── health.routes.js
│   ├── middlewares/        # Express middleware
│   │   ├── index.js
│   │   ├── errorHandler.js
│   │   └── notFound.js
│   ├── utils/              # Utilities
│   │   ├── errors.js
│   │   └── asyncHandler.js
│   └── lib/                # External service clients
│       └── prisma.js
├── .env                    # Environment variables (not in git)
├── .env.example            # Environment template
├── .gitignore
├── package.json
└── README.md
```

## 🛠️ Prerequisites

- Node.js >= 18.0.0
- PostgreSQL 14+
- npm or yarn

## ⚡ Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env
# Edit .env with your database credentials
```

### 3. Initialize Database

```bash
# Generate Prisma client
npm run prisma:generate

# Push schema to database (development)
npm run prisma:push

# Or create migration (production-ready)
npm run prisma:migrate
```

### 4. Start Server

```bash
# Development (with auto-reload)
npm run dev

# Production
npm start
```

## 🔗 API Endpoints

| Method | Endpoint       | Description                            |
| ------ | -------------- | -------------------------------------- |
| GET    | `/`            | API information                        |
| GET    | `/health`      | Full health check with database status |
| GET    | `/health/live` | Simple liveness probe                  |

## 📊 Health Check Response

```json
{
  "success": true,
  "data": {
    "status": "healthy",
    "timestamp": "2024-01-15T10:30:00.000Z",
    "uptime": 1234.56,
    "environment": "development",
    "version": "1.0.0",
    "checks": {
      "database": {
        "status": "connected",
        "latency": "5ms"
      }
    }
  }
}
```

## 🧪 Development Scripts

```bash
npm run dev           # Start with auto-reload
npm run prisma:studio # Open Prisma database GUI
npm run prisma:push   # Push schema changes
```

## 🔒 Security Features

- **Helmet**: Secure HTTP headers
- **CORS**: Cross-origin resource sharing
- **Rate Limiting**: (Coming in Phase 2)
- **Input Validation**: (Coming in Phase 2)

## 📋 Roadmap

- [x] **Phase 1**: Backend Setup ← Current
- [ ] **Phase 2**: Authentication (JWT, Sessions)
- [ ] **Phase 3**: Countdown Timer Logic
- [ ] **Phase 4**: Payment Integration
- [ ] **Phase 5**: Frontend Dashboard

## 📄 License

ISC

# dojo_countdown-api

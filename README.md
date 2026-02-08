# 🎯 DojoCountdown API

> Dynamic countdown timer image service for emails, websites, and marketing campaigns

[![Node.js](https://img.shields.io/badge/Node.js-18%2B-green)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.x-blue)](https://expressjs.com/)
[![Prisma](https://img.shields.io/badge/Prisma-6.x-2D3748)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-336791)](https://www.postgresql.org/)

## 📖 Overview

DojoCountdown is a SaaS platform that generates dynamic countdown timer images for use in emails, websites, and marketing materials. Each countdown is rendered server-side as an animated GIF or static image that updates in real-time.

### ✨ Key Features

- **🎨 Dynamic Image Generation** - Server-rendered countdown timers as GIF/PNG
- **🔐 JWT Authentication** - Secure user authentication with refresh tokens
- **📊 Usage Tracking** - Monthly view limits and quota enforcement
- **💎 Multi-tier Plans** - FREE, BOOTSTRAP, STARTUP, and ENTERPRISE plans
- **🎯 Customizable Styles** - Colors, fonts, layouts, and display options
- **⚡ High Performance** - Optimized for high-traffic email campaigns
- **🛡️ Rate Limiting** - Protection against abuse
- **📈 Analytics** - View tracking and usage statistics

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- PostgreSQL 15+
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd dojo-countdown-api
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Run database migrations**

   ```bash
   npm run prisma:migrate
   ```

5. **Seed demo data (optional)**

   ```bash
   npm run seed
   ```

6. **Start the server**
   ```bash
   npm run dev
   ```

The API will be available at `http://localhost:3000`

## 🐳 Docker Setup

### Using Docker Compose (Recommended)

```bash
# Start all services (API + Database)
docker compose up -d

# View logs
docker compose logs -f api

# Stop services
docker compose down

# Reset everything (including database)
docker compose down -v
```

### Using Docker only

```bash
# Build image
docker build -t dojocountdown-api .

# Run container
docker run -p 3000:3000 \
  -e DATABASE_URL="postgresql://..." \
  -e JWT_ACCESS_SECRET="..." \
  dojocountdown-api
```

## 📚 API Documentation

### Authentication Endpoints

| Method | Endpoint                  | Description             | Auth Required |
| ------ | ------------------------- | ----------------------- | ------------- |
| POST   | `/api/v1/auth/signup`     | Create new account      | No            |
| POST   | `/api/v1/auth/login`      | Login user              | No            |
| POST   | `/api/v1/auth/refresh`    | Refresh access token    | No            |
| POST   | `/api/v1/auth/logout`     | Logout (single session) | Yes           |
| POST   | `/api/v1/auth/logout-all` | Logout all sessions     | Yes           |
| GET    | `/api/v1/auth/sessions`   | List active sessions    | Yes           |

### Countdown Endpoints

| Method | Endpoint                         | Description            | Auth Required |
| ------ | -------------------------------- | ---------------------- | ------------- |
| GET    | `/api/v1/countdowns`             | List user's countdowns | Yes           |
| POST   | `/api/v1/countdowns`             | Create countdown       | Yes           |
| GET    | `/api/v1/countdowns/:id`         | Get countdown details  | Yes           |
| PUT    | `/api/v1/countdowns/:id`         | Update countdown       | Yes           |
| DELETE | `/api/v1/countdowns/:id`         | Delete countdown       | Yes           |
| GET    | `/api/v1/countdowns/:id/preview` | Preview countdown      | Yes           |

### Render Endpoints (Public)

| Method | Endpoint          | Description             |
| ------ | ----------------- | ----------------------- |
| GET    | `/render/:id.gif` | Render countdown as GIF |
| GET    | `/render/:id.png` | Render countdown as PNG |

### Usage Endpoints

| Method | Endpoint                | Description         | Auth Required |
| ------ | ----------------------- | ------------------- | ------------- |
| GET    | `/api/v1/usage`         | Current month usage | Yes           |
| GET    | `/api/v1/usage/history` | Usage history       | Yes           |
| GET    | `/api/v1/usage/check`   | Quick quota check   | Yes           |

### Example Requests

#### Sign Up

```bash
curl -X POST http://localhost:3000/api/v1/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "SecurePass123",
    "name": "John Doe"
  }'
```

#### Create Countdown

```bash
curl -X POST http://localhost:3000/api/v1/countdowns \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -d '{
    "title": "Product Launch",
    "endAt": "2026-12-31T23:59:59Z",
    "timezone": "UTC",
    "styleConfig": {
      "fontColor": "#FFFFFF",
      "backgroundColor": "#1a1a2e",
      "showLabels": true
    }
  }'
```

#### Embed in HTML

```html
<img src="http://localhost:3000/render/COUNTDOWN_ID.gif" alt="Countdown" />
```

## 💎 Plan Limits

| Feature               | FREE    | BOOTSTRAP | STARTUP  | ENTERPRISE |
| --------------------- | ------- | --------- | -------- | ---------- |
| **Monthly Views**     | 20,000  | 100,000   | 700,000  | 2,800,000  |
| **Active Countdowns** | 10      | 100       | 500      | Unlimited  |
| **Max Duration**      | 30 days | 90 days   | 365 days | Unlimited  |
| **Customization**     | ❌      | ✅        | ✅       | ✅         |
| **Remove Branding**   | ❌      | ❌        | ✅       | ✅         |
| **API Access**        | ❌      | ❌        | ✅       | ✅         |
| **Analytics**         | ❌      | ✅        | ✅       | ✅         |
| **Priority Support**  | ❌      | ❌        | ✅       | ✅         |

## 🏗️ Project Structure

```
src/
├── app.js                 # Express app configuration
├── server.js              # Server entry point
├── config/                # Configuration files
│   ├── index.js          # Environment config
│   ├── plans.js          # Plan limits & features
│   └── styles.js         # Style presets
├── controllers/           # HTTP request handlers
├── middlewares/           # Express middlewares
│   ├── auth.js           # JWT authentication
│   ├── planLimits.js     # Plan enforcement
│   └── rateLimiter.js    # Rate limiting
├── routes/               # API route definitions
├── services/             # Business logic
│   ├── auth.service.js
│   ├── countdown.service.js
│   ├── usage.service.js
│   └── render.service.js
├── render/               # Image generation
│   ├── renderer.js       # Main renderer
│   ├── gif.renderer.js   # GIF generation
│   └── layout.engine.js  # Layout engine
├── validators/           # Input validation
└── utils/                # Utility functions

prisma/
├── schema.prisma         # Database schema
├── migrations/           # Migration files
└── seed.js              # Demo data seeding
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file based on `.env.example`:

```bash
# Server
PORT=3000
NODE_ENV=development

# Database
DATABASE_URL="postgresql://user:password@localhost:5432/dojocountdown?schema=public"

# JWT Secrets (CHANGE IN PRODUCTION!)
JWT_ACCESS_SECRET="your-super-secret-access-key-min-32-chars"
JWT_REFRESH_SECRET="your-super-secret-refresh-key-min-32-chars"
JWT_ACCESS_EXPIRES_IN="15m"
JWT_REFRESH_EXPIRES_IN="7d"

# Security
BCRYPT_SALT_ROUNDS=12

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000  # 15 minutes
RATE_LIMIT_MAX_REQUESTS=100

# CORS
CORS_ORIGIN="http://localhost:3000"
```

## 🧪 Demo Data

Seed the database with demo users and countdowns:

```bash
npm run seed
```

### Demo Accounts

| Email                       | Password | Plan      |
| --------------------------- | -------- | --------- |
| demo@dojocountdown.com      | Demo1234 | FREE      |
| bootstrap@dojocountdown.com | Demo1234 | BOOTSTRAP |
| startup@dojocountdown.com   | Demo1234 | STARTUP   |

## 🗄️ Database Management

```bash
# Generate Prisma Client
npm run prisma:generate

# Create migration
npm run prisma:migrate

# Open Prisma Studio (GUI)
npm run prisma:studio

# Push schema (dev only)
npm run prisma:push
```

## 🧪 Testing

```bash
# Run tests (when available)
npm test

# Test specific endpoint
curl -X GET http://localhost:3000/api/v1/health
```

## 🚀 Deployment

### Heroku

```bash
# Login to Heroku
heroku login

# Create app
heroku create your-app-name

# Add PostgreSQL
heroku addons:create heroku-postgresql:mini

# Set environment variables
heroku config:set JWT_ACCESS_SECRET="your-secret"
heroku config:set JWT_REFRESH_SECRET="your-secret"

# Deploy
git push heroku main

# Run migrations
heroku run npm run prisma:migrate
```

### Railway

1. Connect your GitHub repository
2. Add PostgreSQL database
3. Set environment variables
4. Deploy automatically on push

### Docker Deployment

```bash
# Build for production
docker build -t dojocountdown-api:latest .

# Run with environment file
docker run -p 3000:3000 --env-file .env dojocountdown-api:latest
```

## 📊 Monitoring

### Health Check

```bash
curl http://localhost:3000/api/v1/health
```

Response:

```json
{
  "status": "healthy",
  "uptime": 1234.56,
  "timestamp": "2026-02-08T12:00:00.000Z",
  "database": "connected"
}
```

## 🔒 Security

- ✅ Helmet.js for HTTP headers
- ✅ Rate limiting on all endpoints
- ✅ JWT with refresh tokens
- ✅ Password hashing with bcrypt
- ✅ Input validation with express-validator
- ✅ SQL injection prevention (Prisma)
- ✅ CORS configuration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 💬 Support

- 📧 Email: support@dojocountdown.com
- 📚 Documentation: [docs.dojocountdown.com](https://docs.dojocountdown.com)
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/dojo-countdown/issues)

## 🙏 Acknowledgments

- Inspired by MotionMail countdown timers
- Built with Express.js and Prisma
- Powered by Node Canvas for image generation

---

Made with ❤️ by the DojoCountdown Team

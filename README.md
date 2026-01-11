# DojoCountdown API

A RESTful API service for generating dynamic countdown timer images. DojoCountdown enables users to create animated GIF countdowns that work in email clients and websites without requiring JavaScript.

| Resource | Link |
|----------|------|
| Frontend Repository | [dojo-countdown-client](https://github.com/danilocasim/dojo_countdown-client) |
| Live Application | [dojocountdown.vercel.app](https://dojocountdown.vercel.app) |
| Live API | [dojo-countdown-api.onrender.com](https://dojo_countdown-api.onrender.com) |

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running Locally](#running-locally)
- [Docker Deployment](#docker-deployment)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Database Schema](#database-schema)
- [Troubleshooting](#troubleshooting)
- [License](#license)

## Overview

DojoCountdown is a SaaS platform that generates real-time countdown timer images. Unlike JavaScript-based countdowns, these animated GIFs work universally across email clients (Gmail, Outlook, Apple Mail) and can be embedded anywhere images are supported.

The countdown images are rendered server-side using Node.js Canvas, generating animated GIFs that display a countdown sequence. Each frame represents one second, creating the illusion of a live updating timer.

## Features

- **Animated GIF Generation**: Server-side rendering of countdown timers as animated GIFs
- **Multiple Design Variants**: Block, Circle, Minimal, and Pill styles
- **Customizable Styling**: Configurable colors, fonts, and layout options
- **Timezone Support**: Accurate countdown calculations across global timezones
- **JWT Authentication**: Secure authentication with access and refresh tokens
- **Plan-Based Limits**: Tiered usage limits (FREE, BOOTSTRAP, STARTUP, ENTERPRISE)
- **Usage Tracking**: Monitor countdown views and enforce quotas
- **Email-Safe Headers**: Proper cache-control headers for email client compatibility

## Technology Stack

| Component | Technology |
|-----------|------------|
| Runtime | Node.js 18+ |
| Framework | Express.js |
| Database | PostgreSQL (Neon) |
| ORM | Prisma |
| Image Rendering | node-canvas, gifencoder |
| Authentication | JSON Web Tokens (JWT) |
| Deployment | Docker, Render |

## Prerequisites

Before running this project locally, ensure you have the following installed:

- Node.js 18.0.0 or higher
- npm 9.0.0 or higher
- PostgreSQL database (local or hosted)
- Docker (for production deployment)

### System Dependencies for Canvas

The `canvas` package requires system-level libraries for image rendering. These must be installed on your operating system before running `npm install`.

**macOS:**
```bash
brew install pkg-config cairo pango libpng jpeg giflib librsvg pixman
```

**Ubuntu/Debian:**
```bash
sudo apt-get update
sudo apt-get install -y \
    build-essential \
    libcairo2-dev \
    libpango1.0-dev \
    libjpeg-dev \
    libgif-dev \
    librsvg2-dev \
    libpixman-1-dev \
    pkg-config \
    python3
```

**Windows:**

Refer to the [node-canvas Windows installation guide](https://github.com/Automattic/node-canvas/wiki/Installation:-Windows).

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/dojo-countdown-api.git
cd dojo-countdown-api
```

2. Install dependencies:
```bash
npm install
```

3. Generate Prisma client:
```bash
npx prisma generate
```

4. Run database migrations:
```bash
npx prisma migrate deploy
```

## Configuration

Create a `.env` file in the project root with the following variables:
```env
# Server
NODE_ENV=development
PORT=3000

# Database
DATABASE_URL=postgresql://username:password@localhost:5432/dojo_countdown

# Authentication
JWT_ACCESS_SECRET=your-access-secret-key-min-32-chars
JWT_REFRESH_SECRET=your-refresh-secret-key-min-32-chars
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# API Configuration
API_URL=http://localhost:3000
CORS_ORIGIN=http://localhost:3001
```

### Environment Variables Reference

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `NODE_ENV` | Environment mode | No | `development` |
| `PORT` | Server port | No | `3000` |
| `DATABASE_URL` | PostgreSQL connection string | Yes | - |
| `JWT_ACCESS_SECRET` | Secret for signing access tokens | Yes | - |
| `JWT_REFRESH_SECRET` | Secret for signing refresh tokens | Yes | - |
| `JWT_ACCESS_EXPIRES_IN` | Access token expiration | No | `15m` |
| `JWT_REFRESH_EXPIRES_IN` | Refresh token expiration | No | `7d` |
| `API_URL` | Public API URL for embed codes | No | `http://localhost:3000` |
| `CORS_ORIGIN` | Allowed CORS origins | No | `*` |

## Running Locally

### Development Mode

Start the server with hot reloading:
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

### Verify Installation

After starting the server, verify the installation:
```bash
# Health check
curl http://localhost:3000/api/v1/health

# Canvas test (returns a test image)
curl http://localhost:3000/api/v1/health/canvas-test --output test.png
```

## Docker Deployment

### Why Docker is Required

The `canvas` package depends on native system libraries (Cairo, Pango, GLib) that must be compiled for the target operating system. When deploying to cloud platforms like Render, Vercel, or AWS, these libraries are not available in the default Node.js environment.

Docker solves this by:
1. Providing a consistent Linux environment
2. Installing required system dependencies during the build phase
3. Ensuring the compiled binaries match the runtime environment

### Dockerfile
```dockerfile
FROM node:18-bullseye-slim

# Install canvas system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    libcairo2-dev \
    libpango1.0-dev \
    libjpeg-dev \
    libgif-dev \
    librsvg2-dev \
    libpixman-1-dev \
    pkg-config \
    python3 \
    fonts-liberation \
    fonts-dejavu-core \
    openssl \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY prisma ./prisma

RUN npx prisma generate

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
```

### Prisma Binary Targets

Prisma generates platform-specific query engine binaries. To support both local development and Docker deployment, configure binary targets in `prisma/schema.prisma`:
```prisma
generator client {
  provider      = "prisma-client-js"
  output        = "../generated/prisma"
  binaryTargets = ["native", "debian-openssl-1.1.x", "debian-openssl-3.0.x"]
}
```

### Building and Running with Docker
```bash
# Build the image
docker build -t dojo-countdown-api .

# Run the container
docker run -p 3000:3000 --env-file .env dojo-countdown-api
```

### Deploying to Render

1. Push the Dockerfile to your repository
2. In Render Dashboard, navigate to your Web Service settings
3. Change Environment from "Node" to "Docker"
4. Clear the Build Command field (Docker uses the Dockerfile)
5. Deploy

## API Documentation

### Authentication

All authenticated endpoints require a Bearer token in the Authorization header:
```
Authorization: Bearer <access_token>
```

### Endpoints

#### Authentication

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/v1/auth/signup` | Register new user | No |
| POST | `/api/v1/auth/login` | Authenticate user | No |
| POST | `/api/v1/auth/logout` | Invalidate session | Yes |
| POST | `/api/v1/auth/refresh` | Refresh access token | No |

#### Users

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/v1/users/me` | Get current user | Yes |
| PATCH | `/api/v1/users/me` | Update current user | Yes |

#### Countdowns

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/v1/countdowns` | List user countdowns | Yes |
| POST | `/api/v1/countdowns` | Create countdown | Yes |
| GET | `/api/v1/countdowns/:id` | Get countdown by ID | Yes |
| PUT | `/api/v1/countdowns/:id` | Update countdown | Yes |
| DELETE | `/api/v1/countdowns/:id` | Delete countdown | Yes |
| GET | `/api/v1/countdowns/stats` | Get countdown statistics | Yes |

#### Render (Public)

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/v1/render/:id` | Render countdown as GIF | No |
| GET | `/api/v1/render/:id.gif` | Render countdown as GIF | No |
| GET | `/api/v1/render/:id/embed` | Get embed codes | No |

#### Usage

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/v1/usage` | Get current usage | Yes |
| GET | `/api/v1/usage/history` | Get usage history | Yes |

### Request/Response Examples

#### Create Countdown

**Request:**
```bash
curl -X POST http://localhost:3000/api/v1/countdowns \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "title": "Black Friday Sale",
    "endAt": "2025-11-29T00:00:00.000Z",
    "timezone": "America/New_York",
    "styleConfig": {
      "design": "block",
      "colors": {
        "design": "#e94560",
        "text": "#FFFFFF",
        "backdrop": "#1a1a2e"
      }
    }
  }'
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "cm1234567890",
    "title": "Black Friday Sale",
    "endAt": "2025-11-29T00:00:00.000Z",
    "timezone": "America/New_York",
    "status": "ACTIVE",
    "styleConfig": {
      "design": "block",
      "colors": {
        "design": "#e94560",
        "text": "#FFFFFF",
        "backdrop": "#1a1a2e"
      }
    },
    "createdAt": "2025-01-11T00:00:00.000Z",
    "updatedAt": "2025-01-11T00:00:00.000Z"
  }
}
```

### Style Configuration

The `styleConfig` object controls the visual appearance of countdown images:
```typescript
{
  design: "block" | "circle" | "minimal" | "pill",
  colors: {
    design: string,    // Primary color (hex)
    text: string,      // Text color (hex)
    backdrop: string   // Background color (hex)
  },
  noBackdrop: boolean,      // Transparent background
  showLabels: boolean,      // Show D/H/M/S labels
  labelStyle: "short" | "full" | "none",
  showDays: boolean,
  showHours: boolean,
  showMinutes: boolean,
  showSeconds: boolean,
  showSeparators: boolean,
  separatorChar: string
}
```

## Project Structure
```
dojo-countdown-api/
├── prisma/
│   ├── schema.prisma       # Database schema
│   └── migrations/         # Database migrations
├── src/
│   ├── config/
│   │   ├── plans.js        # Plan limits configuration
│   │   └── styles.js       # Style defaults and validation
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── countdown.controller.js
│   │   ├── render.controller.js
│   │   └── usage.controller.js
│   ├── middlewares/
│   │   ├── auth.js         # JWT authentication
│   │   ├── rateLimiter.js  # Rate limiting
│   │   └── errorHandler.js # Global error handling
│   ├── render/
│   │   ├── gif.renderer.js     # GIF generation
│   │   ├── layout.engine.js    # Layout calculations
│   │   ├── time.utils.js       # Time calculations
│   │   ├── branding.overlay.js # Branding watermark
│   │   └── expired.renderer.js # Expired state rendering
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── countdown.routes.js
│   │   ├── render.routes.js
│   │   └── usage.routes.js
│   ├── services/
│   │   ├── auth.service.js
│   │   ├── countdown.service.js
│   │   ├── render.service.js
│   │   └── usage.service.js
│   ├── utils/
│   │   └── errors.js       # Custom error classes
│   ├── lib/
│   │   └── prisma.js       # Prisma client instance
│   └── server.js           # Application entry point
├── generated/
│   └── prisma/             # Generated Prisma client
├── Dockerfile
├── .dockerignore
├── .env.example
├── package.json
└── README.md
```

## Database Schema

### Core Models

**User**
- Stores user accounts with authentication credentials
- Tracks subscription plan and account status

**Countdown**
- Stores countdown configurations
- References owner (User)
- Contains style configuration as JSON

**UsageStats**
- Tracks monthly usage per user
- Monitors view counts and active countdowns

**RefreshToken**
- Stores refresh tokens for JWT authentication
- Enables token revocation and rotation

## Troubleshooting

### Canvas Installation Fails

Ensure system dependencies are installed before running `npm install`. See [Prerequisites](#prerequisites) for platform-specific instructions.

### Prisma Binary Target Mismatch

If you see an error about Prisma Query Engine not found for a specific runtime:

1. Add the required binary target to `prisma/schema.prisma`
2. Run `npx prisma generate`
3. Rebuild the Docker image

### Black Images in Production

This typically indicates missing Canvas dependencies. Ensure:
1. Docker is used for deployment
2. The Dockerfile includes all required system libraries
3. The canvas-test endpoint returns a valid image

### Database Connection Errors

Verify:
1. `DATABASE_URL` is correctly set
2. Database server is accessible from the deployment environment
3. SSL configuration matches the database provider requirements

## License

This project is proprietary software. All rights reserved.

---

For questions or support, contact the development team.

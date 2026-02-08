# 🚀 DojoCountdown Quick Reference

## 📦 Installation

```bash
# API
cd dojo-countdown-api
npm install
cp .env.example .env
npm run prisma:migrate
npm run seed
npm run dev

# Client
cd dojo-countdown-client
npm install
npm start
```

## 🐳 Docker

```bash
# Development
docker compose up --build

# Production
docker compose -f docker-compose.prod.yml up -d
```

## 🔑 Demo Accounts

| Email | Password | Plan |
|-------|----------|------|
| demo@dojocountdown.com | Demo1234 | FREE |
| bootstrap@dojocountdown.com | Demo1234 | BOOTSTRAP |
| startup@dojocountdown.com | Demo1234 | STARTUP |

## 📊 Plan Limits

| Plan | Countdowns | Views/mo | Duration |
|------|-----------|----------|----------|
| FREE | 10 | 20K | 30 days |
| BOOTSTRAP | 100 | 100K | 90 days |
| STARTUP | 500 | 700K | 365 days |
| ENTERPRISE | ∞ | 2.8M | ∞ |

## 🔗 API Endpoints

### Auth
```bash
POST /api/v1/auth/signup
POST /api/v1/auth/login
POST /api/v1/auth/refresh
POST /api/v1/auth/logout
GET  /api/v1/auth/sessions
```

### Countdowns
```bash
GET    /api/v1/countdowns
POST   /api/v1/countdowns
GET    /api/v1/countdowns/:id
PUT    /api/v1/countdowns/:id
DELETE /api/v1/countdowns/:id
GET    /api/v1/countdowns/:id/preview
```

### Render (Public)
```bash
GET /render/:id.gif
GET /render/:id.png
```

### Usage
```bash
GET /api/v1/usage
GET /api/v1/usage/history?months=6
GET /api/v1/usage/check
```

## 🛠️ NPM Scripts

### API
```bash
npm start              # Start production
npm run dev           # Start with watch mode
npm run seed          # Seed demo data
npm run prisma:migrate # Run migrations
npm run prisma:studio # Open Prisma Studio
npm run prisma:generate # Generate client
```

### Client
```bash
npm start     # Development server
npm run build # Production build
npm test      # Run tests
```

## 📁 Key Files

### API
```
src/
├── config/plans.js           # Plan limits
├── middlewares/planLimits.js # Limit enforcement
├── services/usage.service.js # Usage tracking
├── services/render.service.js # Image rendering
└── validators/*.validator.js  # Input validation

prisma/
├── schema.prisma    # Database schema
└── seed.js         # Demo data
```

### Client
```
src/
├── components/ui/
│   ├── UpgradeNotice.jsx  # Upgrade prompts
│   ├── EmptyState.jsx     # Empty states
│   └── ErrorState.jsx     # Error handling
├── hooks/
│   ├── useAuth.js
│   ├── useCountdowns.js
│   └── useUsage.js
└── pages/
    ├── Dashboard.jsx      # Main dashboard
    ├── CountdownNew.jsx   # Create countdown
    └── Usage.jsx          # Usage stats
```

## 🔧 Environment Variables

### Required
```bash
DATABASE_URL="postgresql://..."
JWT_ACCESS_SECRET="min-32-chars"
JWT_REFRESH_SECRET="min-32-chars"
CORS_ORIGIN="http://localhost:3000"
```

### Optional
```bash
PORT=3000
NODE_ENV=development
JWT_ACCESS_EXPIRES_IN="15m"
JWT_REFRESH_EXPIRES_IN="7d"
BCRYPT_SALT_ROUNDS=12
```

## 🧪 Testing

```bash
# Health check
curl http://localhost:3000/api/v1/health

# Create countdown
curl -X POST http://localhost:3000/api/v1/countdowns \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{"title":"Test","endAt":"2026-12-31T23:59:59Z"}'

# View countdown
curl http://localhost:3000/render/COUNTDOWN_ID.gif
```

## 🚀 Deployment

### Heroku
```bash
heroku create app-name
heroku addons:create heroku-postgresql:mini
heroku config:set JWT_ACCESS_SECRET="..."
git push heroku main
heroku run npm run prisma:migrate
```

### Railway
1. Connect GitHub repo
2. Add PostgreSQL
3. Set environment variables
4. Deploy

### Docker VPS
```bash
docker compose -f docker-compose.prod.yml up -d
```

## 🔒 Security Checklist

- [ ] Secure JWT secrets set
- [ ] CORS configured
- [ ] Rate limiting enabled
- [ ] HTTPS/SSL configured
- [ ] Database backups enabled
- [ ] Error tracking setup
- [ ] Monitoring configured

## 📊 Monitoring

```bash
# Check health
curl http://localhost:3000/api/v1/health

# View logs
docker compose logs -f api

# Database GUI
npm run prisma:studio
```

## 🐛 Troubleshooting

### Database connection fails
```bash
# Check DATABASE_URL format
postgresql://user:password@host:5432/database

# Test connection
npm run prisma:studio
```

### Migrations error
```bash
# Reset database (DEV ONLY)
npx prisma migrate reset

# Generate client
npm run prisma:generate
```

### Canvas build error
```bash
# Install dependencies (Ubuntu/Debian)
sudo apt-get install build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev
```

## 📚 Documentation

- **API README**: `dojo-countdown-api/README.md`
- **Client README**: `dojo-countdown-client/README.md`
- **Deployment Guide**: `dojo-countdown-api/DEPLOYMENT.md`
- **Implementation Summary**: `dojo-countdown-api/IMPLEMENTATION_SUMMARY.md`

## 💬 Support

- 📧 support@dojocountdown.com
- 📚 docs.dojocountdown.com
- 🐛 GitHub Issues

---

**Quick Tip**: Start with demo accounts to explore features!

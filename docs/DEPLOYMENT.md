# ===========================================

# Deployment Guide

# ===========================================

This guide covers deploying DojoCountdown to various platforms.

## 📋 Pre-deployment Checklist

- [ ] All environment variables configured
- [ ] Database migrations tested
- [ ] JWT secrets are secure random strings
- [ ] CORS origins properly set
- [ ] Rate limits configured for production traffic
- [ ] SSL certificates ready (for custom domains)
- [ ] Demo data seeded (optional)
- [ ] Health check endpoint working
- [ ] Backups configured

## 🚀 Deployment Options

### 1. Heroku (Easiest)

#### Prerequisites

- Heroku CLI installed
- Heroku account

#### Steps

```bash
# 1. Login to Heroku
heroku login

# 2. Create app
heroku create dojocountdown-api

# 3. Add PostgreSQL
heroku addons:create heroku-postgresql:mini

# 4. Set environment variables
heroku config:set NODE_ENV=production
heroku config:set JWT_ACCESS_SECRET="your-secure-secret-here"
heroku config:set JWT_REFRESH_SECRET="your-secure-secret-here"
heroku config:set CORS_ORIGIN="https://yourfrontend.com"

# 5. Deploy
git push heroku main

# 6. Run migrations
heroku run npm run prisma:migrate

# 7. Seed demo data (optional)
heroku run npm run seed

# 8. Check logs
heroku logs --tail
```

#### Heroku-specific Files

Add `Procfile`:

```
web: npm start
release: npx prisma migrate deploy
```

### 2. Railway (Recommended)

#### Steps

1. Go to [railway.app](https://railway.app)
2. Click "New Project" → "Deploy from GitHub"
3. Select your repository
4. Add PostgreSQL database
5. Configure environment variables
6. Deploy automatically

Railway will:

- Auto-detect Node.js
- Install dependencies
- Run build commands
- Deploy on push

### 3. Render

#### Steps

1. Go to [render.com](https://render.com)
2. Create "New Web Service"
3. Connect GitHub repository
4. Configure:
   - Build Command: `npm install && npx prisma generate`
   - Start Command: `npm start`
5. Add PostgreSQL database
6. Set environment variables
7. Deploy

### 4. DigitalOcean App Platform

```bash
# 1. Install doctl CLI
snap install doctl

# 2. Authenticate
doctl auth init

# 3. Create app
doctl apps create --spec .do/app.yaml

# 4. Monitor deployment
doctl apps list
```

`.do/app.yaml`:

```yaml
name: dojocountdown-api
services:
  - name: api
    github:
      repo: yourusername/dojo-countdown-api
      branch: main
    run_command: npm start
    environment_slug: node-js
    envs:
      - key: NODE_ENV
        value: production
      - key: JWT_ACCESS_SECRET
        value: ${JWT_ACCESS_SECRET}
    http_port: 3000
databases:
  - name: db
    engine: PG
    version: '15'
```

### 5. AWS (Advanced)

#### Using Elastic Beanstalk

```bash
# 1. Install EB CLI
pip install awsebcli

# 2. Initialize
eb init -p node.js dojocountdown-api

# 3. Create environment
eb create production

# 4. Set environment variables
eb setenv NODE_ENV=production \
  JWT_ACCESS_SECRET=your-secret \
  DATABASE_URL=your-db-url

# 5. Deploy
eb deploy
```

#### Using ECS (Docker)

1. Push image to ECR
2. Create ECS cluster
3. Define task definition
4. Create service
5. Configure load balancer
6. Set up RDS for PostgreSQL

### 6. Docker + VPS

For any VPS (DigitalOcean Droplet, AWS EC2, etc.):

```bash
# 1. SSH into server
ssh user@your-server-ip

# 2. Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# 3. Clone repository
git clone <your-repo>
cd dojo-countdown-api

# 4. Create .env.production
nano .env.production

# 5. Deploy with Docker Compose
docker compose -f docker-compose.prod.yml up -d

# 6. Check logs
docker compose logs -f api

# 7. Set up auto-start
# Add to systemd or use Docker's restart policies
```

### 7. Kubernetes (Enterprise)

```yaml
# kubernetes/deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: dojocountdown-api
spec:
  replicas: 3
  selector:
    matchLabels:
      app: dojocountdown-api
  template:
    metadata:
      labels:
        app: dojocountdown-api
    spec:
      containers:
        - name: api
          image: your-registry/dojocountdown-api:latest
          ports:
            - containerPort: 3000
          env:
            - name: NODE_ENV
              value: 'production'
            - name: DATABASE_URL
              valueFrom:
                secretKeyRef:
                  name: db-secret
                  key: url
```

## 🗄️ Database Options

### Managed PostgreSQL Services

| Provider         | Service             | Notes                |
| ---------------- | ------------------- | -------------------- |
| **Heroku**       | Heroku Postgres     | Easiest, integrated  |
| **AWS**          | RDS PostgreSQL      | Scalable, enterprise |
| **Google Cloud** | Cloud SQL           | Good performance     |
| **Azure**        | Azure Database      | Microsoft ecosystem  |
| **DigitalOcean** | Managed Databases   | Cost-effective       |
| **Railway**      | PostgreSQL          | Simple setup         |
| **Supabase**     | PostgreSQL          | Free tier available  |
| **Neon**         | Serverless Postgres | Auto-scaling         |

### Database Connection

Always use connection pooling in production:

```javascript
// Add to datasource in schema.prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
  // Add for connection pooling
  shadowDatabaseUrl = env("SHADOW_DATABASE_URL")
}
```

## 🔒 Security Checklist

- [ ] Use HTTPS (SSL/TLS certificates)
- [ ] Secure JWT secrets (use secret manager)
- [ ] Enable rate limiting
- [ ] Configure CORS properly
- [ ] Use environment variables for secrets
- [ ] Enable helmet security headers
- [ ] Set up database backups
- [ ] Use connection pooling
- [ ] Enable logging and monitoring
- [ ] Set up alerts for errors
- [ ] Implement IP whitelisting (if needed)
- [ ] Regular security updates

## 📊 Monitoring

### Recommended Tools

- **Logging**: Papertrail, Loggly, DataDog
- **APM**: New Relic, DataDog, AppSignal
- **Uptime**: UptimeRobot, Pingdom, StatusCake
- **Error Tracking**: Sentry, Rollbar, Bugsnag

### Health Check

Monitor: `GET /api/v1/health`

Set up alerts if:

- Response time > 1000ms
- Status code != 200
- Database connection fails

## 🔄 CI/CD

### GitHub Actions

`.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm test

      - name: Deploy to Heroku
        uses: akhileshns/heroku-deploy@v3.12.12
        with:
          heroku_api_key: ${{secrets.HEROKU_API_KEY}}
          heroku_app_name: 'dojocountdown-api'
          heroku_email: 'your@email.com'
```

## 🌐 Domain Setup

1. **Get domain** (Namecheap, GoDaddy, etc.)
2. **Configure DNS**:
   ```
   A Record: @ → Your server IP
   CNAME: www → your-app.herokuapp.com
   ```
3. **Set up SSL** (Let's Encrypt, Cloudflare)
4. **Update CORS_ORIGIN** in environment variables

## 📈 Scaling

### Horizontal Scaling

- Add more server instances
- Use load balancer
- Database read replicas

### Vertical Scaling

- Upgrade server resources
- Optimize database queries
- Add caching (Redis)

### Performance Tips

- Enable compression
- Use CDN for static assets
- Implement database indexes
- Add caching layer
- Optimize image generation

## 🔧 Maintenance

### Regular Tasks

- [ ] Monitor logs daily
- [ ] Check error rates
- [ ] Review usage metrics
- [ ] Update dependencies monthly
- [ ] Database backups (automated)
- [ ] Security patches
- [ ] Performance optimization

### Backup Strategy

- Database: Daily automated backups
- Code: Git version control
- Secrets: Secure secret manager
- Configuration: Document all settings

## 📞 Support

If you need help with deployment:

- 📧 Email: devops@dojocountdown.com
- 💬 Discord: [Join our server](https://discord.gg/dojocountdown)
- 📚 Docs: [docs.dojocountdown.com](https://docs.dojocountdown.com)

---

Good luck with your deployment! 🚀

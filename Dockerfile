# Step 1: Base image
FROM node:18-bullseye-slim

# Step 2: Install system libraries required by 'canvas'
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
    && rm -rf /var/lib/apt/lists/*

# Step 3: Set working directory
WORKDIR /app

# Step 4: Copy package.json & package-lock.json
COPY package*.json ./

# Step 5: Install Node.js dependencies
RUN npm ci

# Step 6: Copy Prisma schema & generate client
COPY prisma ./prisma
RUN npx prisma generate

# Step 7: Copy the rest of your source code
COPY . .

# Step 8: Expose port for local testing (Elastic Beanstalk default is 3000)
EXPOSE 3000

# Step 9: Start server
CMD ["node", "src/server.js"]

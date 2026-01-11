FROM node:18-bullseye-slim

# Step 2: Install system libraries that 'canvas' package needs
# These are the libraries that caused your build to fail earlier
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

# Step 3: Set working directory inside the container
WORKDIR /app

# Step 4: Copy package.json and package-lock.json first
# (This helps Docker cache the npm install step)
COPY package*.json ./

# Step 5: Install Node.js dependencies
RUN npm ci

# Copy prisma schema BEFORE generate
COPY prisma ./prisma

# Generate Prisma Client for THIS environment (debian-openssl-1.1.x)
RUN npx prisma generate


# Step 6: Copy the rest of your source code
COPY . .

# Step 7: Tell Docker this app uses port 3000
EXPOSE 3000

# Step 8: Command to start the app
CMD ["npm", "start"]

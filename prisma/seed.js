// ===========================================
// Database Seeding Script
// ===========================================
// Creates demo data for development and testing.
//
// USAGE:
//   node prisma/seed.js
//
// Creates:
// - Demo user accounts (FREE, BOOTSTRAP, STARTUP plans)
// - Sample countdowns with various styles
// - Usage statistics

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const DEMO_PASSWORD = 'Demo1234';
const BCRYPT_ROUNDS = 10;

/**
 * Demo users to create.
 */
const DEMO_USERS = [
  {
    email: 'demo@dojocountdown.com',
    name: 'Demo User',
    plan: 'FREE',
    password: DEMO_PASSWORD,
  },
  {
    email: 'bootstrap@dojocountdown.com',
    name: 'Bootstrap User',
    plan: 'BOOTSTRAP',
    password: DEMO_PASSWORD,
  },
  {
    email: 'startup@dojocountdown.com',
    name: 'Startup User',
    plan: 'STARTUP',
    password: DEMO_PASSWORD,
  },
];

/**
 * Sample countdown configurations.
 */
const SAMPLE_COUNTDOWNS = [
  {
    title: 'Product Launch',
    daysFromNow: 30,
    styleConfig: {
      fontFamily: 'Arial, sans-serif',
      fontSize: 48,
      fontColor: '#FFFFFF',
      backgroundColor: '#1a1a2e',
      accentColor: '#e94560',
      layout: 'horizontal',
      showLabels: true,
      labelStyle: 'short',
      showDays: true,
      showHours: true,
      showMinutes: true,
      showSeconds: true,
    },
  },
  {
    title: 'Flash Sale Ends',
    daysFromNow: 3,
    styleConfig: {
      fontFamily: 'Arial, sans-serif',
      fontSize: 56,
      fontColor: '#ff0000',
      backgroundColor: '#000000',
      accentColor: '#ffff00',
      layout: 'horizontal',
      showLabels: true,
      labelStyle: 'full',
      showDays: true,
      showHours: true,
      showMinutes: true,
      showSeconds: true,
    },
  },
  {
    title: 'Conference Registration',
    daysFromNow: 90,
    styleConfig: {
      fontFamily: 'Arial, sans-serif',
      fontSize: 42,
      fontColor: '#2c3e50',
      backgroundColor: '#ecf0f1',
      accentColor: '#3498db',
      layout: 'horizontal',
      showLabels: true,
      labelStyle: 'short',
      showDays: true,
      showHours: true,
      showMinutes: false,
      showSeconds: false,
    },
  },
  {
    title: 'Summer Sale 2026',
    daysFromNow: 150,
    styleConfig: {
      fontFamily: 'Arial, sans-serif',
      fontSize: 48,
      fontColor: '#ffffff',
      backgroundColor: '#ff6b6b',
      accentColor: '#ffd93d',
      layout: 'horizontal',
      showLabels: true,
      labelStyle: 'short',
      showDays: true,
      showHours: true,
      showMinutes: true,
      showSeconds: true,
    },
  },
  {
    title: 'Beta Access Opens',
    daysFromNow: 14,
    styleConfig: {
      fontFamily: 'Arial, sans-serif',
      fontSize: 52,
      fontColor: '#00ff00',
      backgroundColor: '#1a1a1a',
      accentColor: '#00ffff',
      layout: 'horizontal',
      showLabels: true,
      labelStyle: 'full',
      showDays: true,
      showHours: true,
      showMinutes: true,
      showSeconds: true,
    },
  },
];

/**
 * Creates a user with usage stats.
 */
async function createUser(userData) {
  const hashedPassword = await bcrypt.hash(userData.password, BCRYPT_ROUNDS);

  const user = await prisma.user.create({
    data: {
      email: userData.email,
      name: userData.name,
      password: hashedPassword,
      plan: userData.plan,
      isVerified: true,
      usageStats: {
        create: {
          countdownsCreated: 0,
          activeCountdowns: 0,
          monthlyViews: 0,
          totalViews: 0,
          currentPeriodStart: new Date(),
          currentPeriodEnd: new Date(
            new Date().setMonth(new Date().getMonth() + 1),
          ),
        },
      },
    },
    include: {
      usageStats: true,
    },
  });

  console.log(`✓ Created user: ${user.email} (${user.plan})`);
  return user;
}

/**
 * Creates sample countdowns for a user.
 */
async function createCountdowns(userId, count = 3) {
  const countdowns = [];

  for (let i = 0; i < Math.min(count, SAMPLE_COUNTDOWNS.length); i++) {
    const config = SAMPLE_COUNTDOWNS[i];
    const endAt = new Date();
    endAt.setDate(endAt.getDate() + config.daysFromNow);

    const countdown = await prisma.countdown.create({
      data: {
        ownerId: userId,
        title: config.title,
        endAt: endAt,
        timezone: 'UTC',
        status: 'ACTIVE',
        styleConfig: config.styleConfig,
        viewCount: Math.floor(Math.random() * 1000),
      },
    });

    countdowns.push(countdown);
    console.log(`  ✓ Created countdown: ${countdown.title}`);
  }

  return countdowns;
}

/**
 * Creates usage month record for current month.
 */
async function createUsageMonth(userId, plan) {
  const now = new Date();
  const limits = {
    FREE: 20000,
    BOOTSTRAP: 100000,
    STARTUP: 700000,
    ENTERPRISE: 2800000,
  };

  const usageMonth = await prisma.usageMonth.create({
    data: {
      userId,
      year: now.getUTCFullYear(),
      month: now.getUTCMonth() + 1,
      viewsUsed: Math.floor(Math.random() * (limits[plan] * 0.6)),
      viewsLimit: limits[plan],
    },
  });

  console.log(`  ✓ Created usage month record`);
  return usageMonth;
}

/**
 * Main seeding function.
 */
async function main() {
  console.log('\n🌱 Starting database seeding...\n');

  // Clear existing demo data
  console.log('🗑️  Cleaning up existing demo data...');
  await prisma.usageMonth.deleteMany({
    where: {
      user: {
        email: {
          in: DEMO_USERS.map((u) => u.email),
        },
      },
    },
  });

  await prisma.countdown.deleteMany({
    where: {
      owner: {
        email: {
          in: DEMO_USERS.map((u) => u.email),
        },
      },
    },
  });

  await prisma.usageStats.deleteMany({
    where: {
      user: {
        email: {
          in: DEMO_USERS.map((u) => u.email),
        },
      },
    },
  });

  await prisma.refreshToken.deleteMany({
    where: {
      user: {
        email: {
          in: DEMO_USERS.map((u) => u.email),
        },
      },
    },
  });

  await prisma.user.deleteMany({
    where: {
      email: {
        in: DEMO_USERS.map((u) => u.email),
      },
    },
  });

  console.log('✓ Cleanup complete\n');

  // Create demo users with countdowns
  console.log('👥 Creating demo users...\n');

  for (const userData of DEMO_USERS) {
    const user = await createUser(userData);

    // Create countdowns based on plan
    const countdownCount = {
      FREE: 3,
      BOOTSTRAP: 5,
      STARTUP: 5,
    }[user.plan];

    await createCountdowns(user.id, countdownCount);
    await createUsageMonth(user.id, user.plan);

    // Update usage stats
    const activeCount = await prisma.countdown.count({
      where: { ownerId: user.id, status: 'ACTIVE' },
    });

    await prisma.usageStats.update({
      where: { userId: user.id },
      data: {
        countdownsCreated: countdownCount,
        activeCountdowns: activeCount,
      },
    });

    console.log('');
  }

  console.log('✅ Seeding completed successfully!\n');
  console.log('📝 Demo Credentials:');
  console.log('   Email: demo@dojocountdown.com');
  console.log('   Password: Demo1234\n');
  console.log('   Email: bootstrap@dojocountdown.com');
  console.log('   Password: Demo1234\n');
  console.log('   Email: startup@dojocountdown.com');
  console.log('   Password: Demo1234\n');
}

main()
  .catch((error) => {
    console.error('\n❌ Error during seeding:');
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

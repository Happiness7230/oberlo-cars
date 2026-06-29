import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import bcrypt from "bcryptjs";

const connectionString = process.env.DATABASE_URL;
const pool = new pg.Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Starting seeding process...");
  const adminEmail = "happiness@mikaelsoninitiative.org";

  // 1. Check if admin already exists
  const existing = await prisma.user.findFirst({
    where: { email: adminEmail },
  });

  if (!existing) {
    const password = process.env.SEED_ADMIN_PASSWORD || "happiness@123";
    const passwordHash = await bcrypt.hash(password, 12);

    await prisma.user.create({
      data: {
        email:        adminEmail,
        name:         "Mikaelson Admin",
        role:         "SUPERADMIN",
        provider:     "CREDENTIALS",
        passwordHash,
        emailVerified: new Date(),
      },
    });

    console.log("✅ Default SUPERADMIN created successfully");
  } else {
    console.log("ℹ️ Admin user already exists. Skipping admin creation.");
  }

  // 2. Seed Schools (10 Chapters)
  const schoolsCount = await prisma.schoolChapter.count();
  if (schoolsCount === 0) {
    console.log("Seeding 10 Schools...");
    const schools = Array.from({ length: 10 }).map((_, i) => ({
      name: `Mikaelson Chapter School ${i + 1}`,
      city: `City ${i + 1}`,
      country: `Country`,
      coordinatorName: `Coordinator ${i + 1}`,
      coordinatorEmail: `coordinator${i + 1}@example.com`,
      status: "ACTIVE" as const,
    }));
    await prisma.schoolChapter.createMany({ data: schools });
    console.log("✅ 10 Schools seeded.");
  } else {
    console.log("ℹ️ Schools already seeded.");
  }

  // 3. Seed Core Team (11 members)
  const teamCount = await prisma.teamMember.count();
  if (teamCount === 0) {
    console.log("Seeding 11 Team Members...");
    const team = Array.from({ length: 11 }).map((_, i) => ({
      name: `Core Team Member ${i + 1}`,
      role: i === 0 ? "Executive Director" : `Director of Dept ${i}`,
      email: `team${i + 1}@mikaelsoninitiative.org`,
      bio: `A dedicated member of the Mikaelson Initiative since 202${i % 4}.`,
      avatarUrl: "https://via.placeholder.com/400",
      sortOrder: i,
    }));
    await prisma.teamMember.createMany({ data: team });
    console.log("✅ 11 Team Members seeded.");
  } else {
    console.log("ℹ️ Team already seeded.");
  }

  // 4. Seed Blog Posts (3 stories)
  const blogCount = await prisma.blogPost.count();
  if (blogCount === 0) {
    console.log("Seeding 3 Blog Posts...");
    const posts = Array.from({ length: 3 }).map((_, i) => ({
      title: `Inspiring Story #${i + 1} from our Chapters`,
      category: "Stories",
      author: "Mikaelson Team",
      slug: `inspiring-story-${i + 1}`,
      excerpt: "Read about how our students are changing the local community...",
      content: "<p>Full story content goes here.</p>",
      readingTime: 5,
    }));
    await prisma.blogPost.createMany({ data: posts });
    console.log("✅ 3 Blog Posts seeded.");
  } else {
    console.log("ℹ️ Blog Posts already seeded.");
  }

  // 5. Seed Calendar Events (3 upcoming, 3 past)
  const eventCount = await prisma.event.count();
  if (eventCount === 0) {
    console.log("Seeding 6 Events...");
    const upcoming = Array.from({ length: 3 }).map((_, i) => ({
      title: `Upcoming Initiative Event ${i + 1}`,
      date: new Date(Date.now() + (i + 1) * 86400000 * 5),
      time: "10:00 AM",
      location: "Virtual",
      description: "Join us for our upcoming training session.",
      isPast: false,
    }));
    const past = Array.from({ length: 3 }).map((_, i) => ({
      title: `Past Initiative Event ${i + 1}`,
      date: new Date(Date.now() - (i + 1) * 86400000 * 5),
      time: "2:00 PM",
      location: "London, UK",
      description: "A wonderful event we hosted previously.",
      isPast: true,
    }));
    await prisma.event.createMany({ data: [...upcoming, ...past] });
    console.log("✅ 6 Events seeded.");
  } else {
    console.log("ℹ️ Events already seeded.");
  }

  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("✅ Seeding Complete!");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });

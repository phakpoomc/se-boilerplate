import { prisma } from "../src";

async function main() {
  const count = await prisma.showcaseItem.count();
  if (count > 0) {
    console.log("Seed skipped: showcase items already exist.");
    return;
  }

  await prisma.showcaseItem.createMany({
    data: [
      {
        title: "Explore the starter",
        description: "Try creating, editing, completing, and deleting an item.",
        completed: false
      },
      {
        title: "Choose a design direction",
        description: "Replace docs/ai/DESIGN_SYSTEM.md with your project style.",
        completed: true
      }
    ]
  });
  console.log("Seeded showcase items.");
}

main()
  .finally(async () => prisma.$disconnect());

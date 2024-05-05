// import { products } from "./products";


// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();


// async function main() {
//   for (let product of products) {
//     await prisma.user.create({
//       data:product
//     })
//   }
// }

// main()
//   .then(async () => {
//     await prisma.$disconnect()
//   })
//   .catch(async (e) => {
//     console.error(e)
//     await prisma.$disconnect()
//     process.exit(1)
//   })


import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function seedDatabase() {
  try {
    for (let i = 0; i < 100; i++) {
      await prisma.user.create({
        data: {
          name: faker.name.fullName(),
          email: faker.internet.email().toLowerCase(),
          address: faker.address.streetAddress(),
        },
      });
    }
    console.log("Database seeded successfully.");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seedDatabase();

import db from "./client.js";

import { faker } from "@faker-js/faker";
import { createUser } from "./queries/users.js";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  for (let i = 0; i < 10; i++) {
    const user = {
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      bio: faker.person.bio(),
      profile_picture_url: faker.image.avatar(),
      location: faker.location.state,
    };
    await createUser(user);
  }
}

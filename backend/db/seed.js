import db from "./client.js";
import { faker } from "@faker-js/faker";

import { createUser } from "./queries/users.js";
import { createClub } from "./queries/clubs.js";
import { createClubMembership } from "./queries/club_memberships.js";
import { createFollower } from "./queries/followers.js";
import { createPost } from "./queries/posts.js";
import { createPostPicture } from "./queries/post_pictures.js";
import { createPostAttendee } from "./queries/post_attendees.js";
import { createPostComment } from "./queries/post_comments.js";
import { createPostLike } from "./queries/post_likes.js";
import { createCommentLike } from "./queries/comment_likes.js";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seedUsers() {
  const users = [];

  for (let i = 0; i < 10; i++) {
    const user = await createUser({
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    });

    users.push(user);
  }

  return users;
}

async function seedClubs(users) {
  const clubs = [];

  for (let i = 0; i < 3; i++) {
    const owner = users[Math.floor(Math.random() * users.length)];

    const club = await createClub({
      name: faker.company.name(),
      description: faker.lorem.paragraph(),
      owner: owner.id,
    });

    clubs.push(club);
  }
  return clubs;
}

// async function seedClubMemberships() {}
// async function seedFollowers() {}
// async function seedPosts() {}
// async function seedPostPictures() {}
// async function seedPostAttendees() {}
// async function seedPostComments() {}
// async function seedPostLikes() {}
// async function seedCommentLikes() {}

async function seed() {
  try {
    const users = await seedUsers();
    const clubs = await seedClubs(users);
    // await seedClubMemberships(users, clubs);
    // await seedFollowers();
    // posts = await seedPosts();
    // await seedPostPictures();
    // await seedPostAttendees();
    // comments = await seedPostComments();
    // await seedPostLikes();
    // await seedCommentLikes();
  } catch (error) {
    console.error(error);
  } finally {
  }
}

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

async function seedClubMemberships(users, clubs) {
  for (let i = 0; i < users.length; i++) {
    const userId = users[i].id;
    const clubId = clubs[Math.floor(Math.random() * clubs.length)].id;
    await createClubMembership({ userId, clubId });
  }
}

async function seedFollowers(users) {
  for (let i = 0; i < users.length; i++) {
    const followerId = users[i].id;

    for (let j = 0; j < users.length; j++) {
      const followedUserId = users[j].id;

      const willFollow = Math.random() > 0.5;

      if (followerId !== followedUserId && willFollow) {
        await createFollower({ followerId, followedUserId });
      }
    }
  }
}
async function seedPosts(clubs) {
  const posts = [];

  for (let i = 0; i < clubs.length; i++) {
    const clubId = clubs[i].id;

    for (let j = 0; j < 3; j++) {
      const post = await createPost({
        clubId: clubId,
        hostId: clubId.owner,
        title: faker.lorem.words({ min: 3, max: 5 }),
        startsAt: faker.date.soon({ days: 14 }),
        typeOfRun: faker.helpers.arrayElement([
          "Race",
          "Long Run",
          "Easy Run",
          "Tempo",
          "Intervals",
        ]),
        distance: faker.number.float({ min: 1, max: 20, fractionDigits: 1 }),
        terrain: faker.helpers.arrayElement([
          "Road",
          "Trail",
          "Track",
          "Mixed",
        ]),
        address: faker.location.streetAddress({ fullAddress: true }),
      });

      posts.push(post);
    }
  }
  return posts;
}

async function seedPostPictures(users, posts) {
  for (let i = 0; i < posts.length; i++) {
    const postId = posts[i].id;

    for (let j = 0; j < 2; j++) {
      createPostPicture({
        postId: postId,
        userId: users[Math.floor(Math.random() * users.length)].id,
        imageUrl: faker.image.url(),
      });
    }
  }
}

async function seedPostAttendees(users, posts) {
  for (let i = 0; i < posts.length; i++) {
    const postId = posts[i].id;

    for (let j = 0; j < users.length; j++) {
      const userId = users[j].id;

      const isAttending = Math.random() > 0.5;

      if (isAttending) {
        await createPostAttendee({ postId, userId });
      }
    }
  }
}

async function seedPostComments(users, posts) {
  const comments = [];

  for (let i = 0; i < posts.length; i++) {
    const postId = posts[i].id;

    for (let j = 0; j < 2; j++) {
      const userId = users[Math.floor(Math.random() * users.length)].id;

      const comment = await createPostComment({
        postId: postId,
        userId: userId,
        content: faker.lorem.sentence(),
      });

      comments.push(comment);
    }
  }

  return comments;
}

async function seedPostLikes(users, posts) {
  for (let i = 0; i < posts.length; i++) {
    const postId = posts[i].id;

    for (let j = 0; j < 5; j++) {
      const userId = users[j].id;

      await createPostLike({ postId, userId });
    }
  }
}

async function seedCommentLikes(users, comments) {
  for (let i = 0; i < comments.length; i++) {
    const commentId = comments[i].id;

    for (let j = 0; j < 5; j++) {
      const userId = users[j].id;

      await createCommentLike({ commentId, userId });
    }
  }
}

async function seed() {
  const users = await seedUsers();
  const clubs = await seedClubs(users);
  await seedClubMemberships(users, clubs);
  await seedFollowers(users);
  const posts = await seedPosts(clubs);
  await seedPostPictures(users, posts);
  await seedPostAttendees(users, posts);
  const comments = await seedPostComments(users, posts);
  await seedPostLikes(users, posts);
  await seedCommentLikes(users, comments);
}

async function runSeeder() {
  try {
    await seed();
    console.log("🌱 Database seeded.");
  } catch (err) {
    console.error("❌ Seed failed:", err);
  } finally {
    await db.end();
  }
}

runSeeder();

// import { prisma } from "./lib/prisma";

// async function main() {
//   // Create a new user with a post
//   const user = await prisma.user.create({
//     data: {
//       name: "Alice",
//       email: "alice@prisma.io",
//       posts: {
//         create: {
//           title: "Hello World",
//           content: "This is my first post!",
//           published: true,
//         },
//       },
//     },
//     include: {
//       posts: true,
//     },
//   });
//   console.log("Created user:", user);

//   // Fetch all users with their posts
//   const allUsers = await prisma.user.findMany({
//     include: {
//       posts: true,
//     },
//   });
//   console.log("All users:", JSON.stringify(allUsers, null, 2));
// }

// main()
//   .then(async () => {
//     await prisma.$disconnect();
//   })
//   .catch(async (e) => {
//     console.error(e);
//     await prisma.$disconnect();
//     process.exit(1);
//   });
import { prisma } from "./lib/prisma";
import bcrypt from 'bcryptjs';

async function main() {
  // Create multiple users
  const hashedPassword = await bcrypt.hash('123456', 10);
  const user1 = await prisma.user.create({
    data: {
      email: "admin@example.com",
      password: hashedPassword,
      name: "Admin User",
      role: "ADMIN",
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: "dev@example.com",
      password: hashedPassword,
      name: "Developer User",
      role: "DEV",
    },
  });

  const user3 = await prisma.user.create({
    data: {
      email: "tester@example.com",
      password: hashedPassword,
      name: "Tester User",
      role: "TESTER",
    },
  });

  console.log("Created users:", user1.email, user2.email, user3.email);

  // Create tickets
  const ticket1 = await prisma.ticket.create({
    data: {
      title: "Bug in user authentication",
      description: "Users are unable to log in with correct credentials.",
      status: "OPEN",
      priority: "HIGH",
      createdBy: user1.id,
      assignedTo: user2.id,
      dueDate: new Date(new Date().setDate(new Date().getDate() + 7)), // 7 days from now
    },
  });

  const ticket2 = await prisma.ticket.create({
    data: {
      title: "Feature: Implement dark mode",
      description: "Add a dark mode toggle to the application UI.",
      status: "IN_PROGRESS",
      priority: "MEDIUM",
      createdBy: user1.id,
      assignedTo: user3.id,
    },
  });

  console.log("Created tickets:", ticket1.title, ticket2.title);

  // Create comments
  await prisma.comment.create({
    data: {
      content: "I will investigate this issue immediately.",
      ticketId: ticket1.id,
      userId: user2.id,
    },
  });

  await prisma.comment.create({
    data: {
      content: "Looking into possible solutions.",
      ticketId: ticket1.id,
      userId: user2.id,
    },
  });

  await prisma.comment.create({
    data: {
      content: "Great idea! I'll start working on the design.",
      ticketId: ticket2.id,
      userId: user3.id,
    },
  });

  console.log("Created comments.");

  // Fetch all data to verify
  const allUsers = await prisma.user.findMany({
    include: {
      createdTickets: true,
      assignedTickets: true,
      comments: true,
    },
  });
  console.log("All users with relations:", JSON.stringify(allUsers, null, 2));

  const allTickets = await prisma.ticket.findMany({
    include: {
      creator: true,
      assignee: true,
      comments: true,
    },
  });
  console.log("All tickets with relations:", JSON.stringify(allTickets, null, 2));

  const allComments = await prisma.comment.findMany({
    include: {
      user: true,
      ticket: true,
    },
  });
  console.log("All comments with relations:", JSON.stringify(allComments, null, 2));
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
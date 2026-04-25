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
import bcrypt from "bcryptjs";

async function main() {
  const hashedPassword = await bcrypt.hash("123456", 10);

  //////////////////////
  // USERS
  //////////////////////
  const admin = await prisma.user.create({
    data: {
      email: "admin@gmail.com",
      password: hashedPassword,
      name: "Quản trị viên",
      role: "ADMIN",
    },
  });

  const dev1 = await prisma.user.create({
    data: {
      email: "dev1@gmail.com",
      password: hashedPassword,
      name: "Nguyễn Văn Dev",
      role: "DEV",
    },
  });

  const dev2 = await prisma.user.create({
    data: {
      email: "dev2@gmail.com",
      password: hashedPassword,
      name: "Trần Văn Dev",
      role: "DEV",
    },
  });

  const tester1 = await prisma.user.create({
    data: {
      email: "tester1@gmail.com",
      password: hashedPassword,
      name: "Lê Thị Tester",
      role: "TESTER",
    },
  });

  const tester2 = await prisma.user.create({
    data: {
      email: "tester2@gmail.com",
      password: hashedPassword,
      name: "Phạm Văn Tester",
      role: "TESTER",
    },
  });

  console.log("Đã tạo users");

  //////////////////////
  // TICKETS
  //////////////////////
  const ticket1 = await prisma.ticket.create({
    data: {
      title: "Lỗi đăng nhập hệ thống",
      description: "Người dùng không thể đăng nhập dù nhập đúng mật khẩu",
      status: "OPEN",
      priority: "HIGH",
      createdBy: admin.id,
      dueDate: new Date(new Date().setDate(new Date().getDate() + 7)),

      ticketUsers: {
        create: [
          {
            userId: dev1.id,
            role: "DEV",
            isMain: true,
          },
          {
            userId: dev2.id,
            role: "DEV",
            isMain: false,
          },
          {
            userId: tester1.id,
            role: "TESTER",
            isMain: true,
          },
        ],
      },
    },
  });

  const ticket2 = await prisma.ticket.create({
    data: {
      title: "Thêm chức năng chế độ tối",
      description: "Cho phép người dùng bật/tắt dark mode",
      status: "IN_PROGRESS",
      priority: "MEDIUM",
      createdBy: admin.id,

      ticketUsers: {
        create: [
          {
            userId: dev2.id,
            role: "DEV",
            isMain: true,
          },
          {
            userId: tester2.id,
            role: "TESTER",
            isMain: true,
          },
        ],
      },
    },
  });

  console.log("Đã tạo tickets");

  //////////////////////
  // COMMENTS
  //////////////////////
  await prisma.comment.createMany({
    data: [
      {
        content: "Tôi sẽ kiểm tra lỗi này ngay",
        ticketId: ticket1.id,
        userId: dev1.id,
      },
      {
        content: "Đã xác định được nguyên nhân, đang fix",
        ticketId: ticket1.id,
        userId: dev1.id,
      },
      {
        content: "Giao diện dark mode đang được thiết kế",
        ticketId: ticket2.id,
        userId: dev2.id,
      },
      {
        content: "Sau khi xong dev sẽ tiến hành test",
        ticketId: ticket2.id,
        userId: tester2.id,
      },
    ],
  });

  console.log("Đã tạo comments");

  //////////////////////
  // VERIFY DATA
  //////////////////////
  const tickets = await prisma.ticket.findMany({
    include: {
      creator: true,
      ticketUsers: {
        include: {
          user: true,
        },
      },
      comments: true,
    },
  });

  console.log("Dữ liệu tickets:");
  console.dir(tickets, { depth: null });
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
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import * as bcrypt from "bcryptjs";
// generating dummy records for db migration
async function main() {
  const salt = bcrypt.genSalt(10);
  // Priorities insertion
  const high = await prisma.priority.create({
    data: {
      id: "ckzoxacpk0022xwve01klp2at",
      description: "ALTA",
    },
  });
  const medium = await prisma.priority.create({
    data: {
      id: "ckzoxacpk0024xwve7i0c54cu",
      description: "MEDIA",
    },
  });
  const low = await prisma.priority.create({
    data: {
      id: "ckzoxacpk0026xwvefhmmhf0m",
      description: "BAJA",
    },
  });

  // Status insertion
  const created = await prisma.status.create({
    data: {
      id: "ckzoxvehl0104xwvelmy7vxms",
      description: "CREADA",
    },
  });
  const assigned = await prisma.status.create({
    data: {
      id: "ckzoxvehl0106xwve8ny3k40d",
      description: "ASIGNADA",
    },
  });
  const pending = await prisma.status.create({
    data: {
      id: "ckzoxvehl0108xwve5cmvam4m",
      description: "PENDIENTE",
    },
  });
  const done = await prisma.status.create({
    data: {
      id: "ckzoxvehl0110xwvebrmpk8zv",
      description: "FINALIZADA",
    },
  });
  const cancelled = await prisma.status.create({
    data: {
      id: "ckzoxvehl0112xwvedz03bjym",
      description: "CANCELADA",
    },
  });

  //user status insertion
  const active = await prisma.userStatus.create({
    data: {
      id: "ckzual8pp00215wveqxr3irxb",
      description: "ACTIVE",
    },
  });
  const deleted = await prisma.userStatus.create({
    data: {
      id: "ckzual8pp00195wvelk0vuo51",
      description: "DELETED",
    },
  });

  //users insertion
  const adminPassword = hashPassword("admin123");
  const admin = await prisma.users.create({
    data: {
      id: "ckzoy10nv0178xwvet7z19i36",
      createdDate: new Date(),
      username: "admin@admintest.com",
      role: "admin",
      password: adminPassword,
      statusId: "ckzual8pp00215wveqxr3irxb",
      lastLoginDate: new Date(),
    },
  });

  const userPassword = hashPassword("user123");
  const user = await prisma.users.create({
    data: {
      id: "ckzoy10nv0176xwve650ju1os",
      createdDate: new Date(),
      username: "user@usertest.com",
      role: "user",
      password: userPassword,
      statusId: "ckzual8pp00215wveqxr3irxb",
      lastLoginDate: new Date(),
    },
  });

  //Dashboard insertion
  const dashboard = await prisma.dashboard.create({
    data: {
      id: "ckzrbhl920066g8vee57u243c",
      name: "test dashboard",
      ownerId: "ckzoy10nv0178xwvet7z19i36",
    },
  });

  //Tasks insertion
  const taskTest = await prisma.task.create({
    data: {
      description: "test task",
      id: "ckzrdn1hc0106q4ve5tpzzlmo",
      createdDate: new Date(),
      dueDate: new Date(),
      responsibleId: "ckzoy10nv0176xwve650ju1os",
      createdById: "ckzoy10nv0178xwvet7z19i36",
      statusId: "ckzoxvehl0106xwve8ny3k40d",
      priorityId: "ckzoxacpk0024xwve7i0c54cu",
      dashboardId: "ckzrbhl920066g8vee57u243c",
    },
  });

  //user dashboard insertion
  const userDashboard = await prisma.dashboardUser.create({
    data: {
      id: "ckzuaqie601955wve83tjuo4f",
      userId: "ckzoy10nv0176xwve650ju1os",
      dashboardId: "ckzrbhl920066g8vee57u243c",
    },
  });
}

function hashPassword(password): string {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

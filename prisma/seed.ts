import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// generating dummy records for db migration
async function main() {
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

  //users insertion
  const admin = await prisma.users.create({
    data: {
      id: "ckzoy10nv0178xwvet7z19i36",
      createdDate: new Date(),
      username: "admin",
      role: "admin",
    },
  });

  const user = await prisma.users.create({
    data: {
      id: "ckzoy10nv0176xwve650ju1os",
      createdDate: new Date(),
      username: "user",
      role: "user",
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

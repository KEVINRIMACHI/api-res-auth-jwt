import { PrismaClient } from "@prisma/client";

//instanciamos el prismaClient
const prisma = new PrismaClient()

export default prisma.user;
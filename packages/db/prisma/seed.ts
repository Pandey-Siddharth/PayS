import { PrismaClient } from '@prisma/client'
import bcrypt from "bcrypt";

const prisma = new PrismaClient()

async function main() {
  
    const test = await prisma.user.upsert({
        where: { number: '1112223334' },
        update: {},
        create: {
          number: '1112223334',
          password: await bcrypt.hash('test', 10),
          name: 'test',
          Balance: {
            create: {
                amount: 0,
                locked: 0
            }
          },
        },
      })


  
  console.log({ test })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
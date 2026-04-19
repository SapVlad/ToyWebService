import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const hashedPassword = await bcrypt.hash('admin123', 10);
  await prisma.user.upsert({
    where: { email: 'admin@archiveshop.com' },
    update: {},
    create: {
      email: 'admin@archiveshop.com',
      password: hashedPassword,
      name: 'System Admin',
      isAdmin: true,
    },
  });

  const products = [
    {
      name: 'Optimus Prime G1',
      series: 'Transformers Generation 1',
      year: '1984',
      price: 8200,
      condition: 'AFA 85',
      category: 'Vintage Figures',
      image: 'https://images.unsplash.com/photo-1636572481914-a07d3673bd36?q=80&w=1000&auto=format&fit=crop',
      description: 'The iconic leader of the Autobots in his original 1984 G1 form. This specimen is graded AFA 85, representing a near-mint example of toy history.'
    },
    {
      name: 'USS Flagg Aircraft Carrier',
      series: 'G.I. Joe',
      year: '1985',
      price: 4500,
      condition: 'Complete in Box',
      category: 'Vintage Figures',
      image: 'https://images.unsplash.com/photo-1532103861939-270836c2455f?q=80&w=1000&auto=format&fit=crop',
      description: 'The ultimate G.I. Joe playset. Over 7 feet long, this USS Flagg comes complete with all original parts and the original box.'
    },
    {
      name: 'Skeletor Panthor Set',
      series: 'Masters of the Universe',
      year: '1983',
      price: 2800,
      condition: 'Mint on Card',
      category: 'Sealed Grails',
      image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?q=80&w=1000&auto=format&fit=crop',
      description: 'A legendary MOTU set featuring the Overlord of Evil and his savage cat companion, Panthor. Mint on card and beautifully preserved.'
    },
    {
      name: 'Technodrome Playset',
      series: 'TMNT',
      year: '1990',
      price: 3200,
      condition: 'Sealed',
      category: 'Sealed Grails',
      image: 'https://images.unsplash.com/photo-1601153211050-61a27458dd21?q=80&w=1000&auto=format&fit=crop',
      description: 'The mobile fortress of Krang and Shredder. This 1990 TMNT Technodrome is factory sealed, a true centerpiece for any Turtle collection.'
    },
    {
      name: 'Darth Vader TIE Fighter',
      series: 'Star Wars',
      year: '1978',
      price: 1900,
      condition: 'AFA 80',
      category: 'Vintage Figures',
      image: 'https://images.unsplash.com/photo-1472457897821-70d3819a0e24?q=80&w=1000&auto=format&fit=crop',
      description: 'Original Kenner Star Wars Darth Vader TIE Fighter from 1978. Graded AFA 80, showing excellent box condition and unpunched status.'
    },
    {
      name: 'Voltron Lion Force',
      series: 'Voltron',
      year: '1984',
      price: 5600,
      condition: 'Die-cast / Mint',
      category: 'Japanese Imports',
      image: 'https://images.unsplash.com/photo-1618336753974-aae8e04506aa?q=80&w=1000&auto=format&fit=crop',
      description: 'The complete Matchbox Lion Force Voltron set. All five lions in die-cast metal, maintaining their original luster and tight joints.'
    },
    {
        name: 'Boba Fett Prototype',
        series: 'Star Wars',
        year: '1979',
        price: 150000,
        condition: 'L-Slot Rocket',
        category: 'Prototype & Pre-Production',
        image: 'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?q=80&w=1000&auto=format&fit=crop',
        description: 'The holy grail of Star Wars collecting. An authentic L-slot rocket-firing Boba Fett prototype. Extremely rare and highly sought after.'
    },
    {
        name: 'Godzilla Shogun Warriors',
        series: 'Shogun Warriors',
        year: '1977',
        price: 3500,
        condition: 'Boxed',
        category: 'Japanese Imports',
        image: 'https://images.unsplash.com/photo-1590810335505-ab5109677b10?q=80&w=1000&auto=format&fit=crop',
        description: 'Massive 24-inch Godzilla from the Shogun Warriors line. Features firing fist and tongue-flame action. Original box included.'
    }
  ]

  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();

  for (const product of products) {
    await prisma.product.create({
      data: product
    })
  }

  console.log('Seed data created successfully')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

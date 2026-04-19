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
      image: 'https://i.ebayimg.com/images/g/APEAAeSw1G9oyaFN/s-l400.jpg',
      description: 'The iconic leader of the Autobots in his original 1984 G1 form. This specimen is graded AFA 85, representing a near-mint example of toy history.'
    },
    {
      name: 'USS Flagg Aircraft Carrier',
      series: 'G.I. Joe',
      year: '1985',
      price: 4500,
      condition: 'Complete in Box',
      category: 'Vintage Figures',
      image: 'https://i.ebayimg.com/images/g/5NUAAeSw6JpoUJ3k/s-l1200.jpg',
      description: 'The ultimate G.I. Joe playset. Over 7 feet long, this USS Flagg comes complete with all original parts and the original box.'
    },
    {
      name: 'Skeletor Panthor Set',
      series: 'Masters of the Universe',
      year: '1983',
      price: 2800,
      condition: 'Mint on Card',
      category: 'Sealed Grails',
      image: 'https://www.sideshow.com/cdn-cgi/image/height=850,quality=90,f=auto/https://www.sideshow.com/storage/product-images/904181/skeletor-panthor-classic-deluxe_masters-of-the-universe_scale_65cd469b49841.jpg',
      description: 'A legendary MOTU set featuring the Overlord of Evil and his savage cat companion, Panthor. Mint on card and beautifully preserved.'
    },
    {
      name: 'Technodrome Playset',
      series: 'TMNT',
      year: '1990',
      price: 3200,
      condition: 'Sealed',
      category: 'Sealed Grails',
      image: 'https://preview.redd.it/tmnt-technodrome-playset-from-1991-jcpenney-christmas-v0-ljmdnjkcto6a1.jpg?auto=webp&s=0a8c599b18ab0e6b151d6d89914449f7c50378ec',
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
        image: 'https://preview.redd.it/thoughts-on-shogun-warriors-godzilla-toy-v0-que1z37kozde1.jpeg?width=640&crop=smart&auto=webp&s=6ef816e10e7aca8097f7d94c23a15a557926809c',
        description: 'Massive 24-inch Godzilla from the Shogun Warriors line. Features firing fist and tongue-flame action. Original box included.'
    }
  ]

  await prisma.auctionBid.deleteMany();
  await prisma.auction.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();

  for (const product of products) {
    await prisma.product.create({
      data: product
    })
  }

  const auctionProduct = await prisma.product.create({
    data: {
      name: '1979 Boba Fett Rocket-Firing Prototype',
      series: 'Star Wars',
      year: '1979',
      price: 150000,
      condition: 'AFA 85',
      category: 'Prototype & Pre-Production',
      image: 'https://images.unsplash.com/photo-1608889175123-8ee362201f81?q=80&w=2000&auto=format&fit=crop',
      description: 'The holy grail of Star Wars collecting. This fully painted L-slot prototype represents one of the few surviving examples of the rocket-firing mechanism that was never released to the public.'
    }
  });

  const endTime = new Date();
  endTime.setDate(endTime.getDate() + 3);

  const auction = await prisma.auction.create({
    data: {
      productId: auctionProduct.id,
      startPrice: 40000,
      currentBid: 47500,
      endTime: endTime,
      isActive: true
    }
  });

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

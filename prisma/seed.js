import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const categories = [
  { name: 'STEM', slug: 'stem' },
  { name: 'Plush', slug: 'plush' },
  { name: 'Action', slug: 'action' },
  { name: 'Board Games', slug: 'board-games' },
];

const products = [
  {
    name: 'Robo-Builder 3000',
    description: 'Build your own robot with this ultimate STEM kit. Includes 200+ pieces, motor, LED lights, and programmable logic controller.',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1589254065878-42c9da9e2f58?auto=format&fit=crop&q=80&w=800',
    ageRange: '8-12',
    categorySlug: 'stem',
    stock: 15
  },
  {
    name: 'Coding Critters',
    description: 'Learn coding basics with adorable interactive pets. No screen required! Ages 4-8.',
    price: 34.99,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=800',
    ageRange: '4-8',
    categorySlug: 'stem',
    stock: 25
  },
  {
    name: 'Science Lab Kit',
    description: '50+ experiments for young scientists. Make slime, grow crystals, and explore chemistry fundamentals.',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=800',
    ageRange: '6-10',
    categorySlug: 'stem',
    stock: 20
  },
  {
    name: 'Magic Snuggle Bear',
    description: 'Ultra-soft plush bear with built-in heartbeat mechanism. Soothing companion for bedtime.',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=800',
    ageRange: '0-3',
    categorySlug: 'plush',
    stock: 30
  },
  {
    name: 'Unicorn Dreams Pillow',
    description: 'Magical unicorn plush with rainbow mane. Perfect for cuddles and imaginative play.',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=800',
    ageRange: '3-7',
    categorySlug: 'plush',
    stock: 35
  },
  {
    name: 'Dino Discovery Set',
    description: 'Set of 6 realistic dinosaur plush toys with fun facts. Great for educational play.',
    price: 44.99,
    image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&q=80&w=800',
    ageRange: '4-9',
    categorySlug: 'plush',
    stock: 18
  },
  {
    name: 'Superhero Action Figure - Thunder Man',
    description: '12-inch poseable action figure with real fabric cape, interchangeable accessories, and battle sounds.',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1608889175123-8ee362201f81?auto=format&fit=crop&q=80&w=800',
    ageRange: '5-10',
    categorySlug: 'action',
    stock: 22
  },
  {
    name: 'Princess Castle Playset',
    description: 'Multi-level castle with working elevator, pool, and 6 mini figures. Folds up for storage.',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=800',
    ageRange: '3-8',
    categorySlug: 'action',
    stock: 12
  },
  {
    name: 'Race Car Ultimate Set',
    description: '10 die-cast cars, 2 race tracks, pit crew figures, and start/finish line. Ultimate racing experience.',
    price: 54.99,
    image: 'https://images.unsplash.com/photo-1594787318286-3d835c1d207f?auto=format&fit=crop&q=80&w=800',
    ageRange: '4-10',
    categorySlug: 'action',
    stock: 28
  },
  {
    name: 'Catan - Trade Build Settle',
    description: 'Classic strategy game. Build settlements, trade resources, and become the dominant civilization.',
    price: 44.99,
    image: 'https://images.unsplash.com/photo-1611891487122-207579d67d98?auto=format&fit=crop&q=80&w=800',
    ageRange: '10+',
    categorySlug: 'board-games',
    stock: 40
  },
  {
    name: 'Ticket to Ride',
    description: 'Family-friendly railway adventure. Collect cards, claim routes, and complete tickets to win.',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1611891487122-207579d67d98?auto=format&fit=crop&q=80&w=800',
    ageRange: '8+',
    categorySlug: 'board-games',
    stock: 35
  },
  {
    name: 'Codenames - Word Spy Game',
    description: 'Spy-themed word game for 4-8 players. Give one-word clues to help your team find secret agents.',
    price: 19.99,
    image: 'https://images.unsplash.com/photo-1611891487122-207579d67d98?auto=format&fit=crop&q=80&w=800',
    ageRange: '14+',
    categorySlug: 'board-games',
    stock: 50
  },
  {
    name: 'LEGO City Fire Station',
    description: 'Detailed fire station building set with fire truck, ambulance, and 6 mini figures. 500+ pieces.',
    price: 69.99,
    image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&q=80&w=800',
    ageRange: '6-12',
    categorySlug: 'stem',
    stock: 16
  },
  {
    name: 'Wooden Toy Train Set',
    description: 'Classic wooden train with 20 pieces including tracks, bridges, and cargo cars. BPA-free.',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=800',
    ageRange: '2-6',
    categorySlug: 'stem',
    stock: 20
  },
  {
    name: 'Stuffed Elephant Large',
    description: 'Gentle giant elephant plush. 24 inches tall with super-soft fabric. Machine washable.',
    price: 32.99,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=800',
    ageRange: '0+',
    categorySlug: 'plush',
    stock: 25
  },
  {
    name: 'Ninja Battle Arena',
    description: '2-player fighting arena with 4 character figures, weapons, and secret hideout pieces.',
    price: 34.99,
    image: 'https://images.unsplash.com/photo-1608889175123-8ee362201f81?auto=format&fit=crop&q=80&w=800',
    ageRange: '6-12',
    categorySlug: 'action',
    stock: 18
  }
];

async function main() {
  console.log('Seeding database...');

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat
    });
  }
  console.log('Categories created');

  for (const prod of products) {
    const category = await prisma.category.findUnique({ where: { slug: prod.categorySlug } });
    if (category) {
      await prisma.product.upsert({
        where: { id: prod.name.toLowerCase().replace(/\s+/g, '-') },
        update: {},
        create: {
          name: prod.name,
          description: prod.description,
          price: prod.price,
          image: prod.image,
          ageRange: prod.ageRange,
          categoryId: category.id,
          stock: prod.stock
        }
      });
    }
  }
  console.log('Products created');

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10);
  
  await prisma.user.upsert({
    where: { email: 'admin@toyworld.com' },
    update: {},
    create: {
      email: 'admin@toyworld.com',
      password: hashedPassword,
      name: 'Admin',
      role: 'admin'
    }
  });
  console.log('Admin user created (email: admin@toyworld.com, password: admin123)');

  console.log('Seeding complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
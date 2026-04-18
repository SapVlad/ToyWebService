import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const app = express();
const prisma = new PrismaClient();
const PORT = 3001;
const JWT_SECRET = 'toyworld-secret-key-2024';

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'http://127.0.0.1:5173'],
  credentials: true
}));
app.use(express.json());

// Auth middleware
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return next();
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
  } catch (e) {
    // Invalid token, continue without user
  }
  next();
};

const requireAuth = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
};

const requireAdmin = async (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  const user = await prisma.user.findUnique({ where: { id: req.user.id } });
  if (!user || user.role !== 'admin') {
    return res.status(403).json({ error: 'Forbidden' });
  }
  next();
};

// Auth routes
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { email, password: hashedPassword, name }
    });
    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user.id, email: user.email, name: user.name, role: user.role } });
  } catch (e) {
    res.status(400).json({ error: 'Email already exists' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user.id, email: user.email, name: user.name, role: user.role } });
  } catch (e) {
    res.status(500).json({ error: 'Login failed' });
  }
});

app.get('/api/auth/me', authenticate, async (req, res) => {
  if (!req.user) return res.json({ user: null });
  const user = await prisma.user.findUnique({ where: { id: req.user.id } });
  if (!user) return res.json({ user: null });
  res.json({ user: { id: user.id, email: user.email, name: user.name, role: user.role } });
});

// Products routes
app.get('/api/products', async (req, res) => {
  const { category, search, ageRange } = req.query;
  const where = {};
  
  if (category && category !== 'all') {
    const cat = await prisma.category.findUnique({ where: { slug: category } });
    if (cat) where.categoryId = cat.id;
  }
  
  if (search) {
    where.OR = [
      { name: { contains: search } },
      { description: { contains: search } }
    ];
  }
  
  if (ageRange && ageRange !== 'all') {
    where.ageRange = ageRange;
  }
  
  const products = await prisma.product.findMany({ 
    where,
    include: { category: true }
  });
  res.json(products);
});

app.get('/api/products/:id', async (req, res) => {
  const product = await prisma.product.findUnique({
    where: { id: req.params.id },
    include: { category: true }
  });
  if (!product) return res.status(404).json({ error: 'Product not found' });
  res.json(product);
});

// Categories routes
app.get('/api/categories', async (req, res) => {
  const categories = await prisma.category.findMany();
  res.json(categories);
});

// Orders routes
app.post('/api/orders', authenticate, async (req, res) => {
  try {
    const { items, shipping, guestEmail } = req.body;
    const userId = req.user?.id;
    
    const orderItemsData = [];
    let total = 0;
    
    for (const item of items) {
      const product = await prisma.product.findUnique({ where: { id: item.productId } });
      if (product) {
        orderItemsData.push({
          productId: item.productId,
          quantity: item.quantity,
          price: product.price
        });
        total += product.price * item.quantity;
      }
    }
    
    const order = await prisma.order.create({
      data: {
        userId: userId || null,
        guestEmail: userId ? null : guestEmail,
        total,
        shippingName: shipping.name,
        shippingAddress: shipping.address,
        shippingCity: shipping.city,
        shippingZip: shipping.zip,
        items: {
          create: orderItemsData
        }
      },
      include: { items: { include: { product: true } } }
    });
    
    res.json(order);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Order failed' });
  }
});

app.get('/api/orders', requireAuth, async (req, res) => {
  const orders = await prisma.order.findMany({
    where: { userId: req.user.id },
    include: { items: { include: { product: true } } },
    orderBy: { createdAt: 'desc' }
  });
  res.json(orders);
});

// Admin routes
app.get('/api/admin/products', requireAdmin, async (req, res) => {
  const products = await prisma.product.findMany({ include: { category: true } });
  res.json(products);
});

app.post('/api/admin/products', requireAdmin, async (req, res) => {
  const { name, description, price, image, ageRange, categoryId, stock } = req.body;
  const product = await prisma.product.create({
    data: { name, description, price, image, ageRange, categoryId, stock }
  });
  res.json(product);
});

app.put('/api/admin/products/:id', requireAdmin, async (req, res) => {
  const { name, description, price, image, ageRange, categoryId, stock } = req.body;
  const product = await prisma.product.update({
    where: { id: req.params.id },
    data: { name, description, price, image, ageRange, categoryId, stock }
  });
  res.json(product);
});

app.delete('/api/admin/products/:id', requireAdmin, async (req, res) => {
  await prisma.product.delete({ where: { id: req.params.id } });
  res.json({ success: true });
});

app.get('/api/admin/orders', requireAdmin, async (req, res) => {
  const orders = await prisma.order.findMany({
    include: { items: { include: { product: true } }, user: true },
    orderBy: { createdAt: 'desc' }
  });
  res.json(orders);
});

app.patch('/api/admin/orders/:id', requireAdmin, async (req, res) => {
  const { status } = req.body;
  const order = await prisma.order.update({
    where: { id: req.params.id },
    data: { status }
  });
  res.json(order);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
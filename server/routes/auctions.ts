import { Router } from 'express';
import { prisma } from '../index';
import { authenticate, AuthRequest } from '../middleware/auth';

const router = Router();

router.get('/current', async (req, res) => {
  try {
    const auction = await prisma.auction.findFirst({
      where: { isActive: true },
      include: {
        product: true,
        bids: {
          orderBy: { amount: 'desc' },
          take: 5,
          include: {
            user: {
              select: { name: true }
            }
          }
        }
      }
    });
    res.json(auction);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const auctionId = parseInt(req.params.id);
    const auction = await prisma.auction.findUnique({
      where: { id: auctionId },
      include: {
        product: true,
        bids: {
          orderBy: { amount: 'desc' },
          take: 5,
          include: {
            user: {
              select: { name: true }
            }
          }
        }
      }
    });
    if (!auction) {
      return res.status(404).json({ error: 'Auction not found' });
    }
    res.json(auction);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/:id/bid', authenticate, async (req: AuthRequest, res) => {
  try {
    const { amount } = req.body;
    const auctionId = parseInt(req.params.id);
    
    const auction = await prisma.auction.findUnique({
      where: { id: auctionId }
    });
    
    if (!auction) {
      return res.status(404).json({ error: 'Auction not found' });
    }
    
    if (!auction.isActive) {
      return res.status(400).json({ error: 'Auction is no longer active' });
    }
    
    if (new Date() > auction.endTime) {
      return res.status(400).json({ error: 'Auction has ended' });
    }
    
    if (amount <= (auction.currentBid || auction.startPrice)) {
      return res.status(400).json({ error: 'Bid must be higher than current bid' });
    }
    
    const bid = await prisma.auctionBid.create({
      data: {
        auctionId,
        userId: req.userId!,
        amount
      }
    });
    
    await prisma.auction.update({
      where: { id: auctionId },
      data: { currentBid: amount }
    });
    
    res.json(bid);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
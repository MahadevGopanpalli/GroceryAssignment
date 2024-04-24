
import express, { Request, Response } from 'express';
import grocery from '../models/grocery';
import user from '../models/user';
import order from '../models/order';

const router = express.Router();


router.get('/', async (req: Request, res: Response) => {
    try {
        const groceryItems = await grocery.find();
        res.status(200).json(groceryItems);
    } catch (error) {
        res.status(500).json({ message: error });
    }
});

router.post('/createorder', async (req: Request, res: Response) => {
    try {
        const { userId, items } = req.body;
    
        const userExists = await user.findById(userId);
        if (!userExists) {
          return res.status(404).json({ error: 'User not found' });
        }
    
        const orderedItems = await Promise.all(items.map(async (item: any) => {
          const { _id, quantity } = item;
          const groceryItem = await grocery.findById(_id).lean();
    
          if (!groceryItem) {
            throw new Error(`Grocery item with ID ${_id} not found`);
          }
    
          if (groceryItem['quantity'] < quantity) {
            throw new Error(`Insufficient quantity available for ${groceryItem.name}`);
          }
    
          groceryItem['quantity'] = Number(groceryItem['quantity']) - quantity;
          await grocery.updateOne({ _id : _id },{
            $set : { quantity : groceryItem['quantity'] }
          });
    
          return { ...item, name: groceryItem.name, price: groceryItem.price };
        }));
    
        // Create new order
        const newOrder = new order({
          userId,
          items: orderedItems
        });
    
        await newOrder.save();
    
        res.status(201).json({ message: 'Order placed successfully', order: newOrder });
      } catch (error) {
        res.status(400).json({ error: error });
      }});

export default router;

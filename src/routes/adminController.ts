
import express, { Request, Response } from 'express';

const router = express.Router();

import grocery from '../models/grocery';

router.post('/', async (req: Request, res: Response) => {
    try {
        const { name, price, quantity } = req.body;
        const groceryItem = new grocery({ name, price, quantity });
        await groceryItem.save();
        res.status(201).json(groceryItem);
    } catch (error) {
        res.status(500).json({ message: error });
    }
});

router.get('/', async (req: Request, res: Response) => {
    try {
        const groceryItems = await grocery.find();
        res.status(200).json(groceryItems);
    } catch (error) {
        res.status(500).json({ message: error });
    }
});

router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await grocery.findByIdAndDelete(id);
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ message: error });
    }
});

router.put('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, price, quantity } = req.body;
        const updatedGroceryItem = await grocery.findByIdAndUpdate(id, { name, price, quantity }, { new: true });
        if (updatedGroceryItem) {
            res.status(200).json(updatedGroceryItem);
        } else {
            res.status(404).json({ message: "Item not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error });
    }
});

export default router;

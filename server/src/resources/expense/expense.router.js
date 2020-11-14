import { Router } from "express";
import { Expense } from "./expense.model";

const router = Router();

router
  .route('/')
  .get(async (req, res) => {
    const expenses = await Expense.find({});
    res.status(200).send({expenses}).end();
  })
  .post(async (req, res) => {
    const amount = req.body.amount;
    const category = req.body.category;
    if (amount && category) {
      try {
        const expense = await Expense.create({amount, category});
        return res.status(201).send({expense}).end();
      } catch(err) {
        console.error(err);
        return res.status(400).send({message: 'item already exist'}).end();
      }
    } else {
      return res.status(400).send({message: 'amount or category info missing in request.'}).end();
    }
  })

export default router;

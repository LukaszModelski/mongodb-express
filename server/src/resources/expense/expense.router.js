import { Router } from "express";
import { Expense, categories } from "./expense.model";

const router = Router();

router
  .route('/')
  .get(async (req, res) => {
    const expenses = await Expense.find({});
    res.status(200).send({expenses, categories}).end();
  })
  .post(async (req, res) => {
    const amount = req.body.amount;
    const category = req.body.category;
    const dateString = req.body.dateString;
    if (amount && category) {
      try {
        const expense = await Expense.create({...req.body, date: new Date(dateString)});
        return res.status(201).send({expense}).end();
      } catch(err) {
        console.error(err);
        return res.status(400).send({message: 'Probably wrong category value.'}).end();
      }
    } else {
      return res.status(400).send({message: 'amount or category info missing in request.'}).end();
    }
  })
  .delete(async (req, res) => {
    const id = req.body.id;
    if (id) {
      try {
        const removed = await Expense.findOneAndDelete({ _id: id })
        if (removed) {
          return res.status(200).send({removed, message: 'Resource removed succesfully.'}).end();
        } else {
          return res.status(404).send({message: 'Resource with provided id was not found.'}).end();
        }
      } catch(err) {
        console.error(err);
        return res.status(400).send({message: 'Something went wrong.'}).end();
      }
    } else {
      return res.status(400).send({message: 'Id param is missing.'}).end();
    }
  })

export default router;

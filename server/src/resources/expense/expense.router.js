import { Router } from "express";
import { Expense, categories } from "./expense.model";

const router = Router();

router
  .route("/")
  .get(async (req, res) => {
    const userId = req.user["_id"];
    const expenses = await Expense.find({ userId });
    return res.status(200).send({ expenses, categories });
  })
  .post(async (req, res) => {
    const userId = req.user["_id"];
    const { category, dateString, description } = req.body;
    let { amount } = req.body;
    amount = amount.replace(",", "."); // to handle amount passed as a string with "," like "11,5"

    if (amount && category) {
      try {
        const expense = await Expense.create({
          userId,
          description,
          category,
          amount,
          date: new Date(dateString),
        });
        return res.status(201).send({ expense });
      } catch (err) {
        console.error(err);
        return res
          .status(400)
          .send({ message: "Probably wrong category value." });
      }
    } else {
      return res
        .status(400)
        .send({ message: "amount or category info missing in request." });
    }
  })
  .delete(async (req, res) => {
    const id = req.body.id;
    if (id) {
      try {
        const removed = await Expense.findOneAndDelete({ _id: id });
        if (removed) {
          return res
            .status(200)
            .send({ removed, message: "Resource removed succesfully." });
        } else {
          return res
            .status(404)
            .send({ message: "Resource with provided id was not found." });
        }
      } catch (err) {
        console.error(err);
        return res.status(400).send({ message: "Something went wrong." });
      }
    } else {
      return res.status(400).send({ message: "Id param is missing." });
    }
  });

router.route("/initialSummary").get(async (req, res) => {
  const userId = req.user["_id"];
  const rawInitialSummary = await Expense.aggregate([
    {
      $match: { userId },
    },
    {
      $group: {
        _id: {
          year: { $year: "$date" },
          month: { $month: "$date" },
        },
        totalAmount: { $sum: "$amount" },
      },
    },
    {
      $sort: {
        "_id.year": 1,
        "_id.month": 1,
      },
    },
  ]);
  if (rawInitialSummary && rawInitialSummary.length) {
    const initialSummary = rawInitialSummary.map((monthData) => {
      const year = monthData._id.year;
      const month =
        monthData._id.month >= 10
          ? monthData._id.month
          : `0${monthData._id.month}`;
      const totalAmount = monthData.totalAmount;

      return {
        [`${year}.${month}`]: { totalAmount },
      };
    });
    return res.status(200).send({ initialSummary });
  }
  return res.status(404).send("No data");
});

router.route("/month/:year/:month").get(async (req, res) => {
  const userId = req.user["_id"];
  const { year, month } = req.params;

  if (!year || !month) {
    return res.status(400).send("Missing param");
  }

  const yearNum = parseInt(year);
  const monthNum = parseInt(month);

  const monthData = await Expense.aggregate([
    {
      $match: {
        userId,
        $expr: {
          $and: [
            { $eq: [{ $year: "$date" }, yearNum] },
            { $eq: [{ $month: "$date" }, monthNum] },
          ],
        },
      },
    },
    {
      $group: {
        _id: null,
        items: { $push: "$$ROOT" },
      },
    },
  ]);

  if (monthData?.[0]?.items) {
    return res.status(200).send({ monthExpenses: monthData[0].items });
  }
  return res.status(404).send("No data");
});

export default router;

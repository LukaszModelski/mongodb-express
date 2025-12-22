import { Router } from "express";
import { Expense, categories } from "./expense.model";

const router = Router();

router
  .route("/")
  .get(async (req, res) => {
    const userId = req.user._id;
    const grouped = await Expense.aggregate([
      { $match: { userId } },

      // Create a YYYY-MM grouping key
      {
        $addFields: {
          month: {
            $dateToString: { format: "%Y.%m", date: "$date" },
          },
        },
      },

      // Group all expenses into arrays
      {
        $group: {
          _id: "$month",
          expenses: { $push: "$$ROOT" },
        },
      },

      // Sort expenses within each month by date DESC
      {
        $addFields: {
          expenses: {
            $sortArray: { input: "$expenses", sortBy: { date: -1 } },
          },
        },
      },

      // Sort months DESC
      { $sort: { _id: -1 } },
    ]);

    // Convert array to object (clean structure)
    const result = Object.fromEntries(grouped.map((g) => [g._id, g.expenses]));

    return res.status(200).send({ expensesByMonth: result, categories });
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

router.route("/month/:year/:month").get(async (req, res) => {
  const userId = req.user["_id"];
  const { year, month } = req.params;

  if (!year || !month) {
    return res.status(400).send("Missing param");
  }

  const dateCurrentMonthString = `${year}-${month.padStart(2, "0")}`;
  const dateNextMonth = new Date(`${year}-${month.padStart(2, "0")}`);
  dateNextMonth.setMonth(dateNextMonth.getMonth() + 1);

  const nextMonthDateString = `${dateNextMonth.getFullYear()}-${
    dateNextMonth.getMonth() + 1
  }`;

  let expenses;

  try {
    expenses = await Expense.find({
      userId,
      date: { $gte: dateCurrentMonthString, $lte: nextMonthDateString },
    });
  } catch {
    return res.status(500).send();
  }

  expenses.sort((expenseA, expenseB) => {
    if (expenseA.date > expenseB.date) {
      return -1;
    }
    return 0;
  });

  return res
    .status(200)
    .send({ [dateCurrentMonthString.replace("-", ".")]: expenses, categories });
});

export default router;

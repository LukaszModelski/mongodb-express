import { formatDate, validateAmount, deleteExpense, appendExpense } from "./utils";

const expenseObj = {
  '2021.02': [
    {
      _id: "6020113fe1,b78a000423f003",
      amount: 90,
      category: "cloths",
      description: "With date",
      date: "2021-02-01T16:11:21.103Z",
      __v: 0,
    }
  ],
  '2021.09': [
    {
      _id: "613ba7a2db4e293258b4d5c6",
      amount: 4,
      category: "sport",
      description: "yh",
      date: "2021-09-10T18:44:40.001Z",
      __v: 0,
    },
    {
      _id: "613bbf0231e5262eac9a918b",
      amount: 4545,
      category: "bills",
      description: "test",
      date: "2021-09-10T20:24:22.536Z",
      __v: 0,
    }
  ]
}

const expenseToDel = {
  _id: "613bbf0231e5262eac9a918b",
  amount: 4545,
  category: "bills",
  description: "test",
  date: "2021-09-10T20:24:22.536Z",
  __v: 0,
}

const expenseToAppend = {
  _id: "613bbf4567e5262eac9a918b",
  amount: 1212,
  category: "bills",
  description: "appended expense",
  date: "2021-09-10T21:23:22.536Z",
  __v: 0,
}

const expenseObjAfterDel = {
  '2021.02': [
    {
      _id: "6020113fe1,b78a000423f003",
      amount: 90,
      category: "cloths",
      description: "With date",
      date: "2021-02-01T16:11:21.103Z",
      __v: 0,
    }
  ],
  '2021.09': [
    {
      _id: "613ba7a2db4e293258b4d5c6",
      amount: 4,
      category: "sport",
      description: "yh",
      date: "2021-09-10T18:44:40.001Z",
      __v: 0,
    }
  ]
}

const expenseObjAfterAppend = {
  '2021.02': [
    {
      _id: "6020113fe1,b78a000423f003",
      amount: 90,
      category: "cloths",
      description: "With date",
      date: "2021-02-01T16:11:21.103Z",
      __v: 0,
    }
  ],
  '2021.09': [
    {
      _id: "613bbf4567e5262eac9a918b",
      amount: 1212,
      category: "bills",
      description: "appended expense",
      date: "2021-09-10T21:23:22.536Z",
      __v: 0,
    },
    {
      _id: "613bbf0231e5262eac9a918b",
      amount: 4545,
      category: "bills",
      description: "test",
      date: "2021-09-10T20:24:22.536Z",
      __v: 0,
    },
    {
      _id: "613ba7a2db4e293258b4d5c6",
      amount: 4,
      category: "sport",
      description: "yh",
      date: "2021-09-10T18:44:40.001Z",
      __v: 0,
    }
  ]
}

describe('Format date', function () {
  test('Date string to custom form', () => {
    expect(formatDate('2021-02-01T16:11:21.103Z')).toBe('2021.02');
    expect(formatDate('2021-09-10T18:44:40.001Z')).toBe('2021.09');
    expect(formatDate('2021-12-10T18:44:40.001Z')).toBe('2021.12');
  });
  test('False date strings', () => {
    expect(formatDate('')).toBe('NaN.NaN');
    expect(formatDate('qwerty')).toBe('NaN.NaN');
  });
});

describe('validate amount function', function () {
  test('empty string should be false', () => {
    expect(validateAmount('')).toEqual(false);
  });
  test('decimal value with \',\' should be false', () => {
    expect(validateAmount('2,5')).toEqual(false);
  });
  test('decimal value with \'.\' should be false', () => {
    expect(validateAmount('2,5')).toEqual(false);
  });
  test('decimallonger value with \'.\' should be false', () => {
    expect(validateAmount('25456,5')).toEqual(false);
  });
  test('solid single digit should be true', () => {
    expect(validateAmount('4')).toEqual(true);
  });
  test('solid number should be true', () => {
    expect(validateAmount('4456456')).toEqual(true);
  });
});

describe('deleteExpense function', function () {
  test('delete expense', () => {
    expect(deleteExpense(expenseObj, expenseToDel)).toEqual(expenseObjAfterDel);
  });
});

describe('appendExpense function', function () {
  test('append expense', () => {
    expect(appendExpense(expenseObj, expenseToAppend)).toEqual(expenseObjAfterAppend);
  });
});

module.exports = [
  {
    transId: Date.now(),
    itemName: 'salary',
    amount: 2000,
    date: '03/04/2022',
    from: 'employer',
    category: 'income',
    type: 'income',
  },
  {
    transId: Date.now(),
    itemName: 'taxpayment',
    amount: 300,
    date: '04/10/2022',
    from: 'bank',
    category: 'bills',
    type: 'expense',
  },

  {
    transId: Date.now(),
    itemName: 'pension',
    date: '04/04/2022',
    amount: 100,
    from: 'bank',
    category: 'bills',
    type: 'expense',
  },

  {
    transId: Date.now(),
    itemName: 'gift',
    date: '06/10/2022',
    amount: 50,
    from: 'friend',
    category: 'gift',
    type: 'income',
  },

  {
    transId: Date.now(),
    itemName: 'food',
    date: '01/05/2022',
   amount: 40,
    from: 'grocery',
    category: 'food',
    type: 'expense',
  },
];

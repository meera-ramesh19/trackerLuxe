const mongoose = require('mongoose');

const transactionSchema = mongoose.Schema(
  {
    itemName: {
      type: String,
      required: [true, 'Please add a text value'],
    },

    amount: {
      type: Number,
      required: [true, 'Please add a number'],
    },
    userDate: {
      type: Date,
      required: [true, 'Please select a date'],
    },
    from: {
      type: String,
      required: [true, 'Please add a text value'],
    },

    category: {
      type: String,
      required: [true, 'Please add a text value'],
    },
    sourcetype: {
      type: String,
      required: [true, 'Please type in income/expense'],
    },
  },
  {
    timestamps: true,
  }
);

transactionSchema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports = mongoose.model('Transaction', transactionSchema);

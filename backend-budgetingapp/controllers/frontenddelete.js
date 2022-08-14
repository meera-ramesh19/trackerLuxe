const newTransaction = transaction.filter((ele) => ele.id !== index);
setTransaction({ transaction: newTransaction });

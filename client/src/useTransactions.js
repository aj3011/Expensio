import { useContext } from "react";
import { ExpenseTrackerContext } from "./context/context";

import {
  incomeCategories,
  expenseCategories,
  resetCategories
} from "./constants/categories";

//a custom hook is an arrow function that starts with "use"
//based on title, we'll get to know whether we are under expense or income category
const useTransactions = title => {
  resetCategories();
  const { transactions } = useContext(ExpenseTrackerContext);
  //here we filter whether transactions are of 'income' or 'expense' type
  const transactionsPerType = transactions.filter(t => t.type === title);
  console.log("transactionsPerType     " + transactionsPerType);
  // refuce function will sum up all the amounts in the array
  //we call the reduce method on the array scores.the method has access to the array's previous value, current value . we send zero as the accumulator's initial value.
  const total = transactionsPerType.reduce(
    (acc, currVal) => (acc += currVal.amount),
    0
  );
  const categories = title === "Income" ? incomeCategories : expenseCategories;
  //now, look at the following example
  // a transaction has the following fields
  //{id:1, type:'income',amount:50,category:salary}
  //ANDDDDDDDD
  //incomecategories have following fields
  //{type:'salary',amount :0,color:---}
  //As is obvious from the logic below, we are matching the transaction category with the incomeCategory type and then incrementing its value
  transactionsPerType.forEach(t => {
    //.find() function Returns the value of the first element in the array where predicate is true, and undefined otherwise.
    const category = categories.find(c => c.type === t.category);
    if (category) category.amount += t.amount;
  });
  const filteredCategories = categories.filter(sc => sc.amount > 0);
  //console.log(categories);
  //Rules for chart Data
  const chartData = {
    labels: filteredCategories.map(c => c.type),
    datasets: [
      {
        data: filteredCategories.map(c => c.amount),
        backgroundColor: filteredCategories.map(c => c.color)
      }
    ]
  };

  return { filteredCategories, total, chartData };
};
export default useTransactions;

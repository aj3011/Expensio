// import React, { useReducer, createContext } from "react";
// import contextReducer from "./contextReducer.js";
// import axios from "axios";
// import { STATES } from "mongoose";

// //we are going to fetch the entries stored in the localStorage as the initial state so that they are there even when we refresh our page
// const initialState = [
//   {
//     amount: 500,
//     category: "Salary",
//     type: "Income",
//     date: "2020-11-16",
//     id: "44c68123-5b86-4cc8-b915-bb9e16cebe6a"
//   },
//   {
//     amount: 225,
//     category: "Investments",
//     type: "Income",
//     date: "2020-11-16",
//     id: "33b295b8-a8cb-49f0-8f0d-bb268686de1a"
//   },
//   {
//     amount: 50,
//     category: "Salary",
//     type: "Income",
//     date: "2020-11-13",
//     id: "270304a8-b11d-4e16-9341-33df641ede64"
//   },
//   {
//     amount: 123,
//     category: "Car",
//     type: "Expense",
//     date: "2020-11-16",
//     id: "0f72e66e-e144-4a72-bbc1-c3c92018635e"
//   },
//   {
//     amount: 50,
//     category: "Pets",
//     type: "Expense",
//     date: "2020-11-13",
//     id: "c5647dde-d857-463d-8b4e-1c866cc5f83e"
//   },
//   {
//     amount: 500,
//     category: "Travel",
//     type: "Expense",
//     date: "2020-11-13",
//     id: "365a4ebd-9892-4471-ad55-36077e4121a9"
//   },
//   {
//     amount: 50,
//     category: "Investments",
//     type: "Income",
//     date: "2020-11-23",
//     id: "80cf7e33-fc3e-4f9f-a2aa-ecf140711460"
//   },
//   {
//     amount: 500,
//     category: "Savings",
//     type: "Income",
//     date: "2020-11-23",
//     id: "ef090181-21d1-4568-85c4-5646232085b2"
//   },
//   {
//     amount: 5,
//     category: "Savings",
//     type: "Income",
//     date: "2020-11-23",
//     id: "037a35a3-40ec-4212-abe0-cc485a98aeee"
//   }
// ];

// export const ExpenseTrackerContext = createContext(initialState);
// export const Provider = ({ children }) => {
//   //We will wrap all of our application with our provider and all of our components will have access to the value property and whatever is inside of it. we wrapped our whole application in provider in index.js .An alternative to useState.
//   //useReducer is usually preferable to useState when you have complex state logic that involves multiple sub-values.

//   //reducer =>a function that takes in old state, and an action =>new state
//   //our state will represent all of the transactions. so we'll rename it to transactions

//   //   we went
//   // through a full circle of
//   // actually creating the reducers creating
//   // the dispatch functions
//   // passing them into the context accepting
//   // them into our component
//   // and then actually calling them once the
//   // add transaction is called
//   // that's going to fire up and go straight
//   // to here and then in here
//   // we're gonna add it and it's going to be
//   // added to the transactions
//   const [transactions, dispatch] = useReducer(contextReducer, initialState);

//   //async functions that make basically make fetch data from the database using axios
//   //the methods in axios returns promises, so we have to use async functions

//   async function getTransactions() {
//     try {
//       //the rest of the path is written in proxy in package.json
//       const res = await axios.get("/api/v1/transactions");

//       dispatch({
//         type: "GET_TRANSACTIONS",
//         payload: res.data.data
//         //this is the format of our data. It can be fetched using res.data. But we specifically want the "data" field from the res.data. That's why we wrote res.data.data
//         //     //     {
//         //     // "success": true,
//         //     // "data": {
//         //     //     "_id": "6099e46be71a3c33d88cdf98",
//         //     //     "id": 1,
//         //     //     "type": "income",
//         //     //     "category": "business",
//         //     //     "amount": 50,
//         //     //     "date": "1970-01-01T05:36:50.510Z",
//         //     //     "__v": 0
//         //     // }
//         // }
//       });
//     } catch (error) {
//       dispatch({
//         type: "TRANSACTION_ERROR",
//         payload: "No Transactions to show!"
//       });
//     }
//   }

//   //Action Creators
//   //These functions are dispatching something .. i.e they are changing the state of the transactions
//   async function deleteTransaction(id) {
//     try {
//       await axios.delete(`/api/v1/transactions/${id}`);
//       dispatch({ type: "DELETE_TRANSACTION", payload: id });
//     } catch (error) {
//       dispatch({
//         type: "TRANSACTION_ERROR",
//         payload: "No such transaction exists!"
//       });
//     }
//   }

//   //we won't have the id when we add a transaction . Thus we ll pass it as a whole in the argument of the function

//   async function addTransaction(transaction) {
//     //since we have to send data using axios, we are creating a variable config to specify the type of data we are sending
//     const config = {
//       headers: {
//         "Content-Type": "application/json"
//       }
//     };

//     try {
//       const res = await axios.post("/api/v1/transactions", transaction, config);

//       dispatch({ type: "ADD_TRANSACTION", payload: res.data.data });
//     } catch (error) {
//       console.log(`******${error}`);
//     }
//   }

//   const balance = transactions.reduce(
//     (acc, currVal) =>
//       currVal.type === "Expense" ? acc - currVal.amount : acc + currVal.amount,
//     0
//   );
//   //we will implement main logic i.e to delete
//   return (
//     <ExpenseTrackerContext.Provider
//       value={
//         //by writing these functions here, they can be accessed from anywhere iin the application
//         {
//           transactions,
//           deleteTransaction,
//           getTransactions,
//           addTransaction,
//           balance
//         }
//       }
//     >
//       {/* here children refers to the whole app since we have enclosed it inside the provider */}
//       {children}
//     </ExpenseTrackerContext.Provider>
//   );
// };

import React, { useReducer, createContext } from "react";
import axios from "axios";

import contextReducer from "./contextReducer";
//
const initialState = [] || JSON.parse(localStorage.getItem("transactions"));
export const ExpenseTrackerContext = createContext(initialState);

export const Provider = ({ children }) => {
  // reducer is function that specifies how we'll be changing our state
  const [transactions, dispatch] = useReducer(contextReducer, initialState);

  // Action creators

  async function getTransactions(uid) {
    try {
      const res = await axios.get("/api/v1/transactions");
      // res.data. data -> The other .data is used for getting data field from the object.
      dispatch({
        type: "GET_TRANSACTIONS",
        payload: {
          transactions: res.data.data,
          id: uid
        }
      });
    } catch (err) {
      dispatch({});
    }
  }

  // Once this function is called, dispatch an id
  async function deleteTransaction(id) {
    try {
      await axios.delete(`/api/v1/transactions/${id}`);
      dispatch({ type: "DELETE_TRANSACTION", payload: id });
    } catch (err) {
      dispatch({});
    }

    // payload is the extra data
  }

  async function addTransaction(transaction) {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    try {
      const res = await axios.post("/api/v1/transactions", transaction, config);
      dispatch({ type: "ADD_TRANSACTION", payload: res.data.data });
    } catch (err) {
      dispatch({
        //payload: err.response.data.error
      });
    }
  }

  let balance = transactions.reduce((acc, currVal) => {
    return currVal.type === "Expense"
      ? acc - currVal.amount
      : acc + currVal.amount;
  }, 0);

  return (
    <ExpenseTrackerContext.Provider
      value={{
        getTransactions,
        deleteTransaction,
        addTransaction,
        transactions,
        balance
      }}
    >
      {children}
    </ExpenseTrackerContext.Provider>
  );
};

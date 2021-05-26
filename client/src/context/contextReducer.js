// //Transactions is the state here

// const contextReducer = (state, action) => {
//   // actions are adding or deleting transactions
//   let transactions;
//   switch (action.type) {
//     case "GET_TRANSACTIONS":
//       transactions = action.payload;
//       return transactions;
//       break;
//     case "DELETE_TRANSACTION":
//       transactions = state.filter(t => t._id != action.payload);
//       return transactions;
//     case "ADD_TRANSACTION":
//       //what happens here is that the latest transaction is added to the top and ...state means that all other transactions are also added to the array
//       transactions = [action.payload, ...state];
//       return transactions;
//       break;
//     case "TRANSACTION_ERROR":
//       return {
//         error: action.payload
//       };

//     default:
//       return state;
//   }
// };

// export default contextReducer;
// Reducer -> function that takes in the eold state and an action => new state
// action can be add or delete
//return different state
// const transactions = [
//   {
//     id: 1
//   }
// ];

// state is the transaction
// import { useAuth } from "../context/AuthContext";

// import React from "react";
// let user;
// function Condom() {
//   const { currentUser } = useAuth();
//   user = currentUser.uid;
//   return user;
// }

const contextReducer = (state, action) => {
  //const { currentUser } = useAuth();
  let transactions;
  switch (action.type) {
    case "GET_TRANSACTIONS":
      transactions = action.payload.transactions;
      const filtered_transactions = transactions.filter(
        t => t.userID === action.payload.id
      );
      return filtered_transactions;
    case "DELETE_TRANSACTION":
      transactions = state.filter(t => t._id != action.payload);

      return transactions;

    case "ADD_TRANSACTION":
      transactions = [...state, action.payload];

      return transactions;

    case "TRANSACTION_ERROR":
      return {
        ...state,
        error: action.payload
      };

    default:
      return state;
  }
};

export default contextReducer;

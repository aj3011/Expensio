// //if we have to make any HTTP requests from the components , we should use useRef()
// import React,{useContext,useEffect} from 'react'
// import {List as MUIList,ListItem,ListItemAvatar,ListItemText,Avatar,ListItemSecondaryAction,IconButton,Slide} from '@material-ui/core';
// import {Delete,MoneyOff} from '@material-ui/icons';
// import useStyles from './styles'
// import {ExpenseTrackerContext} from '../../../context/context'
// // /* Slide in from the edge of the screen. The direction property controls which edge of the screen the transition starts from.

// //The Transition component's mountOnEnter property prevents the child component from being mounted until in is true. This prevents the relatively positioned component from scrolling into view from it's off-screen position. Similarly the unmountOnExit property removes the component from the DOM after it has been transition off screen. */
// function List() {
//   const classes = useStyles();
//   const {transactions,deleteTransaction,getTransactions } = useContext(ExpenseTrackerContext);

//   useEffect(()=>{
//     getTransactions()
//   },[]);
//   return (
//     <MUIList dense={false} className={classes.list}>

//     {/* after arrow, we didn't put {} because that would mean we are writing a function block. Instead, we write() because we have to return from here */}
//        {transactions.map((transaction)=>(

//          <Slide direction='down' in mountOnEnter unmountOnExit key={transaction.id}>
//            <ListItem>
//              <ListItemAvatar>
//                <Avatar className={transaction.type==='Income'?classes.avatarIncome:classes.avatarExpense}>
//                 <MoneyOff/>
//                </Avatar>
//              </ListItemAvatar>
//              <ListItemText primary={transaction.category} secondary={`$${transaction.amount}`}/>
//              <ListItemSecondaryAction>
//              {/* edge=end just positions it */}
//                <IconButton edge="end" aria-label="delete" onClick={()=>deleteTransaction(transaction._id)}>
//                  <Delete/>
//                </IconButton>
//              </ListItemSecondaryAction>
//            </ListItem>
//          </Slide>
//        ))}
//     </MUIList>
//   )
// }

// export default List

import React, { useContext, useEffect } from "react";
import {
  List as MUIList,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  ListItemSecondaryAction,
  IconButton,
  Slide
} from "@material-ui/core";
import { ExpenseTrackerContext } from "../../../context/context";
import { Delete, MoneyOff } from "@material-ui/icons";
import useStyles from "./styles";
// import { numberWithCommas } from "../../../utils/formatAmount";
import {useAuth} from '../../../context/AuthContext'

//Adding download functionality
import {CSVLink} from "react-csv";

//setting up structure for the download file

function List() {
  const classes = useStyles();
  const { deleteTransaction, transactions, getTransactions } = useContext(
    ExpenseTrackerContext
  );

  //setting up structure for data
  const headers =[
  {label:'Type', key:'type'},
  {label:'Amount',key:'amount'},
  {label:"Category",key:'category'},
  {label:"Date",key:'date'}
];

//specifying parameters for the report
const csvReport={
  fileName:'Report.csv',
  headers:headers,
  data:transactions
}

  const {currentUser} = useAuth();
  useEffect(() => {
    getTransactions(currentUser.uid);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  //console.log(globalState);
  // const transactions = [
  //   {
  //     id: 1,
  //     type: "Income",
  //     category: "Salary",
  //     amount: 50,
  //     date: "Wed Dec 16"
  //   },
  //   {
  //     id: 2,
  //     type: "Expense",
  //     category: "Pets",
  //     amount: 50,
  //     date: "Wed Dec 16"
  //   },
  //   {
  //     id: 3,
  //     type: "Income",
  //     category: "Salary",
  //     amount: 150,
  //     date: "Wed Dec 16"
  //   }
  // ];
  return (
    <div>
      <MUIList dense={false} className={classes.list}>

        {transactions.map(transaction => (
          <Slide
            direction="down"
            in
            mountOnEnter
            unmountOnExit
            key={transaction.id}
          >
            <ListItem>
              <ListItemAvatar>
                <Avatar
                  className={
                    transaction.type === "Income"
                      ? classes.avatarIncome
                      : classes.avatarExpense
                  }
                >
                  <MoneyOff />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={transaction.category}
                secondary={`$${(transaction.amount)} - ${
                  transaction.date
                }`}
              />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="details"
                  onClick={() => deleteTransaction(transaction._id)}
                >
                  <Delete />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          </Slide>
        ))}
      </MUIList>
       <CSVLink {...csvReport}>Export to CSV</CSVLink>
    </div>
  );
}

export default List;
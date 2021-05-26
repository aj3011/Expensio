import React,{useContext} from 'react'
import {Card, CardHeader, CardContent, Typography, Grid,Divider} from '@material-ui/core'
//import classes from '*.module.css'
import useStyles from './styles.js'
import Form from './Form/Form.jsx';
import List from './List/List'
import {ExpenseTrackerContext} from '../../context/context';
import InfoCard from './InfoCard'
function Main() {
  const classes = useStyles();
  const {balance,transactions} = useContext(ExpenseTrackerContext);

  var tracker='' ;
  {transactions.map(t=>{
     tracker = t.currency;
  })}

  return (
   <Card className={classes.root}>
     <CardHeader title="Expense Tracker" subheader="Powered by Speechly" />
     <CardContent>
     <Typography align ="center" variant="h5">
        {tracker}{balance}
     </Typography>
      <Typography variant="subtitle1" style={{ lineHeight:'1.5em', marginTop:'20px'}}>
        <InfoCard/>
      </Typography>
      <Divider />
      <Form />
      </CardContent>
      <CardContent className={classes.cardContent} >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <List/>
          </Grid>
        </Grid>
      </CardContent>
   </Card>
  )
}

export default Main

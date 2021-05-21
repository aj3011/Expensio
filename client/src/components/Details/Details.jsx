import { CallMissedSharp, CropFree } from '@material-ui/icons'
import { configure } from '@testing-library/dom'
import React from 'react'
//typography is used for dealing with text in material-ui
//https://material-ui.com/api/typography/
//
import {Card, CardHeader, CardContent, Typography} from '@material-ui/core';
import { Doughnut } from 'react-chartjs-2';
import useStyles from './styles';
import useTransactions from '../../useTransactions';

//A Hook is a react function that lets you use state and react features from a function based component. Hooks let you use the functions instead of switching between HOCs, Classes, and functions. As Hooks are regular Javascript functions, thus you can use the built-in Hooks and create your own custom one

const Details =({title})=> {
  const classes = useStyles();

  const {total,chartData} = useTransactions(title);
  console.log(chartData);
  return (
    <Card className={title === "Income"?classes.income:classes.expense} >
      <CardHeader title = {title}/>
      <CardContent>
        <Typography variant="h5">${total}</Typography>
        <Doughnut data={chartData} />
      </CardContent>
    </Card>
  );

};

export default Details;

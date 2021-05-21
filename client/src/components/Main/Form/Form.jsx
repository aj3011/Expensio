import React ,{useState,useContext,useEffect} from 'react'
import {TextField,Typography,Grid,Button,FormControl,InputLabel,Select,MenuItem} from '@material-ui/core';
import useStyles from './styles'
import {ExpenseTrackerContext} from '../../../context/context'
import {v4 as uuidv4} from 'uuid';
import {incomeCategories,expenseCategories} from '../../../constants/categories'
import formatDate from '../../../utils/formatDate';
import {useSpeechContext} from '@speechly/react-client'
import {useAuth,currentUser} from '../../../context/AuthContext'
import SnackBar from '../../SnackBar/SnackBar'
const initialState={
  userID:'',
  amount:'',
  category:'',
  type:'Income'
};

function Form() {
  const classes = useStyles();

  const{addTransaction} = useContext(ExpenseTrackerContext);
  const [formData, setFormData]= useState(initialState);

  //this segment is used to extract the speech
  const {segment} = useSpeechContext();
  const [open,setOpen]=useState(false);

  const createTransaction=()=>
  {
    console.log(`current user id is ${currentUser.uid}`);
    if (Number.isNaN(Number(formData.amount)))
  {
        return;
  }
    //uuidv4 is a function that creates new unique id every time
    setOpen(true);
    addTransaction({...formData,amount:Number(formData.amount),userID:currentUser.uid})
     setFormData(initialState);
  }
// segment.isFinal returns a boolean value which becomes true when we stop speaking
  useEffect(() => {
    if (segment) {
      if (segment.intent.intent === 'add_expense') {
        setFormData({ ...formData, type: 'Expense' });
      } else if (segment.intent.intent === 'add_income') {
        setFormData({ ...formData, type: 'Income' });
      } else if (segment.isFinal && segment.intent.intent === 'create_transaction') {
        return createTransaction();
      } else if (segment.isFinal && segment.intent.intent === 'cancel_transaction') {
        return setFormData(initialState);
      }

      segment.entities.forEach((s) => {
        const category = `${s.value.charAt(0)}${s.value.slice(1).toLowerCase()}`;

        switch (s.type) {
          case 'amount':
            setFormData({ ...formData, amount: s.value });
            break;
          case 'category':
            if (incomeCategories.map((iC) => iC.type).includes(category)) {
              setFormData({ ...formData, type: 'Income', category });
            } else if (expenseCategories.map((iC) => iC.type).includes(category)) {
              setFormData({ ...formData, type: 'Expense', category });
            }
            break;
          case 'date':
            setFormData({ ...formData, date: formatDate(s.value) });
            break;
          default:
            break;
        }
      });

      if (segment.isFinal && formData.amount && formData.category && formData.type) {
        createTransaction();
      }
    }
  }, [segment]);

  const selectedCategories = formData.type === 'Income'?incomeCategories:expenseCategories;

  const {currentUser} = useAuth();
  return (
    // The responsive grid focuses on consistent spacing widths, rather than column width. Material Design margins and columns follow an 8px square baseline grid. The spacing property is an integer between 0 and 10 inclusive. By default, the spacing between two grid items follows a linear function: output(spacing) = spacing * 8px, e.g. spacing={2} creates a 16px wide gap.
    <Grid container spacing={2}>
    <SnackBar open={open} setOpen={setOpen}/>
    <Grid item xs={12}>
      <Typography align="center" variant="subtitle2" gutterBottom>
      {/* place where we get our text */}
        {segment ? (
          <>
           {segment.words.map(m=>m.value).join(" ")}
           </>
        ):null}
      </Typography>
    </Grid>
    <Grid item xs={6}>
     <FormControl fullWidth>
       <InputLabel>Type</InputLabel>
       {/* Like with the single selection, you can pull out the new value by accessing event.target.value in the onChange callback. It's always an array.
       value literally means what value will the selection hold. since it has formData.type , it will hold whatever value the updated form contains-- all thanks to useState()!*/}
       <Select value={formData.type} onChange={(e)=> setFormData({...formData,type:e.target.value})}>
         <MenuItem value='Income'>Income</MenuItem>
         <MenuItem value='Expense'>Expense</MenuItem>
       </Select>
     </FormControl>
    </Grid>
    <Grid item xs={6}>
     <FormControl fullWidth>
       <InputLabel>Category</InputLabel>
       <Select value={formData.category} onChange={(e)=>setFormData({...formData,category:e.target.value})}>
         {selectedCategories.map((c)=><MenuItem key={c.type} value={c.type}>{c.type}</MenuItem>)}
       </Select>
     </FormControl>
    </Grid>
    <Grid item xs={6}>
      <TextField type="number" label="Amount" fullWidth value={formData.amount} onChange={(e)=>setFormData({...formData,amount:e.target.value})}/>
          </Grid>
          <Grid item xs={6}>
      <TextField type="date" label="Date" fullWidth value={formData.date} onChange={(e)=>setFormData({...formData,date:(e.target.value)})} />
          </Grid>
          <Button className={classes.button} variant='outlined' color='primary' fullWidth onClick={createTransaction}>Create</Button>

    </Grid>
  )
}

export default Form

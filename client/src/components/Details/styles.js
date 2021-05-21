import { makeStyles } from "@material-ui/core";
import { borderBottom } from "@material-ui/icons";

//A Hook is a react function that lets you use state and react features from a function based component. Hooks let you use the functions instead of switching between HOCs, Classes, and functions. As Hooks are regular Javascript functions, thus you can use the built-in Hooks and create your own custom one

export default makeStyles(() => ({
  income: {
    borderBottom: "10px solid rgba(0,255,0,0.5)"
  },
  expense: {
    borderBottom: "10px solid rgba(255,0,0,0.5)"
  }
}));

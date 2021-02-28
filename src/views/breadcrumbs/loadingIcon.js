import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

export default function CircularIndeterminate(props) {
  const { open } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Backdrop className={classes.backdrop} open={open} onClick={() => {}}>
        <CircularProgress style={{ color: "red" }} />
        <CircularProgress style={{ color: "white" }} />
        <CircularProgress style={{ color: "blue" }} />
      </Backdrop>
    </div>
  );
}

import {
  Button,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
  Typography,
} from "@material-ui/core";

import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    margin: " 0.5rem",
    height: "100%",
    "& > *": {
      marginLeft: 0,
    },
  },
  small: {
    width: theme.spacing(9),
    height: theme.spacing(9),
  },
  large: {
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
}));

const Instruction = ({ specialHandling }) => {
  const classes = useStyles();

  console.log(JSON.stringify(specialHandling));
  const code = specialHandling["code"];
  const instruction = specialHandling["handlingText"];

  return (
    <ListItem
      alignItems="flex-start"
      style={{ padding: 0, alignItems: "center" }}
      variant="outlined"
      component={Button}
      color="primary"
    >
      <ListItemAvatar className={classes.root}>
        <img src="/UN3481.png" className={classes.small} alt="" />
      </ListItemAvatar>
      <ListItemText
        primary={<Typography style={{ fontWeight: "bold" }}>{code}</Typography>}
        secondary={instruction}
      />
    </ListItem>
  );
};

export default Instruction;

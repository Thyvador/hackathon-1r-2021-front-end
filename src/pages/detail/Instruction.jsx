import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
} from '@material-ui/core';

import WarningIcon from '@material-ui/icons/Warning';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
}));

const Instruction = ({ specialHandling }) => {
  const classes = useStyles();

  console.log(JSON.stringify(specialHandling));
  const id = specialHandling['id'];
  const code = specialHandling['code'];
  const instruction = specialHandling['handlingText'];

  const picto = ''; // TODO: Picto per code

  return (
    <ListItem alignItems='flex-start'>
      <ListItemAvatar className={classes.root}>
        <Avatar variant='square' src='/UN3481.png' className={classes.large} />
      </ListItemAvatar>
      <ListItemText primary={code} secondary={instruction} />
    </ListItem>
  );
};

export default Instruction;

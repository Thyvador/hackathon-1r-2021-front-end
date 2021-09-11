import { Avatar, ListItem, ListItemAvatar, ListItemText } from "@material-ui/core"

import WarningIcon from '@material-ui/icons/Warning';
import React from "react";


const Instruction = ({specialHandling}) => {

  const id = specialHandling['id']
  const code = specialHandling['code']
  const instruction = specialHandling['handlingText']

  const picto = "" // TODO: Picto per code

  return <ListItem alignItems="flex-start">
    <ListItemAvatar>
      <Avatar >
        <WarningIcon />
      </Avatar>
    </ListItemAvatar>
    <ListItemText
          primary={code}
          secondary={
            instruction
          }
        />
  </ListItem>
}

export default Instruction;
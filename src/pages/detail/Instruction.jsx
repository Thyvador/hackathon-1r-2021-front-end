import { ListItem, ListItemAvatar, ListItemText } from "@material-ui/core"

const Instruction = ({specialHandling}) => {
  const id = specialHandling['id']
  const code = specialHandling['code']
  const instruction = specialHandling['handlingText']

  const picto = "" // TODO: Picto per code

  return <ListItem>
  <ListItemAvatar> {id} </ListItemAvatar>
    <ListItemText>
      {code}
      {instruction}
    </ListItemText>
  </ListItem>
}

export default Instruction;
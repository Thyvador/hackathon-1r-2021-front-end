const { List, ListSubheader } = require("@material-ui/core")
const { default: Instruction } = require("./Instruction")

/**
 * 
 * @param {object} props
 * @param {array} props.specialHandlingList
 * @returns 
 */
const InstructionList = ({specialHandlingList}) => {

  return <List>
    {specialHandlingList
      .map(specialHandling =>
        <Instruction key={specialHandling.id} specialHandling={specialHandling} />
      )
     }
  </List>
}

export default InstructionList
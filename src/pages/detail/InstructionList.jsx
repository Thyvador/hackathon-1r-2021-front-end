const { List, CardContent, Card, CardHeader } = require('@material-ui/core');
const { default: Instruction } = require('./Instruction');

/**
 *
 * @param {object} props
 * @param {array} props.specialHandlingList
 * @returns
 */
const InstructionList = ({ specialHandlingList }) => {
  return (
    <Card>
      <CardHeader title='Instructions' />
      <CardContent>
        <List>
          {specialHandlingList.map((specialHandling) => (
            <Instruction
              key={specialHandling.id}
              specialHandling={specialHandling}
            />
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default InstructionList;

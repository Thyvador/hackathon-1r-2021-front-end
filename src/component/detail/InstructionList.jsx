const {
  List,
  CardContent,
  Card,
  Typography,
  makeStyles,
} = require("@material-ui/core");
const { default: Instruction } = require("./Instruction");

const useStyles = makeStyles({
  card: {
    "& > *": {
      paddingBottom: "0.5rem !important",
    },
  },
});

/**
 *
 * @param {object} props
 * @param {array} props.specialHandlingList
 * @returns
 */
const InstructionList = ({ specialHandlingList }) => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography
          component="div"
          style={{ paddingBottom: 0, fontWeight: "bold" }}
        >
          Instructions
        </Typography>
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

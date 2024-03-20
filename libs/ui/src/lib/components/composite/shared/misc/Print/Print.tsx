import { Link, Text } from '../../../../atomic';

const Print = () => {
  return (
    <Link color="inherit" onClick={() => window.print()}>
      <Text variant="body-3" weight="medium">
        Print
      </Text>
    </Link>
  );
};
export default Print;

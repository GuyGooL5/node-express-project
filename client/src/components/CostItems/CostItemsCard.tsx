import { format } from "date-fns";
import { Container, Card, CardHeader, Typography, CircularProgress } from "@mui/material";
import CostItemList from "./CostItemList";
import { CostItemData } from "$/types/costs";
import DeleteCostDialog from "./DeleteCostDialog";

interface CostItemsCardProps {
  costs: CostItemData[];
  date: Date;
  sum: number;
  isLoading?: boolean;
  isError?: boolean;
  onDelete: (_id: string) => void;
}

const CostItemsCard = ({
  costs,
  date,
  sum,
  isLoading = false,
  isError = false,
  onDelete,
}: CostItemsCardProps) => {
  if (isLoading) return <LoadingIndicator />;
  if (isError) return <ErrorIndicator />;
  if (costs.length === 0) return <NoCostItems date={date} />;
  return (
    <>
      <Container>
        <Card elevation={2}>
          <CardHeader title={`Monthly Report for ${format(date, "yyyy/MM")}. Total sum: ${sum}₪`} />
          <CostItemList costItems={costs} onDelete={onDelete} />
        </Card>
      </Container>
    </>
  );
};

export default CostItemsCard;

const LoadingIndicator = () => (
  <Typography variant="h6">
    <CircularProgress size={24} />
    Loading...
  </Typography>
);

const ErrorIndicator = () => (
  <Typography variant="h6" color="error">
    Error loading costs
  </Typography>
);

const NoCostItems = ({ date }: { date: Date }) => (
  <Typography variant="h6">No costs for {format(date, "yyyy/MM")}</Typography>
);

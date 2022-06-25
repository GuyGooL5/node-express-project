import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { Button, Stack, styled, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";

import api from "$/api";
import QueryKeys from "$/utils/QueryKeys";

import { useAuth } from "$/context/AuthContext";

import { flushSync } from "react-dom";
import Navbar from "$/components/Navbar";
import { Add } from "@mui/icons-material";
import CostItemsCard from "$/components/CostItems/CostItemsCard";
import NewCostDialog from "$/components/CostItems/NewCostDialog";
import DeleteCostDialog from "$/components/CostItems/DeleteCostDialog";
import useDialogState from "$/hooks/useDialogState";

const HomeRoute = () => {
  const { user } = useAuth();
  const [date, setDate] = useState<Date>(new Date());
  const {
    isOpen: isOpenNewCost,
    handleOpen: handleOpenNewCost,
    handleClose: handleCloseNewCost,
  } = useDialogState();

  const [year, month] = [date.getFullYear(), date.getMonth() + 1];

  const [toDeleteId, setToDeleteId] = useState<string | null>(null);

  const { costs, addCost, deleteCost, refetch, isLoading } = useCostsCrud({
    userId: user?.idNumber ?? "",
    year,
    month,
  });

  const handleChangeDate = (_date: Date | null) => {
    flushSync(() => setDate(_date ?? new Date()));
    refetch();
  };

  const handleAddCost = addCost;

  const clearToDeleteId = () => setToDeleteId(null);
  const handleDeleteCost = (_id: string | null) => {
    if (_id) deleteCost(_id);
    setToDeleteId(null);
  };

  return (
    <div>
      <Navbar />
      <StyledActionsStack direction="row" gap={2} alignItems="center">
        <DatePicker
          value={date}
          onChange={handleChangeDate}
          views={["year", "month"]}
          label="Select a report month"
          inputFormat={"yyyy, MMM"}
          renderInput={(params) => <TextField {...params} />}
        />
        <Button onClick={handleOpenNewCost} startIcon={<Add />} variant="contained">
          New Cost
        </Button>
      </StyledActionsStack>
      <CostItemsCard
        costs={costs?.monthlyCosts.costs ?? []}
        date={date}
        sum={costs?.monthlyCosts.sum ?? 0}
        isLoading={isLoading}
        onDelete={setToDeleteId}
      />
      <NewCostDialog open={isOpenNewCost} onClose={handleCloseNewCost} onSubmit={handleAddCost} />
      <DeleteCostDialog _id={toDeleteId} onCancel={clearToDeleteId} onDelete={handleDeleteCost} />
    </div>
  );
};

export default HomeRoute;

const StyledActionsStack = styled(Stack)`
  margin: ${({ theme }) => theme.spacing(2)};
`;

interface UseCostsCrudOptions {
  userId: string;
  year: number;
  month: number;
}

const useCostsCrud = ({ userId, year, month }: UseCostsCrudOptions) => {
  const {
    data: costs,
    isLoading: isLoadingCosts,
    refetch,
  } = useQuery(QueryKeys.CostItems(userId, year, month), () => {
    if (!year || !month) return;
    return api.costs.getCosts(year, month);
  });

  const mutationOptions = { onSuccess: () => refetch() };

  const { mutate: addCost, isLoading: isLoadingNewCost } = useMutation(
    api.costs.addCost,
    mutationOptions
  );

  const { mutate: deleteCost, isLoading: isLoadingDeleteCost } = useMutation(
    api.costs.deleteCost,
    mutationOptions
  );

  return {
    costs,
    addCost,
    deleteCost,
    isLoading: isLoadingCosts || isLoadingNewCost || isLoadingDeleteCost,
    refetch,
  };
};

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
import NewCostDialog, { NewCostFormData } from "$/components/CostItems/NewCostDialog";
import { CostItemData } from "$/types/costs";

const HomeRoute = () => {
  const { user } = useAuth();
  const [date, setDate] = useState<Date>(new Date());
  const [open, setOpen] = useState(false);

  const [year, month] = [date.getFullYear(), date.getMonth() + 1];

  const {
    data: costsData,
    isLoading: isLoadingCosts,
    refetch,
  } = useQuery(QueryKeys.CostItems(user?.idNumber ?? "", year, month), () => {
    if (!year || !month) return;
    return api.costs.getCosts(year, month);
  });

  const mutationOptions = { onSuccess: () => refetch() };

  const { mutate: mutateAdd, isLoading: isLoadingNewCost } = useMutation(
    api.costs.addCost,
    mutationOptions
  );

  const { mutate: mutateDelete, isLoading: isLoadingDeleteCost } = useMutation(
    api.costs.deleteCost,
    mutationOptions
  );

  const handleChangeDate = (_date: Date | null) => {
    flushSync(() => setDate(_date ?? new Date()));
    refetch();
  };

  const handleCloseDialog = () => setOpen(false);
  const handleOpenDialog = () => setOpen(true);
  const handleAdd = mutateAdd;
  const handleDelete = mutateDelete;

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
        <Button onClick={handleOpenDialog} startIcon={<Add />} variant="contained">
          New Cost
        </Button>
      </StyledActionsStack>
      <CostItemsCard
        costs={costsData?.monthlyCosts.costs ?? []}
        date={date}
        sum={costsData?.monthlyCosts.sum ?? 0}
        isLoading={isLoadingCosts || isLoadingNewCost || isLoadingDeleteCost}
        onDelete={handleDelete}
      />
      <NewCostDialog open={open} onClose={handleCloseDialog} onSubmit={handleAdd} />
    </div>
  );
};

export default HomeRoute;

const StyledActionsStack = styled(Stack)`
  margin: ${({ theme }) => theme.spacing(2)};
`;

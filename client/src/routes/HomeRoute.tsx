import { useState } from "react";
import { useQuery } from "react-query";
import { Button, Stack, styled, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";

import api from "$/api";
import QueryKeys from "$/utils/QueryKeys";

import { useAuth } from "$/context/AuthContext";

import { flushSync } from "react-dom";
import Navbar from "$/components/Navbar";
import { Add } from "@mui/icons-material";
import CostItemsCard from "$/components/CostItems/CostItemsCard";

const HomeRoute = () => {
  const { user } = useAuth();
  const [date, setDate] = useState<Date>(new Date());

  const [year, month] = [date.getFullYear(), date.getMonth() + 1];

  const { data, isLoading, refetch } = useQuery(
    QueryKeys.CostItems(user?.idNumber ?? "", year, month),
    () => {
      if (!year || !month) return;
      return api.costs.getCosts(year, month);
    }
  );

  const handleChangeDate = (_date: Date | null) => {
    flushSync(() => setDate(_date ?? new Date()));
    refetch();
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
        <Button onClick={() => refetch()} startIcon={<Add />} variant="contained">
          New Cost
        </Button>
      </StyledActionsStack>
      <CostItemsCard
        costs={data?.monthlyCosts.costs ?? []}
        date={date}
        sum={data?.monthlyCosts.sum ?? 0}
        isLoading={isLoading}
      />
    </div>
  );
};

export default HomeRoute;

const StyledActionsStack = styled(Stack)`
  margin: ${({ theme }) => theme.spacing(2)};
`;

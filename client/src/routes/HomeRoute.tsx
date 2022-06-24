import { useState } from "react";
import { useQuery } from "react-query";
import { Button, Card, CardHeader, TextField } from "@mui/material";
import { Container } from "@mui/system";
import { DatePicker } from "@mui/x-date-pickers";

import api from "$/api";
import QueryKeys from "$/utils/QueryKeys";

import { useAuth } from "$/context/AuthContext";

import CostItemList from "$/components/CostItemList";
import { flushSync } from "react-dom";
import { format } from "date-fns";

const HomeRoute = () => {
  const { user, logout } = useAuth();
  const [date, setDate] = useState<Date>(new Date());

  const [year, month] = [date.getFullYear(), date.getMonth() + 1];

  const { data, isLoading, refetch } = useQuery(QueryKeys.CostItems(user?.idNumber ?? ""), () => {
    if (!year || !month) return;
    return api.costs.getCosts(year, month);
  });

  const handleChangeDate = (_date: Date | null) => {
    flushSync(() => setDate(_date ?? new Date()));
    refetch();
  };

  return (
    <div>
      <div>Home Route</div>
      <Button onClick={logout}>Logout</Button>
      <DatePicker
        value={date}
        onChange={handleChangeDate}
        views={["year", "month"]}
        inputFormat={"yyyy, MMM"}
        renderInput={(params) => <TextField {...params} />}
      />
      <Container>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <Card elevation={2}>
            <CardHeader
              title={`Monthly Report for ${format(date, "yyyy/MM")}. Total sum: ${
                data?.monthlyCosts.sum
              }₪`}
            />

            <CostItemList costItems={data?.monthlyCosts?.costs ?? []} />
          </Card>
        )}
      </Container>
    </div>
  );
};

export default HomeRoute;

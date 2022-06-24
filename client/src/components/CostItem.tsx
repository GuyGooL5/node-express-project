import { format } from "date-fns";
import { ListItem, Stack, Typography } from "@mui/material";

import { CostCategory } from "$/types/costs";

export interface CostItemProps {
  category: CostCategory;
  description?: string;
  price: number;
  date: Date;
}

const CostItem = ({ category, description, price, date }: CostItemProps) => {
  return (
    <ListItem>
      <Stack direction="row" justifyContent="space-between" gap={1} sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle1" sx={{ flexGrow: 1 }} textAlign="start">
          {description}
        </Typography>
        <Stack
          direction="column"
          alignContent="center"
          justifyContent="center"
          sx={{ width: "130px" }}
        >
          <Typography variant="body1">
            {categoryEmojiMap[category]} {upperCaseFirstLetter(category)}
          </Typography>
          <Typography variant="caption">{format(date, "dd/MM/yyyy")}</Typography>
          <Typography variant="body1" fontWeight={700}>{`${price}₪`}</Typography>
        </Stack>
      </Stack>
    </ListItem>
  );
};

export default CostItem;

const upperCaseFirstLetter = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

const categoryEmojiMap: Record<CostCategory, string> = {
  [CostCategory.Food]: "🍔",
  [CostCategory.Transport]: "🚌",
  [CostCategory.House]: "🏠",
  [CostCategory.Maintenance]: "🧲",
  [CostCategory.Other]: "💰",
};

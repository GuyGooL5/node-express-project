import { format } from "date-fns";
import { IconButton, ListItem, Stack, Typography } from "@mui/material";

import { CostCategory } from "$/types/costs";
import useHover from "$/hooks/useHover";
import { useRef } from "react";
import { Delete } from "@mui/icons-material";

export interface CostItemProps {
  category: CostCategory;
  description?: string;
  price: number;
  date: Date;
  onDelete: () => void;
}

const CostItem = ({ category, description, price, date, onDelete }: CostItemProps) => {
  const ref = useRef(null);

  const hover = useHover(ref);

  return (
    <ListItem ref={ref}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        gap={1}
        sx={{ flexGrow: 1 }}
      >
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
        <IconButton disabled={!hover} color="error" onClick={onDelete}>
          <Delete />
        </IconButton>
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

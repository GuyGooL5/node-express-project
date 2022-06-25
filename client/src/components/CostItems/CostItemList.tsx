import { Fragment } from "react";
import { Divider, List } from "@mui/material";

import { CostItemData } from "$/types/costs";

import CostItem from "./CostItem";

interface CostItemListProps {
  costItems: CostItemData[];
  onDelete: (_id: string) => void;
}

const CostItemList = ({ costItems, onDelete }: CostItemListProps) => (
  <List>
    {costItems.map(({ _id, category, price, description, updatedAt }, index, arr) => (
      <Fragment key={_id}>
        <CostItem
          {...{ category, price, description, date: updatedAt }}
          onDelete={() => onDelete(_id)}
        />
        {index !== arr.length - 1 && <Divider />}
      </Fragment>
    ))}
  </List>
);

export default CostItemList;

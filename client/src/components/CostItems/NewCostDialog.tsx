import { CostCategory } from "$/types/costs";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  styled,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import ControlledSelectField from "../ControlledSelectField";
import ControlledTextField from "../ControlledTextField";

export interface NewCostFormData {
  category: CostCategory;
  description: string;
  price: number;
}

interface NewCostDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (formData: NewCostFormData) => void;
}

const costCategoryOptions = [
  CostCategory.Food,
  CostCategory.House,
  CostCategory.Transport,
  CostCategory.Maintenance,
  CostCategory.Other,
];

const costEmojiMap = {
  [CostCategory.Food]: "🍔",
  [CostCategory.House]: "🏠",
  [CostCategory.Transport]: "🚌",
  [CostCategory.Maintenance]: "⚙",
  [CostCategory.Other]: "💸",
};

const NewCostDialog = ({ open, onClose, onSubmit }: NewCostDialogProps) => {
  const { control, handleSubmit, reset } = useForm<NewCostFormData>();

  useEffect(() => reset(), [open]);

  const submitHandler: SubmitHandler<NewCostFormData> = (formData) => {
    onSubmit(formData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <form onSubmit={handleSubmit(submitHandler)}>
        <DialogTitle>
          <Typography variant="h6">Add new cost</Typography>
        </DialogTitle>
        <DialogContent>
          <StyledGirdContainer container spacing={2}>
            <Grid item xs={12} sm={6}>
              <ControlledSelectField
                fullWidth
                required
                name="category"
                label="Category"
                control={control}
                options={costCategoryOptions}
                optionRenderMap={(option) => <CategoryOptionComponent option={option} />}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <ControlledTextField
                fullWidth
                required
                control={control}
                name="price"
                label="Price"
                type="number"
                InputProps={{
                  endAdornment: (
                    <Typography variant="body1" fontWeight={700} color="textSecondary">
                      ₪
                    </Typography>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <ControlledTextField
                fullWidth
                multiline
                control={control}
                name="description"
                label="Description"
              />
            </Grid>
          </StyledGirdContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained">
            Add
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default NewCostDialog;

interface CategortyOptionComponentProps {
  option: CostCategory;
}

const StyledGirdContainer = styled(Grid)`
  margin-top: ${({ theme }) => theme.spacing(2)};
`;

const CategoryOptionComponent = ({ option }: CategortyOptionComponentProps) => (
  <Typography variant="body1">
    {costEmojiMap[option]} {uppercaseFirstLetter(option)}
  </Typography>
);

const uppercaseFirstLetter = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

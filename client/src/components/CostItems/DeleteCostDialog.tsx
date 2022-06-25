import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

interface DeleteCostDialogProps {
  _id: string | null;
  onCancel: () => void;
  onDelete: (_id: string | null) => void;
}

const DeleteCostDialog = ({ _id, onCancel, onDelete }: DeleteCostDialogProps) => (
  <Dialog open={!!_id} onClose={onCancel}>
    <DialogTitle>Delete Cost</DialogTitle>
    <DialogContent>
      <DialogContentText>Are you sure you want to delete this cost?</DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={() => onDelete(_id)} color="error">
        Delete
      </Button>
      <Button onClick={onCancel} color="primary" variant="contained">
        Cancel
      </Button>
    </DialogActions>
  </Dialog>
);

export default DeleteCostDialog;

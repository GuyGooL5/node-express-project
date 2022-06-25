import { useState } from "react";

const useDialogState = () => {
  const [isOpen, setDialogState] = useState(false);

  const handleOpen = () => setDialogState(true);

  const handleClose = () => setDialogState(false);

  return {
    isOpen,
    handleOpen,
    handleClose,
  };
};

export default useDialogState;

import { Button, ButtonProps, CircularProgress } from "@mui/material";

interface LoadingButtonProps extends ButtonProps {
  loading?: boolean;
}

const LoadingButton = ({
  loading = false,
  disabled,
  startIcon,
  ...props
}: LoadingButtonProps) => {
  return (
    <Button
      {...props}
      disabled={loading || disabled}
      startIcon={loading ? <CircularProgress size={24} /> : startIcon}
    />
  );
};

export default LoadingButton;

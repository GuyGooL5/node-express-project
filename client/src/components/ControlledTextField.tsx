import { Control, Controller, Path } from "react-hook-form";
import { TextFieldProps, TextField } from "@mui/material";

type ControlledTextFieldProps<
  TFieldValues extends Record<string, any> = Record<string, any>
> = Omit<TextFieldProps, "helperText" | "error"> & {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
};

const ControlledTextField = function <TFieldValues>({
  control,
  name,
  ...props
}: ControlledTextFieldProps<TFieldValues>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ fieldState: { error } }) => (
        <TextField
          {...props}
          {...control.register(name)}
          helperText={error?.message ?? " "}
          error={!!error}
        />
      )}
    />
  );
};

export default ControlledTextField;

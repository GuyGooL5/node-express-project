import { Control, Controller, Path } from "react-hook-form";
import { MenuItem, SelectProps, Select, Typography } from "@mui/material";

interface ControlledSelectFieldProps<
  TFieldValues extends Record<string, any> = Record<string, any>,
  TOption = any
> extends Omit<SelectProps, "helperText" | "error"> {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  options: TOption[];
  optionValueMap?: (option: TOption) => string;
  optionRenderMap?: (option: TOption) => React.ReactNode;
}

const ControlledSelectField = function <TFieldValues, TOption>({
  control,
  name,
  options,
  optionValueMap = (option) => `${option}`,
  optionRenderMap = (option) => <Typography>{`${option}`}</Typography>,
  ...props
}: ControlledSelectFieldProps<TFieldValues, TOption>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ fieldState: { error } }) => (
        <Select {...props} {...control.register(name)} error={!!error}>
          {options.map((option) => (
            <MenuItem
              key={optionValueMap(option)}
              value={optionValueMap(option)}
            >
              {optionRenderMap(option)}
            </MenuItem>
          ))}
        </Select>
      )}
    />
  );
};

export default ControlledSelectField;

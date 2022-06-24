import { Control, Controller, Path } from "react-hook-form";
import {
  MenuItem,
  SelectProps,
  Select,
  Typography,
  FormControl,
  FormControlLabel,
  InputLabel,
} from "@mui/material";

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
  id,
  fullWidth,
  label,
  optionValueMap = (option) => `${option}`,
  optionRenderMap = (option) => <Typography>{`${option}`}</Typography>,
  ...props
}: ControlledSelectFieldProps<TFieldValues, TOption>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ fieldState: { error } }) => (
        <FormControl fullWidth={fullWidth} error={!!error}>
          <InputLabel id={id}>{label}</InputLabel>
          <Select
            {...control.register(name)}
            defaultValue={options[0]}
            {...props}
            fullWidth={fullWidth}
            id={id}
            label={label}
            error={!!error}
          >
            {options.map((option) => (
              <MenuItem key={optionValueMap(option)} value={optionValueMap(option)}>
                {optionRenderMap(option)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    />
  );
};

export default ControlledSelectField;

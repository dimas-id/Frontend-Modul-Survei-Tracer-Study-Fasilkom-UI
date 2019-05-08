import React from "react";
import ReactDOM from "react-dom";

import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Select from "@material-ui/core/Select";
import FormHelperText from "@material-ui/core/FormHelperText";
import {LoadingFill} from "../Loading";

function CustomSelect({
  onChange,
  value,
  name,
  children,
  id,
  label,
  variant = "outlined",
  helperText,
  error,
  required,
  fullWidth,
  margin,
  classes = {},
  disabled,
  loading,
}) {
  const [labelWidth, setLabelWidth] = React.useState(0);
  const inputLabelRef = React.useRef(null);

  React.useEffect(() => {
    const {offsetWidth} = ReactDOM.findDOMNode(inputLabelRef.current);
    setLabelWidth(offsetWidth);
  }, []);

  return (
    <FormControl
      variant={variant}
      fullWidth={fullWidth}
      margin={margin}
      className={classes.formControl}
      disabled={disabled}
    >
      <InputLabel
        ref={inputLabelRef}
        htmlFor={id || name}
        shrink={Boolean(value)}
        required={required}
        disabled={disabled}
      >
        {label}
      </InputLabel>
      <Select
        value={value}
        onChange={onChange}
        required={!!required}
        input={
          <OutlinedInput
            required={!!required}
            labelWidth={labelWidth}
            name={name}
            id={id || name}
          />
        }
      >
        {loading ? <LoadingFill /> : children}
      </Select>
      <FormHelperText
        variant={variant}
        error={error}
        required={!!required}
        margin="dense"
      >
        {helperText}
      </FormHelperText>
    </FormControl>
  );
}

CustomSelect.Item = MenuItem;

export default CustomSelect;

import React from "react";

import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Fade from "@material-ui/core/Fade";

import { layouts } from "../../../styles/guidelines";
import { enhanceForm } from "../../hocs/form";

const styles = theme => ({
  form: {
    ...layouts.flexDirCol,
    ...layouts.flexMiddle
  },
  wrapper: {
    ...layouts.windowHeight,
    ...layouts.flexDirCol,
    ...layouts.flexMiddle
  },
  btn: {
    marginTop: theme.spacing.unit * 2
  }
});

const C_PASSWORD = "password";
const C_EMAIL = "email";

const LoginForm = withStyles(styles)(
  ({
    classes,
    isSubmitting,
    handleSubmit,
    values,
    errors,
    setFieldValue,
    touched
  }) => (
    <form className={classes.form}>
      <TextField
        autoFocus
        id="Email"
        label="Email"
        autoComplete="email"
        className={classes.textField}
        margin="normal"
        variant="outlined"
        required
        value={values[C_EMAIL]}
        error={touched[C_EMAIL] && !!errors[C_EMAIL]}
        helperText={errors[C_EMAIL]}
        onChange={t => setFieldValue(C_EMAIL, t.target.value)}
      />
      <TextField
        id="Password"
        label="Password"
        autoComplete="current-password"
        className={classes.textField}
        margin="normal"
        variant="outlined"
        required
        value={values[C_PASSWORD]}
        inputProps={{
          type: "password"
        }}
        error={touched[C_PASSWORD] && !!errors[C_PASSWORD]}
        helperText={errors[C_PASSWORD]}
        onChange={t => setFieldValue(C_PASSWORD, t.target.value)}
      />
      <Button
        className={classes.btn}
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleSubmit}
        disabled={isSubmitting}
        type="submit"
      >
        {isSubmitting ? (
          <Fade in>
            <CircularProgress size={18} />
          </Fade>
        ) : (
          "Login"
        )}
      </Button>
    </form>
  )
);

// const validator = {
//   [C_EMAIL]: Validation.string().required('Email dibutuhkan.'),
//   [C_PASSWORD]: Validation.string().required('Password dibutuhkan.'),
// };
const enhancedLoginForm = enhanceForm({ displayName: "LoginForm" })(LoginForm);
enhancedLoginForm.field = {
  email: C_EMAIL,
  password: C_PASSWORD
};

export default enhancedLoginForm;

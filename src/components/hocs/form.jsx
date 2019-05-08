import React from "react";
import {withFormik, Formik} from "formik";

export const Validation = require("yup");

export const Form = Formik;

export function enhanceForm({validator, validate, ...otherConfig}) {
  const enhancer = withFormik({
    ...otherConfig,
    isInitialValid: props => {
      const {isInitialValid, ...property} = props;
      if (isInitialValid && typeof isInitialValid === "function") {
        isInitialValid(property);
      } else {
        return isInitialValid;
      }
    },
    validate: (values, props) => {
      /**
       * For normal validation, we use validation schema using yup (Validation) by passing
       * props named validator with object contains validators.
       *
       * But there is some case when we want to customize validation to solve corner case.
       * Example when we want to validate password and confirm password,
       * we can use this alternative, although we can still use Yup in this case
       * (see: https://github.com/jaredpalmer/formik/issues/90) or we want
       * to check the value with something outside from the form in the parent component.
       *
       * how to use:
       * pass validate func as props to enhanced form and it must return object
       * with field name as key and the error message
       * function(values, formProps) {
       *    return {
       *      fieldName: "this is an error message for this field"
       *    }
       * }
       *
       * You can pass props from parent if needed or just pass function in config with key validate,
       */
      if (props.validate && typeof validate === "function") {
        return props.validate(values, props);
      }

      if (validate && typeof validate === "function") {
        return validate(values, props);
      }
    },
    validationSchema: props =>
      Validation.object().shape(
        typeof validator === "function" ? validator(props) : validator
      ),
    handleSubmit: (values, {props, ...actions}) => {
      // prevent infinite recursive by take out onSubmit and give others
      const {onSubmit, ...property} = props;
      if (onSubmit && typeof onSubmit === "function") {
        onSubmit(values, actions, property);
      }
    },
    mapPropsToValues: props => props.initialValues,
  });

  return InputGroupComponent => {
    const Form = props => <InputGroupComponent {...props} />;
    return enhancer(Form);
  };
}

export function getFieldProps(name, {values, errors, handleChange, touched}) {
  const error = Boolean(touched[name] && errors[name]);
  const result = {
    error,
    onChange: handleChange,
  };

  if (error && errors[name]) {
    result.helperText = errors[name];
  }

  if (values) {
    result.value = values[name];
  }

  return result;
}

export default {
  enhanceForm,
  Form,
  Validation,
};

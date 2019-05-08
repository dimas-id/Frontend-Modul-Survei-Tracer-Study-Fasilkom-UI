import React from "react";
import {connect} from "react-redux";
import keymirror from "keymirror";
import classNames from "classnames";
import {FastField, Field} from "formik";

import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/styles";

import {selectTemplates} from "../../../../modules/mailer/selectors";
import {getTemplates} from "../../../../modules/mailer/thunks";
import {Guidelines} from "../../../../styles";

import Select from "../../../Select";
import {Validation, getFieldProps} from "../../../hocs/form";

const useStyle = makeStyles({
  templatePreview: {
    minHeight: 240,
    ...Guidelines.layouts.w100,
    ...Guidelines.layouts.h100,
    ...Guidelines.layouts.mt16,
    ...Guidelines.layouts.pt16,
    ...Guidelines.layouts.pb16,
    ...Guidelines.layouts.pr16,
    ...Guidelines.layouts.pl16,
  },
  templatePreviewEmpty: {
    ...Guidelines.layouts.flexMiddle,
    ...Guidelines.layouts.flexDirCol,
  },
});

const FIELDS = keymirror({
  title: null,
  template: null,
  senderAddress: null,
  subject: null,
});

const VALIDATOR = Validation.object().shape({
  [FIELDS.title]: Validation.string().required("Judul wajib diisi."),
  [FIELDS.template]: Validation.object().required("Templat wajib diisi."),
  [FIELDS.senderAddress]: Validation.string().required(
    "Alamat pengirim wajib diisi."
  ),
  [FIELDS.subject]: Validation.string().required("Subyek wajib diisi."),
});

export function getInitialValues(values = {}) {
  return {
    [FIELDS.title]: "",
    [FIELDS.senderAddress]: "",
    [FIELDS.subject]: "",
    ...values,
  };
}

function renderTemplateItem(templates, value) {
  if (!Array.isArray(templates)) {
    return null;
  }

  return templates.map(item => (
    <Select.Item key={item.id} value={item} selected={item.value === value}>
      {item.title}
    </Select.Item>
  ));
}

function Form({templates, disabled, ...otherProps}) {
  const [loadingTemplate, setLoadingTemplate] = React.useState(true);
  React.useEffect(() => {
    otherProps.dispatch(getTemplates()).finally(() => {
      setLoadingTemplate(false);
    });
  }, []);

  const classes = useStyle();

  return (
    <Grid container spacing={24}>
      <Grid item xs={12} sm={3}>
        <FastField
          name={FIELDS.title}
          render={({field, form}) => (
            <TextField
              id="outlined-title"
              margin="normal"
              variant="outlined"
              label="Judul batch"
              fullWidth
              helperText="Judul untuk batch ini, bukan untuk subyek tiap email."
              autoFocus
              required
              disabled={disabled}
              {...getFieldProps(field.name, form)}
              {...field}
            />
          )}
        />
        <FastField
          name={FIELDS.subject}
          render={({field, form}) => (
            <TextField
              id="outlined-subject"
              margin="normal"
              variant="outlined"
              label="Subyek"
              fullWidth
              helperText="Subyek email."
              required
              disabled={disabled}
              {...getFieldProps(field.name, form)}
              {...field}
            />
          )}
        />
        <Field
          name={FIELDS.template}
          render={({field, form}) => (
            <Select
              id="outlined-template"
              margin="normal"
              variant="outlined"
              label={loadingTemplate ? "Menunggu templat..." : "Templat"}
              fullWidth
              helperText="Pilih templat yang digunakan untuk email."
              disabled={loadingTemplate || disabled}
              loading={loadingTemplate}
              required
              {...getFieldProps(field.name, form)}
              {...field}
            >
              {renderTemplateItem(templates, field.value)}
            </Select>
          )}
        />
        <FastField
          name={FIELDS.senderAddress}
          render={({field, form}) => (
            <TextField
              id="outlined-sender-address"
              margin="normal"
              variant="outlined"
              label="Alamat email pengirim"
              placeholder="noreply"
              fullWidth
              helperText="Alamat pengirim. Tidak boleh ada spasi. Domain yang digunakan @cs.ui.ac.id"
              required
              disabled={disabled}
              {...getFieldProps(field.name, form)}
              {...field}
            />
          )}
        />
      </Grid>
      <Grid item xs={12} sm={9}>
        <Paper elevation={1}>
          <FastField
            name={FIELDS.template}
            render={({field}) => (
              <React.Fragment>
                {field.value && (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: field.value.body,
                    }}
                    className={classNames(classes.templatePreview)}
                  />
                )}
                {!field.value && (
                  <div
                    className={classNames(
                      classes.templatePreview,
                      classes.templatePreviewEmpty
                    )}
                  >
                    <Typography
                      variant="h5"
                      component="div"
                      color="textSecondary"
                    >
                      Pratinjau templat
                    </Typography>
                    <Typography
                      variant="body1"
                      component="div"
                      color="textSecondary"
                    >
                      Tolong pilih templat
                    </Typography>
                  </div>
                )}
              </React.Fragment>
            )}
          />
        </Paper>
      </Grid>
    </Grid>
  );
}

const MailBatchForm = connect(state => ({
  templates: selectTemplates(state),
}))(Form);

MailBatchForm.fields = FIELDS;
MailBatchForm.validator = VALIDATOR;
MailBatchForm.initializeValues = getInitialValues;

export default MailBatchForm;

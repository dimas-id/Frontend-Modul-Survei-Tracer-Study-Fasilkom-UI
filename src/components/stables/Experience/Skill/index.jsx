import React from "react";
import { connect } from "react-redux";
import keymirror from "keymirror";
import get from "lodash/get";
import atlasV1 from "../../../../modules/api/atlas/v1";
import { getUserId } from "../../../../modules/session/selectors";
import { humanizeError } from "../../../../libs/response";
import { makeStyles } from "@material-ui/styles";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Chip from "@material-ui/core/Chip";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { LoadingFill } from "../../../Loading";
import Divider from "@material-ui/core/Divider";

const styles = makeStyles(theme => ({
  checkbox: {
    paddingTop: 3,
    paddingBottom: 3,
  },
  formControlLabel: {
    // width: "35vh"
  },
  chip: {
    margin: "2px",
  },
}));

const FIELDS = keymirror({
  cp: null,
  cs: null,
  ds: null,
  go: null,
  js: null,
  ml: null,
  pm: null,
  sa: null,
  ui: null,
  ux: null,
  css: null,
  erp: null,
  sql: null,
  html: null,
  java: null,
  kotlin: null,
  python: null,
  flutter: null,
  dbAdmin: null,
  consulting: null,
});

function Skill({ userId, onUpdate, onSave, getUserSkills }) {
  const classes = styles();
  const [loading, setLoading] = React.useState(true);
  const [submitting, setSubmitting] = React.useState(false);
  const [skill, setSkill] = React.useState({
    [FIELDS.cp]: false,
    [FIELDS.cs]: false,
    [FIELDS.ds]: false,
    [FIELDS.go]: false,
    [FIELDS.js]: false,
    [FIELDS.ml]: false,
    [FIELDS.pm]: false,
    [FIELDS.sa]: false,
    [FIELDS.ui]: false,
    [FIELDS.ux]: false,
    [FIELDS.css]: false,
    [FIELDS.erp]: false,
    [FIELDS.sql]: false,
    [FIELDS.html]: false,
    [FIELDS.java]: false,
    [FIELDS.kotlin]: false,
    [FIELDS.python]: false,
    [FIELDS.flutter]: false,
    [FIELDS.dbAdmin]: false,
    [FIELDS.consulting]: false,
  });

  const [skillDict, setSkillDict] = React.useState({});
  import("./skill.json").then(val => {
    setSkillDict(val.default);
  });

  const getResult = res => get(res, "data.topSkills");

  React.useEffect(() => {
    setLoading(true);
    atlasV1.session
      .getSkills(userId)
      .then(result => {
        setSkill(getResult(result));
      })
      .finally(() => {
        setLoading(false);
      });
  }, [userId]);

  const [pickedSkill, setPickedSkill] = React.useState([]);
  React.useEffect(() => {
    setPickedSkill(Object.keys(skill).filter(key => skill[key] === true));
  }, [skill]);

  function submit() {
    setSubmitting(true);
    const payload = skill;
    atlasV1.session
      .patchSkills(userId, payload)
      .then(result => {
        setSkill(getResult(result));
      })
      .catch(e => {
        if (e.response) {
          const error = humanizeError(e.response.data, Object.keys(FIELDS));
          console.log(
            "🚀 ~ file: index.jsx ~ line 105 ~ submit ~ error",
            error
          );
        }
      })
      .finally(() => {
        setSubmitting(false);
        onUpdate(false);
        getUserSkills();
        onSave();
      });
  }

  function handleChange({ target }) {
    setSkill({ ...skill, [target.name]: target.checked });
    onUpdate(true);
  }

  function SkillCheckbox({ code }) {
    return (
      <FormControlLabel
        className={classes.formControlLabel}
        control={
          <Checkbox
            disabled={pickedSkill.length >= 5 && !skill[code]}
            className={classes.checkbox}
            name={code}
            checked={skill[code]}
            value={code}
            onChange={handleChange}
          />
        }
        label={skillDict[code]}
      />
    );
  }

  return (
    <React.Fragment>
      {loading ? (
        <LoadingFill />
      ) : (
        <React.Fragment>
          <DialogContent>
            <form id="skillForm">
              <Grid container spacing={24}>
                <Grid item xs={6}>
                  {Object.keys(skill)
                    .slice(0, 10)
                    .map(key => (
                      <Grid item xs={12}>
                        <SkillCheckbox code={key} />
                      </Grid>
                    ))}
                </Grid>
                <Grid item xs={6}>
                  {Object.keys(skill)
                    .slice(10, 20)
                    .map(key => (
                      <Grid item xs={12}>
                        <SkillCheckbox code={key} />
                      </Grid>
                    ))}
                </Grid>
              </Grid>
            </form>
            <br />
            <Divider variant="middle" />
            <p>
              {pickedSkill.length + " "}
              Skill Dipilih
            </p>
            {pickedSkill.map(skill => (
              <Chip className={classes.chip} label={skillDict[skill]} />
            ))}
          </DialogContent>
          <DialogActions>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              disabled={submitting}
              type="submit"
              onClick={submit}
            >
              Simpan
            </Button>
          </DialogActions>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

function createContainer() {
  const mapStateToProps = state => ({
    userId: getUserId(state),
  });
  return connect(mapStateToProps, null)(Skill);
}

export default createContainer();

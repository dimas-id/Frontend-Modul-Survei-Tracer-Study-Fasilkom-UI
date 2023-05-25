import React, { useEffect, useReducer } from "react";
import { connect } from "react-redux";
import { useHistory, withRouter } from "react-router";

import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import { authorize } from "../../../components/hocs/auth";
import { NavbarAuth } from "../../../components/stables/Navbar";
import NavbarBackEmailBlasterForm from "../../../components/stables/Navbar/NavbarBackEmailBlasterForm";
import { Container } from "../../../components/Container";
import { Guidelines } from "../../../styles";
import EmailTemplateForm from "../../../components/stables/EmailTemplateV2/EmailTemplateForm";
import EmailTemplateList from "../../../components/stables/EmailTemplateV2/EmailTemplateList";
import Toast from "../../../components/Toast";
import templateAPI from "../../../modules/api/atlas/v3/email-template";
import { emailBlasterActions } from "../../../modules/email-blaster";
import { EMAIL_BLASTER_SEND, LIHAT_SURVEI } from "../../paths";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const styles = theme => ({
  container: {
    ...Guidelines.layouts.flexDirRow,
    ...Guidelines.layouts.mt32,
    maxHeight: "80vh",
  },
  listContainer: {
    marginTop: 0,
    marginBottom: 0,
    paddingTop: theme.spacing.unit * 2,
    overflowY: "auto",
    maxHeight: "100%",
    scrollbarWidth: "thin",
    scrollbarColor: "#ccc #f5f5f5",
    "::-webkit-scrollbar": {
      height: 0,
    },
  },
  nextButtonContainer: {
    textAlign: "right",
    marginTop: 0,
    marginBottom: 0,
  },
  nextButton: {
    marginLeft: "auto",
    fontSize: "large",
  },
});

function Screen({ classes, changeTemplateId, templateId, surveiId }) {
  const [templatesState, dispatch] = useReducer(templateReducer, {});
  const history = useHistory();
  useEffect(() => {
    if (surveiId == null) {
      history.push(LIHAT_SURVEI);
      Toast("Pilih survei terlebih dahulu!", "error");
    }

    fetchTemplates();
  }, [history, surveiId]);

  const fetchTemplates = () => {
    templateAPI
      .listTemplates()
      .then(res => {
        const resp_templates = res.data.results;
        const templates = {};
        for (const element of resp_templates) {
          templates[element.id] = {
            title: element.title,
            subject: element.emailSubject,
            body: element.emailBody,
            lastCursorPosition: 0,
            isShow: false,
            isSaved: true,
            errors: ["", "", ""],
          };
        }
        dispatch({
          type: "FETCH_TEMPLATES_SUCCESS",
          payload: templates,
        });
      })
      .catch(err => {
        Toast("Gagal mengambil template!", "error");
      });
  };

  const handleTitle = (e, key) => {
    dispatch({
      type: "HANDLE_TITLE",
      payload: { title: e.target.value, key: key },
    });
  };

  const handleBody = (e, key) => {
    dispatch({
      type: "HANDLE_BODY",
      payload: { body: e.target.value, key: key },
    });
  };

  const handleSubject = (e, key) => {
    dispatch({
      type: "HANDLE_SUBJECT",
      payload: { subject: e.target.value, key: key },
    });
  };

  const updateCursorPosition = (e, key) => {
    dispatch({
      type: "CLICK_BODY",
      payload: { position: e.target.selectionStart, key: key },
    });
  };

  const insertVar = (e, key) => {
    dispatch({
      type: "INSERT_VARIABLE",
      payload: {
        body: templatesState[key].body,
        position: templatesState[key].lastCursorPosition,
        key: key,
      },
    });
  };

  const handleClickList = (e, key) => {
    changeTemplateId(key);
    dispatch({
      type: "SHOW",
      payload: key,
    });
  };

  const handleSave = (e, key) => {
    templateAPI
      .saveTemplate(
        key,
        templatesState[key].title,
        templatesState[key].subject,
        templatesState[key].body
      )
      .then(res => {
        Toast("Template berhasil disimpan!", "success");
        dispatch({
          type: "SAVE_SUCCESS",
          payload: {
            key: res.data.id,
            title: res.data.title,
            subject: res.data.emailSubject,
            body: res.data.emailBody,
          },
        });
      })
      .catch(err => {
        Toast("Template gagal disimpan", "error");
        dispatch({
          type: "SAVE_FAILED",
          payload: {
            key: key,
            errors: [
              err.response.data.title,
              err.response.data.emailSubject,
              err.response.data.emailBody,
            ],
          },
        });
      });
  };

  const handleDelete = (e, key) => {
    templateAPI
      .deleteTemplate(key)
      .then(() => {
        Toast("Template berhasil dihapus!", "success");
        changeTemplateId(null);
        dispatch({
          type: "DELETE_SUCCESS",
          payload: key,
        });
      })
      .catch(err => {
        Toast("Template gagal dihapus", "error");
        dispatch({
          type: "DELETE_FAILED",
        });
      });
  };

  const handleNew = () => {
    templateAPI
      .newTemplate()
      .then(res => {
        Toast("Template baru berhasil dibuat!", "success");
        dispatch({
          type: "NEW_SUCCESS",
          payload: {
            key: res.data.id,
            title: res.data.title,
            subject: res.data.emailSubject,
            body: res.data.emailBody,
          },
        });
      })
      .catch(err => {
        Toast("Template baru gagal dibuat", "error");
        dispatch({
          type: "NEW_FAILED",
        });
      });
  };

  const handleCopy = (e, key) => {
    templateAPI
      .newTemplateFromBase(
        templatesState[key].title,
        templatesState[key].subject,
        templatesState[key].body
      )
      .then(res => {
        Toast("Template berhasil diduplikat!", "success");
        dispatch({
          type: "COPY_SUCCESS",
          payload: {
            key: res.data.id,
            title: res.data.title,
            subject: res.data.emailSubject,
            body: res.data.emailBody,
          },
        });
      })
      .catch(err => {
        Toast("Template gagal diduplikat", "error");
        dispatch({
          type: "COPY_FAILED",

          payload: {
            key: key,
            errors: [
              err.response.data.title,
              err.response.data.emailSubject,
              err.response.data.emailBody,
            ],
          },
        });
      });
  };

  const onNext = () => {
    if (templateId == null) {
      Toast("Pilih template terlebih dahulu!", "error");
      return;
    }
    history.push(EMAIL_BLASTER_SEND);
  };

  return (
    <React.Fragment>
      <NavbarAuth title="Pilih Email Template" />
      <NavbarBackEmailBlasterForm onClick={onNext} title={"NEXT"} />
      <Container className={classes.container}>
        {templatesState != null && (
          <Grid container spacing={24}>
            <Grid item xs={3} className={classes.listContainer}>
              <EmailTemplateList
                templates={templatesState}
                onClickTemplate={handleClickList}
                handleNew={() => handleNew()}
              />
            </Grid>
            <Grid item xs={9}>
              {Object.keys(templatesState).map((key, i) => (
                <EmailTemplateForm
                  key={key}
                  isShow={templatesState[key].isShow}
                  title={templatesState[key].title}
                  body={templatesState[key].body}
                  subject={templatesState[key].subject}
                  errors={templatesState[key].errors}
                  onChangeTitle={e => handleTitle(e, key)}
                  onChangeBody={e => handleBody(e, key)}
                  onChangeSubject={e => handleSubject(e, key)}
                  onSubmit={e => handleSave(e, key)}
                  onDelete={e => handleDelete(e, key)}
                  onInsertVariable={e => insertVar(e, key)}
                  onClickBody={e => updateCursorPosition(e, key)}
                  onDuplicate={e => handleCopy(e, key)}
                />
              ))}
            </Grid>
          </Grid>
        )}
      </Container>
      <ToastContainer />
    </React.Fragment>
  );
}

const templateReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_TEMPLATES_SUCCESS":
      return action.payload;

    case "HANDLE_TITLE":
      return {
        ...state,
        [action.payload.key]: {
          ...state[action.payload.key],
          title: action.payload.title,
          isSaved: false,
        },
      };
    case "HANDLE_BODY":
      return {
        ...state,
        [action.payload.key]: {
          ...state[action.payload.key],
          body: action.payload.body,
          isSaved: false,
        },
      };
    case "HANDLE_SUBJECT":
      return {
        ...state,
        [action.payload.key]: {
          ...state[action.payload.key],
          subject: action.payload.subject,
          isSaved: false,
        },
      };
    case "SHOW":
      const newState = { ...state };
      Object.keys(newState).forEach(key => {
        newState[key].isShow = false;
      });
      newState[action.payload].isShow = true;
      return newState;
    case "CLICK_BODY":
      return {
        ...state,
        [action.payload.key]: {
          ...state[action.payload.key],
          lastCursorPosition: action.payload.position,
        },
      };
    case "INSERT_VARIABLE":
      let cursorPosition = action.payload.position;
      let textBeforeCursorPosition = action.payload.body.substring(
        0,
        cursorPosition
      );
      let textAfterCursorPosition = action.payload.body.substring(
        cursorPosition,
        action.payload.length
      );
      let newText =
        textBeforeCursorPosition + "{{URL_SURVEI}}" + textAfterCursorPosition;
      return {
        ...state,
        [action.payload.key]: {
          ...state[action.payload.key],
          body: newText,
          isSaved: false,
        },
      };
    case "SAVE_SUCCESS":
      return {
        ...state,
        [action.payload.key]: {
          ...state[action.payload.key],
          body: action.payload.body,
          subject: action.payload.subject,
          title: action.payload.title,
          isSaved: true,
          errors: ["", "", ""],
        },
      };
    case "SAVE_FAILED":
      return {
        ...state,
        [action.payload.key]: {
          ...state[action.payload.key],
          isSaved: false,
          errors: action.payload.errors,
        },
      };
    case "DELETE_SUCCESS":
      const omitted = Object.keys(state)
        .filter(key => key !== action.payload)
        .reduce((obj, key) => {
          obj[key] = state[key];
          return obj;
        }, {});
      return omitted;
    case "NEW_SUCCESS":
    case "COPY_SUCCESS":
      return {
        ...state,
        [action.payload.key]: {
          ...state[action.payload.key],
          body: action.payload.body,
          subject: action.payload.subject,
          title: action.payload.title,
          isShow: false,
          isSaved: true,
          errors: ["", "", ""],
        },
      };
    case "COPY_FAILED":
      return {
        ...state,
        [action.payload.key]: {
          ...state[action.payload.key],
          errors: action.payload.errors,
        },
      };
    case "DELETE_FAILED":
    case "NEW_FAILED":
    default:
      return {
        ...state,
      };
  }
};

function createContainer() {
  const mapStateToProps = state => ({
    surveiId: state.emailBlaster.surveiId,
    templateId: state.emailBlaster.templateId,
  });

  const mapDispatchToProps = dispatch => ({
    changeTemplateId: id => dispatch(emailBlasterActions.changeTemplateId(id)),
  });

  return authorize({
    mustVerified: false,
    roles: [authorize.STAFF, authorize.SUPERUSER],
  })(
    withRouter(
      connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Screen))
    )
  );
}

export default createContainer();

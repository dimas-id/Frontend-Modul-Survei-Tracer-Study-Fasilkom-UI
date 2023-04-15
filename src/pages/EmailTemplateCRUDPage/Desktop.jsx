import React, { useEffect, useReducer } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import { authorize } from "../../components/hocs/auth";
import { NavbarAuth, NavbarBack } from "../../components/stables/Navbar";
import { Container } from "../../components/Container";
import { Guidelines } from "../../styles";
import EmailTemplateForm from "../../components/stables/EmailTemplateV2/EmailTemplateForm";
import EmailTemplateList from "../../components/stables/EmailTemplateV2/EmailTemplateList";
import Toast from "../../components/Toast";
import templateAPI from "../../modules/api/atlas/v3/email-template";
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
    overflowY: "auto",
    maxHeight: "100%",
  },
});

function Screen({ classes }) {
  const [templatesState, dispatch] = useReducer(templateReducer, {});

  useEffect(() => {
    fetchTemplates();
  }, []);

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
      key: key,
      payload: e.target.value,
    });
  };

  const handleBody = (e, key) => {
    dispatch({
      type: "HANDLE_BODY",
      key: key,
      payload: e.target.value,
    });
  };

  const handleSubject = (e, key) => {
    dispatch({
      type: "HANDLE_SUBJECT",
      key: key,
      payload: e.target.value,
    });
  };

  const updateCursorPosition = (e, key) => {
    dispatch({
      type: "CLICK_BODY",
      key: key,
      payload: e.target.selectionStart,
    });
  };

  const insertVar = (e, key) => {
    dispatch({
      type: "INSERT_VARIABLE",
      key: key,
      cursorPosition: templatesState[key].lastCursorPosition,
      payload: templatesState[key].body,
    });
  };

  const handleShow = (e, key) => {
    dispatch({
      type: "SHOW",
      key: key,
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
          key: res.data.id,
          payload: {
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
          key: key,
          payload: [
            err.response.data.title,
            err.response.data.emailSubject,
            err.response.data.emailBody,
          ],
        });
      });
  };

  const handleDelete = (e, key) => {
    templateAPI
      .deleteTemplate(key)
      .then(() => {
        Toast("Template berhasil dihapus!", "success");
        dispatch({
          type: "DELETE_SUCCESS",
          key: key,
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
          key: res.data.id,
          payload: {
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
        templatesState[key].body,
        templatesState[key].subject
      )
      .then(res => {
        Toast("Template berhasil diduplikat!", "success");
        dispatch({
          type: "COPY_SUCCESS",
          key: res.data.id,
          payload: {
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
          key: key,
          payload: [
            err.response.data.title,
            err.response.data.emailSubject,
            err.response.data.emailBody,
          ],
        });
      });
  };

  return (
    <React.Fragment>
      <NavbarAuth title="Pilih Email Template" />
      <NavbarBack />
      <Container className={classes.container}>
        {templatesState != null && (
          <Grid container spacing={24}>
            <Grid item xs={3} className={classes.listContainer}>
              <EmailTemplateList
                templates={templatesState}
                onClickTemplate={handleShow}
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
        [action.key]: {
          ...state[action.key],
          title: action.payload,
          isSaved: false,
        },
      };
    case "HANDLE_BODY":
      return {
        ...state,
        [action.key]: {
          ...state[action.key],
          body: action.payload,
          isSaved: false,
        },
      };
    case "HANDLE_SUBJECT":
      return {
        ...state,
        [action.key]: {
          ...state[action.key],
          subject: action.payload,
          isSaved: false,
        },
      };
    case "SHOW":
      const newState = { ...state };
      Object.keys(newState).forEach(key => {
        newState[key].isShow = false;
      });
      newState[action.key].isShow = true;
      return newState;

    case "CLICK_BODY":
      return {
        ...state,
        [action.key]: {
          ...state[action.key],
          lastCursorPosition: action.payload,
        },
      };
    case "INSERT_VARIABLE":
      let cursorPosition = action.cursorPosition;
      let textBeforeCursorPosition = action.payload.substring(
        0,
        cursorPosition
      );
      let textAfterCursorPosition = action.payload.substring(
        cursorPosition,
        action.payload.length
      );
      let newText =
        textBeforeCursorPosition + "{{URL_SURVEI}}" + textAfterCursorPosition;
      return {
        ...state,
        [action.key]: { ...state[action.key], body: newText, isSaved: false },
      };
    case "SAVE_SUCCESS":
      return {
        ...state,
        [action.key]: {
          ...state[action.key],
          isSaved: true,
          errors: ["", "", ""],
        },
      };
    case "SAVE_FAILED":
      return {
        ...state,
        [action.key]: {
          ...state[action.key],
          isSaved: false,
          errors: action.payload,
        },
      };
    case "DELETE_SUCCESS":
      const omitted = Object.keys(state)
        .filter(key => key !== action.key)
        .reduce((obj, key) => {
          obj[key] = state[key];
          return obj;
        }, {});
      return omitted;
    case "NEW_SUCCESS":
    case "COPY_SUCCESS":
      return {
        ...state,
        [action.key]: {
          ...action.payload,
          isShow: false,
          isSaved: true,
          errors: ["", "", ""],
        },
      };
    case "COPY_FAILED":
      return {
        ...state,
        [action.key]: {
          ...state[action.key],
          errors: action.payload,
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
  const mapStateToProps = null;

  const mapDispatchToProps = dispatch => ({});

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

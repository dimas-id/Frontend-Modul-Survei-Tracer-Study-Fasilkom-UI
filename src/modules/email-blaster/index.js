/**
 * Reducer for Email Blaster Multi Step Form
 */
const CHANGE_TEMPLATE_ID = "email-blaster/CHANGE_TEMPLATE_ID";
const CHANGE_SURVEI_ID = "email-blaster/CHANGE_SURVEI_ID";
const CHANGE_RECIPIENTS = "email-blaster/CHANGE_RECIPIENTS";

const INITIAL_STATE = {
  templateId: null,
  surveiId: 10,
  recipients: [
    "joshstevenlasimann@gmail.com",
    "tlinden@msn.com",
    "mastinfo@yahoo.com",
    "mugwump@msn.com",
    "ntegrity@sbcglobal.net",
    "treeves@gmail.com",
    "bescoto@att.net",
    "andersbr@comcast.net",
    "crowemojo@outlook.com",
    "lpalmer@verizon.net",
    "kohlis@me.com",
    "wortmanj@yahoo.ca",
    "murdocj@gmail.com",
    "maikelnai@yahoo.ca",
    "heine@att.net",
    "marcs@outlook.com",
    "mschwartz@gmail.com",
    "chunzi@icloud.com",
    "petersko@live.com",
    "jesse@sbcglobal.net",
    "jbailie@icloud.com",
    "xnormal@mac.com",
    "paulv@gmail.com",
    "anicolao@sbcglobal.net",
    "sbmrjbr@att.net",
    "syncnine@verizon.net",
    "dodong@yahoo.ca",
    "jandrese@me.com",
    "solomon@sbcglobal.net",
    "scotfl@yahoo.ca",
    "scottlee@msn.com",
    "bdthomas@yahoo.com",
    "ryanshaw@sbcglobal.net",
    "wmszeliga@hotmail.com",
    "ianbuck@mac.com",
    "gfxguy@live.com",
    "gemmell@hotmail.com",
    "djupedal@verizon.net",
    "gfxguy@mac.com",
    "fairbank@att.net",
    "sumdumass@comcast.net",
    "joehall@verizon.net",
    "sscorpio@verizon.net",
    "dpitts@hotmail.com",
    "curly@hotmail.com",
    "webteam@aol.com",
    "bmcmahon@hotmail.com",
    "dexter@gmail.com",
    "flakeg@yahoo.ca",
    "harryh@verizon.net",
    "froodian@optonline.net",
    "garland@me.com",
    "parasite@live.com",
    "chlim@icloud.com",
    "parrt@msn.com",
    "dpitts@live.com",
    "mmccool@msn.com",
    "fbriere@optonline.net",
    "fwiles@msn.com",
    "kodeman@outlook.com",
    "laird@comcast.net",
    "matty@yahoo.ca",
    "dowdy@mac.com",
    "luebke@att.net",
    "johndo@live.com",
    "wiseb@sbcglobal.net",
    "quantaman@sbcglobal.net",
    "psharpe@mac.com",
    "johndo@optonline.net",
    "mahbub@aol.com",
    "irving@msn.com",
    "brbarret@optonline.net",
    "dpitts@outlook.com",
    "wikinerd@verizon.net",
    "north@yahoo.com",
    "hamilton@me.com",
    "tmccarth@outlook.com",
    "dgatwood@optonline.net",
    "arnold@live.com",
    "jlbaumga@aol.com",
    "tbmaddux@mac.com",
    "kjohnson@icloud.com",
    "tromey@yahoo.com",
    "saridder@yahoo.ca",
    "dhrakar@icloud.com",
    "khris@verizon.net",
    "jpflip@verizon.net",
    "sarahs@icloud.com",
    "matthijs@mac.com",
    "dvdotnet@yahoo.ca",
    "rnelson@outlook.com",
    "crowemojo@yahoo.com",
    "howler@yahoo.ca",
    "parasite@icloud.com",
    "symbolic@live.com",
    "jimxugle@att.net",
    "bmidd@att.net",
    "staikos@msn.com",
    "zilla@me.com",
    "cremonini@att.net",
    "camenisch@optonline.net",
  ],
};

export function emailBlasterReducer(state, action) {
  switch (action.type) {
    case CHANGE_TEMPLATE_ID:
      return {
        ...state,
        templateId: action.payload,
      };
    case CHANGE_SURVEI_ID:
      return {
        ...state,
        surveiId: action.payload,
      };
    case CHANGE_RECIPIENTS:
      return {
        ...state,
        recipients: action.payload,
      };
    default:
      return state || INITIAL_STATE;
  }
}

export const emailBlasterActions = Object.freeze({
  changeTemplateId: templateId => ({
    type: CHANGE_TEMPLATE_ID,
    payload: templateId,
  }),
  changeSurveiId: surveiId => ({
    type: CHANGE_SURVEI_ID,
    payload: surveiId,
  }),
  changeRecipients: recipients => ({
    type: CHANGE_RECIPIENTS,
    payload: recipients,
  }),
});

export default emailBlasterReducer;

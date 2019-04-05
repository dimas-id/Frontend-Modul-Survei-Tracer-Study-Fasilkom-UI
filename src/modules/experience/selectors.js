import get from "lodash/get";

export function getExperience(state) {
  return get(state, "experience");
}

export function getWorkPositions(state) {
  return get(getExperience(state), "workPositions");
}

export function getEducations(state) {
  return get(getExperience(state), "educations");
}

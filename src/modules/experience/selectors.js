import get from "lodash/get";
import find from "lodash/find";

export function getExperience(state) {
  return get(state, "experience");
}

export function getWorkPositions(state) {
  return get(getExperience(state), "workPositions.results");
}

export function getEducations(state) {
  return get(getExperience(state), "educations.results");
}

export function getWorkPositionById(state, positionId) {
  const positions = getWorkPositions(state);
  return find(positions, pos => pos.id === positionId);
}

export function getOtherEdus(state) {
  return get(getExperience(state), "otherEdus.results");
}

export function getOtherEduById(state, otherEduId) {
  const otherEdus = getOtherEdus(state);
  return find(otherEdus, edu => edu.id === otherEduId);
}

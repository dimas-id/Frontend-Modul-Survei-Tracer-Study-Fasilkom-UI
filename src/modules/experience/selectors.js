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

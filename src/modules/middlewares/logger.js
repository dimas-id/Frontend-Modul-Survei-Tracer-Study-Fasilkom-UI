export default () => next => action => {
  console.group(action.type);
  console.info("dispatching", action);
  let result = next(action);
  console.groupEnd();
  return result;
};

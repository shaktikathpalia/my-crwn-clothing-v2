export const logger = store => next => action => {
  if(!action.type){
    return next(action);
  }
  console.log('action', action);
  console.log('currentState', store.getState());
  const result = next(action);
  console.log('nextState', store.getState());
  return result;
}

function test(state = 0, action: any): number {
  if (action.type === 'INC') {
    state += 1;
  }
  if (action.type === 'DEC') {
    state -= 1;
  }
  return state;
}

const reducers = {
  test
};

export default reducers;
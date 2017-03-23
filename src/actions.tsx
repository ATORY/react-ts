
export function INC(compaignId: string) {
  return (dispatch: any, getState: any) => {
    dispatch({ type: 'INC'});
  };
};

export function DEC(compaignId: string) {
  return (dispatch: any, getState: any) => {
    dispatch({ type: 'DEC'});
  };
};


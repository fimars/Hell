function sidebarControl(
  state: { sideBarDisplay: boolean } = { sideBarDisplay: false },
  action: { type: string; value: boolean }
) {
  switch (action.type) {
    case "SET_SIDEBAR_DISPLAY":
      return Object.assign({}, state, {
        sideBarDisplay: action.value
      });
    default:
      return state;
  }
}

export default sidebarControl;

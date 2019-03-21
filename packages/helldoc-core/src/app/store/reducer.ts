import { SidebarState, SidebarAction, SET_SIDEBAR_DISPLAY } from "./types";

const initialState: SidebarState = {
  sideBarDisplay: false
};

export function sidebarReducer(
  state = initialState,
  action: SidebarAction
): SidebarState {
  switch (action.type) {
    case SET_SIDEBAR_DISPLAY:
      return {
        sideBarDisplay: action.value
      };
    default:
      return state;
  }
}

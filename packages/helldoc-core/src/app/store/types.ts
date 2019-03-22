export const SET_SIDEBAR_DISPLAY = "SET_SIDEBAR_DISPLAY";

export interface SidebarState {
  sideBarDisplay: boolean;
}

export interface SidebarAction {
  type: typeof SET_SIDEBAR_DISPLAY;
  value: boolean;
}

import { SET_SIDEBAR_DISPLAY } from "./types";

export default {
  sidebarControl(value: boolean) {
    return {
      type: SET_SIDEBAR_DISPLAY,
      value
    };
  }
};

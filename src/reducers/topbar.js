import {
  HIDE_TOPBAR,
  SHOW_TOPBAR,
  HIDE_TOPBAR_BTN,
  SHOW_TOPBAR_BTN,
  UPDATE_TOPBAR_BTN,
  SHOW_TOPBAR_CENTER_TEXT,
  HIDE_TOPBAR_CENTER_TEXT,
  SHOW_TOPBAR_LEFT_TEXT,
  HIDE_TOPBAR_LEFT_TEXT,
  HIDE_BACK_BUTTON,
  SHOW_BACK_BUTTON,
} from "../actions/types";

const initialState = {
  haveTopbar: true,
  topbarBtn: {
    haveTopbarButton: false,
    topbarButtonText: "",
    actionTopbarButton: undefined,
    btnType: "transparent_green",
    topbarButtonIcon: undefined,
    hideBackButton: false,
  },
  topbarCenter: {
    topbarCenterText: "",
  },
  topbarLeft: {
    topbarLeftText: "",
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case HIDE_TOPBAR:
      return {
        ...state,
        haveTopbar: false,
      };
    case SHOW_TOPBAR:
      return {
        ...state,
        haveTopbar: true,
      };
    case HIDE_TOPBAR_BTN:
      return {
        ...state,
        topbarBtn: {
          ...state.topbarBtn,
          ...{
            haveTopbarButton: false,
          },
        },
      };
    case SHOW_TOPBAR_BTN:
      return {
        ...state,
        topbarBtn: {
          ...state.topbarBtn,
          ...{
            haveTopbarButton: true,
          },
        },
      };
    case UPDATE_TOPBAR_BTN:
      return {
        ...state,
        topbarBtn: {
          ...state.topbarBtn,
          ...{
            haveTopbarButton: action.showBtnBool,
            btnType: action.btnType,
            topbarButtonText: action.btnText,
            actionTopbarButton: action.onClick,
            topbarButtonIcon: action.btnIcon,
          },
        },
      };
    case SHOW_TOPBAR_CENTER_TEXT: {
      return {
        ...state,
        topbarCenter: {
          ...state.topbarCenter,
          ...{
            topbarCenterText: action.centerText,
          },
        },
      };
    }
    case HIDE_TOPBAR_CENTER_TEXT: {
      return {
        ...state,
        topbarCenter: {
          ...state.topbarCenter,
          ...{
            topbarCenterText: "",
          },
        },
      };
    }
    case SHOW_TOPBAR_LEFT_TEXT: {
      return {
        ...state,
        topbarLeft: {
          ...state.topbarLeft,
          ...{
            topbarLeftText: action.leftText,
          },
        },
      };
    }
    case HIDE_TOPBAR_LEFT_TEXT: {
      return {
        ...state,
        topbarLeft: {
          ...state.topbarLeft,
          ...{
            topbarLeftText: "",
          },
        },
      };
    }
    case HIDE_BACK_BUTTON: {
      return {
        ...state,
        topbarBtn: {
          ...state.topbarBtn,
          ...{
            hideBackButton: true,
          },
        },
      };
    }
    case SHOW_BACK_BUTTON: {
      return {
        ...state,
        topbarBtn: {
          ...state.topbarBtn,
          ...{
            hideBackButton: false,
          },
        },
      };
    }
    default:
      return state;
  }
};

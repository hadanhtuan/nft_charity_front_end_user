import {
  FETCH_CAMP,
  EDIT_CAMP,
  START_LOADING_CAMPAIGN,
  PICK_CAMP,
  CREATE_CAMP,
  FETCH_CAMP_BY_ID,
} from "../constraint/actionTypes";

const initState = {
  campaigns: [],
  currCampaign: null,
  isLoading: false,
};

export default (state = initState, action) => {
  switch (action.type) {
    case START_LOADING_CAMPAIGN: {
      return { ...state, isLoading: true };
    }
    case FETCH_CAMP:
      return {
        ...state,
        campaigns: action.payload,
        isLoading: false,
      };
    case FETCH_CAMP_BY_ID:
      return {
        ...state,
        currCampaign: action.payload,
        isLoading: false,
      };
    case PICK_CAMP:
      return {
        ...state,
        currentId: action.payload,
      };
    case CREATE_CAMP:
      return {
        ...state,
        campaigns: [...state.campaigns, action.payload.campaign],
        isLoading: false,
      };
    case EDIT_CAMP:
      return {
        ...state,
        campaigns: state.campaigns.map((camp) =>
          camp.id === action.payload.id ? action.payload : camp
        ),
        isLoading: false,
      };

    default:
      return state;
  }
};

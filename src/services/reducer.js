// import * as Actions from './action';
import * as ActionTypes from '../constants/action-types'

const initialState = {
    team_data: {},
    blogPosts: []
};

const Reducer = (state = initialState, action) => {
    switch (action.type) {
      case ActionTypes.SET_TEAM_DATA: {
        return {
          ...state,
          team_data: action.payload,
        }
      }
      case ActionTypes.DATA_LOADED: {
        return Object.assign({}, state, {
          blogPosts: state.blogPosts.concat(action.payload)
        });
      }

      default: {
        return state;
      }
    }
}

export default Reducer;
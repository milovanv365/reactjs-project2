// import * as Actions from './action';
import * as ActionTypes from '../constants/action-types'

const initialState = {
    team_data: {},
    blogs: [],
    blog: {}
};

const Reducer = (state = initialState, action) => {
    switch (action.type) {
      case ActionTypes.SET_TEAM_DATA: {
        return {
          ...state,
          team_data: action.payload,
        }
      }
      case ActionTypes.BLOG_LIST_LOADED: {
        // return Object.assign({}, state, {
        //   blogs: state.blogs.concat(action.payload)
        // });
        return  Object.assign({}, state, {
          blogs: action.payload
        });
      }

      case ActionTypes.BLOG_DETAIL_LOADED: {
        return  Object.assign({}, state, {
          blog: action.payload
        });
      }

      default: {
        return state;
      }
    }
}

export default Reducer;
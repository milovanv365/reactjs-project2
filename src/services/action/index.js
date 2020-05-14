// export * from './teamaction';
// export const SET_TEAM_DATA = '[LISTING] SET_TEAM_DATA';
import * as ActionTypes from '../../constants/action-types'

export function setTeamData(data) {
  return {
    type: ActionTypes.SET_TEAM_DATA,
    payload: data,
  };
}

export function getBlogData() {
  return { type: ActionTypes.BLOG_DATA_REQUESTED };
}

export function deleteBlogData({blogId}) {
  return { type: ActionTypes.BLOG_DATA_DELETED, payload: {blogId} };
}

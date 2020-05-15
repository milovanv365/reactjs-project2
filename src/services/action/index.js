// export * from './teamaction';
// export const SET_TEAM_DATA = '[LISTING] SET_TEAM_DATA';
import * as ActionTypes from '../../constants/action-types'

export function setTeamData(data) {
  return {
    type: ActionTypes.SET_TEAM_DATA,
    payload: data,
  };
}

export function getBlogList() {
  return { type: ActionTypes.BLOG_LIST_REQUESTED };
}

export function getBlog({blogId}) {
  return { type: ActionTypes.BLOG_DETAIL_REQUESTED, payload: {blogId} };
}

export function deleteBlogData({blogId}) {
  return { type: ActionTypes.BLOG_DELETE_REQUESTED, payload: {blogId} };
}

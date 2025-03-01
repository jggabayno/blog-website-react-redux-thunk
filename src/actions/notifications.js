
import makeRequest from '../utilities/api';
import * as actions from '../actionTypes'

const request = makeRequest();

export const loadNotifications = () => async (dispatch) => {

    dispatch({ type: actions.FETCH_NOTIFICATIONS_REQUEST })

    try {

        const response = await request.get('post/comment/notifications/');
        const data = await response.data;

        dispatch({ type: actions.FETCH_NOTIFICATIONS_SUCCESS, payload: data })

    } catch (error) {

        dispatch({ type: actions.FETCH_NOTIFICATIONS_FAILURE, payload: error.message })

    }
}
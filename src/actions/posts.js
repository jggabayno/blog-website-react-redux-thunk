import makeRequest from '../utilities/api';
import * as actions from '../actionTypes'

const request = makeRequest();

export const loadPosts = () => async (dispatch) => {

    dispatch({ type: actions.FETCH_POSTS_REQUEST })

    try {

        const response = await request.get('posts/');
        const data = await response.data;

        dispatch({ type: actions.FETCH_POSTS_SUCCESS, payload: data })

    } catch (error) {

        dispatch({ type: actions.FETCH_POSTS_FAILURE, payload: error.message })

    }
}

export const storePost = (params) => async (dispatch) => {

    dispatch({ type: actions.STORE_POST_REQUEST })

    try {

        const response = await request.post('posts/', params)
        const data = await response.data;

        dispatch({ type: actions.STORE_POST_SUCCESS, payload: data })


    } catch (error) {

        dispatch({ type: actions.STORE_POST_FAILURE, payload: error.message })

    }
}

export const storePostComment = (id, params) => async (dispatch) => {

    dispatch({ type: actions.STORE_POST_COMMENT_REQUEST })

    try {

        const response = await request.post(`posts/${id}/comments`, params)
        const data = await response.data;

        dispatch({ type: actions.STORE_POST_COMMENT_SUCCESS, payload: data })


    } catch (error) {

        dispatch({ type: actions.STORE_POST_COMMENT_FAILURE, payload: error.message })

    }
}

export const updatePost = (id, params) => async (dispatch) => {

    dispatch({ type: actions.UPDATE_POST_REQUEST })

    try {

        const response = await request.update(`posts/${id}/`, params)
        const data = await response.data;

        if (data) {
            dispatch({ type: actions.UPDATE_POST_SUCCESS, payload: { id, ...params } })
        }

    } catch (error) {

        dispatch({ type: actions.UPDATE_POST_FAILURE, payload: error.message })

    }
}

export const destroyPost = (id) => async (dispatch) => {

    dispatch({ type: actions.DESTROY_POST_REQUEST })

    try {

        await request.drop('accesses/' + id)

        dispatch({ type: actions.DESTROY_POST_SUCCESS, payload: id })

    } catch (error) {

        dispatch({ type: actions.DESTROY_POST_FAILURE, payload: error.message })

    }
}
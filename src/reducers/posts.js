import * as actions from '../actionTypes'

const initialState = {
    isLoading: false,
    data: [],
    error: '',
}

export default function posts(state = initialState, action) {
    switch (action.type) {
        case actions.FETCH_POSTS_REQUEST:
            return {
                ...state,
                isLoading: true,
            }
        case actions.FETCH_POSTS_SUCCESS:
            return {
                isLoading: false,
                data: action.payload,
                error: ''
            }
        case actions.FETCH_POSTS_FAILURE:
            return {
                isLoading: false,
                data: [],
                error: action.payload
            }
        case actions.STORE_POST_REQUEST:
            return {
                ...state,
                isLoading: true,
            };
        case actions.STORE_POST_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: [action.payload, ...state.data],
                error: ''
            };
        case actions.STORE_POST_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };
        case actions.STORE_POST_COMMENT_REQUEST:
            return {
                ...state,
                isLoading: true,
            };
        case actions.STORE_POST_COMMENT_SUCCESS:

            const { post_id } = action.payload

            let newPayload = state.data.find(row => +row.id === +post_id)
            newPayload.comments = [...newPayload.comments, action.payload]

            return {
                ...state,
                isLoading: false,
                data: [...state.data.filter(row => +row.id !== +post_id), newPayload],
                error: ''
            };
        case actions.STORE_POST_COMMENT_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };
        case actions.UPDATE_POST_REQUEST:
            return {
                ...state,
                isLoading: true,
            }
        case actions.UPDATE_POST_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: [action.payload, ...state.data.filter(post => post.id !== action.payload.id)],
                error: ''
            }
        case actions.UPDATE_POST_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }
        case actions.DESTROY_POST_REQUEST:
            return {
                ...state,
                isLoading: true,
            };
        case actions.DESTROY_POST_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: state.data.filter((post) => post.id !== action.payload),
                error: ''
            };
        case actions.DESTROY_POST_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };
        default: return state;
    }
}

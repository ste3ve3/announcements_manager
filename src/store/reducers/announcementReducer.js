import { ADD_ANNOUNCEMENT, DELETE_ANNOUNCEMENT, EDIT_ANNOUNCEMENT, GET_ALL_ANNOUNCEMENTS } from 'store/actionTypes';

const initAnnouncementState = {
    announcements: []
};

const announcementReducer = (state = initAnnouncementState, action) => {
    switch (action.type) {
        case GET_ALL_ANNOUNCEMENTS:
            return {
                ...state,
                announcements: [...action.payload.announcements]
            };
        case ADD_ANNOUNCEMENT:
            return {
                ...state,
                announcements: [action.payload.announcement, ...state.announcements]
            };
        case EDIT_ANNOUNCEMENT:
            return {
                ...state,
                announcements: state.announcements.map((announcement) =>
                    announcement._id !== action.payload.announcement._id ? announcement : action.payload.announcement
                )
            };
        case DELETE_ANNOUNCEMENT:
            return {
                ...state,
                announcements: state.announcements.filter((announcement) => announcement._id !== action.payload.id)
            };
        default:
            return state;
    }
};

export default announcementReducer;
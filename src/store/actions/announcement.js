import * as actions from '../actionTypes';

export const getAllAnnouncements = ({ announcements = [] }) => {
    return {
        type: actions.GET_ALL_ANNOUNCEMENTS,
        payload: {
            announcements
        }
    };
};

export const addAnnouncement = (announcement) => ({
    type: actions.ADD_ANNOUNCEMENT,
    payload: {
        announcement
    }
});

export const editAnnouncement = (announcement) => ({
    type: actions.EDIT_ANNOUNCEMENT,
    payload: {
        announcement
    }
});

export const deleteAnnouncement = (id) => ({
    type: actions.DELETE_ANNOUNCEMENT,
    payload: {
        id
    }
});
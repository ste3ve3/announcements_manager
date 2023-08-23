import * as actions from '../actionTypes';

export const addStudent = (student) => ({
    type: actions.ADD_STUDENT,
    payload: {
        student
    }
});

export const getStudents = ({ students = [] }) => {
    return {
        type: actions.GET_ALL_STUDENTS,
        payload: {
            students
        }
    };
};

export const deleteStudent = (id) => ({
    type: actions.DELETE_STUDENT,
    payload: {
        id
    }
});
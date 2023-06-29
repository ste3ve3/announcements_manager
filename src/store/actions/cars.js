import * as actions from '../actionTypes';

export const getAllCars = ({ registeredCars = [] }) => {
    return {
        type: actions.GET_ALL_CARS,
        payload: {
            registeredCars
        }
    };
};

export const editCar = (id) => ({
    type: actions.EDIT_CAR,
    payload: {
        id
    }
});

export const deleteCar = (id) => ({
    type: actions.DELETE_CAR,
    payload: {
        id
    }
});

import { DELETE_CAR, EDIT_CAR, GET_ALL_CARS, CAR_ERROR } from '../actionTypes';

const initCartate = {
    error: null,
    registeredCars: [],
    loading: true
};

const carReducer = (state = initCartate, action) => {
    switch (action.type) {
        case GET_ALL_CARS:
            return {
                ...state,
                error: null,
                loading: false,
                registeredCars: [...action.payload.registeredCars]
            };
        case EDIT_CAR:
            return {
                ...state,
                error: null,
                registeredCars: state.registeredCars.filter((car) => car._id !== action.payload.id)
            };
        case DELETE_CAR:
            return {
                ...state,
                error: null,
                registeredCars: state.registeredCars.filter((car) => car._id !== action.payload.id)
            };
        case CAR_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };
        default:
            return state;
    }
};

export default carReducer;

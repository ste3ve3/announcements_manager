import * as actions from '../actionTypes';

export const getAllCars = ({ auctionCars = [] }) => {
    return {
        type: actions.GET_ALL_AUCTION_CARS,
        payload: {
            auctionCars
        }
    };
};

export const editCar = (car) => ({
    type: actions.EDIT_AUCTION_CAR,
    payload: {
        car
    }
});

export const deleteCar = (id) => ({
    type: actions.DELETE_AUCTION_CAR,
    payload: {
        id
    }
});

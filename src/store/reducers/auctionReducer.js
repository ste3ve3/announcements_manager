import { DELETE_AUCTION_CAR, EDIT_AUCTION_CAR, GET_ALL_AUCTION_CARS, AUCTION_CAR_ERROR } from '../actionTypes';

const initCartate = {
    error: null,
    auctionCars: [],
    loading: true
};

const auctionReducer = (state = initCartate, action) => {
    switch (action.type) {
        case GET_ALL_AUCTION_CARS:
            return {
                ...state,
                error: null,
                loading: false,
                auctionCars: [...action.payload.auctionCars]
            };
        case EDIT_AUCTION_CAR:
            return {
                ...state,
                error: null,
                auctionCars: state.auctionCars.map((car) => (car._id !== action.payload.car._id ? car : action.payload.car))
            };
        case DELETE_AUCTION_CAR:
            return {
                ...state,
                error: null,
                auctionCars: state.auctionCars.filter((car) => car._id !== action.payload.id)
            };
        case AUCTION_CAR_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };
        default:
            return state;
    }
};

export default auctionReducer;

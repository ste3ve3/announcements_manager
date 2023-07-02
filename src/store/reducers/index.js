import { combineReducers } from 'redux';

// reducer import
import customizationReducer from './customizationReducer';
import carReducer from './carReducer';
import auctionReducer from './auctionReducer';
import authReducer from './authReducer';

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
    customization: customizationReducer,
    car: carReducer,
    auction: auctionReducer,
    auth: authReducer,
});

export default reducer;

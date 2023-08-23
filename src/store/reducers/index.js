import { combineReducers } from 'redux';

// reducer import
import customizationReducer from './customizationReducer';
import carReducer from './carReducer';
import auctionReducer from './auctionReducer';
import authReducer from './authReducer';
import studentsReducer from "./studentReducer"
import announcementReducer from './announcementReducer';

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
    customization: customizationReducer,
    car: carReducer,
    auction: auctionReducer,
    auth: authReducer,
    student: studentsReducer,
    announcement: announcementReducer,
});

export default reducer;

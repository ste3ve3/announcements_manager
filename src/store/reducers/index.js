import { combineReducers } from 'redux';

// reducer import
import customizationReducer from './customizationReducer';
import carReducer from './carReducer';
import auctionReducer from './auctionReducer';
import leaderReducer from './leaderReducer';
import blogReducer from './blogReducer';
import eventReducer from './calendarReducer';
import authReducer from './authReducer';
import testimonialReducer from './testimonialReducer';
import fatherReducer from './fatherReducer';
import messageReducer from './messageReducer';
import newsReducer from './newsReducer';
import announcementReducer from './announcementReducer';

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
    customization: customizationReducer,
    car: carReducer,
    auction: auctionReducer,
    leader: leaderReducer,
    blog: blogReducer,
    calendar: eventReducer,
    auth: authReducer,
    testimonial: testimonialReducer,
    father: fatherReducer,
    message: messageReducer,
    news: newsReducer,
    announcement: announcementReducer
});

export default reducer;

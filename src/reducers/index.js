import { combineReducers } from 'redux'
import reducerMainInfo from './reducerMainInfo';
import reducerDate from './reducerDate';
import reducerTime from './reducerTime';
import reducerLink from './reducerLink';

export default combineReducers({
	reducerMainInfo,
	reducerDate,
	reducerTime,
	reducerLink
})
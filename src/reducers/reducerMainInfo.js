import * as types from '../actionType';

const initialState = [];

export default function reducerMainInfo(state = initialState, {type, payload}) {
	switch (type) {
		case types.GET_MAIN_INFO:
			return payload;
		default:
			return state;
	}
}
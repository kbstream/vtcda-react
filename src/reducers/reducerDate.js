import * as types from '../actionType';

const initialState = {};

export default function reducerDate(state = initialState, {type, payload}) {
	switch (type) {
		case types.GET_DATE:
			return payload;
		default:
			return state;
	}
}
import * as types from '../actionType';

const initialState = '';

export default function reducerLink(state = initialState, {type, payload}) {
	switch (type) {
		case types.GET_LINK:
			return payload;
		default:
			return state;
	}
}
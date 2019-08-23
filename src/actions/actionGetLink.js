import * as types from '../actionType';

export const getLink = (value) => ({
	type: types.GET_LINK,
	payload: value
});
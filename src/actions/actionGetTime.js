import * as types from '../actionType';

export const getTime = (value) => ({
	type: types.GET_TIME,
	payload: value
});
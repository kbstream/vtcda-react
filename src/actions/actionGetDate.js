import * as types from '../actionType';

export const getDate = (value) => ({
	type: types.GET_DATE,
	payload: value
});
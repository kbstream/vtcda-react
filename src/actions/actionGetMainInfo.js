import * as types from '../actionType';

export const getMainInfo = (value) => ({
	type: types.GET_MAIN_INFO,
	payload: value
});
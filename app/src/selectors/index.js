import {createSelector} from 'reselect'

export const selectTasks = createSelector(
	(state) => state.tasks,
	tasks => tasks
);
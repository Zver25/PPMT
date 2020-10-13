import {initialState, ITasksState} from "./state";
import {Reducer} from "react";
import {ITasksActions} from "./actions";

export const tasksReducer: Reducer<ITasksState, ITasksActions> = (
    state: ITasksState = initialState,
    action: ITasksActions
) => {
    switch (action.type) {
        case "TASKS_REQUEST_FAIL":
            return {
                ...state,
                isSync: null
            };
        case "TASKS_FETCH_ALL":
            return {
                ...state,
                isSync: 0
            };
        case "TASKS_FETCH_ALL_SUCCESS":
            return {
                ...state,
                isSync: null,
                list: action.list
            };
        case "TASK_UPDATE":
            return {
                ...state,
                isSync: action.task.id ?? null
            };
        case "TASK_UPDATE_SUCCESS":
            return {
                ...state,
                isSync: null,
                list: [
                    ...state.list.filter(item => item.id !== action.task.id),
                    action.task
                ]
            };
        case "TASK_DELETE":
            return {
                ...state,
                isSync: action.id
            };
        case "TASK_DELETE_SUCCESS":
            return {
                ...state,
                isSync: null,
                list: [
                    ...state.list.filter(item => item.id !== action.id)
                ]
            };
        default:
            return state;
    }
}
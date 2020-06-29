import {Action, ActionCreator} from "redux";
import {AxiosResponse} from "axios";
import ITask from "../../models/Task";
import {AppThunkAction, AppThunkDispatch} from "../index";
import {ProjectService} from "../../services/ProjectService";
import {TaskResponse, TasksResponse} from "../../payload/Tasks";
import {TasksService} from "../../services/TasksService";
import ResponsePayload from "../../payload/ResponsePayload";

const TASKS_REQUEST_FAIL = 'TASKS_REQUEST_FAIL';
const TASKS_FETCH_ALL = 'TASKS_FETCH_ALL';
const TASKS_FETCH_ALL_SUCCESS = 'TASKS_FETCH_ALL_SUCCESS';
const TASK_UPDATE = 'TASK_UPDATE';
const TASK_UPDATE_SUCCESS = 'TASK_UPDATE_SUCCESS';
const TASK_DELETE = 'TASK_DELETE';
const TASK_DELETE_SUCCESS = 'TASK_DELETE_SUCCESS';

interface ITaskRequestFailAction extends Action {
    type: typeof TASKS_REQUEST_FAIL;
    error: string;
}

interface ITaskFetchAllAction extends Action {
    type: typeof TASKS_FETCH_ALL;
    projectId: number;
}

interface ITaskFetchAllSuccessAction extends Action {
    type: typeof TASKS_FETCH_ALL_SUCCESS;
    list: Array<ITask>;
}

interface ITaskUpdateAction extends Action {
    type: typeof TASK_UPDATE;
    task: ITask;
}

interface ITaskUpdateSuccessAction extends Action {
    type: typeof TASK_UPDATE_SUCCESS;
    task: ITask;
}

interface ITaskDeleteAction extends Action {
    type: typeof TASK_DELETE;
    id: number;
}

interface ITaskDeleteSuccessAction extends Action {
    type: typeof TASK_DELETE_SUCCESS;
    id: number;
}

export type ITasksActionTypes =
    ITaskRequestFailAction |
    ITaskFetchAllAction |
    ITaskFetchAllSuccessAction |
    ITaskUpdateAction |
    ITaskUpdateSuccessAction |
    ITaskDeleteAction |
    ITaskDeleteSuccessAction;
// Sync actions
const taskRequestFail = (error: string): ITaskRequestFailAction => ({
    type: TASKS_REQUEST_FAIL,
    error
});

const fetchAllTasks = (projectId: number): ITaskFetchAllAction => ({
    type: TASKS_FETCH_ALL,
    projectId
});

const fetchAllSuccess = (list: Array<ITask>): ITaskFetchAllSuccessAction => ({
    type: TASKS_FETCH_ALL_SUCCESS,
    list
});

const updateTask = (task: ITask): ITaskUpdateAction => ({
    type: TASK_UPDATE,
    task
});

const updateTaskSuccess = (task: ITask): ITaskUpdateSuccessAction => ({
    type: TASK_UPDATE_SUCCESS,
    task
});

const deleteTask = (id: number): ITaskDeleteAction => ({
    type: TASK_DELETE,
    id
});

const deleteTaskSuccess = (id: number): ITaskDeleteSuccessAction => ({
    type: TASK_DELETE_SUCCESS,
    id
});
// Async actions
const errorCatcher = (error: string, dispatch: AppThunkDispatch) => {
    console.error(error);
    dispatch(taskRequestFail(error));
}

export const fetchTasksThunkCreator: ActionCreator<AppThunkAction<ITasksActionTypes>> = (projectId: number) =>
    (dispatch: AppThunkDispatch): ITasksActionTypes => {
        ProjectService.fetchAllTasks(projectId)
            .then((response: AxiosResponse<TasksResponse>) => {
                if (response.status >= 200 && response.status < 300 && !response.data.hasError) {
                    if (response.data.hasError) {
                        dispatch(taskRequestFail(response.data.error || ''));
                    }
                    else {
                        dispatch(fetchAllSuccess(response.data.data));
                    }
                }
                else {
                    dispatch(taskRequestFail(response.statusText));
                }
            })
            .catch((error) => errorCatcher(error, dispatch))
        return dispatch(fetchAllTasks(projectId));
    }

export const updateTaskThunkCreator: ActionCreator<AppThunkAction<ITasksActionTypes>> = (task: ITask) =>
    (dispatch: AppThunkDispatch): ITasksActionTypes => {
        TasksService.store(task)
            .then((response: AxiosResponse<TaskResponse>) => {
                if (response.status >= 200 && response.status < 300 && !response.data.hasError) {
                    if (response.data.hasError) {
                        dispatch(taskRequestFail(response.data.error || ''));
                    }
                    else {
                        dispatch(updateTaskSuccess(response.data.data));
                    }
                }
                else {
                    dispatch(taskRequestFail(response.statusText));
                }
            })
            .catch((error) => errorCatcher(error, dispatch))
        return dispatch(updateTask(task));
    }

export const deleteTaskThunkCreator: ActionCreator<AppThunkAction<ITasksActionTypes>> = (id: number) =>
    (dispatch: AppThunkDispatch): ITasksActionTypes => {
        TasksService.delete(id)
            .then((response: AxiosResponse<ResponsePayload<number>>) => {
                if (response.status >= 200 && response.status < 300 && !response.data.hasError) {
                    if (response.data.hasError) {
                        dispatch(taskRequestFail(response.data.error || ''));
                    }
                    else {
                        dispatch(deleteTaskSuccess(response.data.data));
                    }
                }
                else {
                    dispatch(taskRequestFail(response.statusText));
                }
            })
            .catch(error => errorCatcher(error, dispatch))
        return dispatch(deleteTask(id));
    }


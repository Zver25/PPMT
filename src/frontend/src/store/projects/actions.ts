import {Action, Dispatch, ActionCreator} from "redux";
import {ThunkAction} from "redux-thunk";
import axios, {AxiosResponse} from "axios";

import {rootUrl} from "../rootUrl";
import {IProject} from "./state";

const baseUrl = rootUrl + '/projects';

const PROJECTS_REQUEST_FAIL = 'PROJECTS_REQUEST_FAIL';
const PROJECTS_FETCH_ALL = 'PROJECTS_FETCH_ALL';
const PROJECTS_FETCH_ALL_SUCCESS = 'PROJECTS_FETCH_ALL_SUCCESS';
const PROJECT_UPDATE = 'PROJECT_UPDATE';
const PROJECT_UPDATE_SUCCESS = 'PROJECT_UPDATE_SUCCESS';
const PROJECT_DELETE = 'PROJECT_DELETE';
const PROJECT_DELETE_SUCCESS = 'PROJECT_DELETE_SUCCESS';

interface IProjectsRequestFailAction {
    type: typeof PROJECTS_REQUEST_FAIL;
    error: string;
}

interface IProjectsFetchAllAction {
    type: typeof PROJECTS_FETCH_ALL;
}

interface IProjectsFetchAllSuccessAction {
    type: typeof PROJECTS_FETCH_ALL_SUCCESS;
    list: Array<IProject>;
}

interface IProjectUpdateAction {
    type: typeof PROJECT_UPDATE;
    project: IProject;
}

interface IProjectUpdateSuccessAction {
    type: typeof PROJECT_UPDATE_SUCCESS;
    project: IProject;
}

interface IProjectDeleteAction {
    type: typeof PROJECT_DELETE;
    id: number;
}

interface IProjectDeleteSuccessAction {
    type: typeof PROJECT_DELETE_SUCCESS;
    id: number;
}

const projectsRequestFail = (error: string): IProjectsRequestFailAction => ({
    type: PROJECTS_REQUEST_FAIL,
    error
});

const fetchProjectsSuccess = (list: Array<IProject>): IProjectsFetchAllSuccessAction => ({
    type: PROJECTS_FETCH_ALL_SUCCESS,
    list
});

const updateProjectSuccess = (project: IProject): IProjectUpdateSuccessAction => ({
    type: PROJECT_UPDATE_SUCCESS,
    project
});

const deleteProjectSuccess = (id: number): IProjectDeleteSuccessAction => ({
    type: PROJECT_DELETE_SUCCESS,
    id
});

const errorCatcher = (error: string, dispatch: Dispatch<IProjectsActionTypes>): void => {
    console.error(error);
    dispatch(projectsRequestFail(error));
}

export const fetchProjects: ActionCreator<ThunkAction<void, IProjectsActionTypes, undefined, Action>> = () =>
    (dispatch: Dispatch<IProjectsActionTypes>): void => {
        axios.get(baseUrl)
            .then((response: AxiosResponse<Array<IProject>>) => {
                if (response.status >=200 && response.status < 300) {
                    dispatch(fetchProjectsSuccess(response.data));
                }
                else {
                    dispatch(projectsRequestFail(response.statusText));
                }
            })
            .catch((error) => errorCatcher(error, dispatch));
    }

export const updateProject: ActionCreator<ThunkAction<void, IProjectsActionTypes, undefined, Action>> = (project: IProject) =>
    (dispatch: Dispatch<IProjectsActionTypes>): void => {
        let url = baseUrl;
        let request: Promise<AxiosResponse<IProject>>;
        if (project.id && project.id > 0) {
            url += '/' + project.id;
            request = axios.put(url, JSON.stringify(project));
        }
        else {
            request = axios.post(url, JSON.stringify(project));
        }
        request.then((response: AxiosResponse<IProject>) => {
            if (response.status >=200 && response.status < 300) {
                dispatch(updateProjectSuccess(response.data));
            }
            else {
                dispatch(projectsRequestFail(response.statusText));
            }
        })
            .catch((error) => errorCatcher(error, dispatch));
    }

export const deleteProject: ActionCreator<ThunkAction<void, IProjectsActionTypes, undefined, Action>> = (id: number) =>
    (dispatch: Dispatch<IProjectsActionTypes>): void => {
        axios.delete(`${baseUrl}/${id}`)
            .then((response: AxiosResponse<void>) => {
                if (response.status >=200 && response.status < 300) {
                    dispatch(deleteProjectSuccess(id));
                }
                else {
                    dispatch(projectsRequestFail(response.statusText));
                }
            })
            .catch((error) => errorCatcher(error, dispatch));
    }

export type IProjectsActionTypes = IProjectsRequestFailAction |
    IProjectsFetchAllAction |
    IProjectsFetchAllSuccessAction |
    IProjectUpdateAction |
    IProjectUpdateSuccessAction |
    IProjectDeleteAction |
    IProjectDeleteSuccessAction;


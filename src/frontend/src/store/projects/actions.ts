import {Action, ActionCreator} from "redux";
import {AxiosResponse} from "axios";

import {AppThunkAction, AppThunkDispatch} from "../index";
import {ProjectService} from "../../services/ProjectService";
import IProject from "../../models/Project";
import {ProjectResponse, ProjectsResponse} from "../../payload/Projects";

const PROJECTS_REQUEST_FAIL = 'PROJECTS_REQUEST_FAIL';
const PROJECTS_FETCH_ALL = 'PROJECTS_FETCH_ALL';
const PROJECTS_FETCH_ALL_SUCCESS = 'PROJECTS_FETCH_ALL_SUCCESS';
const PROJECT_UPDATE = 'PROJECT_UPDATE';
const PROJECT_UPDATE_SUCCESS = 'PROJECT_UPDATE_SUCCESS';
const PROJECT_DELETE = 'PROJECT_DELETE';
const PROJECT_DELETE_SUCCESS = 'PROJECT_DELETE_SUCCESS';
const PROJECT_SELECT = 'PROJECT_SELECT';

interface IProjectsRequestFailAction extends Action {
    type: typeof PROJECTS_REQUEST_FAIL;
    error: string;
}

interface IProjectsFetchAllAction extends Action {
    type: typeof PROJECTS_FETCH_ALL;
}

interface IProjectsFetchAllSuccessAction extends Action {
    type: typeof PROJECTS_FETCH_ALL_SUCCESS;
    list: Array<IProject>;
}

interface IProjectUpdateAction extends Action {
    type: typeof PROJECT_UPDATE;
    project: IProject;
}

interface IProjectUpdateSuccessAction extends Action {
    type: typeof PROJECT_UPDATE_SUCCESS;
    project: IProject;
}

interface IProjectDeleteAction extends Action {
    type: typeof PROJECT_DELETE;
    id: number;
}

interface IProjectDeleteSuccessAction extends Action {
    type: typeof PROJECT_DELETE_SUCCESS;
    id: number;
}

interface IProjectSelectAction extends Action {
    type: typeof PROJECT_SELECT;
    id: number;
}

const projectsRequestFail = (error: string): IProjectsRequestFailAction => ({
    type: PROJECTS_REQUEST_FAIL,
    error
});

const fetchProjects = ():IProjectsFetchAllAction => ({
    type: PROJECTS_FETCH_ALL
});

const fetchProjectsSuccess = (list: Array<IProject>): IProjectsFetchAllSuccessAction => ({
    type: PROJECTS_FETCH_ALL_SUCCESS,
    list
});

const updateProject = (project: IProject): IProjectUpdateAction => ({
    type: PROJECT_UPDATE,
    project
});

const updateProjectSuccess = (project: IProject): IProjectUpdateSuccessAction => ({
    type: PROJECT_UPDATE_SUCCESS,
    project
});

const deleteProject = (id: number):IProjectDeleteAction => ({
    type: PROJECT_DELETE,
    id
});

const deleteProjectSuccess = (id: number): IProjectDeleteSuccessAction => ({
    type: PROJECT_DELETE_SUCCESS,
    id
});

export const selectProject = (id: number): IProjectSelectAction => ({
    type: PROJECT_SELECT,
    id
});

const errorCatcher = (error: string, dispatch: AppThunkDispatch): void => {
    console.error(error);
    dispatch(projectsRequestFail(error));
}

export const fetchProjectsThunkCreator: ActionCreator<AppThunkAction<IProjectsActionTypes>> = () =>
    (dispatch: AppThunkDispatch): IProjectsActionTypes => {
        ProjectService.fetchAll()
            .then((response: AxiosResponse<ProjectsResponse>) => {
                if (response.status >=200 && response.status < 300) {
                    dispatch(fetchProjectsSuccess(response.data.data));
                }
                else {
                    dispatch(projectsRequestFail(response.statusText));
                }
            })
            .catch((error) => errorCatcher(error, dispatch));
        return dispatch(fetchProjects());
    }

export const updateProjectThunkCreator: ActionCreator<AppThunkAction<IProjectsActionTypes>> = (project: IProject) =>
    (dispatch: AppThunkDispatch): IProjectsActionTypes => {
        ProjectService.store(project)
            .then((response: AxiosResponse<ProjectResponse>) => {
                if (response.status >=200 && response.status < 300) {
                    dispatch(updateProjectSuccess(response.data.data));
                }
                else {
                    dispatch(projectsRequestFail(response.statusText));
                }
            })
            .catch((error) => errorCatcher(error, dispatch));
        return dispatch(updateProject(project));
    }

export const deleteProjectThunkCreator: ActionCreator<AppThunkAction<IProjectsActionTypes>> = (id: number) =>
    (dispatch: AppThunkDispatch): IProjectsActionTypes => {
        ProjectService.delete(id)
            .then((response: AxiosResponse<number>) => {
                if (response.status >= 200 && response.status < 300) {
                    dispatch(deleteProjectSuccess(id));
                }
                else {
                    dispatch(projectsRequestFail(response.statusText));
                }
            })
            .catch((error) => errorCatcher(error, dispatch));
        return dispatch(deleteProject(id));
    }

export type IProjectsActionTypes = IProjectsRequestFailAction |
    IProjectsFetchAllAction |
    IProjectsFetchAllSuccessAction |
    IProjectUpdateAction |
    IProjectUpdateSuccessAction |
    IProjectDeleteAction |
    IProjectDeleteSuccessAction |
    IProjectSelectAction;

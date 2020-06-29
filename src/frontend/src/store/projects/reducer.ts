import {Reducer} from 'redux';

import {IProjectsActionTypes} from "./actions";
import {initialState, IProjectsState} from "./state";
import IProject from "../../models/Project";

export const projectsReducer: Reducer<IProjectsState, IProjectsActionTypes> = (state = initialState, action: IProjectsActionTypes) => {
    switch (action.type) {
        case "PROJECTS_REQUEST_FAIL":
            return {
                ...state,
                isSync: null
            };
        case "PROJECTS_FETCH_ALL":
            return {
                ...state,
                isSync: 0
            };
        case "PROJECTS_FETCH_ALL_SUCCESS":
            return {
                ...state,
                isSync: null,
                list: action.list
            };
        case "PROJECT_UPDATE":
            return {
                ...state,
                isSync: action.project.id ?? null
            };
        case "PROJECT_UPDATE_SUCCESS":
            return {
                ...state,
                isSync: null,
                list: [
                    ...state.list.filter((project: IProject) => project.id !== action.project.id),
                    action.project
                ]
            };
        case "PROJECT_DELETE":
            return {
                ...state,
                isSync: action.id
            };
        case "PROJECT_DELETE_SUCCESS":
            return {
                ...state,
                isSync: null,
                list: [
                    ...state.list.filter((project: IProject) => project.id !== action.id)
                ]
            };
        case "PROJECT_SELECT":
            return {
                ...state,
                selectedProjectId: action.id
            };
        default:
            return state;
    }
}
import IProject from "../../models/Project";

export interface IProjectsState {
    list: Array<IProject>;
    selectedProjectId: number;
    isSync: null | number;
}

export const initialState: IProjectsState = {
    list: [],
    selectedProjectId: 0,
    isSync: null
}

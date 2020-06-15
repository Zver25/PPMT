export interface IProjectsState {
    list: Array<IProject>;
    isSync: null | number;
}

export interface IProject {
    id?: number;
    title: string;
    createdAt?: number;
    completedAt?: number;
}

export const initialState: IProjectsState = {
    list: [],
    isSync: null
}

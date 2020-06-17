export interface IProjectsState {
    list: Array<IProject>;
    selectedProjectId: number;
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
    selectedProjectId: 0,
    isSync: null
}

import ITask from "../../models/Task";

export interface ITasksState {
    list: Array<ITask>;
    isSync: number | null;
    selectedTask: number;
}

export const initialState: ITasksState = {
    list: [],
    isSync: null,
    selectedTask: 0
}
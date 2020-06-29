import ResponsePayload from "./ResponsePayload";
import ITask from "../models/Task";

export interface TaskResponse extends ResponsePayload<ITask> {}

export interface TasksResponse extends ResponsePayload<Array<ITask>> {}

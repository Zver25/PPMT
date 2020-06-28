import ResponsePayload from "./ResponsePayload";
import ITask from "../models/Task";

export interface TaskPayload extends ResponsePayload<ITask> {}

export interface TasksPayload extends ResponsePayload<Array<ITask>> {}

import ResponsePayload from "./ResponsePayload";
import IProject from "../models/Project";

export interface ProjectResponse extends ResponsePayload<IProject> {}

export interface ProjectsResponse extends ResponsePayload<Array<IProject>> {}

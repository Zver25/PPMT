import {BaseModel} from "./BaseModel";

export default interface ITask extends BaseModel {
    id: number;
    title: string;
    description: string;
    projectId: number;
    createdAt?: number;
    completedAt?: number;
}

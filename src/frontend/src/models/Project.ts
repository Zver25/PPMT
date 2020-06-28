import {BaseModel} from "./BaseModel";

export default interface IProject extends BaseModel {
    id: number;
    title: string;
    createdAt?: number;
    completedAt?: number;
}

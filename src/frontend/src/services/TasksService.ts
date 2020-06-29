import {BaseService} from "./BaseService";
import ITask from "../models/Task";
import axios, { AxiosResponse } from "axios";
import {TaskResponse} from "../payload/Tasks";
import ResponsePayload from "../payload/ResponsePayload";

export class TasksService extends BaseService {

    protected static getApiUrl(): string {
        return super.getApiUrl() + '/tasks';
    }

    public static store(task: ITask): Promise<AxiosResponse<TaskResponse>> {
        let url = this.getApiUrl();
        if (task.id > 0) {
            url += '/' + task.id;
            return axios.put(url, JSON.stringify(task));
        }
        return axios.post(url, JSON.stringify(task));
    }

    public static delete(id: number): Promise<AxiosResponse<ResponsePayload<number>>> {
        return axios.delete(this.getApiUrl() + "/" + id);
    }

}

import {BaseService} from "./BaseService";
import IProject from "../models/Project";
import axios, { AxiosResponse } from "axios";

export class ProjectService extends BaseService {


    protected static getApiUrl(): string {
        return super.getApiUrl() + "/projects";
    }

    public static fetchAll(): Promise<AxiosResponse<Array<IProject>>> {
        return axios.get(this.getApiUrl());
    }

    public static store(project: IProject): Promise<AxiosResponse<IProject>> {
        let url = this.getApiUrl();
        if (project.id && project.id > 0) {
            url += '/' + project.id;
            return axios.put(url, JSON.stringify(project));
        }
        return axios.post(url, JSON.stringify(project));
    }

    public static delete(id: number): Promise<AxiosResponse<void>> {
        return axios.delete(this.getApiUrl() + "/" + id);
    }

}
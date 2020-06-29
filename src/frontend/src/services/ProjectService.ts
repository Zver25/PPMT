import {BaseService} from "./BaseService";
import IProject from "../models/Project";
import axios, { AxiosResponse } from "axios";
import {ProjectResponse, ProjectsResponse} from "../payload/Projects";
import {TasksResponse} from "../payload/Tasks";

export class ProjectService extends BaseService {

    protected static getApiUrl(): string {
        return super.getApiUrl() + "/projects";
    }

    public static fetchAll(): Promise<AxiosResponse<ProjectsResponse>> {
        return axios.get(this.getApiUrl());
    }

    public static fetchAllTasks(id: number): Promise<AxiosResponse<TasksResponse>> {
        const url = this.getApiUrl() + "/" + id + "/tasks";
        return axios.get(url)
    }

    public static store(project: IProject): Promise<AxiosResponse<ProjectResponse>> {
        let url = this.getApiUrl();
        if (project.id > 0) {
            url += '/' + project.id;
            return axios.put(url, JSON.stringify(project));
        }
        return axios.post(url, JSON.stringify(project));
    }

    public static delete(id: number): Promise<AxiosResponse<number>> {
        return axios.delete(this.getApiUrl() + "/" + id);
    }

}
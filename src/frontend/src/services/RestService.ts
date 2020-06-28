import axios, { AxiosResponse } from "axios";
import {BaseService} from "./BaseService";
import {BaseModel} from "../models/BaseModel";

export abstract class RestService<T extends BaseModel> extends BaseService {

    protected abstract getFullPath(id: number): string;

    public fetchAll(): Promise<AxiosResponse<Array<T>>> {
        return axios.get(this.getFullPath(0));
    }

    public store(t: T): Promise<AxiosResponse<T>> {
        if (t.id > 0) {
            return axios.put(this.getFullPath(t.id), JSON.stringify(t));
        }
        return axios.post(this.getFullPath(t.id), JSON.stringify(t));
    }

    public delete(id: number): Promise<AxiosResponse<number>> {
        return axios.delete(this.getFullPath(id));
    }

}
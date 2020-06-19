import {BaseService} from "./BaseService";
import axios, { AxiosResponse } from "axios";
import {SuccessAuthenticationResponse} from "../payload/User";

export default class UserService extends BaseService{

    protected static getApiUrl(): string {
        return super.getApiUrl() + "/users";
    }

    public static login(username: string, password: string): Promise<AxiosResponse<SuccessAuthenticationResponse>> {
        return axios.post(this.getApiUrl() + "/login", {username, password});
    }

    public static registration(username: string, fullname: string, password: string, confirmPassword: string): Promise<AxiosResponse<SuccessAuthenticationResponse>> {
        return axios.post(this.getApiUrl() + "/registration", {username, fullname, password, confirmPassword});
    }

}

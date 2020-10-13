import {BaseService} from "./BaseService";
import axios, { AxiosResponse } from "axios";
import {SuccessAuthenticationResponse} from "../payload/User";

export default class UserService extends BaseService{

    private static token: string = '';

    protected static getApiUrl(): string {
        return super.getApiUrl() + "/users";
    }

    public static isAuthenticated(): boolean {
        return UserService.token !== '';
    }

    private static setGlobalTokenMiddleware(response: AxiosResponse<SuccessAuthenticationResponse>): AxiosResponse<SuccessAuthenticationResponse> {
        axios.defaults.headers.common['Authentication'] = response.data.data;
        UserService.token = response.data.data;
        return response;
    }

    private static clearTokenMiddleware(response: AxiosResponse): AxiosResponse {
        delete axios.defaults.headers.common['Authentication'];
        UserService.token = '';
        return response
    }

    public static login(username: string, password: string): Promise<AxiosResponse<SuccessAuthenticationResponse>> {
        return axios.post(this.getApiUrl() + "/login", {username, password})
            .then(this.setGlobalTokenMiddleware);
    }

    public static registration(username: string, fullname: string, password: string, confirmPassword: string): Promise<AxiosResponse<SuccessAuthenticationResponse>> {
        return axios.post(this.getApiUrl() + "/registration", {username, fullname, password, confirmPassword})
            .then(this.setGlobalTokenMiddleware);
    }

    public static logout() {
        return axios.get(this.getApiUrl() + "/logout")
            .then(this.clearTokenMiddleware);
    }

    public static refreshToken() {
        return axios.get(this.getApiUrl() + "/refreshToken")
            .then(this.setGlobalTokenMiddleware);
    }

}

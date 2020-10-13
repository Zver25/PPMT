export interface IUserState {
    token: string;
    isSync: boolean;
}

export const initialState: IUserState = {
    token: '',
    isSync: false
};

import http from "../http-comon-security.ts"
import IAccountData from "../types/Account.tsx";

const signUp = (data: IAccountData) => {
    return http.post<IAccountData>("/api/auth/signup", data);
}

const signIn = (data: IAccountData) => {
    return http.post<IAccountData>("/signin", data);
}

const SecurityService = {
    signUp,
    signIn,
};

export default SecurityService;
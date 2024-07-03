import http from "../http-comon-security.ts"
import IAccountData from "../types/Account.tsx";
import ISignInData from "../types/SignIn.tsx";

// different method with the security backend

const signUp = (data: IAccountData) => {
    return http.post<IAccountData>("/api/auth/signup", data);
}

const signIn = (data: ISignInData) => {
    return http.post<ISignInData>("/api/auth/signin", data);
}

const SecurityService = {
    signUp,
    signIn,
};

export default SecurityService;
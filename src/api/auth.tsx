import instance from "./instance"

interface ILogin {
    email: string,
    password: string
}

interface Iregister {
    name: string,
    email: string,
    password: string,
    // confirmPassword: string,
}

const postLogin = (data: ILogin) => {
    return instance.post(`/auth/login`, data)
}

const postRegister = (data: Iregister) => {
    return instance.post(`/auth/register`, data)
}

export { postLogin, postRegister }

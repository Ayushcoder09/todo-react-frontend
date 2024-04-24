import { apiClient } from "./ApiClient"

export const retrieveHelloWorldBean = () =>
    apiClient.get("/hello-world")


export const retrieveHelloWorldBeanPathVariable = (username, token) =>
    apiClient.get(`/hello-world/path-variable/${username}`)





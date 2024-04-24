import axios from "axios";

export const apiClient = axios.create({
    baseURL: 'http://localhost:5000',
  //  baseURL: 'http://todo-rest-api-env.eba-2b5v7q2p.ap-south-1.elasticbeanstalk.com',

});
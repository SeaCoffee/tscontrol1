
import {baseURL} from "../urls/urls";
import axios, { AxiosInstance } from 'axios';



export const apiRequest: AxiosInstance = axios.create({baseURL})

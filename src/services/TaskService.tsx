import http from "../http-common";
import {ITaskData} from "../types/Task.ts";

const getAll = () => {
    return http.get<Array<ITaskData>>("/clients");
};

const get = (id: any) => {
    return http.get<ITaskData>(`/clients/${id}`);
};

const create = (data: ITaskData) => {
    return http.post<ITaskData>("/clients", JSON.stringify(data));
};

const update = (id: any, data: ITaskData) => {
    return http.put<any>(`/clients/${id}`, data);
};

const remove = (id: any) => {
    return http.delete<any>(`/clients/${id}`);
};

const TaskService = {
    getAll,
    get,
    create,
    update,
    remove,
};

export default TaskService;
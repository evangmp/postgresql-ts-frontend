export type Discipline = "physics" | "mathematics";

export interface ITaskData {
    id?: number;
    name: string;
    discipline: Discipline;
    active: boolean;
    date: string;
}
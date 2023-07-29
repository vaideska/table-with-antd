import { Dayjs } from "dayjs";

export interface FormUserType {
    key?: React.Key
    name: string;
    count: number;
    date: Dayjs
}

export interface UserType {
    key: string;
    name: string;
    date: Dayjs;
    dateString: string;
    count: number;
}
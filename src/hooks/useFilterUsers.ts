import { UserType } from "../types/types";
import _ from 'lodash';

export const useFilterUsers = (data: UserType[], value: string) => {
    if (value.length === 0) {
        return data;
    } else {
        const result = data.filter((user) => {
            return _.includes(
                `${user.name} ${user.dateString} ${String(user.count)}`.toUpperCase(),
                value.toUpperCase()
            );
        });
        return result;
    }
}

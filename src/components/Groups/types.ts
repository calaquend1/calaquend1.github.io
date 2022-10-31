import { Contact } from '../ContactList/types';

export type Group = {
    list: Contact[],
    sum: number,
    name: string,
    date: Date,
    id: number,
    archived: boolean
}
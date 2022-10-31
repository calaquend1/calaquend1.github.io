import { Group } from '../Groups/types';

export type Contact = {
    name: string,
    debt: number,
    phone: string,
    isChecked?: boolean,
    group?: boolean,
    onSelect?: (e: boolean) => void,
    id: number
}

export type PersonProps = {
    person: Contact,
    isChecked?: boolean,
    onSelect: (e: boolean) => void,
    group: boolean
}

export type ListProps = {
    contacts?: Contact[]
}

export type AddPerson = {
    isOpen: Boolean,
    setShowModal: (e: Boolean) => void,
    addPerson: (person: Contact) => void,
    id: number
}

export type ModalInpit = {
    text: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export type CreateGroup = {
    isOpen: Boolean,
    setShowModal: (e: Boolean) => void,
    createGroup: (group: Group) => void,
    list: Contact[],
    id: number
}
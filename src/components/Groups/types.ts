import { Contact } from '../ContactList/types'

export interface Group {
  list: Contact[]
  sum: number
  name: string
  date: Date
  id: number
  archived: boolean
}

export interface CheckedContacts {
  [key: number]: boolean
}

export interface CurrentGroupProps {
  group: Group
  saveGroupChanges: (checkedContacts: {
    [key: number]: boolean
  }) => void
  checkedContacts: CheckedContacts
  setCheckedContacts: (callback: (value: CheckedContacts) => CheckedContacts) => void | ((value: CheckedContacts) => void)
}

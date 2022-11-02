import { CheckedContacts, Group } from '../Groups/types'

export interface Contact {
  name: string
  debt: number
  phone: string
  isChecked?: boolean
  group?: boolean
  onSelect?: (e: boolean) => void
  id: number
}

export interface PersonProps {
  person: Contact
  isChecked?: boolean
  onSelect: (e: boolean) => void
  group: boolean
}

export interface ListProps {
  contacts?: Contact[]
}

export interface AddPerson {
  isOpen: Boolean
  setShowModal: (e: Boolean) => void
  addPerson: (person: Contact) => void,
  contacts: CheckedContacts
}

export interface ModalInpit {
  text: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export interface CreateGroup {
  isOpen: Boolean
  setShowModal: (e: Boolean) => void
  createGroup: (group: Group) => void
  list: Contact[]
  id: number
}

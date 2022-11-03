import React, { useState, useMemo, useContext, useEffect } from 'react'
import { Contact } from './types'
import { Group, CheckedContacts } from '../Groups/types'
import Person from './Person'
import { ContactsContext, GroupsContext } from '../../App'
import { AddPersonModal, CreateGroupModal } from './modals'
import './list.css'

const GetChosenContactsList = (checkedContacts: CheckedContacts, contacts: Contact[]): Contact[] => {
  return contacts.filter((contact: Contact) => checkedContacts[`${contact.name}${contact.phone}`])
}

const List = (): JSX.Element => {
  const { contacts, setContextContacts } = useContext(ContactsContext)
  const { groups, setGroups } = useContext(GroupsContext)
  const [isOpenAddPerson, setIsOpenAddPerson] = useState<Boolean>(false)
  const [isOpenCreateGroup, setIsOpenCreateGroup] = useState<Boolean>(false)
  const [checkedContacts, setCheckedContacts] = useState<CheckedContacts>(contacts
    .reduce((acc, person) => ({ ...acc, [`${person.name}${person.phone}`]: false }), {}))
  const chosenContactsList = useMemo(() => GetChosenContactsList(checkedContacts, contacts), [checkedContacts, contacts])

  useEffect(() => {
    setCheckedContacts(contacts.reduce((acc, person) => ({ ...acc, [`${person.name}${person.phone}`]: false }), {}))
  }, [contacts])

  const handleSelectContact = (id: string, value: boolean): void => {
    setCheckedContacts({ ...checkedContacts, [id]: value })
  }

  const addPerson = (person: Contact): void => {
    setContextContacts([...contacts, { ...person, id: contacts.length + 1 }])
    setIsOpenAddPerson(false)
    resetCheckedContacts()
  }

  const resetCheckedContacts = (): void => setCheckedContacts(contacts.reduce((acc, person) => ({ ...acc, [`${person.name}${person.phone}`]: false }), {}))

  const createGroup = (group: Group): void => {
    setGroups([...groups, { ...group, list: chosenContactsList, date: new Date() }])
    setIsOpenCreateGroup(false)
    resetCheckedContacts()
  }

  return (<div>
        <h2>Contacts</h2>
        {contacts.map(person => Person({
          person,
          isChecked: checkedContacts[`${person.name}${person.phone}`],
          onSelect: (value) => handleSelectContact(`${person.name}${person.phone}`, value),
          group: false
        }))}
        <div className='buttons'>
          <button className="button-save" onClick={() => setIsOpenAddPerson(!isOpenAddPerson)}>Add Contact</button>
          <button disabled={chosenContactsList.length === 0} className="button-save" onClick={() => setIsOpenCreateGroup(!isOpenCreateGroup)}>Create Group</button>
        </div>
        <div className='modals'>
          <AddPersonModal contacts={checkedContacts} addPerson={addPerson} isOpen={isOpenAddPerson} setShowModal={setIsOpenAddPerson} />
          <CreateGroupModal id={groups.length + 1} createGroup={createGroup} list={chosenContactsList} isOpen={isOpenCreateGroup} setShowModal={setIsOpenCreateGroup} />
        </div>
      </div>)
}

export default List

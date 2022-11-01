import React, { useState, useMemo, useContext } from 'react'
import { Contact } from './types'
import { Group } from '../Groups/types'
import Person from './Person'
import { contactsContext, groupsContext } from '../../App'
import { AddPersonModal, CreateGroupModal } from './modals'
import './list.css'

const GetChosenContactsList = (checkedContacts: { [key: string]: boolean }, contacts: Contact[]): Contact[] => {
  return contacts.filter((contact: Contact) => checkedContacts[`${contact.name}${contact.phone}`])
}

const List = (): JSX.Element => {
  const { contacts, setContextContacts } = useContext(contactsContext)
  const { groups, setGroups } = useContext(groupsContext)
  const [isOpenAddPerson, setIsOpenAddPerson] = useState<Boolean>(false)
  const [isOpenCreateGroup, setIsOpenCreateGroup] = useState<Boolean>(false)
  const [checkedContacts, setCheckedContacts] = useState<{ [key: string]: boolean }>(contacts
    .reduce((acc, person) => ({ ...acc, [`${person.name}${person.phone}`]: false }), {}))
  const chosenContactsList = useMemo(() => GetChosenContactsList(checkedContacts, contacts), [checkedContacts, contacts])

  const handleSelectContact = (id: string, value: boolean): void => {
    setCheckedContacts({ ...checkedContacts, [id]: value })
  }

  const addPerson = (person: Contact): void => {
    setContextContacts([...contacts, {...person, id: contacts.length + 1}])
    setIsOpenAddPerson(false)
  }

  const createGroup = (group: Group): void => {
    setGroups([...groups, { ...group, list: chosenContactsList, date: new Date() }])
    setIsOpenCreateGroup(false)
  }
  return (<div>
        <button onClick={() => setIsOpenAddPerson(!isOpenAddPerson)}>добавить контакт</button>
        <AddPersonModal addPerson={addPerson} isOpen={isOpenAddPerson} setShowModal={setIsOpenAddPerson} />
        КОНТАКТЫ
        {contacts.map(person => Person({
          person,
          isChecked: checkedContacts[`${person.name}${person.phone}`],
          onSelect: (value) => handleSelectContact(`${person.name}${person.phone}`, value),
          group: false
        }))}
        <button onClick={() => setIsOpenCreateGroup(!isOpenCreateGroup)}>Создать группу</button>
        <CreateGroupModal id={groups.length + 1} createGroup={createGroup} list={chosenContactsList} isOpen={isOpenCreateGroup} setShowModal={setIsOpenCreateGroup} />
    </div>)
}

// 1. баг починить (когда выбираешь 1 выбираются все в группе) пункт 11
// 2. написать план интерфейса пункт 11
// 3. начать делать красивый интерфейс по плану пункт 11
// 4. подумать мб про оптимизацию пункт 11
// 5. модалка справа "группа создана, контакт добавлен" пункт 11
// 6. написать несколько тестов пункт 1
// 7. проверить все типы пункт 16
// 8. написать readme как запустить пункт 15
// 9. кинуть код к ним пункт 13 (проверить, можно ли открыть статик сайт из ветки gh pages на компе)+ поддерживать у себя и тестить на гитхаб пейджес пункт 14
// это среда

export default List

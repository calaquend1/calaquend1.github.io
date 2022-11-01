import React, { useContext, useState, useEffect } from 'react'
import { Group, CheckedContacts, CurrentGroupProps } from './types'
import { Contact, PersonProps } from '../ContactList/types'
import { groupsContext } from '../../App'
import Person from '../ContactList/Person'
import { sortGroups, isEqualGroups } from './helpers'
import './group.css'

const GroupsComponent = (): JSX.Element => {
  const { groups, setGroups } = useContext(groupsContext)
  const [currentGroup, setCurrentGroup] = useState<Group | null>()

  const enterGroup = (id: number): void => setCurrentGroup(groups.find(group => group.id === id))
  const leaveGroup = (): void => setCurrentGroup(null)
  const [checkedContacts, setCheckedContacts] = useState<CheckedContacts>({})

  useEffect(() => {
    if (currentGroup != null) {
      setCheckedContacts(currentGroup.list.reduce((acc, cur) => ({ ...acc, [cur.id]: cur.isChecked ?? false }), {}))
    }
  }, [currentGroup])

  const saveGroupChanges = (checkedContacts: CheckedContacts): void => {
    if (currentGroup != null) {
      const list = currentGroup.list.map(person => ({ ...person, isChecked: Boolean(checkedContacts[person.id]) }))
      const newGroups = [...groups]
      const newGroup = { ...currentGroup, list, archived: list.length === list.filter(item => item.isChecked).length }
      const newIndex = newGroups.findIndex(group => group.id === newGroup.id)
      newGroups[newIndex] = newGroup
      setGroups(newGroups)
      leaveGroup()
    }
  }

  return <div>
        <div>groups</div>

        {(currentGroup == null) && <ul>
            {groups.sort(sortGroups).map((group) => <li className={group.archived ? 'archived' : ''} key={group.name} onClick={() => enterGroup(group.id)} >{group.name}</li>)}
        </ul>}
        {(currentGroup != null) &&
            <div>
                <button onClick={leaveGroup}>назад</button>
                <div key={currentGroup.name}>{currentGroup.name}{CurrentGroup({ group: currentGroup, saveGroupChanges, checkedContacts, setCheckedContacts })}</div>
            </div>}
    </div>
}

const CurrentGroup = ({ group, saveGroupChanges, checkedContacts, setCheckedContacts }: CurrentGroupProps): JSX.Element => {
  const getPersonProps = (person: Contact): PersonProps => ({
    group: true,
    isChecked: checkedContacts[person.id] || false,
    onSelect: (checked: boolean) => setCheckedContacts(() => ({ ...checkedContacts, [person.id]: checked })),
    person: {
      ...person,
      debt: Math.round(group.sum / group.list.length)
    }
  })
  return <div>
        {group.list.map(contact => Person(getPersonProps(contact)))}
        {!isEqualGroups(group.list.reduce((acc, cur) => ({ ...acc, [cur.id]: cur.isChecked ?? false }), {}), checkedContacts) && <button onClick={() => saveGroupChanges(checkedContacts)}>сохранить изменения</button>}
    </div>
}

export default GroupsComponent

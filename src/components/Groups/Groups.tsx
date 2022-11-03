import React, { useContext, useState, useEffect } from 'react'
import { Group, CheckedContacts } from './types'
import { GroupsContext } from '../../App'
import { sortGroups } from './helpers'
import { CurrentGroup } from './CurrentGroup'
import './group.css'

const GroupsComponent = (): JSX.Element => {
  const { groups, setGroups } = useContext(GroupsContext)
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
    <h2>Groups</h2>

    {(!currentGroup) && <ul>
      {groups.sort(sortGroups).map((group) =>
        <article data-testid={`group-${group.name}`} key={group.name} onClick={() => enterGroup(group.id)} className={`listelement__profile ${group.archived ? 'archived' : ''}`}>
          <span className="listelement__name">Name: {group.name}</span>
          <span className="listelement__value">Number of people: {group.list.length}</span>
          <span className="listelement__value">Debt: {group.sum}</span>
        </article>
      )}
    </ul>}
    {(currentGroup != null) &&
      <><div className="currentGroup"><a onClick={leaveGroup} href="#" className="previous round">&#8249;</a><h3>This is the group {currentGroup.name}</h3></div>
        {CurrentGroup({ group: currentGroup, saveGroupChanges, checkedContacts, setCheckedContacts })}
      </>
    }
  </div>
}

export default GroupsComponent

import React from 'react'
import { CurrentGroupProps } from './types'
import { Contact, PersonProps } from '../ContactList/types'
import Person from '../ContactList/Person'
import { isEqualGroups } from './helpers'
import './group.css'

export const CurrentGroup = ({ group, saveGroupChanges, checkedContacts, setCheckedContacts }: CurrentGroupProps): JSX.Element => {
  const getPersonProps = (person: Contact): PersonProps => ({
    group: true,
    isChecked: checkedContacts[person.id] || false,
    onSelect: (checked: boolean) => setCheckedContacts(() => ({ ...checkedContacts, [person.id]: checked })),
    person: {
      ...person,
      debt: Math.round((group.sum / group.list.length) * 100) / 100
    }
  })
  return <div>
        {group.list.map(contact => Person(getPersonProps(contact)))}
        {<button disabled={isEqualGroups(group.list.reduce((acc, cur) => ({ ...acc, [cur.id]: cur.isChecked ?? false }), {}), checkedContacts)} className="button-save" onClick={() => saveGroupChanges(checkedContacts)}>Save Changes</button>}
    </div>
}

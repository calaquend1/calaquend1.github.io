import React, { useContext, useState } from 'react';
import { Group } from './types';
import { Contact } from '../ContactList/types';
import { groupsContext } from '../../App';
import Person from '../ContactList/Person';
import './group.css';

const GroupsComponent = () => {
    const { groups, setGroups } = useContext(groupsContext);
    const [currentGroup, setCurrentGroup] = useState<Group | null>();

    const enterGroup = (id: number) => setCurrentGroup(groups[id])
    const leaveGroup = () => setCurrentGroup(null);
    const [checkedContacts, setCheckedContacts] = useState<CheckedContacts>(
        currentGroup ? currentGroup.list.reduce((acc, cur) => ({ ...acc, [cur.id]: cur.isChecked }), {}) : {});

    const saveGroupChanges = (checkedContacts: CheckedContacts) => {
        if (currentGroup) {
            const list = currentGroup.list.map(person => ({ ...person, isChecked: Boolean(checkedContacts[person.id]) }));
            const newGroups = [...groups];
            const newGroup = { ...currentGroup, list, archived: list.length === list.filter(item => item.isChecked).length };
            newGroups[currentGroup.id - 1] = newGroup
            setGroups(newGroups);
        }
    }

    return <div>
        <div>groups</div>

        {!currentGroup && <ul>
            {groups.map((group, id) => <li className={group.archived ? 'archived' : ''} key={group.name} onClick={() => enterGroup(id)} >{group.name}</li>)}
        </ul>}
        {currentGroup &&
            <div>
                <button onClick={leaveGroup}>назад</button>
                <div key={currentGroup.name}>{currentGroup.name}{CurrentGroup({ group: currentGroup, saveGroupChanges, checkedContacts, setCheckedContacts })}</div>
            </div>}
    </div>
}

type CheckedContacts = {
    [key: number]: boolean;
}

type CurrentGroupProps = {
    group: Group,
    saveGroupChanges: (checkedContacts: {
        [key: number]: boolean;
    }) => void,
    checkedContacts: CheckedContacts,
    setCheckedContacts: (callback: (value: CheckedContacts) => CheckedContacts) => void | ((value: CheckedContacts) => void)
}

const CurrentGroup = ({ group, saveGroupChanges, checkedContacts, setCheckedContacts }: CurrentGroupProps) => {
    const getPersonProps = (person: Contact) => ({
        group: true,
        isChecked: checkedContacts[person.id] || false,
        onSelect: (checked: boolean) => setCheckedContacts((checkedContacts) => ({ ...checkedContacts, [person.id]: checked })),
        person: {
            ...person,
            debt: Math.round(group.sum / group.list.length)
        }
    })

    return <div>
        {group.list.map(contact => Person(getPersonProps(contact)))}
        <button onClick={() => saveGroupChanges(checkedContacts)}>сохранить изменения</button>
    </div>
}

export default GroupsComponent;
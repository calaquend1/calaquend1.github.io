import React, { useContext, useState, useEffect } from 'react';
import { Group } from './types';
import { Contact } from '../ContactList/types';
import { groupsContext } from '../../App';
import Person from '../ContactList/Person';
import './group.css';

const sortGroups = (a: Group, b: Group) => {
    if ((a.archived && b.archived) || (!a.archived && !b.archived)) {
        return Number(a.date) - Number(b.date) > 0 ? 1 : -1
    }
    return a.archived ? 1 : -1
}

const GroupsComponent = () => {
    const { groups, setGroups } = useContext(groupsContext);
    const [currentGroup, setCurrentGroup] = useState<Group | null>();

    const enterGroup = (id: number) => setCurrentGroup(groups.find(group => group.id === id))
    const leaveGroup = () => setCurrentGroup(null);
    const [checkedContacts, setCheckedContacts] = useState<CheckedContacts>({});

    useEffect(() => {
        if (currentGroup) {
            setCheckedContacts(currentGroup.list.reduce((acc, cur) => ({ ...acc, [cur.id]: cur.isChecked || false }), {}))
        }
    }, [currentGroup]);

    const saveGroupChanges = (checkedContacts: CheckedContacts) => {
        if (currentGroup) {
            const list = currentGroup.list.map(person => ({ ...person, isChecked: Boolean(checkedContacts[person.id]) }));
            const newGroups = [...groups];
            const newGroup = { ...currentGroup, list, archived: list.length === list.filter(item => item.isChecked).length };
            const newIndex = newGroups.findIndex(group => group.id === newGroup.id)
            newGroups[newIndex] = newGroup
            setGroups(newGroups);
            leaveGroup();
        }
    }

    return <div>
        <div>groups</div>

        {!currentGroup && <ul>
            {groups.sort(sortGroups).map((group) => <li className={group.archived ? 'archived' : ''} key={group.name} onClick={() => enterGroup(group.id)} >{group.name}</li>)}
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

const isEqualGroups = (a: CheckedContacts, b: CheckedContacts) => JSON.stringify(a) === JSON.stringify(b)

const CurrentGroup = ({ group, saveGroupChanges, checkedContacts, setCheckedContacts }: CurrentGroupProps) => {
    const getPersonProps = (person: Contact) => ({
        group: true,
        isChecked: checkedContacts[person.id] || false,
        onSelect: (checked: boolean) => setCheckedContacts(() => ({ ...checkedContacts, [person.id]: checked })),
        person: {
            ...person,
            debt: Math.round(group.sum / group.list.length)
        }
    })
    console.log(group, 'here group')
    return <div>
        {group.list.map(contact => Person(getPersonProps(contact)))}
        {!isEqualGroups(group.list.reduce((acc, cur) => ({ ...acc, [cur.id]: cur.isChecked || false }), {}), checkedContacts) && <button onClick={() => saveGroupChanges(checkedContacts)}>сохранить изменения</button>}
    </div>
}

export default GroupsComponent;
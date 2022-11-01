import React, { useState, useMemo, useContext } from 'react';
import { Contact, AddPerson, ModalInpit, CreateGroup } from './types';
import { Group } from '../Groups/types';
import Person from './Person';
import { contactsContext, groupsContext } from '../../App';
import './list.css';

const ModalInput = (props: ModalInpit) => {
    const { text, onChange } = props;
    return <>
        <p>{text}</p>
        <input type="text" onChange={onChange} />
    </>
}

const AddPersonModal = (props: AddPerson) => {
    const { isOpen, setShowModal, addPerson, id } = props;
    const [person, setPerson] = useState({ name: '', phone: '', debt: 0, id: id });
    if (!isOpen) return null;

    return (
        <>
            <div className="modal-backdrop" onClick={() => setShowModal(false)}></div>
            <div className="modal">
                <ModalInput text='введите имя' onChange={(e) => setPerson({ ...person, name: e.target.value })} />
                <ModalInput text='введите телефон' onChange={(e) => setPerson({ ...person, phone: e.target.value })} />
                <ModalInput text='введите сумму долга' onChange={(e) => setPerson({ ...person, debt: Number(e.target.value) })} />
                <button onClick={() => addPerson(person)}>добавьте контакт</button>
                <button onClick={() => setShowModal(false)}>close modal</button>
            </div>
        </>)
}

const GetChosenContactsList = (checkedContacts: { [key: string]: boolean }, contacts: Contact[]) => {
    return contacts.filter((contact: Contact) => checkedContacts[`${contact.name}${contact.phone}`])
}

const List = () => {
    const { contacts, setContextContacts } = useContext(contactsContext);
    const { groups, setGroups } = useContext(groupsContext)
    console.log(contacts, 'cont')
    const [isOpenAddPerson, setIsOpenAddPerson] = useState<Boolean>(false);
    const [isOpenCreateGroup, setIsOpenCreateGroup] = useState<Boolean>(false);
    const [checkedContacts, setCheckedContacts] = useState<{ [key: string]: boolean }>(contacts
        .reduce((acc, person) => ({ ...acc, [`${person.name}${person.phone}`]: false }), {}));
    const chosenContactsList = useMemo(() => GetChosenContactsList(checkedContacts, contacts), [checkedContacts, contacts]);

    const handleSelectContact = (id: string, value: boolean) => {
        setCheckedContacts({ ...checkedContacts, [id]: value })
    }

    const addPerson = (person: Contact) => {
        setContextContacts([...contacts, person])
        setIsOpenAddPerson(false);
    };

    const createGroup = (group: Group) => {
        setGroups([...groups, { ...group, list: chosenContactsList, date: new Date() }]);
        setIsOpenCreateGroup(false);
    }
    return (<div>
        <button onClick={() => setIsOpenAddPerson(!isOpenAddPerson)}>добавить контакт</button>
        <AddPersonModal id={contacts.length + 1} addPerson={addPerson} isOpen={isOpenAddPerson} setShowModal={setIsOpenAddPerson} />
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

const CreateGroupModal = (props: CreateGroup) => {
    const { isOpen, setShowModal, createGroup, id } = props;
    const [group, setGroup] = useState({ list: [], name: '', sum: 0, date: new Date(), id: id, archived: false });
    if (!isOpen) return null;

    return (
        <>
            <div className="modal-backdrop" onClick={() => setShowModal(false)}></div>
            <div className="modal">
                <ModalInput text='введите название группы' onChange={(e) => setGroup({ ...group, name: e.target.value })} />
                <ModalInput text='введите сумму долга' onChange={(e) => setGroup({ ...group, sum: Number(e.target.value) })} />
                <button onClick={() => createGroup(group)}>Добавьте группу</button>
                <button onClick={() => setShowModal(false)}>close modal</button>
            </div>
        </>)
}

// 3. модалка справа "группа создана, контакт добавлен"
// 6. поправить все компоненты + типы
// 7. начать делать красивый интерфейс
// 8. подумать мб про оптимизацию
// 9. пройтись по всем файлам и сделать линт
// это вторник


export default List;

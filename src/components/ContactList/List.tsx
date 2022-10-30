import React, { useState, useMemo } from 'react';
import './list.css';

const defaultContacts = [
    { name: 'Michael', debt: 35, phone: '123' },
    { name: 'John', debt: 37, phone: '124' },
    { name: 'Lily', debt: 42, phone: '125' },
    { name: 'Elsa', debt: 94, phone: '126' },
    { name: 'Jennifer', debt: 25, phone: '127' },
]

type Contact = {
    name: string,
    debt: number,
    phone: string
}

type ListProps = {
    contacts?: Contact[]
}
type AddPerson = {
    isOpen: Boolean,
    setShowModal: (e: Boolean) => void,
    addPerson: (person: Contact) => void;
}

type ModalInpit = {
    text: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const ModalInput = (props: ModalInpit) => {
    const { text, onChange } = props;
    return <>
        <p>{text}</p>
        <input type="text" onChange={onChange} />
    </>
}

const AddPersonModal = (props: AddPerson) => {
    const { isOpen, setShowModal, addPerson } = props;
    const [person, setPerson] = useState({ name: '', phone: '', debt: 0 });
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

type PersonProps = {
    person: Contact,
    isChecked: boolean,
    onSelect: (e: boolean) => void,
    group: boolean
}

const Person = (props: PersonProps) => {
    const { person, isChecked, onSelect, group } = props;

    return <div key={`${person.name}-${person.phone}`}>
        <div >{person.name} - {person.phone}{group ? ` - ${person.debt}` : ''}</div>
        <input value={person.name} checked={isChecked} type="checkbox" onChange={() => onSelect(!isChecked)} />
    </div>
}

const GetChosenContactsList = (checkedContacts: { [key: string]: boolean }, contacts: Contact[]) => {
    return contacts.filter((contact: Contact) => checkedContacts[`${contact.name}${contact.phone}`])
}

const List = (props: ListProps) => {
    const { contacts = defaultContacts } = props;
    const [stateContacts, setContacts] = useState<Contact[]>(contacts);
    const [isOpenAddPerson, setIsOpenAddPerson] = useState<Boolean>(false);
    const [isOpenCreateGroup, setIsOpenCreateGroup] = useState<Boolean>(false);
    const [checkedContacts, setCheckedContacts] = useState<{ [key: string]: boolean }>(stateContacts
        .reduce((acc, person) => ({ ...acc, [`${person.name}${person.phone}`]: false }), {}));
    const [groups, setGroup] = useState<Group[]>([]);
    const chosenContactsList = useMemo(() => GetChosenContactsList(checkedContacts, stateContacts), [checkedContacts, stateContacts]);

    const handleSelectContact = (id: string, value: boolean) => {
        setCheckedContacts({ ...checkedContacts, [id]: value })
    }

    const addPerson = (person: Contact) => {
        setContacts([...stateContacts, person]);
        setIsOpenAddPerson(false);
    };

    const createGroup = (group: Group) => {
        console.log(group, 'group here')
        setGroup([...groups, { ...group, list: chosenContactsList }]);
        setIsOpenCreateGroup(false);
    }
    console.log(groups, 'groups');
    console.log(chosenContactsList, 'list')
    return (<div>
        <button onClick={() => setIsOpenAddPerson(!isOpenAddPerson)}>добавить контакт</button>
        <AddPersonModal addPerson={addPerson} isOpen={isOpenAddPerson} setShowModal={setIsOpenAddPerson} />
        КОНТАКТЫ
        {stateContacts.map(person => Person({
            person,
            isChecked: checkedContacts[`${person.name}${person.phone}`],
            onSelect: (value) => handleSelectContact(`${person.name}${person.phone}`, value),
            group: false
        }))}
        <button onClick={() => setIsOpenCreateGroup(!isOpenCreateGroup)}>Создать группу</button>
        <CreateGroupModal createGroup={createGroup} list={chosenContactsList} isOpen={isOpenCreateGroup} setShowModal={setIsOpenCreateGroup} />
        ГРУППЫ
        <div>{groups.map(group => <div key={group.name}>{group.name}<>{group.list.map(contact => Person({ group: true, person: { ...contact, debt: Math.round(group.sum / group.list.length) }, isChecked: false, onSelect: () => { } }))}</></div>)}</div>
    </div>)
}

type CreateGroup = {
    isOpen: Boolean,
    setShowModal: (e: Boolean) => void,
    createGroup: (group: Group) => void,
    list: Contact[]
}

type Group = {
    list: Contact[],
    sum: number,
    name: string
}

const CreateGroupModal = (props: CreateGroup) => {
    const { isOpen, setShowModal, createGroup } = props;
    const [group, setGroup] = useState({ list: [], name: '', sum: 0 });
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

// модалка справа "группа создана, контакт добавлен"
// таблица с 2 табами контакты + группы
// можно зайти в группу + кнопка назад пункт 7
// отметить человека (он перечеркивается вместе с долгом) пункт 8 (наверно кнопку сохранить подсвечивать)
// архивировать группу как все отдали деньги (еще одно поле у группы) (после кнопки сохранить) зачеркивать и вниз списка переносить - пункт 9
// дата создания группы, еще одно поле + сортировка по дате пункт 10
// это понедельник

export default List;

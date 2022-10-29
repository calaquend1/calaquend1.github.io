import React, { useState } from 'react';

const defaultContacts = [
    { name: 'Michael', age: 35, number: 123 },
    { name: 'John', age: 37, number: 124 },
    { name: 'Lily', age: 42, number: 125 },
    { name: 'Elsa', age: 94, number: 126 },
    { name: 'Jennifer', age: 25, number: 127 },
]

type Contact = {
    name: string,
    age: number,
    number: number
}

type ListProps = {
    contacts?: Contact[];
}

const List = (props: ListProps) => {
    const { contacts = defaultContacts } = props;
    const [stateContacts, setContacts] = useState<Contact[]>(contacts);

    const addPerson = () => {
        const lastPerson = stateContacts[stateContacts.length - 1]
        setContacts([...stateContacts, { name: 'James', age: lastPerson.age + 1, number: Math.round(lastPerson.number % 43) * lastPerson.number }])
    }
    return (<div>
        <button onClick={addPerson}>add</button>
        {stateContacts.map(item => <div>{item.name} - {item.number}</div>)}
    </div>)
}


export default List;

import React, { useState, createContext } from 'react';
import logo from './logo.svg';
import List, { Contact } from './components/ContactList';
import Tabs from './components/Tabs';
import Groups, { Group } from './components/Groups'
import './App.css';

const defaultContacts = [
  { name: 'Michael', debt: 35, phone: '123', id: 1 },
  { name: 'John', debt: 37, phone: '124', id: 2 },
  { name: 'Lily', debt: 42, phone: '125', id: 3 },
  { name: 'Elsa', debt: 94, phone: '126', id: 4 },
  { name: 'Jennifer', debt: 25, phone: '127', id: 5 },
]

const defaultGroups: Group[] = [
  {
    list: [defaultContacts[0], defaultContacts[3], defaultContacts[4]],
    sum: 3000,
    date: new Date(),
    name: 'Test group',
    id: 1,
    archived: false
  }
]

export const contactsContext = createContext({
  contacts: defaultContacts,
  setContextContacts: (e: Contact[]) => { }
});

export type GroupContextType = {
  groups: Group[],
  setGroups: (e: Group[]) => void
}

export const groupsContext = createContext<GroupContextType>({
  groups: defaultGroups,
  setGroups: () => { }
});

function App() {
  const [groups, setGroups] = useState<Group[]>(defaultGroups);
  const [contacts, setContextContacts] = useState(defaultContacts)

  return (
    <contactsContext.Provider value={{ contacts, setContextContacts }}>
      <groupsContext.Provider value={{ groups, setGroups }}>
        <div className="App">
          <Tabs>
            <List />
            <Groups />
          </Tabs>
        </div>
      </groupsContext.Provider>
    </contactsContext.Provider>

  );
}

export default App;

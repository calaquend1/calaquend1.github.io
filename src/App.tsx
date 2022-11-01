import React, { useState, createContext } from 'react';
import List, { Contact } from './components/ContactList';
import Tabs from './components/Tabs';
import Groups, { Group } from './components/Groups'
import './App.css';

type LocalStorageSetKey = 'Groups' | 'Contacts'

function setLocalStorage<T>(key: LocalStorageSetKey, value: T[]) {
  window.localStorage.setItem(key, JSON.stringify(value));
}

function getLocalStorage<T>(key: LocalStorageSetKey): T[] {
  return JSON.parse(window.localStorage.getItem(key) || JSON.stringify([]));
}

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
    date: new Date('Nov 1, 2022'),
    name: 'Test group archived 2 #2',
    id: 3,
    archived: true
  },
  {
    list: [defaultContacts[0], defaultContacts[1], defaultContacts[3], defaultContacts[4]],
    sum: 3000,
    date: new Date('Nov 3, 2022'),
    name: 'Test group #3',
    id: 1,
    archived: true
  },
  {
    list: [defaultContacts[0]],
    sum: 3000,
    date: new Date('Sep 2, 2022'),
    name: 'Test group #0',
    id: 2,
    archived: false
  },
  {
    list: [defaultContacts[0], defaultContacts[3]],
    sum: 3000,
    date: new Date('Nov 2, 2022'),
    name: 'Test group archived #1',
    id: 4,
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
  const [, setGroups] = useState<Group[]>(getLocalStorage('Groups'));
  const [, setContextContacts] = useState<Contact[]>(getLocalStorage('Contacts'))

  return (
    <contactsContext.Provider value={{
      contacts: getLocalStorage('Contacts'), setContextContacts: (contacts: Contact[]) => {
        setContextContacts(contacts);
        setLocalStorage('Contacts', contacts);
      }
    }}>
      <groupsContext.Provider value={{
        groups: getLocalStorage('Groups'), setGroups: (groups: Group[]) => {
          setGroups(groups);
          setLocalStorage('Groups', groups);
        }
      }}>
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

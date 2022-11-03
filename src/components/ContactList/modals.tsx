import React, { useState } from 'react'
import { AddPerson, ModalInpit, CreateGroup, Contact } from './types'
import './list.css'
import '../Groups/group.css'

export const ModalInput = (props: ModalInpit): JSX.Element => {
  const { text, onChange } = props
  return <>
        <p>{text}</p>
        <input type="text" aria-label={text} onChange={onChange} />
    </>
}

export const AddPersonModal = (props: AddPerson): JSX.Element | null => {
  const { isOpen, setShowModal, addPerson, contacts } = props
  const [person, setPerson] = useState({ name: '', phone: '', debt: 0 })
  if (!isOpen) return null
  return (
        <>
            <div className="modal-backdrop" onClick={() => setShowModal(false)}></div>
            <div data-testid="addContact" className="modal">
                <ModalInput text='Name' onChange={(e) => setPerson({ ...person, name: e.target.value })} />
                <ModalInput text='Phone' onChange={(e) => setPerson({ ...person, phone: e.target.value })} />
                <ModalInput text='Debt' onChange={(e) => setPerson({ ...person, debt: Number(e.target.value) })} />
                <div className='buttons'>
                    <button
                        data-testid="addContactButton"
                        disabled={!(!Object.prototype.hasOwnProperty.call(contacts, `${person.name}${person.phone}`) && person.name && person.phone)}
                        className='button-save' onClick={() => {
                          addPerson(person as Contact)
                          setPerson({ name: '', phone: '', debt: 0 })
                        }}
                    >Add Contact</button>
                    <button className='button-save' onClick={() => setShowModal(false)}>Close modal</button>
                </div>
            </div>
        </>)
}

export const CreateGroupModal = (props: CreateGroup): JSX.Element | null => {
  const { isOpen, setShowModal, createGroup, id } = props
  const [group, setGroup] = useState({ list: [], name: '', sum: 0, date: new Date(), id, archived: false })
  if (!isOpen) return null

  return (
        <>
            <div className="modal-backdrop" onClick={() => setShowModal(false)}></div>
            <div className="modal">
                <ModalInput text='Group Name' onChange={(e) => setGroup({ ...group, name: e.target.value })} />
                <ModalInput text='Group Debt' onChange={(e) => setGroup({ ...group, sum: Number(e.target.value) })} />
                <div className='buttons'>
                    <button data-testid="createGroupButton" className='button-save' disabled={!(group.name && group.sum)} onClick={() => createGroup(group)}>Create Group</button>
                    <button className='button-save' onClick={() => setShowModal(false)}>Close modal</button>
                </div>
            </div>
        </>)
}

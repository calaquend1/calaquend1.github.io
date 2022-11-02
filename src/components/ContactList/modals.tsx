import React, { useState } from 'react'
import { AddPerson, ModalInpit, CreateGroup, Contact } from './types'
import './list.css'

export const ModalInput = (props: ModalInpit): JSX.Element => {
  const { text, onChange } = props
  return <>
        <p>{text}</p>
        <input type="text" onChange={onChange} />
    </>
}

export const AddPersonModal = (props: AddPerson): JSX.Element | null => {
  const { isOpen, setShowModal, addPerson } = props
  const [person, setPerson] = useState({ name: '', phone: '', debt: 0 })
  if (!isOpen) return null

  return (
        <>
            <div className="modal-backdrop" onClick={() => setShowModal(false)}></div>
            <div className="modal">
                <ModalInput text='введите имя' onChange={(e) => setPerson({ ...person, name: e.target.value })} />
                <ModalInput text='введите телефон' onChange={(e) => setPerson({ ...person, phone: e.target.value })} />
                <ModalInput text='введите сумму долга' onChange={(e) => setPerson({ ...person, debt: Number(e.target.value) })} />
                <button onClick={() => addPerson(person as Contact)}>добавьте контакт</button>
                <button onClick={() => setShowModal(false)}>close modal</button>
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
                <ModalInput text='введите название группы' onChange={(e) => setGroup({ ...group, name: e.target.value })} />
                <ModalInput text='введите сумму долга' onChange={(e) => setGroup({ ...group, sum: Number(e.target.value) })} />
                <button onClick={() => createGroup(group)}>Добавьте группу</button>
                <button onClick={() => setShowModal(false)}>close modal</button>
            </div>
        </>)
}

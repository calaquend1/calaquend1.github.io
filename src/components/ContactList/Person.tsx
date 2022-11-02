import React from 'react'
import { PersonProps } from './types'
import './list.css'

const Person = (props: PersonProps): JSX.Element => {
  const { person, isChecked, onSelect, group } = props

  const className = `person ${group && isChecked ? 'checked' : ''} ${!group && isChecked ? 'listChecked' : ''}`
  const style = { gridTemplateColumns: group ? '1fr 1fr 1fr' : '1fr 1fr' }
  return <div onClick={() => onSelect(!isChecked)} className={className} key={`${person?.name}-${person?.phone}`}>
    <article className="listelement__profile" style={style}>
      <span className="listelement__name">Name: {person.name}</span>
      <span className="listelement__value">Phone: {person.phone}</span>
      {group && <span className="listelement__value">Debt: {person.debt}</span>}
    </article>
  </div>
}

export default Person

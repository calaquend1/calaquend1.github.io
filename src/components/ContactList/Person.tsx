import { PersonProps } from './types';
import './list.css';

const Person = (props: PersonProps) => {
    const { person, isChecked, onSelect, group } = props;

    return <div key={`${person.name}-${person.phone}`}>
        <div className={group && isChecked ? 'checked' : ''}>{person.name} - {person.phone}{group ? ` - ${person.debt}` : ''}</div>
        <input value={person.name} checked={isChecked} type="checkbox" onChange={() => onSelect(!isChecked)} />
    </div>
}

export default Person
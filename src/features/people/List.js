import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { saveNewPerson, selectPeopleIds } from './peopleSlice';
import ListItem from './ListItem';

export function List() {


  const dispatch = useDispatch()

  const people = useSelector(selectPeopleIds)

  const testPerson = {
    name: 'Mike',
    position: 'DC',
    site: 'MTW',
    department: 'Warehouse',
    shift: 'AM',
  }

  const onAdd = () => {
    dispatch(saveNewPerson(testPerson))
  }

  const renderedListItems = people.map((person) => {
    return <ListItem key={person} id={person} />
  })

  return (
    <div>
      <button onClick={onAdd}>addTest</button>
      <ul>
        {renderedListItems}
      </ul>
    </div>
  )
}
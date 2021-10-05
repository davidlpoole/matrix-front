import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { saveNewPerson, selectPeopleIds } from './peopleSlice';
import ListItem from './ListItem';

export function List() {

  const dispatch = useDispatch()


  const people = useSelector(selectPeopleIds)

  // const testPerson = {
  //   name: 'Mike',
  //   position: 'DC',
  //   site: 'MTW',
  //   department: 'Warehouse',
  //   shift: 'AM',
  // }



  const useField = (type) => {
    const [value, setValue] = useState('')
    const onChange = (event) => {
      setValue(event.target.value)
    }

    return {
      type,
      value,
      onChange
    }
  }

  const AddPersonForm = () => {

    const name = useField('text')
    const site = useField('text')
    const department = useField('text')
    const shift = useField('text')
    const position = useField('text')

    const newPerson = {
      name: name.value,
      site: site.value,
      department: department.value,
      shift: shift.value,
      position: position.value
    }

    const onAdd = (event) => {
      event.preventDefault()
      dispatch(saveNewPerson(newPerson))
    }

    return (
      <div>
        <form onSubmit={onAdd}>
          <div><input {...name} placeholder='name' /></div>
          <div><input {...site} placeholder='site' /></div>
          <div><input {...department} placeholder='department' /></div>
          <div><input {...shift} placeholder='shift' /></div>
          <div><input {...position} placeholder='position' /></div>
          <button type='submit'>addTest</button>
        </form>
      </div>
    )
  }

  const renderedListItems = people.map((person) => {
    return <ListItem key={person} id={person} />
  })

  return (
    <div>
      <div>
        <AddPersonForm />
      </div>
      <ul>
        {renderedListItems}
      </ul>
    </div>
  )
}
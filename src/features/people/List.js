import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { saveNewPerson, selectPeopleIds } from './peopleSlice';
import ListItem from './ListItem';
import { ImportPeople } from './import_people';

export function List() {

  const dispatch = useDispatch()

  const people = useSelector(selectPeopleIds)

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
          <div><input {...name} placeholder='Name' /></div>
          <div><input {...site} placeholder='Site' /></div>
          <div><input {...department} placeholder='Department' /></div>
          <div><input {...shift} placeholder='Shift' /></div>
          <div><input {...position} placeholder='Position' /></div>
          <button type='submit'>Add Person</button>
          <ImportPeople />
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
        <table style={{ "width": "100%" }}>
          <thead style={{ "font-weight": "bold" }}>
            <tr>
              <td>Name</td>
              <td>Site</td>
              <td>Department</td>
              <td>Position</td>
              <td>Shift</td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>
            {renderedListItems}
          </tbody>

        </table>
      </div>
    </div>
  )
}
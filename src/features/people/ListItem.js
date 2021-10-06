import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  removePerson,
  selectPeopleById,
} from './peopleSlice'

// Destructure `props.id`, since we just need the ID value
const ListItem = ({ id }) => {

  const dispatch = useDispatch()

  // Call our `selectTodoById` with the state _and_ the ID value
  const person = useSelector((state) => selectPeopleById(state, id))
  const { name, department, site, position, shift } = person

  // const handleCompletedChanged = () => {
  //   dispatch(todoToggled(todo.id))
  // }

  // const handleColorChanged = (e) => {
  //   const color = e.target.value
  //   dispatch(todoColorSelected(todo.id, color))
  // }

  const onDelete = () => {
    dispatch(removePerson(id))
  }

  // const colorOptions = availableColors.map((c) => (
  //   <option key={c} value={c}>
  //     {capitalize(c)}
  //   </option>
  // ))

  return (
    <tr>
      <td>{name}</td>
      <td>{site}</td>
      <td>{department}</td>
      <td>{position}</td>
      <td>{shift}</td>
      <td>
        <button>view</button>
        <button>edit</button>
        <button>duplicate</button>
        <button onClick={onDelete}>delete</button>
      </td>
    </tr>
  )
}

export default ListItem

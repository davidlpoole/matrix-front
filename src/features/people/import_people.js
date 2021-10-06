import * as data from './people.json';
import { useDispatch } from 'react-redux';
import { saveNewPerson } from './peopleSlice';


export function ImportPeople() {

  const dispatch = useDispatch()

  const onImport = () => {
    data.people.map(newPerson =>
      dispatch(saveNewPerson(newPerson)))
  }

  return (
    <div>
      <button onClick={onImport}>Import</button>
    </div>
  )

}
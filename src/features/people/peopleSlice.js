import {
  createSlice,
  createSelector,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit'
import peopleService from './peopleAPI'

const peopleAdapter = createEntityAdapter()

const initialState = peopleAdapter.getInitialState({
  status: 'idle',
})

// Thunk functions
export const fetchPeople =
  createAsyncThunk('people/fetchPeople',
    async () => {
      const response = await peopleService.getAll()
      return response
    })

export const saveNewPerson =
  createAsyncThunk('people/saveNewPerson',
    async (newPerson) => {
      const response = await peopleService.create(newPerson)
      return response
    }
  )

export const removePerson =
  createAsyncThunk('people/removePerson',
    async (id) => {
      await peopleService.remove(id)
      return id
    }
  )

// Slice
const peopleSlice = createSlice({
  name: 'people',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPeople.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchPeople.fulfilled, (state, action) => {
        peopleAdapter.setAll(state, action.payload)
        state.status = 'idle'
      })
      .addCase(saveNewPerson.fulfilled, peopleAdapter.addOne)
      .addCase(removePerson.fulfilled, peopleAdapter.removeOne)
  },
})

// export const { } = peopleSlice.actions

export default peopleSlice.reducer

export const {
  selectAll: selectPeople,
  selectById: selectPeopleById,
} = peopleAdapter.getSelectors((state) => state.people)



function compare(a, b) {
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  return 0;
}

export const selectPeopleIds = createSelector(
  // First, pass one or more "input selector" functions:
  selectPeople,
  // Then, an "output selector" that receives all the input results as arguments
  // and returns a final result value
  (people) => people.sort(compare).map((people) => people.id)
)


// export const selectFilteredPeople = createSelector(
//   // First input selector: all people
//   selectPeople,
//   // Second input selector: all filter values
//   (state) => state.filters,
//   // Output selector: receives both values
//   (people, filters) => {
//     const { status, colors } = filters
//     const showAllCompletions = status === StatusFilters.All
//     if (showAllCompletions && colors.length === 0) {
//       return people
//     }

//     const completedStatus = status === StatusFilters.Completed
//     // Return either active or completed people based on filter
//     return people.filter((people) => {
//       const statusMatches =
//         showAllCompletions || people.completed === completedStatus
//       const colorMatches = colors.length === 0 || colors.includes(people.color)
//       return statusMatches && colorMatches
//     })
//   }
// )

// export const selectFilteredPeopleIds = createSelector(
//   // Pass our other memoized selector as an input
//   selectFilteredPeople,
//   // And derive data in the output selector
//   (filteredPeople) => filteredPeople.map((people) => people.id)
// )

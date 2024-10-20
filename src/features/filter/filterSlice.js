import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sortedByFeature: false,
  searchBy: '',
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    sorted: (state, action) => {
      state.sortedByFeature = action.payload === 'all' ? false : true;
    },
    searched: (state, action) => {
      state.searchBy = action.payload;
    },
  },
});

export default filterSlice.reducer;
export const { sorted, searched } = filterSlice.actions;

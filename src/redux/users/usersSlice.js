import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  //matchId: '',
  //user1Id: '',
  //user2Id: '',
  user1Info: {},
  user2Info: {},
  matchInfo: {},
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    /*setMatchId: (state, action) => {
      state.matchId = action.payload;
    },
    setUser1Id: (state, action) => {
      state.user1Id = action.payload;
    },
    setUser2Id: (state, action) => {
      state.user2Id = action.payload;
    },*/
    setUser1Info: (state, action) => {
      state.user1Info = action.payload;
    },
    setUser2Info: (state, action) => {
      state.user2Info = action.payload;
    },
    setMatchInfo: (state, action) => {
      state.matchInfo = action.payload;
    },
  },
});
export const {
  setMatchId,
  setUser1Id,
  setUser2Id,
  setUser1Info,
  setUser2Info,
  setMatchInfo,
} = usersSlice.actions;

export default usersSlice.reducer;

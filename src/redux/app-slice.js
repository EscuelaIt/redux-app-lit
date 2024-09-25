import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    feedback: null,
    loading: false,
  },
  reducers: {
    startLoading(state)  {
      state.loading = true;
    },
    stopLoading(state) {
      state.loading = false;
    },
    positiveFeedback(state, action) {
      state.feedback = {
        status: 'success',
        msg: action.payload,
      }
    },
    negativeFeedback(state, action) {
      state.feedback = {
        status: 'error',
        msg: action.payload,
      }
    },
    neutralFeedback(state, action) {
      state.feedback = {
        status: 'neutral',
        msg: action.payload,
      }
    },
  }
})

export const {
  negativeFeedback,
  positiveFeedback,
  neutralFeedback,
  startLoading,
  stopLoading,
} = appSlice.actions;
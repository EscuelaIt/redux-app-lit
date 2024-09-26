import { createSlice } from "@reduxjs/toolkit";
import { axios } from "../lib/axios";
import { negativeFeedback, positiveFeedback } from "./app-slice";

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    loggedIn: false,
    userData: null,
    registerValidationErrors: null,
    token: null,
  },
  reducers: {
    registerUser: (state, action) => {
      state.registerValidationErrors = null;
      state.loggedIn = true;
      state.userData = action.payload;
    },
    logoutUser: (state) => {
      state.loggedIn = false;
      state.userData = null;
    },
    setRegisterValidationErrors: (state, action) => {
      state.registerValidationErrors = action.payload;
    },
    registerToken: (state, action) => {
      state.token = action.payload;
     state.registerValidationErrors = null;
    }
  }
});

const { setRegisterValidationErrors, registerToken } = userSlice.actions;

export const signUp = (userData) => async (dispatch) => {
  try {
    const response = await axios.post('/api/auth/register', userData);
    if(response.status == 200) {
      dispatch(positiveFeedback(response.data.message));
      dispatch(registerToken(response.data.token));
    } else {
      dispatch(negativeFeedback('Respuesta no esperada'));
    }
    console.log(response);
  } catch(error) {
    console.log('error es:', error);
    if(error.status == 400) {
      dispatch(negativeFeedback(error.response.data.message));
      dispatch(setRegisterValidationErrors(error.response.data.errors));
    } else {
      dispatch(negativeFeedback('Registro no disponible'));
    }
  }
} 
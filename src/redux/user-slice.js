import { createSlice } from "@reduxjs/toolkit";
import { getAxios } from "../lib/axios";
import { negativeFeedback, positiveFeedback } from "./app-slice";

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    loggedIn: false,
    userData: null,
    registerValidationErrors: null,
    loginValidationErrors: null,
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
    setLoginValidationErrors: (state, action) => {
      state.loginValidationErrors = action.payload;
    },
    registerToken: (state, action) => {
      state.token = action.payload;
     state.registerValidationErrors = null;
    }
  }
});

const { registerUser, setRegisterValidationErrors, registerToken, setLoginValidationErrors, logoutUser } = userSlice.actions;

export const signUp = (userData) => async (dispatch) => {
  const axios = getAxios();
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

export const signIn = (userData) => async (dispatch) => {
  const axios = getAxios();
  try {
    const response = await axios.post('/api/auth/login', userData);
    if(response.status == 200) {
      dispatch(positiveFeedback(response.data.message));
      dispatch(registerToken(response.data.token));
      dispatch(getUser());
    } else {
      dispatch(negativeFeedback('Respuesta no esperada'));
    }
  } catch(error) {
    if(error.status == 401) {
      dispatch(negativeFeedback(error.response.data.message));
      dispatch(setLoginValidationErrors(error.response.data.errors));
    } else {
      dispatch(negativeFeedback('Login no disponible'));
    }
  }
}

export const getUser = () => async (dispatch, getState) => {
  const state = getState();
  const axios = getAxios(state.user.token);
  try {
    const response = await axios.get('/api/auth/user');
    if(response.status == 200) {
      console.log(response.data.data);
      dispatch(registerUser(response.data.data));
    }
  } catch(error) {
    // no necesito hacer nada...
    console.log(error);
  }
}

export const logout = () => async (dispatch, getState) => {
  const state = getState();
  const axios = getAxios(state.user.token);
  try {
    const response = await axios.get('/api/auth/logout');
    if(response.status == 200) {
      dispatch(logoutUser());
    }
  } catch(error) {
    dispatch(negativeFeedback('No estabas logueado anteriormente o la sesión se ha cerrado'));
    dispatch(logoutUser());
  }
}
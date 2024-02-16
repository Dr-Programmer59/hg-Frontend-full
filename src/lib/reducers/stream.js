import { createReducer } from '@reduxjs/toolkit'
import { createStreanFai, createStreanReq, createStreanSuc } from '../ActionType';

const initialstate = {
    loading: false,
    message: null,
    error: null
}

const reducer = createReducer(
  initialstate,
  (builder) => {
    // login 
    builder.addCase(createStreanReq,(state,payload) => {
        state.loading = true;
    })
    builder.addCase(createStreanSuc,(state,payload) => {
        state.message = payload.message;
        state.loading = false;
    })
    builder.addCase(createStreanFai,(state,payload) => {
        state.loading = false;
        state.error = payload.message
    })

    // clear message and error 
    builder.addCase(ClearMessage,(state,payload) => {
        state.message = null;
    })
    builder.addCase(ClearError,(state,payload) => {
        state.error = null;
    })
  }
)

export default reducer;
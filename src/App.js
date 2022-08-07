
import React, { useReducer, createContext } from 'react';
import Views from "./Views";


export const AuthContext = createContext()

const initialState = {
  isAuthenticated: false,
  token: null,
  nik:null,
  name:null,
  role:null,
}




const reducer = (state, action) => {


  switch (action.type) {
    case "LOGIN":

      return {
     
        ...state,
        isAuthenticated: true,
        token: action.payload.token,
        nik:action.payload.nik,
        name:action.payload.name,
        role:action.payload.role,
        email:action.payload.email,
      }
    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
        nik:null,
        role:null,
      }


    default:
      return state
  }
}



function App() {

  const [state, dispatch] = useReducer(reducer, initialState)

  return (
  
  <AuthContext.Provider value={{state,dispatch }}>
      <Views/>
  </AuthContext.Provider>



  );
}



export default App;

// import { createContext, useState } from "react";
// import Views from "./Views";
// export const UserContext = createContext();

// const App = () => {
//   const [user, setUser] = useState({ loggedIn: false });
//   return (
//     <UserContext.Provider value={{ user, setUser}}>
//         <Views/>
//     </UserContext.Provider>
//   );
// }

// export default App




import React, { useReducer, createContext } from 'react';
import Views from "./Views";


export const AuthContext = createContext()

const initialState = {
  isAuthenticated: false,
  token: null,
  nik:null
}


const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      console.log(action.payload);
      return {
     
        ...state,
        isAuthenticated: true,
        token: action.payload.token,
        nik:action.payload.nik,
        name:action.payload.name,
      }
    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
        nik:null
      }


    default:
      return state
  }
}



function App() {

  const [state, dispatch] = useReducer(reducer, initialState)

  return (
  
  <AuthContext.Provider value={{
    state,
    dispatch }}>
      <Views/>
  </AuthContext.Provider>



  );
}



export default App;
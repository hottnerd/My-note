import { useSelector } from "react-redux"
import Login from "./src/pages/Login"
import Main from "./src/pages/Main"
import Register from "./src/pages/Register"
import Users from "./src/pages/Users"
import { Routes , Route, Navigate  } from "react-router-dom"
import { getUserStatus, selectUser } from "./src/redux/userSlice"



function App() {
  
  const user = useSelector(selectUser);
  const userStatus = useSelector(getUserStatus);
  const loggedIn = (userStatus === "succeeded");
  const failed = (userStatus === "failed");
  
  return (
    <Routes>   
        <Route path="/login" element={loggedIn ? <Navigate to="/"/> : <Login/>}/>
        <Route path="/register" element={loggedIn ? <Navigate to="/"/> : <Register/>}/>         
        <Route path="/users" element={(!failed) ? <Users/> : <Navigate to="/"/>}/>
        <Route path="/" element={loggedIn ? <Main/> : <Navigate to="/login"/>}/>
        <Route path="*" element={<Navigate to="/"/>}/>       
    </Routes>
    

  )
}

export default App

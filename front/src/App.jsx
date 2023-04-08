import { Header, Masseges, Navbar, Regester, User, Logout, Login, Notfound, ProtectedRoutes ,Accounts } from './component/index_exports';
import {Navigate, Route, Routes } from 'react-router-dom';
import Home from './component/Home/Home';
import jwtDecode from 'jwt-decode';
import { useEffect, useState } from 'react';
import axios from 'axios';


function App() {
  
  let [loginData, setloginData] = useState('')

  let [userData, setuserData] = useState([{}]) // email name id
  let [USERData, setUSERData] = useState([{}]) // email name id
  let [allUsers, setallUsers] = useState([{}])

/* const getAllusers=async()=>{
  let {data} = await axios.get("http://localhost:3000/api/v1/auth/allusers")
if(data.message=== "success"){
  let obj=data.users.map((item)=>{
    return {userName:item.userName , email: item.email , id:item._id}
  })
  getUserNames(obj)
  setallUsers(data.users)
}
} */

const getAllusers = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/v1/auth/allusers');
    if (response.data.message === 'success') {
      const users = response.data.users.map((user) => ({
        userName: user.userName,
        email: user.email,
        id: user._id,
      }));
      console.log(users)
      setallUsers(response.data.users);
      setUSERData(users);
    }
  } catch (error) {
    console.error(error);
  }
};

useEffect(() => {
 getAllusers()
  console.log("userdata",USERData)
}, [])

const getUserNames=(obj)=>{
if(obj !== []){
setUSERData(obj)
}
}
  let setUserData = () => {
    let token = localStorage.getItem('token')
    let decoded = jwtDecode(token)
    setloginData(decoded)
/*     console.log( "hellologinData"+loginData.value) 
 */ }


 let logout = () => {
  localStorage.removeItem('token')
  setloginData(null)
  /*   goToLogin(); */
  Navigate('/Login')
}
  useEffect(() => {
    if (localStorage.getItem('token')) {
      setUserData();
    }
  }, [])
  return (
    <>

      <Navbar  loginData={loginData} logout={logout}/>
      <Routes>
          <Route path='Home' element={<Home />}></Route>
        <Route element={<ProtectedRoutes loginData={loginData} />}>
          <Route path='Logout' element={<Logout />}></Route>
        </Route>
        <Route path='/' element={<Header />}></Route>
        <Route path='Login' element={<Login setUserData={setUserData} />}></Route>
        <Route path='Header' element={<Header />}></Route>
        <Route path='Masseges' element={<Masseges userData={USERData} />}></Route>
        <Route path='Regester' element={<Regester />}></Route>
        <Route path='User' element={<User allUser={allUsers}/>}></Route>
        <Route path='Accounts' element={<Accounts />}></Route>
        <Route path='*' element={<Notfound />}></Route>
      </Routes>

    </>
  );
}

export default App;

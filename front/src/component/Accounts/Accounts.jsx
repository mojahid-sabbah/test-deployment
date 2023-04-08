import './Accounts.css'
import axios from 'axios';

import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function Accounts() {

  let [usersList, setusersList] = useState([]);

  let getItemsData = async () => {
    let { data } = await axios.get("http://localhost:3000/api/v1/auth/allusers");
    console.log(data.users)
    setusersList(data.users)
    console.log("users", usersList)
  }


  useEffect(() => {
    getItemsData()

  }, [])

  return (

    <>
      <div className='Header'>
<h1> All users here</h1>
       <p>Just copy the user name and use it in : <a className='aLink' href="/User">Send message</a></p>
        {usersList.map((user, index) => {
          return (

            <div className=' col-md-4 ' key={user.id}>
              <div className='cards'>
                <h4 className='my-4'> Email : {user.email}</h4>
                <p className='my-4'>User Name : {user.userName}</p>

              </div>
            </div>

)
})}




      </div>
    </>
  )
}

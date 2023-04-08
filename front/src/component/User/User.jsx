import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom'
import './User.css'

export default function User({ allUser }) {
  const [success, setSuccess] = useState('')
  const [allUsers, setalluser] = useState([])
  const [userName, setuserName] = useState('')
  const [userData, setuserData] = useState({})
  const [message, setmessage] = useState({ text: '' })

  let [usersList, setusersList] = useState([]);

  let getItemsData = async () => {
    let { data } = await axios.get("https://localhost:3000/api/v1/user/profile");
    /*     setusersList(data.results) */
    console.log(data)
  }
  useEffect(() => {
    if (allUser !== []) {
      setalluser(allUser)
    }
    //getItemsData()
  }, [allUser])

  const onTextChange = (e) => {
    setuserName(e.target.value)
  }
  const onClicked = (e) => {
    e.preventDefault();
    allUser.map((item) => {
      if (item.userName === userName) {
        console.log(item)
        return setuserData(item)
      }
    })
    setuserName('')
  }

  const onTextAreaChange = (e) => {
    setmessage({ [e.target.name]: e.target.value })
  }


  const onSubmit = (e) => {
    e.preventDefault();
    const sendmessages = async (_id) => {
     // console.log("id is ", _id)
      try {
        
        let { data } = await axios.post(`http://localhost:3000/api/v1/message/${_id}`, message);
        if (data.message == "success") {
          console.log("message is : ", data.message)
          setmessage({ text: "" })
        }
      } catch (error) {
        console.log({"catch":error})
      }
    }
    sendmessages(userData._id)
  }


  return (
    <>
      <div>
        <div className="container text-center py-5 my-5 text-center">
          <div className="card py-5 mb-5">
            <Link data-toggle="modal" data-target="#profile">
              <img src="./img/avatar.png" className="avatar " alt='' />
            </Link>
            <form action="">
              <input type="text" onChange={onTextChange} className='formControl' placeholder='find user' />
              <button onClick={onClicked} className="btn btn-outline-success m-3">find</button>
            </form>
            <h1>{userName}</h1>
            <div className="container w-50 m-auto">

              <form onSubmit={onSubmit} action method="post">
                <textarea onChange={onTextAreaChange} className="form-control" name='text' id='' cols={10} rows={9} placeholder="You cannot send a Sarahah to yourself, share your profile with your friends :)" defaultValue={""} value={message.text} />
                <button type='submit' className="btn btn-outline-info mt-3"><i className="far fa-paper-plane" /> Send</button>
              </form>
            </div>
          </div>
          <button data-toggle="modal" data-target="#share" className="btn btn-default-outline share "><i className="fas fa-share-alt" />  Share Profile</button>
          <Link className="btn btn-default-outline share mx-4" to="/Custemer">Custemer List</Link>
        </div>
        {/*  Share profile Modal */}
        <div className="modal fade" id="share" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Share Profile</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <p>host/messages/id</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
        {/* /modal */}
      </div>

    </>
  )
}

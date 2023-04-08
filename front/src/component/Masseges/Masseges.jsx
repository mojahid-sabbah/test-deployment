import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

export default function Masseges({ userData }) {
  const [name, setName] = useState("")
  const [id, setId] = useState("")
  const [token, setToken] = useState("")
  const [messages, setmessages] = useState([])
  const [searchParams, setsearchParams] = useSearchParams()
  let loginEmail = searchParams.get('email');

  /* 
   const getToken = () => {
     let token = localStorage.getItem('token')
     setToken(token)
   }
   const getName = () => {
     if (userData !== []) {
       userData.map((item) => {
         if (item.email === loginEmail) {
           setName(item.userName)
           setId(item.id)
           return item.userName
         }
       })
     }
   }
   useEffect(() => {
     console.log("testuserdata",userData)
     getToken()
     if (userData !== []) {
 
       setName(getName) //
     }
   }, [])
  */
  const getNameFromEmail = (email) => {
    const user = userData.find((item) => item.email === email)
    return user ? user.userName : '';
  }

  // Use the `useEffect` hook to set the name and ID when the component mounts
  useEffect(() => {
    const token = localStorage.getItem('token')
    setToken(token)
    setName(getNameFromEmail(loginEmail))
    setId(userData.find((item) => item.email === loginEmail)?.id || '')
  }, [userData, loginEmail])
   useEffect(() => {
    const mytoken = localStorage.getItem('token');
     if (mytoken) {
      const fetchQuotes = async () => {
        const { data } = await axios.get(`http://localhost:3000/api/v1/message/`, { headers: { "token": `Fadfada__${mytoken}` } })
         if (data.message == "success") {
           setmessages(data.messageList)
        }
      }
      fetchQuotes() //
    }

  }, [])



  const deletMessage = (_id, idx) => {
    let myMessage = [...messages];
    myMessage.splice(idx, 1)
    setmessages(myMessage)
    delMessage(_id)
  }
  const delMessage = async (id) => {
    let { data } = await axios.delete(`http://localhost:3000/api/v1/message/${id}`,
      {
        headers: { "token": `Fadfada__${token}` },
        params: `Fadfada__${token}`
      })
  }

  return (
    <>
      <div>
        <div className="container text-center py-5 my-5 text-center">
          <div className="card pt-5">
            <a href data-toggle="modal" data-target="#profile">
              <img src="./img/avatar.png" className="avatar " alt />
            </a>
            <h3 className="py-2">{userData.userName}</h3>
            <button data-toggle="modal" data-target="#share" className="btn btn-default-outline share "><i className="fas fa-share-alt" />  Share Profile</button>
          </div>
        </div>
        {/* profile photo Modal */}
        <div className="modal fade" id="profile" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Change photo</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="container">
                  <form action method="post">
                    <label htmlFor className="text-muted">The file size of the photo should not exceed 7 MB</label>
                    <input className="form-control" type="file" name="photo" id />
                  </form>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-outline-info">Upload</button>
                <button type="button" className="btn btn-outline-danger">Remove Photo</button>
              </div>
            </div>
          </div>
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
        {/* =================messages=================== */}
        <div className="container text-center my-5 text-center">
          <div className="row">
            <div className="col-md-12">
              <div className="card py-5">
                {messages && messages.length > 0 ? (
                  messages.map((message) => (
                    <div key={message._id} className="d-flex">
                      <p className="m-auto">{message.text}</p>
                      <button className="btn btn-danger" onClick={() => deletMessage(message._id)}>
                        Delete
                      </button>
                    </div>
                  ))
                ) : (
                  <p>You don't have any messages.</p>
                )}



              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

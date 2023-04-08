import React from 'react'
import { Link } from 'react-router-dom';

export default function Header() {
  return (
<>
<div className="container text-center my-5">
  <h4>Sarahah allows you to receive constructive feedback from your friends and co-workers</h4>
  <div className="buttons d-flex justify-content-center align-items-center  flex-column">
    <Link to='/Login' className="btn btn-default-outline my-4"><i className="fas fa-user" /> Login</Link>
    <Link to='/Register' className="btn btn-default-outline"><i className="far fa-edit" /> Register</Link>
  </div>
</div>

</>
  )
}

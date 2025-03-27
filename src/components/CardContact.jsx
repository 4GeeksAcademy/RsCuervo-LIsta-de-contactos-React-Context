import React from 'react'
import { Link } from 'react-router-dom'
import Contact from '../pages/Contact'
const CardContact = () => {
  return (

    <div className="container">
      <Link to="/add-contact">
        <div className="d-md-flex justify-content-md-end">
          <button className="btn btn-success" type="button">Add a new Contact</button>
        </div>
      </Link>
      <Contact />
    </div>
  )
}

export default CardContact
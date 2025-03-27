import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useGlobalReducer from '../hooks/useGlobalReducer';

const AddContact = () => {
  const { store, dispatch } = useGlobalReducer();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();
  

  const handleAddContact = (event) => {
    event.preventDefault();
    if (!name || !phone || !email || !address) {
      alert("Requerido completar todos los campos.");
      return;
    }
    let data= { name: name, phone: phone, email: email, address: address };

    fetch("https://playground.4geeks.com/contact/agendas/RsCuervo/contacts", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(data => {
        dispatch({ type: 'add_contact', payload: data });
        console.log(store.contacts)
        navigate('/');
      })
      .catch(error => console.error('Error al agregar contacto:', error));
  };

  


  return (
    <div className="container">
      <h1 className="text-center">Add a new Contact</h1>
      <form className="container">
        <div className="mb-3">
          <label htmlFor="formGroupExampleInput1" className="form-label">Full Name</label>
          <input type="text"
            value={name}
            className="form-control"
            id="formGroupExampleInput1"
            placeholder="Full name"
            onChange={(e) =>
              setName(e.target.value)}
          
          />
        </div>
        <div className="mb-3">
          <label htmlFor="formGroupExampleInput2" className="form-label">Email</label>
          <input type="text"
            value={email}
            className="form-control"
            id="formGroupExampleInput2"
            placeholder="Email"
            onChange={(e) =>
              setEmail(e.target.value)}
         
          />
        </div>
        <div className="mb-3">
          <label htmlFor="formGroupExampleInput3" className="form-label">Phone</label>
          <input type="text"
            value={phone}
            className="form-control"
            id="formGroupExampleInput3"
            placeholder="Phone"
            onChange={(e) =>
              setPhone(e.target.value)}
         
          />
        </div>
        <div className="mb-3">
          <label htmlFor="formGroupExampleInput4" className="form-label">Address</label>
          <input type="text"
            value={address}
            className="form-control"
            id="formGroupExampleInput4"
            placeholder="Address"
            onChange={(e) =>
              setAddress(e.target.value)}
          
          />
        </div>
        <div className="mb-3 d-grid gap-2">
          <button type="submit" className="btn btn-primary" onClick={handleAddContact}>
            Save
          </button>
        </div>
      </form>
      <Link to="/">or get back to Contacts</Link>
    </div>

  )
}

export default AddContact
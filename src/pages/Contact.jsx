import React from 'react'
import { useEffect } from 'react'
import useGlobalReducer from '../hooks/useGlobalReducer';
import { Link, Navigate } from 'react-router-dom';



const Contact = () => {
  const { store, dispatch } = useGlobalReducer()
  const { contacts } = store;

  const eliminarContacto = (id) => {
    fetch(`https://playground.4geeks.com/contact/agendas/RsCuervo/contacts/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {

          dispatch({ type: "delete_contact", payload: id });
          console.log(`Contacto con ID ${id} eliminado`);
        } else {
          console.error("Error al eliminar contacto");
        }
        Navigate('/');
      })
      .catch((error) => console.error("Error en la solicitud:", error));
  };




  useEffect(() => {
    fetch("https://playground.4geeks.com/contact/agendas/RsCuervo/contacts")
      .then(response => response.json())
      .then(data => {
        console.log(data.contacts)
        dispatch({ type: "set_contacts", payload: data.contacts });
      })
      .catch(error => console.error("Error al obtener contactos:", error));
  }, []);



  return (
    <div className="d-flex flex-column align-items-center">
      {contacts.map((contact, index) => (
        <div className="card w-75 mb-3 position-relative p-3" key={index}>

          <div className="position-absolute top-0 end-0">
            <Link to={"/edit-contact/" + contact.id} className="btn btn-link p-0 me-2">
              <i className="fa-solid fa-pencil"></i>
            </Link>
            <button type="button" className="btn btn-link p-0" data-bs-toggle="modal" data-bs-target={"#delete-contact-" + contact.id}>
              <i className="fa fa-trash fa-lg"></i>
            </button>
          </div>


          <div className="d-flex align-items-center">

            <div className="me-3">
              <img
                src="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                className="rounded-circle"
                alt="Contacto"
                style={{ width: "8rem", height: "8rem" }}
              />
            </div>


            <div>
              <h5 className="card-title mb-1">{contact.name}</h5>
              <p className="card-text mb-1">
                <i className="fa-solid fa-location-dot"></i> {contact.address}
              </p>
              <p className="card-text mb-1">
                <i className="fa-solid fa-phone"></i> {contact.phone}
              </p>
              <p className="card-text mb-1">
                <i className="fa-solid fa-envelope"></i> {contact.email}
              </p>
            </div>
          </div>


          <div className="modal fade" id={"delete-contact-" + contact.id} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">Are you sure?</h1>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  If you delete this thing, the entire universe will go down!
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-primary" data-bs-dismiss="modal">Oh no!</button>
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => eliminarContacto(contact.id)}>
                    Yes baby!
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};


export default Contact

import { useState, useEffect } from "react";
import ContactList from "./ContactList";
import ContactForm from "./ContactForm"
import "./App.css";

function App() {
  const [contacts, setContacts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentContact, setCurrentContact] = useState({})

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    const response = await fetch("http://127.0.0.1:5000/contacts");
    const data = await response.json();
    setContacts(data.contacts);
  };

  const closeModal = () => {
    setIsModalOpen(false)
    setCurrentContact({})
  }

  const openCreateModal = () => {
    if (!isModalOpen) {
      setIsModalOpen(true)
    }
  }

  const openEditModal = (contact) => {
    if (isModalOpen) {
      return
    } else {
      setCurrentContact(contact)
      setIsModalOpen(true)
    }
  }

  const onUpdate = () => {
    closeModal()
    fetchContacts()

  }
  

  return (
    <>
      <div id="page-content">
        <ContactList contacts={contacts} updateContact={openEditModal} updateCallback={onUpdate}/>
        <button id="bottom-section" onClick={openCreateModal}>Create New Credential</button>
        { isModalOpen && <div className ="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <ContactForm existingContact={currentContact}/>
          </div>
        </div>

        }
      </div>
      
    </>
  );
}

export default App;

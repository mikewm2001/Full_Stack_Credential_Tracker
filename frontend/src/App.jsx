import { useState, useEffect } from "react";
import CredentialList from "./CredentialList";
import CredentialForm from "./CredentialForm"
import "./App.css";

function App() {
  const [credentials, setCredentials] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentCredential, setCurrentCredential] = useState({})

  useEffect(() => {
    fetchCredentials();
  }, []);

  const fetchCredentials = async () => {
    const response = await fetch("http://127.0.0.1:5000/credentials");
    const data = await response.json();
    setCredentials(data.credentials);
  };

  const closeModal = () => {
    setIsModalOpen(false)
    setCurrentCredential({})
  }

  const openCreateModal = () => {
    if (!isModalOpen) {
      setIsModalOpen(true)
    }
  }

  const openEditModal = (credential) => {
    if (isModalOpen) {
      return
    } else {
      setCurrentCredential(credential)
      setIsModalOpen(true)
    }
  }

  const onUpdate = () => {
    closeModal()
    fetchCredentials()

  }
  

  return (
    <>
      <div id="page-content">
        <CredentialList credentials={credentials} updateCredential={openEditModal} updateCallback={onUpdate}/>
        <button id="bottom-section" onClick={openCreateModal}>Create New Credential</button>
        { isModalOpen && <div className ="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <CredentialForm existingCredential={currentCredential}/>
          </div>
        </div>

        }
      </div>
      
    </>
  );
}

export default App;

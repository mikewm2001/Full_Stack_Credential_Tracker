import React from "react"

const ContactList = ({contacts, updateContact, updateCallback}) => {
    const onDelete = async (id) => {
        try {
            const options = {
                method: "DELETE"
            }
            const response = await fetch(`http://127.0.0.1:5000/delete_contact/${id}`, options)
            if (response.status === 2) {
                updateCallback()
            } else {
                console.error("Failed to delete")
            }
        }
        catch (error) {
            alert(error)
        }
    }

    const onShow = async () => {
        try {
            var showAllButton = document.getElementById("show-button");
            var passwordElements = document.querySelectorAll('[id="password"]');

            if (showAllButton.textContent === 'Show All') {
                passwordElements.forEach(
                    function(element) {
                        element.style.visibility = 'visible';
                    }
                );
                showAllButton.textContent = 'Hide All';
            }
            else {
                passwordElements.forEach(
                    function(element) {
                        element.style.visibility = 'hidden';
                    }
                );
                showAllButton.textContent = 'Show All';
            }
            

            
            


        } catch (error) {
            console.error("An error occurred:", error);
        }
    };

    return <div id="page-content">
                <div>
                <h2>Credentials</h2>
                <button id="show-button" onClick={() => onShow()}>Show All</button>
                <table>
                    <thead>
                        <tr>
                            <th>Website Name</th>
                            <th>User Name</th>
                            <th>Password</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contacts.map((contact) => (
                            <tr key = {contact.id}>
                                <td>{contact.firstName}</td>
                                <td>{contact.lastName}</td>
                                <td><span id="password">{contact.email}</span></td>
                                <td>
                                    <button onClick={() => updateContact(contact)}>Update</button>
                                    <button onClick={() => onDelete(contact.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                </div>
            </div>
        
    

}

export default ContactList
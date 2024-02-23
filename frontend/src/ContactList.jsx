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

    // const onHide = async () => {
    //     try {
    //         document.getElementById('password').style.visibility = 'hidden';

    //     } catch (error) {
    //         console.error("An error occurred:", error);
    //     }
    // };

    return <div id="page-content">
                <div>
                <h2>Credentials</h2>
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
                                    <td id="password">{contact.email}</td>
                                    <td>
                                        <button onClick={() => updateContact(contact)}>Update</button>
                                        <button onClick={() => onDelete(contact.id)}>Delete</button>
                                        {/* <button onClick={() => onHide()}>Hide</button> */}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        
    

}

export default ContactList
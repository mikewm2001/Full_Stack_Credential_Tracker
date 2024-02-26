import { useState } from "react";

const CredentialForm = ({ existingCredential = {}, updateCallback}) => {
  const [webName, setWebName] = useState(existingCredential.webName || "");
  const [userName, setUserName] = useState(existingCredential.userName || "");
  const [password, setPassword] = useState(existingCredential.password || "");

  const updating = Object.entries(existingCredential).length !== 0

  const onSubmit = async (e) => {
    e.preventDefault()

    const data = {
        webName,
        userName,
        password
    }

    const url = "http://127.0.0.1:5000/" + (updating ? `update_credential/${existingCredential.id}` : "create_credential")
    const options = {
        method: updating ? "PATCH" : "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }
    const response = await fetch(url, options)
    if (response.status !== 201 && response.status !== 200) {
        const data = await response.json()
        alert(data.message)
    } else {
        // successful
        updateCallback()
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <div>
        <label htmlFor="webName">Website Name:</label>
        <input
          type="text"
          id="webName"
          value={webName}
          onChange={(e) => setWebName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="userName">User Name:</label>
        <input
          type="text"
          id="userName"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="text"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type = "submit">{updating ? "Update" : "Create"}</button>
    </form>
  );
};

export default CredentialForm
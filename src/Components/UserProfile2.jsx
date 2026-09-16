import React, { useEffect, useState } from "react";

function UserProfile2() {
  const [userId, setUserId] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const loadUser = async (id) => {
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(
        `https://fakestoreapi.com/users/${id}`
      );

      if (!response.ok) {
        throw new Error("Failed to load user");
      }

      const user = await response.json();

      setName(`${user.name.firstname} ${user.name.lastname}`);
      setEmail(user.email);
      setUsername(user.username);
      setPhone(user.phone);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setMessage("Could not load user.");
    }
  };

  useEffect(() => {
    loadUser(userId);
  }, [userId]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setMessage("");

    if (name === "name") {
      setName(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "username") {
      setUsername(value);
    } else if (name === "phone") {
      setPhone(value);
    }
  };

  const handleUserIdChange = (event) => {
    setUserId(Number(event.target.value));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const [firstname, ...rest] = name.trim().split(" ");

    const updatedUser = {
      email,
      username,
      phone,

      name: {
        firstname: firstname || "",
        lastname: rest.join(" "),
      },
    };

    try {
      const response = await fetch(
        `https://fakestoreapi.com/users/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedUser),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update user");
      }

      const data = await response.json();

      console.log("Updated user:", data);

      setMessage("Profile updated successfully.");
    } catch (error) {
      setMessage("Could not update profile.");
    }
  };

  return (
    <div>
      <h1>User Profile</h1>

      <label>
        User ID:
        <select
          value={userId}
          onChange={handleUserIdChange}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((id) => (
            <option key={id} value={id}>
              {id}
            </option>
          ))}
        </select>
      </label>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={name}
                onChange={handleChange}
              />
            </label>
          </div>

          <div>
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={email}
                onChange={handleChange}
              />
            </label>
          </div>

          <div>
            <label>
              Username:
              <input
                type="text"
                name="username"
                value={username}
                onChange={handleChange}
              />
            </label>
          </div>

          <div>
            <label>
              Phone:
              <input
                type="text"
                name="phone"
                value={phone}
                onChange={handleChange}
              />
            </label>
          </div>

          <button type="submit">
            Update Profile
          </button>
        </form>
      )}

      {message && <p>{message}</p>}
    </div>
  );
}

export default UserProfile2;
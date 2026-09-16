import React, { Component } from "react";

class UserProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: 1,
      name: "",
      email: "",
      username: "",
      phone: "",
      loading: true,
      message: "",
    };
  }

  componentDidMount() {
    this.loadUser();
  }

  loadUser = async () => {
    const { userId } = this.state;

    this.setState({
      loading: true,
      message: "",
    });

    try {
      const response = await fetch(
        `https://fakestoreapi.com/users/${userId}`
      );

      if (!response.ok) {
        throw new Error("Failed to load user");
      }

      const user = await response.json();

      this.setState({
        name: `${user.name.firstname} ${user.name.lastname}`,
        email: user.email,
        username: user.username,
        phone: user.phone,
        loading: false,
      });
    } catch (error) {
      this.setState({
        loading: false,
        message: "Could not load user.",
      });
    }
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    // reset the message when the user starts typing
    this.setState({
      message: "",
    });

    this.setState({
      [name]: value,
    });
  };

  handleUserIdChange = (event) => {
    this.setState(
      {
        userId: Number(event.target.value),
      },
      this.loadUser
    );
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    const {
      userId,
      name,
      email,
      username,
      phone,
    } = this.state;

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

      this.setState({
        message: "Profile updated successfully.",
      });
    } catch (error) {
      this.setState({
        message: "Could not update profile.",
      });
    }
  };

  render() {
    const {
      userId,
      name,
      email,
      username,
      phone,
      loading,
      message,
    } = this.state;

    return (
      <div>
        <h1>User Profile</h1>

        <label>
          User ID:
          <select
            value={userId}
            onChange={this.handleUserIdChange}
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
          <form onSubmit={this.handleSubmit}>
            <div>
              <label>
                Name:
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={this.handleChange}
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
                  onChange={this.handleChange}
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
                  onChange={this.handleChange}
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
                  onChange={this.handleChange}
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
}

export default UserProfile;
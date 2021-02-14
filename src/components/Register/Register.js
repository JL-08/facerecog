import React from "react";

class Signin extends React.Component {
  constructor() {
    super();
    this.state = {
      registerName: "",
      registerEmail: "",
      registerPassword: "",
    };
  }

  onNameChange = (event) => {
    this.setState({ registerName: event.target.value });
  };
  onEmailChange = (event) => {
    this.setState({ registerEmail: event.target.value });
  };

  onPassChange = (event) => {
    this.setState({ registerPassword: event.target.value });
  };

  onSubmitRegister = (event) => {
    event.preventDefault();
    fetch("http://localhost:3000/register", {
      method: "post",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        name: this.state.registerName,
        email: this.state.registerEmail,
        password: this.state.registerPassword,
      }),
    })
      .then((response) => response.json())
      .then((user) => {
        if (user.id) {
          this.props.onRouteChange("signin");
        }
      });
  };

  render() {
    const { onRouteChange } = this.props;
    return (
      <div className="flex flex-col items-center">
        <div className="border border-black w-1/4 p-5 flex flex-col items-center shadow-md font-bold">
          <legend className="text-center text-4xl">Register</legend>
          <div className="grid gap-5 mt-5 w-5/6">
            <div className="flex flex-col">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                className="bg-transparent border border-black p-1"
                onChange={this.onNameChange}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="email-add">Email</label>
              <input
                type="email"
                name="email-add"
                className="bg-transparent border border-black p-1"
                onChange={this.onEmailChange}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="email-add">Password</label>
              <input
                type="password"
                name="password"
                className="bg-transparent border border-black p-1"
                onChange={this.onPassChange}
              />
            </div>
            <div className="flex justify-center">
              <input
                onClick={this.onSubmitRegister}
                type="submit"
                value="Register"
                className="bg-transparent border border-black p-1"
              />
            </div>
            <div className="text-center">
              <p
                onClick={() => onRouteChange("signin")}
                className="underline cursor-pointer hover:text-gray-700"
              >
                Sign in
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Signin;

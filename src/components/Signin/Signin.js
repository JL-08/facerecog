import React from "react";

class Signin extends React.Component {
  constructor() {
    super();
    this.state = {
      signInEmail: "",
      signInPassword: "",
    };
  }

  onEmailChange = (event) => {
    this.setState({ signInEmail: event.target.value });
  };

  onPassChange = (event) => {
    this.setState({ signInPassword: event.target.value });
  };

  onSubmitSignIn = (event) => {
    event.preventDefault();
    fetch("http://localhost:3000/signin", {
      method: "post",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword,
      }),
    })
      .then((response) => response.json())
      .then((user) => {
        if (user.id) {
          this.props.loadUser(user);
          this.props.onRouteChange("home");
        }
      });
  };

  render() {
    const { onRouteChange } = this.props;
    return (
      <div className="flex flex-col items-center">
        <div className="border border-black w-1/4 p-5 flex flex-col items-center shadow-md font-bold">
          <legend className="text-center text-4xl">Sign In</legend>
          <div className="grid gap-5 mt-5 w-5/6">
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
                onClick={this.onSubmitSignIn}
                type="submit"
                value="Sign in"
                className="bg-transparent border border-black p-1"
              />
            </div>
            <p
              onClick={() => onRouteChange("register")}
              className="underline cursor-pointer hover:text-gray-700 text-center"
            >
              Register
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Signin;

import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Particles from 'react-particles-js';

//TODO: add feature to detect multiple faces
//TODO: add more validations both in front and backend

const particlesOption = {
  particles: {
    number: {
      value: 100,
    },
    size: {
      value: 3,
    },
  },
  interactivity: {
    events: {
      onhover: {
        enable: true,
        mode: 'repulse',
      },
    },
  },
};

const initialState = {
  input: '',
  imageURL: '',
  box: {},
  route: '',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: '',
  },
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageURL: '',
      box: {},
      route: '',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: '',
      },
    };
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined,
      },
    });
  };

  calculateFaceLocation = (data) => {
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      // prettier-ignore
      rightCol: width - (clarifaiFace.right_col * width),
      // prettier-ignore
      bottomRow: height - (clarifaiFace.bottom_row * height),
    };
  };

  displayFaceBox = (box) => {
    this.setState({ box: box });
  };

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  onBtnClick = () => {
    this.setState({ imageURL: this.state.input });

    fetch('http://localhost:3000/imageurl', {
      method: 'post',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        input: this.state.input,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response) {
          fetch('http://localhost:3000/image', {
            method: 'put',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
              id: this.state.user.id,
            }),
          })
            .then((response) => response.json())
            .then((count) => {
              this.setState(Object.assign(this.state.user, { entries: count }));
            });

          this.displayFaceBox(this.calculateFaceLocation(response));
        }
      })
      .catch((err) => console.log(err));
  };

  onRouteChange = (route) => {
    if (route === 'signin') {
      if (this.state.box) {
        this.setState(initialState);
      }
      this.setState({ isSignedIn: false });
    } else if (route === 'home') {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route });
  };

  render() {
    const { isSignedIn, box, imageURL, route } = this.state;

    return (
      <div className='px-6 py-4'>
        <Particles params={particlesOption} className='particles' />
        <Navigation
          isSignedIn={isSignedIn}
          onRouteChange={this.onRouteChange}
        />

        {route === 'home' ? (
          <div>
            <Logo />
            <div className='flex flex-col text-center my-4'>
              <Rank
                userName={this.state.user.name}
                userEntries={this.state.user.entries}
              />
              <ImageLinkForm
                onInputChange={this.onInputChange}
                onBtnClick={this.onBtnClick}
              />
            </div>

            <FaceRecognition box={box} imageURL={imageURL} />
          </div>
        ) : route === 'register' ? (
          <Register onRouteChange={this.onRouteChange} />
        ) : (
          <Signin onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
        )}
      </div>
    );
  }
}

export default App;

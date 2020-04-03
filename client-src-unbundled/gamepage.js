const React = require("react");

const Login = require("./gamepage/Login");
const Register = require("./gamepage/Register");
const About = require("./gamepage/About");
const SelectServer = require("./gamepage/SelectServer");
const SelectCharacter = require("./gamepage/SelectCharacter");
const CreateCharacter = require("./gamepage/CreateCharacter");
const BgAnimate = require("./BgAnimate");
const SpritesListInit = require("./SpritesListInit");

//for testing purpose only
const AnimationTESTER = require("./AnimationTESTER");

//from passport to TOTAL SOCKET IO!!!!!
const socket = io();

module.exports = () => {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        //toggles
        show: "Login",
        //modal types
        popup: {
          loading: false,
          modal: false
        },

        //live input values
        loginInput: {
          username: "",
          password: ""
        },
        registerInput: {
          regUsername: "",
          regPassword: "",
          regConfirmPassword: ""
        },

        //error-success message
        info: {
          type: "",
          message: ""
        },

        //Bg Animation Object
        bgIsOn: true,

        //Asset Manager
        assetManager: null
      };
      this.bgAnimate = null;
      this._updateInput = this._updateInput.bind(this);
      this._toggleVisibility = this._toggleVisibility.bind(this);
      this._setStateCallback = this._setStateCallback.bind(this);
    }

    componentDidMount() {
      this.bgAnimate = new BgAnimate();
      this.bgAnimate.initialize();
      this.bgAnimate.startTransition();

      SpritesListInit(AssetManager => {
        this.setState({ assetManager: AssetManager });
        console.log("Done updating asset manager");
      });
    }
    componentDidUpdate(prevProps, prevState) {
      if (prevState.bgIsOn != this.state.bgIsOn) {
        this.state.bgIsOn
          ? this.bgAnimate.startTransition()
          : this.bgAnimate.endTransition();
      }
    }
    _setStateCallback(toChange) {
      this.setState(toChange);
    }
    _toggleVisibility(component) {
      const fader = document.querySelector("#fader");
      fader.style.display = "block";
      let counter = 0,
        reducer = 1,
        opaq = 0;
      const faderTimer = setInterval(() => {
        counter++;
        reducer = counter <= 10 ? 1 : -1;
        opaq += reducer * 0.1;

        fader.style.opacity = opaq;
        if (counter == 10) {
          this.setState({
            show: component,
            loginInput: {
              username: "",
              password: ""
            },
            registerInput: {
              regUsername: "",
              regPassword: "",
              regConfirmPassword: ""
            },
            info: {
              type: "",
              message: ""
            },
            popup: {
              loading: false
            }
          });
        }
        if (counter >= 20) {
          clearInterval(faderTimer);
          fader.style.display = "none";
        }
      }, 25);
    }
    _updateInput(e) {
      const elem = e.target;
      if (elem.id == "regUsername" || elem.id == "username") {
        const reg = /^(\w?)+$/;
        if (!reg.test(elem.value)) return null;
      }
      let newInput =
        elem.id.indexOf("reg") == 0
          ? this.state.registerInput
          : this.state.loginInput;
      newInput[elem.id] = elem.value;
      this.setState(newInput);
    }

    render() {
      return (
        <div id="GamePageContainer">
          <img id="backgroundImg0" className="backgroundImg" />
          <img id="backgroundImg1" className="backgroundImg" />

          {this.state.show == "AnimationTESTER" && (
            <AnimationTESTER
              _updateInput={this._updateInput}
              _toggleVisibility={this._toggleVisibility}
              _setStateCallback={this._setStateCallback}
              info={this.state.info}
              assetManager={this.state.assetManager}
            />
          )}

          {this.state.show == "Login" && (
            <Login
              _updateInput={this._updateInput}
              _toggleVisibility={this._toggleVisibility}
              _setStateCallback={this._setStateCallback}
              loginInput={this.state.loginInput}
              info={this.state.info}
              bgIsOn={this.state.bgIsOn}
              socket={socket}
            />
          )}

          {this.state.show == "Register" && (
            <Register
              _updateInput={this._updateInput}
              _toggleVisibility={this._toggleVisibility}
              _setStateCallback={this._setStateCallback}
              registerInput={this.state.registerInput}
              info={this.state.info}
              socket={socket}
            />
          )}

          {this.state.show == "SelectServer" && (
            <SelectServer
              _toggleVisibility={this._toggleVisibility}
              _setStateCallback={this._setStateCallback}
              info={this.state.info}
              socket={socket}
            />
          )}
          {this.state.show == "SelectCharacter" && (
            <SelectCharacter
              _toggleVisibility={this._toggleVisibility}
              _setStateCallback={this._setStateCallback}
            />
          )}
          {this.state.show == "CreateCharacter" && (
            <CreateCharacter
              _toggleVisibility={this._toggleVisibility}
              _setStateCallback={this._setStateCallback}
            />
          )}

          {this.state.show == "InGame" && <InGame />}

          {this.state.show == "About" && (
            <About _toggleVisibility={this._toggleVisibility} />
          )}

          {this.state.popup.loading && (
            <div id="loading">
              <p>Processing, please wait..</p>
            </div>
          )}

          {this.state.popup.modal && (
            <div className="modal-bg">
              <div className="modal-fg"></div>
            </div>
          )}
          <div id="fader"></div>
        </div>
      );
    }
  };
};

const React = require("react");
const InfoMessage = require("./InfoMessage");

module.exports = function SelectServer(props) {
  let serverSelected = "";
  serverListActive = (e) => {
    const lists = document.querySelectorAll(".serverList");
    for (const item of lists) {
      item.style.backgroundColor = "rgba(0, 0, 0, 0)";
    }
    const elem = e.target;
    elem.style.backgroundColor = "white";

    serverSelected = elem.id;
  };
  return (
    <div className="formContainer">
      <p>Select Server</p>
      <InfoMessage info={props.info} />
      <ul>
        <li className="serverList" id="odin" onClick={serverListActive}>
          Odin
        </li>
        <li className="serverList" id="loki" onClick={serverListActive}>
          Loki (Closed)
        </li>
      </ul>

      <button
        onClick={() => {
          switch (serverSelected) {
            case "loki":
              props._setStateCallback({
                info: {
                  type: "error",
                  message: "Loki is not yet open",
                },
              });
              break;

            case "odin":
              props._toggleVisibility("SelectCharacter");
              break;

            default:
              props._setStateCallback({
                info: {
                  type: "error",
                  message: "Please select a server",
                },
              });
          }
        }}
      >
        Enter
      </button>
      <button
        onClick={() => {
          props._setStateCallback({
            popup: {
              loading: true,
            },
          });

          props.socket.emit("logout", () => {
            props._toggleVisibility("Login");
          });
        }}
      >
        Back
      </button>
    </div>
  );
};

const fs = require("fs");
const { GlobalKeyboardListener } = require("node-global-key-listener");
const keys = new GlobalKeyboardListener();

const file = `/tmp/dashcam-keys.log`;
let pressed = {};

console.log(`Writing to file: ${file}`);

module.exports = () => {
  keys.addListener((e, down) => {
    if (e.state == "DOWN") {
      pressed[e.name] = true;

      let k = `Down: ${Object.keys(pressed)
        .filter((e) => pressed[e])
        .join(", ")}`;

      console.log(k);

      fs.appendFile(file, `${k}\n`, (err) => {
        if (err) {
          console.log(err);
        }
      });
    } else {
      pressed[e.name] = false;
    }
  });

  new GlobalKeyboardListener({
    windows: {
      onError: (errorCode) => console.error("ERROR: " + errorCode),
      onInfo: (info) => console.info("INFO: " + info),
    },
    mac: {
      onError: (errorCode) => console.error("ERROR: " + errorCode),
    },
  });
};

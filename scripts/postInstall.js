/* eslint-disable no-console */
const path = require("path");
const fs = require("fs");

const removeErrorCodeInDebuggerUI = () => {
  const debuggerUiHtml =
    "node_modules/react-native/local-cli/server/util/debugger-ui/index.html";
  const filePath = path.join(__dirname, "..", debuggerUiHtml);
  const logLabel = `**** Rewrote ${debuggerUiHtml} in`;

  console.time(logLabel);
  fs.readFile(filePath, (readError, data) => {
    if (readError) {
      throw readError;
    }
    const newFile = data.toString("utf8").replace(
      `silence.volume = 0.1;
      if (isPriorityMaintained) {
        silence.play();
      } else {
        silence.pause();
      }`,
      "",
    );
    fs.writeFile(filePath, newFile, writeError => {
      if (writeError) {
        throw writeError;
      }
      console.timeEnd(logLabel);
    });
  });
};

const changeLinuxBundler = () => {
  const bundlerLinux = "node_modules/react-native/scripts/packager.sh";
  const filePath = path.join(__dirname, "..", bundlerLinux);
  const logLabel = `**** Rewrote packager in`;

  console.time(logLabel);
  fs.readFile(filePath, (readError, data) => {
    if (readError) {
      throw readError;
    }
    const newFile = data
      .toString("utf8")
      .replace(`./local-cli/cli.js`, `node_modules//haul/bin/cli.js`)
      .replace(`cd "$THIS_DIR/.."`, `cd "$THIS_DIR/../../../"`);

    fs.writeFile(filePath, newFile, writeError => {
      if (writeError) {
        throw writeError;
      }
      console.timeEnd(logLabel);
    });
  });
};

removeErrorCodeInDebuggerUI();
changeLinuxBundler();

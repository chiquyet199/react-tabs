/* eslint-disable no-console */
const path = require("path");
const fs = require("fs");
const glob = require("glob");

const nativeDirName = "__native_snapshots__";
const webDirName = "__web_snapshots__";

const ensureFolder = dir => !fs.existsSync(dir) && fs.mkdirSync(dir);

const switchFolders = (snapshotFolder, isNative) => {
  const snapshotDir = path.join(
    __dirname,
    "..",
    snapshotFolder,
    "..",
    "__snapshots__",
  );
  const nativeDir = snapshotDir.replace("__snapshots__", nativeDirName);
  const webDir = snapshotDir.replace("__snapshots__", webDirName);
  ensureFolder(nativeDir);
  ensureFolder(webDir);

  if (fs.existsSync(snapshotDir)) {
    if (fs.lstatSync(snapshotDir).isDirectory()) {
      console.log("Found old snapshot dir, removing");
      fs.rmdirSync(snapshotDir);
    } else {
      fs.unlinkSync(snapshotDir);
    }
  } else {
    console.log(snapshotDir + " does not yet exist");
  }

  if (isNative) {
    console.log("Linking: " + nativeDir + " to: " + snapshotDir);
    fs.symlinkSync(nativeDir, snapshotDir);
  } else {
    console.log("Linking: " + webDir + " to: " + snapshotDir);
    fs.symlinkSync(webDir, snapshotDir);
  }
};

const switchSnapshots = isNative => {
  console.log("Switching snapshots to: " + (isNative ? "Native" : "Web"));
  console.time("Finished switching snapshots in");

  const dirs = glob.sync("src/**/__web_snapshots__");
  dirs.forEach(snapshotFolder => switchFolders(snapshotFolder, isNative));
  console.timeEnd("Finished switching snapshots in");
};

module.exports = switchSnapshots;

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
      if (!isNative) {
        console.log("Found old web dir - moving and linking");
        fs.renameSync(snapshotDir, webDir);
        fs.symlinkSync(webDir, snapshotDir);
      } else {
        console.log("Found old native dir - moving and linking");
        fs.renameSync(snapshotDir, nativeDir);
        fs.symlinkSync(nativeDir, snapshotDir);
      }
    }
  } else {
    console.log(snapshotDir + " does not yet exist");
  }
};

const switchSnapshots = isNative => {
  console.log(
    "Checking for new snapshots for: " + (isNative ? "Native" : "Web"),
  );
  console.time("Finished checking for new snapshots in");

  const dirs = glob.sync("src/**/__snapshots__");
  dirs.forEach(snapshotFolder => switchFolders(snapshotFolder, isNative));
  console.timeEnd("Finished checking for new snapshots in");
};

module.exports = switchSnapshots;

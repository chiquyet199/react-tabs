export function MockFile() {}

MockFile.prototype.create = (
  name = "mock.jpg",
  size = 1024,
  mimeType = "image/png",
) => {
  function range(count) {
    let output = "";
    for (let i = 0; i < count; i += 1) {
      output += "a";
    }

    return output;
  }

  const blob = new Blob([range(size)], {type: mimeType});
  blob.lastModifiedDate = new Date();
  blob.name = name;

  return blob;
};

const fs = require("fs");
const path = require("path");

module.exports = class DataClient {
  static baseDir = path.join(__dirname, "../.data/");

  static create(dir, file, data, callback) {
    fs.open(
      `${this.baseDir}${dir}/${file}.json`,
      "wx",
      (err, fileDescriptor) => {
        if (!err && fileDescriptor) {
          const stringData = JSON.stringify(data);

          fs.writeFile(fileDescriptor, stringData, err => {
            if (!err) {
              fs.close(fileDescriptor, err => {
                if (!err) callback(false);
                else callback("Error closing new file");
              });
            } else {
              callback("Error writing to new file");
            }
          });
        } else {
          callback("Could not create new file, it may already exist");
        }
      }
    );
  }

  static read(dir, file, callback) {
    fs.readFile(
      this.baseDir + dir + "/" + file + ".json",
      "utf8",
      (err, data) => {
        callback(err, data);
      }
    );
  }

  static update(dir, file, data, callback) {
    fs.open(
      `${this.baseDir}${dir}/${file}.json`,
      "r+",
      (err, fileDescriptor) => {
        if (!err && fileDescriptor) {
          const stringData = JSON.stringify(data);

          fs.ftruncate(fileDescriptor, err => {
            if (!err)
              fs.writeFile(fileDescriptor, stringData, err => {
                if (!err)
                  fs.close(fileDescriptor, err => {
                    if (!err) callback(false);
                    else callback("Error closing existing file");
                  });
                else callback("Error writing to existing file");
              });
            else callback("Error truncating file");
          });
        } else callback("Could not open the file, it may not exist");
      }
    );
  }

  static delete(dir, file, callback) {
    fs.unlink(`${this.baseDir}${dir}/${file}.json`, err => {
      if (!err) callback(false);
      else callback("Error deleting file");
    });
  }
};

// const lib = {
//   baseDir: path.join(__dirname, "/../.data/"),
// };

// lib.create = (dir, file, data, callback) => {
//   fs.open(`${lib.baseDir}${dir}/${file}.json`, "wx", (err, fileDescriptor) => {
//     if (!err && fileDescriptor) {
//       const stringData = JSON.stringify(data);

//       fs.writeFile(fileDescriptor, stringData, err => {
//         if (!err) {
//           fs.close(fileDescriptor, err => {
//             if (!err) callback(false);
//             else callback("Error closing new file");
//           });
//         } else {
//           callback("Error writing to new file");
//         }
//       });
//     } else {
//       callback("Could not create new file, it may already exist");
//     }
//   });
// };

// lib.read = (dir, file, callback) => {
//   fs.readFile(lib.baseDir + dir + "/" + file + ".json", "utf8", (err, data) => {
//     callback(err, data);
//   });
// };

// module.exports = lib;

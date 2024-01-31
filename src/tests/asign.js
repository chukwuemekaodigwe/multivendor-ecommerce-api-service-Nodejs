const stream = require('stream');

function setupStreams(dataInputStream, dataOutputStream, callback) {
  // Write your code here
  dataInputStream.to
}

let readable = new stream.Readable();
let writable = new stream.Writable({  objectMode: true, 
                                      write: (chunk, encoding, callback) => {
                                        console.log(chunk);
                                        callback(null, true);
                                      }
});
setupStreams(readable, writable, () => console.log("onEnd"));

readable.push('{ "log": "Request received" }');
readable.push(null);
module.exports.setupStreams = setupStreams;
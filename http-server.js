const http = require("http");

const requestListener = function (req, res) {
  res.end("Your IP Addresss is: " + req.socket.remoteAddress);
};

const server = http.createServer(requestListener);
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

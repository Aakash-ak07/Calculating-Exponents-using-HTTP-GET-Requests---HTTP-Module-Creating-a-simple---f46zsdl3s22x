const http = require("http");

const server = http.createServer((req, res) => {
  if (req.method === "POST") {
    let chunks = "";

    req.on("data", (chunk) => {
      chunks += chunk;
    });

    req.on("end", () => {
      const obj = JSON.parse(chunks);
      const value1 = obj.num1;
      const value2 = obj.num2;

      if (isNaN(value1) || value1 <= 0) {
        return res.status(404).send("num1 must be a positive integer");
      }

      if (isNaN(value2) || value2 < 0) {
        return res.status(400).send("num2 must be a non-negative integer");
      }

      const result = Math.pow(value1, value2);

      res.status(200).send(`The result is ${result}`);
    });
  }
});

module.exports = server;

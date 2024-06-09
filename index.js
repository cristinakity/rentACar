const express = require('express')
const cors = require('cors');
const app = express();

// Allow all origins
app.use(cors());

// // OR, to allow specific origins, configure the cors middleware with options:
// const corsOptions = {
//   origin: ['http://example1.com', 'http://example2.com'], // Replace with your domains
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//   credentials: true, // Allow cookies to be sent with requests
//   optionsSuccessStatus: 204
// };

// app.use(cors(corsOptions));

// Middleware para parsear cuerpos de solicitud JSON
app.use(express.json());

app.listen(3000, () => {
  console.log("Server is running!\nhttp://localhost:3000")
})

require('./src/endpoints')(app)
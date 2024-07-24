const express = require('express');
const backend = express();
const router = require('./routes/routes');
const cors = require('cors');


backend.use(express.json());

backend.use(cors({
    origin: 'http://localhost:5173'
}));

backend.use('/', router);

backend.listen(3001, () => {
    console.log("server connected...");
});
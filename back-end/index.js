const express = require("express");
const app = express();
const PORT = 5090;
//const accRouter = require('./route/route.js');
const cors = require('cors');
app.use(cors());
app.use(express.json());

//app.use('/api', accRouter);

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});

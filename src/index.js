const express = require('express');
const app = express();
const PORT = 8080;
const { dbConnection } = require('./config/config');
const routes = require('./routes/tasks');

app.get("/",(req,res)=>{
    res.send("hello world");
})

app.use(express.json());

app.use('/', routes);

dbConnection();

app.listen(PORT, () => console.log(`Server started on port http://localhost:${PORT}`));
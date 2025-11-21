const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db');
const tarefasRouter = require('./routes/tarefas');

const app = express();

const PORT = 3000;


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use('/api/tarefas', tarefasRouter);


app.get('/', (req, res) => {
    res.send('Servidor funcionando corretamente!');
});


app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

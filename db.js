const Database = require('better-sqlite3');
const path = require('path');
const dbPath = path.resolve(__dirname, '../data/database.sqlite');


const db = new Database(dbPath);

db.prepare(`
    CREATE TABLE IF NOT EXISTS tarefas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        titulo TEXT NOT NULL,
        descricao TEXT,
        data_criacao TEXT NOT NULL,
        data_vencimento TEXT,
        prioridade TEXT CHECK(prioridade IN ('baixa', 'media', 'alta')) NOT NULL,
        status TEXT CHECK(status IN ('pendente', 'em andamento', 'concluida')) NOT NULL
    )
`).run();

module.exports = db;

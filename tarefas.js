const express = require('express');
const router = express.Router();
const db = require('../db');

// LISTAR TAREFAS (GET)
router.get('/', (req, res) => {
    const sql = `SELECT * FROM tarefas ORDER BY data_criacao DESC`;
    const tarefas = db.prepare(sql).all();
    res.json(tarefas);
});

// CRIAR TAREFA (POST)
router.post('/', (req, res) => {
    const { titulo, descricao, data_vencimento, prioridade } = req.body;

    if (!titulo || titulo.trim() === "") {
        return res.status(400).json({ error: "Título obrigatório" });
    }

    const sql = `
        INSERT INTO tarefas (titulo, descricao, data_vencimento, prioridade, data_criacao)
        VALUES (?, ?, ?, ?, ?)
    `;

    const stmt = db.prepare(sql);
    const result = stmt.run(
        titulo.trim(),
        descricao || "",
        data_vencimento || null,
        prioridade || "media",
        new Date().toISOString()
    );

    const novaTarefa = db.prepare("SELECT * FROM tarefas WHERE id = ?").get(result.lastInsertRowid);
    res.status(201).json(novaTarefa);
});

// BUSCAR POR ID (GET)
router.get('/:id', (req, res) => {
    const id = req.params.id;
    const tarefa = db.prepare("SELECT * FROM tarefas WHERE id = ?").get(id);

    if (!tarefa) return res.status(404).json({ error: "Tarefa não encontrada" });

    res.json(tarefa);
});

// ATUALIZAR TAREFA (PUT)
router.put('/:id', (req, res) => {
    const id = req.params.id;
    const { titulo, descricao, data_vencimento, prioridade } = req.body;

    const existente = db.prepare("SELECT * FROM tarefas WHERE id = ?").get(id);
    if (!existente) return res.status(404).json({ error: "Tarefa não encontrada" });

    const sql = `
        UPDATE tarefas SET
            titulo = ?,
            descricao = ?,
            data_vencimento = ?,
            prioridade = ?
        WHERE id = ?
    `;

    db.prepare(sql).run(
        titulo || existente.titulo,
        descricao || existente.descricao,
        data_vencimento || existente.data_vencimento,
        prioridade || existente.prioridade,
        id
    );

    const atualizada = db.prepare("SELECT * FROM tarefas WHERE id = ?").get(id);
    res.json(atualizada);
});

// DELETAR TAREFA (DELETE)
router.delete('/:id', (req, res) => {
    const id = req.params.id;

    const result = db.prepare("DELETE FROM tarefas WHERE id = ?").run(id);

    if (result.changes === 0) {
        return res.status(404).json({ error: "Tarefa não encontrada" });
    }

    res.json({ message: "Tarefa deletada com sucesso" });
});

module.exports = router;

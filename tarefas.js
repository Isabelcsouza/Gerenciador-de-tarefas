const express = require('express');
const router = express.Router();
const db = require('../db');

// Lista todas as tarefas
router.get('/', (req, res) => {
    const tarefas = db.prepare(`SELECT * FROM tarefas ORDER BY data_criacao DESC`).all();
    res.json(tarefas);
});

// Cria nova tarefa
router.post('/', (req, res) => {
    const { titulo, descricao, data_vencimento, prioridade } = req.body;

    if (!titulo || titulo.trim() === '') {
        return res.status(400).json({ error: 'Título obrigatório' });
    }

    const stmt = db.prepare(`
        INSERT INTO tarefas (titulo, descricao, data_criacao, data_vencimento, prioridade, status)
        VALUES (?, ?, datetime('now'), ?, ?, 'pendente')
    `);

    const result = stmt.run(
        titulo.trim(),
        descricao || '',
        data_vencimento || null,
        prioridade || 'media'
    );

    const novaTarefa = db.prepare(`SELECT * FROM tarefas WHERE id = ?`).get(result.lastInsertRowid);
    res.status(201).json(novaTarefa);
});


router.get('/:id', (req, res) => {
    const tarefa = db.prepare(`SELECT * FROM tarefas WHERE id = ?`).get(req.params.id);

    if (!tarefa) return res.status(404).json({ error: 'Tarefa não encontrada' });

    res.json(tarefa);
});

// Atualiza uma tarefa
router.put('/:id', (req, res) => {
    const id = req.params.id;
    const existente = db.prepare(`SELECT * FROM tarefas WHERE id = ?`).get(id);

    if (!existente) {
        return res.status(404).json({ error: 'Tarefa não existe' });
    }

    const { titulo, descricao, data_vencimento, prioridade, status } = req.body;

    db.prepare(`
        UPDATE tarefas SET
        titulo = ?,
        descricao = ?,
        data_vencimento = ?,
        prioridade = ?,
        status = ?
        WHERE id = ?
    `).run(
        titulo || existente.titulo,
        descricao || existente.descricao,
        data_vencimento || existente.data_vencimento,
        prioridade || existente.prioridade,
        status || existente.status,
        id
    );

    const atualizada = db.prepare(`SELECT * FROM tarefas WHERE id = ?`).get(id);
    res.json(atualizada);
});

// Delete Tarefa
router.delete('/:id', (req, res) => {
    const result = db.prepare(`DELETE FROM tarefas WHERE id = ?`).run(req.params.id);

    if (result.changes === 0) {
        return res.status(404).json({ error: 'Tarefa não encontrada' });
    }

    res.json({ mensagem: 'Tarefa deletada com sucesso' });
});

module.exports = router;

const express = require('express');
const path = require('path');
const { createClient } = require('redis');

const client = createClient({
    username: 'default',
    password: 'CyJmyIYQ7rnzyRypNtwEAa2zNl6lI2og',
    socket: {
        host: 'redis-12553.c92.us-east-1-3.ec2.redns.redis-cloud.com',
        port: 12553
    }
});

async function conexao() {
    try {
        await client.connect();
        console.log("Conectado ao Redis!");
    } catch (err) {
        console.error("Erro ao conectar:", err);
    }
}
conexao();

const app = express();
app.use(express.json());

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'files')));

// API: salvar pontos
app.post('/pontos_enviar', async (req, res) => {
    const valor = parseInt(req.body.mortes);
    if (valor <= 0) {
        return res.status(400).send("Valor inválido");
    } else {
        await client.set("user_points", valor);
        res.send("Pontos atualizados");
    }
});

// API: pegar pontos
app.get('/pontos_receber', async (req, res) => {
    const pontos = await client.get("user_points");
    res.send(pontos);
});

// Iniciar servidor
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});

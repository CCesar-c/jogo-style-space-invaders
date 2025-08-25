const express =  require('express');
const path = require('path');
const redis = require('redis');
const { Client } = require('undici-types');

const client = redis.createClient();

async function conexao() {
    await client.connect();
}
conexao();

const app = express();

app.use(express.static(path.join(__dirname, '../jogo-style-space-invaders')));

app.post('/pontos_enviar', async (req, res) => {
    const valor = parseInt(req.body.mortes);
    await client.set("user_points", valor);
})
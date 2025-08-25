const express =  require('express');
const path = require('path');
const { createClient  } = require('redis');

const client = createClient({
    username: 'default',
    password: 'CyJmyIYQ7rnzyRypNtwEAa2zNl6lI2og',
    socket: {
        host: 'redis-12553.c92.us-east-1-3.ec2.redns.redis-cloud.com',
        port: 12553
    }
});

async function conexao() {
    await client.connect();
}
conexao();
// back - end 
const app = express();

app.use(express.text());
app.use(express.static(path.join(__dirname, '../files')));
app.use(express.urlencoded({ extended: true }));

app.post('/pontos_enviar', async (req, res) => {
    const valor = parseInt(req.body.mortes);
    await client.set("user_points", valor);
})

app.get('/pontos_receber', async (req, res) => {
    const pontos = await client.get("user_points");
    res.send(pontos);
});
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
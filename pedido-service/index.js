const express = require('express');
const amqp = require('amqplib');

const app = express();
app.use(express.json());

let canal;

async function conectarRabbit() {
  const conn = await amqp.connect('amqp://rabbitmq');
  canal = await conn.createChannel();
  await canal.assertQueue('fila_pedidos');
}

app.post('/pedido', async (req, res) => {
  const pedido = req.body;
  console.log('Recebido:', pedido);
  canal.sendToQueue('fila_pedidos', Buffer.from(JSON.stringify(pedido)));
  res.status(201).send({ status: 'Pedido publicado na fila' });
});

app.listen(4000, () => {
  console.log('Pedido Service na porta 4000');
  conectarRabbit();
});

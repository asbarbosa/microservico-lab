const express = require('express');
const amqp = require('amqplib');

const app = express();
app.use(express.json());

let canal;

// Conectar ao RabbitMQ
async function conectarFila() {
  try {
    const conexao = await amqp.connect('amqp://rabbitmq');
    canal = await conexao.createChannel();
    await canal.assertQueue('fila_pedidos', { durable: true });
    console.log('[✔] Conectado ao RabbitMQ e fila criada');
  } catch (erro) {
    console.error('[✖] Erro ao conectar no RabbitMQ:', erro.message);
    setTimeout(conectarFila, 5000); // tenta de novo depois
  }
}

// Endpoint para receber pedidos
app.post('/pedido', async (req, res) => {
  const pedido = req.body;

  if (!pedido || !pedido.produto) {
    return res.status(400).send({ erro: 'Pedido inválido' });
  }

  const mensagem = Buffer.from(JSON.stringify(pedido));
  canal.sendToQueue('fila_pedidos', mensagem);
  console.log('[→] Pedido enviado à fila:', pedido);

  res.status(201).send({ status: 'Pedido publicado na fila' });
});

// Start
app.listen(4000, () => {
  console.log('[🚀] Pedido Service na porta 4000');
  conectarFila();
});

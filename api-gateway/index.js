const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

app.post('/pedido', async (req, res) => {
  try {
    await axios.post('http://pedido-service:4000/pedido', req.body);
    res.status(201).send({ mensagem: 'Pedido enviado com sucesso' });
  } catch (err) {
    res.status(500).send({ erro: 'Erro ao encaminhar pedido' });
  }
});

app.listen(3000, () => console.log('API Gateway rodando na porta 3000'));

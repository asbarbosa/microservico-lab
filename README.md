# 🧪 Microserviço Lab – Sistema de Pedidos com RabbitMQ

Este projeto é um laboratório prático para estudar **arquitetura de microserviços**, com foco em comunicação assíncrona usando **RabbitMQ**, **Docker** e **Node.js**

## 📦 Estrutura Inicial

> O sistema simula um fluxo simples de pedidos, onde os serviços se comunicam via fila de mensagens:

```
Cliente → API Gateway → Pedido Service → (RabbitMQ) → Pagamento Service → Notificação
```

## 🔧 Tecnologias

- Node.js (Express + amqplib + axios)
- Docker e Docker Compose
- RabbitMQ (fila de mensagens)
- C#/.NET (em breve)


## 🧱 Serviços

| Serviço              | Porta | Função                                     |
|----------------------|-------|--------------------------------------------|
| `api-gateway`        | 3000  | Recebe as requisições HTTP dos clientes    |
| `pedido-service`     | 4000  | Processa e publica pedidos na fila         |
| `pagamento-service`  | -     | (futuramente) processará os pagamentos     |
| `notificacao-service`| -     | (futuramente) enviará notificações         |
| `rabbitmq`           | 15672 | Interface web de gerenciamento das filas   |

---

## 🚀 Como rodar localmente

### Pré-requisitos

- [Docker Desktop](https://www.docker.com/products/docker-desktop)
- [Node.js LTS](https://nodejs.org)

### Passos

```bash
# Clone o repositório
git clone https://github.com/asbarbosa/microservico-lab.git
cd microservico-lab

# Suba os serviços
docker-compose up --build
```

## 📚 Objetivo Educacional

Este projeto foi criado como estudo pessoal, mas está aberto para quem quiser entender, brincar e testar ideias com microserviços, filas e containers.  
Futuramente, será expandido para incluir:

- Serviço de pagamentos (C#/.NET)
- Logs centralizados
- Service Discovery
- Integração com banco SAP HANA
- Observabilidade e métricas

---

## 🧠 Autor

Feito por [Adriano Barbosa](https://github.com/seu-usuario)  
PM, curioso e inconformado com sistemas acoplados

---

## 🫱 Contribuições?

Sinta-se livre para abrir PRs ou Issues, especialmente se quiser praticar algo com RabbitMQ ou microserviços na vida real.

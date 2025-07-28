import pika
import time
import json

print("🔔 | Serviço de Notificação inicializando...")

tentativas = 0
max_tentativas = 10

connection = None

while tentativas < max_tentativas:
    try:
        connection = pika.BlockingConnection(
            pika.ConnectionParameters(host='rabbitmq')
        )
        break
    except Exception as e:
        tentativas += 1
        print(f"[!] Tentativa {tentativas}/{max_tentativas} falhou: {e}")
        time.sleep(3)

if connection is None:
    print("❌ | Não foi possível conectar ao RabbitMQ.")
    exit(1)

channel = connection.channel()

channel.queue_declare(queue='fila_notificacoes', durable=True)

def callback(ch, method, properties, body):
    mensagem = json.loads(body.decode())
    print(f"🔔 | Notificação recebida: {mensagem}")

channel.basic_consume(
    queue='fila_notificacoes',
    on_message_callback=callback,
    auto_ack=True
)

print("🔔 | Serviço de Notificação aguardando mensagens...")
channel.start_consuming()

using System.Text;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;

class Program
{
    static void Main(string[] args)
    {
        Console.WriteLine("💳 | Pagamento Service inicializando...");

        int tentativas = 0;
        const int maxTentativas = 10;
        const int intervaloEntreTentativas = 3000;

        IConnection connection = null;

        while (tentativas < maxTentativas)
        {
            try
            {
                var factory = new ConnectionFactory()
                {
                    HostName = "rabbitmq",
                    DispatchConsumersAsync = true
                };

                connection = factory.CreateConnection();
                break;
            }
            catch (Exception ex)
            {
                tentativas++;
                Console.WriteLine($"[!] Tentativa {tentativas}/{maxTentativas} falhou: {ex.Message}");
                Thread.Sleep(intervaloEntreTentativas);
            }
        }

        if (connection == null)
        {
            Console.WriteLine("❌ | Não foi possível conectar ao RabbitMQ após várias tentativas.");
            return;
        }

        using var channel = connection.CreateModel();

        channel.QueueDeclare(
            queue: "fila_pedidos",
            durable: true,
            exclusive: false,
            autoDelete: false,
            arguments: null
        );

        var consumer = new AsyncEventingBasicConsumer(channel);
        consumer.Received += async (model, ea) =>
        {
            var body = ea.Body.ToArray();
            var mensagem = Encoding.UTF8.GetString(body);
            Console.WriteLine($"[💳] Pagamento recebido: {mensagem}");

            await Task.Yield(); // Para simular async
        };

        channel.BasicConsume(queue: "fila_pedidos", autoAck: true, consumer: consumer);

        Console.WriteLine("💳 | Pagamento Service aguardando pedidos...");

        // Mantém o processo ativo
        Console.CancelKeyPress += (sender, e) =>
        {
            Console.WriteLine("Encerrando o serviço de pagamento...");
            Environment.Exit(0);
        };

        while (true)
        {
            Thread.Sleep(1000);
        }
    }
}

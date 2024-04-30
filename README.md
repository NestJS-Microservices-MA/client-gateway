## Client Gateway
The Gateway is the communication point between our clients and our services. It is responsible for receiving requests, sending them to the corresponding services and returning the response to the client.


## Dev
1. Clone the repository
2. Install dependencies
3. Create a `.env` file based on the `env.template`
4. Start the NATS server
```
docker run -d --name nats-server -p 4222:4222 -p 8222:8222 nats
```
5. Make sure all microservices that you want to use are running
6. Start project with `npm run start:dev`


## Nats
```
docker run -d --name nats-server -p 4222:4222 -p 8222:8222 nats
```

## Prod

Execute command:
```
docker build -f dockerfile.prod -t client-gateway .
```
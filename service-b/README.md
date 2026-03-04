# Service B (Car Fleet)

This microservice is responsible for managing the vehicle fleet. It handles data persistence and exposes its features via gRPC.

```mermaid
graph LR
    A[Service A] -->|gRPC / Protobuf| B[Service B]
    B -->|TypeORM| DB[(PostgreSQL)]
```

## Features

* gRPC server (port 50051).
* Car CRUD management.
* Data persistence with TypeORM and PostgreSQL.

```mermaid
erDiagram
    CAR {
        int id PK
        string brand
        string model
        int year
        float pricePerDay
        boolean isAvailable
    }
```

## Development

To start the service in development mode:

```bash
npm install
npm run start:dev
```

The service requires an accessible PostgreSQL instance to function correctly.

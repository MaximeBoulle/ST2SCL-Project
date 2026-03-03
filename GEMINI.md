# CarRental Project Guide (20/20 Objective)

This project is a micro-services car fleet management application designed for academic excellence.

## 🚀 Architecture
- **Service A (Gateway)**: NestJS REST API using gRPC to communicate with Service B. Swagger at `/api`.
- **Service B (Fleet)**: NestJS gRPC microservice managing the PostgreSQL database with TypeORM.
- **Frontend**: React + Vite + Tailwind CSS for a modern, responsive UI.
- **Infrastructure**: Docker, Kubernetes (StatefulSet for DB), and Terraform (GKE).

## 🛠️ How to Run Locally

### 1. Pre-requisites
- Docker & Docker Compose
- Node.js 20+

### 2. Launch with Docker Compose
```bash
docker-compose up --build
```
- **Frontend**: http://localhost:8080
- **API Gateway (Service A)**: http://localhost:3000/api
- **Postgres**: localhost:5432 (user: postgres / pass: postgres)

---

## ☸️ Kubernetes Deployment

### 1. Build & Push images (Example)
```bash
# Repeat for service-a and frontend
docker build -t your-username/service-b:latest ./service-b
docker push your-username/service-b:latest
```

### 2. Apply Manifests
```bash
kubectl apply -f k8s/postgres.yaml
kubectl apply -f k8s/service-b.yaml
kubectl apply -f k8s/service-a.yaml
kubectl apply -f k8s/frontend.yaml
kubectl apply -f k8s/ingress.yaml
```

---

## ☁️ Cloud & IaC (GCP/GKE)
Deploy a production cluster on Google Cloud in minutes.

```bash
cd terraform
terraform init
terraform plan
terraform apply
```

---

## ✅ Bonus Implemented
- [x] **Cloud Native**: Multi-container architecture.
- [x] **Terraform**: Automatic GKE provisioning.
- [x] **Kubernetes**: Scalable deployments & StatefulSet for DB.
- [x] **Modern UI**: Polished React interface with Tailwind and Lucide icons.
- [x] **gRPC**: Efficient inter-service communication.
- [x] **Optimized Dockerfiles**: Multi-stage builds for small image size.

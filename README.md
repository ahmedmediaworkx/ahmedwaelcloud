# Engineering Onboarding & Local Setup Guide

Welcome to the Ahmed Wael Portfolio Web Platform codebase. This repository contains the static Single Page Application (SPA) portfolio built using React, TypeScript, Vite, and TailwindCSS v4. It also includes local Docker containerization environments and Terraform infrastructure configurations for AWS ECS Fargate deployment.

This document serves as the official developer setup guide for the Engineering department. Follow these steps to prepare your environment, install dependencies, run the code locally, and troubleshoot common issues.

---

## 1. Project Tech Stack

- **Frontend Core**: React 19, TypeScript 5.8+, Vite 6
- **Styling**: TailwindCSS v4, CSS grids, custom theme hooks
- **Local Runtime / Serving**: Node.js v20, Docker Desktop, Nginx (Alpine-based)
- **Infrastructure as Code**: Terraform (>= 1.5.0)
- **CI/CD**: GitHub Actions (linting, bundling, Docker image compilation, AWS ECR/ECS rollout)

---

## 2. Prerequisites & Software Installation

Before checking out the code, install the required software tools on your machine:

### Git
- **Installation**: Download from [git-scm.com](https://git-scm.com/) or install via your packet manager (`brew install git` or `winget install Git.Git`).
- **Verification**: `git --version`

### Node.js (LTS Version 20 recommended)
- **Installation**: Download from [nodejs.org](https://nodejs.org/) or use a Node Version Manager like `nvm` / `fnm`.
- **Verification**: `node -v` and `npm -v`

### Docker Desktop
- **Installation**: Download from [docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop). Ensure Linux containers are enabled.
- **Verification**: `docker --version` and `docker compose version`

### Terraform CLI (For Infrastructure Engineers)
- **Installation**: Install from [developer.hashicorp.com/terraform/downloads](https://developer.hashicorp.com/terraform/downloads).
- **Verification**: `terraform --version`

### AWS CLI v2 (For Deployment)
- **Installation**: Install from [aws.amazon.com/cli](https://aws.amazon.com/cli/).
- **Verification**: `aws --version`

---

## 3. Repository Initialization & Initial Configuration

1. **Clone the Repository**:
   ```bash
   git clone <your-repository-url>
   cd ahmedwaelcloud.com
   ```

2. **Environment Variables**:
   Copy the example environment file to create your local variables configuration:
   ```bash
   cp .env.example .env.local
   ```
   Open `.env.local` and define the following variables:
   - `GEMINI_API_KEY`: Required if using integration with Gemini AI API.
   - `APP_URL`: Self-referential base URL for metadata tags and callbacks.

---

## 4. Local Development Setup

You can run the application in two ways: natively on your host system, or isolated inside a Docker container.

### Option A: Native Host Setup (Recommended for speed)
1. **Install Node Packages**:
   ```bash
   npm install
   ```
2. **Launch Vite Development Server**:
   ```bash
   npm run dev
   ```
3. **Access Application**:
   Open **[http://localhost:3000](http://localhost:3000)** in your browser. HMR (Hot Module Replacement) is enabled.

### Option B: Containerized Development (Isolated Environment)
This setup runs the development server inside an Alpine Node container using Docker volumes for real-time code synchronization:
1. **Start the Container**:
   ```bash
   docker compose -f docker-compose.dev.yml up -d
   ```
2. **Access Application**:
   Open **[http://localhost:3000](http://localhost:3000)**. Editing code on the host machine instantly updates inside the container.
3. **Check Live Terminal Logs**:
   ```bash
   docker compose -f docker-compose.dev.yml logs -f
   ```
4. **Shutdown the Environment**:
   ```bash
   docker compose -f docker-compose.dev.yml down
   ```

---

## 5. Local Nginx Serving (Production-like serving)

To test how the site behaves when served by Nginx (matching the production cloud setup):
1. **Build the production assets**:
   ```bash
   npm run build
   ```
2. **Spin up the Nginx server**:
   ```bash
   docker compose up -d
   ```
   This reads from `./dist` and applies your custom [nginx.conf](nginx.conf).
3. **Access Application**:
   Open **[http://localhost:8080](http://localhost:8080)**.
4. **Stop Serving**:
   ```bash
   docker compose down
   ```

---

## 6. AWS Infrastructure & Deployments

If you are modifying infrastructure:
1. **Initialize Terraform & Apply**:
   ```bash
   cd terraform
   terraform init
   terraform plan
   terraform apply
   ```
2. **Build and Deploy Code via GitHub Actions**:
   Ensure you configure the secrets in your GitHub repository:
   - `AWS_ACCESS_KEY_ID`
   - `AWS_SECRET_ACCESS_KEY`
   - `AWS_REGION`
   
   Every push to the `main` branch compiles the Docker image, pushes it to your Elastic Container Registry (ECR), and triggers a rolling update of the ECS Fargate Service.

---

## 7. Troubleshooting & Common Issues

### Issue 1: Port 3000 (Dev) or 8080 (Nginx) is already in use
- **Symptoms**: Local dev server fails to start, or Docker container immediately exits.
- **Solution**: Identify and terminate the blocking process:
  - *Windows*: `Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess | Stop-Process`
  - *Mac/Linux*: `kill -9 $(lsof -t -i:3000)`
  - Alternatively, modify the ports mapped in `package.json` or `docker-compose.yml`.

### Issue 2: `npm ci` fails with `Clean install a project ... package-lock.json missing`
- **Symptoms**: Docker build or local build fails when utilizing strict clean installs.
- **Solution**: This project does not commit `package-lock.json` by default. Run `npm install` on the host to generate the lockfile before running `npm ci` or running container builds.

### Issue 3: Refreshing page on Nginx Serve mode yields `404 Not Found`
- **Symptoms**: Direct navigation or browser refresh on secondary sub-routes (e.g. `/about`, `/projects`) throws Nginx 404.
- **Solution**: Ensure your `/etc/nginx/conf.d/default.conf` configures `try_files $uri $uri/ /index.html;` inside the root location block. This routes traffic back to React's client-side Router.

### Issue 4: Docker volume mounts do not sync (Windows hosts)
- **Symptoms**: Editing code locally on Windows does not hot-reload inside the dev container.
- **Solution**: Ensure that File Sharing is enabled in Docker Desktop settings under **Resources** -> **File Sharing** for the project directory. If using WSL2, clone the project directly into the WSL filesystem (`\\wsl$\...`) rather than accessing the Windows mounting point `/mnt/c/`.

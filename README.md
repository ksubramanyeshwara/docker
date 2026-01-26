# Docker

This repository contains notes, examples, and projects documenting my journey of learning Docker and containerization technologies.

## 🎯 Learning Objectives

- Understand Docker architecture and containerization.
- Build, run, and manage Docker images and containers.
- Implement networking, storage, data persistence, and configuration for containers
- Run multi-container applications using Docker Compose.
- Apply Docker best practices in real-world DevOps workflows

## 🧠 Prerequisites

- Linux basics and command-line usage
- Git fundamentals
- Basic networking knowledge (ports, IPs, DNS)
- Introductory cloud and DevOps concepts
- Docker installed on local machine

## 🗂️ Table of Contents

- [Container Fundamentals](./01-container-fundamentals/README.md)
- [Docker Fundamentals](./02-docker-fundamentals/README.md)
- [Docker Images & Dockerfiles](./03-docker-images-dockerfiles/README.md)

## 🛠️ Setup & Installation

### Install Docker on linux

- Install Docker on Linux (Ubuntu / Debian)
  ```
  sudo apt update
  sudo apt install -y docker.io
  ```
- Enable and start Docker
  ```
  sudo systemctl enable docker
  sudo systemctl start docker
  ```
- Verify installation
  ```
  docker --version
  docker info
  ```
- Run Docker Without sudo (Recommended)
  ```
  sudo usermod -aG docker $USER
  newgrp docker
  ```
- Verify
  ```
  docker run hello-world
  ```

### Install Docker on macOs

- Download Docker Desktop from: https://www.docker.com/products/docker-desktop/
- Open the downloaded .dmg file and drag Docker.app into the Applications folder
- Verify using Terminal: `docker --version`

### nstall Docker on Windows (WSL2)

- Enable WSL2 `wsl --install`
- Download Docker Desktop from: https://www.docker.com/products/docker-desktop/
  - Run the installer
  - During installation: Enable “Use WSL 2 instead of Hyper-V”
  - Complete installation and restart if needed
- Connect Docker Desktop with WSL2
  - Open Docker Desktop, Go to Settings → Resources → WSL Integration
  - Enable integration with WSL2
  - Enable integration for your Linux distro (Ubuntu)
  - Click Apply & Restart
- Use Docker via WSL Terminal

<!-- ## 🤝 Contributing

## 📜 License

License info

## 🙏 Acknowledgments -->

## 📫 Connect With Me

<div align="center">

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/ksubramanyeshwara)
[![X (Twitter)](https://img.shields.io/badge/X-000000?style=for-the-badge&logo=x&logoColor=white)](https://x.com/ksubramanyaa)
[![Peerlist](https://img.shields.io/badge/Peerlist-46923c?style=for-the-badge&logo=peerlist&logoColor=white)](https://peerlist.io/subramaneshwara)
[![Gmail](https://img.shields.io/badge/Gmail-EA4335?style=for-the-badge&logo=gmail&logoColor=white)](mailto:ksubramanyeshwara@gmail.com)

</div>

## 💁‍♂️ Support

<div align="center">

Found this repo helpful ? Give it a ⭐️

</div>

<div align="center">

Made with ❤️ by **K Subramanyeshwara**

</div>

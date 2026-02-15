# Docker

- Docker is a containerization platform that provides easy way to containerize your applications.
- Docker lets you containerize an application + all its dependencies (libraries, runtime, config).

## Why Docker?

- Consistency: The application runs the same in development, testing, and production.
- Isolation: Each container runs in its own isolated environment, without interfering with each other.
- Efficiency: Containers are lightweight (megabytes vs. gigabytes for VMs), start in seconds, and use fewer resources.
- Portability: Docker containers can run on any machine with Docker installed, regardless of the operating system or hardware.
- Microservices Architecture: Break apps into smaller, independent services, each in its own container.
- CI/CD Integration: Streamlines DevOps pipelines with consistent environments for build, test, deployment.

## Docker Architecture

- Docker uses a client-server architecture with three main components:
  - Docker Client
  - Docker Daemon
  - Docker Registry
- The Docker client talks to the Docker daemon, which does the heavy lifting of building, running, and distributing your Docker containers.

### Docker Client

- It is the CLI interface that users interact with.
- When the user type the command and the docker client sends request to the docker daemon.

### Docker Daemon

- It is the background service running on the host machine.
- It manages Docker objects such as images, containers, networks, and volumes.
- It listens for Docker API requests and executes them.

### Docker Registry

- It is a repository for Docker images.
- It stores and distributes Docker images.
- Docker Hub is the default public registry.

###

## Docker Workflow

It is the process of creating a docker image and running it as a container.

1. **Dockerfile**: Define the instructions to build a Docker image (e.g., OS, dependencies, app code).
2. **Build**: Create a Docker image from a Dockerfile.
3. **Run**: Start a container from the Docker image.
4. **Push**: Share the Docker image to a registry (e.g., Docker Hub).
5. **Pull**: Download a Docker image from a registry.
6. **Stop**: Gracefully stop a running container.
7. **Remove**: Delete a container or image.

## Docker Container Lifecycle

It is the process after the docker image is created.

- Created: Container configured but not running (`docker create`).
- Running: A container running with all its processes (`docker start` or `docker run`).
- Paused: Processes suspended (`docker pause`); resume with `docker unpause`.
- Stopped/Exited: Gracefully stopped (`docker stop`) or process completed/exited.
- Restarted: Restart via `docker restart` (stop + start).
- Killed: Forcefully stopped (`docker kill`).
- Removed: Permanently deleted (`docker rm`); cannot restart after this.

## Docker Components

- Docker Engine
  - Docker daemon
  - Docker client
- Docker Desktop
- Docker registry
- Docker images
- Docker containers
- Docker Compose
- Docker Network
- Docker Volume

### Docker Engine

- Docker Engine is the core runtime used to build, run, and manage containers.
- It consists of two main parts: the Docker daemon and the Docker client.

  ### Docker Daemon (dockerd)
  - Background service that manages everything related to Docker.
  - It listens for API requests and executes them.
  - Manages Docker objects like images, containers, networks, and volumes.
  - It builds images, starts/stops containers, pulling containers from registries, and can communicate with other daemons for distributed setups (e.g., in swarms).
  - Manages container lifecycle, networking, and storage.

  ### Docker Client
  - The Docker client (`docker`) is a CLI tool and primary way to interact with Docker.
  - Converts your commands into API requests.
  - It sends API requests to the Docker daemon to build, run, and manage containers.

### Docker Desktop

- Docker Desktop is a GUI application that provides a user-friendly interface for managing Docker containers, images, and other Docker objects.
- It includes the Docker Engine, Docker CLI, and additional tools for development and debugging.

### Docker Registry

- It is a repository/centralized place to store and share Docker images.
- Docker Hub is the default public registry, but you can also use private registries.

> Docker Hub is a VCS for docker images.

### Docker Images

- Read-only templates used to create containers.
- Contains the application code, libraries, dependencies, and other files needed to run the application.
- Images are immutable. If you want to make changes, you need to create a new image.
- Stored on disk.

### Docker Containers

- Docker containers are lightweight, standalone, and executable software packages that include everything needed to run an application.
- It has own filesystem, network, and isolated process space.
- They add a writable layer on top of the image's read-only layers for runtime changes.
- It can be started, stopped, paused, moved, and deleted.
- Stored on memory.

### Docker Compose

- A tool for defining and running multi-container applications. It uses YAML for configuaration.
- Bridge between Docker and Kubernetes.

### Docker Network

- Allows containers to communicate.
- Docker creates default networks (e.g., bridge) with IP assignment.

### Docker Volume

- It is a persistant storage mechanism for containers.
- Volume stores data on the host or remote storage, managed by the daemon to prevent loss when containers are deleted.

## Docker installation on Ubuntu

Run the following command to uninstall all conflicting packages:
sudo apt remove $(dpkg --get-selections docker.io docker-compose docker-compose-v2 docker-doc podman-docker containerd runc | cut -f1)

In a new machine for the first time, you need to set up the Docker apt repository. Afterward, you can install and update Docker from the repository.

1. Set up Docker's apt repository.

   create a docker.sh file and add below data and execute it

   ```
   # Add Docker's official GPG key:
   sudo apt update
   sudo apt install ca-certificates curl
   sudo install -m 0755 -d /etc/apt/keyrings
   sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
   sudo chmod a+r /etc/apt/keyrings/docker.asc

   # Add the repository to Apt sources:
   sudo tee /etc/apt/sources.list.d/docker.sources <<EOF
   Types: deb
   URIs: https://download.docker.com/linux/ubuntu
   Suites: $(. /etc/os-release && echo "${UBUNTU_CODENAME:-$VERSION_CODENAME}")
   Components: stable
   Signed-By: /etc/apt/keyrings/docker.asc
   EOF

   sudo apt update
   ```

2. Install the Docker packages
   - `sudo apt install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin`
   - To verify that Docker is running, use: `sudo systemctl status docker`
   - Some systems may have this behavior disabled and will require a manual start: `sudo systemctl start docker`

3. Verify that the installation is successful by running the hello-world image:
   `sudo docker run hello-world`
   - Unable to find image 'hello-world:latest' locally, then Grant Access to your user to run docker commands: `sudo usermod -aG docker username`

4. `docker run hello-world`

   ```
   ....
   ....
   Hello from Docker!
   This message shows that your installation appears to be working correctly.
   ...
   ...
   ```

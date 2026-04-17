# Docker Compose

- Docker Compose is a tool for defining and running multi container applications together using a simple YAML configuration file.

## Why Docker Compose?

- When you build a real application you might need multiple servises running together. Such as web server, a database, and a cache.
- _Without Docker Compose:_
  - You will have to run each container with `docker run`
  - Manually configure the networking between them.
  - Remembering environment variables for each and
  - Restart everything in the same order when something is changed in the code.
- Docker compose solves the above problem by defining everything in one YAML file.
- **With Docker Compose:**
  - Which image to use
  - Which port to open
  - Volumes
  - Environment variables
  - networks
  - how containers depend on each other

> Docker = runs one container
> Docker Compose = manages a whole group of containers as one app

## Key Concepts

### Services

- Defines the individual container as a part of your application.
- It specifies image, build instructions, ports, environment variables, and other configuration.

### Images

- Specifies a pre-built Docker image to use from a registry (like Docker Hub). Format: image: name:tag
- Alternatively use build to create a custom image from a Dockerfile.

### Build

- Instruction to create a custom image from a local Dockerfile instead of using a generic one.

### Networks

- Creates isolated networks for services to communicate each other.
- Services on the same network can talk to each other using service names as hostnames.

### Volumes

- Persistent storage used to save data (like database files) so it isn't lost when a container stops or restarts.
- They're mapped to host directories or named volumes for data persistence.

### Environment variables

- Passes configuration or secrets into a container at runtime.
- They can come from .env files, or inline values.

### depends_on

- Configuration that defines the startup order to ensure one service is ready before another begins.

### Ports

- Maps container ports to host machine ports for external access.
- Format: "host_port:container_port"

### Restart Policies

- Defines when containers should automatically restart after stopping.
- Options: always, unless-stopped, on-failure, or no.

### Health Checks

- Command that docker runs periodically to check service health.

## Common Commands

| Command                               | Description                         |
| ------------------------------------- | ----------------------------------- |
| `docker compose up`                   | Start all services                  |
| `docker compose up -d`                | Start in detached mode (background) |
| `docker compose down`                 | Stop and remove containers          |
| `docker compose ps`                   | List running containers             |
| `docker compose logs`                 | View service logs                   |
| `docker compose build`                | Build or rebuild services           |
| `docker compose exec <service> <cmd>` | Run command in a service            |
| `docker compose stop <service>`       | Stop a service                      |
| `docker compose start <service>`      | Start a service                     |
| `docker compose restart <service>`    | Restart a service                   |
| `docker compose rm <service>`         | Remove a service                    |

## Benifits of Docker Compose

- Simplified Orchestration: Manage multiple containers as a single unit
- Reproducibility: Same configuration across development, testing, and production
- Isolation: Each service runs in its own container
- Scalability: Easily scale services with docker compose up --scale
- Environment Variables: Manage different environments (dev, staging, prod)

# Docker Image

- Docker images are read-only templates used to create containers.
- They contain the application code, libraries, dependencies, and other files needed to run the application.

## Checking Docker Image

```bash
# List all images
docker images
```

## Docker Image build with Local Tag

```bash
# Build image with a local tag in the current directory
docker build -t myapp:v1.0 .
```

- -t(tag): It gives a name and version to the image.
- use semantic versioning(1.0.0. 1.0.1).
- Avoid latest in production.

```sh
docker build -t myapp .
# if you don't specify the tag, it will be tagged as latest
```

```bash
# Build from specific Dockerfile
docker build -t myapp:v1.0 -f Dockerfile.prod .
```
Creates a Docker image named myapp with tag v1.0 from the Dockerfile in the current directory.

## Re-tagging Docker Image before Push

```bash
# Re-tag existing image with Docker Hub username
docker tag myapp:v1.0 yourusername/myapp:v1.0
```

Creates a new tag reference to the same image with Docker Hub naming format.

## Pushing Docker Image to Docker Hub

```bash
# Step 1: Login to Docker Hub
docker login
# Enter username and password when prompted

# Step 2: Push the image
docker push yourusername/myapp:v1.0

# Step 3: Verify on Docker Hub
# Visit: https://hub.docker.com/r/yourusername/myapp
```

Uploads your image to Docker Hub registry, making it publicly accessible (or private if your repo is private).

## Docker Image Build with Docker Hub username

```bash
# Build directly with Docker Hub username in tag
docker build -t yourusername/myapp:v1.0 .

# Build and push in one workflow
docker build -t yourusername/myapp:v1.0 . && docker push yourusername/myapp:v1.0
```

Builds the image with Docker Hub username already included, skipping the re-tagging step.

## Docker Run Image

- Checks for image locally
- If not found, pulls from Docker Hub
- Creates container from image
- Runs the container

`$docker run`: It creates a container from the image and runs it.

### Options

- `-d`: Detached mode. Run the container in the background.
- `-p`: Port mapping. Map local machine(host) port to container port.
- `--name`: Assign a custom name to the container.
- `-it`: Interactive terminal (combines -i and -t).
- `-e`: Set environment variables. `ENV=prod`
- `-v`: Mounts storage into container. `-v <host_path>:<container_path>`, Used to store data outside the container.

```bash
# Run container from image
docker run -it -p 8080:8080  dockerhub-username/imagename:tag

########################################
#
# docker run - Create and start container
# -it - Interactive terminal (combines -i and -t)
# -p 8080:8080 - Port mapping (host:container)
# dockerhub-username/imagename:tag - Image to run\
#
########################################

# Run in detached mode
docker run -d -p 8080:8080 myapp:v1.0

# Run with environment variables
docker run -d -p 8080:8080 \
  -e DEBUG=False \
  -e SECRET_KEY=xyz \
  dockerhub-username/imagename:tag

# Run with volume mount
docker run -d -p 8080:8080 -v /host/path:/container/path myapp:v1.0
```

## Docker Stop Container

```bash
# Stop a running container
docker stop container_id_or_name

# stop multiple containers
docker stop container_id_or_name1 container_id_or_name2

# Stop all running containers
docker stop $(docker ps -q)

# Force stop container
docker kill container_id_or_name

# Stop container with timeout (in seconds)
docker stop -t 10 container_id_or_name

```

## Docker Pause and Restart Container

```bash
# Pause a running container
docker pause container_id_or_name

# Unpause a paused container
docker unpause container_id_or_name

# Restart a container
docker restart container_id_or_name

# Restart multiple containers
docker restart container_id_or_name1 container_id_or_name2

# Restart with timeout (in seconds)
docker restart -t 10 container_id_or_name
```

## Listing Containers

> ps stands for process status.

```bash
# List running containers. It shows container ID, image, command, created time, status, ports, and names.
docker ps

# List all containers (including stopped ones)
docker ps -a

# List last created container
docker ps -l

# List the running containers ID's only
docker ps -q

# List containers with specific filter
docker ps --filter "status=exited"

# List containers with specific format
docker ps --format "table {{.ID}}\t{{.Names}}\t{{.Status}}"

# List containers with size information
docker ps -s
```

## Running Command inside the Docker Container

`$docker exec [options] container_id_or_name command`

```bash

# Lists files in nginx container web directory
docker exec container_name ls /usr/share/nginx/html

# Example: Run bash shell in container
docker exec -it container_name bash

# Example: Run a Python script
docker exec container_name python3 /app/script.py

# Example: Check running processes
docker exec container_name ps aux

# Example: View logs
docker exec container_name cat /var/log/myapp.log

```

## Removing Docker Image

> Image cannot be removed if a container is using it so remove the container first.

```bash

# Remove a specific image
docker rmi image_id_or_name

 # Remove by image name and tag
docker rmi myapp:v1.0

# Remove by image ID
docker rmi abc123def456

# Remove all unused images
docker image prune -a

# Remove multiple images
docker rmi myapp:v1.0 myapp:v2.0 yourusername/myapp:latest

```

## Removing the Docker Container

```bash
# Remove a stopped container
docker rm container_id_or_name

# Remove a running container (force remove)
docker rm -f container_id_or_name

# Remove all stopped containers
docker container prune

# Remove multiple containers
docker rm container1 container2 container3

# Remove containers with specific status
docker rm $(docker ps -aq --filter "status=exited")

# Remove containers with specific label
docker rm $(docker ps -aq --filter "label=env=dev")
```

Deletes the specified image(s) from your local Docker storage.

## Docker Image Pull

```bash
# Pull latest version
docker pull yourusername/myapp:latest

# Pull specific version
docker pull yourusername/myapp:v1.0

# Pull from official Docker Hub repository
docker pull nginx:alpine
docker pull postgres:15

# Pull and verify
docker pull yourusername/myapp:v1.0
docker images | grep myapp
```

Downloads the specified image from Docker Hub (or other registry) to your local machine.

## Docker logs

### View container logs

```bash
docker logs container_name_or_id
```

### View logs with timestamps

```bash
docker logs -t container_name_or_id
```

### View logs in real-time (follow)

```bash
docker logs -f container_name_or_id
```

### View logs from last 50 lines (tail)

```bash
docker logs -tf --tail 50 container_name_or_id
```

### View logs since a specific time

```bash
docker logs -t --since "2023-01-01" container_name_or_id
```

## Docker inspect

- It returns detailed JSON with all the information about the container.
- It includes:
  - Network settings(ports, IP addresses)
  - Volume mounts and storage
  - Environment variables
  - Resource limits
  - Container state and status
  - Image details

## To build a Docker image, you must know:

- App start command
- Runtime + version
- Dependency install method
- Required files
- Env vars
- Listening port
- Build vs runtime actions

## Container Knowledge

- Foreground process
- Stateless design
- Signals (SIGTERM)
- Health checks

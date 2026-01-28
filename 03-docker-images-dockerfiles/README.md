# Docker Image

- Docker images are read-only templates used to create containers.
- They contain the application code, libraries, dependencies, and other files needed to run the application.

## Docker Image build with Local Tag

```bash
# Build image with a local tag
docker build -t myapp:v1.0 .
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

## Removing Docker Image

```bash

 # Remove by image name and tag
docker rmi myapp:v1.0

# Remove by image ID
docker rmi abc123def456

# Remove all unused images
docker image prune -a

# Remove multiple images
docker rmi myapp:v1.0 myapp:v2.0 yourusername/myapp:latest

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

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

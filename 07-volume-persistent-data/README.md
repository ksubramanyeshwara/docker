# Volumes, Presistent Data

- Containers are ephemeral, When you delete a container, its data is deleted.
- Any changes inside the container filesystem are lost.
- Containers creates writable layer on top of the image.
- When container is deleted, the writable layer is deleted and data is lost forever.

> Containers ephemeral nature is great for stateless applications, but for stateful applications, we need to persist data.

We need to store the data outside the container. To persist the data docker provides volumes.

### Storage Options

- Volumes
  - Managed by Docker
  - Stored in Docker's storage directory
  - Independent of container lifecycle
- Bind Mounts
  - Managed by user
  - Stored anywhere on the host system
  - Good for development and testing
- tmpfs Mounts (Linux only)
  - Stored in host system memory
  - Never written to disk
  - Good for sensitive, temporary data

## Volumes

- special storage location managed by docker
- Lives outside the container
- Persists even if container is removed
- Can be shared between containers

- Create a volume: `docker volume create <volume-name>`
- Use volume with container: `docker run -v <volume-name>:<container-path> <databse-image-name>`

  ```
  docker run -d \
  --name sql-db \
  -v mysql-data:/var/lib/mysql \
  mysql

  # database create a conatiner with name sql-data, mysql-data is the volume name and stored in /var/lib/mysql, mysql is the official docker image for running mysql database
  ```

- **List all volumes**: `docker volume ls`
- **Inspect a volume**: `docker volume inspect <volume-name>`
- **Remove a volume**: `docker volume rm <volume-name>`, Container must be stopped and removed before removing the volume. Can remove multiple volumes at once.
- **Remove all unused volumes**: `docker volume prune`
- **Mount a volume to a container**: `docker run -v <volume-name>:<container-path> <image-name>`
- **Mount a volume to a container with a name**: `docker run --mount source=<volume-name>,target=<container-path> <image-name>`, New way

### Always use named volumes for production

- Easy to identify and manage
- Easy to backup and restire
- Can be shared between containers
- Can be moved between hosts

## Bind Mounts

- Maps a host file or directory to a container file or directory
- Changes are reflected in both places
- Good for development and testing
- Not recommended for production

> Create a bind mount folder before running the container

```sh
docker run \
  --mount type=bind,source=<host-path>,target=<container-path> \
  <image>

docker run -d \
  --name node-app \
  --mount type=bind source="/home/username/node-app/src",target=/app \
  node-app-image

# or

docker run -d \
  --name node-app \
  -v /home/username/node-app/src:/app \
  node-app-image

# or

docker run -d \
  --name node-app \
  -v "$(pwd)"/src:/app \
  node-app-image

# or

docker run -d \
  --name node-app \
  -v "$(pwd)"/src:/app:ro \
  node-app-image

# ro means read only, it will not allow to write to the container filesystem
# rw means read write, it will allow to write to the container filesystem

# or

docker run -d \
  --name node-app \
  -v "$(pwd)"/src:/app:ro \
  -v /app/node_modules \
  node-app-image

# -v /app/node_modules will create a anonymous volume for node_modules, it will not be shared with the host filesystem

# or

docker run -d \
  --name node-app \
  -v "$(pwd)"/src:/app:ro \
  -v /app/node_modules \
  -v "$(pwd)"

```

### Production Considerations

- Use Named Volumes for databases
- Use Bind Mounts for dev
- Backup volumes regularly
- Store volumes on:
  - EBS (AWS)
  - NFS
  - Cloud storage drivers

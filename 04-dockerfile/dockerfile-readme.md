# Dockerfile

- Dockerfile is a textfile that contains a series of instructions on how to build a Docker image.
- A Dockerfile has no extension and is named exactly `Dockerfile`.
- Instructions format: `INSTRUCTION arguments`
- Instructions are processed sequentially during the build.
- Each instruction creates a new layer in the image, and Docker caches layers to speed up rebuilds.

## FROM

- Always the first instruction.
- Specifies the base image.

```
FROM <image>[:<tag>]
FROM ubuntu:24.04
```

## WORKDIR

- Sets the working directory inside the container.
- If the directory doesn't exist, it will be created.
- All subsequent instructions (RUN, CMD, ENTRYPOINT, COPY, ADD) will be executed in this directory.

```
WORKDIR /app
```

## COPY

- Copies files or directories from the host to the image.
- It can be used multiple times in a Dockerfile.
- `<src>` must be inside build context (`.`)

```sh
# COPY <src> <dest>
COPY ./app /app
```

## ADD

- Similar to COPY but can also extract tar files and download from URLs.

```
ADD <src> <dest>
ADD https://example.com/file.tar.gz /app/
```

## RUN

- Executes commands during the image build process.
- Each RUN instruction creates a new layer in the image.
- You can use run to install software packages, create directories, and set up the environment.
- Use `&&` and `\` to combine commands to reduce layers.

```
RUN <command>
RUN apt-get update && apt-get install -y python3
```

## ENV

- Stores application configuration variables.
- Available during the build and runtime.
- Stored as key-value pairs in the final image.
- Can't pass value during build.
- Ex: Database credentials, API keys, or application settings.

```sh
# ENV <key>=<value>
ENV APP_HOME=/app
DATABASE_URL=mysql://username:password@localhost/mydatabase
API_KEY=your_api_key_here
DEBUG=true
```

## ARG

- Build-time variables.
- Not available at runtime and after the image is built
- Can pass value during build.

```sh
# ARG <name>[=<default value>]
ARG USERNAME=admin
ARG PASSWORD=secret
ARG APP_VERSION=1.0
RUN echo "Building version $APP_VERSION"

# Build with custom value
docker build --build-arg APP_VERSION=2.0 -t myapp:v2.0 .
```

## EXPOSE

- It tells Docker which ports the container will listen on at runtime.
- It does not publish the port to the host.

```
EXPOSE <port>
EXPOSE 8080
```

## CMD

- Default command to run when a container starts.
- Only one CMD instruction is allowed in a Dockerfile.
- These default command can be passed as arguments to the `ENTRYPOINT`.
- It has three forms: shell form, exec form, and as default parameters to ENTRYPOINT.

1. Exec form (recommended)
   - `CMD ["executable", "param1", "param2"]`
2. Shell form
   - `CMD command param1 param2`
3. Default parameters for ENTRYPOINT
   - `CMD ["param1", "param2"]  # Used when ENTRYPOINT is also defined`

## ENTRYPOINT

- Sets the main command that will always run .
- It has two forms: shell form and exec form.

1. Shell form: `/bin/sh -c` is used to execute the command.

```
ENTRYPOINT command param1 param2
ENTRYPOINT python3 app.py
```

2. Exec form

```
ENTRYPOINT ["executable", "param1", "param2"]
ENTRYPOINT ["python3", "app.py"]
```

> When both are used, CMD becomes default arguments for ENTRYPOINT

## USER

- Sets the user or UID for running subsequent instructions.
- By default, Docker runs as root.
- Before setting USER, ensure the user and group exist in the image.

```
USER <user>[:<group>]
USER appuser
```

## SHELL

- Changes the default shell used by subsequent RUN, CMD, and ENTRYPOINT instructions.

```
SHELL ["executable", "param1", "param2"]
SHELL ["/bin/bash", "-c"]
```

## VOLUME

- Creates a mount point and marks it for external volumes.
- This ensures data saved even if container is removed

```
VOLUME /app/data     # or VOLUME ["/app/data", "/app/logs"]
```

## HEALTHCHECK

- healthy: Command exits with code 0.
- unhealthy: Command exits with code 1.

```
HEALTHCHECK [options] CMD command

HEALTHCHECK --interval=30s \
            --timeout=5s \
            --start-period=10s \
            --retries=3 \
  CMD curl -f http://localhost:8080/health || exit 1

    #Checks every 30s normally.
    #First 10s: failures ignored (startup grace).
    #Each check times out after 5s if slow.
    #Needs 3 bad checks in a row to go unhealthy.
```

- `--interval=DURATION`: How often to run the check (default: 30s).
- `--timeout=DURATION`: Maximum time allowed for the check to run (default: 30s). If it takes more time then the check is failed.
- `--start-period=DURATION`: Grace period before starting checks (default: 0s).
- `--retries=N`: Number of retries before marking as unhealthy (default: 3).

## Multi-Stage Builds

- Use multiple FROM instructions to create multiple build stages.
- Copy artifacts from one stage to another.
- You discard build tools and intermediate layers in the final image.

```
FROM builder as build-stage
RUN build-dependencies && build-app

FROM runtime
COPY --from=build-stage /app/built-app /app/
```

### Benefits

- Smaller final image size
- Reduced attack surface
- Separation of build and runtime environments

## .dockerignore

- Specifies files and directories to exclude from the build context.
- Similar to .gitignore.

```
# List files/folders Docker should ignore
.git
node_modules
.env
*.log
Dockerfile
.gitignore
```

## Best Practises

1. Layer optimization: Combine related commands to reduce layers.

```sh
RUN apt-get update && apt-get install -y && \
    package1 && \
    package2 && \
    rm -rf /var/lib/apt/lists/* # clean up, to reduce image size
# creates one layer only
```

2. Order Matters - Optimize Build Cache
   - Put things that change rarely at the top
   - Put things that change often at the bottom

**General Order Stratergy**

- Base image (FROM): rarely changes
- System dependencies (apt install, apk add): rarely changes
- Language dependencies (npm install, pip install): Changes sometimes
- Application code (COPY . .) : Changes frequently
- Runtime command (CMD)

## Example

```
# 1️⃣ Use official lightweight Node image
FROM node:18-alpine

# 2️⃣ Set working directory inside container
WORKDIR /app

# 3️⃣ Copy only package files first (for caching)
COPY package*.json ./

# 4️⃣ Install dependencies
RUN npm install

# 5️⃣ Copy remaining application code
COPY . .

# 6️⃣ Expose app port
EXPOSE 3000

# 7️⃣ Start the application
CMD ["node", "app.js"]
```

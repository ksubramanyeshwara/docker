# Dockerfile

- Dockerfile is a textfile that contains a series of instructions on how to build a Docker image.
- A Dockerfile has no extension and is named exactly `Dockerfile`.
- Instructions format: `INSTRUCTION arguments`
- Instructions are processed sequentially during the build.
- Each instruction creates a new layer in the image, and Docker caches layers to speed up rebuilds.

## FROM

- Specifies the base image. Always the first instruction.

```
FROM <image>[:<tag>]
FROM ubuntu:24.04
```

## WORKDIR

- Sets the working directory for subsequent instructions.

```
WORKDIR /app
```

## COPY

- Copies files or directories from the host to the image.
- It can be used multiple times in a Dockerfile.
- `<src>` must be inside build context (`.`)

```
COPY <src> <dest>
COPY ./app /app
```

## ADD

- Similar to COPY but can also extract tar files and download from URLs.

```
ADD <src> <dest>
ADD https://example.com/file.tar.gz /app/
```

## RUN

- Executes commands during the build process.
- Each RUN instruction creates a new layer in the image.
- Use `&&` and `\` to combine commands to reduce layers.

```
RUN <command>
RUN apt-get update && apt-get install -y python3
```

## ENV

- Set's environment variables.

```
ENV <key>=<value>
ENV APP_HOME=/app
```

## EXPOSE

- Informs Docker that the container listens on the specified network ports at runtime.

```
EXPOSE <port>
EXPOSE 8080
```

## CMD

- Set's the default command to run when a container starts.
- These default command can be passed as arguments to the `ENTRYPOINT`.
- It has three forms: shell form, exec form, and as default parameters to ENTRYPOINT.

### Exec form (recommended)

```
CMD ["executable", "param1", "param2"]
```

### Shell form

```
CMD command param1 param2
```

### Default parameters for ENTRYPOINT

```
CMD ["param1", "param2"]  # Used when ENTRYPOINT is also defined
```

## ENTRYPOINT

- Sets the main command that will always run .
- It has two forms: shell form and exec form.

### Shell form: `/bin/sh -c` is used to execute the command.

```
ENTRYPOINT command param1 param2
ENTRYPOINT python3 app.py
```

### Exec form

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

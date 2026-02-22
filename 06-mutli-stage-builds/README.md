# Multi Stage Builds

- It allows you to use multiple `FROM` statements in a single Dockerfile.
- Each `FROM` statement starts a new stage in the build process.
- You can copy files from one stage to another using the `--from` flag.

> Build the app in one stage and copy only the minimal runtime to another stage.

## Why Use Multi Stage Builds?

- Only required runtime files are shipped
- Smaller image
- Faster build times
- Improve security by reducing the number of layers and dependencies.

### Example

```dockerfile
# stage 1: Build the app
FROM node:18-alphine as builder
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm run build

# stage 2: Run the app
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
EXPOSE 3000
CMD ["node", "dist/main.js"]
```

## Distroless image

- It is a minimal Docker image.
- It contains only the necessary components to run an application.
- Normal image contains OS base, bash, package curl, package manager. Whereas distroless image contains only the application and its dependencies.
- Since distroless image does not contain any bash, curl, package manager, it is more secure and lightweight.

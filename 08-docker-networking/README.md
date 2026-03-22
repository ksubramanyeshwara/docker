# Docker Networking

- Docker networking allows containers to communicate with each other, with host machine, and with the outside world.
- Docker provides several networking drivers that can be used to create different types of networks.

> By default, containers are isolated and they can't talk to each other or the host.

> Docker networking solves this by attaching containers to bridge network and can communicate with other containers on the same network using IP addresses.

> Containers are not accessible from outside the host unless ports are explicitly published using the -p flag.

- every host and container has a network called eath0 by default. Both have different subnet and IP address.
- If we try to communicate between two containers, we get networking error.
- So docker creates a virtual network called bridge network.

## Building Blocks

- Network namespace
  - Each container runs in its own isolated network.
  - Its own IP address
  - Its own network interfaces
  - Its own routing table
  - Its own iptables rules
- veth pair
  - It's like a virtual LAN cable.
  - One end is attached to the container and the other end is attached to the bridge network on the host.
  - Data entering one end comes out the other end.
- bridge(docker0)
  - It is a virtual switch created on the host.
  - It connects all containers running on the same host.
  - Containers connected to this bridge can communicate with each other.
- NAT
  - Containers get private IPs and Private IPs cannot access the internet directly.
  - So docker uses NAT to translate the private IP to the host IP.
  - `Container → veth → docker0, Host changes source IP to host IP, Sends it to internet`
- Docker daemon + libnetwork: It creates and manages,
  - network namespaces
  - veth pairs
  - bridges
  - iptables rules for NAT

> Docker gives each container its own isolated network namespace. It connects containers using veth pairs to a bridge called docker0. The host performs NAT so containers with private IPs can access the internet. All of this networking setup is automatically managed by the Docker daemon.

## Types of Docker Networks

### Bridge Network

- The default network driver in Docker. If you run a container without specifying a network, it connects to this bridge.
- Containers on the same bridge network can communicate with each other.
- It creates an internal private network for containers to communicate with each other.
- All containers can talk to each other using IP addresses, not by container name. No DNS.
- Port mapping needed. Use `-p` flag.

### Host Network

- Container uses host networking directly.
- Removes network isolation between the container and the Docker host. No isolation.
- No port mapping needed
- No DNS needed.
- It is an insecure network because it exposes the container to the host network.

### Custom Bridge

- User created network.
- Best for multi-container applications.
- Better isolation and security because containers from other network cannot talk.
- Built-in DNS resolution: Containers on the same user-defined network can resolve each other by container name
- Port mapping needed. Use `-p` flag.

## Check what docker gives by default

- `docker network ls`: It gives `bridge`, `host` and `none` networks.

## Custom Bridge Network

- To create custom network,

  ```sh
  docker network create network-name
  ```

- To run a container on a custom network,

  ```sh
  docker run --network network-name image-name
  # example
  docker run -d --name db --network my-app-network mysql
  docker run -d --name web --network my-app-network -p 8080:80 nginx
  ```

## Network Management Commands

- `docker network create network-name`: Create a new network
- `docker network ls`: List all networks
- `docker network rm network-name`: Remove network
- `docker network inspect network-name`: Inspect network details
- `docker network connect network-name container-name`: Connect running container to a network
- `docker network disconnect network-name container-name`: Disconnect running container from a network

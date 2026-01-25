# Container

- Container is a light-weight, standalone, portable and executable package that includes everything needed to run a software.
  - an application
  - its libraries
  - dependencies
  - configuration
- so it can run the same way everywhere (laptop, server, cloud).

> Primary goal was to have a consistent deployment accross diverse (cloud, on-premises servers) environment.

## Why Container?

- To solve “It works on my machine” problem: Apps behave differently in dev, test, prod. So container eliminates environment inconsistencies.
- Slow, resource-heavy VMs: Each VM needs full OS, separate kernel, more RAM & CPU. Containers share the host OS kernel (no full OS per app).
- Scalability Challenges: Quickly scaling applications up or down was difficult with traditional deployment methods.

## What containers solved

- Package app + dependencies together
- Share the host OS kernel (no full OS per app)
- Start in seconds or milliseconds
- Same behavior everywhere
- uses 50-70% less resources

## Container vs VM

| Container             | VM                      |
| --------------------- | ----------------------- |
| Lightweight (MB's)    | Heavyweight (GB's)      |
| Fast startup(seconds) | Slow startup (minutes)  |
| Shares host OS kernel | Full OS per VM          |
| Uses fewer resources  | Requires more resources |
| Portable              | Less portable           |
| Secure                | Isolated                |
| Scalable              | Less scalable           |

## How Containers Fit into DevOps Workflows

- Development: Developers build container images locally with the app and dependencies.
- Testing: Same containers are deployed to test environments.
- Staging: Identical containers run in staging (pre-production)
- Production: Containers are scaled and managed in production
- CI/CD: Containers are built, tested, and deployed automatically

> To solve resource wastage in physical servers, hypervisors were used to create virtual machines, and to solve the inefficiency of VMs, containers were introduced.

> Hypervisor/VMs = Solved hardware underutilization and Containers = Solved operational inefficiencies

## How does a container work?

- A container works by running an application in an isolated environment on a shared OS kernel.
- Container uses namespaces to isolate processes, cgroup(control group) for resource control, and layered file systems for efficiency.

### Namespaces

- Container is all about having isolated environment for each application/service.
- To achieve this, container should have it's own file system, IP address, mount points, process IDs, and more.
- Namespaces are a Linux kernel feature that is used to isolate the system resources.
- Each container will have its namespace, and the processes running inside that namespace will not have any privileges outside of it.

> Essentially, namespaces set boundaries for the containers.

**The key namespaces in Linux include:**

- PID namespace (PID): Responsible for isolating the process (PID: Process ID).
- Network namespace (NET): Manages network interfaces (NET: Networking).
- IPC namespace (IPC): Manages access to IPC resources (IPC: InterProcess Communication).
- Mount namespace (MNT): Responsible for managing the filesystem mount points (MNT: Mount).
- uts namespace (UTS): Isolates kernel and version identifiers (UTS: Unix Timesharing System).
- usr namespace (USR): Isolates user IDs, meaning it separates user IDs between the host and container.
- Control Group namespace(cgroup): Isolates the control group information from the container process.

> you can list the namespaces in a Linux machine using the lsns command.

### Cgroups

- Starting a process in linux doesn't require specifying resources usage and linux kernel takes care of it.
- Cgroups (Control Groups) are a Linux kernel feature that is used when you want to control the resources usage(CPU, memory, disk I/O, network) for processes.
- Each container gets its own set of cgroups to ensure that it does not use more resources than it is allocated.
- This prevents one container from consuming all the resources and starving other containers.

### Layered File Systems

- Container uses layered file systems to store and manage their files.
- When a container is created, it starts with a base image and then adds layers on top of it.
- This allows containers to share common layers and reduces the amount of disk space required.
- The layered file system is implemented using a technology called UnionFS (Union File System).
- UnionFS lets you mount a filesystem using 2 directories: a “lower” directory, and an “upper” directory.
- The lower directory of the filesystem is read-only
  - Cannot be modified
  - Shared between containers
  - Built once, reused forever
- the upper directory of the filesystem can be both read to and written from
  - Can be modified
  - Unique to each container
  - Where all changes go

- When the container is created, it will have the read-only base image. It contains
  - OS
  - Runtime (Node.js)
  - Dependencies
  - Configuration files
  - Application code
  - Static assets
  - Metadata
- When the container is running, it will have a writable layer on top of the base image. When container is running, all changes are written to the writable layer.
  - When container stops, data stays in writable layer.
  - When container removed, Only writable layer deleted and image is UNCHANGED, Data LOST (unless in volume - A folder on your computer, An external hard drive).

> Containers have only one parent process and all other processes are child processes of that parent process.

### Files and Folders in containers base images

- `/bin`: contains binary executable files, such as the ls, cp, and ps commands.
- `/sbin`: contains system binary executable files, such as the init and shutdown commands.
- `/etc`: contains configuration files for various system services.
- `/lib`: contains library files that are used by the binary executables.
- `/usr`: contains user-related files and utilities, such as applications, libraries, and documentation.
- `/var`: contains variable data, such as log files, spool files, and temporary files.
- `/root`: is the home directory of the root user.

### Files and Folders that containers use from host operating system

- The host's file system: Docker containers can access the host file system using bind mounts, which allow the container to read and write files in the host file system.
- Networking stack: The host's networking stack is used to provide network connectivity to the container. Docker containers can be connected to the host's network directly or through a virtual network.
- System calls: The host's kernel handles system calls from the container, which is how the container accesses the host's resources, such as CPU, memory, and I/O.
- Namespaces: Docker containers use Linux namespaces to create isolated environments for the container's processes. Namespaces provide isolation for resources such as the file system, process ID, and network.
- Control groups (cgroups): Docker containers use cgroups to limit and control the amount of resources, such as CPU, memory, and I/O, that a container can access.

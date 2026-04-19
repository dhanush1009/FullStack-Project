FROM jenkins/jenkins:lts
USER root

# Install Docker CLI and Docker Compose so Jenkins can execute pipeline commands
RUN apt-get update && \
    apt-get install -y docker.io docker-compose && \
    rm -rf /var/lib/apt/lists/*

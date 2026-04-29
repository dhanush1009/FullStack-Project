FROM jenkins/jenkins:lts
USER root

# Install Docker CLI and Docker Compose so Jenkins can execute pipeline commands
RUN apt-get update && \
    apt-get install -y docker.io docker-compose && \
    rm -rf /var/lib/apt/lists/*

# Install Prometheus plugin to expose Jenkins metrics endpoint (/prometheus)
RUN jenkins-plugin-cli --plugins prometheus

# Fix JENKINS-48300: Increase heartbeat interval for durable task executor to handle slow filesystems
ENV JAVA_OPTS="-Dorg.jenkinsci.plugins.durabletask.BourneShellScript.HEARTBEAT_CHECK_INTERVAL=86400 ${JAVA_OPTS}"

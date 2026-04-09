FROM jenkins/jenkins:lts

USER root

# Basic tools
RUN apt-get update && apt-get install -y \
    bash curl unzip git ca-certificates gnupg lsb-release \
    && rm -rf /var/lib/apt/lists/*

# -----------------------------
# Install Node.js 18+
# -----------------------------
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get update && apt-get install -y nodejs \
    && rm -rf /var/lib/apt/lists/*

# -----------------------------
# Install Docker CLI
# -----------------------------
RUN curl -fsSL https://download.docker.com/linux/debian/gpg \
    | gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg \
    && echo "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] \
      https://download.docker.com/linux/debian $(lsb_release -cs) stable" \
      > /etc/apt/sources.list.d/docker.list \
    && apt-get update && apt-get install -y docker-ce-cli \
    && rm -rf /var/lib/apt/lists/*

# -----------------------------
# Install AWS CLI v2
# -----------------------------
RUN curl -fsSL "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o /tmp/awscliv2.zip \
    && unzip /tmp/awscliv2.zip -d /tmp \
    && /tmp/aws/install \
    && rm -rf /tmp/aws /tmp/awscliv2.zip

# -----------------------------
# Install Terraform
# -----------------------------
RUN curl -fsSL https://releases.hashicorp.com/terraform/1.8.5/terraform_1.8.5_linux_amd64.zip -o terraform.zip \
    && unzip terraform.zip \
    && mv terraform /usr/local/bin/ \
    && rm terraform.zip

# -----------------------------
# Install kubectl
# -----------------------------
RUN curl -LO "https://dl.k8s.io/release/v1.30.0/bin/linux/amd64/kubectl" \
    && chmod +x kubectl \
    && mv kubectl /usr/local/bin/

# -----------------------------
# Install eksctl
# -----------------------------
RUN curl --silent --location "https://github.com/weaveworks/eksctl/releases/latest/download/eksctl_$(uname -s)_amd64.tar.gz" -o eksctl.tar.gz \
    && tar -xzf eksctl.tar.gz \
    && mv eksctl /usr/local/bin/ \
    && rm eksctl.tar.gz

# Docker group access
RUN groupadd -f docker && usermod -aG docker jenkins

USER jenkins

ENV PATH="/usr/local/bin:${PATH}"
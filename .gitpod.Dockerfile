FROM gitpod/workspace-full

# Install & use custom Node.js version
ENV NODE_VERSION=10.19.0
RUN bash -c ". .nvm/nvm.sh && \
        nvm install ${NODE_VERSION} && \
        nvm alias default ${NODE_VERSION} \
        sudo apt-get install libusb-dev"
ENV PATH=/home/gitpod/.nvm/versions/node/v${NODE_VERSION}/bin:$PATH

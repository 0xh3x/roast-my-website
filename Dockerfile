FROM node:18.13.0

# RUN apt-get update && apt-get install -y python make gcc g++ 

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true

# Install google-chrome-stable
RUN apt-get update && apt-get install gnupg wget -y && \
    wget --quiet --output-document=- https://dl-ssl.google.com/linux/linux_signing_key.pub | gpg --dearmor > /etc/apt/trusted.gpg.d/google-archive.gpg && \
    sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' && \
    apt-get update && \
    apt-get install google-chrome-stable -y --no-install-recommends && \
    rm -rf /var/lib/apt/lists/*


# RUN /usr/bin/google-chrome --version
WORKDIR /app

# Copy and setup your project 

COPY package*.json ./


RUN npm install
RUN npm install pm2 -g

COPY . .

EXPOSE 3000


CMD ["npm", "run", "dev"]

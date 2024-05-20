# Usa una imagen base de Node.js
FROM node:18

# Instala dependencias necesarias
RUN apt-get update && apt-get install -y wget gnupg ca-certificates

# Instala Chrome/Chromium
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && echo "deb http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list \
    && apt-get update \
    && apt-get install -y google-chrome-stable

# Establece una variable de entorno para Puppeteer
ENV PUPPETEER_EXECUTABLE_PATH="/usr/bin/google-chrome-stable"

# Establece el directorio de trabajo
WORKDIR /usr/src/app

# Copia los archivos del proyecto al contenedor
COPY package.json ./
COPY package-lock.json ./

# Instala las dependencias del proyecto
RUN npm install


# Copia el resto de los archivos al contenedor
COPY . .

# Compilar aplicación
RUN npm run build

# Inicia tu aplicación
CMD ["npm", "start"]
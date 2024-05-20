# Usa una imagen base de Node.js ligera
FROM node:18-slim

# Instala dependencias necesarias y limpia la caché después
RUN apt-get update && apt-get install -y wget gnupg ca-certificates \
    && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && echo "deb http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list \
    && apt-get update \
    && apt-get install -y google-chrome-stable \
    && rm -rf /var/lib/apt/lists/* /var/cache/apt/archives/*

# Establece una variable de entorno para Puppeteer
ENV PUPPETEER_EXECUTABLE_PATH="/usr/bin/google-chrome-stable"

# Establece el directorio de trabajo
WORKDIR /usr/src/app

# Copia los archivos del proyecto al contenedor
COPY package.json package-lock.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia el resto de los archivos al contenedor
COPY . .

# Compilar aplicación
RUN npm run build

# Expone el puerto que utiliza la aplicación
EXPOSE 3000

# Inicia tu aplicación
CMD ["npm", "start"]

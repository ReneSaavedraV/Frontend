# Guía de instalación 🛠

Abrir una terminal en el root del repositorio y ejecutar el siguiente comando para instalar todos los módulos necesarios:

```bash
yarn install
```

Crear el archivo `.env` en la carpeta Frontend y agregar las variables de entorno necesarias para la conexión a la API:

```bash
touch .env
```

```bash
echo 'VITE_BACKEND_URL="http://localhost:3000"' >> .env
```

Ahora se puede iniciar el servidor de dev:

```bash
yarn dev
```

# Desarrollo 💻

Correr lint cada vez que se haga un commit:

```bash
yarn run eslint --fix
```

Para mandar una request que necesita autenticación, obtener el token de la sesión actual y agregarlo al header de la request:

```javascript
const token = localStorage.getItem('token');
```

```plaintext
                  Hola grupo!!!
⠀⠀⢀⣀⠤⠿⢤⢖⡆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀ 
⡔⢩⠂⠀⠒⠗⠈⠀⠉⠢⠄⣀⠠⠤⠄⠒⢖⡒⢒⠂⠤⢄⠀⠀⠀⠀ 
⠇⠤⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠀⠀⠈⠀⠈⠈⡨⢀⠡⡪⠢⡀⠀ 
⠈⠒⠀⠤⠤⣄⡆⡂⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠢⠀⢕⠱⠀ ⠀⠀⠀⠀⠀
      ⠈⢳⣐⡐⠐⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠀⠁⠇ ⠀⠀⠀⠀⠀⠀⠀
         ⠑⢤⢁⠀⠆⠀⠀⠀⠀⠀⢀⢰⠀⠀⠀⡀⢄⡜⠀ ⠀⠀⠀⠀⠀⠀⠀⠀
         ⠘⡦⠄⡷⠢⠤⠤⠤⠤⢬⢈⡇⢠⣈⣰⠎⠀⠀ ⠀⠀⠀⠀⠀⠀⠀⠀⠀
           ⣃⢸⡇⠀⠀⠀⠀⠀⠈⢪⢀⣺⡅⢈⠆⠀⠀ ⠀⠀⠀⠀⠀⠀⠀
        ⠶⡿⠤⠚⠁⠀⠀⠀⢀⣠⡤⢺⣥⠟⢡⠃⠀⠀⠀ ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
                    ⠀⠀⠀⠀⠉⠉⠀⠀⠀
```

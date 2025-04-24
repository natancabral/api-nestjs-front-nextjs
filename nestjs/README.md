# AMBEV Project

### O que poderia melhorar (tempo limitado do teste 24h)
- Usuário e cadastro em tabelas diferentes ou gerenciador de credencial com Cognito (fácil aplicação)
- Usar use case 
- Criar exceptions controlados, com códigos de erro
- Secret estar na AWS ou Google Secret Manager
- Assinar token com chave privada e verificar com pública através de openssl
- Grupos de acesso, admin, client, employer (listar, editar, criar)
- Mais testes
- Yup nos formulários do front
 
### Init

- Terminal:

```sh
# docker-compose.yml
$ sudo docker compose up

# UNIX
$ chmod +x ./setup.sh
$ chmod +x ./nestjs/setup.sh

# MacOS
$ chmod -R 777 ./setup.sh
$ chmod -R 777 ./nestjs/setup.sh

# Start
$ ./setup.sh
```

### Docker
```sh
# docker-compose.yml
$ sudo docker compose up
```

### Node version

```sh
# .nvmrc file
$ nvm use
```


### Start

```sh
# Backend
cd ./nestjs
yarn start:debug

# FrontEnd
cd ./nextjs
yarn dev
```

### Front end
- http://localhost:3000

### Swagger
- $ yarn start:debug
- http://localhost:3077/swagger
- $ yarn start
- http://localhost:3002/swagger



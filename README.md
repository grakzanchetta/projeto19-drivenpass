# projeto19-drivenpass

## Rota <span style="color:yellow"> **POST** </span>/signup

Essa é uma rota <span style="color:red"> **NÃO** </span> autenticada Sua função é criar novos usuários.

O Body da requisição deve ser feito no seguinte formato:

```json
{
  "email": "email_do_usuario", //string
  "password": "senha_do_usuario" //string
}
```

### Regras de Uso: 
A senha deve ter no mínimo 10 caracteres, do contrário, a requisição terminará com erro de status 401 (Unauthorized)

## Rota <span style="color:yellow"> **POST** </span>/login

Essa é uma rota <span style="color:red"> **NÃO** </span> autenticada Sua função é fazer login.

O Body da requisição deve ser feito no seguinte formato:

```json
{
  "email": "email_do_usuario", //string
  "password": "senha_do_usuario" //string
}
```

### Regras de Uso: 
Usuário e senha devem ser compatíveis. E-mail não existente ou incorreto retorna status 422, senha incorreta retorna 401. Requisições bem sucedidas retornam o JWT token necessário para autenticação em <span style="color:crimson"> **TODAS** </span> as rotas descritas a seguir.

# Todas as rotas a seguir são autenticadas com um token JWT no formato 'Bearer'.

# Rotas de Cartões

## Rota <span style="color:yellow"> **POST** </span>/cards

Essa rota tem como função realizar a adição de informações relativas à cartões.

O Body da requisição deve ser feito no seguinte formato:

```json
{
  "cardTag":"nome_do_registro", //string
  "cardNumber":"numero_do_cartao", //string
  "cardName":"nome_do_cartão", //string
  "cvc":"codigo_do_cartão", //string
  "expirationDate":"data_de_expiração", //string
  "password":"senha_do_cartão", //string
  "isVirtual":"se_o_cartão_está_ativo", //boolean
  "type":"tipo_do_cartão" //'credit', 'debit' ou 'both'
}
```
### Regras adicionais de Uso: 
cardNumber e cvc aceitam apenas números, embora sejam strings, além disso devem ter obrigatoriamente 16 e 3 caracteres, respectivamente. A cardTag é única para o usuário em questão.

Falhar nos requisitos de preenchimento acarreta numa resposta de status 422, repetir a Tag acarreta numa resposta de status 409. 

A requisição correta trará uma mensagem de confirmação do registro com o a Tag inserida, e o cartão estará adicionado ao banco de dados. 

## Rota <span style="color:green"> **GET** </span>/cards

Essa rota não tem informações no corpo. O intuito é pegar todas as informações de todos os cartões do usuario portador do token em questão.

Uma requisição bem sucedida trará uma resposta como abaixo:

```json
[
  {
    "id": 27,
    "userId": 22,
    "cardTag": "Banco Banco",
    "cardNumber": "1234133412341234",
    "cardName": "Aluno da Driven",
    "cvc": "133",
    "expirationDate": "08/22",
    "password": "euamocodar",
    "isVirtual": false,
    "type": "credit"
  },
  {
    "id": 29,
    "userId": 22,
    "cardTag": "ocnaB ocnaB",
    "cardNumber": "6666133412341234",
    "cardName": "Aluno Não Driven",
    "cvc": "233",
    "expirationDate": "08/22",
    "password": "deletesemwhere",
    "isVirtual": true,
    "type": "credit"
  }
]
```
Nota: Dados sensíveis aparecem descriptografados apenas no ato da requisição. Eles não constam dessa forma no banco.

## Rota <span style="color:green"> **GET** </span>/cards/:id

Essa rota passa como informação o id de um cartão em específico pela rota. O intuito é pegar as informações desse cartão do usuario portador do token em questão.

Buscar ativamente um cartão inexistente, ou que não pertence ao usuário dono do token resultará num resposta de código 401.

Uma requisição bem sucedida trará uma resposta como abaixo:

```json
  {
    "id": 27,
    "userId": 22,
    "cardTag": "Banco Banco",
    "cardNumber": "1234133412341234",
    "cardName": "Aluno da Driven",
    "cvc": "133",
    "expirationDate": "08/22",
    "password": "euamocodar",
    "isVirtual": false,
    "type": "credit"
  }
```
## Rota <span style="color:red"> **DELETE** </span>/cards/:id

Essa rota passa como informação o id de um cartão em específico pela rota. O intuito é deletar as informações de um dado.

Buscar ativamente um cartão inexistente, ou que não pertence ao usuário dono do token resultará num resposta de código 401.

Uma requisição bem sucedida trará como resposta uma confirmação e o id do cartão recém removido.

# Rotas de Notas

## Rota <span style="color:yellow"> **POST** </span>/notas

Essa rota tem como função realizar a adição de anotações.

O Body da requisição deve ser feito no seguinte formato:

```json
{
  "noteTag":"nome_do_registro", //string
  "text":"texto_do_autor" //string
}
```
### Regras adicionais de Uso:

O título deve ter no máximo 50 caracteres, e o texto, 1000. Não respeitar essas regras acarretam em código 400 na resposta, repetir a Tag acarreta numa resposta de status 409. 

A requisição correta trará uma mensagem de confirmação do registro com a Tag inserida, e a nota estará adicionada ao banco de dados. 

## Rota <span style="color:green"> **GET** </span>/notes

Essa rota não tem informações no corpo. O intuito é pegar todas as informações de todos as notas do usuario portador do token em questão.

Uma requisição bem sucedida trará uma resposta como abaixo:

```json
[
  {
    "id": 14,
    "userId": 21,
    "noteTag": "titulo 1",
    "text": "texto 1"
  },
  {
    "id": 15,
    "userId": 21,
    "noteTag": "titulo 2",
    "text": "texto 2"
  }
]
```
Nota: Dados sensíveis aparecem descriptografados apenas no ato da requisição. Eles não constam dessa forma no banco.

## Rota <span style="color:green"> **GET** </span>/notes/:id

Essa rota passa como informação o id de uma nota em específico pela rota. O intuito é pegar as informações dessa nota do usuario portador do token em questão.

Buscar ativamente uma nota inexistente, ou que não pertence ao usuário dono do token resultará num resposta de código 401.

Uma requisição bem sucedida trará uma resposta como abaixo:

```json
{
  "id": 16,
  "userId": 21,
  "noteTag": "titulo 2",
  "text": "texto da nota"
}
```
## Rota <span style="color:red"> **DELETE** </span>/notes/:id

Essa rota passa como informação o id de uma nota em específico pela rota. O intuito é deletar as informações de um dado.

Buscar ativamente uma nota inexistente, ou que não pertence ao usuário dono do token resultará num resposta de código 401.

Uma requisição bem sucedida trará como resposta uma confirmação e o id da nota recém removido.

# Rotas de Wifi

## Rota <span style="color:yellow"> **POST** </span>/wifi

Essa rota tem como função realizar a adição de redes de wifi.

O Body da requisição deve ser feito no seguinte formato:

```json
{
  "wifiTag":"nome_do_registro", //string
  "name":"nome_da_rede", //string
  "password":"senha_da_rede" //string
}
```

## Rota <span style="color:green"> **GET** </span>/wifi

Essa rota não tem informações no corpo. O intuito é pegar todas as informações de todos as redes wifi do usuario portador do token em questão.

Uma requisição bem sucedida trará uma resposta como abaixo:

```json
[
  {
    "id": 6,
    "userId": 22,
    "wifiTag": "wifi1",
    "name": "trabalho",
    "password": "senha2"
  },
  {
    "id": 8,
    "userId": 22,
    "wifiTag": "wifi2",
    "name": "casa",
    "password": "senha"
  }
]
```
Nota: Dados sensíveis aparecem descriptografados apenas no ato da requisição. Eles não constam dessa forma no banco.

## Rota <span style="color:green"> **GET** </span>/notewifis/:id

Essa rota passa como informação o id de um wifi em específico pela rota. O intuito é pegar as informações desse wifi do usuario portador do token em questão.

Buscar ativamente um wifi inexistente, ou que não pertence ao usuário dono do token resultará num resposta de código 401.

Uma requisição bem sucedida trará uma resposta como abaixo:

```json
{
  "id": 6,
  "userId": 22,
  "wifiTag": "padaria",
  "name": "wifi_padaria",
  "password": "senha4"
}
```
## Rota <span style="color:red"> **DELETE** </span>/notes/:id

Essa rota passa como informação o id de umwifi em específico pela rota. O intuito é deletar as informações de um dado.

Buscar ativamente um wifi inexistente, ou que não pertence ao usuário dono do token resultará num resposta de código 401.

Uma requisição bem sucedida trará como resposta uma confirmação e o id do wifi recém removido.
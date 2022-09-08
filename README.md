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

# Todas as rotas a seguir são autenticadas com um token no formato 'Bearer'

## Rota <span style="color:yellow"> **POST** </span>/card

Essa é uma rota tem como função é função realizar a adição de informações relativas à cartões.

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
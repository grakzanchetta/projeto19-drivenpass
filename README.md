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
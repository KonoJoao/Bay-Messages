# Bay Messages

Construção de Software<br></br>
Engenharia de Software
2024-01<br></br>
Versão 1.0<br></br>
API intermediadora de mensagens que, tem como foco, registrar mensagens que são enviadas de um usuário cadastrado, nos serviços da api, para outro usuário, também cadastrado.

1. Gabriel Borges Garcia
2. Jheissyane Kelly
3. João Vitor Alves
4. Mateus Henrique Gandi de Oliveira

Elias Ferreira
Engenharia de Software - Instituto de Informática/UFG

## Introdução

API intermediadora de mensagens que engloba a criação de contas verificáveis a partir do número de telefone informado, no qual é enviado um sms com um código que coincide com o cadastrado no banco de dados junto às informações do usuário para verificação de identidade. Em posse da aplicação, o usuário estando devidamente cadastrado com nome, telefone e uma senha, poderá enviar mensagens diretamente para outra pessoa, estando em posse, para isso, do número de telefone da mesma. Seguindo uma conexão par a par, ocorrerá uma troca de mensagens entre ambos na forma de remetente e destinatário, ordenadas por data e ordem de envio.
A fim de regulamentar o uso correto e ético da aplicação, promovendo um ambiente acessível para todas as idades, a aplicação contará com o filtro para mensagens de cunho malicioso, impedindo que xingamentos, ofensas e outras palavras de baixo calão sejam deferidas aos usuários, evitando o desde já o envio da mensagem. Assim como feito automaticamente pelo sistema, o usuário também poderá denunciar outras contas por comportamentos inadequados, estando este banido do sistema por tempo determinado quando atingir o limite de denúncias, sem poder enviar mensagens durante esse tempo.
O sistema também implementa mensagens em grupo, grupo este que o usuário que tiver acesso através de uma solicitação de acesso aprovada por um administrador e criador do grupo - cujos controles permitem adicionar e remover pessoas - poderá enviar mensagens que ficarão cadastradas e armazenadas junto ao grupo, acessadas por quem estiver nele.

## Casos de Uso

### Cadastro de Usuário

Atores:

    Usuário

Pré-condições:

    O usuário possui um número de telefone celular válido.

Fluxo:

    O usuário insere seu número de telefone celular, nome e senha.

Pós-condições:

    Um token é enviado por sms para o número do usuário.

### Verificação de Telefone

Atores:

    Usuário

Pré-condições:

    O usuário iniciou o cadastro.

Fluxo:

    O sistema envia um SMS com um código de verificação para o número de telefone celular do usuário.
    O usuário insere o código de verificação e o número do telefone na validação do cadastro.
    O sistema verifica o código de verificação e confirma a conta do usuário.

Pós-condições:

    O usuário está cadastrado com sucesso.

### Enviar Mensagem

Atores:

    Remetente (Usuário)
    Destinatário (Usuário)

Pré-condições:

    O remetente conhece o número de telefone celular do destinatário.

Fluxo:

    O remetente compõe uma mensagem e insere o número de telefone celular do destinatário na tela de composição de mensagem.
    O sistema verifica a mensagem em busca de palavrões e linguagem ofensiva.
    Se a mensagem estiver limpa, o sistema a envia ao destinatário.
    Se a mensagem contiver palavrões ou linguagem ofensiva, o sistema exibe uma mensagem de alerta para o remetente, censura a mensagem e a envia.

Pós-condições:

    A mensagem é enviada ao destinatário.

### Visualizar Mensagens Enviadas

Atores:

    Remetente (Usuário)

Fluxo:

    O remetente seleciona o destinatário desejado na lista de conversas.
    O sistema recupera as mensagens enviadas para o destinatário selecionado e as exibe em ordem cronológica.

Pós-condições:

    As mensagens enviadas são exibidas para o remetente.

### Denunciar Usuário ou Mensagem

Atores:

    Denunciante (Usuário)

Fluxo:

    O denunciante seleciona o usuário ou mensagem que deseja denunciar.
    O denunciante seleciona o motivo da denúncia em uma lista de opções.
    O denunciante envia a denúncia.

### Visualizar Mensagens Recebidas

Atores:

    Destinatário (Usuário)

Pré-condições:

    O destinatário está logado no sistema.

Fluxo:

    O destinatário seleciona a conversa desejada na lista de conversas.
    O sistema recupera as mensagens recebidas para a conversa selecionada e as exibe em ordem cronológica.

Pós-condições:

    As mensagens recebidas são exibidas para o destinatário.

### Criar Grupo

Atores:

    Criador do Grupo (Usuário)

Pré-condições:

    O criador do grupo está logado no sistema.

Fluxo:

    O criador do grupo insere o nome do grupo e adiciona membros ao grupo.
    O sistema cria o grupo e define o criador do grupo como administrador do grupo.

Pós-condições:

    O grupo é criado e o criador do grupo é definido como administrador do grupo.

### Adicionar Membro ao Grupo

Atores:

    Administrador do Grupo (Usuário)

Pré-condições:

    O administrador do grupo tem a autoridade para adicionar membros ao grupo.

Fluxo:

    O administrador do grupo seleciona o grupo ao qual deseja adicionar um membro.
    O administrador do grupo insere o número de telefone do usuário que deseja adicionar ao grupo.

Pós-condições:

    O usuário é adicionado ao grupo.

### Remover Membro do Grupo

Atores:

    Administrador do Grupo (Usuário)

Pré-condições:

    O administrador do grupo tem a autoridade para remover membros do grupo.

Fluxo:

    O administrador do grupo seleciona o grupo do qual deseja remover um membro.
    O administrador do grupo seleciona o membro que deseja remover do grupo pelo telefone.

Pós-condições:

    O membro é removido do grupo.

## Regras de Negócio

- Se um usuário for banido, passará uma hora sem mandar mensagens.
- Mensagens julgadas impróprias deverão ser censuradas.
- Um grupo deverá possuir no mínimo 1 membro para existir.
- Cada número deverá possuir somente 1 cadastro correspondente.
- Somente usuários participantes de um chat poderão interagir com ele.
- O usuário deve estar logado para utilizar as funcionalidades do sistema.
- Apenas usuários autenticados podem enviar mensagens.

## Diagrama de classe

![bLF1Zjem43tZhx1o2jM2sXuHGfkILKMrBAj2Fs18fgpLn5xPJbILzjyxiN6SHDj3EOJupMFUcpVctbZGjgahLbHW3Fzc6j12NHdlFg9SyKSbB_vaiSBlIk8Gawgcyz5g4H23yWN6q1caA5LcYPc3HTQXCuwo5Q3tA0rSi4wtBs3dlg8HAl4BT8woaOM0rE6SL-e2EXtRk1iBpiVABJKgGP_K3vIfxPu3uYUbAWJfcHVKWHTx_66tM8BBV-](https://github.com/KonoJoao/Bay-Messages/assets/76479617/79c40d6b-45bd-412f-ae3d-98e2faac0808)

### Classe Usuario

Representa o usuário que estará utilizando o sistema. Seu cadastro requer telefone, nome e senha. Além das operações de CRUD realizadas com a classe Usuário, ele também pode enviar mensagem, realizar denúncias e logar com auxílio de token.

### Enum MotivoDenuncia

Representa os possíveis motivos para denunciar uma mensagem ou usuário.

### Classe Moderador

Representa as denuncias feitas pelo usuario e atua com midleware para evitar mensagens fora do padrão. Ela está associada ao usuário que realizou a denúncia e ao que foi denunciado, além de carregar um motivo listado no EnumMotivoDenuncia.

### Classe Abstrata Chat

Representa uma classe que será herdada por ConversaPrivada e Grupo, carrega os atributos básicos de um chat como id e a possibilidade de adicionar mensagem.

### Classe ConversaPrivada

Representa uma conversa entre dois usuários. Herda os atributos e métodos básicos da classe abstrata Chat.

### Classe Grupo

Representa uma conversa em grupo entre diversos usuários. Herda os atributos básicos de da classe abstrata Chat e implementa atributos como nome do grupo e usuário administrador. Além de possuir métodos para adicionar ou remover usuários do grupo.

### Classe Mensagem

Representa as mensagens enviadas em um chat. Está relacionada ao chat em que foi enviada, armazena data e conteúdo da mensagem. Além disso, também se relaciona ao módulo de análise de mensagem que verifica se há conteúdo "malicioso" no conteúdo.

## Endpoints

### POST registrar

    http://localhost:3000/usuario/cadastrar

Body da Requisição

```json
{
  "nome": "mateus ganders",
  "telefone": "+5562907957432",
  "codigoVerificacao": 855014,
  "senha": "ganders"
}
```

Body da Resposta

```json
{
  "telefone": "+5562907957432",
  "nome": "mateus ganders",
  "senha": "ganders",
  "banidoAte": null,
  "codigoVerificacao": 855014,
  "id": 13
}
```

### POST enviar código sms

    http://localhost:3000/usuario/enviarCodigoVerificacao

Body da Requisição

```json
{
  "telefone": "+5562907957432"
}
```

Body da Resposta

```json
{
  "message": "sms enviado"
}
```

### POST logar

    http://localhost:3000/auth/login

Body da Requisição

```json
{
  "telefone": +5562994459111,
  "senha": 123456
}
```

Body da Resposta

```json
{
  "access_token": ""
}
```

### PATCH atualizar

    http://localhost:3000/usuario/atualizar

Headers

```json
{
  "token": "" //insere token válido
}
```

Body da Requisição

```json
{
  "id": 11,
  "nome": "jheissyane"
}
```

Body da Resposta

```json
{
  "id": 11,
  "nome": "jheissyane",
  "telefone": "+5562985304932",
  "senha": "asd12",
  "banidoAte": null,
  "codigoVerificacao": null
}
```

### GET listar por telefone

    http://localhost:3000/usuario/encontraPorTelefone

Body da Requisição

```json
{
  "telefone": "+5562985304932"
}
```

Body da Resposta

```json
{
  "id": 11,
  "nome": "jheissyane",
  "telefone": "+5562985304932",
  "senha": "asd12",
  "banidoAte": null,
  "codigoVerificacao": null
}
```

### DELETE deletar usuario

    http://localhost:3000/usuario/deletar

Headers

```json
{
  "token": "" //insere token válido
}
```

Body da Requisição

```json
{
  "id": 7
}
```

Body da Resposta

```json
{
  "id": 7,
  "nome": "deftonerson",
  "telefone": "+5562994459111",
  "senha": "teste",
  "banidoAte": "2024-07-31T01:45:11.000Z",
  "codigoVerificacao": null
}
```

### GET mensagens de um chat

    http://localhost:3000/message/{id}?telefone={telefone}

Headers

```json
{
  "token": "" //insere token válido
}
```

Body da Resposta

```json
{
[
	{
		"idMessage": 55,
		"createdAt": "2024-08-02T00:42:52.000Z",
		"text": "tentativa de conversa normalmente teste",
		"telefone": "+5562940028923",
		"censurado": false
	},
	{
		"idMessage": 56,
		"createdAt": "2024-08-02T00:43:16.000Z",
		"text": "tentativa de conversa normalmente teste2",
		"telefone": "+5562994459111",
		"censurado": false
	},
	{
		"idMessage": 57,
		"createdAt": "2024-08-02T00:43:27.000Z",
		"text": "tentativa de conversa normalmente teste3",
		"telefone": "+5562940028923",
		"censurado": false
	}
]
}
```

### POST enviar mensagem

    http://localhost:3000/message/{id}

Body da Requisição

```json
{
  "text": "Oii",
  "telefone": "+5562985304972"
}
```

Headers

```json
{
  "token": "" //insere token válido
}
```

Body da Resposta

```json
{
  "idMessage": 1,
  "text": "Oii",
  "telefone": "+5562985304972",
  "createdAt": "12/06/2023",
  "censurado": false,
  "chat": {
    "id": "id"
  }
}
```

### PUT mensagem

    http://localhost:3000/message/{id}?telefone={telefone}&text={text}

Headers

```json
{
  "token": "" //insere token válido
}
```

Body da Resposta

```json
{
  "idMessage": "id",
  "text": "text",
  "telefone": "telefone",
  "createdAt": "12/06/2023",
  "censurado": false,
  "chat": {
    "id": 2
  }
}
```

### DELETE mensagem

    http://localhost:3000/message/{id}?telefone={telefone}

Headers

```json
{
  "token": "" //insere token válido
}
```

Body da Resposta

```json
{
  "message": "Mensagem de id {id} deletada"
}
```

### POST desbloquear contato

    http://localhost:3000/moderador/denunciarContato

Body da Requisição

```json
{
  "chatId": 28,
  "telefone": "+5562940028923"
}
```

Headers

```json
{
  "token": "" //insere token válido
}
```

Body da Resposta

```json
{
  "flagGrupo": false,
  "nome": "",
  "administrador": "",
  "id": 28,
  "usuarios": [
    {
      "id": 12,
      "nome": "teste final",
      "telefone": "+5562940028923",
      "senha": "teste final", //removido
      "banidoAte": "2024-08-02T16:42:15.000Z",
      "codigoVerificacao": null
    }
  ],
  "bloqueados": []
}
```

### POST denunciar contato

    http://localhost:3000/moderador/denunciarContato

Body da Requisição

```json
{
  "mensagem": "puta",
  "motivo": "IMORALIDADE",
  "chatId": 28,
  "telefone": "+5562940028923"
}
```

Headers

```json
{
  "token": "" //insere token válido
}
```

Body da Resposta

```json
{
  "status": true,
  "banimento": {
    "data": "2024-08-02T19:56:59.525Z",
    "message": "Usuário banido por uma (1) hora!"
  }
}
```

### POST bloquear contato

    http://localhost:3000/moderador/denunciarContato

Body da Requisição

```json
{
  "mensagem": "oi bom dia",
  "motivo": "CONTATO INDESEJADO",
  "chatId": 28,
  "telefone": "+5562940028923"
}
```

Headers

```json
{
  "token": "" //insere token válido
}
```

Body da Resposta

```json
{
  "status": true,
  "banimento": {
    "data": "2024-08-02T19:01:01.356Z",
    "message": "contato bloqueado no chat com sucesso!"
  }
}
```

### POST adicionar usuário no grupo

    http://localhost:3000/chat/adicionar

Body da Requisição

```json
{
  "id": 13,
  "telefone": "+5562994459111",
  "administrador": "+5562985304972"
}
```

Headers

```json
{
  "token": "" //insere token válido
}
```

Body da Resposta

```json
{
  "flagGrupo": true,
  "nome": "teste",
  "administrador": "+5562985304972",
  "id": 13,
  "usuarios": [
    {
      "id": 6,
      "nome": "testet",
      "telefone": "+5562985304972",
      "senha": "asdwqdw",
      "banidoAte": null,
      "codigoVerificacao": "353360"
    },
    {
      "id": 7,
      "nome": "deftonerson",
      "telefone": "+5562994459111",
      "senha": "teste",
      "banidoAte": null,
      "codigoVerificacao": "666666"
    }
  ]
}
```

### POST remover usuário do grupo

    http://localhost:3000/chat/remover

Body da Requisição

```json
{
  "id": 13,
  "telefone": "+5562994459111",
  "administrador": "+5562985304972"
}
```

Headers

```json
{
  "token": "" //insere token válido
}
```

Body da Resposta

```json
{
  "flagGrupo": true,
  "nome": "teste",
  "administrador": "+5562985304972",
  "id": 13,
  "usuarios": [
    {
      "id": 6,
      "nome": "testet",
      "telefone": "+5562985304972",
      "senha": "asdwqdw",
      "banidoAte": null,
      "codigoVerificacao": "353360"
    }
  ]
}
```

### GET listar membros do grupo

    http://localhost:3000/chat/grupo/{id}

Headers

```json
{
  "token": "" //insere token válido
}
```

Body da Resposta

```json
        {
[
          {
            "id": 6,
            "nome": "testet",
            "telefone": "+5562985304972",
            "senha": "asdwqdw",
            "banidoAte": null,
            "codigoVerificacao": "353360",
          },
          {
            "id": 7,
            "nome": "deftonerson",
            "telefone": "+5562994459111",
            "senha": "teste",
            "banidoAte": null,
            "codigoVerificacao": "666666",
          }
        ]
}
```

### DELETE chat

    http://localhost:3000/chat/{id}

Headers

```json
{
  "token": "" //insere token válido
}
```

Body da Resposta

```json
{
  "message": "Chat de id 26 deletada"
}
```

## Testes

### CT1: "Cadastro de Usuário com dados corretos com telefone válido"

### Entrada:

```json
{
  "nome": "Mateus Henrique",
  "celular": 62991919191,
  "senha": "teste123"
}
```

### Saída:

```json
{
  "status": true,
  "message": "Um sms foi enviado a 62991919191 com um código de verificação!"
}
```

### CT2: "Cadastro de Usuário com dados corretos mas com telefone inválido"

### Entrada:

```json
{
  "nome": "Mateus Henrique",
  "calular": 62900000000,
  "senha": "teste123"
}
```

### Saída:

```json
{
  "status": false,
  "message": "Número de telefone inválido!"
}
```

### CT3: "código de verificação convergente ao enviado via SMS"

### Entrada:

```json
{
  "codigo": 1234,
  "calular": 62991919191
}
```

### Saída:

```json
{
  "status": true,
  "token": "kxhggfxuvjiodvijxivub27w67btsve6cacxg7",
  "message": "Código válido!"
}
```

### CT4: "código de verificação divergente ao enviado via SMS"

### Entrada:

```json
{
  "codigo": 1000,
  "calular": 62991919191
}
```

### Saída:

```json
{
  "status": false,
  "message": "Código inválido!"
}
```

### CT5:"Envio de mensagem dentro dos padrões de uso"

### Entrada:

```json
{
  "token": "kxhggfxuvjiodvijxivub27w67btsve6cacxg7",
  "text": "Olá usuário A",
  "telefone": "62992929292",
  "id": 2
}
```

### Saída:

```json
{
  "idMessage": 1,
  "chat": {
    "flagGrupo": true,
    "nome": "testexb",
    "administrador": "62985308972",
    "id": 2,
    "usuarios": []
  },
  "createdAt": "2024-07-26T14:39:58.118Z",
  "text": "Olá usuário A",
  "telefone": "62992929292",
  "censurado": false
}
```

### CT6:"Envio de mensagem parcialmente aplicando os padrões de uso"

### Entrada:

```json
{
  "token": "kxhggfxuvjiodvijxivub27w67btsve6cacxg7",
  "text": "Fiz merda com o trabalho da escola",
  "telefone": "62992929292",
  "id": 2
}
```

### Saída:

```json
{
  "idMessage": 1,
  "chat": {
    "flagGrupo": true,
    "nome": "testexb",
    "administrador": "62985308972",
    "id": 2,
    "usuarios": []
  },
  "createdAt": "2024-07-26T14:39:58.118Z",
  "text": "Fiz **** com o trabalho da escola",
  "telefone": "62992929292",
  "censurado": false
}
```

### CT7:"Envio de mensagem fora dos padrões de uso"

### Entrada:

```json
{
  "token": "kxhggfxuvjiodvijxivub27w67btsve6cacxg7",
  "text": "Seu idiota imprestável!",
  "telefone": "62992929292",
  "id": 2
}
```

### Saída:

```json
{
  "status": false,
  "flagContentController": "OFFENSIVE",
  "mensagemRemaped": "Inflige a política de uso!",
  "message": "Mensagem não enviada!"
}
```

### CT8:"Visualizar mensagens enviadas fornecendo um token e identificação do chat válidos"

### Entrada:

```json
{
  "id": 2,
  "token": "afjayeg343fysheufha8nef23456aeksbyvyvubnizc"
}
```

### Saída:

```json
    {
        [
            {
                "message":"Olá, bom dia!",
                "time": "12/03/2023 14:20",
                "seen": true,
            },  {
                "message":"Olá, como vai?",
                "time": "12/03/2023 14:22",
                "seen": true,
            },  {
                "message":"Tudo certo",
                "time": "12/03/2023 14:24",
                "seen": true,
            },  {
                "from":62992929292,
                "message":"boa...",
                "time": "12/03/2023 14:25",
                "seen": false,
            },
        ]
    }
```

### CT9:"Acessar um chat clandestinamente"

### Entrada:

```json
{
  "id": 3,
  "token": "afjayeg343fysheufha8nef23456aeksbyvyvubnizc"
}
```

### Saída:

```json
{
  "message": "O Usuário não está nesse chat!"
}
```

### CT10:"Denunciar usuário ou mensagem considerada ofensiva"

### Entrada:

```json
{
  "token": "kxhggfxuvjiodvijxivub27w67btsve6cacxg7",
  "userId": 12,
  "mensagemId": 157,
  "text": "Seu imbecil",
  "motivo": "IMORALIDADE"
}
```

### Saída:

```json
{
  "status": true,
  "message": "Mensagem denunciada com sucesso!"
}
```

### CT11:"Denunciar usuário ou mensagem considerada inofensiva"

### Entrada:

```json
{
  "userId": 12,
  "mensagemId": 156,
  "text": "Olá, bom dia",
  "motivo": "IMORALIDADE"
}
```

### Saída:

```json
{
  "status": false,
  "message": "Nenhuma inconformidade encontrada!"
}
```

### CT12: "Criar Grupo"

### Entrada:

```json
{
  "token": "kxhggfxuvjiodvijxivub27w67btsve6cacxg7",
  "nome": "Grupo da TI",
  "administrador": "+5562985304972"
}
```

### Saída:

```json
{
  "flagGrupo": true,
  "nome": "Grupo da TI",
  "administrador": "+5562985304972",
  "usuarios": [
    {
      "id": 1,
      "nome": "testet",
      "telefone": "+5562985304972",
      "senha": "asdwqdw",
      "banidoAte": null,
      "codigoVerificacao": "353360"
    }
  ],
  "id": 1
}
```

### CT13: "Adicionar membro com número de telefone válido"

### Entrada:

```json
{
  "id": 1,
  "telefone": "+556299445911",
  "administrador": "+5562985304972"
}
```

### Saída:

```json
{
  "flagGrupo": true,
  "nome": "grupo teste",
  "administrador": "+5562985304972",
  "id": 1,
  "usuarios": [
    {
      "id": 6,
      "nome": "testet",
      "telefone": "+5562985304972",
      "senha": "asdwqdw",
      "banidoAte": null,
      "codigoVerificacao": "353360"
    },
    {
      "id": 7,
      "nome": "deftonerson",
      "telefone": "+5562994459111",
      "senha": "teste",
      "banidoAte": null,
      "codigoVerificacao": "666666"
    }
  ]
}
```

### CT14: "Adicionar membro com número de telefone inválido"

### Entrada:

```json
{
  "id": 13,
  "telefone": "+556299445911",
  "administrador": "+5562985304972"
}
```

### Saída:

```json
{
  "statusCode": 404,
  "message": "Usuário não encontrado"
}
```

### CT15:"Adicionar número de telefone ao grupo sem ser administrador"

### Entrada:

```json
{
  "id": 13,
  "telefone": "+5562994459111",
  "administrador": "+556298530497"
}
```

### Saída:

```json
{
  "message": "Você não é administrador do grupo",
  "error": "Unauthorized",
  "statusCode": 401
}
```

### CT16:"Remover número de telefone do grupo"

### Entrada:

```json
{
  "id": 13,
  "telefone": "+5562994459111",
  "administrador": "+5562985304972"
}
```

### Saída:

```json
{
  "flagGrupo": true,
  "nome": "grupo teste",
  "administrador": "+5562985304972",
  "id": 13,
  "usuarios": [
    {
      "id": 6,
      "nome": "testet",
      "telefone": "+5562985304972",
      "senha": "asdwqdw",
      "banidoAte": null,
      "codigoVerificacao": "353360"
    }
  ]
}
```

### CT17:"Remover número de telefone que não faz parte do grupo"

### Entrada:

```json
{
  "id": 13,
  "telefone": "+5562994459111",
  "administrador": "+5562985304972"
}
```

### Saída:

```json
{
  "statusCode": 404,
  "message": "Usuário não encontrado"
}
```

### CT18:"Remover número de telefone ao grupo sem ser administrador"

### Entrada:

```json
{
  "id": 13,
  "telefone": "+5562994459111",
  "administrador": "+556298530497"
}
```

### Saída:

```json
{
  "message": "Você não é administrador do grupo",
  "error": "Unauthorized",
  "statusCode": 401
}
```

## Estratégia de controle de versão

O controle de versão é feito por meio de funcionalidades ou adições ao código ou README. Seguindo o critério de não causar bugs a ser seguido.

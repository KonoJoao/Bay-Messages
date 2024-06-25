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
O sistema também implementa mensagens em grupo, grupo este que o usuário que tiver acesso através de uma solicitação de acesso aprovada por um  administrador e criador do grupo - cujos controles permitem adicionar e remover pessoas - poderá enviar mensagens que ficarão cadastradas e armazenadas junto ao grupo, acessadas por quem estiver nele.


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
* Um usuário será banido caso receba 5 denúncias.
* Mensagens julgadas impróprias deverão ser censuradas.
* Um grupo deverá possuir no mínimo 1 membro para existir.
* Cada número deverá possuir somente 1 cadastro correspondente.
* O nome dos usuários deverão possuir entre 3 e 50 caracteres.
* Apenas usuários autenticados podem enviar mensagens.

## Diagrama de classe
![bLF1Zjem43tZhx1o2jM2sXuHGfkILKMrBAj2Fs18fgpLn5xPJbILzjyxiN6SHDj3EOJupMFUcpVctbZGjgahLbHW3Fzc6j12NHdlFg9SyKSbB_vaiSBlIk8Gawgcyz5g4H23yWN6q1caA5LcYPc3HTQXCuwo5Q3tA0rSi4wtBs3dlg8HAl4BT8woaOM0rE6SL-e2EXtRk1iBpiVABJKgGP_K3vIfxPu3uYUbAWJfcHVKWHTx_66tM8BBV-](https://github.com/KonoJoao/Bay-Messages/assets/76479617/79c40d6b-45bd-412f-ae3d-98e2faac0808)



### Classe Usuario
Representa o usuário que estará utilizando o sistema. Seu cadastro requer telefone, nome e senha. Além das operações de CRUD realizadas com a classe Usuário, ele também pode enviar mensagem, realizar denúncias e logar com auxílio de token.

### Enum MotivoDenuncia
Representa os possíveis motivos para denunciar uma mensagem ou usuário.

### Classe Denuncia
Representa as denuncias feitas pelo usuario. Ela está associada ao usuário que realizou a denúncia e ao que foi denunciado, além de carregar um motivo listado no EnumMotivoDenuncia.

### Classe Abstrata Chat
Representa uma classe que será herdada por ConversaPrivada e Grupo, carrega os atributos básicos de um chat como id e a possibilidade de adicionar mensagem.

### Classe ConversaPrivada
Representa uma conversa entre dois usuários. Herda os atributos e métodos básicos da classe abstrata Chat.

### Classe Grupo
Representa uma conversa em grupo entre diversos usuários. Herda os atributos básicos de da classe abstrata Chat e implementa atributos como nome do grupo e usuário administrador. Além de possuir métodos para adicionar ou remover usuários do grupo.

### Classe Mensagem
Representa as mensagens enviadas em um chat. Está relacionada ao chat em que foi enviada, armazena data e conteúdo da mensagem. Além disso, também se relaciona ao módulo de análise de mensagem que verifica se há conteúdo "malicioso" no conteúdo.

### Classe AnalisadorDeMensagem
Representa o módulo que faz a análise do conteúdo das mensagens e sua persistência no banco de dados.

## Endpoints

### POST registrar
    http://localhost:3000/registrar

    Body da Requisição
    {
        "telefone": 62995559111,
        "nome": "João Vitor",
        "senha": 123456
    }
    
    Body da Resposta
    {
    "status": 200,
    "mensagem": "Um código de validação foi enviado para seu telefone"
    }
    
### POST confirmar registro
    http://localhost:3000/registrar/confirmar
### POST logar
    http://localhost:3000/login 
### GET mensagens de um chat
    http://localhost:3000/chat
### POST enviar mensagem
    http://localhost:3000/chat 
### GET mensagens enviadas entre o cliente e outro usuário
    http://localhost:3000/chat/{usuario} 
### PUT mensagem
    http://localhost:3000/chat/{id} 
### DELETE mensagem
    http://localhost:3000/chat/{id} 
### POST denunciar mensagem
    http://localhost:3000/chat/denunciar/mensagem/{id} 
### POST denunciar usuário
    http://localhost:3000/chat/denunciar/usuario/{usuario} 
### POST adicionar usuário no grupo
    http://localhost:3000/chat/adicionar/{usuario} 
### POST remover usuário do grupo
    http://localhost:3000/chat/remover/{usuario} 

## Testes
vazio, por enquanto.
## Gerencia de configuração
vazio, por enquanto

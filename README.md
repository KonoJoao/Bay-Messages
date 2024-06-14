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
    O sistema envia um SMS com um código de verificação para o número de telefone celular do usuário.
    O usuário insere o código de verificação na validação do cadastro.
    O sistema verifica o código de verificação e cria uma conta de usuário para o usuário.
    O sistema envia uma mensagem de confirmação para o número de telefone celular do usuário.

Pós-condições:

    O usuário está cadastrado com sucesso e logado no sistema.

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
    Se a mensagem contiver palavrões ou linguagem ofensiva, o sistema exibe uma mensagem de erro para o remetente, censura a mensagem e a envia.

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
    
*	Eu, como usuário, quero enviar mensagens fornecendo o texto e indicando o usuário que irá recebê-la.
*	Eu, como usuário, quero visualizar todas as mensagens que enviei para determinado usuário por ordem de envio.
*	Eu, como usuário, quero realizar denúncia de usuários e mensagens que julgo serem imorais.
* Eu, como usuario, quero visualizar toda mensagens enviadas para mim.

## Regras de Negócio
* Um usuário será banido caso receba 5 denúncias.
* Mensagens julgadas impróprias deverão ser censuradas.
* Um grupo deverá possuir no mínimo 1 membro para existir.
* Cada número deverá possuir somente 1 cadastro correspondente.
* O nome dos usuários deverão possuir entre 3 e 50 caracteres.
* Apenas usuários autenticados podem enviar mensagens.

## Diagrama de classe
![bLJBRjim43oRNq7e91UnqVPe14LKAoXSn7PGkn-mbbY7gCGDI4eeclRVkwH5cb9pYGu9TpZScNt0TyQ2jbtRiAe1O_Xtqu6M-C9cNDOh_e3gJ4Sh6l43bOY0mfQ2WzNIXqQe9qZY4oXPOs69Ku8LZ77wPaBr4lHMA0DdqURh9x3pouqMqCZVe4kXEbL9oEUKfC4pw7miVJEMcYUQFQMeGH_nfr2vTNyJrcV4He0YsbdeGBg-_ik6yeEv_-](https://github.com/KonoJoao/Bay-Messages/assets/76479617/2839eb4d-0ca6-4781-9ecb-616450f5280f)


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

## Testes
vazio, por enquanto.
## Gerencia de configuração
vazio, por enquanto

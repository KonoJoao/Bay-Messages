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
*  Eu como usuário quero me cadastrar no sistema, fornecendo meu numero de celular, nome e senha para utilizar o sistema.
*	Eu, como usuário, quero enviar mensagens fornecendo o texto e indicando o usuário que irá recebê-la.
*	Eu, como usuário, quero visualizar todas as mensagens que enviei para determinado usuário por ordem de envio.
*	Eu, como usuário, quero realizar denúncia de usuários e mensagens que julgo serem imorais.
* Eu, como usuario, quero visualizar toda mensagens enviadas para mim

## Diagrama de classe
diagrama completo, com todas as classes relacionamentos e atributos. As operações não são necessárias, exceto aquelas que você considerar relevante (se achar). Para cada classe, crie um subtópico explicando sua necessidade e seus atributos (descrição breve). 

![RLJ1Rjim33r7Nq7uv0vDiVLO54Ezk1WoD4cnP1_0HPmhp9OAIJQ6PVltqPfboqbpI4poXU-HZ_23ysXzszJYMADpyCsrQ9Kv2LWeUGTFHbVywAcc7qRJcD2cuM3lhGgX8_s2OonW-93k5DeDQOSLDVdg1VtLMBI4jVgDjYJTwgF2d4kBsbHeypdTDSpQNoMy7RUGQ0_c9-dSzzy9wfCnDQ5cM4KsWgP__nN3o57VnSo_l4cu97hMKA8d3b](https://github.com/KonoJoao/Bay-Messages/assets/76479617/960aea10-383d-41e9-ac8d-aba2135cddbc)

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

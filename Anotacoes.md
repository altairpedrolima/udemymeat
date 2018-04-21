# Anotações do Curso

## Gerando Uma Aplicação

Para gerar uma nova aplicação utilizamos o Angular CLI

Comando para gerar uma aplicação:

`ng new jedy-academy --prefix=jad`

em --prefix coloco um prefixo que vai ser utilizado no inicio de cada componente que for criado no projeto.

O prefixo é útil porque se estivermos usando vários componentes de terceiros em nossa aplicação, não haverá um choque de nomes

Este comando demora para executar pois ele vai criar a estrutura de toda a aplicação e baixar os pacotes que vão ser necessários e utilizados pelo Angular baixando todas as dependencias.

Quando o projeto é gerado ele é gerado numa pasta. Como foi dado o nome de jedy-academy, o projeto será gerado dentro desta pasta.

## Executando o Projeto em Desenvolvimento

Comando:

`ng server`

Este comando starta o servidor em desenvolvimento através do webpack

## Arquitetura

Os quatro principais blocos de construção de uma app Angular são Módulos, Componentes, Diretivas e Serviços.

### Modules

Uma app Angular é composta de módulos que consistem em componentes relacionados que representam uma funcionalidade. Quando criamos a primeira app num projeto, iremos ter apenas um módulo que é o root module com o nome de AppModule. Para aplicações pequenas, o root module pode ser um único módulo, mas a maioria das aplicações possuem multiplos módulos de funcionalidades. Qualquer grupo de componentes que representam um papel pode ser um módulo. Por exemplo: Um app de rede social pode ter módulos de mensagens, posts e assim por diante.

### Components

Com dito anteriormente, um módulo Angular é composto de componentes. Por exemplo, se queremos construir um módulo de vendas podemos dividi-lo em tres componentes: Um componente de barra de pesquisa, outro de barra de rodapé e um terceiro componente de produtos.
Os componentes consistem de um template html e uma classe do componente que tem os dados do componente e a lógica para controlar o template html.
Um componente é simplesmente uma classe em código Typescript que contém propriedades e métodos e que podem ser objetos de reuso.

### Services

Services são classes que irão definir funções específicas que sua aplicação precisa. Por exemplo,login, conversar com servidores backend para obter dados consistidos, validação de intradas de usuários e assim por diante.
Services provem suas funcionalidades para serem consumidas por componentes.
Os componentes devem ser leves, principalmente renderizando views através de seus modelos, suportados pela lógica do aplicativo, para uma melhor experiência do usuário. Eles não buscam dados do servidor ou validam a entrada do usuário, mas delegam essas tarefas aos services.

### Directives

Templates de componentes do Angular são dinamicos. Quando o Angular renderiza-os, eles transformam o DOM de acordo com instruções obtidas por Diretivas. Usamos Diretivas para alterar a aparencia ou o comportamento dos elementos do DOM. Exemplos de diretivas: autoGrow, ngIf, ngClass, ngStyles.

## Estrutura de uma aplicação Angular - Arquivos principais

O projeto Angular segue a estrutura padrão do Node.

### package.json

- Arquivo de configuração da aplicação. Contém todas as dependências.
- Contém os scrips iniciais que podem ser utilizados como o npm starter que chama o "ng server".
- Contém as principais dependencias do Angular em "dependencies" como common, compile, core, forms...
- Contém as depencencias de desenvolvimento (devDependencies) que são aquelas dependencias que são utilizadas somente em desenvolvimento, elas não são necessárias em runtime, como @angular/cli, typescript, etc.

### angular-cli.json

- Arquivo de configuração do @angular/cli.
- Contém algumas coisas que podem ser customizadas como quais arquivos de estilo são usados na aplicação.
- Contém quais scripts são utilizados na aplicação.
- Contém os principais assets da aplicação como a pasta assets que fica dentro da pagina de código fonte, tudo o que estiver nesta pasta será deployado do jeito que está.
- Contém o index e o arquivo principal (main).
- Contém a configuração do compilador do typescript (tsconfig), que é a configuração que o webpack vai utilizar para compilar a nossa aplicação.
- Contém o prefixo que será utilizado na aplicação.
- Contém o arquivo de estilo onde colocamos os css que estaremos utilizando, inicialmente styles.css, mas outros arquivos de estilos podem ser informados.
- Mesma coisa para os arquivos de scripts.

### style.css

- Representa o local onde se pode colocar todos os estilos globais da aplicação. Ele é referenciado no angular-cli.json.

### polyfills.ts

- Contem scripts que darão suporte de funcionalidades nova a browsers antigos. Como as fictures do EcmanScript 2015 ou versões mais futuras do javascript. Ou configurações de internalização ou localicação.

### main.ts

- Arquivo responsável por fazer o bootstrap da aplicação.
- Composto de alguns imports como por exemplo uma função capaz de de habilitar o módulo de produção (enableProdModule). O que irá modificar uma série de coisas para o ambiente de produção como retirar a possibilidade de se fazer debug. O plattaformBrowserDynamic que é importado sempre que carregamos nossa aplicação através do browser.
- Vai importar o módulo principal (AppModulo) gerado pelo @angular/cli.
- E uma constante que vai ajudar ao webpack a determinar se nossa aplicação está em modo do produção ou não.
- E o comando que realmente starta a aplicação, onde é passado uma referencia do módulo principal - AppModule:

`platformBrowserDynamic().bootstrapModule(AppModule)`

### app.module.ts

- Este arquivo é um módulo em Angular. Não confundir com módulos do ecman script 2015 que são uma maneira de se declarar o que vai ser exportado de dentro de um arquivo.
- O AppModule, como já foi dito, é um módulo responsável por agrupar uma série de componentes da propria aplicação.
- Possui alguns imports como BrowserModule para execução no browser e obtenção de depencencias básicas do frammework.
- Importa o FormsModule e o HttpModule que são módulos muito básicos e a chance de serem utilizados é grande. O forms fornece todas as dependencias para trabalhar com formulários e o HttpModule vai ter todas as dependencias e objetos para trabalhar com chamadas http e fazer requisições remotas a um servidor para obter conteúdo por exemplo.
- Importa o @NgModule. NgModule é um decorator.
- No app.module.ts, o NgModule está aplicando metadados na classe AppModule. Vai adicionar algumas informação ao app.module.ts. Estas informações são todos os componentes que temos dentro da aplicação (declarations), os nossos imports, ou seja, o que precisamos usar; Providers a ser explicado mais adiante e bootstrap que diz qual é o componente dentre os componentes da lista de declarations é o principal ou responsável para fazer o bootstrap da aplicação. Que normalmente é o appComponent criado pelo @angular/cli
- Toda aplicação em Angular vai ter pelo menos um módulo  raiz, que é o app.module.ts, e um component de bootstrap.

### app.component.ts

- Um decorator que aplica metadados específicos para componentes.
- Aplica o selector que é o nome dado para o component raiz da aplicação. O Selector poderá ser visto como uma tag no body do index.html da aplicação.
- Aplica o templateUrl que é a cara do componente na aplicação, o template em html.
- E opcionalmente o styleUrl que é o estido como será personalizado o compomente.
- Se dermos uma olhada no template do componente, veremos que existe uma tag h1 com o valor de title do component introduzido dinamicamente nesta tag h1.

## Configuração de Ambiente

### Instalando o Node

Primeiro precisamos instalar o NodeJS. NodeJS  é uma linguagem do lado do servidor (backend), e não precisamos dele pois porque não estaremos escrevendo com o Angular códigos do lado do servidor. Na maioria das vezes, precisamos dele devido do npm (Node Package Manage). O npm gerencia dependencias da nossa aplicação (tipo Maven). Utilizamos o npm para instalar outras ferramentas que serão necessárias incluindo o Angular CLI.
Pegue a última versão do NodeJS em nodejs.org e instale-a em sua máquina. A instalação deve ser fácil e há instruções de instalação no site. Para checar qual versão do NodeJS temos instalada digitamos na console o comando:

 `node -v`

 Para vermos a versão do npm digitamos:

 `npm -v`

### Instalando o TypeScript

Utilizamos o TypeScript para desenvolver códigos em Angular para intalar o comando é:

`sudo npm install -g typescript`

Com o -g especificamos que a instalação será global em nossa máquina.

### Instalando o Typings

O Typings serve para trazer bibliotecas JavaScript para o TypeScript. Comando de instalação:

`sudo npm install -g typings`

### Instalando o Angular CLI

O Angular CLI é uma ferramente de linha de comando que permite criar um projeto Angular, adicionar arquivos e outros recursos para o progresso do desenvolvimento como recusos de testes,agrupamento, ou facilidades de deploy. Para instalar o Angular CLI digite na linha de comando:

`npm install -g @angular/cli`

### TypeScript Editor

Existem vários editores com recursos para Typescript como o VScode, Atom, Brackets, Sublime. Escolha o de sua preferencia.

## Outros Elementos Importantes

### Webpack

Module bundle utilizado pelo @angular/cli para gerar o arcabouço da aplicação para começarmos a desenvolver. Antigamente era utilizado no AngularJS outra ferramenta similar chamada systemJS.

Quando startamos a aplicação, podemos ver uma mensagem do webpack no console indicado que a compilação foi concluida.

Webpack é uma biblioteca escrita em javascript responsável por criar bundles em nossa aplicação. Vai compilar os arquivos e separá-los em bundles específicos que são os mostrados no console no momento em que iniciamos a execução da aplicação.

Estes bundles geralmente são:

### polyfills

polyfills.bundle.js: Que são scripts utilizados na aplicação para aumentar a compatibilidade com os diversos browsers.

### main

main.bundle.js: São scripts de nossa aplicação

### styles

styles.bundle.js: São os estilos utilizados na aplicação.

### vendor

vendor.bundle.js: Que vai conter os scripts de terceiros.

### inline

inline.bundle.js: O script que vai ser utlizado para carregar o próprio webpack da aplicação no browser, carregar toda a estrutura e fazer com que o Angular seja iniciado no servidor.

Se olharmos o código fonte da página do projeto no browser, podemos ver que no final cada bundle listado como arquivos javascript. De posse desses arquivos, o webpack vai carregar a aplicação no browser

### Routes

Routes é onde os componentes dinamicos são mapeados. As rotas são basicamente um array que ontém o mapeamento de cada caminho para um componente. Rotas aceitam parametros usando a sintaxe de : seguido pelo nome do parametro.
Por fim é preciso indicar quais rotas serão usada no módulo através atravé da função RouterModuloe.forRoot no módulo raiz ou forChild nos outros módulos.

O módulo de roteamento possui uma diretiva chamada routerLink onde podemos passar um caminho a ser acionado ou um conjunto de parâmetros

### bootstrap da aplicação

Como o angular é startado. Tudo começa com o comando ng server. Quado digitamos o ng server, nós estamos disparando um servidor do webpack, o servidor interno que é utilizado apenas para o desenvolvimento.
A partir dai o webpack vai dar uma olhada nos arquivos da nossa aplicação começando a partir do main.ts e vai investigar todos os nossos arquivos, imports, scripts, depencencias. Vai fazer um mapeamento de tudo que a gente usa e vai começar a separar isso em vários bundles. Uma vez que ele separa esses bundles, quando a gente pede o index.html, dinamicamente ele injeta o conteúdo de bundles no final do arquivo index.html

Se olharmos o index.html no código fonte, vamos ver que não há nenhuma referencia a css ou arquivos de javascript, mas quando olhamos no browser, veremos que existem estas referencias no final da página.

Quando pedimos o index.html e o webpack injeta estes scripts de forma dinamica, o browser vai receber este html com os scripts injetado e vai estartar a execução destes scripts, então, o main.bundle.ts irá startar o *bootstrap* da aplicação.

O main.bundle.ts vai carregar o primeiro arquivo que é o **main.ts** que é o arquivo responsável por fazer o bootstrap da aplicação.

O bootstrap carrega o arquivo main (main.ts) que carrega o módulo principal (app.module.ts), o modulo principal vai dizer qual é o componente de bootstrap (app.componente.ts) e o Angular vai pegar o conteúdo do bootstrap incluir na pagina index.html. Este é o caminho do bootstrap na aplicação.

### NgModule

O NgModule é um decorator. É uma função que serve para aplicarmos metadados em uma classe, em um atributo, em um método ou em um argumento de um método.
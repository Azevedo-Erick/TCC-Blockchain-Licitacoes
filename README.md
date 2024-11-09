# TCC - Blockchain Licitações

Este é o trabalho de conclusão de curso, este trabalho de conclusão de curso tem como objetivo a criação de uma rede blockchain privada, permissionada e gas free com Hyperledger Besu, para a realização de licitações públicas.

## Tecnologias


- **Hyperledger Besu** (Blockchain)
- **Docker** e **Docker Compose**
- **Hardhat** (para contratos inteligentes)
- **Solidity** (para contratos inteligentes)
- **IPFS**
- **Express** (para API)
- **JavaScript/TypeScript** (para backend)
- **Prisma** (para ORM)
- **Node.js**
- **Postgresql**

## Requisitos
- Docker
- Docker Compose
- Node.js (para execução do Express)
- NPM ou Yarn
- Hardhat
- Curl
- jq
- Git
- Besu (versão 24.3.0)
- Postgresql 

## Autores

- [@Azevedo-Erick](https://github.com/azevedo-erick)

## Roadmap

### Implementação

- [x] **Criar a rede blockchain privada, permissionada e gas free com Hyperledger Besu**
  - [x] Configurar a rede Hyperledger Besu para ser uma rede privada, com nodes autorizados e comunicação gas-free. 
  - [x] Utilizar o protocolo de consenso **IBFT 2.0 (Istanbul Byzantine Fault Tolerance)** para garantir a integridade das transações em um ambiente permissionado. 
  - [x] Configurar a rede para não cobrar taxas de transação, assegurando um ambiente de execução sem custos para os participantes.

- [x] **Utilizar Netherium para realizar a comunicação entre a API e a blockchain**
  - [x] Utilizar a biblioteca **Web3js** para facilitar a interação entre a API backend e a blockchain Hyperledger Besu através de Web3. 
  - [x] Configurar **endpoints RPC** para permitir que a API realize chamadas para a blockchain, como a verificação de transações, adição de contas à whitelist, e execução de contratos inteligentes.
  - [ ] Assegurar a **segurança na comunicação** utilizando tokens JWT (JSON Web Tokens) para autenticação de requisições que interagem com a blockchain.

- [x] **Subir um nó IPFS (InterPlanetary File System)**
  - [x] Configurar um nó IPFS para armazenar e distribuir documentos de maneira descentralizada. 
  - [ ] Armazenar arquivos relacionados aos processos de licitação, como editais, propostas e artefatos, no IPFS, com hashes desses documentos sendo registrados na blockchain para garantir a integridade e rastreabilidade.

- [ ] **Subir Grafana e Prometheus via Docker**
  - [ ] Configurar a infraestrutura de monitoramento da rede para utilizar **Prometheus** para coleta de métricas de desempenho e **Grafana** para visualização dessas métricas em tempo real.
  - [ ] Utilizar **Docker Compose** para orquestrar os containers do Prometheus e Grafana, facilitando a implantação e escalabilidade.
  - [ ] Configurar o monitoramento para coletar variáveis importantes, como o número de transações realizadas, status da rede, e utilização dos nós.

- [x] **Criar e implementar os contratos inteligentes**
  - [x] Criar os contratos inteligentes utilizando **Solidity**, garantindo a execução segura e automatizada das regras da licitação, como o registro de propostas e a seleção de vencedores.
  - [x] Testar os contratos localmente com **Hardhat**, garantindo que as funcionalidades de aprovação, seleção de candidatos e integridade do processo sejam atendidas.
  - [x] Implementar funcionalidades de segurança para impedir ataques como reentrância e garantir que apenas contas autorizadas possam interagir com contratos sensíveis.

- [] **Modelar a API e implementar a autenticação**
  - [x] Implementar a **autenticação e autorização** da API utilizando **JWT (JSON Web Tokens)** para garantir que apenas usuários autenticados possam acessar recursos sensíveis, como a criação de novas licitações e envio de propostas.
  - [ ] Modelar o **controle de permissões** com base em papéis (admin, usuário comum, candidato), para restringir o acesso a funcionalidades específicas:
    - **Admin**: Criar novas licitações, visualizar todas as propostas e controlar os documentos da licitação.
    - **Usuário Comum**: Visualizar licitações e submeter propostas.
    - **Candidato**: Visualizar licitações abertas para sua categoria e submeter propostas.
  
- [ ] **Modelar o banco de dados**
  - Utilizar **Prisma** como ORM para modelar o banco de dados. A modelagem deve incluir tabelas e relacionamentos entre:
    - **Usuários**: Informações como nome, e-mail, senha (criptografada), e papel (admin, usuário comum, candidato).
    - **Licitações**: Dados como título, descrição, categoria, e data limite.
    - **Propostas**: Relacionamento com licitações, contendo informações sobre os candidatos e as propostas enviadas.
    - **Documentos**: Referências aos documentos associados às licitações, com hashes armazenados no IPFS e metadados como tipo e data de envio.
  - Configurar **relações entre as tabelas**: A tabela de licitações está relacionada com as propostas e documentos, enquanto os usuários estão associados a licitações e propostas através de chaves estrangeiras.

- [ ] **Criar a aplicação web para a realização das licitações**
  - [ ] Desenvolver a aplicação web utilizando **React.js** para o frontend, com comunicação com a API Express para envio e recebimento de dados relacionados às licitações.
  - [ ] Implementar a visualização das licitações, envio de propostas e acompanhamento do progresso das licitações em tempo real.
  - [ ] Implementar **autenticação** baseada em JWT, com o frontend realizando o login e utilizando o token para acessar funcionalidades restritas.
  - [ ] Utilizar **componentes reutilizáveis** para exibir licitações, propostas e documentos, com uma interface de usuário intuitiva.

- [ ] **Melhorar os scripts para facilitar a execução da rede**
  - [x] Desenvolver scripts em **Bash** e **Node.js** para facilitar a inicialização da rede blockchain e a integração com o backend.
  - [x] Criar scripts de inicialização do Besu que incluam a criação automática de nós, a configuração de whitelist e o envio de transações para configurar a rede.
  - [ ] Utilizar **Docker Compose** para orquestrar a criação dos containers da blockchain, IPFS, Grafana, Prometheus e API Express, simplificando o processo de setup.
### Dissertação

- [ ] Revisar o cronograma, como um todo, possuindo o que foi produzido em TCC1 e o que será produzido em TCC2

### Artefatos de Software

- [X] Arquitetura do Sistema
- [X] Casos de Uso
- [ ] Diagrama de Atividades
- [X] Diagrama de Classe
- [ ] Diagrama de Entidade Relacional
- [ ] Prototipação

## Executando localmente

1. Clone o projeto

    ```bash
        git clone
    ```

2. Vá para o diretório do projeto
    ```bash
        cd blockchain-licitacoes
    ```

3. Execute o arquivo init.sh

    ```bash
        ./init.sh
    ```

4. Inicie cada nó
    
    ```bash
    cd Node-1
    start_besu.sh
    ```

    ```bash
    cd Node-2
    start_besu.sh
    ```

    ```bash
    cd Node-3
    start_besu.sh
    ```

    ```
    cd Node-4
    start_besu.sh
    ```

5. Copie os links de enodes de cada nó nas saídas dos comandos acima

6. Edite o arquivo add_enodes.sh e adicione os enodes de cada nó
   
7. Adicione os enodes de cada nó
    ```bash
    ./add_enodes
    ```


> [!TIP]
> Para adicionar uma conta à rede (pode ser o endereço de algum nó)
>    ```bash
>    curl -X POST --data '{"jsonrpc":"2.0","method":"perm_addAccountsToWhitelist","params":[["0x<Endereço_da_conta>"]],"id":1}' http://localhost:8545
>    ```

> [!TIP]
> Para verificar se a conta foi adicionada
>    ```bash
>    curl -X POST --data '{"jsonrpc":"2.0","method":"perm_getAccountsWhitelist","params":[],"id":1}' http://localhost:8545
>    ```

> [!TIP]
> Verificar se os nós estão conectados
>    ```bash
>    curl -X POST --data '{"jsonrpc":"2.0","method":"net_peerCount","params":[],"id":1}' http://localhost:8545
>    ```

## Deploy do contrato
1. Vá para o diretório do contrato
    ```bash
    cd contracts
    ```
2. Instale as dependências
    ```bash
    npm install
    ```    
3. Compile o contrato
    ```bash
    npx hardhat compile
    ```
4. Alterar o arquivo  hardhat.config.js
    ```javascript
    module.exports = {
    solidity: "0.8.0",
    networks: {
        besu: {
        url: "http://localhost:8545",
        accounts: ["0x<Endereço_da_conta>"],
        },
    },
    };
    ```

5. Deploy do contrato
    ```bash
    npx hardhat ignition deploy ./ignition/modules/<Contrato>.js --network besuPrivate
    ```


## Documentação
Abaixo estão os links para a documentação do projeto, onde é possível encontrar mais informações sobre o projeto.
- [Contratos Inteligentes](docs/contracts.md)
- [Diagramas](docs/diagrams.md)
- [Scripts](docs/scripts.md)
- [Configuração](docs/configuration.md)
- [Documentação](docs/diagrams.md)

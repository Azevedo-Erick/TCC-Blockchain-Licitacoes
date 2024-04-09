# TCC - Blockchain Licitações

Este é o trabalho de conclusão de curso, este trabalho de conclusão de curso tem como objetivo a criação de uma rede blockchain privada, permissionada e gas free com Hyperledger Besu, para a realização de licitações públicas.

## Tecnologias


- Hyperledger Besu
- Docker
- Docker Compose
- Hardhat
- Solidity
- IPFS
- .Net Core
- C#

## Requisitos
- Docker
- Docker Compose
- .Net Core
- NPM
- Hardhat
- Curl
- jq
- Git
- Besu (versão 24.3.0)

## Autores

- [@Azevedo-Erick](https://github.com/azevedo-erick)

## Roadmap

### Implementação

- [x] Implementar a rede blockchain privada, permissionada e gas free com Hyperledger Besu
- [X] Utilizar o Netherium para realizar a comunicação entre a API C# e a blockchain
- [X] Subir um nó IPFS
- [ ] Subir grafana e prometheus via docker
- [ ] Implementar os contratos inteligentes
- [ ] Implementar a aplicação web para a realização das licitações
- [ ] Melhorar os scripts para facilitar a execução da rede

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

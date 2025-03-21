# TCC - Blockchain Licitações

Trabalho de Conclusão de Curso voltado para a criação de uma solução baseada em **blockchain permissionada e sem custos de transação** para a realização de **licitações públicas**, utilizando tecnologias modernas como **Hyperledger Besu**, **AdonisJS 6**, **IPFS** e contratos inteligentes em **Solidity**.

## Tecnologias
<p >
   <img src="https://img.shields.io/badge/Hyperledger%20Besu-363636?style=for-the-badge&logo=hyperledger&logoWidth=30" alt="Hyperledger Besu" height="30"/>
<img src="https://img.shields.io/badge/Solidity-363636?style=for-the-badge&logo=solidity&logoWidth=30" alt="Solidity" height="30"/>
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white&logoWidth=30" alt="TypeScript" height="30"/>
<img src="https://img.shields.io/badge/AdonisJS-5A45FF?style=for-the-badge&logo=adonisjs&logoColor=white&logoWidth=30" alt="AdonisJS" height="30"/>
<img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white&logoWidth=30" alt="Docker" height="30"/>
<img src="https://img.shields.io/badge/IPFS-65C2CB?style=for-the-badge&logo=ipfs&logoColor=black&logoWidth=30" alt="IPFS" height="30"/>
<img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white&logoWidth=30" alt="PostgreSQL" height="30"/>

</p>

- **Hyperledger Besu** (Blockchain permissionada)
- **AdonisJS 6** (API backend com autenticação moderna e suporte a tokens)
- **Docker** e **Docker Compose**
- **IPFS** (Armazenamento descentralizado de documentos)
- **PostgreSQL** (Banco de dados relacional)
- **React.js** (Frontend - em desenvolvimento)

## Requisitos

- Docker & Docker Compose
- Node.js (>=18)
- NPM
- Git

## Autores

- [@azevedo-erick](https://github.com/azevedo-erick)

## Roadmap

### 🛠️ Implementação

- [x] Rede blockchain permissionada com **Besu** e consenso **IBFT 2.0**
- [x] Comunicação entre API e blockchain via **web3.js**
- [x] Armazenamento de documentos no **IPFS** com hash salvo na blockchain
- [x] Contratos inteligentes escritos em **Solidity** e testados com **Hardhat**
- [x] Autenticação JWT com **AdonisJS 6** e gerenciamento de tokens (OAT)
- [x] Estruturar API com **Lucid ORM**, **Service Layer** e **middlewares**
- [ ] Controle de permissões por papel (admin, candidato, visitante)
- [ ] Frontend com **React.js** para interação com a API e acompanhamento das licitações
- [X] Testes de integração e unitários
- [X] Ambiente de testes separado
 
### 📚 Documentação e Artefatos

- [x] Arquitetura do Sistema
- [x] Casos de Uso
- [x] Diagrama de Classes
- [ ] Diagrama de Atividades
- [ ] Diagrama ER
- [ ] Protótipos de Tela
- [ ] Cronograma consolidado (TCC1 + TCC2)

## 🚀 Executando Localmente

1. Clone o projeto:
```bash
git clone https://github.com/azevedo-erick/blockchain-licitacoes.git
cd blockchain-licitacoes
```

2. Execute o script de inicialização:
```bash
./init.sh
```

3. Inicie os nós da rede:
```bash
cd Node-1 && ./start_besu.sh
cd ../Node-2 && ./start_besu.sh
cd ../Node-3 && ./start_besu.sh
cd ../Node-4 && ./start_besu.sh
```

4. Copie os enodes e adicione ao `add_enodes.sh`, depois execute:
```bash
./add_enodes.sh
```

> ℹ️ Dicas de Comando:
> 
> Adicionar conta autorizada:
> ```bash
> curl -X POST --data '{"jsonrpc":"2.0","method":"perm_addAccountsToWhitelist","params":[["0x<endereco>"]],"id":1}' http://localhost:8545
> ```
>
> Verificar lista de contas autorizadas:
> ```bash
> curl -X POST --data '{"jsonrpc":"2.0","method":"perm_getAccountsWhitelist","params":[],"id":1}' http://localhost:8545
> ```
>
> Verificar conexões entre nós:
> ```bash
> curl -X POST --data '{"jsonrpc":"2.0","method":"net_peerCount","params":[],"id":1}' http://localhost:8545
> ```

## 🔧 Deploy dos Contratos Inteligentes

```bash
cd contracts
npm install
npx hardhat compile
```

Configure `hardhat.config.ts` com:
```ts
networks: {
  besuPrivate: {
    url: 'http://localhost:8545',
    accounts: ['0x<chave_privada>']
  }
}
```

Deploy:
```bash
npx hardhat ignition deploy ./ignition/modules/<Contrato>.ts --network besuPrivate
```

## 📄 Documentação

- [Contratos Inteligentes](docs/contracts.md)
- [Diagramas](docs/diagrams.md)
- [Scripts de Execução](docs/scripts.md)
- [Configuração do Projeto](docs/configuration.md)

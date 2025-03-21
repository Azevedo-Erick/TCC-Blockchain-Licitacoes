// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract StorageLicitacoes {
    struct Licitacao {
        string nome;
        address enderecoBloco;
        bool ativa;
    }

    Licitacao[] private licitacoes;
    mapping(address => bool) public blocoJaRegistrado;
    mapping(address => uint256) private indicePorBloco;
    mapping(address => bool) public admins;

    address public owner;

    event LicitacaoAdicionada(string nome, address enderecoBloco);
    event LicitacaoRemovida(address enderecoBloco);
    event LicitacaoReativada(address enderecoBloco);
    event LicitacaoAtualizada(string novoNome, address enderecoBloco);
    event AdminAdicionado(address admin);
    event AdminRemovido(address admin);
    event PropriedadeTransferida(address novoOwner);

    modifier onlyOwner() {
        require(msg.sender == owner, "Apenas o dono pode gerenciar");
        _;
    }

    modifier onlyAdmin() {
        require(msg.sender == owner || admins[msg.sender], "Apenas admin pode gerenciar");
        _;
    }

    constructor() {
        owner = msg.sender;
        admins[msg.sender] = true;
    }

    function adicionarAdmin(address _admin) external onlyOwner {
        require(_admin != address(0), "Endereco invalido");
        require(!admins[_admin], "Admin ja registrado");
        admins[_admin] = true;
        emit AdminAdicionado(_admin);
    }

    function removerAdmin(address _admin) external onlyOwner {
        require(admins[_admin], "Admin nao encontrado");
        admins[_admin] = false;
        emit AdminRemovido(_admin);
    }

    function transferirPropriedade(address _novoOwner) external onlyOwner {
        require(_novoOwner != address(0), "Novo owner invalido");
        owner = _novoOwner;
        emit PropriedadeTransferida(_novoOwner);
    }

    function adicionarLicitacao(string memory _nome, address _enderecoBloco) external onlyAdmin {
        require(_enderecoBloco != address(0), "Endereco invalido");
        require(!blocoJaRegistrado[_enderecoBloco], "Bloco ja registrado");

        licitacoes.push(Licitacao(_nome, _enderecoBloco, true));
        blocoJaRegistrado[_enderecoBloco] = true;
        indicePorBloco[_enderecoBloco] = licitacoes.length - 1;

        emit LicitacaoAdicionada(_nome, _enderecoBloco);
    }

    function buscarLicitacao(uint256 _indice) external view returns (string memory, address, bool) {
        require(_indice < licitacoes.length, "Indice fora do limite");
        Licitacao memory licitacao = licitacoes[_indice];
        return (licitacao.nome, licitacao.enderecoBloco, licitacao.ativa);
    }

    function buscarLicitacaoPorEndereco(address _enderecoBloco) external view returns (string memory, bool) {
        require(blocoJaRegistrado[_enderecoBloco], "Licitacao nao encontrada");
        uint256 indice = indicePorBloco[_enderecoBloco];
        Licitacao memory licitacao = licitacoes[indice];
        return (licitacao.nome, licitacao.ativa);
    }

    function buscarLicitacoes(bool _somenteAtivas) external view returns (Licitacao[] memory) {
        uint256 count = 0;
        for (uint256 i = 0; i < licitacoes.length; i++) {
            if (_somenteAtivas && !licitacoes[i].ativa) {
                continue;
            }
            count++;
        }

        Licitacao[] memory result = new Licitacao[](count);
        uint256 j = 0;
        for (uint256 i = 0; i < licitacoes.length; i++) {
            if (_somenteAtivas && !licitacoes[i].ativa) {
                continue;
            }
            result[j] = licitacoes[i];
            j++;
        }

        return result;
    }

    function totalLicitacoes() external view returns (uint256) {
        return licitacoes.length;
    }

    function atualizarLicitacao(address _enderecoBloco, string memory _novoNome) external onlyAdmin {
        require(blocoJaRegistrado[_enderecoBloco], "Licitacao nao encontrada");
        uint256 indice = indicePorBloco[_enderecoBloco];

        licitacoes[indice].nome = _novoNome;
        emit LicitacaoAtualizada(_novoNome, _enderecoBloco);
    }

    function removerLicitacao(address _enderecoBloco) external onlyAdmin {
        require(blocoJaRegistrado[_enderecoBloco], "Licitacao nao encontrada");
        uint256 indice = indicePorBloco[_enderecoBloco];

        licitacoes[indice].ativa = false;
        blocoJaRegistrado[_enderecoBloco] = false;
        
        emit LicitacaoRemovida(_enderecoBloco);
    }

    function reativarLicitacao(address _enderecoBloco) external onlyAdmin {
        require(!blocoJaRegistrado[_enderecoBloco], "Licitacao ja ativa");
        uint256 indice = indicePorBloco[_enderecoBloco];

        licitacoes[indice].ativa = true;
        blocoJaRegistrado[_enderecoBloco] = true;

        emit LicitacaoReativada(_enderecoBloco);
    }
}

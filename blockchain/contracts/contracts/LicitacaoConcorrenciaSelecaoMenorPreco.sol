// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract LicitacaoConcorrenciaSelecaoMenorPreco {
    enum Estagio { Registro, Candidatura, Finalizado }

    struct Licitacao {
        string titulo;
        string descricao;
        bytes32 hashETP;
        bytes32 hashEdital;
        uint256 dataInicio;
        Estagio estagio;
    }

    struct Candidato {
        address endereco;
        bytes32 hashCandidatura;
        uint256 timestampEnvio;
    }

    Licitacao public licitacao;
    mapping(address => Candidato) public candidatos;
    address[] public listaCandidatos;
    mapping(string => uint256) public timestamps;

    event LicitacaoCriada(string titulo, string descricao, bytes32 hashETP, bytes32 hashEdital, uint256 dataInicio);
    event CandidaturaEnviada(address candidato, bytes32 hashCandidatura, uint256 timestamp);
    event EstagioAtualizado(Estagio novoEstagio, uint256 timestamp);

    modifier apenasEmEstagio(Estagio _estagio) {
        require(licitacao.estagio == _estagio, "Acao nao permitida neste estagio");
        _;
    }

    modifier apenasAposDataInicio() {
        require(block.timestamp >= licitacao.dataInicio, "Acao nao permitida antes da data de inicio");
        _;
    }

    function criarLicitacao(
        string memory _titulo,
        string memory _descricao,
        bytes32 _hashETP,
        bytes32 _hashEdital,
        uint256 _dataInicio
    ) public {
        require(licitacao.dataInicio == 0, "Licitacao ja foi criada");

        licitacao = Licitacao({
            titulo: _titulo,
            descricao: _descricao,
            hashETP: _hashETP,
            hashEdital: _hashEdital,
            dataInicio: _dataInicio,
            estagio: Estagio.Registro
        });

        timestamps["licitacao_criada"] = block.timestamp;

        emit LicitacaoCriada(_titulo, _descricao, _hashETP, _hashEdital, _dataInicio);
    }

    function iniciarCandidatura() public apenasEmEstagio(Estagio.Registro) apenasAposDataInicio {
        licitacao.estagio = Estagio.Candidatura;
        timestamps["candidatura_iniciada"] = block.timestamp;
        emit EstagioAtualizado(Estagio.Candidatura, block.timestamp);
    }

    function enviarCandidatura(bytes32 _hashCandidatura) public apenasEmEstagio(Estagio.Candidatura) {
        require(candidatos[msg.sender].endereco == address(0), "Candidato ja enviou uma candidatura");

        Candidato memory novoCandidato = Candidato({
            endereco: msg.sender,
            hashCandidatura: _hashCandidatura,
            timestampEnvio: block.timestamp
        });

        candidatos[msg.sender] = novoCandidato;
        listaCandidatos.push(msg.sender);

        timestamps[string(abi.encodePacked("candidatura_enviada_", toString(msg.sender)))] = block.timestamp;

        emit CandidaturaEnviada(msg.sender, _hashCandidatura, block.timestamp);
    }

    function finalizarLicitacao() public apenasEmEstagio(Estagio.Candidatura) {
        licitacao.estagio = Estagio.Finalizado;
        timestamps["licitacao_finalizada"] = block.timestamp;
        emit EstagioAtualizado(Estagio.Finalizado, block.timestamp);
    }

    function toString(address account) internal pure returns(string memory) {
        return string(abi.encodePacked(account));
    }

    function getCandidatos() public view returns (address[] memory) {
        return listaCandidatos;
    }

    function getEstagio() public view returns (Estagio) {
        return licitacao.estagio;
    }

    function getTimestamp(string memory key) public view returns (uint256) {
        return timestamps[key];
    }
}
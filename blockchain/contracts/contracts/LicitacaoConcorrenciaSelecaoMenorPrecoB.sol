// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract LicitacaoConcorrenciaSelecaoMenorPrecoB {
    enum Estagio { Registro, Candidatura, Finalizado }

    struct Licitacao {
        string titulo;
        string descricao;
        bytes32 hashETP;
        bytes32 hashEdital;
        uint256 dataInicio;
        uint256 dataInicioCandidaturas;
        uint256 dataFimCandidaturas;
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

    modifier apenasDuranteCandidatura() {
        require(block.timestamp >= licitacao.dataInicioCandidaturas && block.timestamp <= licitacao.dataFimCandidaturas, "Acao nao permitida fora do periodo de candidaturas");
        _;
    }

    function criarLicitacao(
        string memory _titulo,
        string memory _descricao,
        bytes32 _hashETP,
        bytes32 _hashEdital,
        uint256 _dataInicio,
        uint256 _dataInicioCandidaturas,
        uint256 _dataFimCandidaturas
    ) public {
        require(licitacao.dataInicio == 0, "Licitacao ja foi criada");

        licitacao = Licitacao({
            titulo: _titulo,
            descricao: _descricao,
            hashETP: _hashETP,
            hashEdital: _hashEdital,
            dataInicio: _dataInicio,
            dataInicioCandidaturas: _dataInicioCandidaturas,
            dataFimCandidaturas: _dataFimCandidaturas,
            estagio: Estagio.Registro
        });

        timestamps["licitacao_criada"] = block.timestamp;

        emit LicitacaoCriada(_titulo, _descricao, _hashETP, _hashEdital, _dataInicio);
    }

    function iniciarCandidatura() public apenasEmEstagio(Estagio.Registro) apenasAposDataInicio {
        require(block.timestamp >= licitacao.dataInicioCandidaturas, "A candidatura ainda nao pode ser iniciada");
        licitacao.estagio = Estagio.Candidatura;
        timestamps["candidatura_iniciada"] = block.timestamp;
        emit EstagioAtualizado(Estagio.Candidatura, block.timestamp);
    }

    function enviarCandidatura(bytes32 _hashCandidatura) public apenasEmEstagio(Estagio.Candidatura) apenasDuranteCandidatura {
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

    function atualizarEstado() public apenasAposDataInicio {
        if (licitacao.estagio == Estagio.Registro) {
            if (block.timestamp >= licitacao.dataInicioCandidaturas) {
                licitacao.estagio = Estagio.Candidatura;
                timestamps["estagio_atualizado"] = block.timestamp;
                emit EstagioAtualizado(Estagio.Candidatura, block.timestamp);
            }
        } else if (licitacao.estagio == Estagio.Candidatura) {
            if (block.timestamp > licitacao.dataFimCandidaturas) {
                licitacao.estagio = Estagio.Finalizado;
                timestamps["estagio_atualizado"] = block.timestamp;
                emit EstagioAtualizado(Estagio.Finalizado, block.timestamp);
            }
        }
    }

    function toString(address account) internal pure returns (string memory) {
        return string(abi.encodePacked("0x", toHexString(uint256(uint160(account)), 20)));
    }

    function toHexString(uint256 value, uint256 length) internal pure returns (string memory) {
        bytes memory buffer = new bytes(2 * length);
        for (uint256 i = 0; i < length; i++) {
            buffer[2 * i] = _HEX_SYMBOLS[value >> (8 * (length - i - 1)) & 0xf];
            buffer[2 * i + 1] = _HEX_SYMBOLS[value >> (8 * (length - i - 1) + 4) & 0xf];
        }
        return string(buffer);
    }

    bytes16 private constant _HEX_SYMBOLS = "0123456789abcdef";

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

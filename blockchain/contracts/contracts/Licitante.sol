// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Licitante {
    address public owner;
    address public representante;

    string public nomeFantasia;
    string public razaoSocial;
    string public cnpj;
    uint256 public ramoAtividadeId;

    uint256 public createdAt;
    uint256 public updatedAt;

    event DadosAtualizados(string nomeFantasia, address representante);

    modifier onlyOwner() {
        require(msg.sender == owner, "Apenas o owner pode executar esta funcao");
        _;
    }

    constructor(
    string memory _nomeFantasia,
    string memory _razaoSocial,
    string memory _cnpj,
    uint256 _ramoAtividadeId
) {
    owner = msg.sender;
    representante = msg.sender;
    nomeFantasia = _nomeFantasia;
    razaoSocial = _razaoSocial;
    cnpj = _cnpj;
    ramoAtividadeId = _ramoAtividadeId;
    createdAt = block.timestamp;
    updatedAt = block.timestamp;
}


    function atualizarDados(
        string memory _nomeFantasia,
        string memory _razaoSocial,
        string memory _cnpj,
        uint256 _ramoAtividadeId
    ) public onlyOwner {
        nomeFantasia = _nomeFantasia;
        razaoSocial = _razaoSocial;
        cnpj = _cnpj;
        ramoAtividadeId = _ramoAtividadeId;
        updatedAt = block.timestamp;

        emit DadosAtualizados(_nomeFantasia, representante);
    }

    function transferOwnership(address newOwner) public onlyOwner {
        require(newOwner != address(0), "Novo owner invalido");
        owner = newOwner;
    }
}

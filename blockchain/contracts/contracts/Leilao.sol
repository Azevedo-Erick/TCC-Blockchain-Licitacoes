// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Leilao {
    enum EstadoLeilao {
        Inicial,
        Aberta,
        EmAnalise,
        Finalizado
    }

    EstadoLeilao public estado;
    string public dono;
    string public item;
    uint public lanceMaisAlto;
    string public maiorLance;

    constructor() {
        estado = EstadoLeilao.Inicial;
        dono = "N/A";
    }

    function cadastrarDonoEItem(
        string memory _dono,
        string memory _item
    ) public {
        require(
            estado == EstadoLeilao.Inicial,
            "O leilao deve estar na fase inicial"
        );

        dono = _dono;
        item = _item;
        estado = EstadoLeilao.Aberta;
    }

    function enviarLance(uint _valor, string memory _nome) public {
        require(estado == EstadoLeilao.Aberta, "O leilao nao esta aberto");
        require(
            _valor > lanceMaisAlto,
            "O lance precisa ser maior que o lance atual"
        );

        lanceMaisAlto = _valor;
        maiorLance = _nome;
    }

    function encerrarLeilao() public {
        require(estado == EstadoLeilao.Aberta, "O leilao nao esta aberto");

        estado = EstadoLeilao.EmAnalise;
    }

    function finalizarLeilao() public {
        require(
            estado == EstadoLeilao.EmAnalise,
            "O leilao nao esta em analise"
        );

        estado = EstadoLeilao.Finalizado;
    }

    function obterDadosLeilao()
        public
        view
        returns (
            EstadoLeilao,
            string memory,
            string memory,
            uint,
            string memory
        )
    {
        return (estado, dono, item, lanceMaisAlto, maiorLance);
    }
}

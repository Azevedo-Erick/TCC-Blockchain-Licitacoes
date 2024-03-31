// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MeuContrato {
    uint public meuNumero = 42;

    function setMeuNumero(uint _meuNumero) public {
        meuNumero = _meuNumero;
    }
}

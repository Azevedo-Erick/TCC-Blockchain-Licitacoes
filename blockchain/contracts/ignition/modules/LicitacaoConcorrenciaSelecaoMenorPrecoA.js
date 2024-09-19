
const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("LicitacaoConcorrenciaSelecaoMenorPrecoA", (m) => {
    
    const lock = m.contract("LicitacaoConcorrenciaSelecaoMenorPrecoA");
    
    return { lock };
    }
);

const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("LicitacaoConcorrenciaSelecaoMenorPrecoB", (m) => {
    
    const lock = m.contract("LicitacaoConcorrenciaSelecaoMenorPrecoB");
    
    return { lock };
    }
);
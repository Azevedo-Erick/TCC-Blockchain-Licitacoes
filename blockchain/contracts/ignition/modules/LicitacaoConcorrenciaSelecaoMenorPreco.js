
const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("LicitacaoConcorrenciaSelecaoMenorPreco", (m) => {
    
    const lock = m.contract("LicitacaoConcorrenciaSelecaoMenorPreco");
    
    return { lock };
    }
);

const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("MeuContratoModule", (m) => {
    
    const lock = m.contract("MeuContrato");
    
    return { lock };
    }
);
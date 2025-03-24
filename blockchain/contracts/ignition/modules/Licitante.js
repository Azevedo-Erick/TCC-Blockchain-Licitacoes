
const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("LicitanteModule", (m) => {
    
    const lock = m.contract("Licitante");
    
    return { lock };
    }
);
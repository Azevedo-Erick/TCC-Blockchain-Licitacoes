
const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("LeilaoModule", (m) => {
    
    const lock = m.contract("Leilao");
    
    return { lock };
    }
);
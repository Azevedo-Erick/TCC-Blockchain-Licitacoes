
const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("StorageLicitacoesModule", (m) => {
    
    const lock = m.contract("StorageLicitacoes");
    
    return { lock };
    }
);
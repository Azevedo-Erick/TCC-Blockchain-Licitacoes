require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
	solidity: "0.8.24",
	networks: {
		besuPrivate: {
			url: "http://localhost:8545", // Substitua pela URL do seu nó Besu
			accounts: ["0xd5cad825d7ea66b7d383f77806d14ad32a529744b753a6553930f22e24d1eb09"],
			gasPrice: 0,
			gas: 10000000,
		},
	},
};

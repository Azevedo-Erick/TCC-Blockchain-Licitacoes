require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
	solidity: "0.8.24",
	networks: {
		besuPrivate: {
			url: "http://localhost:8545", // Substitua pela URL do seu nó Besu
			accounts: ["0x73c91bb279dac538089d06a34f20b009c124568fcfb5d623eb9520f17f688611"],
			gasPrice: 0,
			gas: 10000000,
		},
	},
};

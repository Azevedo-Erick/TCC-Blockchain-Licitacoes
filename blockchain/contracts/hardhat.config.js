require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
	solidity: "0.8.24",
	networks: {
		besuPrivate: {
			url: "http://localhost:8545", // Substitua pela URL do seu nó Besu
			accounts: ["0xfad933d0cc347cc576ef487a25c50266be28ef405dd2fd39de087491c4523f74"],
			gasPrice: 0,
			gas: 10000000,
		},
	},
};

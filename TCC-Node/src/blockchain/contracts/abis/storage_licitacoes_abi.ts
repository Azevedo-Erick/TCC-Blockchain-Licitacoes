export default [
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: 'string',
                name: 'nome',
                type: 'string'
            },
            {
                indexed: false,
                internalType: 'address',
                name: 'enderecoBloco',
                type: 'address'
            }
        ],
        name: 'LicitacaoAdicionada',
        type: 'event'
    },
    {
        inputs: [
            {
                internalType: 'string',
                name: '_nome',
                type: 'string'
            },
            {
                internalType: 'address',
                name: '_enderecoBloco',
                type: 'address'
            }
        ],
        name: 'adicionarLicitacao',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address'
            }
        ],
        name: 'blocoJaRegistrado',
        outputs: [
            {
                internalType: 'bool',
                name: '',
                type: 'bool'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'uint256',
                name: '_indice',
                type: 'uint256'
            }
        ],
        name: 'buscarLicitacao',
        outputs: [
            {
                internalType: 'string',
                name: '',
                type: 'string'
            },
            {
                internalType: 'address',
                name: '',
                type: 'address'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [],
        name: 'buscarLicitacoes',
        outputs: [
            {
                components: [
                    {
                        internalType: 'string',
                        name: 'nome',
                        type: 'string'
                    },
                    {
                        internalType: 'address',
                        name: 'enderecoBloco',
                        type: 'address'
                    }
                ],
                internalType: 'struct StorageLicitacoes.Licitacao[]',
                name: '',
                type: 'tuple[]'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256'
            }
        ],
        name: 'licitacoes',
        outputs: [
            {
                internalType: 'string',
                name: 'nome',
                type: 'string'
            },
            {
                internalType: 'address',
                name: 'enderecoBloco',
                type: 'address'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [],
        name: 'totalLicitacoes',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    }
];

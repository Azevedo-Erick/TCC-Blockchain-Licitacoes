export default [
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: 'address',
                name: 'candidato',
                type: 'address'
            },
            {
                indexed: false,
                internalType: 'string',
                name: 'hashCandidatura',
                type: 'string'
            },
            {
                indexed: false,
                internalType: 'uint256',
                name: 'timestamp',
                type: 'uint256'
            }
        ],
        name: 'CandidaturaEnviada',
        type: 'event'
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType:
                    'enum LicitacaoConcorrenciaSelecaoMenorPrecoC.Estagio',
                name: 'novoEstagio',
                type: 'uint8'
            },
            {
                indexed: false,
                internalType: 'uint256',
                name: 'timestamp',
                type: 'uint256'
            }
        ],
        name: 'EstagioAtualizado',
        type: 'event'
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: 'string',
                name: 'titulo',
                type: 'string'
            },
            {
                indexed: false,
                internalType: 'string',
                name: 'descricao',
                type: 'string'
            },
            {
                indexed: false,
                internalType: 'string',
                name: 'hashETP',
                type: 'string'
            },
            {
                indexed: false,
                internalType: 'string',
                name: 'hashEdital',
                type: 'string'
            },
            {
                indexed: false,
                internalType: 'uint256',
                name: 'dataInicio',
                type: 'uint256'
            }
        ],
        name: 'LicitacaoCriada',
        type: 'event'
    },
    {
        inputs: [],
        name: 'atualizarEstado',
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
        name: 'candidatos',
        outputs: [
            {
                internalType: 'address',
                name: 'endereco',
                type: 'address'
            },
            {
                internalType: 'string',
                name: 'hashCandidatura',
                type: 'string'
            },
            {
                internalType: 'uint256',
                name: 'timestampEnvio',
                type: 'uint256'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'string',
                name: '_titulo',
                type: 'string'
            },
            {
                internalType: 'string',
                name: '_descricao',
                type: 'string'
            },
            {
                internalType: 'string',
                name: '_hashETP',
                type: 'string'
            },
            {
                internalType: 'string',
                name: '_hashEdital',
                type: 'string'
            },
            {
                internalType: 'uint256',
                name: '_dataInicio',
                type: 'uint256'
            },
            {
                internalType: 'uint256',
                name: '_dataInicioCandidaturas',
                type: 'uint256'
            },
            {
                internalType: 'uint256',
                name: '_dataFimCandidaturas',
                type: 'uint256'
            }
        ],
        name: 'criarLicitacao',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'string',
                name: '_hashCandidatura',
                type: 'string'
            }
        ],
        name: 'enviarCandidatura',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        inputs: [],
        name: 'finalizarLicitacao',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        inputs: [],
        name: 'getCandidatos',
        outputs: [
            {
                internalType: 'address[]',
                name: '',
                type: 'address[]'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [],
        name: 'getEstagio',
        outputs: [
            {
                internalType:
                    'enum LicitacaoConcorrenciaSelecaoMenorPrecoC.Estagio',
                name: '',
                type: 'uint8'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'string',
                name: 'key',
                type: 'string'
            }
        ],
        name: 'getTimestamp',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [],
        name: 'iniciarCandidatura',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        inputs: [],
        name: 'licitacao',
        outputs: [
            {
                internalType: 'string',
                name: 'titulo',
                type: 'string'
            },
            {
                internalType: 'string',
                name: 'descricao',
                type: 'string'
            },
            {
                internalType: 'string',
                name: 'hashETP',
                type: 'string'
            },
            {
                internalType: 'string',
                name: 'hashEdital',
                type: 'string'
            },
            {
                internalType: 'uint256',
                name: 'dataInicio',
                type: 'uint256'
            },
            {
                internalType: 'uint256',
                name: 'dataInicioCandidaturas',
                type: 'uint256'
            },
            {
                internalType: 'uint256',
                name: 'dataFimCandidaturas',
                type: 'uint256'
            },
            {
                internalType:
                    'enum LicitacaoConcorrenciaSelecaoMenorPrecoC.Estagio',
                name: 'estagio',
                type: 'uint8'
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
        name: 'listaCandidatos',
        outputs: [
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
        inputs: [
            {
                internalType: 'string',
                name: '',
                type: 'string'
            }
        ],
        name: 'timestamps',
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

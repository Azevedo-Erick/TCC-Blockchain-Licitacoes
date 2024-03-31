#!/bin/bash

ROOT_DIR=$(pwd)

#NODES_BASE_DIR=

# CRIA OS DIRETÓRIOS DE DADOS DOS NÓS
mkdir -p Node-1/data
mkdir -p Node-2/data
mkdir -p Node-3/data
mkdir -p Node-4/data


# CRIA OS SCRIPTS DE INICIALIZAÇÃO DOS NÓS

echo "cd Node-1;besu --data-path=data --genesis-file=$ROOT_DIR/genesis.json  --config-file=$ROOT_DIR/config/config.toml " > Node-1/start_besu.sh
chmod +x Node-1/start_besu.sh

echo "cd Node-2;besu --data-path=data --genesis-file=$ROOT_DIR/genesis.json  --config-file=$ROOT_DIR/config/config.toml --p2p-port=30304 --rpc-http-port=8546" > Node-2/start_besu.sh
chmod +x Node-2/start_besu.sh

echo "cd Node-3;besu --data-path=data --genesis-file=$ROOT_DIR/genesis.json  --config-file=$ROOT_DIR/config/config.toml --p2p-port=30305 --rpc-http-port=8547" > Node-3/start_besu.sh
chmod +x Node-3/start_besu.sh

echo "cd Node-4;besu --data-path=data --genesis-file=$ROOT_DIR/genesis.json  --config-file=$ROOT_DIR/config/config.toml --p2p-port=30306   --rpc-http-port=8548" > Node-4/start_besu.sh
chmod +x Node-4/start_besu.sh


# COPIA OS ARQUIVOS DE CONFIGURAÇÃO DE PERMISSÕES PARA OS DIRETÓRIOS DE DADOS DOS NÓS
cp permissions_config.toml Node-1/data/permissions_config.toml
cp permissions_config.toml Node-2/data/permissions_config.toml
cp permissions_config.toml Node-3/data/permissions_config.toml
cp permissions_config.toml Node-4/data/permissions_config.toml

# COPIA O ARQUIVO DE CONFIGURAÇÃO DO IBFT PARA O DIRETÓRIO DE DADOS DOS NÓS
besu operator generate-blockchain-config --config-file=ibftConfigFile.json --to=networkFiles --private-key-file-name=key

# BUSCA AS PASTAS QUE ESTAO EM ./networkFiles E COPIA PARA OS DIRETÓRIOS DE DADOS DOS NÓS
KEYS_DIR=$(ls "$ROOT_DIR/networkFiles/keys")

cp networkFiles/genesis.json $ROOT_DIR/genesis.json

#for key in $KEYS_DIR copy to folder (node1 or node2 or node3 or node4)
declare -i NODE_FOLDER_INDEX=1 
for key in $KEYS_DIR
do
    cp -r networkFiles/keys/$key/* Node-$NODE_FOLDER_INDEX/data
    NODE_FOLDER_INDEX=$(($NODE_FOLDER_INDEX+1))
done

rm -rf networkFiles

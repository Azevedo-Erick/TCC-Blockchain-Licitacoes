#!/bin/bash

ENODE1="enode://9da6cc9df0a0c8c13511f33e29a49cc00072b5de2bb9c741d948852717f244f55f4fe6d44e87cd29a2ccbcb7aaa40f81b02df040daf0ff388e7d10f9ca47da15@127.0.0.1:30303"
ENODE2="enode://17e6dc0262821b4cfe1dc9b4b26dd72a53ccd9ecfedffab2df2a0e32d00153ba6150585edaf30c70cdf34c96d01da79acb3e49ac7116abe744685aa8c12642a1@127.0.0.1:30304"
ENODE3="enode://fc0201407826238bba2b3849d6efa1e6ff8e0fb299e95e3626935421e3cacf7a38e5486373927e422bdc0e1c54a3f240804525e78fe0fc9b431e39fa176d0d56@127.0.0.1:30305"
ENODE4="enode://7d76a6aa60ebbc913f1844c8877cff421a90414afc6f76625e82aa68d676fe721859b0d78b8eacec743fc0a9eaa5c7a8d9329350e85c2d62a4325bd610ab163c@127.0.0.1:30306"

echo "ADICIONADO ENODES AOS ARQUIVOS DE CONFIGURAÇÃO DE PERMISSÕES"
echo ""

# Add enode URLs for nodes to permissions configuration file
## NODE-1
curl -X POST --data "{\"jsonrpc\":\"2.0\",\"method\":\"perm_addNodesToAllowlist\",\"params\":[[\"$ENODE1\",\"$ENODE2\",\"$ENODE3\",\"$ENODE4\"]], \"id\":1}" http://127.0.0.1:8545

echo ""
## NODE-2
curl -X POST --data "{\"jsonrpc\":\"2.0\",\"method\":\"perm_addNodesToAllowlist\",\"params\":[[\"$ENODE1\",\"$ENODE2\",\"$ENODE3\",\"$ENODE4\"]], \"id\":1}" http://127.0.0.1:8546
echo ""

## NODE-3
curl -X POST --data "{\"jsonrpc\":\"2.0\",\"method\":\"perm_addNodesToAllowlist\",\"params\":[[\"$ENODE1\",\"$ENODE2\",\"$ENODE3\",\"$ENODE4\"]], \"id\":1}" http://127.0.0.1:8547
echo ""

## NODE-4
curl -X POST --data "{\"jsonrpc\":\"2.0\",\"method\":\"perm_addNodesToAllowlist\",\"params\":[[\"$ENODE1\",\"$ENODE2\",\"$ENODE3\",\"$ENODE4\"]], \"id\":1}" http://127.0.0.1:8548
echo ""


echo "ENODES ADICIONADOS AOS ARQUIVOS DE CONFIGURAÇÃO DE PERMISSÕES"

# Add nodes as peers
echo "ADICIONANDO NÓS COMO PARES"
echo ""

## add Node-1 as a peer for Node-2, Node-3, and Node-4
curl -X POST --data "{\"jsonrpc\":\"2.0\",\"method\":\"admin_addPeer\",\"params\":[\"$ENODE1\"],\"id\":1}" http://127.0.0.1:8546
echo ""

curl -X POST --data "{\"jsonrpc\":\"2.0\",\"method\":\"admin_addPeer\",\"params\":[\"$ENODE1\"],\"id\":1}" http://127.0.0.1:8547
echo ""

curl -X POST --data "{\"jsonrpc\":\"2.0\",\"method\":\"admin_addPeer\",\"params\":[\"$ENODE1\"],\"id\":1}" http://127.0.0.1:8548
echo ""

## add Node-2 as a peer for  Node-3, and Node-4
curl -X POST --data "{\"jsonrpc\":\"2.0\",\"method\":\"admin_addPeer\",\"params\":[\"$ENODE2\"],\"id\":1}" http://127.0.0.1:8547
echo ""

curl -X POST --data "{\"jsonrpc\":\"2.0\",\"method\":\"admin_addPeer\",\"params\":[\"$ENODE2\"],\"id\":1}" http://127.0.0.1:8548
echo ""


## add Node-3 as a peer for Node-4
curl -X POST --data "{\"jsonrpc\":\"2.0\",\"method\":\"admin_addPeer\",\"params\":[\"$ENODE3\"],\"id\":1}" http://127.0.0.1:8548
echo ""


echo "ENODES ADICIONADOS COMO PARES"

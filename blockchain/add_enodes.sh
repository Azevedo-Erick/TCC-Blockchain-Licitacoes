#!/bin/bash

ENODE1="enode://61c5b26ecc2d4f71e8249a7160bd2210d30141c4d6b79e51b92443d23a519f30a9e305225321083d164eec33be2fc9db2c471d4d5e0a5cf21cdc39d8bd67c3c1@127.0.0.1:30303"
ENODE2="enode://dda6c8e7f25e25586f90944b2ca9fd0c4737749bdcfde1dc280b228617dcf046621969b8d563dcf4094ae625f7b1a7982bd97997153b759a90ae5c20cd3bd3d5@127.0.0.1:30304"
ENODE3="enode://b70162bcf45dfc67ba04aa15701cfcd91052512f64a660b52580c0cb349794f454456a2aaaffb83897a92cd580a28a28e217f9a47662110344aab3ca4daf42c5@127.0.0.1:30305"
ENODE4="enode://6c7b7241b1adc6c2cf0586d83822fc8780135c942bf7c7e90391c616657c4ff7eabfcb0eb7941410b98fe9ceb11d22592dfdcaa5ea0c2c374d177bc093cc5a8b@127.0.0.1:30306"

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

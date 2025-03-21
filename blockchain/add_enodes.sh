#!/bin/bash

ENODE1="enode://27a095c9f4d385af1545f3f64e8e813e93b8a0e09d8aa53217ee7a7ec87acba2c785bdc16f1b71d1bd638cf18f96544ac7a33c2df6ff8dd3e12f6d7b78fb945e@127.0.0.1:30303"
ENODE2="enode://2f638f1abb42f25e3f8c7768f518e3b3121b95675d103ad72d05166a3cb15b92f0faf67309f2ffeeb142e73b03eab3daa9b8911b682797e38af8f5bdaeea0831@127.0.0.1:30304"
ENODE3="enode://a41cf46d66dea75a77589fdd36f04a15f7a83689dc1c84a724475af9e22a523ce501580e5b70833bcfd5e17c783e67c1d793b50f644ca28577b9de131962d18e@127.0.0.1:30305"
ENODE4="enode://4a26c6405fa0a117251bb602c2030d803b3aa807fc560a09c655b44a0851010aa8f52134cb9718440d9fdef1ffd55eed8f624fb11721cc80e4bd4ba084444b5a@127.0.0.1:30306"

check_response() {
  local RESPONSE=$1
  local ACTION=$2
  if [[ "$RESPONSE" == *"error"* ]]; then
    echo "❌ ERRO ao $ACTION"
    echo "🔎 Detalhes: $RESPONSE"
  else
    echo "✅ $ACTION concluído com sucesso"
  fi
}

echo "========================================="
echo "🔧 INICIANDO CONFIGURAÇÃO DA REDE"
echo "========================================="
echo ""

echo "🔐 Adicionando ENODEs à allowlist de permissões..."
for NODE_PORT in 8545 8546 8547 8548; do
  echo "➡️  Enviando enodes para o Node na porta $NODE_PORT"
  RESPONSE=$(curl -s -X POST --data "{\"jsonrpc\":\"2.0\",\"method\":\"perm_addNodesToAllowlist\",\"params\":[[\"$ENODE1\",\"$ENODE2\",\"$ENODE3\",\"$ENODE4\"]],\"id\":1}" http://127.0.0.1:$NODE_PORT)
  check_response "$RESPONSE" "adicionar enodes na porta $NODE_PORT"
done

echo ""
echo "🔗 Adicionando peers entre os nós..."

add_peer() {
  local FROM_PORT=$1
  local TO_ENODE=$2
  RESPONSE=$(curl -s -X POST --data "{\"jsonrpc\":\"2.0\",\"method\":\"admin_addPeer\",\"params\":[\"$TO_ENODE\"],\"id\":1}" http://127.0.0.1:$FROM_PORT)
  check_response "$RESPONSE" "Node na porta $FROM_PORT adicionar peer $TO_ENODE"
}

# Node-1
echo "➡️  Node-1 (porta 8545) adicionando peers"
add_peer 8545 "$ENODE2"
add_peer 8545 "$ENODE3"
add_peer 8545 "$ENODE4"
echo ""

# Node-2
echo "➡️  Node-2 (porta 8546) adicionando peers"
add_peer 8546 "$ENODE1"
add_peer 8546 "$ENODE3"
add_peer 8546 "$ENODE4"
echo ""

# Node-3
echo "➡️  Node-3 (porta 8547) adicionando peers"
add_peer 8547 "$ENODE1"
add_peer 8547 "$ENODE2"
add_peer 8547 "$ENODE4"
echo ""

# Node-4
echo "➡️  Node-4 (porta 8548) adicionando peers"
add_peer 8548 "$ENODE1"
add_peer 8548 "$ENODE2"
add_peer 8548 "$ENODE3"
echo ""

echo "========================================="
echo "✅ CONFIGURAÇÃO DA REDE FINALIZADA"
echo "========================================="

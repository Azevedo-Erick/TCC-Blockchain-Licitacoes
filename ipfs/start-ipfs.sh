#!/bin/sh

until ipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin '["http://0.0.0.0:5001", "http://localhost:3000", "http://127.0.0.1:5001", "https://webui.ipfs.io"]'; do
  echo "Esperando o IPFS inicializar..."
  sleep 1
done

ipfs config --json API.HTTPHeaders.Access-Control-Allow-Methods '["PUT", "POST"]'

exec ipfs daemon --migrate=true

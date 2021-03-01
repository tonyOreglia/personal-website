#!/bin/bash
echo "Path: ${PATH}"
user=$(whoami)
echo "whoami: ${user}"
echo 'getting latest...'
git pull
echo 'installing libs...'
npm i
echo 'building...'
npm run build
echo 'moving artifacts to hosting folder...'
rm -rf /root/tonycodes.com/*
mv build/* /root/tonycodes.com/
#!/bin/bash

echo "Preparing Development Source Dependency"
DS="dev-libs"
mkdir -p "$DS"
cd "$DS"


echo "Cloning Project pf-rui";
if [ -d "pf-rui" ]; then
  rm -rf pf-rui
fi
git clone https://github.com/problemfighter/pf-rui.git


echo "Cloning Project pf-react";
if [ -d "pf-react" ]; then
  rm -rf pf-react
fi
git clone https://github.com/problemfighter/pf-react.git

cd ..

echo "Installing yarn";
npm install -g yarn

echo "Installing Dependency";
yarn install
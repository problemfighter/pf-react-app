#!/bin/bash

PROJECT_NAME="pf-react-app"
if [ "$#" -e 1 ]; then
    PROJECT_NAME="$1"
fi
echo "Welcome to PF React Application (PRA)";
echo "-------------------------------------------------------------"
echo "-------------------------------------------------------------"

echo "Cloning Root Project From GitHub";
if [ -d "$PROJECT_NAME" ]; then
  rm -rf "$PROJECT_NAME"
fi
git clone https://github.com/problemfighter/pf-react-app.git

cd "$PROJECT_NAME"
bash tools/prepare-dev.sh

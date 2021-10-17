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


echo "Preparing Development Source Dependency"
cd "$PROJECT_NAME"
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

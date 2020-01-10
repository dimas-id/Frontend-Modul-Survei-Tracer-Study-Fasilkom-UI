if [ -d "$DIRECTORY" ]; then
  rm build -rf
fi
yarn
yarn build
rsync -avzhe ssh --progress ./build/* ubuntu@18.139.200.39:~/iluni12/public_html
rm -r ./build

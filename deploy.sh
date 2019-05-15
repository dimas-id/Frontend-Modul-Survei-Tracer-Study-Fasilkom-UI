if [ -d "$DIRECTORY" ]; then
  rm build -rf
fi
yarn
yarn build
rsync -avzhe ssh --progress ./build/* wisnuprama@165.22.244.180:/home/wisnuprama/iluni12/public_html
rm -r ./build

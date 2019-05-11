if [ -d "$DIRECTORY" ]; then
  rm build -rf
fi
yarn
yarn build
cd build
zip -r build.zip * .htaccess
mv build.zip ..
cd ..
# scp build.zip apps@152.118.29.35:/home/apps/iluni12/public_html/
# ssh apps@152.118.29.35 'echo rm /home/apps/iluni12/public_html/* -r'
# ssh apps@152.118.29.35 'echo unzip -o /home/apps/iluni12/public_html/build.zip -d /home/apps/iluni12/public_html/ | bash'
# ssh apps@152.118.29.35 'echo rm /home/apps/iluni12/public_html/build.zip | bash'
# rm build.zip
rm -r ./build

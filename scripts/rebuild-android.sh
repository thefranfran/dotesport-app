rm -rf node_modules
rm -rf *.lock

pnpm install

cd android

./gradlew clean

cd ..
pnpm run android && pnpm run start


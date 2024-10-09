rm -rf node_modules
rm -rf *.lock

rm -rf ios/Pods
rm -rf ios/Podfile.lock

pnpm install

watchman watch-del '/Users/francoiscipriani/Desktop/dotEsport'
watchman watch-project '/Users/francoiscipriani/Desktop/dotEsport'

pnpm run prebuild && pnpm run ios:development
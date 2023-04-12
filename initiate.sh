if [ "$1" = "build" ]
then
  echo "Building...."
  yarn build
elif [ "$1" = "start" ]
then
  echo "Starting..."

  export DATABASE_URL="postgresql://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?schema=public"

  npx prisma generate && yarn prisma:migrate && node ./dist/main
else
  echo "Invalid command line argument"
  exit 1
fi
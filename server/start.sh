echo "-----> Running application migrations"
npx sequelize db:migrate
echo "<----- Migrations created"

echo "-----> Running application seeds"
npx sequelize db:seed:all
echo "<----- Seeds created"

npm run start
# Инструкция по разворачиванию приложения
## Database
```mysql
CREATE DATABASE auto DEFAULT CHARACTER SET utf8 DEFAULT COLLATE utf8_general_ci;
```
## Laravel
```shell 
composer install
Настройка .env(DB_USERNAME, DB_PASSWORD)
php artisan migrate
php artisan key:generate
php artisan storage:link
php artisan serve --host=khizauto.backend
```
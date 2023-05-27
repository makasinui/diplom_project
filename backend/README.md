# Инструкция по разворачиванию приложения
<ol>
    <li>``` composer install ```</li>
    <li>Настройка .env(DB_DATABASE, DB_USERNAME, DB_PASSWORD)</li>
    <li>```php artisan migrate```</li>
    <li>```php artisan key:generate```</li>
    <li>```php artisan storage:link```</li>
    <li>```php artisan serve --host=khizauto.backend```</li>
</ol>
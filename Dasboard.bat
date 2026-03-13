@echo off
cd /d "C:\xampp\htdocs\Dashboard"
start /B php artisan serve --host=0.0.0.0 --port=8022
exit
<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class DepartmentUsersSeeder extends Seeder
{
    public function run(): void
    {
        $departments = [
            'Ventas' => 'ventas@gmail.com',
            'Transporte' => 'transporte@gmail.com',
            'Tecnologia' => 'tecnologia@gmail.com',
            'Finanzas' => 'finanzas@gmail.com',
            'Operaciones' => 'operaciones@gmail.com',
            'Compras' => 'compras@gmail.com',
            'Mercadeo' => 'mercadeo@gmail.com',
            'Recursos Humanos' => 'rrhh@gmail.com',
        ];

        foreach ($departments as $deptName => $email) {
            $user = User::firstOrCreate(
                ['email' => $email],
                [
                    'name' => "Usuario $deptName",
                    'password' => Hash::make('password'),
                    'department' => $deptName,
                    'is_admin' => false,
                ]
            );

            if ($user->department !== $deptName) {
                $user->department = $deptName;
                $user->save();
            }

            $this->command->info("Usuario creado/actualizado para $deptName: $email");
        }
    }
}
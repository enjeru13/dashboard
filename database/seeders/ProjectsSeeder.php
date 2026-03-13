<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Project;

class ProjectsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $departments = [
            'Ventas',
            'Transporte',
            'Tecnologia',
            'Finanzas',
            'Operaciones',
            'Compras',
            'Mercadeo',
            'Recursos Humanos',
            'Operaciones BQ' // Agregado
        ];

        // Crear o actualizar el Admin
        User::updateOrCreate(
            ['email' => 'admin@gmail.com'],
            [
                'name' => 'Admin User',
                'password' => Hash::make('password'),
                'department' => 'Tecnologia',
                'is_admin' => true
            ]
        );

        foreach ($departments as $dept) {
            Project::updateOrCreate(
                ['name' => "Proyecto Demo $dept"], // Busca por nombre para no duplicar
                [
                    'description' => "Descripción del proyecto para $dept.",
                    'department' => $dept,
                    'url' => 'https://example.com',
                    'icon' => substr($dept, 0, 2),
                ]
            );
        }

        $this->command->info("Proyectos sincronizados correctamente.");
    }
}
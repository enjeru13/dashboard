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
            'Recursos Humanos'
        ];

        if (!User::where('email', 'admin@gmail.com')->exists()) {
            User::factory()->create([
                'name' => 'Admin User',
                'email' => 'admin@gmail.com',
                'password' => Hash::make('password'),
                'department' => 'Tecnologia',
                'is_admin' => true
            ]);
        }

        foreach ($departments as $dept) {
            Project::create([
                'name' => "Proyecto Demo $dept",
                'description' => "Descripción del proyecto para $dept.",
                'department' => $dept,
                'url' => 'https://example.com',
                'icon' => substr($dept, 0, 2),
            ]);
        }
    }
}

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        $user = auth()->user();

        if ($user->is_admin) {
            $projects = \App\Models\Project::all()->groupBy('department');
        } else {
            $projects = \App\Models\Project::where('department', $user->department)
                ->get()
                ->groupBy('department');
        }

        return \Inertia\Inertia::render('dashboard', [
            'projects' => $projects,
        ]);
    }
}

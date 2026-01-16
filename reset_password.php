<?php
$user = \App\Models\User::find(1);
if ($user) {
    $user->password = \Illuminate\Support\Facades\Hash::make('password');
    $user->save();
    echo "Password reset for user: " . $user->email . "\n";
} else {
    echo "User not found.\n";
}

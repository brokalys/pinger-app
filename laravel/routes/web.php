<?php

use App\Http\Controllers\PageController;
use App\Http\Controllers\PingerConfirmController;
use App\Http\Controllers\PingerController;
use App\Http\Controllers\PingerUnsubscribeController;
use Illuminate\Support\Facades\Route;

// Static pages
Route::get('/', [PageController::class, 'landing'])->name('home');
Route::get('/privacy-policy', [PageController::class, 'privacyPolicy'])->name('privacy-policy');
Route::get('/terms-and-conditions', [PageController::class, 'termsAndConditions'])->name('terms');

// Pinger creation
Route::get('/create', [PingerController::class, 'create'])->name('pinger.create');
Route::post('/pingers', [PingerController::class, 'store'])->name('pinger.store');
Route::get('/pinger/success', [PingerController::class, 'success'])->name('pinger.success');

// Email confirmation (GET so email clients can prefetch safely; idempotent)
Route::get('/confirm/{token}', [PingerConfirmController::class, 'confirm'])->name('pinger.confirm');

// Unsubscribe
Route::get('/unsubscribe/{token}', [PingerUnsubscribeController::class, 'unsubscribe'])->name('pinger.unsubscribe');
Route::get('/unsubscribed', [PingerUnsubscribeController::class, 'unsubscribed'])->name('pinger.unsubscribed');

// Alert management (token acts as ownership proof)
Route::get('/manage/{token}', [PingerController::class, 'manage'])->name('pinger.manage');
Route::delete('/pingers/{pinger}', [PingerController::class, 'destroy'])->name('pinger.destroy');

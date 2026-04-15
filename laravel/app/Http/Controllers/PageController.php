<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class PageController extends Controller
{
    public function landing(): Response
    {
        return Inertia::render('Landing');
    }

    public function privacyPolicy(): Response
    {
        return Inertia::render('PrivacyPolicy');
    }

    public function termsAndConditions(): Response
    {
        return Inertia::render('TermsAndConditions');
    }
}

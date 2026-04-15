<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StorePingerRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'email'         => ['required', 'email', 'max:255'],
            'property_type' => ['required', Rule::in(['house', 'apartment', 'townhouse', 'unit', 'section', 'rural', 'commercial'])],
            'listing_type'  => ['required', Rule::in(['sale', 'rent'])],
            'price_min'     => ['nullable', 'integer', 'min:0', 'max:10000000000'],
            'price_max'     => ['nullable', 'integer', 'min:0', 'max:10000000000', 'gte:price_min'],
            'bedrooms_min'  => ['nullable', 'integer', 'min:1', 'max:20'],
            'bedrooms_max'  => ['nullable', 'integer', 'min:1', 'max:20', 'gte:bedrooms_min'],
            'area_m2_min'   => ['nullable', 'integer', 'min:1'],
            'area_m2_max'   => [
                'nullable',
                'integer',
                'min:1',
                'gte:area_m2_min',
                function ($attribute, $value, $fail) {
                    $type = $this->input('property_type');
                    $max  = in_array($type, ['section', 'rural']) ? 1_000_000 : 1_000;
                    if ($value > $max) {
                        $fail("Area max cannot exceed {$max} m² for this property type.");
                    }
                },
            ],
            'polygon'      => ['required', 'string', 'regex:/^POLYGON\(\(-?[\d.]+ -?[\d.]+/i'],
            'frequency'    => ['required', Rule::in(['immediate', 'daily', 'weekly', 'monthly'])],
            'agree_terms'  => ['accepted'],
        ];
    }

    public function messages(): array
    {
        return [
            'agree_terms.accepted' => 'You must agree to the terms and conditions.',
            'polygon.required'     => 'Please draw an area on the map.',
            'polygon.regex'        => 'The selected area is invalid. Please redraw on the map.',
            'price_max.gte'        => 'Maximum price must be greater than or equal to minimum.',
            'bedrooms_max.gte'     => 'Maximum bedrooms must be greater than or equal to minimum.',
            'area_m2_max.gte'      => 'Maximum area must be greater than or equal to minimum.',
        ];
    }

    /**
     * Prepare data before validation: convert dollar amounts to cents.
     */
    protected function prepareForValidation(): void
    {
        $this->merge([
            'price_min' => $this->price_min !== null ? (int) round($this->price_min * 100) : null,
            'price_max' => $this->price_max !== null ? (int) round($this->price_max * 100) : null,
        ]);
    }
}

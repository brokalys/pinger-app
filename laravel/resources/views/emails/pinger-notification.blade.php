<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New properties matching your alert</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Inter', Arial, sans-serif; background: #f4f4f5; margin: 0; padding: 0; }
    .wrapper { max-width: 600px; margin: 40px auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e4e4e7; }
    .header { background: #0a0a0a; padding: 32px 40px; }
    .header-logo { color: #ffffff; font-size: 18px; font-weight: 700; letter-spacing: -0.5px; margin: 0 0 4px; }
    .header-logo span { color: #16a34a; }
    .header-sub { color: #a1a1aa; font-size: 14px; margin: 0; }
    .body { padding: 40px; }
    h1 { font-size: 24px; font-weight: 800; color: #0a0a0a; margin: 0 0 8px; letter-spacing: -0.5px; }
    .subtitle { font-size: 15px; color: #71717a; margin: 0 0 32px; }
    .property { border: 1px solid #e4e4e7; border-radius: 10px; margin-bottom: 16px; overflow: hidden; }
    .property-img { width: 100%; height: 180px; object-fit: cover; display: block; background: #f4f4f5; }
    .property-body { padding: 16px 20px; }
    .property-price { font-size: 20px; font-weight: 800; color: #16a34a; margin: 0 0 4px; letter-spacing: -0.5px; }
    .property-address { font-size: 14px; color: #71717a; margin: 0 0 8px; }
    .property-meta { font-size: 13px; color: #52525b; margin: 0 0 12px; }
    .property-meta span { margin-right: 12px; }
    .btn-view { display: inline-block; background: #0a0a0a; color: #ffffff !important; text-decoration: none; padding: 10px 20px; border-radius: 6px; font-size: 13px; font-weight: 600; }
    .footer { padding: 24px 40px; border-top: 1px solid #e4e4e7; }
    .footer p { font-size: 13px; color: #a1a1aa; margin: 0; }
    .footer a { color: #71717a; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <p class="header-logo">PropertyPing<span>.nz</span></p>
      <p class="header-sub">{{ $pinger->formatted_property_type }} · {{ $pinger->formatted_listing_type }}</p>
    </div>
    <div class="body">
      <h1>
        {{ $properties->count() }}
        new {{ $properties->count() === 1 ? 'property' : 'properties' }}
      </h1>
      <p class="subtitle">Matching your alert in your selected area.</p>

      @foreach($properties as $property)
      <div class="property">
        @if($property->image_url)
          <img src="{{ $property->image_url }}" class="property-img" alt="{{ $property->address }}">
        @endif
        <div class="property-body">
          <p class="property-price">{{ $property->formatted_price }}</p>
          @if($property->address)
            <p class="property-address">{{ $property->address }}</p>
          @endif
          <p class="property-meta">
            @if($property->bedrooms)
              <span>{{ $property->bedrooms }} bed</span>
            @endif
            @if($property->area_m2)
              <span>{{ number_format($property->area_m2) }} m²</span>
            @endif
            <span>{{ ucfirst($property->property_type) }}</span>
          </p>
          @if($property->url)
            <a href="{{ $property->url }}" class="btn-view">View listing →</a>
          @endif
        </div>
      </div>
      @endforeach
    </div>
    <div class="footer">
      <p>
        PropertyPing.nz ·
        <a href="{{ $manageUrl }}">Manage alerts</a> ·
        <a href="{{ $unsubscribeUrl }}">Unsubscribe</a>
      </p>
    </div>
  </div>
</body>
</html>

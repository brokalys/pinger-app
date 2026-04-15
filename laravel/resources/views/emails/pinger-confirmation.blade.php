<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Confirm your Property Ping Alert</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Inter', Arial, sans-serif; background: #f4f4f5; margin: 0; padding: 0; }
    .wrapper { max-width: 600px; margin: 40px auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e4e4e7; }
    .header { background: #0a0a0a; padding: 32px 40px; }
    .header-logo { color: #ffffff; font-size: 18px; font-weight: 700; letter-spacing: -0.5px; margin: 0; }
    .header-logo span { color: #16a34a; }
    .body { padding: 40px; }
    h1 { font-size: 24px; font-weight: 800; color: #0a0a0a; margin: 0 0 12px; letter-spacing: -0.5px; }
    p { font-size: 15px; color: #52525b; line-height: 1.6; margin: 0 0 20px; }
    .btn { display: inline-block; background: #16a34a; color: #ffffff !important; text-decoration: none; padding: 14px 28px; border-radius: 8px; font-size: 15px; font-weight: 600; margin: 8px 0 28px; }
    .details { background: #f4f4f5; border-radius: 8px; padding: 20px 24px; margin: 24px 0; }
    .details h2 { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #71717a; margin: 0 0 12px; }
    .detail-row { display: flex; justify-content: space-between; font-size: 14px; padding: 6px 0; border-bottom: 1px solid #e4e4e7; }
    .detail-row:last-child { border-bottom: none; }
    .detail-label { color: #71717a; }
    .detail-value { color: #0a0a0a; font-weight: 500; }
    .footer { padding: 24px 40px; border-top: 1px solid #e4e4e7; }
    .footer p { font-size: 13px; color: #a1a1aa; margin: 0; }
    .footer a { color: #71717a; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <p class="header-logo">PropertyPing<span>.nz</span></p>
    </div>
    <div class="body">
      <h1>Confirm your alert</h1>
      <p>You've set up a property ping alert. Click below to confirm your email address and activate it.</p>

      <a href="{{ $confirmUrl }}" class="btn">Confirm my alert →</a>

      <div class="details">
        <h2>Alert summary</h2>
        <div class="detail-row">
          <span class="detail-label">Property type</span>
          <span class="detail-value">{{ $pinger->formatted_property_type }}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Listing type</span>
          <span class="detail-value">{{ $pinger->formatted_listing_type }}</span>
        </div>
        @if($pinger->price_min || $pinger->price_max)
        <div class="detail-row">
          <span class="detail-label">Price range</span>
          <span class="detail-value">
            {{ $pinger->price_min ? 'NZ$'.number_format($pinger->price_min / 100) : 'No min' }}
            –
            {{ $pinger->price_max ? 'NZ$'.number_format($pinger->price_max / 100) : 'No max' }}
          </span>
        </div>
        @endif
        <div class="detail-row">
          <span class="detail-label">Notifications</span>
          <span class="detail-value">{{ $pinger->formatted_frequency }}</span>
        </div>
      </div>

      <p style="font-size:13px; color:#a1a1aa;">If you didn't sign up for this, you can safely ignore this email. It won't activate without confirmation.</p>
    </div>
    <div class="footer">
      <p>PropertyPing.nz · New Zealand · <a href="{{ $unsubscribeUrl }}">Unsubscribe</a></p>
    </div>
  </div>
</body>
</html>

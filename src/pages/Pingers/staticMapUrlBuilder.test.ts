import { staticMapUrlBuilder } from "./staticMapUrlBuilder";

describe("staticMapUrlBuilder", () => {
  it("should return a valid URL", () => {
    const polygonPath = [
      { lat: 56.95, lng: 24.1 },
      { lat: 56.95, lng: 24.2 },
      { lat: 56.85, lng: 24.2 },
      { lat: 56.85, lng: 24.1 },
    ];
    const size = { width: 700, height: 400 };

    const result = staticMapUrlBuilder(polygonPath, size);

    expect(result).toMatchInlineSnapshot(
      `"https://maps.googleapis.com/maps/api/staticmap?key=NO_KEY_PROVIDED&size=700x400&path=color%3A0x000000ff%7Cfillcolor%3A0x00000050%7Cweight%3A3%7C56.95%2C24.1%7C56.95%2C24.2%7C56.85%2C24.2%7C56.85%2C24.1"`,
    );
  });
});

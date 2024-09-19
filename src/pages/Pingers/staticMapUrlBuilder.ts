export const staticMapUrlBuilder = (
  polygonPath: { lat: number; lng: number }[],
  size: { width: number; height: number },
) => {
  const key = process.env.REACT_APP_GOOGLE_MAPS_KEY || "NO_KEY_PROVIDED";

  const url = new URL("https://maps.googleapis.com/maps/api/staticmap");
  url.searchParams.set("key", key);
  url.searchParams.set("size", `${size.width}x${size.height}`);
  const path = polygonPath
    .map((point) => `${point.lat},${point.lng}`)
    .join("|");

  const color = "0x000000ff";
  const fill = "0x00000050";

  url.searchParams.set(
    "path",
    `color:${color}|fillcolor:${fill}|weight:3|${path}`,
  );

  return url.toString();
};

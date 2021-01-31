/// <reference types="googlemaps" />

function polygonToString(polygon: google.maps.Polygon) {
  const region = polygon
    .getPath()
    .getArray()
    .map((row) => [row.lat().toFixed(6), row.lng().toFixed(6)].join(" "));
  region.push(region[0]);
  return region.join(", ");
}

function polygonStringToCoords(str: string) {
  const path = str.split(", ").map((row) => {
    const [lat, lng] = row.split(" ");

    if (lat === undefined || lng === undefined) {
      throw new Error("Invalid coordinates provided");
    }

    return {
      lat: parseFloat(lat),
      lng: parseFloat(lng),
    };
  });
  path.pop();
  return path;
}

const fns = { polygonToString, polygonStringToCoords };

export default fns;

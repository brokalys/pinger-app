import convert from "./conversion";

describe("RegionSelector: conversion", () => {
  describe("polygonToString", () => {
    it("converts a polygon to a string", () => {
      const expectation =
        "56.992294 24.136619, 56.976394 23.995790, 56.924904 24.005336, 56.889288 24.108467, 56.932211 24.291935, 56.996502 24.245176, 56.992294 24.136619";
      const input = {
        getPath: () => ({
          getArray: () => [
            { lat: () => 56.992294, lng: () => 24.136619 },
            { lat: () => 56.976394, lng: () => 23.99579 },
            { lat: () => 56.924904, lng: () => 24.005336 },
            { lat: () => 56.889288, lng: () => 24.108467 },
            { lat: () => 56.932211, lng: () => 24.291935 },
            { lat: () => 56.996502, lng: () => 24.245176 },
          ],
        }),
      };

      const output = convert.polygonToString(input);

      expect(output).toEqual(expectation);
    });
  });

  describe("polygonStringToCoords", () => {
    it("converts string coordinates to polygon coordinates object", () => {
      const expectation = [
        { lat: 56.992294, lng: 24.136619 },
        { lat: 56.976394, lng: 23.99579 },
        { lat: 56.924904, lng: 24.005336 },
        { lat: 56.889288, lng: 24.108467 },
        { lat: 56.932211, lng: 24.291935 },
        { lat: 56.996502, lng: 24.245176 },
      ];
      const input =
        "56.992294 24.136619, 56.976394 23.995790, 56.924904 24.005336, 56.889288 24.108467, 56.932211 24.291935, 56.996502 24.245176, 56.992294 24.136619";

      const output = convert.polygonStringToCoords(input);

      expect(output).toEqual(expectation);
    });

    it("throws an error if invalid coordinates provided", () => {
      const expectation = [
        { lat: 56.992294, lng: 24.136619 },
        { lat: 56.976394, lng: 23.99579 },
        { lat: 56.924904, lng: 24.005336 },
      ];
      const input = "56.992294, 56.976394 23.995790, 56.924904 24.005336";

      expect(() => {
        convert.polygonStringToCoords(input);
      }).toThrowError();
    });
  });
});

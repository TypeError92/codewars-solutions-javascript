const { central_pixels } = require('./centre-of-attention');

describe('central_pixels', () => {
  it("should return a new array", () => {
    const image = []
    const result = central_pixels(image, 0)
    expect(Array.isArray(result)).toBeTruthy()
    expect(image).not.toBe(result)
  })
  it("should pass the author's sample tests", () => {
    const image = {
      pixels: [
        1, 1, 4, 4, 4, 4, 2, 2, 2, 2, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1,
        2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 3, 2, 2, 2, 2, 1, 1, 1, 1, 1, 3, 3, 3,
        2, 2, 1, 1, 1, 1, 1, 1, 3, 3, 3, 3,
      ],
      width: 10,
      height: 6
    };
    // Only one "red" pixel (colour = 1) has the maximum depth of 3:
    expect(central_pixels(image, 1).sort()).toEqual([32])
    // Multiple "blue" pixels (colour = 2) have the maximum depth of 2:
    expect(central_pixels(image, 2).sort()).toEqual([ 16,17,18,26,27,28,38 ])
    // All the "green" pixels (colour = 3) have depth 1, so they are all "central":
    expect(central_pixels(image, 3).sort()).toEqual([ 35,45,46,47,56,57,58,59 ])
    // Similarly, all the "purple" pixels (colour = 4) have depth 1:
    expect(central_pixels(image, 4).sort()).toEqual([ 2,3,4,5 ])
    // There are no pixels with colour 5:
    expect(central_pixels(image, 5).sort()).toEqual([])
  });
});

function central_pixels(image, colour) {
  // Convert 1D input into 2D array
  const rows = [];
  const [w, h] = [image.width, image.height];
  for (let i = 0; i < h; i++) {
    rows.push(image.pixels.slice(i * w, (i + 1) * w));
  }

  // First loop
  const depths = [];
  let depth = 0;
  rows.forEach((row, i) => {
    depths.push([]);
    row.forEach((pixel, j) => {
      // Set dummy value for all pixels of colours other than the specified one
      if (pixel !== colour) depth = 0;
      else if (
        // Check if the pixel is on an edge
        i === 0 ||
        i === h - 1 ||
        j === 0 ||
        j === w - 1 ||
        // Check if a neighbouring pixel has a different colour
        rows[i - 1][j] !== pixel ||
        rows[i][j - 1] !== pixel ||
        rows[i + 1][j] !== pixel ||
        rows[i][j + 1] !== pixel
      ) {
        depth = 1;
      } else depth = Math.min(depths[i - 1][j], depths[i][j - 1]) + 1;
      depths[i].push(depth);
    });
  });

  // Second loop
  let maxDepth = 1;
  let centralPixels = [];

  for (let i = h - 1; i >= 0; i--) {
    const depthRow = depths[i];
    for (let j = w - 1; j >= 0; j--) {
      let pixelDepth = depthRow[j];
      // Ignore pixels of other colours
      if (pixelDepth) {
        // Check for shorter paths to the bottom and to the right and correct depth if necessary
        if (pixelDepth > 1) {
          const minDepthBR = Math.min(depths[i + 1][j], depths[i][j + 1]);
          if (minDepthBR < pixelDepth - 1) {
            pixelDepth = minDepthBR + 1;
            depthRow[j] = pixelDepth;
          }
        }
        if (pixelDepth === maxDepth) centralPixels.push(i * w + j);
        else if (pixelDepth > maxDepth) {
          maxDepth = pixelDepth;
          centralPixels = [i * w + j];
        }
      }
    }
  }

  return centralPixels;
}

module.exports = { central_pixels };

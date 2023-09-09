# Centre of Attention: Solution

## Theory
There is only minimal maths involved here in calculating neighbours and determining whether a given pixel is on the edge of the image.

## Strategy
1. Clearly, we are going to ignore all pixels that do not match the specified colour.

2. Getting the pixels as a one-dimensional array is somewhat counterintuitive. Converting it to a 2D array first would make things easier, but it'll effectively add another iteration, which is problematic given that we know that performance if a factor to consider. Strategy: solve it in with the help of 2D conversion, then refactor.

3. Since performance is an issue, we want to minimise  
a) the number of iterations through the original array (the instructiosn kindly tell us that 2 are sufficient) and  
b) the number of the number of pixels whose depth we actually test.

We'll figure out a) as we go. As far is b) is concerned, here are some initial observations:
- Any pixel on the edge of the image will have a depth of 1.
- Any pixel neighbouring a pixel of a different colour will have a depth of 1.
- Any other pixel will be surrounded by pixels of the same colour, at its depth will be the minimum of it's neighbouring pixels' depths +1.
- Even if we haven't calculated the depth for a all of a pixel's neighbours yet, we know that if it has a neighbour (of the same colour) of some depth d, it's own depth will be <= d + 1.

Having made these observations, how can we determine the depth for every pixel of the specified colour with just two iterations (discounting the one we need for conversion)?

Idea: iterate forwards the first time and backwards the second time!  

The first time, for each pixel of the specified colour, we will only check the pixel to its _top_ and the pixel to its _left_ - i.e. those that have already been checked. If either neighbour a) does not exist (because the pixel is on an edge) or b) has a different colour, we assign a (final) depth of 1; otherwise, we assign a provisinoal depth of the minimum of its neighbours' depths + 1. Note that while it is tempting to already keep track of the current maximum depth, we cannot do this as some of our provisionally calculated depths may be too high!  

The second time, we start with the bottom-right pixel and work our way backwards to the top-left. This time, we can also ignore all pixels that do have the right colour but have a depth of 1. For each pixel of the right colour with a depth > 1, we will now check its _right_ and its _bottom_ neighbour. Again, if either is undefined or of a different colour.  
This time, we _will_ keep track of the current maximum depth in order to avoid further iterations. We will do this as follows:  
1. Create a variable to keep track of the current maximum depth, initialised at 1 (any number < 1 works too).
2. Create an empty array to collect the indices of our central pixels.
3. During the (second) iteration, proceed as follows:
    - If the current pixel's depth equals the current max, add its index to the array.
    - If the current pixel's depth is _higher than_ the current maximum, set the maximum to the pixel's depth and replace the array with one containing only the current index.

This should work. The indices in our final array will be in reverse order, but the instructions make it clear that we needn't worry about that.

Let's do this!
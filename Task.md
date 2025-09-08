# Note

For the purposes of Code Evaluation, I am writing this assessment by hand. This file exists as a local ticket for my own reference.

## Description

Use this color api to build a grid of HSL color swatches that takes in user inputs for saturation (S) and lightness (L), and renders a single swatch for each of the distinct hue names for the given S and L values from the API.

## Acceptance Criteria

- [x] Provide a means for users to input Saturation and Lightness values
- [x] For the given Saturation and Lightness value, obtain all named associated with possible Hue values (1-360)
- [x] For each named color obtained, display a Color Swatch
- [x] For each swatch, display:
  - [x] The color, rendered as a square
  - [x] The color name
  - [x] The color's RGB value
- [x] The list of swatches should fill the viewport across the x axis
- [x] The display should be responsive

## Design Considerations

There is a worst case possibility of one name existing for each hue value, 1 - 360. ~However, the API provides a 'closest_named_hex' property that can be used to skip forward when obtaining named colors.~

The Saturation and Lightness values are percentages. A slider interaction combined with text input may be a useful UX

Saturation and Lightness inputs should be debounced to avoid kicking off the SL search sequence too often.

As we're making many API calls to get all color names, a loading indicator should be provided, and colors should be loaded in as soon as they are available

## Notes

- Discovered a bad assumption around closest_named_hex. It has no guarantee of using the S and L values being searched for, may still be able to use it to determine 'arcs' to search in

- Ended up using color name distance to try to reduce api calls. Not 100% happy with it.

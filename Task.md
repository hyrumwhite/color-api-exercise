# Note

For the purposes of Code Evaluation, I am coding this assessment by hand. This file exists as a local ticket for my own reference.

## Description

Use this color api to build a grid of HSL color swatches that takes in user inputs for saturation (S) and lightness (L), and renders a single swatch for each of the distinct hue names for the given S and L values from the API.

## Acceptance Criteria

- [ ] Provide a means for users to input Saturation and Lightness values
- [ ] For the given Saturation and Lightness value, obtain all named associated with possible Hue values (1-360)
- [ ] For each named color obtained, display a Color Swatch
- [ ] For each swatch, display:
  - [ ] The color, rendered as a square
  - [ ] The color name
  - [ ] The color's RGB value
- [ ] The list of swatches should fill the viewport across the x axis
- [ ] The display should be responsive

## Design Considerations

There is a worst case possibility of one name existing for each hue value, 1 - 360. However, the API provides a 'closest_named_hex' property that can be used to skip forward when obtaining named colors.

The Saturation and Lightness values are percentages. A slider interaction combined with text input may be a useful UX

Saturation and Lightness inputs should be debounced to avoid kicking off the SL search sequence too often.

As we're making many API calls to get all color names, a loading indicator should be provided, and colors should be loaded in as soon as they are available

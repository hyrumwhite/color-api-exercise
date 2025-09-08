# Color API Exercise

## Setup

This is a vite project using Vue and Tailwind. To run it locally:

1. Install Node v24 (preferably via [fnm](https://github.com/Schniz/fnm), [nvm](https://github.com/nvm-sh/nvm), or [nvm-windows](https://github.com/coreybutler/nvm-windows))
2. In the root directory run: `npm i`
3. Run `npm run build`
4. Run `npm run preview`

To run via Docker:

1. Install Docker Desktop
2. Run `docker build -t color-api-exercise .`
3. Locate and run the new color-api-exercise image

## Design Choices

The centerpiece of this assignment is the generator method in [getNamedColors](src\api\getNamedColors.ts). I chose an async generator paired with a "for await of" in the consuming store. Async generators were created for async iteration, and I like that using it implies to the developer that the result is not just a one-off API call. As far as optimizing for API calls, my priority was ensuring no named colors were skipped. To that end, I initially designed a skip method that would try to derive a skip forward number based on the name.distance of the color response. Because I prioritized getting all the names, if the skip ever left the name 'group', I skip, then backtrack until I find the name group I left. While fine tuning the distance/skip relationship, I accidentally set it to 10 regardless of distance, and I never got better results than this, so I kept 10 as my magic skip number. This tends to keep API calls in the 240ish range. I look forward to talking about better optimization methods.

For UX, since we're dealing with percentage inputs, I thought sliders would be nice for inputs, with text boxes for precise entry. I also wanted to keep the controls present at all times, so I arranged the color scrolling to be separate from the controls. Mobile sized widths swap the order of the tools and the color display, putting the tools in easy thumb range for users. I also provided a button to hide the tools on mobile as they take up a good chunk of the screen. I display a deterministic loading bar on the tool submit button so users can track progress, and I load colors in as soon as their available so users can work with the data as it comes in.

I had a lot of fun with this exercise, and look forward to discussing it!

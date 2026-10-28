# Thanalakshimi Birthday Surprise Website ♡

A responsive birthday website made with plain HTML, CSS and JavaScript.

## How to run
1. Extract this ZIP file.
2. Open `index.html` in Chrome, Edge, or another modern browser.
3. Internet is only needed for the decorative Google Fonts. The website itself runs locally.

## Add your videos later
Place the videos inside the `assets` folder:
- `assets/intro-video.mp4` — plays on the first video screen after the opening heart.
- `assets/cake-surprise.mp4` — appears after clicking the cake.

If the video files are not added yet, a placeholder card is shown. The Continue buttons still let you explore the website.

## Add your photos later
In `index.html`, find the `<!-- 5. Memories: reveal one by one -->` section.
Each `.memory-card` currently has a decorative placeholder. Replace the inside of a card's `.memory-image` with an image, for example:

```html
<div class="memory-image">
  <img src="assets/photo-01.jpg" alt="A lovely memory">
</div>
```

Put the photo in the `assets` folder and repeat for the other memory cards. The heart button reveals each card one at a time.

## Change the birthday message
Edit the letter and final-wish text directly in `index.html`.

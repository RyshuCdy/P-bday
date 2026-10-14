# For Priya
A static birthday storybook with 21 final V1 illustrations, the dynamic lyric film, a letter drawn from the birthday song, and a wish candle.

## Preview
Run `python3 -m http.server 4173` in this folder, then open http://localhost:4173.

## Publish to GitHub Pages
1. Sign in using `gh auth login`.
2. Initialize this folder as a repository with branch `main`, commit its contents, then create and push a GitHub repository.
3. In repository Settings → Pages, select GitHub Actions as the source. Run the included Publish birthday site workflow.
4. Write the resulting HTTPS website URL onto the NFC tag as a URL record. Test with her phone before gifting it.

The site and media are publicly accessible when published on public GitHub Pages. The opening animation runs on each visit. Sound starts when the visitor plays the film. Images are optimized JPEG copies; originals remain in the parent project. The film is an H.264/AAC web copy with fast-start metadata.

Edit the letter in `index.html`, appearance in `style.css`, interactions in `app.js`, and scene captions in `scenes.json`. No build step or backend is required.

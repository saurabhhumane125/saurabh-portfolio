# Portfolio artwork

`public/images/portrait-black.png` was edited using the built-in image generation tool from the original stylized portrait, preserving the user-provided reference identity. It is a stylized portrait rather than an unedited photograph, at 1086 × 1448 pixels. The prior portrait is retained as the original source asset.

Final prompt:

> Edit this pixel-art portrait. Change only the burgundy polo shirt into a plain black crewneck T-shirt. Preserve the man's exact identity, face, hair, head size, head position, skin tone, expression, camera, pixel illustration style, red rim lighting and dark background. Same portrait composition, no text, no added objects.

The current hero displays the black-shirt portrait directly. The superhero mask and face-reveal controls have been removed. `src/components/CursorGlitter.tsx` renders a page-wide decorative particle canvas: slightly denser, brighter dots react to the cursor and settle back into position. It does not intercept clicks or scrolling, pauses in hidden tabs, and renders a static field for reduced motion.

Project interface illustrations are rendered in HTML and SVG and explicitly labeled as concept previews. Resume content and the downloadable PDF come from the user-supplied resume. Creative sections and Instagram links have been removed from the current portfolio.

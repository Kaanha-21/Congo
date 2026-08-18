# Birthday magic

This is a dependency-free birthday site, ready to publish with GitHub Pages. Keep `skin.png` and `purple.png` beside `index.html` (the page references those exact filenames).

## Public site

Once the GitHub Pages workflow has finished, share:

`https://kaanha-21.github.io/Congo/`

## Gift-card link

The gift link is set in one place at the top of `script.js`:

```js
const GIFT_CARD_URL = "https://www.amazon.in/g/UQ7V4GMMCBKFF8HS?ref=gc_yo";
```

Replace only that value if the gift link ever changes. The card opens valid `https`/`http` links safely in a new tab.

## Run locally

From this folder, start any static server, for example:

```powershell
python -m http.server 4173
```

Then open [http://localhost:4173](http://localhost:4173).

To view it from another device on the same Wi-Fi, find this computer's local IPv4 address and open `http://YOUR-IP:4173` on the phone. Allow the server through the private-network firewall prompt if Windows shows one.

No build step or package installation is required. Pushes to `main` deploy automatically through the included GitHub Pages workflow.

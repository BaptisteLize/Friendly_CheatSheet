# Fonction compute de nombre

```js
export function computeStrength(level) {
  let strength = 0;

  if (level >= 1) { strength += Math.min(level, 50); }

  if (level > 50) { strength += Math.floor(Math.min(level, 100) - 50) / 2; }

  if (level > 100) { strength += Math.floor(Math.min(level, 200) - 100) / 3; }

  if (level > 200) { strength += Math.floor(level - 200) / 5; }

  return Math.floor(strength);
}


// Pour un calcul de niveau 150

// [1–50]       → +50 pts (1 pt / lvl)
// [51–100]     → +25 pts (1 pt / 2 lvls)
// [101–150]    → +16 pts (1 pt / 3 lvls)
// [151–200]    → ignoré
// [201+]       → ignoré
// ----------------------------
// Total:         91 points
```

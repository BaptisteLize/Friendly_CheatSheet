# Exemple test unitaire

Test pour une fonction avec multiples cas potentiels :
```js
import assert from "node:assert";
import { describe, it } from "node:test";
import { toTitleCaseFr } from "./toTitleCaseFr.js";


describe("toTitleCaseFr", () => {
  
  const testCases = [
    { input: "oclock", expected: "Oclock" },
    { input: "oCL0ck!", expected: "Ocl0ck!" },
    { input: "", expected: "" },
    { input: "Hello world", expected: "Hello World" },
    { input: "BONJOUR MONDE", expected: "Bonjour Monde" },
    { input: "Mais qu'est-ce qu'il se passe ici ?", expected: "Mais Qu'est-ce Qu'il Se Passe Ici ?" },
  ];

  testCases.forEach(({ input, expected }) => {
    it(`should convert "${input}" to "${expected}"`, () => {
      const result = toTitleCaseFr(input);
      assert.equal(result, expected);
    });
  });
});
```

Environnement de test ici node, fichier `nomFonction.js` + fichier `nomFonction.unit.test.js`, dans le terminal appliquer node --test 'chemin/vers/le/fichier.unit.test.js'

# Exemple d'un fichier index.js

Après construction des associations dans le fichier associations.js, pour plus de clarté et de simplicité lors de l'utilisation, il est d'usage de regrouper les imports nommés et les exports nommés dans un fichier index structuré comme suit :

```js
import { Quiz, Question, Answer, Tag, User, Level } from "./associations.js";

export { Quiz, Question, Answer, Tag, User, Level };
```

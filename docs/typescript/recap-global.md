# 🚀 Fiche récapitulative TypeScript

Toute cette fiche de récap a été réalisée par [YannickOclock](https://github.com/YannickOclock)

## 📌 Les bases de TypeScript

### Types primitifs

```ts
let nombre: number = 42;
let texte: string = "Hello TypeScript";
let estVrai: boolean = true;
let indefini: undefined = undefined;
let rien: null = null;
```

### Types spéciaux

```ts
let quelconque: any = "Je peux être n'importe quoi";
let inconnu: unknown = 4;  // Plus sûr que 'any', nécessite vérification
let jamais: never;         // Pour les fonctions qui ne retournent jamais
let vide: void = undefined; // Pour les fonctions sans retour
```

## 🧩 Types composés

### Tableaux

```ts
let nombres: number[] = [1, 2, 3];
let chaines: Array<string> = ["a", "b", "c"];
let mixte: (number | string)[] = [1, "deux", 3];
```

### Tuples

```ts
let coordonnees: [number, number] = [10, 20];
let utilisateur: [number, string, boolean] = [1, "Alice", true];
```

### Objets

```ts
let personne: { nom: string; age: number } = { nom: "Thomas", age: 30 };
// Avec propriétés optionnelles
let contact: { 
  nom: string; 
  tel?: string;  // Le ? rend la propriété optionnelle
} = { nom: "Emma" };
```

## 🏗️ Interfaces et Types

### Interfaces

Une interface permet de typer un objet JS.

```ts
interface Utilisateur {
  id: number;
  nom: string;
  email: string;
  actif?: boolean;  // Propriété optionnelle
  readonly createdAt: Date;  // Propriété en lecture seule
}
```

### Types

```ts
interface IPerson {
    lastname: string
    firstname: string
    type: 'student'|'teacher'
}

type Point = {
  x: number;
  y: number;
};

// Union de types
type Identifiant = number | string;

// Types littéraux
type Direction = "nord" | "sud" | "est" | "ouest";
```

## 🔄 Fonctions

### Typage des fonctions

```js
// Paramètres et retour typés
function addition(a: number, b: number): number {
  return a + b;
}

// Paramètres optionnels
function saluer(nom: string, titre?: string): string {
  return titre ? `${titre} ${nom}` : `Bonjour ${nom}`;
}
```

## 🔄 Vérifications de types

```js
// Vérification de type
if (typeof valeur === "string") {
  console.log(valeur.toUpperCase());
}

// Vérification d'instance
if (personne instanceof Personne) {
  personne.sePresenter();
}
```

## 🧠 Astuces et bonnes pratiques

1. Évitez any autant que possible - Utilisez unknown si nécessaire

2. Utilisez l'inférence de type - TypeScript peut souvent deviner le type

## 🛠️ Configuration tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
```

## 🔗 Ressources utiles

- Documentation officielle TypeScript
- TypeScript Playground
- Type Challenges

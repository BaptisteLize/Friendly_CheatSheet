# TypeScript : Pourquoi et comment l’utiliser

TypeScript n’ajoute rien au runtime (une fois transpilé, c'est du JS classique). Il est là pour sécuriser ton code et améliorer ton expérience dev.

✅ Évite les bugs avant l’exécution.
✅ Auto-complétion et documentation améliorées.
✅ Code plus maintenable avec un typage explicite.

## Installation et configuration
```sh
npm install -g typescript # Installation globale
tsc --init                 # Génère un fichier de config tsconfig.json
```

Dans tsconfig.json, active les options suivantes pour un bon usage :

```json
{
  "compilerOptions": {
    "strict": true,         // Active toutes les vérifications strictes
    "noImplicitAny": true,  // Interdit les types implicites "any"
    "strictNullChecks": true // Évite les erreurs liées aux valeurs null/undefined
  }
}
```

## Les bases du typage

###Typage simple
```ts
let username: string = "Alice";
let age: number = 25;
let isAdmin: boolean = true;
```
✅ Bonne pratique : Toujours typiser tes variables et activer strict pour éviter les erreurs.

### Les tableaux et objets
```ts
let numbers: number[] = [1, 2, 3]; // Tableau de nombres

let user: { name: string; age: number } = {
  name: "John",
  age: 30,
};
```
✅ Bonne pratique : Utilise des interfaces pour mieux structurer tes objets.

```ts
interface User {
  name: string;
  age: number;
}

const user: User = { name: "Alice", age: 25 };
```

## Fonctions et bonnes pratiques

### Typage des paramètres et du retour
```ts
function sum(a: number, b: number): number {
  return a + b;
}
```
✅ Bonne pratique : Toujours préciser le type du retour pour éviter les erreurs.

### Paramètres optionnels et valeurs par défaut
```ts
function greet(name: string, age?: number): string {
  return age ? `Hello ${name}, you are ${age} years old.` : `Hello ${name}!`;
}
```
✅ Bonne pratique : Utiliser ? pour les valeurs optionnelles.

### Les fonctions fléchées
```ts
const multiply = (a: number, b: number): number => a * b;
```
Astuce : TypeScript infère automatiquement le type de retour si c'est évident.

## Interfaces et Types

### Différence entre interface et type

Interface : Pour les objets et classes

```ts
interface User {
  name: string;
  age: number;
}
```

Type : Pour les objets mais aussi les alias de types

```ts
type ID = string | number;
```

✅ Bonne pratique : Utiliser interface pour les objets et type pour les unions/alias.

## Typage avancé

### Les unions et intersections

```ts
let id: number | string; // Peut être un nombre ou une chaîne

type Admin = { admin: boolean };
type Employee = { name: string };
type AdminEmployee = Admin & Employee;
```

✅ Bonne pratique : Utiliser & pour fusionner plusieurs types.

### Les génériques (pour rendre ton code réutilisable)
```ts
function identity<T>(arg: T): T {
  return arg;
}

console.log(identity<string>("Hello"));
console.log(identity<number>(123));
```

✅ Bonne pratique : Utiliser <T> quand le type dépend des données entrées.

## Classes et programmation orientée objet

### Définition d’une classe avec TypeScript
```ts
class User {
  constructor(public name: string, private age: number) {}

  getAge(): number {
    return this.age;
  }
}

const user = new User("Alice", 30);
console.log(user.getAge());
```

✅ Bonne pratique :

`public` : accessible partout

`private` : accessible uniquement dans la classe

`protected` : accessible dans la classe et ses enfants

## Bonnes pratiques générales

✅ Toujours activer strict dans tsconfig.json
✅ Utiliser interface pour structurer les objets
✅ Éviter any, préférer unknown si nécessaire
✅ Utiliser les génériques <T> pour les fonctions et classes réutilisables
✅ Prendre l’habitude d’utiliser les types optionnels (?), les valeurs par défaut et les unions (|)

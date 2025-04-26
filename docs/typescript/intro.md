# Typescript, quesaco ?

## 1. Qu'est-ce que TypeScript ?

TypeScript = JavaScript avec un typage statique en plus.

👉 Il transpile en JavaScript classique pour être exécuté dans le navigateur.

👉 Il aide à éviter des bugs en détectant les erreurs avant l'exécution.

## 2. Pourquoi l'utiliser ?

✅ Détection des erreurs à l'écriture.

✅ Auto-complétion améliorée dans l’IDE.

✅ Meilleure lisibilité et maintenabilité du code.

## 3. Les bases du typage

TypeScript ajoute des types explicites :

```ts
let message: string = "Hello, TypeScript!";
let age: number = 25;
let isActive: boolean = true;
```

Inférence automatique : TypeScript devine le type si tu ne le précises pas.

```ts
let name = "John"; // TypeScript sait que c'est une string
```

## 4. Typage des fonctions

On précise les types des paramètres et du retour :

```ts
function add(a: number, b: number): number {
  return a + b;
}
```

## 5. Les objets et interfaces

Définition propre d’un objet :

```ts
interface User {
  name: string;
  age: number;
}

let user: User = { name: "Alice", age: 30 };
```

## 6. Les types avancés (optionnels, union, génériques)

🔹 Optionnel ( ? ) :

```ts
interface User {
  name: string;
  age?: number; // Peut être absent
}
```

🔹 Union ( | ) :

```ts
let id: number | string = 42; // Peut être un nombre ou une string
```

🔹 Génériques ( < T > ) :

```ts
function identity<T>(arg: T): T {
  return arg;
}
```

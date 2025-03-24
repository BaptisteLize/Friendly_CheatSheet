1. TypeScript : Pourquoi et comment l’utiliser ?
TypeScript n’ajoute rien au runtime (une fois transpilé, c'est du JS classique). Il est là pour sécuriser ton code et améliorer ton expérience dev.

✅ Évite les bugs avant l’exécution.
✅ Auto-complétion et documentation améliorées.
✅ Code plus maintenable avec un typage explicite.

Installation et configuration
sh
Copier
Modifier
npm install -g typescript # Installation globale
tsc --init                 # Génère un fichier de config tsconfig.json
Dans tsconfig.json, active les options suivantes pour un bon usage :

json
Copier
Modifier
{
  "compilerOptions": {
    "strict": true,         // Active toutes les vérifications strictes
    "noImplicitAny": true,  // Interdit les types implicites "any"
    "strictNullChecks": true // Évite les erreurs liées aux valeurs null/undefined
  }
}
2. Les bases du typage
2.1 Typage simple
ts
Copier
Modifier
let username: string = "Alice";
let age: number = 25;
let isAdmin: boolean = true;
✅ Bonne pratique : Toujours typiser tes variables et activer strict pour éviter les erreurs.

2.2 Les tableaux et objets
ts
Copier
Modifier
let numbers: number[] = [1, 2, 3]; // Tableau de nombres

let user: { name: string; age: number } = {
  name: "John",
  age: 30,
};
✅ Bonne pratique : Utilise des interfaces pour mieux structurer tes objets.

ts
Copier
Modifier
interface User {
  name: string;
  age: number;
}

const user: User = { name: "Alice", age: 25 };
3. Fonctions et bonnes pratiques
3.1 Typage des paramètres et du retour
ts
Copier
Modifier
function sum(a: number, b: number): number {
  return a + b;
}
✅ Bonne pratique : Toujours préciser le type du retour pour éviter les erreurs.

3.2 Paramètres optionnels et valeurs par défaut
ts
Copier
Modifier
function greet(name: string, age?: number): string {
  return age ? `Hello ${name}, you are ${age} years old.` : `Hello ${name}!`;
}
✅ Bonne pratique : Utiliser ? pour les valeurs optionnelles.

3.3 Les fonctions fléchées
ts
Copier
Modifier
const multiply = (a: number, b: number): number => a * b;
Astuce : TypeScript infère automatiquement le type de retour si c'est évident.

4. Interfaces et Types
4.1 Différence entre interface et type
Interface : Pour les objets et classes

ts
Copier
Modifier
interface User {
  name: string;
  age: number;
}
Type : Pour les objets mais aussi les alias de types

ts
Copier
Modifier
type ID = string | number;
✅ Bonne pratique : Utiliser interface pour les objets et type pour les unions/alias.

5. Typage avancé
5.1 Les unions et intersections
ts
Copier
Modifier
let id: number | string; // Peut être un nombre ou une chaîne

type Admin = { admin: boolean };
type Employee = { name: string };
type AdminEmployee = Admin & Employee;
✅ Bonne pratique : Utiliser & pour fusionner plusieurs types.

5.2 Les génériques (pour rendre ton code réutilisable)
ts
Copier
Modifier
function identity<T>(arg: T): T {
  return arg;
}

console.log(identity<string>("Hello"));
console.log(identity<number>(123));
✅ Bonne pratique : Utiliser <T> quand le type dépend des données entrées.

6. Classes et programmation orientée objet
6.1 Définition d’une classe avec TypeScript
ts
Copier
Modifier
class User {
  constructor(public name: string, private age: number) {}

  getAge(): number {
    return this.age;
  }
}

const user = new User("Alice", 30);
console.log(user.getAge());
✅ Bonne pratique :

public : accessible partout

private : accessible uniquement dans la classe

protected : accessible dans la classe et ses enfants

7. Bonnes pratiques générales
✅ Toujours activer strict dans tsconfig.json
✅ Utiliser interface pour structurer les objets
✅ Éviter any, préférer unknown si nécessaire
✅ Utiliser les génériques <T> pour les fonctions et classes réutilisables
✅ Prendre l’habitude d’utiliser les types optionnels (?), les valeurs par défaut et les unions (|)

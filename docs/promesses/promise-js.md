# Promesses JavaScript

En JavaScript, les promesses (Promise) peuvent venir de plusieurs sources, principalement liées à des opérations asynchrones.

Voici une liste (presque) exhaustive des origines possibles des promesses

---

## API natives du navigateur

Ce sont les promesses les plus courantes et elles proviennent des fonctionnalités intégrées dans JavaScript et le navigateur.

### Requêtes réseau (AJAX, API)

- `fetch()`

```js
fetch("https://jsonplaceholder.typicode.com/todos/1")
  .then(response => response.json())
  .then(data => console.log(data));
```

- `Response.blob()`, `Response.json()`, `Response.text()`, etc.

### Stockage local et base de données

- IndexedDB via `indexedDB.open()`
- Cache API (`caches.open()`, `cache.match()`)
- File System API (accès aux fichiers locaux)

### Temps et animations**

- `setTimeout()` / `setInterval()` via `Promise`

```js
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
delay(2000).then(() => console.log("2 secondes écoulées"));
```

- `requestAnimationFrame()`
- Web Animations API (`element.animate().finished`)

### Gestion des utilisateurs et permissions

- `navigator.geolocation.getCurrentPosition()`
- `navigator.mediaDevices.getUserMedia()` (caméra/micro)
- `Notification.requestPermission()`
- `document.hasStorageAccess()` (suivi des permissions)

### Clipboard (Copier/Coller)

- `navigator.clipboard.writeText()`
- `navigator.clipboard.readText()`

---

## APIs liées aux Workers et WebSockets

### Exécution parallèle

- `Worker.postMessage()`
- `SharedWorker`
- `WebAssembly.instantiateStreaming()`

### Communication en temps réel

- `WebSockets (socket.send(), socket.onmessage)`
- `BroadcastChannel`
- `MessageChannel`

---

## APIs spécifiques à certaines technologies

### Fichiers et système

- File API (`fileHandle.getFile()`)
- `showOpenFilePicker()`, `showSaveFilePicker()`

### Bluetooth, NFC, USB, Serial

- `navigator.bluetooth.requestDevice()`
- `navigator.usb.requestDevice()`
- `navigator.nfc.watch()`
- `navigator.serial.requestPort()`

### Autres APIs spécialisées

- WebAuthn (`navigator.credentials.get()`)
- Payment Request API (`new PaymentRequest()`)

---

## Promesses créées manuellement

### Avec `new Promise()`

Tu peux créer tes propres promesses si ton code effectue une tâche asynchrone.

```js
const myPromise = new Promise((resolve, reject) => {
  setTimeout(() => resolve("Résolu !"), 2000);
});
myPromise.then(console.log);
```

### Avec `async/await`

`async` transforme automatiquement une fonction en promesse :

```js
async function fetchData() {
  return "Données chargées !";
}
fetchData().then(console.log);
```

#### 🌟 Récapitulatif des principales sources de Promises en JavaScript

|       Catégorie       |                 Exemples                  |
| :-------------------: | :---------------------------------------: |
|    Requêtes réseau    |         fetch(), Response.json()          |
| Stockage et fichiers  | IndexedDB, navigator.clipboard.readText() |
|  Temps et animations  |   setTimeout(), requestAnimationFrame()   |
| Permissions et médias |    getUserMedia(), requestPermission()    |
|     Communication     |        WebSockets, MessageChannel         |
|  Bluetooth, USB, NFC  |    navigator.bluetooth.requestDevice()    |
|      Web Workers      |           Worker.postMessage()            |
|     APIs avancées     |       WebAuthn, Payment Request API       |
|  Promesses manuelles  |        new Promise(), async/await         |

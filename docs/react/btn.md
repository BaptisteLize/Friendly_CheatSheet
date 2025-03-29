# Exemple bouton suppression avec tailwind et font-awesome
```js
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const crossElement = <FontAwesomeIcon className='w-4 h-4' icon={faTrash} />

<button className='p-3 w-9 h-9 text-red-600 transition-colors duration-300 hover:bg-red-600 hover:text-white rounded-bl-md flex items-center
 justify-center absolute top-0 right-0' onClick={() => deleteBookmark(bookmark)}>{crossElement}</button>
```

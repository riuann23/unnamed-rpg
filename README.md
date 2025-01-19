# unnamedRPG (OUTDATED, ABANDONED PROJECT)

**[Live App's Link](https://unnamed-rpg.herokuapp.com/ "An online RPG that is unnamed. :D")**  
*(still under development)*

---

## Technologies Used:

- **React**
- **Mongoose/MongoDB**
- **Node.js**
- **Express**
- **Web Worker API**: Used `canvas.transferControlToOffscreen()` to delegate intensive animation calculations to the worker thread, preventing lag on the user interface.
- **Service Worker**: Caches assets in the browser, ensuring subsequent visits load faster by referencing cached files instead of re-downloading them.
- **HTML5 Canvas**: Used for rendering animations.
- **Socket.io**: Facilitates communication between the server and multiple clients.
- **Pug**: Used for dynamic imports.

---

## Features:

- **Map Maker**  
  [Link to Map Maker](https://unnamed-rpg.herokuapp.com/mapmaker)  
  - Originally built to serve as the map-making tool for the game.
  - World data is saved in the database and used in-game.
  - Art was created by my teammate.
  - Click "Auto" to log in with the test account.

- **Animation Tester**  
  - A development tool built to test animations.  
  - Here's **[how I test them](https://www.youtube.com/watch?v=Qa5rHBS0rtc&t=4s)**.

- **Sprites Tool**  
  - A sprite sheet generator I created to make sprites.  
  - Check out the **[demo](https://www.youtube.com/watch?v=zS5dc3_CD6s)**.

# CryptoSlots

See deployed app here: https://cryptoslots.netlify.app/slot.html
HTML5 Slotmachine (5 Reel 3 Tile)

Written in pure Vanilla Javascript with no third-party libraries.  

This was the first game I made in Javascript in the minimial working condition that I felt comfortable presenting.  It contains some outdated syntax because I was in the process of learning ES6 and needs to be cleaned up a bit.

Feel free to use this game for personal uses but do not use it for real money.

<img width="614" alt="cryptoslots" src="https://user-images.githubusercontent.com/39435918/53037083-df457a80-343e-11e9-95c9-017228e859c6.PNG">

## Game Description

Match the number of tiles from left to right for a series of lines. At least 3 tiles must match in this game for a win.

## Game Features

Shapeshift symbol is wild.

Ability to change the line bet (up to 100) and the number of lines (up to 50).

Autoplay multiple games.

Max bet calculator

The tile images for each reel are not fixed like a physical slot machines. Instead each image has a different probabilty of showing up and is randomly selected.

The bonus game feature has not been implemented but it was supposed to be achieved by aligning the Bitcoin Cash tiles. Free games using tile images of all the Bitcoin forks were to be awarded.

## Game Custimization

### Images

Change the tile images in the *Pictures/MainTiles* folder. The pictures must be PNG and have the same naming convention.

Change the background images in the *Pictures/backgrounds* folder.

### Game Properties
#### The following properties can be customized in the *initconditions.js* file

The number of reels (max 5) - Number of elements in the **slotWidths** array

Reel size - Value of an element in the **slotWidths** array


*Example:*

*const slotWidths = [Math.floor(cWidth/5),Math.floor(cWidth/5),Math.floor(cWidth/5)]*

*creates a 3 reel slot machine of equal length reels*


Number of tiles per reel (max 6): **nTilesPerCol** variable

Note: A different array of paylines has to be used for more than 3 tiles per column

Tile frequency per reel: **tileProb** array.

Payout struture: **payouts** array.

## Third Party Contributions

### Fonts
https://www.fontsquirrel.com/

### Images

Buttons created with https://dabuttonfactory.com/

All other images found with Google Images

### Sounds

https://freesound.org/

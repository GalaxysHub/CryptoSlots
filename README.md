# CryptoSlots

A pure vanilla JavaScript HTML5 slot machine game featuring cryptocurrency-themed symbols with 5 reels, 3 rows, and up to 50 paylines.

🎰 **Live Demo**: [https://crypto-slots-icon.vercel.app/](https://crypto-slots-icon.vercel.app/)

<img width="614" alt="cryptoslots" src="https://user-images.githubusercontent.com/39435918/53037083-df457a80-343e-11e9-95c9-017228e859c6.PNG">

## Features

- **5 Reels × 3 Rows** slot machine with up to 50 configurable paylines
- **Wild Symbols** - Shapeshift symbol substitutes for all other symbols
- **Adjustable Betting** - Modify line bet (1-100) and active paylines (1-50)
- **Autoplay Mode** - Automated spinning with customizable spin count
- **Max Bet Calculator** - Instantly calculate maximum possible bet
- **Animated Wins** - Visual payline highlighting and tile scaling effects
- **Canvas-based UI** - Smooth HTML5 Canvas rendering with responsive design
- **Pure Vanilla JS** - No frameworks or third-party dependencies

## Game Mechanics

- **Minimum Win**: 3 matching symbols from left to right on active paylines
- **Wild Substitution**: Shapeshift symbols act as wild cards for any symbol
- **Weighted Probability**: Each symbol has configurable appearance probability
- **Real-time Balance**: Dynamic balance updates with win animations

## Getting Started

### Local Development
```bash
# Clone the repository
git clone https://github.com/GalaxysHub/CryptoSlots.git
cd CryptoSlots

# Start local development server
npm start
# Opens on http://localhost:8000

# Alternative Python server
python3 -m http.server 8000
```

### Deployment
This is a static HTML5 game - deploy to any static hosting service:
- **Vercel**: `vercel --prod`
- **Netlify**: Drag and drop the project folder
- **GitHub Pages**: Enable Pages in repository settings

## Project Structure

```
CryptoSlots/
├── index.html              # Main entry point
├── public/
│   ├── JS/                 # Game logic modules
│   │   ├── initConditions.js    # Game configuration & constants
│   │   ├── loadTiles.js         # Canvas setup & asset loading
│   │   ├── gamePlay.js          # Core game engine
│   │   ├── animations.js        # Win animations & effects
│   │   ├── background.js        # Background rendering
│   │   ├── slotButtons.js       # Button interaction system
│   │   ├── displayFunctions.js  # UI updates & balance display
│   │   └── asyncHelperFunctions.js # Utility functions
│   ├── Pictures/           # Game assets
│   │   ├── MainTiles/      # Symbol images (tile0.png - tile13.png)
│   │   ├── backgrounds/    # Background images
│   │   ├── button/         # UI button graphics
│   │   └── CryptoLogos/    # Cryptocurrency themed symbols
│   ├── Sounds/             # Audio effects (.wav files)
│   └── CSS/                # Fonts and styling
└── vercel.json             # Vercel deployment configuration
```

## Customization

### Adding New Symbols
1. Add tile image to `public/Pictures/MainTiles/` following naming convention (`tileX.png`)
2. Update `numPics` variable in `initConditions.js`
3. Add probability row to `tileProbs` array
4. Update `payouts` array for new symbol payouts

### Modifying Game Parameters
Edit `public/JS/initConditions.js`:
- **Reel Configuration**: Modify `slotWidths` array (max 5 reels)
- **Symbol Probabilities**: Adjust `tileProbs` array values
- **Payout Structure**: Update `payouts` array (3×3 matrix for 3/4/5-of-a-kind)
- **Paylines**: Modify `lines` array (currently supports 50 paylines)

### Example: 3-Reel Configuration
```javascript
const slotWidths = [
    Math.floor(cWidth/3), 
    Math.floor(cWidth/3), 
    Math.floor(cWidth/3)
];
```

## Technical Architecture

- **Canvas Layer System**: Multiple overlapping canvases for different rendering layers
- **Module-based JS**: 8 JavaScript modules loaded in dependency order
- **Global State Management**: Shared state across modules via global variables
- **RequestAnimationFrame**: Smooth 60fps animations for spinning and effects
- **Responsive Design**: Canvas scales to different screen sizes

## Browser Compatibility

- **Modern Browsers**: Chrome, Firefox, Safari, Edge (ES6+ support required)
- **Mobile Friendly**: Touch-optimized interface
- **Canvas Support**: HTML5 Canvas API required

## Legal Notice

**For entertainment purposes only. Do not use for real money gambling.**

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit changes (`git commit -am 'Add new feature'`)
4. Push to branch (`git push origin feature/new-feature`)
5. Open a Pull Request

## Credits

- **Fonts**: [Font Squirrel](https://www.fontsquirrel.com/)
- **Button Graphics**: [Da Button Factory](https://dabuttonfactory.com/)
- **Sound Effects**: [Freesound.org](https://freesound.org/)
- **Symbol Images**: Various cryptocurrency logos and custom graphics

## License

ISC License - See repository for details.

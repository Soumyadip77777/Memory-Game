# 🧠 Memory Game

A fun and interactive Memory Matching Game built using **React** with a beautifully designed **dark mode UI**, smooth **animations**, and sound effects for a better user experience. Match all the cards with the fewest moves and shortest time!

## ✨ Features

- 🎨 Dark Mode UI with vibrant colors
- 🧠 Customizable Grid Size (2x2 up to 10x10)
- 🕹️ Move Counter & Timer
- 🏆 Best Score & Best Time Tracking (per grid size)
- 🔊 Sound Effects for move, match, mismatch, and win
- 🎉 Winning Animation
- 💾 Persistent Best Scores (via `localStorage`)
- 💡 Responsive design with flip effects and hover transitions

## 📸 Preview

![Preview Screenshot](preview.png)

> *(Include a screenshot here if available)*

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository:**

```bash
git clone https://github.com/yourusername/memory-game.git
cd memory-game
Install dependencies:

bash
Copy
Edit
npm install
# or
yarn
Start the development server:

bash
Copy
Edit
npm run dev
# or
yarn dev
🔧 Folder Structure
arduino
Copy
Edit
📁 Memory Game
├── 📁 public
│   ├── match.wav
│   ├── mismatch.wav
│   ├── move.mp3
│   └── win.wav
├── 📁 src
│   ├── App.jsx
│   └── index.js
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
└── README.md
Replace App.jsx with the actual file if you renamed it.

📦 Built With
React

Vite for fast development

Tailwind CSS for styling

JavaScript

🧩 Game Logic
Cards are generated in pairs and shuffled randomly.

Clicking on two matching cards locks them in place.

Timer starts on the first move.

Game ends when all pairs are matched.

Best moves and time are stored for each grid size in localStorage.

🙌 Contributing
Pull requests are welcome! If you have suggestions for improvements or want to report bugs, feel free to open an issue.

📄 License
This project is open-source under the MIT License.

📬 Contact
Created by Soumyadip Chatterjee — feel free to reach out!
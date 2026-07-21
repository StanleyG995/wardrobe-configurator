
# 🪵 Wardrobe 3D Configurator (Frontend)

An interactive 3D wardrobe configurator frontend built with modern web technologies. Designed with a strong focus on clean architecture, user experience, and full web accessibility (a11y).

## 🚀 Tech Stack

* **Framework:** [Next.js](https://next.js/) (React)
* **State Management:** [Zustand](https://github.com/pmndrs/zustand)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **Icons:** [React Icons](https://react-icons.github.io/react-icons/)

## ✨ Key Features

* **Real-time Customization:** Instantly adjust case dimensions (width, height, depth) using precise text inputs or smooth range sliders with built-in boundary clamping.
* **Dynamic Bay Management:** Add, remove, and configure individual wardrobe segments (shelves, hanger rods, or empty space).
* **Materials & Finishes:** Choose from a wide selection of case and door materials, handle styles, and mirror toggles via interactive swatch grids.
* **Accessibility First (A11y):** Built following WAI-ARIA guidelines, featuring proper keyboard navigation, semantic HTML (`radiogroup`, `aside`), polite live regions, and screen reader optimizations (`sr-only`, `aria-hidden`).
* **Responsive Sidebar:** Clean, scrollable sidebar layout optimized for desktop and mobile configurator workflows.

## 📂 Project Structure


├── src/
│   ├── app/              # Next.js App Router (pages and layouts)
│   ├── components/       # UI components (primitives, sidebar, layout)
│   │   └── ui/primitives/# Reusable atomic components (Button, Input, Select, etc.)
│   ├── helpers/          # Utility functions (e.g., class merging with clsx/tailwind-merge)
│   ├── store/            # Zustand global state store
│   └── types/            # TypeScript type definitions
├── public/               # Static assets & textures (wood, colors)
└── ...
♿ Accessibility (A11y) Highlights
Custom radios and swatches leverage full keyboard support and screen reader attributes (aria-checked, role="radio").

Dynamic state changes are announced politely using aria-live="polite".

Strict association between form labels and inputs using unique IDs and htmlFor.

🛠️ Getting Started
Prerequisites
Make sure you have Node.js installed on your machine.

Installation & Setup
Clone the repository:

Bash
git clone [https://github.com/your-username/wardrobe-configurator.git](https://github.com/your-username/wardrobe-configurator.git)
cd wardrobe-configurator
Install dependencies:

Bash
npm install
Run the development server:

Bash
npm run dev
Open the application:
Open http://localhost:3000 in your browser to view the configurator.

📄 License
This project is open-source and available under the MIT License.
# NovaCRM

**NovaCRM** is a modern, TypeScript-based web application—likely built with Next.js or React—aimed to simplify customer relationship management, marketing automation, or CRM-related tasks.

## Table of Contents

* [Features](#features)
* [Tech Stack](#tech-stack)
* [Getting Started](#getting-started)

  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
  * [Running Locally](#running-locally)
* [Project Structure](#project-structure)
* [Contributing](#contributing)
* [License](#license)
* [Contact](#contact)


## Features

*(Add features once defined in your project—some possibilities include)*

* Clean and modular UI components
* Reusable custom hooks
* Static assets managed in `public`
* Scoped styling through CSS or CSS Modules

## Tech Stack

* **Language**: TypeScript
* **Frontend Framework**: React / Next.js (inferred from `app/`, `components/`, etc.)
* **Styling**: CSS (or possibly CSS Modules/PostCSS)
* **State Management and Utilities**: Custom hooks in `hooks/`; shared logic in `lib/`

*(Adapt this section to your actual stack as needed.)*

## Getting Started

### Prerequisites

Ensure you have the following installed:

* Node.js (≥ 16.x)
* npm **or** Yarn **or** pnpm

### Installation

```bash
# Clone the repo
git clone https://github.com/jaimin-acharya/novacrm.git
cd novacrm

# Install dependencies
npm install
# — or —
yarn install
# — or —
pnpm install
```

### Running Locally

To run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.


## Project Structure

```
novacrm/
├── app/                 # Next.js pages/app directory (if applicable)
├── components/          # UI components
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions or shared logic
├── public/              # Static assets (images, fonts, etc.)
├── styles/              # Stylesheets (CSS modules or global CSS)
├── package.json         # Project dependencies & scripts
├── tsconfig.json        # TypeScript config
├── next.config.mjs      # Next.js configuration (if used)
├── postcss.config.mjs   # PostCSS configuration
└── pnpm-lock.yaml       # Lockfile for pnpm
```

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Make your changes and commit (`git commit -m 'Add your feature'`)
4. Push to your branch (`git push origin feature/your-feature`)
5. Open a pull request

## Contact

Created by **Jaimin Acharya**.
Feel free to reach out or open an issue if you have questions or suggestions!



#  Tracely

> **High-precision wealth tracking system for the modern era.**
> Professional financial management through an engineering-first approach.

**Tracely** is a platform engineered to eliminate the friction of financial tracking, providing a robust, type-safe environment for managing assets and expenses. Unlike conventional trackers, Tracely prioritizes data integrity and architectural scalability.

- https://tracely.soydz.com/

## 🛠️ Tech Stack
[![Next.js](https://img.shields.io/badge/Next.js_16-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org)
[![React](https://img.shields.io/badge/React_19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![HeroUI](https://img.shields.io/badge/HeroUI_v3-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://heroui.com)
[![TanStack Query](https://img.shields.io/badge/TanStack_Query_v5-FF4154?style=for-the-badge&logo=reactquery&logoColor=white)](https://tanstack.com/query)
[![Ky](https://img.shields.io/badge/Ky-FF6B6B?style=for-the-badge&logo=javascript&logoColor=white)](https://github.com/sindresorhus/ky)
[![Zod](https://img.shields.io/badge/Zod-3E67B1?style=for-the-badge&logo=typescript&logoColor=white)](https://zod.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://typescriptlang.org)


## 🚀 Key Functionality

### 📈 Financial Intelligence
*   **Dynamic Balance Overview**: Real-time tracking of your net worth with clear financial health indicators to instantly identify Surplus or Deficit.
*   **Temporal Analysis**: Advanced time-based filtering that allows you to pinpoint spending patterns and trends across any period.
### 🛠️ Transaction Lifecycle
*   **Effortless Management**: A complete, lean system for recording and managing transactions with absolute data accuracy.
*   **High-Integrity Entry**: Built-in smart validation that prevents errors and ensures every entry is precise and consistent.
*   **Fluid Categorization**: An intuitive category selector that enables dynamic organization and "on-the-fly" category creation.
### 🔒 Security & Access
*   **Seamless Sessions**: Secure, persistent authentication that keeps you logged in safely while maintaining a fluid experience.
*   **Protected Access**: Multi-layered security guards that ensure your sensitive financial data is only accessible to you.


## 🖼️ Visual Showcase
A glimpse into the Tracely experience, where precision meets a refined interface.
### 🌟 First Impression
The landing page introduces the Tracely philosophy, featuring a high-fidelity visual identity and a clear value proposition.
![Landing Page](/public/images/principal-page.png)
### 🏛️ The Command Center
The main dashboard provides an immediate overview of financial health, combining the total balance with a filtered transaction gallery.
![Dashboard](/public/images/dashboard.png)
### 💸 Transaction Lifecycle
From creation to deletion, every interaction is designed for speed and clarity.
#### Create Transaction 
![Create](/public/images/create-transaction.png)
![Create](/public/images/create-transaction-2.png)
*Type-safe entry and category selection.* 

#### Secure Deletion
![Delete](/public/images/delete-transaction.png)
![Delete](/public/images/delete-transaction-2.png)
*Confirmation-driven removal.*

### 📅 Temporal Analysis
Precise control over your financial history with the integrated month and year picker.
![Filter Date](/public/images/filter-date.png)
### 🔐 Secure Entry
A focused and distraction-free authentication experience.
![Login](/public/images/login.png)


## 🏗️ Architecture: The Domain-Driven Approach
The project implements a **Feature-Based Architecture**, prioritizing modularity and long-term maintainability over generic folder structures.
Instead of grouping by technical role, the codebase is partitioned by business domain:
```text
src/features/
└── [feature_name]/
    ├── api/         # Services and asynchronous calls
    ├── components/  # Feature-specific UI components
    ├── hooks/       # State logic and side effects
    └── schemas/     # Type definitions and validation (Zod)
```

**Engineering Advantages:**
*   **High Cohesion:** All logic related to a specific feature (e.g., transactions) resides in a single location.
*   **Low Coupling:** Features interact through defined interfaces, significantly reducing the risk of regressions.
*  **Linear Scalability:** The addition of new modules (e.g., Budgets, Reports) can be achieved without modifying existing feature logic.


## 🏁 Getting Started

### Prerequisites
*   **Node.js** (LTS)
*   **pnpm** (Preferred package manager)

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/soydz/tracely.git
    ```

2.  **Install dependencies**
    ```bash
    pnpm install
    ```

3.  **Launch development environment**
    ```bash
    pnpm dev
    ```

The application will be available at `http://localhost:3000`.

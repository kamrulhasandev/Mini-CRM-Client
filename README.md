# Mini-CRM for Freelancers

Manage clients, projects, interaction logs, and reminders — all in one simple web application.

Built with **TypeScript**, **React**, **Express/NestJS**, and **PostgreSQL**, focusing on modular structure, security, and clean user experience.


---

## Live Site

🔗 [Visit the Mini-CRM](https://mini-crm-client-lx9e.vercel.app/login)

---

## Test Login Information

- **Email:** `kamrul@gmail.com`
- **Password:** `123456`

---

## Tech Stack

**Frontend:**
- React.js (Vite)
- TypeScript
- TailwindCSS
- React Hook Form + Zod (Form validation)
- Redux



**Dev Tools:**
- ESLint + Prettier (Code formatting)

---

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/kamrulhasandev/mini-crm-client
    cd mini-crm-client
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Set up the environment variables (see [Environment Variables](#environment-variables)).

4. Start the server:
    ```bash
    npm start
    ```

---

## ERD (Entity Relationship Diagram)

![Mini-CRM ERD](https://i.ibb.co.com/cXgCwcGY/erd.png)

---

## Approach and Decisions

**Modular Backend:**  
Used modular MVC pattern to separate controllers, services, and repositories for better maintainability and scalability.

**Prisma ORM:**  
Selected Prisma for its type safety, schema migrations, and simple querying syntax.

**Authentication:**  
Implemented JWT-based authentication with role-based protected routes (user-specific data isolation).

**Form Validation:**  
Used Zod on both client and server side to ensure consistent and reliable validation.

**UI/UX:**  
Designed a simple, clean, responsive UI using TailwindCSS with dark mode support.

**API Security:**  
All routes protected by JWT middleware and user-specific data access enforced at the database query level.

**Frontend State:**  
Managed form states and API interactions efficiently with React Hook Form and Axios.

**Responsiveness:**  
Built mobile-first, ensuring a consistent experience across all screen sizes.

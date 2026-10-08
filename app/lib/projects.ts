export type Project = {
  id: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  image: string;
  technologies: string[];
  features: string[];
  role?: string;
  demo?: string;
  github?: string;
  figma?: string;
};

export const projects: Project[] = [
  {
    id: "expense-tracker",
    title: "ExpenseTracker",
    category: "Full-Stack Fintech App",
    tagline: "Modern, fast, and secure personal finance tracker with Indonesian Rupiah (IDR) & multi-wallet support.",
    description:
      "ExpenseTracker is a comprehensive personal finance tracking web application designed to help individuals monitor cash flow, manage multi-wallet accounts, categorize daily expenses, and analyze spending habits through real-time interactive visual charts.",
    image: "/Assets/ExpenseTracker.png",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL", "Prisma", "Chart.js", "Vercel"],
    features: [
      "Multi-wallet balance management supporting bank accounts, digital e-wallets, and cash.",
      "Real-time expense and income tracking formatted with Indonesian Rupiah (IDR) currency standards.",
      "Interactive analytics dashboard with dynamic cash flow trends and category spending breakdowns.",
      "Secure user authentication with personalized budget limits and structured transaction history logs.",
    ],
    role: "Full Stack Developer — Designed responsive fintech UI, structured relational database schema, implemented auth flow, and integrated analytics visualization.",
    demo: "https://expensetracker-gani.vercel.app/login",
  },
  {
    id: "footlockre",
    title: "FootLockRE - Shoe Store",
    category: "Front-End E-Commerce",
    tagline: "Modern online footwear store featuring an interactive catalog and responsive shopping cart.",
    description:
      "FootLockRE is a responsive e-commerce web application crafted to deliver a seamless, intuitive shopping experience across all device screen sizes.",
    image: "/Assets/FootLockRE.jpg",
    technologies: ["HTML5", "CSS3", "JavaScript", "Responsive Design", "Vercel"],
    features: [
      "Interactive product catalog with dynamic category filtering and responsive grid layout.",
      "Client-side shopping cart system with automatic subtotal calculation and item management.",
      "Mobile-first responsive design featuring smooth transitions and micro-interactions.",
      "Checkout flow interface with client-side form validation.",
    ],
    role: "Front-End Developer — Designed UI/UX layout, built DOM interactivity with vanilla JavaScript, and handled deployment.",
    demo: "https://shoestore-olive.vercel.app/",
  },
  {
    id: "vetch",
    title: "Vetch",
    category: "Full-Stack Web App",
    tagline: "Integrated digital pet care and consultation platform connecting pet owners with certified veterinarians.",
    description:
      "Vetch is an all-in-one digital pet care solution designed to streamline veterinary appointments, medical record tracking, and pet consultation workflows.",
    image: "/Assets/Vetch-1.png",
    technologies: ["Next.js", "Tailwind CSS", "Express.js", "PostgreSQL", "REST API", "TypeScript"],
    features: [
      "Real-time appointment booking and scheduling system with veterinarians.",
      "Modular RESTful backend API powered by Express.js and PostgreSQL database.",
      "High-performance, responsive user interface built with Next.js and Tailwind CSS.",
      "Pet profile management, health history tracking, and curated pet care resources.",
    ],
    role: "Full Stack Developer — Developed Next.js client interface, Express.js backend endpoints, and PostgreSQL schema.",
    demo: "https://vetch-webagent.vercel.app/",
  },
  {
    id: "maung-landing",
    title: "Maung - Landing Page",
    category: "High-Performance Landing Page",
    tagline: "High-speed streetwear e-commerce landing page powered by Go and HTMX.",
    description:
      "An ultra-fast fashion showcase landing page for the streetwear brand 'Maung'. Built with Go and HTMX to achieve near-instant server-driven rendering without heavy client-side JavaScript bundles.",
    image: "/Assets/Maung-landing-page.png",
    technologies: ["Go (Golang)", "HTMX", "Tailwind CSS", "HTML5", "Vercel"],
    features: [
      "Interactive Server-Driven UI utilizing HTMX for seamless AJAX partial page swaps without full reloads.",
      "High-throughput Go backend handler delivering minimal latency and lightweight memory footprint.",
      "Bold streetwear aesthetic featuring modern dark theme styling and responsive layout.",
      "Optimized Core Web Vitals performance with fast asset loading and compressed delivery.",
    ],
    role: "Full Stack Developer — Built Golang server routes, HTMX interactivity, and Tailwind CSS responsive design.",
    demo: "https://maung-landing-page.vercel.app/",
  },
  {
    id: "maung-stock",
    title: "Maung Stock Management",
    category: "Inventory & ERP System",
    tagline: "Structured multi-warehouse inventory and stock tracking platform for enterprise operations.",
    description:
      "An internal enterprise management solution designed to monitor stock movements, track suppliers, record inbound/outbound transactions, and generate inventory audits.",
    image: "/Assets/Maung-stock.png",
    technologies: ["Laravel", "Tailwind CSS", "PostgreSQL", "PHP", "Blade Template"],
    features: [
      "Comprehensive inbound (restock) and outbound (sales/transfer) inventory tracking.",
      "Automated low-stock threshold alerts to prevent supply shortages.",
      "Visual metrics dashboard for stock turnover rate, best-selling products, and audit logs.",
      "Role-Based Access Control (RBAC) supporting warehouse staff, supervisors, and admins.",
    ],
    role: "Full Stack Developer — Designed PostgreSQL relational schema, implemented Laravel MVC business logic, and built the admin dashboard.",
    demo: "https://stock.maung-prod.web.id/",
  },
  {
    id: "maung-account",
    title: "Maung Games Account Manager",
    category: "Auth & Identity Management",
    tagline: "Secure Single Sign-On (SSO) and account management service built with microservice architecture.",
    description:
      "A centralized identity and authentication service for the Maung gaming ecosystem, allowing users to securely manage credentials, gaming profiles, and cross-application logins.",
    image: "/Assets/Maung-account.png",
    technologies: ["Next.js", "Go (Golang)", "Tailwind CSS", "PostgreSQL", "JWT Auth", "TypeScript"],
    features: [
      "Secure JWT-based authentication flow with automated refresh token rotation.",
      "User profile customization, security settings, and multi-device session tracking.",
      "High-speed Go microservice handling auth requests with ultra-low latency.",
      "Robust security measures including input sanitization, CSRF mitigation, and real-time form validation.",
    ],
    role: "Full Stack Developer — Implemented JWT auth lifecycle in Go, integrated Next.js frontend, and structured PostgreSQL security layers.",
    demo: "https://auth.maung-prod.web.id/",
  },
  {
    id: "aggre",
    title: "Aggre",
    category: "Enterprise Web Platform",
    tagline: "Enterprise business aggregator platform consolidating multi-service operations into one portal.",
    description:
      "Aggre is a unified enterprise web platform that integrates diverse services and workflows into a single centralized portal, enhancing visibility and operational efficiency.",
    image: "/Assets/Aggre-login.png",
    technologies: ["Next.js", "ASP.NET Core", "C#", "Tailwind CSS", "PostgreSQL", "TypeScript"],
    features: [
      "Modern enterprise architecture connecting Next.js frontend with robust ASP.NET Core Web API.",
      "Granular role-based authorization, enterprise session management, and transaction audit trails.",
      "Centralized analytics dashboard providing real-time operational insights.",
      "Clean, corporate-grade user interface designed for high productivity across all devices.",
    ],
    role: "Full Stack Developer — Developed Next.js modules, ASP.NET Core API endpoints, and optimized PostgreSQL queries.",
    demo: "https://aggre.co.id/",
  },
];

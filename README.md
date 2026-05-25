# Secure Task Manager
[![Live Demo](https://img.shields.io/badge/demo-live-green)](https://secure-task-manager-rouge.vercel.app/)
[![Backend API](https://img.shields.io/badge/backend-render-blue)](https://secure-task-manager-nyix.onrender.com/)

## About

A full‑stack task management application built with **security‑first principles**.  
Users can register, log in, create tasks, edit them, mark them as completed, and delete them.  
Admin users can view all registered users.

This project demonstrates secure full‑stack development practices with a focus on OWASP Top 10 mitigations, including JWT in httpOnly cookies, RBAC, rate limiting, and input validation.

## Live Demo

- **Frontend (Vercel):** https://secure-task-manager-rouge.vercel.app
- **Backend API (Render):** https://secure-task-manager-nyix.onrender.com

> Test credentials: `test@example.com` / `123456`

## Tech Stack

| Layer       | Technology                                                      |
|-------------|-------------------------------------------------                |
| Frontend    | React, Vite, Tailwind CSS, Axios, React Router                  |
| Backend     | Node.js, Express, MongoDB, Mongoose                             |
| Security    | JWT (httpOnly cookie), bcrypt, Helmet, CORS, express-rate-limit |
| Deployment  | Render (backend), Vercel (frontend)                             |

## Security Features

- **JWT in httpOnly cookie** – protects against XSS attacks
- **Same site = Strict cookie** - protects aginst CSRF
- **Role‑based access control (RBAC)** – regular users vs admin
- **IDOR prevention** – database queries always include `user: req.user.id`
- **Rate limiting** – 100 requests per 15 minutes per IP (stricter on login)
- **Password hashing** – bcrypt with salt (cost factor 10)
- **Helmet.js** – sets secure HTTP headers (HSTS, CSP, X‑Frame‑Options, etc.)
- **Input validation** – whitelist email regex, length limits, type checks
- **CORS** – restricts API access to trusted frontend origins
- **Environment variables** – secrets never committed to GitHub

## Local Setup

1. Clone the repo.
2. Install dependencies in `/backend` and `/frontend`.
3. Set environment variables (`MONGODB_URI`, `JWT_SECRET` in backend; `VITE_API_URL` in frontend).
4. Run `npm run dev` in both folders.


# Holter Record Summary

## ⚡️ Demo
https://holter.devniel.com

*You can use the `tests/fixtures` CSV files to test the UI.

## 🚀 Running locally
#### With Docker

```bash
docker compose up
```
👀 Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

✨ It will unit and e2e test the project before running it using `jest` and `playwright`.

After checking the result, you can remove all generated artifacts via:
```bash
docker compose down
```
---
#### Without Docker

- Install Node, at least v18.19, you can use NVM https://github.com/nvm-sh/nvm.
- Install playwright browsers using `npx playwright install`.
- Then, run the following commands :

```bash
npm install
# Run tests (it will also build the project)
npm test
# Run project
npm start
```
👀 Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

*This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## 📚 Learn More

The project is done with Next.js (a full-stack React framework), ideal for MVPs and production-grade projects.

For the Holter Record Summary, the back-end service is located in `src/app/api`, all the rest is front-end but it uses Next.js back-end capabilities (e.g. Server Side Rendering).

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

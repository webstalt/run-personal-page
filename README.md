# Running personal page

Страница с лучшими результатами и предстоящими забегами.

## Локально

```bash
yarn install
yarn dev
```

Сборка:

```bash
yarn build
yarn preview
```

## GitHub Pages

Сайт: https://webstalt.github.io/run-personal-page/

После пуша в `main` деплой запускается автоматически (`.github/workflows/deploy.yml`).

**Один раз в GitHub:**

1. Репозиторий → **Settings** → **Pages**
2. **Build and deployment** → **Source**: **GitHub Actions**

Дальше достаточно пушить в `main`.

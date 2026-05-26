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

Сайт: **https://webstalt.github.io/run-personal-page/**

### Настройка (один раз)

1. Запушьте код в `main` — workflow соберёт проект и зальёт **`dist`** в ветку `gh-pages`.
2. GitHub → репозиторий → **Settings** → **Pages**:
   - **Source**: **Deploy from a branch**
   - **Branch**: `gh-pages` → папка **`/ (root)`**
   - Save

> Не выбирайте ветку `main` и папку `/` — тогда отдаётся исходный код без сборки, и в консоли будет ошибка `src/main.tsx 404`.

3. Подождите 1–2 минуты после зелёного workflow во вкладке **Actions**.

### Обновление сайта

Просто пуш в `main` — деплой запустится автоматически.

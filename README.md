<div align="center">

```
██╗      ███████╗ ████████╗ ███████╗  █████╗  ██╗   ██╗
██║      ██╔════╝ ╚══██╔══╝ ██╔════╝ ██╔══██╗ ╚██╗ ██╔╝
██║      █████╗      ██║    ███████╗ ███████║  ╚████╔╝
██║      ██╔══╝      ██║    ╚════██║ ██╔══██║   ╚██╔╝
███████╗ ███████╗    ██║    ███████║ ██║  ██║    ██║
╚══════╝ ╚══════╝    ╚═╝    ╚══════╝ ╚═╝  ╚═╝    ╚═╝
```

# LetSay

**A lightweight and dependency-free internationalization solution for React.**

[![License: MIT](https://img.shields.io/badge/License-MIT-black?style=flat-square)](LICENSE)
[![Zero Dependencies](https://img.shields.io/badge/dependencies-0-brightgreen?style=flat-square)](#)
[![React](https://img.shields.io/badge/React-18%2B-61DAFB?style=flat-square&logo=react)](https://react.dev)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES2020-F7DF1E?style=flat-square&logo=javascript)](https://developer.mozilla.org/docs/Web/JavaScript)

[English](#english) · [Installation](#-installation) · [Examples](#-usage)

</div>

---

## ✨ Why this project?

Solutions like `i18next` and `react-intl` are powerful, but often add unnecessary weight for simple projects. This project was built from scratch with one single mission:

> **Translate. No libraries. No complexity.**

---

## 🚀 Features

| Feature | Description |
|---|---|
| 🦥 **Lazy loading** | Loads translation files via `fetch` only when needed |
| 🔑 **Nested keys** | Supports `t("home.header.title")` without extra configuration |
| 🔀 **Interpolation** | Dynamically replaces `{{variables}}` inside strings |
| ⚛️ **`<Trans />` Component** | Renders inline React components inside translations |
| 🌍 **Automatic detection** | Detects language from browser or `localStorage` |
| 🔄 **Runtime switching** | Changes language without reloading the page |
| 📦 **Zero dependencies** | No extra `node_modules` required |

---

## 📁 Installation

No `npm install`. Just copy the file:

```bash
# Clone the repository
git clone https://github.com/your-username/letsay.git

# Copy the file into your project
cp letsay/src/i18n.js your-project/src/i18n.js
```

Organize your translation files like this:

```
src/
├── i18n.js
├── main.jsx
└── locales/
    ├── en/
    │   └── translation.json
    ├── pt-BR/
    │   └── translation.json
    ├── es/
    │   └── translation.json
    └── ...
```

---

## 💡 Usage

### 1. Initialize in the entry point

```js
// main.jsx
import { initI18n } from "./i18n";

await initI18n(); // detects and loads the language automatically
```

---

### 2. Translate inside React components

```jsx
import { useTranslation } from "./i18n";

function Header() {
  const { t } = useTranslation();

  return <h1>{t("home.title")}</h1>;
}
```

---

### 3. Translate outside components

```js
import { t } from "./i18n";

const errorMsg = t("errors.notFound");
```

---

### 4. Variable interpolation

```json
// en/translation.json
{
  "greeting": "Hello, {{name}}! You have {{count}} messages."
}
```

```js
t("greeting", { name: "Anna", count: 3 })
// → "Hello, Anna! You have 3 messages."
```

---

### 5. Inline components with `<Trans />`

Perfect for links, bold text, or any React element inside translations:

```json
// en/translation.json
{
  "terms": "I agree with the <0>terms of service</0> and the <1>privacy policy</1>."
}
```

```jsx
import { Trans } from "./i18n";

<Trans
  i18nKey="terms"
  components={{
    0: <a href="/terms" />,
    1: <a href="/privacy" />,
  }}
/>
```

---

### 6. Change language at runtime

```js
import { setLanguage } from "./i18n";

await setLanguage("en");
// → loads the JSON, saves it in localStorage, and re-renders components
```

---

## 🌐 Supported languages

| Code | Language |
|---|---|
| `pt-BR` | Portuguese (Brazil) |
| `en` | English |
| `es` | Spanish |
| `fr` | French |
| `de` | German |
| `it` | Italian |
| `hi` | Hindi |

To add a new language, simply create the folder and JSON file:

```
locales/
└── ja/
    └── translation.json
```

And register the code in `supportedLanguages` inside `i18n.js`.

---

## 📖 API

```ts
initI18n(): Promise<void>
// Detects and loads the language during app initialization.

t(key: string, vars?: Record<string, string>): string
// Returns the translated string for the provided key.

setLanguage(lng: string): Promise<void>
// Changes the language at runtime and persists it in localStorage.

getLanguage(): string
// Returns the current language code.

useTranslation(): { t, language }
// React hook that re-renders the component when the language changes.

<Trans i18nKey components values />
// Component that renders translations with inline React elements.
```

---

## 🤝 Contributing

Contributions are welcome! Open an _issue_ or submit a _pull request_.

```bash
# Fork → Clone → Branch → Commit → PR
git checkout -b feature/new-feature
git commit -m "feat: add pluralization support"
git push origin feature/new-feature
```

---

<div align="center">

Made with ☕ and without unnecessary `node_modules`.

</div>

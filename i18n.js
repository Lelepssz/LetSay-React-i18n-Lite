const translations = {};
let currentLanguage = "en";
const fallbackLanguage = "en";
 
const supportedLanguages = ["en", "es", "fr", "it", "de", "hi", "pt-BR"];
 
// Load a language JSON file
async function loadLanguage(lng) {
  if (translations[lng]) return; // already loaded
  try {
    const res = await fetch(`/locales/${lng}/translation.json`);
    if (!res.ok) throw new Error(`Failed to load ${lng}`);
    translations[lng] = await res.json();
  } catch {
    console.warn(`Could not load language: ${lng}, falling back to ${fallbackLanguage}`);
  }
}
 
// Detect language from localStorage or browser
function detectLanguage() {
  const stored = localStorage.getItem("language");
  if (stored && supportedLanguages.includes(stored)) return stored;
 
  const browserLang = navigator.language; // e.g. "pt-BR", "en-US"
  if (supportedLanguages.includes(browserLang)) return browserLang;
 
  // Try matching just the base language (e.g. "pt" from "pt-BR")
  const base = browserLang.split("-")[0];
  const match = supportedLanguages.find(l => l.startsWith(base));
  if (match) return match;
 
  return fallbackLanguage;
}
 
// Get a nested key like "home.title"
function getNestedValue(obj, key) {
  return key.split(".").reduce((acc, part) => acc?.[part], obj);
}
 
// Translate a key, with optional interpolation: t("hello", { name: "Ana" })
export function t(key, vars = {}) {
  const lang = translations[currentLanguage];
  const fallback = translations[fallbackLanguage];
 
  let value = getNestedValue(lang, key) ?? getNestedValue(fallback, key) ?? key;
 
  // Replace {{variable}} placeholders
  Object.entries(vars).forEach(([k, v]) => {
    value = value.replaceAll(`{{${k}}}`, v);
  });
 
  return value;
}
 
export function getLanguage() {
  return currentLanguage;
}
 
// Change language at runtime
export async function setLanguage(lng) {
  await loadLanguage(lng);
  currentLanguage = lng;
  localStorage.setItem("language", lng);
}
 
// Call this once at app startup
export async function initI18n() {
  const lng = detectLanguage();
  await loadLanguage(fallbackLanguage);
  await loadLanguage(lng);
  currentLanguage = lng;
}
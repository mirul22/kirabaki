import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([
    ".next/**",
    "out/**",
    "public/**",
    "node_modules/**",
    "docs/**",
    "drizzle/**",
    "components/AddTransactionView.tsx",
    "components/SummaryView.tsx",
    "components/TransactionView.tsx",
    "components/UserView.tsx",
    "components/ResetView.tsx",
    "app/(onboarding)/**",
    "app/budget/**",
    "app/get_started/**",
  ]),
]);

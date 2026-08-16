# Data and user flows

## Local data

Kirabaki has no database. The browser is the source of truth.

### `account_name`

| | |
| --- | --- |
| Type | `string` |
| Set on | `/get_started` |
| Used as | Gate for “has this device been set up?” |
| Cleared by | Reset (`localStorage.clear()`) |

If this key exists, `/` and `/get_started` send the user to `/budget`.

The name is collected but **not shown** on the budget screen. It is only a first-run flag plus a hidden form field in the add-transaction dialog.

### `transactions`

JSON array. Each item:

| Field | Intended type | Actual stored type | Notes |
| --- | --- | --- | --- |
| `id` | `string` | `string` | Created with `createId()` (cuid2) |
| `type` | `"income"` \| `"expense"` | `string` | Anything not `income` is treated as expense in the summary |
| `name` | `string` | `string` | Label, e.g. “Salary” or “Groceries” |
| `amount` | `number` | `string` (`"12.50"`) | `parseFloat(...).toFixed(2)` on save |

There is **no date, category, currency, or month** on a transaction.

### Derived numbers

`SummaryView` recalculates whenever the list changes:

```text
incomeTotal   = sum of items where type === "income"
expensesTotal = sum of all other items
finalAmount   = incomeTotal - expensesTotal
```

Amounts are displayed with `formatNumber()` (2 decimal places, `en-US` grouping).

## User journey

```text
First visit
  `/` onboarding (3 screens)
    → `/get_started` (enter name)
      → `/budget` (track money)

Return visit
  `/` sees account_name
    → `/budget`

Reset
  confirm toast → localStorage.clear()
    → `/` (onboarding again)
```

### 1. Onboarding (`/`)

Three slides:

1. Brand: “Your simple budget companion”
2. Privacy: no sign-in, data stays on device
3. Offline: use it anytime

Last button goes to `/get_started`. Returning users skip this.

### 2. Get started (`/get_started`)

User enters a name. Empty name shows an error toast. A valid name writes `account_name` and opens `/budget`.

### 3. Budget (`/budget`)

Layout:

1. Reset icon (top right)
2. “KIRABAKI” title
3. “Available budget in {Month} {Year}” — current calendar month only, not a filter
4. Remaining balance (large number)
5. Income row and Expenses row
6. Transaction list
7. Sticky `+` button to add a transaction

### 4. Add / edit transaction

Dialog fields:

- Type: Income or Expense
- Name
- Amount (text input, not a numeric stepper)

Create appends a new object. Edit finds the row by `id` and overwrites type, name, and amount.

### 5. Delete

Removes the row from the in-memory list and writes the array back. No confirm dialog.

### 6. Reset

`ResetView` asks “Confirm Reset?”. Confirm clears **all** localStorage (name + transactions) and returns to `/`.

## Gate logic

```text
if localStorage.account_name exists
  treat device as onboarded → /budget
else
  treat device as new → onboarding / get_started
```

There is no check that `transactions` is valid JSON beyond `JSON.parse(... || '[]')`. Corrupt storage will throw at runtime.

## Flow gaps

- Month label implies monthly budgeting, but the list is lifetime / unscoped.
- Returning to `/` after setup is fine; there is no “log out”, only full reset.
- Edit/delete appear on hover. On a phone there is no hover, so those actions are hard to reach.
- Amount is not validated as a number before `parseFloat`.

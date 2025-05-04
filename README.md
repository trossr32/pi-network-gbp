# Pi Network GBP Tracker

This project provides a complete pipeline to track and display the GBP exchange rate, market cap, and 24-hour performance data for the **Pi Network cryptocurrency**. It includes:

- A responsive React app for live conversion and display
- Automated data updates using the CoinGecko API
- A JSON API endpoint hosted via GitHub Pages
- A PowerShell script for CLI-based querying

---

## 📦 Features

### 🧩 1. React Frontend (`/src`)
- Displays:
  - Pi Network GBP exchange rate
  - Market cap
  - 24h percentage change
- Provides a **live converter** to calculate the GBP value of a given amount of Pi
- Supports **light and dark themes** using Tailwind CSS with custom brand colors (`#160c23`, `#a1722f`)
- Reads dynamic data from a JSON endpoint:  
  `https://trossr32.github.io/pi-network-gbp/data/data.json`

---

### 🔄 2. Automated Data Sync with CoinGecko

#### ✅ GitHub Actions (`/.github/workflows/update-rate.yml`)
A scheduled workflow runs **every 6 hours** and:

1. Fetches live data from the [CoinGecko API](https://www.coingecko.com/)
2. Parses:
   - GBP exchange rate
   - Market cap
   - 24h % change
   - 24h volume
   - Last updated timestamp
3. Updates `public/data/data.json`
4. Commits the change to a timestamped branch
5. Creates and merges a pull request into `main`
6. Triggers a downstream `deploy.yml` workflow (optional)

#### Example JSON structure:
```json
{
  "priceGBP": 0.43977,
  "marketCapGBP": 3098555419.217365,
  "percentageChange": -1.72,
  "24h_vol": 38465549.53958324,
  "24h_change": -1.72,
  "lastUpdated": "2025-05-03T11:40:43Z"
}
```

---

### 🌐 3. Hosted API Endpoint

The latest data is served as JSON from GitHub Pages:

> [https://trossr32.github.io/pi-network-gbp/data/data.json](https://trossr32.github.io/pi-network-gbp/data/data.json)

This endpoint is consumed by the React app and can be queried by external tools or scripts.

---

### 💻 4. PowerShell Script

#### 📁 Location: `repo/powershell/Get-Pi-Network-GBP.ps1`

This script allows you to fetch and view the latest Pi Network data from the command line.

#### ✅ Usage:
```powershell
# Import and run the script
. ./powershell/Get-Pi-Network-GBP.ps1

# Call the function
Get-Pi-Network-GBP

# Output:
# priceGBP     : 0.43977
# marketCapGBP        : 3098555419.217365
# percentageChange    : -1.72
# 24h_vol             : 38465549.53958324
# 24h_change          : -1.72
# lastUpdated         : 2025-05-03T11:40:43Z
```

#### ✅ Or add it to your profile:
```powershell
# Add to your PowerShell profile
$data = Get-Pi-Network-GBP
Write-Host "Pi price: " -NoNewline
Write-Host -ForegroundColor "Yellow" "£$($data.priceGBP)" -NoNewline
Write-Host " | Last updated: " -NoNewline
Write-Host -ForegroundColor "Yellow" "$($data.lastUpdated)"
```

---

## 🚀 Getting Started

### 📦 Install dependencies (React)
```powershell
npm install
```

### 🧪 Run locally
```powershell
npm run dev
```

### 🔄 Trigger manual data update (GitHub Actions)
Go to **Actions → Update Pi Network Rate → Run workflow**.

---

## 🛡 Secrets Used in GitHub Actions

| Secret Key            | Purpose                       |
|-----------------------|-------------------------------|
| `COINGECKO_API_KEY`   | API key for CoinGecko         |
| `GH_TOKEN` (optional) | Token to trigger deploy flow  |

---

## 📄 License

This project is licensed under the GNU General Public License v3.0.  
See the [LICENSE](./LICENSE) file for details.

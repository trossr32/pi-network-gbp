# Pi Network GBP Tracker

This project provides a complete pipeline to track and display the GBP exchange rate, market cap, and performance data for the **Pi Network cryptocurrency**. It includes:

* A responsive React app for live conversion and display
* Automated data updates using the CoinGecko API
* A JSON API endpoint hosted via GitHub Pages
* A PowerShell script for CLI-based querying

---

## 📦 Features

### 🧹 1. React Frontend (`/src`)

* Displays:

  * Pi Network GBP exchange rate
  * Market cap
  * 24h percentage change
* Provides a **live converter** to calculate the GBP value of a given amount of Pi
* Supports **light and dark themes** using Tailwind CSS with custom brand colors (`#160c23`, `#a1722f`)
* Reads dynamic data from a JSON endpoint:
  `https://trossr32.github.io/pi-network-gbp/data/data.json`

---

### 🔄 2. Automated Data Sync with CoinGecko

#### ✅ GitHub Actions (`/.github/workflows/update-rate.yml`)

A scheduled workflow runs **every 30 minutes** and:

1. Fetches live data from the [CoinGecko API](https://www.coingecko.com/)
2. Parses:

   * GBP exchange rate
   * Market cap
   * Price changes (1d to 1y, Pi and GBP)
   * All-time high/low
   * Last updated timestamp
3. Updates `public/data/data.json`
4. Commits the change to a timestamped branch if the data has changed
5. Creates and merges a pull request into `main`
6. Triggers a downstream `deploy.yml` workflow (optional)

#### Example JSON structure:

```json
{
  "id": "pi-network",
  "symbol": "pi",
  "name": "Pi Network",
  "priceGBP": 0.447844,
  "marketCapGBP": 3154989744,
  "percentageChange": 1.21357,
  "high_24hGBP": 0.458172,
  "low_24hGBP": 0.435355,
  "lastUpdated": "2025-05-04T14:52:42.158Z",
  "allTimeHigh": {
    "priceGBP": 2.35,
    "percentageChange": -80.98015,
    "date": "2025-02-26T16:41:03.732Z"
  },
  "allTimeLow": {
    "priceGBP": 0.315895,
    "percentageChange": 41.664,
    "date": "2025-04-05T04:50:37.033Z"
  },
  "priceChange": {
    "pricePi_24h": 0.00712378,
    "priceGBP24h": 0.00536975,
    "percentageChangePi_24h": 1.21357,
    "percentageChangePi_7d": -5.94318,
    "percentageChangePi_14d": -5.24476,
    "percentageChangePi_30d": 13.68964,
    "percentageChangePi_60d": -68.59539,
    "percentageChangePi_200d": 0.0,
    "percentageChangePi_1y": 0.0,
    "percentageChangePi_GBP": 1.21357,
    "percentageChangePi_GBP_7d": -5.6136,
    "percentageChangePi_GBP_14d": -5.30192,
    "percentageChangePi_GBP_30d": 11.15749,
    "percentageChangePi_GBP_60d": -69.64652,
    "percentageChangePi_GBP_200d": null,
    "percentageChangePi_GBP_1y": null
  }
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

# id                      : pi-network
# symbol                  : pi
# name                    : Pi Network
# priceGBP                : 0.447844
# marketCapGBP            : 3154989744
# percentageChange        : 1.21357
# high_24hGBP             : 0.458172
# low_24hGBP              : 0.435355
# lastUpdated             : 2025-05-04T14:52:42.158Z
# allTimeHigh             : @{priceGBP=2.35; percentageChange=-80.98015; date=2025-02-26T16:41:03.732Z}
# allTimeLow              : @{priceGBP=0.315895; percentageChange=41.664; date=2025-04-05T04:50:37.033Z}
# priceChange             : @{pricePi_24h=0.00712378; priceGBP24h=0.00536975; percentageChangePi_24h=1.21357; percentageChangePi_7d=-5.94318; percentageChangePi_14d=-5.24476; percentageChangePi_30d=13.68964; percentageChangePi_60d=-68.59539; percentageChangePi_200d=0.0; percentageChangePi_1y=0.0; percentageChangePi_GBP=1.21357; percentageChangePi_GBP_7d=-5.6136; percentageChangePi_GBP_14d=-5.30192; percentageChangePi_GBP_30d=11.15749; percentageChangePi_GBP_60d=-69.64652; percentageChangePi_GBP_200d=$null; percentageChangePi_GBP_1y=$null}
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

```bash
npm install
```

### 🥪 Run locally

```bash
npm run dev
```

### 🔄 Trigger manual data update (GitHub Actions)

Go to **Actions → Update Pi Network Rate → Run workflow**.

---

## 🛡 Secrets Used in GitHub Actions

| Secret Key            | Purpose                      |
| --------------------- | ---------------------------- |
| `COINGECKO_API_KEY`   | API key for CoinGecko        |
| `GH_TOKEN` (optional) | Token to trigger deploy flow |

---

## 📄 License

This project is licensed under the GNU General Public License v3.0.
See the [LICENSE](./LICENSE) file for details.

# Spring Countdown (GNOME Shell Extension) 🌸

A customizable, modern desktop widget and top bar indicator for GNOME Shell (supporting versions 45 through 50 on Wayland and X11) that counts down the time left until the first day of spring (March 21st) or showcases the current warm season.

![GNOME Shell](https://img.shields.io/badge/GNOME-45%20--%2050-blue)
![Session](https://img.shields.io/badge/Session-Wayland%20%7C%20X11-purple)
![License](https://img.shields.io/badge/License-MIT-green)

---

## ✨ Features

- 🖥️ **Interactive Desktop Widget:**
  - Modern, glassy floating widget attached directly to the desktop wallpaper layer.
  - **Fluid Drag & Drop:** Move the widget anywhere across your workspace with left-click dragging.
  - **Multi-Monitor Awareness:** Automatically pins to the GNOME **Primary Display** or a specific monitor (`Monitor 0`, `Monitor 1`, etc.) using percentage-based relative coordinates. Works seamlessly across display connect/disconnect (hotplug) events.
  - **Position Lock:** Lock the widget in place from settings to avoid accidental movement.

- ⏳ **Flexible Countdown Units:**
  - **Mondays:** *“22 Mondays until spring!”* (Track the remaining work weeks).
  - **Full Weeks:** *“22 weeks until spring”*.
  - **Days:** *“158 days until March 21st”*.

- 🎭 **Customizable Subtitle Vibes:**
  - **Standard:** Realistic time distance.
  - **Minimalist:** Brief and clean.
  - **Endure the Gloom:** Sarcastic survival counter for cold gray days.
  - **Seasonal Blues:** Witty seasonal depression tracker.
  - **Nature & Bloom:** Poetic anticipation of flowers, sunny mornings, and singing birds.

- 🎨 **Visual Customization & Theming:**
  - **HEX Accent Color:** Set any custom HEX color (e.g. `#4cd964`, `#ff79c6`, `#00e5ff`) with built-in color picker and glowing text shadows.
  - **Themes:**
    - *Modern Glassmorphism* (frosted blur and subtle borders)
    - *Solid Dark* (deep contrast)
    - *Emerald Spring* (fresh vibrant green tone)
    - *Minimal* (borderless & lightweight)
  - **Scale & Size:** Standard (Normal), Large & Prominent (Large), or Huge Poster (Huge).
  - **Header Badge:** Toggle the top pill badge on/off.

- 🌐 **Multilingual Interface:**
  - Real-time in-place language switching for both the desktop widget and preferences window.
  - Supported languages: **English**, **Polish**, **German**, and **Spanish** (with automatic system default detection).

- 🔝 **Top Bar Indicator:**
  - Compact countdown pill on the top panel.
  - Clicking reveals a GNOME popup menu with status and direct access to extension preferences.

- 🍃 **Seasonal Logic:**
  - **Spring (March 21 – June 21):** Shows *“Spring is here! 🌸”*.
  - **Summer (June 22 – September 22):** Shows *“Summer is here! ☀️”*.
  - **Autumn & Winter:** Automatically starts countdown to the upcoming spring.
  - Optional mode: *“Always count down to next Spring”*.

---

## 🚀 Installation

### Automated Script

Clone the repository and run the included installer:

```bash
git clone https://github.com/piotrowskiadam/spring-countdown.git
cd spring-countdown
./install.sh
```

### Enabling the Extension

In a **Wayland** session, GNOME Shell discovers new extensions on session login:
1. Log out and log back in (or restart your session).
2. Enable the extension:
   ```bash
   gnome-extensions enable spring-countdown@adampiotrowski.github.io
   ```
3. Open preferences to customize colors, language, and monitors:
   ```bash
   gnome-extensions prefs spring-countdown@adampiotrowski.github.io
   ```

---

## ⚙️ Configuration & GSettings

The extension uses the GSettings schema `org.gnome.shell.extensions.spring-countdown`:

| Key | Type | Default | Description |
|---|---|---|---|
| `countdown-unit` | string | `'mondays'` | `'mondays'`, `'weeks'`, or `'days'` |
| `subtitle-preset` | string | `'default'` | `'default'`, `'simple'`, `'grey-endure'`, `'depression'`, `'nature'` |
| `accent-color` | string | `'#4cd964'` | Custom HEX color for numbers and highlights |
| `widget-theme` | string | `'glass'` | `'glass'`, `'solid-dark'`, `'emerald'`, `'minimal'` |
| `widget-size` | string | `'large'` | `'normal'`, `'large'`, `'huge'` |
| `show-badge` | boolean | `true` | Toggle the header pill badge |
| `show-desktop-widget`| boolean | `true` | Enable/disable desktop wallpaper widget |
| `show-topbar-indicator`| boolean | `false`| Enable/disable top panel indicator |
| `monitor-target` | string | `'primary'` | `'primary'` or monitor index (`'0'`, `'1'`, etc.) |
| `language` | string | `'system'` | `'system'`, `'en'`, `'pl'`, `'de'`, `'es'` |
| `lock-widget-position`| boolean| `false` | Prevent dragging the desktop widget |
| `seasonal-behavior` | string | `'seasons'` | `'seasons'` or `'always-countdown'` |

---

## 🛠️ Project Structure

```
├── calculator.js     # Season calculations, countdown algorithms, and i18n dictionaries
├── extension.js      # Main GNOME Shell extension lifecycle, widget actor, and panel indicator
├── prefs.js          # Libadwaita preferences window with live in-place localization
├── stylesheet.css    # CSS styling, glassmorphism filters, themes, and sizing rules
├── metadata.json     # GNOME extension metadata and version compatibility
├── install.sh        # Schema compiler and installer script
├── schemas/          # GSettings XML schema and compiled binary
├── LICENSE           # MIT License
├── AGENTS.md         # Architecture and guide for AI coding assistants
└── README.md         # Project overview and user documentation
```

---

## 📄 License

Distributed under the [MIT License](LICENSE).

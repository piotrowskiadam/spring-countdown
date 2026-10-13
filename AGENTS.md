# AGENTS.md — Developer & AI Contributor Guide

This document outlines the architecture, constraints, runtime lifecycle, and conventions used across the **Spring Countdown** (`spring-countdown@adampiotrowski.github.io`) GNOME Shell extension.

---

## 1. System Overview & Technology Stack

- **Target Environment:** GNOME Shell 45 through 50+ (ESM modules).
- **Session Types:** Wayland and X11 (Fedora / Arch / Ubuntu / Debian).
- **Toolkits & Bindings:**
  - `GObject`, `GLib`, `Gio` via GJS bindings (`gi://`).
  - `Clutter` & `St` (Shell Toolkit) for the desktop widget actor tree.
  - `Adw` (Libadwaita 1) & `Gtk 4` for the extension preferences dialog.
- **State Persistence:** `GSettings` schema (`org.gnome.shell.extensions.spring-countdown`).

---

## 2. Core Architecture & Modules

### 2.1 `extension.js` (Lifecycle & Shell Integration)
- **Class:** `SpringCountdownExtension extends Extension`
- **Responsibilities:**
  - Manages `enable()` and `disable()` lifecycle cleanups (disconnecting signals, removing actors from stage).
  - Instantiates `SpringDesktopWidget` (`GObject.registerClass`) and attaches it to `Main.layoutManager._backgroundGroup` (wallpaper layer) or falls back to `uiGroup`.
  - Implements `vfunc_allocate(box)` to prevent GNOME Shell's background relayout from overriding the widget's custom positioning.
  - Handles `Main.layoutManager.connect('monitors-changed')` to safely retain viewport visibility across monitor hotplug events.
  - Relative coordinate normalization (`relative-x`, `relative-y`) based on `getTargetMonitor()`.

### 2.2 `calculator.js` (Pure Logic & Localization)
- **Class:** `SpringCountdownCalculator`
- **Features:**
  - Date differential math against the calendar spring threshold (March 21st, `00:00:00`).
  - Monday counter algorithm (`_countMondaysBetween`) calculating remaining working cycles.
  - Polish pluralization rules (`1 dzień / 2-4 dni / 5+ dni`, `poniedziałek / poniedziałki / poniedziałków`).
  - Built-in multi-language dictionaries: `en`, `pl`, `de`, `es`.
  - Subtitle mood presets: `default`, `simple`, `grey-endure`, `depression`, `nature`.

### 2.3 `prefs.js` (Preferences UI)
- **Class:** `SpringCountdownPreferences extends ExtensionPreferences`
- **Important Invariant:**
  - **Do NOT re-instantiate or append new `Adw.PreferencesPage` instances upon user language change.** Doing so creates duplicate tab icons in the Adw navigation header.
  - Use `updateTextsInPlace()` to mutate existing row titles, descriptions, and dropdown models in-place without touching page hierarchy.

### 2.4 `schemas/`
- Declares schema `org.gnome.shell.extensions.spring-countdown`.
- Any new key added to XML must be accompanied by `glib-compile-schemas` in the local and global schemas directories.

---

## 3. Extension Constraints & Gotchas

1. **Wayland Background Layer:**
   - Actors added to `global.stage` float above windows unless placed specifically inside `Main.layoutManager._backgroundGroup`.
   - The desktop background actor hierarchy is managed by mutter; custom layout overrides require implementing `vfunc_allocate()`.

2. **Top Bar Indicator Action Menu:**
   - GNOME Shell's `PanelMenu.Button.menu.addAction()` returns a standard `PopupMenuItem`.
   - Calling `.setIcon()` directly on this return value throws a `TypeError`. Use standard label text or append custom actors into the menu item's child box.

3. **Multi-Monitor Coordinate Systems:**
   - Wayland combines multiple monitors into a single continuous `global.stage` virtual coordinate plane.
   - Storing raw absolute coordinates causes widgets to disappear or clip offscreen when monitors are rearranged. Always anchor positions relative to `Main.layoutManager.primaryMonitor` or the indexed monitor geometry.

---

## 4. Development Workflow & Commands

### Compiling and Installing
```bash
./install.sh
```

### Hot Reloading in a Running Session
```bash
gnome-extensions disable spring-countdown@adampiotrowski.github.io && \
sleep 0.5 && \
gnome-extensions enable spring-countdown@adampiotrowski.github.io
```

### Viewing Realtime Extension Logs
```bash
journalctl -f -o cat /usr/bin/gnome-shell
```

### Inspecting GSettings Values
```bash
gsettings list-recursively org.gnome.shell.extensions.spring-countdown
```

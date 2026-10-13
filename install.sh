#!/usr/bin/env bash
set -e

UUID="spring-countdown@adampiotrowski.github.io"
DEST_DIR="$HOME/.local/share/gnome-shell/extensions/$UUID"

echo "🌸 Instalowanie rozszerzenia $UUID..."

# Kompilacja schematu GSettings
echo "📦 Kompilacja schematów GSettings..."
glib-compile-schemas schemas/

# Utworzenie katalogu docelowego
mkdir -p "$DEST_DIR"

# Kopiowanie plików
echo "📂 Kopiowanie plików rozszerzenia..."
cp -r metadata.json extension.js prefs.js calculator.js stylesheet.css schemas/ "$DEST_DIR/"

echo "✅ Rozszerzenie zainstalowane pomyślnie w $DEST_DIR"
echo ""
echo "Aby włączyć rozszerzenie w GNOME Shell:"
echo "1. Jeśli jesteś na Wayland, wyloguj się i zaloguj ponownie (lub zrestartuj sesję)."
echo "2. Następnie wykonaj komendę:"
echo "   gnome-extensions enable $UUID"
echo "3. Aby otworzyć preferencje:"
echo "   gnome-extensions prefs $UUID"

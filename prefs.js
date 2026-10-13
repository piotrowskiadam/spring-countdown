import Adw from 'gi://Adw';
import Gtk from 'gi://Gtk';
import Gdk from 'gi://Gdk';
import { ExtensionPreferences } from 'resource:///org/gnome/Shell/Extensions/js/extensions/prefs.js';

const PREFS_I18N = {
    en: {
        pageGeneral: 'General',
        pageAppearance: 'Appearance',
        langGroupTitle: 'Language & Localization',
        langGroupDesc: 'Choose extension interface and countdown language.',
        langRowTitle: 'Extension Language',
        langRowSubtitle: 'Choose a language or keep system default',
        langOptions: [
            'System Default',
            'English (English)',
            'Polish (Polski)',
            'German (Deutsch)',
            'Spanish (Español)',
        ],
        countdownGroupTitle: 'Countdown Mode & Unit',
        countdownGroupDesc: 'Configure how time until spring is calculated and presented.',
        unitRowTitle: 'Time Unit',
        unitRowSubtitle: 'Count down by Mondays, full weeks, or days',
        unitOptions: ['Mondays', 'Weeks', 'Days'],
        subtitleRowTitle: 'Subtitle Vibe & Style',
        subtitleRowSubtitle: 'Choose the mood of the message below the counter',
        subtitleOptions: [
            'Standard (e.g. "Weeks separating us from spring")',
            'Minimalist (e.g. "until spring")',
            'Endure the Gloom (e.g. "weeks to survive in the gloom")',
            'Seasonal Blues (e.g. "weeks of seasonal depression left")',
            'Nature & Bloom (e.g. "weeks until green leaves return")',
        ],
        seasonalRowTitle: 'Behavior after March 21st',
        seasonalRowSubtitle: 'What to display during spring and summer',
        seasonalOptions: [
            'Seasons (Spring / Summer, countdown resumes in Autumn)',
            'Always count down to next Spring',
        ],
        displayGroupTitle: 'Display & Monitor Placement',
        displayGroupDesc: 'Control widget visibility and which monitor it attaches to.',
        desktopRowTitle: 'Desktop Widget',
        desktopRowSubtitle: 'Display interactive widget directly on the desktop wallpaper',
        monitorRowTitle: 'Display on Monitor',
        monitorRowSubtitle: 'Target display for the desktop widget',
        monitorOptions: [
            'Primary Display (Default GNOME Monitor)',
            'Monitor 0 (First screen)',
            'Monitor 1 (Second screen)',
            'Monitor 2 (Third screen)',
        ],
        lockRowTitle: 'Lock Widget Position',
        lockRowSubtitle: 'Prevents accidentally dragging the widget with the mouse',
        topbarRowTitle: 'Top Bar Indicator',
        topbarRowSubtitle: 'Add compact countdown counter to the top panel',
        colorGroupTitle: 'Colors & Accents',
        colorGroupDesc: 'Customize the highlight color for numbers and badges.',
        accentRowTitle: 'Accent Color (HEX)',
        styleGroupTitle: 'Theme & Geometry',
        styleGroupDesc: 'Adjust background aesthetic and counter typography.',
        themeRowTitle: 'Widget Theme',
        themeRowSubtitle: 'Select background, border and glow appearance',
        themeOptions: [
            'Modern Glassmorphism (Frosted glass)',
            'Solid Dark (Deep dark contrast)',
            'Emerald Spring (Vibrant green tone)',
            'Minimal (Subtle transparent)',
        ],
        sizeRowTitle: 'Counter Size & Prominence',
        sizeRowSubtitle: 'Size and weight of the countdown numbers',
        sizeOptions: ['Standard (Normal)', 'Large & Clear (Large)', 'Huge Poster (Huge)'],
        badgeRowTitle: 'Show Header Badge',
        badgeRowSubtitle: 'Display top pill above the counter',
    },
    pl: {
        pageGeneral: 'Ogólne',
        pageAppearance: 'Wygląd widżetu',
        langGroupTitle: 'Język i Tłumaczenie',
        langGroupDesc: 'Wybierz język interfejsu i odliczania.',
        langRowTitle: 'Język rozszerzenia',
        langRowSubtitle: 'Wybierz język lub użyj domyślnego języka systemowego',
        langOptions: [
            'Domyślny systemowy',
            'Angielski (English)',
            'Polski (Polski)',
            'Niemiecki (Deutsch)',
            'Hiszpański (Español)',
        ],
        countdownGroupTitle: 'Tryb i jednostka odliczania',
        countdownGroupDesc: 'Skonfiguruj w jakich jednostkach ma być prezentowany czas.',
        unitRowTitle: 'Jednostka czasu',
        unitRowSubtitle: 'Wybierz czy odliczać poniedziałki, pełne tygodnie czy dni',
        unitOptions: ['Poniedziałki', 'Tygodnie', 'Dni'],
        subtitleRowTitle: 'Styl podpisu dolnego',
        subtitleRowSubtitle: 'Wybierz charakter/vibe komunikatu pod licznikiem',
        subtitleOptions: [
            'Standardowy (np. "Tyle tygodni dzieli nas od wiosny")',
            'Minimalistyczny (np. "do wiosny")',
            'Wytrzymanie w szarości (np. "tygodni do przetrwania w szarości")',
            'Jesienno-zimowy blues (np. "tygodni w jesienno-zimowej depresji")',
            'Przyroda i słońce (np. "tygodni do powrotu ptaków i zieleni")',
        ],
        seasonalRowTitle: 'Logika po 21 marca',
        seasonalRowSubtitle: 'Co wyświetlać, gdy nadejdzie wiosna i lato',
        seasonalOptions: [
            'Pory roku (Wiosna / Lato, odliczanie od jesieni)',
            'Zawsze odliczaj do następnej wiosny',
        ],
        displayGroupTitle: 'Wyświetlanie i Wybór Monitora',
        displayGroupDesc: 'Kontrola widoczności oraz ekranu docelowego.',
        desktopRowTitle: 'Widżet na pulpicie',
        desktopRowSubtitle: 'Wyświetlaj interaktywny kafelek bezpośrednio na tapecie',
        monitorRowTitle: 'Wyświetlaj na monitorze',
        monitorRowSubtitle: 'Wskaż ekran dla widżetu pulpitu',
        monitorOptions: [
            'Ekran główny (Primary Display w GNOME)',
            'Monitor 0 (Pierwszy ekran)',
            'Monitor 1 (Drugi ekran)',
            'Monitor 2 (Trzeci ekran)',
        ],
        lockRowTitle: 'Zablokuj pozycję widżetu',
        lockRowSubtitle: 'Uniemożliwia przypadkowe przesunięcie kafelka myszką',
        topbarRowTitle: 'Wskaźnik na górnym pasku',
        topbarRowSubtitle: 'Dodaj kompaktowy licznik w panelu górnym z rozwijanym menu',
        colorGroupTitle: 'Kolorystyka i Akcenty',
        colorGroupDesc: 'Dostosuj barwę wyróżniającej się cyfry i nagłówka.',
        accentRowTitle: 'Kolor akcentu (HEX)',
        styleGroupTitle: 'Stylistyka i Kształt',
        styleGroupDesc: 'Dostosuj styl wizualny tła i wielkości kafelka.',
        themeRowTitle: 'Motyw graficzny',
        themeRowSubtitle: 'Wybierz styl tła, obramowania i cienia',
        themeOptions: [
            'Nowoczesny Glassmorphism (Rozmyte tło)',
            'Ciemny Elegancki (Solid Dark)',
            'Szmaragdowa Wiosna (Zielony akcent)',
            'Minimalistyczny (Tylko tekst i delikatne tło)',
        ],
        sizeRowTitle: 'Rozmiar i wyróżnienie licznika',
        sizeRowSubtitle: 'Wielkość głównego napisu odliczania',
        sizeOptions: ['Standardowy (Normal)', 'Duży i Wyraźny (Large)', 'Ogromny (Huge Poster)'],
        badgeRowTitle: 'Pokaż nagłówek (Badge)',
        badgeRowSubtitle: 'Wyświetlaj plakietkę nad liczbą',
    },
    de: {
        pageGeneral: 'Allgemein',
        pageAppearance: 'Erscheinungsbild',
        langGroupTitle: 'Sprache & Lokalisierung',
        langGroupDesc: 'Wählen Sie die Sprache der Erweiterung.',
        langRowTitle: 'Erweiterungssprache',
        langRowSubtitle: 'Sprache auswählen oder Systemstandard nutzen',
        langOptions: [
            'Systemstandard',
            'Englisch (English)',
            'Polnisch (Polski)',
            'Deutsch (Deutsch)',
            'Spanisch (Español)',
        ],
        countdownGroupTitle: 'Countdown-Modus & Einheit',
        countdownGroupDesc: 'Wie die Zeit bis zum Frühling berechnet wird.',
        unitRowTitle: 'Zeiteinheit',
        unitRowSubtitle: 'Montage, Wochen oder Tage zählen',
        unitOptions: ['Montage', 'Wochen', 'Tage'],
        subtitleRowTitle: 'Stil der Unterschrift',
        subtitleRowSubtitle: 'Wähle die Stimmung des Textes unter dem Zähler',
        subtitleOptions: [
            'Standard (z.B. "Wochen trennen uns vom Frühling")',
            'Minimalistisch (z.B. "bis zum Frühling")',
            'Grau durchhalten (z.B. "Wochen im trüben Grau überstehen")',
            'Winterblues (z.B. "Wochen im Winterblues")',
            'Natur & Frühlingserwachen (z.B. "Wochen bis alles wieder grün wird")',
        ],
        seasonalRowTitle: 'Verhalten nach dem 21. März',
        seasonalRowSubtitle: 'Anzeige im Frühling und Sommer',
        seasonalOptions: [
            'Jahreszeiten (Frühling / Sommer, Countdown ab Herbst)',
            'Immer bis zum nächsten Frühling zählen',
        ],
        displayGroupTitle: 'Anzeige & Bildschirmauswahl',
        displayGroupDesc: 'Sichtbarkeit und Zielbildschirm festlegen.',
        desktopRowTitle: 'Desktop-Widget',
        desktopRowSubtitle: 'Interaktives Widget direkt auf dem Desktop anzeigen',
        monitorRowTitle: 'Auf Bildschirm anzeigen',
        monitorRowSubtitle: 'Zielbildschirm für das Desktop-Widget',
        monitorOptions: [
            'Hauptbildschirm (Primary Display in GNOME)',
            'Bildschirm 0 (Erster Monitor)',
            'Bildschirm 1 (Zweiter Monitor)',
            'Bildschirm 2 (Dritter Monitor)',
        ],
        lockRowTitle: 'Widget-Position sperren',
        lockRowSubtitle: 'Verhindert versehentliches Verschieben per Maus',
        topbarRowTitle: 'Leistenanzeige',
        topbarRowSubtitle: 'Kompakten Zähler im oberen Panel anzeigen',
        colorGroupTitle: 'Farben & Akzente',
        colorGroupDesc: 'Akzentfarbe für Ziffern und Badge anpassen.',
        accentRowTitle: 'Akzentfarbe (HEX)',
        styleGroupTitle: 'Design & Größe',
        styleGroupDesc: 'Hintergrund und Textgröße anpassen.',
        themeRowTitle: 'Widget-Thema',
        themeRowSubtitle: 'Stil für Hintergrund und Rahmen',
        themeOptions: [
            'Modernes Glassmorphism',
            'Dunkel Solide (Solid Dark)',
            'Smaragdgrün (Emerald Spring)',
            'Minimalistisch',
        ],
        sizeRowTitle: 'Zählergröße',
        sizeRowSubtitle: 'Größe der Countdown-Zahl',
        sizeOptions: ['Standard (Normal)', 'Groß (Large)', 'Riesiges Poster (Huge)'],
        badgeRowTitle: 'Kopfzeilen-Badge anzeigen',
        badgeRowSubtitle: 'Kleine Plakette über dem Zähler anzeigen',
    },
    es: {
        pageGeneral: 'General',
        pageAppearance: 'Apariencia',
        langGroupTitle: 'Idioma y Localización',
        langGroupDesc: 'Elige el idioma de la interfaz y la cuenta atrás.',
        langRowTitle: 'Idioma de la extensión',
        langRowSubtitle: 'Selecciona un idioma o usa el predeterminado del sistema',
        langOptions: [
            'Predeterminado del sistema',
            'Inglés (English)',
            'Polaco (Polski)',
            'Alemán (Deutsch)',
            'Español (Español)',
        ],
        countdownGroupTitle: 'Modo y Unidad',
        countdownGroupDesc: 'Configura cómo se calcula el tiempo hasta la primavera.',
        unitRowTitle: 'Unidad de tiempo',
        unitRowSubtitle: 'Contar por lunes, semanas o días',
        unitOptions: ['Lunes', 'Semanas', 'Días'],
        subtitleRowTitle: 'Estilo y mensaje inferior',
        subtitleRowSubtitle: 'Elige el estilo del mensaje bajo el contador',
        subtitleOptions: [
            'Estándar (ej. "Semanas que nos separan de la primavera")',
            'Minimalista (ej. "para la primavera")',
            'Aguantar la grisura (ej. "semanas para superar el frío gris")',
            'Melancolía invernal (ej. "semanas de melancolía invernal")',
            'Naturaleza y sol (ej. "semanas para que vuelva el verde")',
        ],
        seasonalRowTitle: 'Comportamiento tras el 21 de marzo',
        seasonalRowSubtitle: 'Qué mostrar durante la primavera y el verano',
        seasonalOptions: [
            'Estaciones (Primavera / Verano, cuenta atrás desde otoño)',
            'Contar siempre hasta la siguiente primavera',
        ],
        displayGroupTitle: 'Visualización y Monitor',
        displayGroupDesc: 'Controla la visibilidad y en qué pantalla fijar el widget.',
        desktopRowTitle: 'Widget de escritorio',
        desktopRowSubtitle: 'Mostrar widget interactivo en el fondo de pantalla',
        monitorRowTitle: 'Mostrar en monitor',
        monitorRowSubtitle: 'Monitor de destino para el widget de escritorio',
        monitorOptions: [
            'Pantalla principal (Primary Display de GNOME)',
            'Monitor 0 (Primera pantalla)',
            'Monitor 1 (Segunda pantalla)',
            'Monitor 2 (Tercera pantalla)',
        ],
        lockRowTitle: 'Bloquear posición',
        lockRowSubtitle: 'Evita mover accidentalmente el widget con el ratón',
        topbarRowTitle: 'Indicador en barra superior',
        topbarRowSubtitle: 'Añadir contador compacto en el panel superior',
        colorGroupTitle: 'Colores y Acentos',
        colorGroupDesc: 'Personaliza el color de los números y el distintivo.',
        accentRowTitle: 'Color de acento (HEX)',
        styleGroupTitle: 'Diseño y Geometría',
        styleGroupDesc: 'Ajusta la estética del fondo y la tipografía.',
        themeRowTitle: 'Tema del widget',
        themeRowSubtitle: 'Selecciona fondo, bordes y sombras',
        themeOptions: [
            'Glassmorphism moderno',
            'Oscuro sólido (Solid Dark)',
            'Primavera esmeralda',
            'Minimalista',
        ],
        sizeRowTitle: 'Tamaño del contador',
        sizeRowSubtitle: 'Tamaño y grosor de los números',
        sizeOptions: ['Estándar (Normal)', 'Grande (Large)', 'Póster gigante (Huge)'],
        badgeRowTitle: 'Mostrar distintivo superior',
        badgeRowSubtitle: 'Mostrar placa sobre el número',
    },
};

export default class SpringCountdownPreferences extends ExtensionPreferences {
    fillPreferencesWindow(window) {
        const settings = this.getSettings();

        const getLang = () => {
            const langSetting = settings.get_string('language');
            if (langSetting === 'system') {
                if (typeof Intl !== 'undefined' && Intl.DateTimeFormat) {
                    const loc = new Intl.DateTimeFormat().resolvedOptions().locale.toLowerCase();
                    if (loc.startsWith('pl')) return 'pl';
                    if (loc.startsWith('de')) return 'de';
                    if (loc.startsWith('es')) return 'es';
                }
                return 'en';
            }
            return PREFS_I18N[langSetting] ? langSetting : 'en';
        };

        let t = PREFS_I18N[getLang()] || PREFS_I18N.en;

        // ==========================================
        // 1. PAGE: GENERAL (Tworzone DOKŁADNIE RAZ)
        // ==========================================
        const generalPage = new Adw.PreferencesPage({
            title: t.pageGeneral,
            icon_name: 'preferences-other-symbolic',
        });
        window.add(generalPage);

        // Język
        const langGroup = new Adw.PreferencesGroup({
            title: t.langGroupTitle,
            description: t.langGroupDesc,
        });
        generalPage.add(langGroup);

        const langRow = new Adw.ComboRow({
            title: t.langRowTitle,
            subtitle: t.langRowSubtitle,
            model: new Gtk.StringList({ strings: t.langOptions }),
        });

        const langKeys = ['system', 'en', 'pl', 'de', 'es'];
        const curL = settings.get_string('language');
        const lIdx = langKeys.indexOf(curL);
        langRow.selected = lIdx >= 0 ? lIdx : 0;
        langGroup.add(langRow);

        // Tryb odliczania
        const countdownGroup = new Adw.PreferencesGroup({
            title: t.countdownGroupTitle,
            description: t.countdownGroupDesc,
        });
        generalPage.add(countdownGroup);

        const unitRow = new Adw.ComboRow({
            title: t.unitRowTitle,
            subtitle: t.unitRowSubtitle,
            model: new Gtk.StringList({ strings: t.unitOptions }),
        });

        const currentUnit = settings.get_string('countdown-unit');
        if (currentUnit === 'mondays') unitRow.selected = 0;
        else if (currentUnit === 'weeks') unitRow.selected = 1;
        else unitRow.selected = 2;

        unitRow.connect('notify::selected', () => {
            if (unitRow.selected === 0) settings.set_string('countdown-unit', 'mondays');
            else if (unitRow.selected === 1) settings.set_string('countdown-unit', 'weeks');
            else if (unitRow.selected === 2) settings.set_string('countdown-unit', 'days');
        });
        countdownGroup.add(unitRow);

        // Podpis dolny
        const subtitleRow = new Adw.ComboRow({
            title: t.subtitleRowTitle,
            subtitle: t.subtitleRowSubtitle,
            model: new Gtk.StringList({ strings: t.subtitleOptions }),
        });

        const subtitleMap = ['default', 'simple', 'grey-endure', 'depression', 'nature'];
        const currentSubtitle = settings.get_string('subtitle-preset');
        const subIndex = subtitleMap.indexOf(currentSubtitle);
        subtitleRow.selected = subIndex >= 0 ? subIndex : 0;

        subtitleRow.connect('notify::selected', () => {
            settings.set_string('subtitle-preset', subtitleMap[subtitleRow.selected] || 'default');
        });
        countdownGroup.add(subtitleRow);

        // Zachowanie po 21 marca
        const seasonalRow = new Adw.ComboRow({
            title: t.seasonalRowTitle,
            subtitle: t.seasonalRowSubtitle,
            model: new Gtk.StringList({ strings: t.seasonalOptions }),
        });

        const currentBehavior = settings.get_string('seasonal-behavior');
        seasonalRow.selected = currentBehavior === 'always-countdown' ? 1 : 0;

        seasonalRow.connect('notify::selected', () => {
            settings.set_string('seasonal-behavior', seasonalRow.selected === 1 ? 'always-countdown' : 'seasons');
        });
        countdownGroup.add(seasonalRow);

        // Wyświetlanie i Monitory
        const displayGroup = new Adw.PreferencesGroup({
            title: t.displayGroupTitle,
            description: t.displayGroupDesc,
        });
        generalPage.add(displayGroup);

        const desktopRow = new Adw.SwitchRow({
            title: t.desktopRowTitle,
            subtitle: t.desktopRowSubtitle,
        });
        settings.bind('show-desktop-widget', desktopRow, 'active', 0);
        displayGroup.add(desktopRow);

        // Wybór monitora
        const monitorRow = new Adw.ComboRow({
            title: t.monitorRowTitle,
            subtitle: t.monitorRowSubtitle,
            model: new Gtk.StringList({ strings: t.monitorOptions }),
        });

        const monitorMap = ['primary', '0', '1', '2'];
        const curMonitor = settings.get_string('monitor-target');
        const monIdx = monitorMap.indexOf(curMonitor);
        monitorRow.selected = monIdx >= 0 ? monIdx : 0;

        monitorRow.connect('notify::selected', () => {
            settings.set_string('monitor-target', monitorMap[monitorRow.selected] || 'primary');
        });
        displayGroup.add(monitorRow);

        const lockRow = new Adw.SwitchRow({
            title: t.lockRowTitle,
            subtitle: t.lockRowSubtitle,
        });
        settings.bind('lock-widget-position', lockRow, 'active', 0);
        displayGroup.add(lockRow);

        const topbarRow = new Adw.SwitchRow({
            title: t.topbarRowTitle,
            subtitle: t.topbarRowSubtitle,
        });
        settings.bind('show-topbar-indicator', topbarRow, 'active', 0);
        displayGroup.add(topbarRow);

        // ==========================================
        // 2. PAGE: APPEARANCE (Tworzone DOKŁADNIE RAZ)
        // ==========================================
        const appearancePage = new Adw.PreferencesPage({
            title: t.pageAppearance,
            icon_name: 'emblem-photos-symbolic',
        });
        window.add(appearancePage);

        const colorGroup = new Adw.PreferencesGroup({
            title: t.colorGroupTitle,
            description: t.colorGroupDesc,
        });
        appearancePage.add(colorGroup);

        const accentEntryRow = new Adw.EntryRow({
            title: t.accentRowTitle,
            text: settings.get_string('accent-color') || '#4cd964',
            show_apply_button: true,
        });

        const colorDialog = new Gtk.ColorDialog({ with_alpha: false });
        const colorBtn = new Gtk.ColorDialogButton({
            dialog: colorDialog,
            valign: Gtk.Align.CENTER,
        });

        const initRgba = new Gdk.RGBA();
        initRgba.parse(settings.get_string('accent-color') || '#4cd964');
        colorBtn.rgba = initRgba;

        colorBtn.connect('notify::rgba', () => {
            const rgba = colorBtn.rgba;
            const r = Math.round(rgba.red * 255).toString(16).padStart(2, '0');
            const g = Math.round(rgba.green * 255).toString(16).padStart(2, '0');
            const b = Math.round(rgba.blue * 255).toString(16).padStart(2, '0');
            const hex = `#${r}${g}${b}`;
            accentEntryRow.text = hex;
            settings.set_string('accent-color', hex);
        });

        accentEntryRow.add_suffix(colorBtn);

        accentEntryRow.connect('apply', () => {
            const val = accentEntryRow.text.trim();
            if (/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(val)) {
                settings.set_string('accent-color', val);
                const rgba = new Gdk.RGBA();
                rgba.parse(val);
                colorBtn.rgba = rgba;
            }
        });

        accentEntryRow.connect('changed', () => {
            const val = accentEntryRow.text.trim();
            if (/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(val)) {
                settings.set_string('accent-color', val);
                const rgba = new Gdk.RGBA();
                rgba.parse(val);
                colorBtn.rgba = rgba;
            }
        });
        colorGroup.add(accentEntryRow);

        const styleGroup = new Adw.PreferencesGroup({
            title: t.styleGroupTitle,
            description: t.styleGroupDesc,
        });
        appearancePage.add(styleGroup);

        // Motyw
        const themeRow = new Adw.ComboRow({
            title: t.themeRowTitle,
            subtitle: t.themeRowSubtitle,
            model: new Gtk.StringList({ strings: t.themeOptions }),
        });

        const themeMap = ['glass', 'solid-dark', 'emerald', 'minimal'];
        const currentTheme = settings.get_string('widget-theme');
        const themeIndex = themeMap.indexOf(currentTheme);
        themeRow.selected = themeIndex >= 0 ? themeIndex : 0;

        themeRow.connect('notify::selected', () => {
            settings.set_string('widget-theme', themeMap[themeRow.selected] || 'glass');
        });
        styleGroup.add(themeRow);

        // Rozmiar
        const sizeRow = new Adw.ComboRow({
            title: t.sizeRowTitle,
            subtitle: t.sizeRowSubtitle,
            model: new Gtk.StringList({ strings: t.sizeOptions }),
        });

        const sizeMap = ['normal', 'large', 'huge'];
        const currentSize = settings.get_string('widget-size');
        const sizeIndex = sizeMap.indexOf(currentSize);
        sizeRow.selected = sizeIndex >= 0 ? sizeIndex : 1;

        sizeRow.connect('notify::selected', () => {
            settings.set_string('widget-size', sizeMap[sizeRow.selected] || 'large');
        });
        styleGroup.add(sizeRow);

        // Badge
        const badgeRow = new Adw.SwitchRow({
            title: t.badgeRowTitle,
            subtitle: t.badgeRowSubtitle,
        });
        settings.bind('show-badge', badgeRow, 'active', 0);
        styleGroup.add(badgeRow);

        // ==========================================
        // DYNAMICZNA AKTUALIZACJA TEKSTÓW IN-PLACE
        // (Bez tworzenia nowych stron w oknie!)
        // ==========================================
        const updateTextsInPlace = () => {
            const newT = PREFS_I18N[getLang()] || PREFS_I18N.en;

            generalPage.title = newT.pageGeneral;
            langGroup.title = newT.langGroupTitle;
            langGroup.description = newT.langGroupDesc;
            langRow.title = newT.langRowTitle;
            langRow.subtitle = newT.langRowSubtitle;
            langRow.model = new Gtk.StringList({ strings: newT.langOptions });

            countdownGroup.title = newT.countdownGroupTitle;
            countdownGroup.description = newT.countdownGroupDesc;
            unitRow.title = newT.unitRowTitle;
            unitRow.subtitle = newT.unitRowSubtitle;
            unitRow.model = new Gtk.StringList({ strings: newT.unitOptions });

            subtitleRow.title = newT.subtitleRowTitle;
            subtitleRow.subtitle = newT.subtitleRowSubtitle;
            subtitleRow.model = new Gtk.StringList({ strings: newT.subtitleOptions });

            seasonalRow.title = newT.seasonalRowTitle;
            seasonalRow.subtitle = newT.seasonalRowSubtitle;
            seasonalRow.model = new Gtk.StringList({ strings: newT.seasonalOptions });

            displayGroup.title = newT.displayGroupTitle;
            displayGroup.description = newT.displayGroupDesc;
            desktopRow.title = newT.desktopRowTitle;
            desktopRow.subtitle = newT.desktopRowSubtitle;
            monitorRow.title = newT.monitorRowTitle;
            monitorRow.subtitle = newT.monitorRowSubtitle;
            monitorRow.model = new Gtk.StringList({ strings: newT.monitorOptions });
            lockRow.title = newT.lockRowTitle;
            lockRow.subtitle = newT.lockRowSubtitle;
            topbarRow.title = newT.topbarRowTitle;
            topbarRow.subtitle = newT.topbarRowSubtitle;

            appearancePage.title = newT.pageAppearance;
            colorGroup.title = newT.colorGroupTitle;
            colorGroup.description = newT.colorGroupDesc;
            accentEntryRow.title = newT.accentRowTitle;
            styleGroup.title = newT.styleGroupTitle;
            styleGroup.description = newT.styleGroupDesc;
            themeRow.title = newT.themeRowTitle;
            themeRow.subtitle = newT.themeRowSubtitle;
            themeRow.model = new Gtk.StringList({ strings: newT.themeOptions });
            sizeRow.title = newT.sizeRowTitle;
            sizeRow.subtitle = newT.sizeRowSubtitle;
            sizeRow.model = new Gtk.StringList({ strings: newT.sizeOptions });
            badgeRow.title = newT.badgeRowTitle;
            badgeRow.subtitle = newT.badgeRowSubtitle;
        };

        // Podłączenie pod przełączenie języka
        langRow.connect('notify::selected', () => {
            const newL = langKeys[langRow.selected] || 'system';
            if (newL !== settings.get_string('language')) {
                settings.set_string('language', newL);
                updateTextsInPlace();
            }
        });
    }
}

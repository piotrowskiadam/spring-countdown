import Clutter from 'gi://Clutter';
import St from 'gi://St';
import GLib from 'gi://GLib';
import GObject from 'gi://GObject';
import * as Main from 'resource:///org/gnome/shell/ui/main.js';
import * as PanelMenu from 'resource:///org/gnome/shell/ui/panelMenu.js';
import * as PopupMenu from 'resource:///org/gnome/shell/ui/popupMenu.js';
import { Extension } from 'resource:///org/gnome/shell/extensions/extension.js';

import { SpringCountdownCalculator } from './calculator.js';

const SpringDesktopWidget = GObject.registerClass(
class SpringDesktopWidget extends St.Widget {
    _init(extension, settings) {
        super._init({
            name: 'SpringCountdownDesktopWidget',
            style_class: 'spring-desktop-widget',
            layout_manager: new Clutter.BoxLayout({
                orientation: Clutter.Orientation.VERTICAL,
                spacing: 4,
            }),
            reactive: true,
            can_focus: true,
            track_hover: true,
        });

        this._extension = extension;
        this._settings = settings;
        this._isDragging = false;

        // Badge
        this._badge = new St.Label({
            style_class: 'spring-widget-badge',
            text: 'SPRING COUNTDOWN',
            x_align: Clutter.ActorAlign.START,
        });
        this.add_child(this._badge);

        // Kontener z dużą liczbą i jednostką
        this._counterBox = new St.BoxLayout({
            style_class: 'spring-widget-counter-box',
            vertical: false,
            y_align: Clutter.ActorAlign.CENTER,
        });

        this._numberLabel = new St.Label({
            style_class: 'spring-widget-number',
            text: '0',
            y_align: Clutter.ActorAlign.CENTER,
        });

        this._unitLabel = new St.Label({
            style_class: 'spring-widget-unit',
            text: '',
            y_align: Clutter.ActorAlign.CENTER,
        });

        this._counterBox.add_child(this._numberLabel);
        this._counterBox.add_child(this._unitLabel);
        this.add_child(this._counterBox);

        // Podtytuł
        this._subtitle = new St.Label({
            style_class: 'spring-widget-subtitle',
            text: '',
        });
        this.add_child(this._subtitle);

        this._setupDragAndDrop();
        this.applyStyleAndTheme();
    }

    applyStyleAndTheme() {
        const theme = this._settings.get_string('widget-theme') || 'glass';
        const size = this._settings.get_string('widget-size') || 'large';
        const subSize = this._settings.get_string('subtitle-size') || 'medium';
        const showBadge = this._settings.get_boolean('show-badge');
        const accentHex = this._settings.get_string('accent-color') || '#4cd964';

        this._badge.visible = showBadge;

        // Dynamiczny kolor akcentu
        this._numberLabel.style = `color: ${accentHex}; text-shadow: 0 2px 14px ${this._hexToRgba(accentHex, 0.45)};`;
        this._badge.style = `color: ${accentHex}; background-color: ${this._hexToRgba(accentHex, 0.20)};`;

        const themeClasses = ['spring-theme-glass', 'spring-theme-solid-dark', 'spring-theme-emerald', 'spring-theme-minimal'];
        const sizeClasses = ['spring-size-normal', 'spring-size-large', 'spring-size-huge'];
        const subSizeClasses = ['spring-subsize-small', 'spring-subsize-medium', 'spring-subsize-large', 'spring-subsize-huge'];

        themeClasses.forEach(cls => this.remove_style_class_name(cls));
        sizeClasses.forEach(cls => this.remove_style_class_name(cls));
        subSizeClasses.forEach(cls => this.remove_style_class_name(cls));

        this.add_style_class_name(`spring-theme-${theme}`);
        this.add_style_class_name(`spring-size-${size}`);
        this.add_style_class_name(`spring-subsize-${subSize}`);
    }

    _hexToRgba(hex, alpha = 1) {
        let cleanHex = hex.replace('#', '').trim();
        if (cleanHex.length === 3) {
            cleanHex = cleanHex.split('').map(c => c + c).join('');
        }
        if (cleanHex.length !== 6) {
            return `rgba(76, 217, 100, ${alpha})`;
        }
        const r = parseInt(cleanHex.substring(0, 2), 16);
        const g = parseInt(cleanHex.substring(2, 4), 16);
        const b = parseInt(cleanHex.substring(4, 6), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }

    _setupDragAndDrop() {
        this._dragStartX = 0;
        this._dragStartY = 0;
        this._widgetStartX = 0;
        this._widgetStartY = 0;

        this.connect('button-press-event', (actor, event) => {
            if (event.get_button() === 3) {
                this._extension.openPreferences();
                return Clutter.EVENT_STOP;
            }

            if (event.get_button() === 1) {
                if (this._settings.get_boolean('lock-widget-position')) {
                    return Clutter.EVENT_PROPAGATE;
                }

                this._isDragging = true;
                const [stageX, stageY] = event.get_coords();
                this._dragStartX = stageX;
                this._dragStartY = stageY;

                const [wx, wy] = this.get_position();
                this._widgetStartX = wx;
                this._widgetStartY = wy;

                this.add_style_class_name('spring-desktop-widget-dragging');
                return Clutter.EVENT_STOP;
            }
            return Clutter.EVENT_PROPAGATE;
        });

        this.connect('motion-event', (actor, event) => {
            if (!this._isDragging) {
                return Clutter.EVENT_PROPAGATE;
            }

            const [stageX, stageY] = event.get_coords();
            const dx = stageX - this._dragStartX;
            const dy = stageY - this._dragStartY;

            const newX = Math.max(0, Math.min(global.stage.width - 250, this._widgetStartX + dx));
            const newY = Math.max(30, Math.min(global.stage.height - 120, this._widgetStartY + dy));

            this.set_position(newX, newY);
            return Clutter.EVENT_STOP;
        });

        this.connect('button-release-event', (actor, event) => {
            if (this._isDragging) {
                this._isDragging = false;
                this.remove_style_class_name('spring-desktop-widget-dragging');

                const [finalX, finalY] = this.get_position();
                this._settings.set_double('position-x', finalX);
                this._settings.set_double('position-y', finalY);

                // Zapisujemy pozycję względną w stosunku do aktualnego monitora
                const monitor = this._extension.getTargetMonitor();
                if (monitor && monitor.width > 0 && monitor.height > 0) {
                    const relX = Math.max(0, Math.min(0.9, (finalX - monitor.x) / monitor.width));
                    const relY = Math.max(0, Math.min(0.9, (finalY - monitor.y) / monitor.height));
                    this._settings.set_double('relative-x', relX);
                    this._settings.set_double('relative-y', relY);
                }

                return Clutter.EVENT_STOP;
            }
            return Clutter.EVENT_PROPAGATE;
        });
    }

    _getCalculatedCoordinates() {
        const monitor = this._extension.getTargetMonitor();
        if (!monitor) {
            return [this._settings.get_double('position-x'), this._settings.get_double('position-y')];
        }

        const relX = this._settings.get_double('relative-x');
        const relY = this._settings.get_double('relative-y');

        const x = monitor.x + (relX * monitor.width);
        const y = monitor.y + (relY * monitor.height);
        return [x, y];
    }

    vfunc_allocate(box) {
        if (!this._isDragging) {
            const [posX, posY] = this._getCalculatedCoordinates();
            box.set_origin(posX, posY);
        }
        super.vfunc_allocate(box);
    }

    updateData(data) {
        this._badge.set_text(data.badgeText || (data.isCountdown ? 'SPRING COUNTDOWN' : 'SEASON'));
        this._numberLabel.set_text(data.number);
        this._unitLabel.set_text(data.unitText);
        this._subtitle.set_text(data.subtitle);
    }
});

export default class SpringCountdownExtension extends Extension {
    enable() {
        this._settings = this.getSettings();

        this._desktopWidget = null;
        this._topbarIndicator = null;
        this._periodicTimerId = null;

        // Monitoruj zmiany w ustawieniach
        this._settingsSignals = [
            this._settings.connect('changed::show-desktop-widget', () => this._syncDesktopWidget()),
            this._settings.connect('changed::show-topbar-indicator', () => this._syncTopbarIndicator()),
            this._settings.connect('changed::countdown-unit', () => this._updateAllDisplays()),
            this._settings.connect('changed::seasonal-behavior', () => this._updateAllDisplays()),
            this._settings.connect('changed::language', () => this._updateAllDisplays()),
            this._settings.connect('changed::subtitle-preset', () => this._updateAllDisplays()),
            this._settings.connect('changed::accent-color', () => this._syncThemeAndStyle()),
            this._settings.connect('changed::widget-theme', () => this._syncThemeAndStyle()),
            this._settings.connect('changed::widget-size', () => this._syncThemeAndStyle()),
            this._settings.connect('changed::subtitle-size', () => this._syncThemeAndStyle()),
            this._settings.connect('changed::show-badge', () => this._syncThemeAndStyle()),
            this._settings.connect('changed::monitor-target', () => this._relayoutWidget()),
            this._settings.connect('changed::relative-x', () => this._relayoutWidget()),
            this._settings.connect('changed::relative-y', () => this._relayoutWidget()),
        ];

        // Monitoruj podłączanie i odłączanie monitorów (hotplug)
        this._monitorsChangedId = Main.layoutManager.connect('monitors-changed', () => {
            this._relayoutWidget();
        });

        // Inicjalizacja widżetu pulpitu i wskaźnika panelu
        this._syncDesktopWidget();
        this._syncTopbarIndicator();

        // Okresowe odświeżanie
        this._periodicTimerId = GLib.timeout_add_seconds(GLib.PRIORITY_DEFAULT, 3600, () => {
            this._updateAllDisplays();
            return GLib.SOURCE_CONTINUE;
        });
    }

    disable() {
        if (this._periodicTimerId) {
            GLib.source_remove(this._periodicTimerId);
            this._periodicTimerId = null;
        }

        if (this._monitorsChangedId) {
            Main.layoutManager.disconnect(this._monitorsChangedId);
            this._monitorsChangedId = null;
        }

        if (this._settingsSignals && this._settings) {
            for (const sigId of this._settingsSignals) {
                this._settings.disconnect(sigId);
            }
            this._settingsSignals = [];
        }

        this._destroyDesktopWidget();
        this._destroyTopbarIndicator();

        this._settings = null;
    }

    /**
     * Zwraca obiekt wybranego monitora (domyślnie Primary Display).
     */
    getTargetMonitor() {
        const target = this._settings.get_string('monitor-target');
        const monitors = Main.layoutManager.monitors || [];

        if (target === 'primary' || target === '') {
            return Main.layoutManager.primaryMonitor || monitors[0] || null;
        }

        const idx = parseInt(target, 10);
        if (!isNaN(idx) && monitors[idx]) {
            return monitors[idx];
        }

        return Main.layoutManager.primaryMonitor || monitors[0] || null;
    }

    _getData() {
        const unit = this._settings.get_string('countdown-unit');
        const behavior = this._settings.get_string('seasonal-behavior');
        const lang = this._settings.get_string('language');
        const preset = this._settings.get_string('subtitle-preset');
        return SpringCountdownCalculator.calculate(new Date(), unit, behavior, lang, preset);
    }

    _updateAllDisplays() {
        const data = this._getData();
        if (this._desktopWidget) {
            this._desktopWidget.updateData(data);
        }
        if (this._topbarIndicator && this._topbarLabel) {
            this._topbarLabel.set_text(data.shortText);
        }
        if (this._topbarHeaderItem) {
            this._topbarHeaderItem.label.set_text(data.title);
        }
    }

    _syncThemeAndStyle() {
        if (this._desktopWidget) {
            this._desktopWidget.applyStyleAndTheme();
            this._desktopWidget.queue_relayout();
        }
    }

    _relayoutWidget() {
        if (this._desktopWidget) {
            const [x, y] = this._desktopWidget._getCalculatedCoordinates();
            this._desktopWidget.set_position(x, y);
            this._desktopWidget.queue_relayout();
        }
    }

    /* ----------------------------------------------------
     * DESKTOP WIDGET LOGIC
     * ---------------------------------------------------- */
    _syncDesktopWidget() {
        const show = this._settings.get_boolean('show-desktop-widget');
        if (show && !this._desktopWidget) {
            this._createDesktopWidget();
        } else if (!show && this._desktopWidget) {
            this._destroyDesktopWidget();
        }
    }

    _createDesktopWidget() {
        this._desktopWidget = new SpringDesktopWidget(this, this._settings);

        const [x, y] = this._desktopWidget._getCalculatedCoordinates();
        this._desktopWidget.set_position(x, y);

        const bgGroup = Main.layoutManager._backgroundGroup || Main.layoutManager.backgroundGroup;
        if (bgGroup) {
            bgGroup.add_child(this._desktopWidget);
        } else {
            Main.layoutManager.uiGroup.add_child(this._desktopWidget);
        }

        this._desktopWidget.updateData(this._getData());
    }

    _destroyDesktopWidget() {
        if (this._desktopWidget) {
            const parent = this._desktopWidget.get_parent();
            if (parent) {
                parent.remove_child(this._desktopWidget);
            }
            this._desktopWidget.destroy();
            this._desktopWidget = null;
        }
    }

    /* ----------------------------------------------------
     * TOPBAR INDICATOR LOGIC
     * ---------------------------------------------------- */
    _syncTopbarIndicator() {
        const show = this._settings.get_boolean('show-topbar-indicator');
        if (show && !this._topbarIndicator) {
            this._createTopbarIndicator();
        } else if (!show && this._topbarIndicator) {
            this._destroyTopbarIndicator();
        }
    }

    _createTopbarIndicator() {
        const data = this._getData();

        this._topbarIndicator = new PanelMenu.Button(0.0, this.metadata.name, false);
        this._topbarIndicator.add_style_class_name('spring-topbar-button');

        this._topbarLabel = new St.Label({
            style_class: 'spring-topbar-label',
            text: data.shortText,
            y_align: Clutter.ActorAlign.CENTER,
        });

        this._topbarIndicator.add_child(this._topbarLabel);

        // Menu rozwijane w panelu
        this._topbarHeaderItem = new PopupMenu.PopupMenuItem(data.title, { reactive: false });
        this._topbarIndicator.menu.addMenuItem(this._topbarHeaderItem);

        this._topbarIndicator.menu.addMenuItem(new PopupMenu.PopupSeparatorMenuItem());

        this._topbarIndicator.menu.addAction('Extension Settings', () => {
            this.openPreferences();
        });

        Main.panel.addToStatusArea('spring-countdown-indicator', this._topbarIndicator);
    }

    _destroyTopbarIndicator() {
        if (this._topbarIndicator) {
            this._topbarIndicator.destroy();
            this._topbarIndicator = null;
            this._topbarLabel = null;
            this._topbarHeaderItem = null;
        }
    }
}

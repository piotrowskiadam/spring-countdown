/**
 * Tłumaczenia i teksty w różnych językach oraz presety podpisów.
 */

export const I18N = {
    pl: {
        badgeCountdown: 'ODLICZANIE DO WIOSNY',
        badgeSeason: 'PORA ROKU',
        springActive: 'Trwa wiosna! 🌸',
        springSub: 'Ciesz się słońcem i zielenią',
        summerActive: 'Trwa lato! ☀️',
        summerSub: 'Ciepłe dni i wakacyjny klimat',
        shortSpring: '🌸 Trwa wiosna',
        shortSummer: '☀️ Trwa lato',
        daysPlural: (n) => formatPolishPlural(n, 'dzień', 'dni', 'dni'),
        weeksPlural: (n) => formatPolishPlural(n, 'tydzień', 'tygodnie', 'tygodni'),
        mondaysPlural: (n) => formatPolishPlural(n, 'poniedziałek', 'poniedziałki', 'poniedziałków'),
        subtitles: {
            'default': {
                days: 'Dni do 21 marca',
                weeks: 'Tyle tygodni dzieli nas od wiosny',
                mondays: 'Jeszcze tylko tyle poniedziałków do wiosny!',
            },
            'simple': {
                days: 'do 21 marca',
                weeks: 'do wiosny',
                mondays: 'poniedziałków do wiosny',
            },
            'grey-endure': {
                days: 'dni do wytrzymania w tej szarości',
                weeks: 'tygodni do przetrwania w szarości',
                mondays: 'poniedziałków do przetrwania w szarości',
            },
            'depression': {
                days: 'dni w jesienno-zimowej melancholii',
                weeks: 'tygodni w jesienno-zimowej depresji',
                mondays: 'poniedziałków w jesienno-zimowej depresji',
            },
            'nature': {
                days: 'dni do pierwszych przebiśniegów i pąków',
                weeks: 'tygodni do powrotu ptaków i zieleni',
                mondays: 'poniedziałków do ciepłych poranków',
            },
        },
    },
    en: {
        badgeCountdown: 'SPRING COUNTDOWN',
        badgeSeason: 'CURRENT SEASON',
        springActive: 'Spring is here! 🌸',
        springSub: 'Enjoy the warmth and blooming flowers',
        summerActive: 'Summer is here! ☀️',
        summerSub: 'Sunny days and summer vibes',
        shortSpring: '🌸 Spring is here',
        shortSummer: '☀️ Summer is here',
        daysPlural: (n) => n === 1 ? 'day' : 'days',
        weeksPlural: (n) => n === 1 ? 'week' : 'weeks',
        mondaysPlural: (n) => n === 1 ? 'Monday' : 'Mondays',
        subtitles: {
            'default': {
                days: 'Days left until March 21st',
                weeks: 'Weeks separating us from spring',
                mondays: 'Just that many Mondays until spring!',
            },
            'simple': {
                days: 'until spring',
                weeks: 'until spring',
                mondays: 'Mondays until spring',
            },
            'grey-endure': {
                days: 'days to endure the gloomy weather',
                weeks: 'weeks to survive the gloom',
                mondays: 'Mondays to survive in the gloom',
            },
            'depression': {
                days: 'days of autumn-winter blues left',
                weeks: 'weeks of seasonal depression left',
                mondays: 'cold Mondays of seasonal blues',
            },
            'nature': {
                days: 'days until the first flowers bloom',
                weeks: 'weeks until green leaves return',
                mondays: 'Mondays until sunny mornings',
            },
        },
    },
    de: {
        badgeCountdown: 'FRÜHLINGS-COUNTDOWN',
        badgeSeason: 'JAHRESZEIT',
        springActive: 'Es ist Frühling! 🌸',
        springSub: 'Genieße die Sonne und das Grün',
        summerActive: 'Es ist Sommer! ☀️',
        summerSub: 'Warme Tage und Sommerlaune',
        shortSpring: '🌸 Frühling',
        shortSummer: '☀️ Sommer',
        daysPlural: (n) => n === 1 ? 'Tag' : 'Tage',
        weeksPlural: (n) => n === 1 ? 'Woche' : 'Wochen',
        mondaysPlural: (n) => n === 1 ? 'Montag' : 'Montage',
        subtitles: {
            'default': {
                days: 'Tage bis zum 21. März',
                weeks: 'Wochen trennen uns vom Frühling',
                mondays: 'Nur noch so viele Montage bis zum Frühling!',
            },
            'simple': {
                days: 'bis zum Frühling',
                weeks: 'bis zum Frühling',
                mondays: 'Montage bis zum Frühling',
            },
            'grey-endure': {
                days: 'Tage im grauen Wetter durchhalten',
                weeks: 'Wochen im trüben Grau überstehen',
                mondays: 'Montage im trüben Grau überstehen',
            },
            'depression': {
                days: 'Tage Herbst-Winter-Melancholie',
                weeks: 'Wochen im Winterblues',
                mondays: 'Montage im Winterblues',
            },
            'nature': {
                days: 'Tage bis zur ersten Blütenpracht',
                weeks: 'Wochen bis alles wieder grün wird',
                mondays: 'Montage bis zu warmen Tagen',
            },
        },
    },
    es: {
        badgeCountdown: 'CUENTA ATRÁS PARA LA PRIMAVERA',
        badgeSeason: 'ESTACIÓN ACTUAL',
        springActive: '¡Ya es primavera! 🌸',
        springSub: 'Disfruta del sol y las flores',
        summerActive: '¡Ya es verano! ☀️',
        summerSub: 'Días cálidos y vacaciones',
        shortSpring: '🌸 Es primavera',
        shortSummer: '☀️ Es verano',
        daysPlural: (n) => n === 1 ? 'día' : 'días',
        weeksPlural: (n) => n === 1 ? 'semana' : 'semanas',
        mondaysPlural: (n) => n === 1 ? 'lunes' : 'lunes',
        subtitles: {
            'default': {
                days: 'Días hasta el 21 de marzo',
                weeks: 'Semanas que nos separan de la primavera',
                mondays: '¡Solo estos lunes hasta la primavera!',
            },
            'simple': {
                days: 'para la primavera',
                weeks: 'para la primavera',
                mondays: 'lunes para la primavera',
            },
            'grey-endure': {
                days: 'días para aguantar la grisura',
                weeks: 'semanas para superar el frío gris',
                mondays: 'lunes para sobrevivir al frío gris',
            },
            'depression': {
                days: 'días de bajón otoñal e invernal',
                weeks: 'semanas de melancolía invernal',
                mondays: 'lunes de melancolía invernal',
            },
            'nature': {
                days: 'días para ver las primeras flores',
                weeks: 'semanas para que vuelva el verde',
                mondays: 'lunes para mañanas soleadas',
            },
        },
    },
};

function formatPolishPlural(n, one, few, many) {
    if (n === 1) return one;
    const mod10 = n % 10;
    const mod100 = n % 100;
    if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) {
        return few;
    }
    return many;
}

export class SpringCountdownCalculator {
    /**
     * @param {Date} now
     * @param {string} unit 'days' | 'weeks' | 'mondays'
     * @param {string} behavior 'seasons' | 'always-countdown'
     * @param {string} langCode 'system' | 'pl' | 'en' | 'de' | 'es'
     * @param {string} subtitlePreset 'default' | 'simple' | 'grey-endure' | 'depression' | 'nature'
     */
    static calculate(now = new Date(), unit = 'mondays', behavior = 'seasons', langCode = 'system', subtitlePreset = 'default') {
        const lang = this._resolveLanguage(langCode);
        const t = I18N[lang] || I18N.pl;

        const year = now.getFullYear();
        const springStart = new Date(year, 2, 21, 0, 0, 0, 0);
        const summerStart = new Date(year, 5, 22, 0, 0, 0, 0);
        const autumnStart = new Date(year, 8, 23, 0, 0, 0, 0);

        if (behavior === 'seasons') {
            if (now >= springStart && now < summerStart) {
                return {
                    isCountdown: false,
                    season: 'spring',
                    badgeText: t.badgeSeason,
                    number: '🌸',
                    unitText: lang === 'pl' ? 'Wiosna' : (lang === 'de' ? 'Frühling' : (lang === 'es' ? 'Primavera' : 'Spring')),
                    title: t.springActive,
                    subtitle: t.springSub,
                    shortText: t.shortSpring,
                };
            } else if (now >= summerStart && now < autumnStart) {
                return {
                    isCountdown: false,
                    season: 'summer',
                    badgeText: t.badgeSeason,
                    number: '☀️',
                    unitText: lang === 'pl' ? 'Lato' : (lang === 'de' ? 'Sommer' : (lang === 'es' ? 'Verano' : 'Summer')),
                    title: t.summerActive,
                    subtitle: t.summerSub,
                    shortText: t.shortSummer,
                };
            }
        }

        let targetSpring = springStart;
        if (now >= springStart) {
            targetSpring = new Date(year + 1, 2, 21, 0, 0, 0, 0);
        }

        const diffMs = targetSpring.getTime() - now.getTime();
        const diffDays = Math.max(0, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));

        let count = 0;
        let countUnitLabel = '';

        if (unit === 'mondays') {
            count = this._countMondaysBetween(now, targetSpring);
            countUnitLabel = t.mondaysPlural(count);
        } else if (unit === 'weeks') {
            count = Math.max(0, Math.ceil(diffDays / 7));
            countUnitLabel = t.weeksPlural(count);
        } else {
            count = diffDays;
            countUnitLabel = t.daysPlural(count);
        }

        const presetDict = t.subtitles[subtitlePreset] || t.subtitles['default'];
        const subtitle = presetDict[unit] || presetDict['default'] || '';

        return {
            isCountdown: true,
            badgeText: t.badgeCountdown,
            count,
            countUnitLabel,
            number: `${count}`,
            unitText: countUnitLabel,
            title: `${count} ${countUnitLabel}`,
            subtitle,
            shortText: `🌱 ${count} ${countUnitLabel}`,
            targetDate: targetSpring,
        };
    }

    static _resolveLanguage(code) {
        if (code && code !== 'system' && I18N[code]) {
            return code;
        }
        // Pobierz język ze zmiennych środowiskowych / Intl
        if (typeof Intl !== 'undefined' && Intl.DateTimeFormat) {
            const loc = new Intl.DateTimeFormat().resolvedOptions().locale.toLowerCase();
            if (loc.startsWith('pl')) return 'pl';
            if (loc.startsWith('de')) return 'de';
            if (loc.startsWith('es')) return 'es';
            if (loc.startsWith('en')) return 'en';
        }
        return 'pl';
    }

    static _countMondaysBetween(startDate, endDate) {
        let mondays = 0;
        let cur = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());

        while (cur < endDate) {
            cur.setDate(cur.getDate() + 1);
            if (cur.getDay() === 1 && cur <= endDate) {
                mondays++;
            }
        }
        return mondays;
    }
}

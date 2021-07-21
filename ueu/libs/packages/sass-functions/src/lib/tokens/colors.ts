const primaryColor = {
    base: 'var(--apollo-primary, #238662)',
    contrast: 'var(--apollo-on-primary, #FFF)',
    50: {
        base: 'var(--apollo-primary-50, #E1FAF0)',
        contrast: 'var(--apollo-on-primary-50, #333333)',
    },
    100: {
        base: 'var(--apollo-primary-100, #BDEBDF)',
        contrast: 'var(--apollo-on-primary-100, #333333)',
    },
    200: {
        base: 'var(--apollo-primary-200, #9ADBC2)',
        contrast: 'var(--apollo-on-primary-200, #333333)',
    },
    300: {
        base: 'var(--apollo-primary-300, #58D289)',
        contrast: 'var(--apollo-on-primary-300, #333333)',
    },
    400: {
        base: 'var(--apollo-primary-400, #00BC54)',
        contrast: 'var(--apollo-on-primary-400, #333333)',
    },
    500: {
        base: 'var(--apollo-primary-500, #238662)',
        contrast: 'var(--apollo-on-primary-500, #FFF)',
    },
    600: {
        base: 'var(--apollo-primary-600, #00984B)',
        contrast: 'var(--apollo-on-primary-600, #333333)',
    },
    700: {
        base: 'var(--apollo-primary-700, #008441)',
        contrast: 'var(--apollo-on-primary-700, #333333)',
    },
    800: {
        base: 'var(--apollo-primary-800, #13563E)',
        contrast: 'var(--apollo-on-primary-800, #FFF)',
    },
    900: {
        base: 'var(--apollo-primary-900, #05271B)',
        contrast: 'var(--apollo-on-primary-900, #FFF)',
    },
    light: {
        base: 'var(--apollo-primary-light, #9ADBC2)',
        contrast: 'var(--apollo-on-primary-light, #333333)',
        50: {
            base: '#E1FAF0',
            contrast: '#333333',
        },
        100: {
            base: '#BDEBDF',
            contrast: '#333333',
        },
        200: {
            base: '#9ADBC2',
            contrast: '#333333',
        },
        300: {
            base: '#58D289',
            contrast: '#333333',
        },
        400: {
            base: '#00BC54',
            contrast: '#333333',
        },
        500: {
            base: '#238662',
            contrast: '#FFF',
        },
        600: {
            base: '#00984B',
            contrast: '#FFF',
        },
        700: {
            base: '#008441',
            contrast: '#FFF',
        },
        800: {
            base: '#13563E',
            contrast: '#FFF',
        },
        900: {
            base: '#05271B',
            contrast: '#FFF',
        },
    },
    dark: {
        base: 'var(--apollo-primary-dark, #13563E)',
        contrast: 'var(--apollo-on-primary-dark, #FFF)',
        50: {
            base: '#05271B',
            contrast: '#333333',
        },
        100: {
            base: '#13563E',
            contrast: '#333333',
        },
        200: {
            base: '#13563E',
            contrast: '#333333',
        },
        300: {
            base: '#13563E',
            contrast: '#333333',
        },
        400: {
            base: '#13563E',
            contrast: '#333333',
        },
        500: {
            base: '#238662',
            contrast: '#FFF',
        },
        600: {
            base: '#238662',
            contrast: '#FFF',
        },
        700: {
            base: '#238662',
            contrast: '#FFF',
        },
        800: {
            base: '#9ADBC2',
            contrast: '#FFF',
        },
        900: {
            base: '#E1FAF0',
            contrast: '#FFF',
        },
    },
};

const secondaryColor = {
    base: 'var(--apollo-secondary, #11C76F)',
    contrast: 'var(--apollo-on-secondary, #333)',
    50: {
        base: 'var(--apollo-secondary-50, #E7F9F1)',
        contrast: 'var(--apollo-on-secondary-50, #333)',
    },
    200: {
        base: 'var(--apollo-secondary-200, #88E3B7)',
        contrast: 'var(--apollo-on-secondary-200, #333)',
    },
    500: {
        base: 'var(--apollo-secondary-500, #11C76F)',
        contrast: 'var(--apollo-on-secondary-500, #333)',
    },
    800: {
        base: 'var(--apollo-secondary-800, #116C40)',
        contrast: 'var(--apollo-on-secondary-800, #FFF)',
    },
    900: {
        base: 'var(--apollo-secondary-900, #123F29)',
        contrast: 'var(--apollo-on-secondary-900, #FFF)',
    },
    light: {
        base: 'var(--apollo-secondary-light, #88E3B7)',
        contrast: 'var(--apollo-on-secondary-light, #333333)',
        50: {
            base: '#E7F9F1',
            contrast: '#333',
        },
        200: {
            base: '#88E3B7',
            contrast: '#333',
        },
        500: {
            base: '#11C76F',
            contrast: '#333',
        },
        800: {
            base: '#116C40',
            contrast: '#FFF',
        },
        900: {
            base: '#123F29',
            contrast: '#FFF',
        },
    },
    dark: {
        base: 'var(--apollo-secondary-dark, #116C40)',
        contrast: 'var(--apollo-on-secondary-dark, #333333)',
        50: {
            base: '#123F29',
            contrast: '#333',
        },
        200: {
            base: '#116C40',
            contrast: '#333',
        },
        500: {
            base: '#11C76F',
            contrast: '#333',
        },
        800: {
            base: '#88E3B7',
            contrast: '#FFF',
        },
        900: {
            base: '#E7F9F1',
            contrast: '#FFF',
        },
    },
};

const criticalColor = {
    base: 'var(--apollo-critical, #E62320)',
    contrast: 'var(--apollo-on-critical, #FFF)',
    50: {
        base: 'var(--apollo-critical-50, #FFE9E9)',
        contrast: 'var(--apollo-on-critical-50, #333)',
    },
    100: {
        base: 'var(--apollo-critical-100, #FFE6EB)',
        contrast: 'var(--apollo-on-critical-100, #333)',
    },
    200: {
        base: 'var(--apollo-critical-200, #FFABAA)',
        contrast: 'var(--apollo-on-critical-200, #333)',
    },
    300: {
        base: 'var(--apollo-critical-300, #FF96AE)',
        contrast: 'var(--apollo-on-critical-300, #333)',
    },
    400: {
        base: 'var(--apollo-critical-400, #FF5075)',
        contrast: 'var(--apollo-on-critical-400, #333)',
    },
    500: {
        base: 'var(--apollo-critical-500, #E62320)',
        contrast: 'var(--apollo-on-critical-500, #FFF)',
    },
    600: {
        base: 'var(--apollo-critical-600, #E62320)',
        contrast: 'var(--apollo-on-critical-600, #FFF)',
    },
    700: {
        base: 'var(--apollo-critical-700, #E62320)',
        contrast: 'var(--apollo-on-critical-700, #FFF)',
    },
    800: {
        base: 'var(--apollo-critical-800, #941817)',
        contrast: 'var(--apollo-on-critical-800, #FFF)',
    },
    900: {
        base: 'var(--apollo-critical-900, #440D0C)',
        contrast: 'var(--apollo-on-critical-900, #FFF)',
    },
    light: {
        base: 'var(--apollo-critical-light, #FFABAA)',
        contrast: 'var(--apollo-on-critical-light, #333)',
        50: {
            base: '#FFE9E9',
            contrast: '#333',
        },
        100: {
            base: '#FFE9E9',
            contrast: '#333',
        },
        200: {
            base: '#FFABAA',
            contrast: '#333',
        },
        300: {
            base: '#FF96AE',
            contrast: '#333',
        },
        400: {
            base: '#FF5075',
            contrast: '#333',
        },
        500: {
            base: '#E62320',
            contrast: '#FFF',
        },
        600: {
            base: '#E62320',
            contrast: '#FFF',
        },
        700: {
            base: '#E62320',
            contrast: '#FFF',
        },
        800: {
            base: '#941817',
            contrast: '#FFF',
        },
        900: {
            base: '#440D0C',
            contrast: '#FFF',
        },
    },
    dark: {
        base: 'var(--apollo-critical-dark, #941817)',
        contrast: 'var(--apollo-on-critical-dark, #FFF)',
        50: {
            base: '#440D0C',
            contrast: '#333',
        },
        100: {
            base: '#941817',
            contrast: '#333',
        },
        200: {
            base: '#941817',
            contrast: '#333',
        },
        300: {
            base: '#941817',
            contrast: '#333',
        },
        400: {
            base: '#941817',
            contrast: '#333',
        },
        500: {
            base: '#E62320',
            contrast: '#FFF',
        },
        600: {
            base: '#E62320',
            contrast: '#FFF',
        },
        700: {
            base: '#E62320',
            contrast: '#FFF',
        },
        800: {
            base: '#FFABAA',
            contrast: '#333',
        },
        900: {
            base: '#FFE9E9',
            contrast: '#333',
        },
    },
};

const neutralColor = {
    base: 'var(--apollo-neutral, #486DE8)',
    contrast: 'var(--apollo-on-neutral, #FFF)',
    50: {
        base: 'var(--apollo-neutral-50, #EFF2FF)',
        contrast: 'var(--apollo-on-neutral-50, #333)',
    },
    100: {
        base: 'var(--apollo-neutral-100, #E0F4FC)',
        contrast: 'var(--apollo-on-neutral-100, #333)',
    },
    200: {
        base: 'var(--apollo-neutral-200, #B0C2FF)',
        contrast: 'var(--apollo-on-neutral-200, #333)',
    },
    300: {
        base: 'var(--apollo-neutral-300, #7BD1F4)',
        contrast: 'var(--apollo-on-neutral-300, #333)',
    },
    400: {
        base: 'var(--apollo-neutral-400, #00B0ED)',
        contrast: 'var(--apollo-on-neutral-400, #333)',
    },
    500: {
        base: 'var(--apollo-neutral-500, #486DE8)',
        contrast: 'var(--apollo-on-neutral-500, #FFF)',
    },
    600: {
        base: 'var(--apollo-neutral-600, #0097DC)',
        contrast: 'var(--apollo-on-neutral-600, #FFF)',
    },
    700: {
        base: 'var(--apollo-neutral-700, #0073B5)',
        contrast: 'var(--apollo-on-neutral-700, #FFF)',
    },
    800: {
        base: 'var(--apollo-neutral-800, #2A4195)',
        contrast: 'var(--apollo-on-neutral-800, #FFF)',
    },
    900: {
        base: 'var(--apollo-neutral-900, #0F1D46)',
        contrast: 'var(--apollo-on-neutral-900, #FFF)',
    },
    light: {
        base: 'var(--apollo-neutral-light, #B0C2FF)',
        contrast: 'var(--apollo-on-neutral-light, #333)',
        50: {
            base: '#EFF2FF',
            contrast: '#333',
        },
        100: {
            base: '#E0F4FC',
            contrast: '#333',
        },
        200: {
            base: '#B0C2FF',
            contrast: '#333',
        },
        300: {
            base: '#7BD1F4',
            contrast: '#333',
        },
        400: {
            base: '#00B0ED',
            contrast: '#333',
        },
        500: {
            base: '#486DE8',
            contrast: '#FFF',
        },
        600: {
            base: '#0097DC',
            contrast: '#FFF',
        },
        700: {
            base: '#0073B5',
            contrast: '#FFF',
        },
        800: {
            base: '#2A4195',
            contrast: '#FFF',
        },
        900: {
            base: '#0F1D46',
            contrast: '#FFF',
        },
    },
    dark: {
        base: 'var(--apollo-neutral-dark, #2A4195)',
        contrast: 'var(--apollo-on-neutral-dark, #FFF)',
        50: {
            base: '#0F1D46',
            contrast: '#FFF',
        },
        100: {
            base: '#2A4195',
            contrast: '#FFF',
        },
        200: {
            base: '#2A4195',
            contrast: '#FFF',
        },
        300: {
            base: '#2A4195',
            contrast: '#FFF',
        },
        400: {
            base: '#2A4195',
            contrast: '#FFF',
        },
        500: {
            base: '#486DE8',
            contrast: '#FFF',
        },
        600: {
            base: '#486DE8',
            contrast: '#FFF',
        },
        700: {
            base: '#486DE8',
            contrast: '#FFF',
        },
        800: {
            base: '#B0C2FF',
            contrast: '#333',
        },
        900: {
            base: '#EFF2FF',
            contrast: '#333',
        },
    },
};

const warningColor = {
    base: 'var(--apollo-warning, #F7B228)',
    contrast: 'var(--apollo-on-warning, #FFF)',
    50: {
        base: 'var(--apollo-warning-50, #FFF1D9)',
        contrast: 'var(--apollo-on-warning-50, #333)',
    },
    100: {
        base: 'var(--apollo-warning-100, #FDD88F)',
        contrast: 'var(--apollo-on-warning-100, #333)',
    },
    200: {
        base: 'var(--apollo-warning-200, #FDD88F)',
        contrast: 'var(--apollo-on-warning-200, #333)',
    },
    300: {
        base: 'var(--apollo-warning-300, #F7B228)',
        contrast: 'var(--apollo-on-warning-300, #FFF)',
    },
    400: {
        base: 'var(--apollo-warning-400, #F7B228)',
        contrast: 'var(--apollo-on-warning-400, #FFF)',
    },
    500: {
        base: 'var(--apollo-warning-500, #F7B228)',
        contrast: 'var(--apollo-on-warning-500, #FFF)',
    },
    600: {
        base: 'var(--apollo-warning-600, #CE7A03)',
        contrast: 'var(--apollo-on-warning-600, #FFF)',
    },
    700: {
        base: 'var(--apollo-warning-700, #CE7A03)',
        contrast: 'var(--apollo-on-warning-700, #FFF)',
    },
    800: {
        base: 'var(--apollo-warning-800, #CE7A03)',
        contrast: 'var(--apollo-on-warning-800, #FFF)',
    },
    900: {
        base: 'var(--apollo-warning-900, #3D1F04)',
        contrast: 'var(--apollo-on-warning-900, #FFF)',
    },
    light: {
        base: 'var(--apollo-warning-light, #FDD88F)',
        contrast: 'var(--apollo-on-warning-light, #333)',
        50: {
            base: '#FFF1D9',
            contrast: '#333',
        },
        100: {
            base: '#FDD88F',
            contrast: '#333',
        },
        200: {
            base: '#FDD88F',
            contrast: '#333',
        },
        300: {
            base: '#F7B228',
            contrast: '#333',
        },
        400: {
            base: '#F7B228',
            contrast: '#333',
        },
        500: {
            base: '#F7B228',
            contrast: '#FFF',
        },
        600: {
            base: '#CE7A03',
            contrast: '#FFF',
        },
        700: {
            base: '#CE7A03',
            contrast: '#FFF',
        },
        800: {
            base: '#CE7A03',
            contrast: '#FFF',
        },
        900: {
            base: '#3D1F04',
            contrast: '#FFF',
        },
    },
    dark: {
        base: 'var(--apollo-warning-dark, #CE7A03)',
        contrast: 'var(--apollo-on-warning-dark, #FFF)',
        50: {
            base: '#3D1F04',
            contrast: '#FFF',
        },
        100: {
            base: '#CE7A03',
            contrast: '#FFF',
        },
        200: {
            base: '#CE7A03',
            contrast: '#FFF',
        },
        300: {
            base: '#CE7A03',
            contrast: '#FFF',
        },
        400: {
            base: '#CE7A03',
            contrast: '#FFF',
        },
        500: {
            base: '#F7B228',
            contrast: '#333',
        },
        600: {
            base: '#F7B228',
            contrast: '#333',
        },
        700: {
            base: '#F7B228',
            contrast: '#333',
        },
        800: {
            base: '#FDD88F',
            contrast: '#333',
        },
        900: {
            base: '#FFF1D9',
            contrast: '#333',
        },
    },
};

const successColor = {
    base: 'var(--apollo-success, #238662)',
    contrast: 'var(--apollo-on-success, #FFF)',
    50: {
        base: 'var(--apollo-success-50, #D6F1E8)',
        contrast: 'var(--apollo-on-success-50, #333)',
    },
    100: {
        base: 'var(--apollo-success-100, #E3F7EA)',
        contrast: 'var(--apollo-on-success-100, #333)',
    },
    200: {
        base: 'var(--apollo-success-200, #9DDDC8)',
        contrast: 'var(--apollo-on-success-200, #333)',
    },
    300: {
        base: 'var(--apollo-success-300, #11C76F)',
        contrast: 'var(--apollo-on-success-300, #333)',
    },
    400: {
        base: 'var(--apollo-success-400, #00BC54)',
        contrast: 'var(--apollo-on-success-400, #333)',
    },
    500: {
        base: 'var(--apollo-success-500, #238662)',
        contrast: 'var(--apollo-on-success-500, #FFF)',
    },
    600: {
        base: 'var(--apollo-success-600, #238662)',
        contrast: 'var(--apollo-on-success-600, #FFF)',
    },
    700: {
        base: 'var(--apollo-success-700, #00984B)',
        contrast: 'var(--apollo-on-success-700, #FFF)',
    },
    800: {
        base: 'var(--apollo-success-800, #194839)',
        contrast: 'var(--apollo-on-success-800, #FFF)',
    },
    900: {
        base: 'var(--apollo-success-900, #113127)',
        contrast: 'var(--apollo-on-success-900, #FFF)',
    },
    light: {
        base: 'var(--apollo-success-light, #9DDDC8)',
        contrast: 'var(--apollo-on-success-light, #333)',
        50: {
            base: '#D6F1E8',
            contrast: '#333',
        },
        100: {
            base: '#E3F7EA',
            contrast: '#333',
        },
        200: {
            base: '#9DDDC8',
            contrast: '#333',
        },
        300: {
            base: '#11C76F',
            contrast: '#333',
        },
        400: {
            base: '#00BC54',
            contrast: '#333',
        },
        500: {
            base: '#238662',
            contrast: '#FFF',
        },
        600: {
            base: '#238662',
            contrast: '#FFF',
        },
        700: {
            base: '#00984B',
            contrast: '#FFF',
        },
        800: {
            base: '#194839',
            contrast: '#FFF',
        },
        900: {
            base: '#113127',
            contrast: '#FFF',
        },
    },
    dark: {
        base: 'var(--apollo-success-dark, #194839)',
        contrast: 'var(--apollo-on-success-dark, #FFF)',
        50: {
            base: '#113127',
            contrast: '#FFF',
        },
        100: {
            base: '#E3F7EA',
            contrast: '#333',
        },
        200: {
            base: '#9DDDC8',
            contrast: '#333',
        },
        300: {
            base: '#11C76F',
            contrast: '#333',
        },
        400: {
            base: '#00BC54',
            contrast: '#333',
        },
        500: {
            base: '#238662',
            contrast: '#FFF',
        },
        600: {
            base: '#238662',
            contrast: '#FFF',
        },
        700: {
            base: '#00984B',
            contrast: '#FFF',
        },
        800: {
            base: '#9DDDC8',
            contrast: '#333',
        },
        900: {
            base: '#D6F1E8',
            contrast: '#333',
        },
    },
};

const grayscaleColor = {
    base: 'var(--apollo-grayscale, #898989)',
    contrast: 'var(--apollo-on-grayscale, #FFF)',
    50: {
        base: 'var(--apollo-grayscale-50, #F5F5F5)',
        contrast: 'var(--apollo-on-grayscale-50, #333)',
    },
    100: {
        base: 'var(--apollo-grayscale-100, #E5E5E5)',
        contrast: 'var(--apollo-on-grayscale-100, #333)',
    },
    200: {
        base: 'var(--apollo-grayscale-200, #EBEBEB)',
        contrast: 'var(--apollo-on-grayscale-200, #333)',
    },
    300: {
        base: 'var(--apollo-grayscale-300, #CCCCCC)',
        contrast: 'var(--apollo-on-grayscale-300, #333)',
    },
    400: {
        base: 'var(--apollo-grayscale-400, #AAB0B2)',
        contrast: 'var(--apollo-on-grayscale-400, #FFF)',
    },
    500: {
        base: 'var(--apollo-grayscale-500, #898989)',
        contrast: 'var(--apollo-on-grayscale-500, #FFF)',
    },
    600: {
        base: 'var(--apollo-grayscale-600, #6C7980)',
        contrast: 'var(--apollo-on-grayscale-600, #FFF)',
    },
    700: {
        base: 'var(--apollo-grayscale-700, #525F66)',
        contrast: 'var(--apollo-on-grayscale-700, #FFF)',
    },
    800: {
        base: 'var(--apollo-grayscale-800, #717171)',
        contrast: 'var(--apollo-on-grayscale-800, #FFF)',
    },
    900: {
        base: 'var(--apollo-grayscale-900, #333333)',
        contrast: 'var(--apollo-on-grayscale-900, #FFF)',
    },
    light: {
        base: 'var(--apollo-grayscale-light, #EBEBEB)',
        contrast: 'var(--apollo-on-grayscale-light, #333)',
        50: {
            base: '#F5F5F5',
            contrast: '#333',
        },
        100: {
            base: '#E5E5E5',
            contrast: '#333',
        },
        200: {
            base: '#EBEBEB',
            contrast: '#333',
        },
        300: {
            base: '#CCCCCC',
            contrast: '#333',
        },
        400: {
            base: '#AAB0B2',
            contrast: '#333',
        },
        500: {
            base: '#898989',
            contrast: '#FFF',
        },
        600: {
            base: '#6C7980',
            contrast: '#FFF',
        },
        700: {
            base: '#525F66',
            contrast: '#FFF',
        },
        800: {
            base: '#717171',
            contrast: '#FFF',
        },
        900: {
            base: '#333333',
            contrast: '#FFF',
        },
    },
    dark: {
        base: 'var(--apollo-grayscale-dark, #717171)',
        contrast: 'var(--apollo-on-grayscale-dark, #FFF)',
        50: {
            base: '#333333',
            contrast: '#FFF',
        },
        100: {
            base: '#717171',
            contrast: '#FFF',
        },
        200: {
            base: '#717171',
            contrast: '#FFF',
        },
        300: {
            base: '#717171',
            contrast: '#FFF',
        },
        400: {
            base: '#717171',
            contrast: '#FFF',
        },
        500: {
            base: '#898989',
            contrast: '#FFF',
        },
        600: {
            base: '#898989',
            contrast: '#FFF',
        },
        700: {
            base: '#898989',
            contrast: '#FFF',
        },
        800: {
            base: '#EBEBEB',
            contrast: '#333',
        },
        900: {
            base: '#F5F5F5',
            contrast: '#333',
        },
    },
};

const randomColor = {
    base: 'var(--apollo-random, #77B6A8)',
    contrast: 'var(--apollo-on-random, #333)',
    1: {
        base: 'var(--apollo-random-1, #77B6A8)',
        contrast: 'var(--apollo-on-random-1, #333)',
    },
    2: {
        base: 'var(--apollo-random-2, #F37422)',
        contrast: 'var(--apollo-on-random-2, #333)',
    },
    3: {
        base: 'var(--apollo-random-3, #FF5075)',
        contrast: 'var(--apollo-on-random-3, #333)',
    },
    4: {
        base: 'var(--apollo-random-4, #00B0ED)',
        contrast: 'var(--apollo-on-random-4, #333)',
    },
    5: {
        base: 'var(--apollo-random-5, #8952CF)',
        contrast: 'var(--apollo-on-random-5, #FFF)',
    },
    6: {
        base: 'var(--apollo-random-6, #9E7365)',
        contrast: 'var(--apollo-on-random-6, #FFF)',
    },
    7: {
        base: 'var(--apollo-random-7, #42CA78)',
        contrast: 'var(--apollo-on-random-7, #333)',
    },
    8: {
        base: 'var(--apollo-random-8, #DC4EF3)',
        contrast: 'var(--apollo-on-random-8, #333)',
    },
    9: {
        base: 'var(--apollo-random-9, #3B65D0)',
        contrast: 'var(--apollo-on-random-9, #FFF)',
    },
    light: {
        base: 'var(--apollo-random-light, #77B6A8)',
        contrast: 'var(--apollo-on-random-light, #333)',
        1: {
            base: '#77B6A8',
            contrast: '#333',
        },
        2: {
            base: '#F37422',
            contrast: '#333',
        },
        3: {
            base: '#FF5075',
            contrast: '#333',
        },
        4: {
            base: '#00B0ED',
            contrast: '#333',
        },
        5: {
            base: '#8952CF',
            contrast: '#FFF',
        },
        6: {
            base: '#9E7365',
            contrast: '#FFF',
        },
        7: {
            base: '#42CA78',
            contrast: '#333',
        },
        8: {
            base: '#DC4EF3',
            contrast: '#333',
        },
        9: {
            base: '#3B65D0',
            contrast: '#FFF',
        },
    },
    dark: {
        base: 'var(--apollo-random-dark, #77B6A8)',
        contrast: 'var(--apollo-on-random-dark, #333)',
        1: {
            base: '#77B6A8',
            contrast: '#333',
        },
        2: {
            base: '#F37422',
            contrast: '#333',
        },
        3: {
            base: '#FF5075',
            contrast: '#333',
        },
        4: {
            base: '#00B0ED',
            contrast: '#333',
        },
        5: {
            base: '#8952CF',
            contrast: '#FFF',
        },
        6: {
            base: '#9E7365',
            contrast: '#FFF',
        },
        7: {
            base: '#42CA78',
            contrast: '#333',
        },
        8: {
            base: '#DC4EF3',
            contrast: '#333',
        },
        9: {
            base: '#3B65D0',
            contrast: '#FFF',
        },
    },
};

export default {
    primary: {
        ...primaryColor,
        lightest: primaryColor[50],
        darkest: primaryColor[900],
    },
    secondary: {
        ...secondaryColor,
        lightest: secondaryColor[50],
        darkest: secondaryColor[900],
    },
    warning: {
        ...warningColor,
        lightest: warningColor[50],
        darkest: warningColor[900],
    },
    critical: {
        ...criticalColor,
        lightest: criticalColor[50],
        darkest: criticalColor[900],
    },
    success: {
        ...successColor,
        lightest: successColor[50],
        darkest: successColor[900],
    },
    neutral: {
        ...neutralColor,
        lightest: neutralColor[50],
        darkest: neutralColor[900],
    },
    grayscale: {
        ...grayscaleColor,
        lightest: grayscaleColor[50],
        darkest: grayscaleColor[900],
    },
    random: {
        ...randomColor,
    },
    background: {
        light: {
            base: '#FFFFFF',
            primary: '#FFFFFF',
            secondary: '#F2F2F2',
            tertiary: '#CCCCCC',
            quaternary: '#AAAAAA',
            'on-background': 'var(--apollo-on-background, rgba(0, 0, 0, 0.86)',
        },
        dark: {
            base: '#121212',
            primary: '#121212',
            secondary: '#1B1B1B',
            tertiary: '#252525',
            quaternary: '#2E2E2E',
            'on-background': 'var(--apollo-on-background, rgba(255, 255, 255, 0.86)',
        },
        base: 'var(--apollo-background, #FFFFFF)',
        primary: 'var(--apollo-background-primary, #FFFFFF)',
        secondary: 'var(--apollo-background-secondary, #F2F2F2)',
        tertiary: 'var(--apollo-background-tertiary, #CCCCCC)',
        quaternary: 'var(--apollo-background-quaternary, #AAAAAA)',
    },
    white: {
        base: '#FFF',
    },
    black: {
        base: '#000',
    },
} as const;

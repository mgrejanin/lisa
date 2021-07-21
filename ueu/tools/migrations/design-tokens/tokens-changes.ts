const border = [
    {
        old: "theme('borderRadius.light')",
        regex: new RegExp(/(theme\('borderRadius.light\'\))/g),
        new: "theme('borderRadius.sm')",
    },
    {
        old: 'borderRadius.medium',
        new: 'borderRadius.md',
    },
    {
        old: 'borderRadius.strong',
        new: 'borderRadius.xl',
    },
    {
        old: 'borderWidth.light',
        new: 'borderWidth.sm',
    },
    {
        old: 'borderWidth.medium',
        new: 'borderWidth.md',
    },
    {
        old: 'borderWidth.strong',
        new: 'borderWidth.lg',
    },
];

const spacing = [
    { old: 'spacing.12', new: 'spacing.15' },
    { old: 'spacing.11', new: 'spacing.14' },
    { old: 'spacing.10', new: 'spacing.13' },
    { old: 'spacing.9', new: 'spacing.12' },
    { old: 'spacing.8', new: 'spacing.11' },
    { old: 'spacing.7', new: 'spacing.10' },
    { old: 'spacing.6', new: 'spacing.9' },
    { old: 'spacing.5', new: 'spacing.8' },
    { old: 'spacing.4', new: 'spacing.7' },
    { old: 'spacing.3', new: 'spacing.6' },
    { old: 'spacing.2', new: 'spacing.4' },
    { old: 'spacing.1', new: 'spacing.2' },
    { old: 'spacing.half', new: 'spacing.1' },
];

const successColor = [
    {
        old: 'colors.success.100',
        new: 'colors.success.200',
    },
    {
        old: 'colors.success.600',
        new: 'colors.success.800',
    },
    {
        old: 'colors.success.700',
        new: 'colors.success.900',
    },
];

const successHexColor = [
    {
        old: 'theme(\'colors.success.50\')',
        regex: new RegExp(/(theme\('colors.success.50\'\))/g),
        new: '#e3f7ea',
    },
    {
        old: 'theme(\'colors.success.100\')',
        regex: new RegExp(/(theme\('colors.success.100\'\))/g),
        new: '#e3f7ea',
    },
    {
        old: 'theme(\'colors.success.200\')',
        regex: new RegExp(/(theme\('colors.success.200\'\))/g),
        new: '#e3f7ea',
    },
    {
        old: 'theme(\'colors.success.300\')',
        regex: new RegExp(/(theme\('colors.success.300\'\))/g),
        new: '#e3f7ea',
    },
    {
        old: 'theme(\'colors.success.400\')',
        regex: new RegExp(/(theme\('colors.success.400\'\))/g),
        new: '#11c76f',
    },
    {
        old: 'theme(\'colors.success.500\')',
        regex: new RegExp(/(theme\('colors.success.500\'\))/g),
        new: '#00bc54',
    },
    {
        old: 'theme(\'colors.success.600\')',
        regex: new RegExp(/(theme\('colors.success.600\'\))/g),
        new: '#00ac4a',
    },
    {
        old: 'theme(\'colors.success.700\')',
        regex: new RegExp(/(theme\('colors.success.700\'\))/g),
        new: '#00ac4a',
    },
    {
        old: 'theme(\'colors.success.800\')',
        regex: new RegExp(/(theme\('colors.success.800\'\))/g),
        new: '#00ac4a',
    },
    {
        old: 'theme(\'colors.success.900\')',
        regex: new RegExp(/(theme\('colors.success.900\'\))/g),
        new: '#00984b',
    },
    {
        old: 'theme(\'colors.success.base\')',
        regex: new RegExp(/(theme\('colors.success.base\'\))/g),
        new: '#e3f7ea',
    },
    {
        old: 'theme(\'colors.success.light\')',
        regex: new RegExp(/(theme\('colors.success.light\'\))/g),
        new: '#11c76f',
    },
    {
        old: 'theme(\'colors.success.lightest\')',
        regex: new RegExp(/(theme\('colors.success.lightest\'\))/g),
        new: '#bdebcc',
    },
    {
        old: 'theme(\'colors.success.dark\')',
        regex: new RegExp(/(theme\('colors.success.dark\'\))/g),
        new: '#00984b',
    },
    {
        old: 'theme(\'colors.success.darkest\')',
        regex: new RegExp(/(theme\('colors.success.darkest\'\))/g),
        new: '#00984b',
    },
    
];

const criticalColor = [
    {
        old: 'colors.critical.100',
        new: 'colors.critical.200',
    },
    {
        old: 'colors.critical.600',
        new: 'colors.critical.800',
    },
    {
        old: 'colors.critical.700',
        new: 'colors.critical.900',
    },
];

const criticalHexColor = [
    {
        old: 'theme(\'colors.critical.50\')',
        regex: new RegExp(/(theme\('colors.critical.50\'\))/g),
        new: '#ffe6eb',
    },
    {
        old: 'theme(\'colors.critical.100\')',
        regex: new RegExp(/(theme\('colors.critical.100\'\))/g),
        new: '#ffe6eb',
    },
    {
        old: 'theme(\'colors.critical.200\')',
        regex: new RegExp(/(theme\('colors.critical.200\'\))/g),
        new: '#ff96ae',
    },
    {
        old: 'theme(\'colors.critical.300\')',
        regex: new RegExp(/(theme\('colors.critical.300\'\))/g),
        new: '#ff96ae',
    },
    {
        old: 'theme(\'colors.critical.400\')',
        regex: new RegExp(/(theme\('colors.critical.400\'\))/g),
        new: '#ff4f75',
    },
    {
        old: 'theme(\'colors.critical.500\')',
        regex: new RegExp(/(theme\('colors.critical.500\'\))/g),
        new: '#ff4f75',
    },
    {
        old: 'theme(\'colors.critical.600\')',
        regex: new RegExp(/(theme\('colors.critical.600\'\))/g),
        new: '#ff2048',
    },
    {
        old: 'theme(\'colors.critical.700\')',
        regex: new RegExp(/(theme\('colors.critical.700\'\))/g),
        new: '#ff2048',
    },
    {
        old: 'theme(\'colors.critical.800\')',
        regex: new RegExp(/(theme\('colors.critical.800\'\))/g),
        new: '#ff2048',
    },
    {
        old: 'theme(\'colors.critical.900\')',
        regex: new RegExp(/(theme\('colors.critical.900\'\))/g),
        new: '#ff0828',
    },
    {
        old: 'theme(\'colors.critical.base\')',
        regex: new RegExp(/(theme\('colors.critical.base\'\))/g),
        new: '#ff2048',
    },
    {
        old: 'theme(\'colors.critical.light\')',
        regex: new RegExp(/(theme\('colors.critical.light\'\))/g),
        new: '#ff4f75',
    },
    {
        old: 'theme(\'colors.critical.lightest\')',
        regex: new RegExp(/(theme\('colors.critical.lightest\'\))/g),
        new: '#ffe6eb',
    },
    {
        old: 'theme(\'colors.critical.dark\')',
        regex: new RegExp(/(theme\('colors.critical.dark\'\))/g),
        new: '#ff2048',
    },
    {
        old: 'theme(\'colors.critical.darkest\')',
        regex: new RegExp(/(theme\('colors.critical.darkest\'\))/g),
        new: '#ff0828',
    },
    
];

const warningColor = [
    {
        old: 'colors.warning.100',
        new: 'colors.warning.200',
    },
    {
        old: 'colors.warning.600',
        new: 'colors.warning.800',
    },
    {
        old: 'colors.warning.700',
        new: 'colors.warning.900',
    },
];

const warningHexColor = [
    {
        old: 'theme(\'colors.warning.50\')',
        regex: new RegExp(/(theme\('colors.warning.50\'\))/g),
        new: '#fef8e3',
    },
    {
        old: 'theme(\'colors.warning.100\')',
        regex: new RegExp(/(theme\('colors.warning.100\'\))/g),
        new: '#fef8e3',
    },
    {
        old: 'theme(\'colors.warning.200\')',
        regex: new RegExp(/(theme\('colors.warning.200\'\))/g),
        new: '#fcdf8b',
    },
    {
        old: 'theme(\'colors.warning.300\')',
        regex: new RegExp(/(theme\('colors.warning.300\'\))/g),
        new: '#fcdf8b',
    },
    {
        old: 'theme(\'colors.warning.400\')',
        regex: new RegExp(/(theme\('colors.warning.400\'\))/g),
        new: '#fac942',
    },
    {
        old: 'theme(\'colors.warning.500\')',
        regex: new RegExp(/(theme\('colors.warning.500\'\))/g),
        new: '#fac942',
    },
    {
        old: 'theme(\'colors.warning.600\')',
        regex: new RegExp(/(theme\('colors.warning.600\'\))/g),
        new: '#f8b330',
    },
    {
        old: 'theme(\'colors.warning.700\')',
        regex: new RegExp(/(theme\('colors.warning.700\'\))/g),
        new: '#f8b330',
    },
    {
        old: 'theme(\'colors.warning.800\')',
        regex: new RegExp(/(theme\('colors.warning.800\'\))/g),
        new: '#f8b330',
    },
    {
        old: 'theme(\'colors.warning.900\')',
        regex: new RegExp(/(theme\('colors.warning.900\'\))/g),
        new: '#f37422',
    },
    {
        old: 'theme(\'colors.warning.base\')',
        regex: new RegExp(/(theme\('colors.warning.base\'\))/g),
        new: '#f8b330',
    },
    {
        old: 'theme(\'colors.warning.light\')',
        regex: new RegExp(/(theme\('colors.warning.light\'\))/g),
        new: '#fef8e3',
    },
    {
        old: 'theme(\'colors.warning.lightest\')',
        regex: new RegExp(/(theme\('colors.warning.lightest\'\))/g),
        new: '#fef8e3',
    },
    {
        old: 'theme(\'colors.warning.dark\')',
        regex: new RegExp(/(theme\('colors.warning.dark\'\))/g),
        new: '#f8b330',
    },
    {
        old: 'theme(\'colors.warning.darkest\')',
        regex: new RegExp(/(theme\('colors.warning.darkest\'\))/g),
        new: '#f37422',
    },
    
];

const neutralColor = [
    {
        old: 'colors.neutral.100',
        new: "theme('colors.neutral.200",
    },
    {
        old: 'colors.neutral.600',
        new: 'colors.neutral.800',
    },
    {
        old: 'colors.neutral.700',
        new: 'colors.neutral.900',
    },
    
];

const neutralHexColor = [
    {
        old: 'theme(\'colors.neutral.50\')',
        regex: new RegExp(/(theme\('colors.neutral.50\'\))/g),
        new: '#e0f4fc',
    },
    {
        old: 'theme(\'colors.neutral.100\')',
        regex: new RegExp(/(theme\('colors.neutral.100\'\))/g),
        new: '#e0f4fc',
    },
    {
        old: 'theme(\'colors.neutral.200\')',
        regex: new RegExp(/(theme\('colors.neutral.200\'\))/g),
        new: '#7bd1f4',
    },
    {
        old: 'theme(\'colors.neutral.300\')',
        regex: new RegExp(/(theme\('colors.neutral.300\'\))/g),
        new: '#7bd1f4',
    },
    {
        old: 'theme(\'colors.neutral.400\')',
        regex: new RegExp(/(theme\('colors.neutral.400\'\))/g),
        new: '#00b0ed',
    },
    {
        old: 'theme(\'colors.neutral.500\')',
        regex: new RegExp(/(theme\('colors.neutral.500\'\))/g),
        new: '#00b0ed',
    },
    {
        old: 'theme(\'colors.neutral.600\')',
        regex: new RegExp(/(theme\('colors.neutral.600\'\))/g),
        new: '#0097dc',
    },
    {
        old: 'theme(\'colors.neutral.700\')',
        regex: new RegExp(/(theme\('colors.neutral.700\'\))/g),
        new: '#0097dc',
    },
    {
        old: 'theme(\'colors.neutral.800\')',
        regex: new RegExp(/(theme\('colors.neutral.800\'\))/g),
        new: '#0097dc',
    },
    {
        old: 'theme(\'colors.neutral.900\')',
        regex: new RegExp(/(theme\('colors.neutral.900\'\))/g),
        new: '#0073b5',
    },
    {
        old: 'theme(\'colors.neutral.base\')',
        regex: new RegExp(/(theme\('colors.neutral.base\'\))/g),
        new: '#0097dc',
    },
    {
        old: 'theme(\'colors.neutral.light\')',
        regex: new RegExp(/(theme\('colors.neutral.light\'\))/g),
        new: '#00b0ed',
    },
    {
        old: 'theme(\'colors.neutral.lightest\')',
        regex: new RegExp(/(theme\('colors.neutral.lightest\'\))/g),
        new: '#e0f4fc',
    },
    {
        old: 'theme(\'colors.neutral.dark\')',
        regex: new RegExp(/(theme\('colors.neutral.dark\'\))/g),
        new: '#0097dc',
    },
    {
        old: 'theme(\'colors.neutral.darkest\')',
        regex: new RegExp(/(theme\('colors.neutral.darkest\'\))/g),
        new: '#0073b5',
    },
    
];

const grayscaleColor = [
    {
        old: 'colors.grayscale.100',
        new: 'colors.grayscale.200',
    },
    {
        old: 'colors.grayscale.600',
        new: 'colors.grayscale.800',
    },
    {
        old: 'colors.grayscale.700',
        new: 'colors.grayscale.900',
    },
];

const grayscaleHexColor = [
    {
        old: 'theme(\'colors.neutral.50\')',
        regex: new RegExp(/(theme\('colors.neutral.50\'\))/g),
        new: '#f2f2f2',
    },
    {
        old: 'theme(\'colors.neutral.100\')',
        regex: new RegExp(/(theme\('colors.neutral.100\'\))/g),
        new: '#e0f4fc',
    },
    {
        old: 'theme(\'colors.neutral.200\')',
        regex: new RegExp(/(theme\('colors.neutral.200\'\))/g),
        new: '#ccc',
    },
    {
        old: 'theme(\'colors.neutral.300\')',
        regex: new RegExp(/(theme\('colors.neutral.300\'\))/g),
        new: '#aab0b2',
    },
    {
        old: 'theme(\'colors.neutral.400\')',
        regex: new RegExp(/(theme\('colors.neutral.400\'\))/g),
        new: '#8a9499',
    },
    {
        old: 'theme(\'colors.neutral.500\')',
        regex: new RegExp(/(theme\('colors.neutral.500\'\))/g),
        new: '#6c7980',
    },
    {
        old: 'theme(\'colors.neutral.600\')',
        regex: new RegExp(/(theme\('colors.neutral.600\'\))/g),
        new: '#525f66',
    },
    {
        old: 'theme(\'colors.neutral.700\')',
        regex: new RegExp(/(theme\('colors.neutral.700\'\))/g),
        new: '#39464d',
    },
    {
        old: 'theme(\'colors.neutral.800\')',
        regex: new RegExp(/(theme\('colors.neutral.800\'\))/g),
        new: '#212d33',
    },
    {
        old: 'theme(\'colors.neutral.900\')',
        regex: new RegExp(/(theme\('colors.neutral.900\'\))/g),
        new: '#0e161a',
    },
    {
        old: 'theme(\'colors.neutral.base\')',
        regex: new RegExp(/(theme\('colors.neutral.base\'\))/g),
        new: '#525f66',
    },
    {
        old: 'theme(\'colors.neutral.light\')',
        regex: new RegExp(/(theme\('colors.neutral.light\'\))/g),
        new: '#8a9499',
    },
    {
        old: 'theme(\'colors.neutral.lightest\')',
        regex: new RegExp(/(theme\('colors.neutral.lightest\'\))/g),
        new: '#f2f2f2',
    },
    {
        old: 'theme(\'colors.neutral.dark\')',
        regex: new RegExp(/(theme\('colors.neutral.dark\'\))/g),
        new: '#212d33',
    },
    {
        old: 'theme(\'colors.neutral.darkest\')',
        regex: new RegExp(/(theme\('colors.neutral.darkest\'\))/g),
        new: '#0e161a',
    },
    
];

const brandColor = [
    {
        old: 'colors.primary.100',
        new: 'colors.primary.200',
    },
    {
        old: 'colors.primary.100',
        new: 'colors.primary.200',
    },
    {
        old: 'colors.primary.600',
        new: 'colors.primary.800',
    },
    {
        old: 'colors.primary.700',
        new: 'colors.primary.900',
    },
    {
        old: 'colors.primary.600',
        new: 'colors.primary.800',
    },
    {
        old: 'colors.primary.700',
        new: 'colors.primary.900',
    },
    { old: 'colors.primary', new: 'colors.primary' },
];

const brandHexColor = [
    {
        old: 'theme(\'colors.primary.50\')',
        regex: new RegExp(/(theme\('colors.primary.50\'\))/g),
        new: '#e3f7ea',
    },
    {
        old: 'theme(\'colors.primary.100\')',
        regex: new RegExp(/(theme\('colors.primary.100\'\))/g),
        new: '#bdebcc',
    },
    {
        old: 'theme(\'colors.primary.200\')',
        regex: new RegExp(/(theme\('colors.primary.200\'\))/g),
        new: '#8fdeac',
    },
    {
        old: 'theme(\'colors.primary.300\')',
        regex: new RegExp(/(theme\('colors.primary.300\'\))/g),
        new: '#58d289',
    },
    {
        old: 'theme(\'colors.primary.400\')',
        regex: new RegExp(/(theme\('colors.primary.400\'\))/g),
        new: '#11c76f',
    },
    {
        old: 'theme(\'colors.primary.500\')',
        regex: new RegExp(/(theme\('colors.primary.500\'\))/g),
        new: '#00bc54',
    },
    {
        old: 'theme(\'colors.primary.600\')',
        regex: new RegExp(/(theme\('colors.primary.600\'\))/g),
        new: '#00ac4a',
    },
    {
        old: 'theme(\'colors.primary.700\')',
        regex: new RegExp(/(theme\('colors.primary.700\'\))/g),
        new: '#00984b',
    },
    {
        old: 'theme(\'colors.primary.800\')',
        regex: new RegExp(/(theme\('colors.primary.800\'\))/g),
        new: '#008441',
    },
    {
        old: 'theme(\'colors.primary.900\')',
        regex: new RegExp(/(theme\('colors.primary.900\'\))/g),
        new: '#006532',
    },
    {
        old: 'theme(\'colors.primary.base\')',
        regex: new RegExp(/(theme\('colors.primary.base\'\))/g),
        new: '#00ac4a',
    },
    {
        old: 'theme(\'colors.primary.light\')',
        regex: new RegExp(/(theme\('colors.primary.light\'\))/g),
        new: '#bdebcc',
    },
    {
        old: 'theme(\'colors.primary.lightest\')',
        regex: new RegExp(/(theme\('colors.primary.lightest\'\))/g),
        new: '#00ac4a',
    },
    {
        old: 'theme(\'colors.primary.dark\')',
        regex: new RegExp(/(theme\('colors.primary.dark\'\))/g),
        new: '#008441',
    },
    {
        old: 'theme(\'colors.primary.darkest\')',
        regex: new RegExp(/(theme\('colors.primary.darkest\'\))/g),
        new: '#006532',
    },
    
];

const removedColors = [
    {
        old: 'theme(\'colors.university.50\')',
        regex: new RegExp(/(theme\('colors.university.50\'\))/g),
        new: '#c1c9ed',
    },
    {
        old: 'theme(\'colors.university.100\')',
        regex: new RegExp(/(theme\('colors.university.100\'\))/g),
        new: '#6a84d6',
    },
    {
        old: 'theme(\'colors.university.200\')',
        regex: new RegExp(/(theme\('colors.university.200\'\))/g),
        new: '#0050c5',
    },
    {
        old: 'theme(\'colors.university.300\')',
        regex: new RegExp(/(theme\('colors.university.300\'\))/g),
        new: '#0050c5',
    },
    {
        old: 'theme(\'colors.university.400\')',
        regex: new RegExp(/(theme\('colors.university.400\'\))/g),
        new: '#0050c5',
    },
    {
        old: 'theme(\'colors.university.500\')',
        regex: new RegExp(/(theme\('colors.university.500\'\))/g),
        new: '#0050c5',
    },
    {
        old: 'theme(\'colors.university.600\')',
        regex: new RegExp(/(theme\('colors.university.600\'\))/g),
        new: '#082468',
    },
    {
        old: 'theme(\'colors.university.700\')',
        regex: new RegExp(/(theme\('colors.university.700\'\))/g),
        new: '#082468',
    },
    {
        old: 'theme(\'colors.university.800\')',
        regex: new RegExp(/(theme\('colors.university.800\'\))/g),
        new: '#192543',
    },
    {
        old: 'theme(\'colors.university.900\')',
        regex: new RegExp(/(theme\('colors.university.900\'\))/g),
        new: '#192543',
    },
    {
        old: 'theme(\'colors.university.light\')',
        regex: new RegExp(/(theme\('colors.university.light\'\))/g),
        new: '#c1c9ed',
    },
    {
        old: 'theme(\'colors.university.lightest\')',
        regex: new RegExp(/(theme\('colors.university.lightest\'\))/g),
        new: '#c1c9ed',
    },
    {
        old: 'theme(\'colors.university.base\')',
        regex: new RegExp(/(theme\('colors.university.base\'\))/g),
        new: '#082468',
    },
    {
        old: 'theme(\'colors.university.dark\')',
        regex: new RegExp(/(theme\('colors.university.dark\'\))/g),
        new: '#192543',
    },
    {
        old: 'theme(\'colors.university.darkest\')',
        regex: new RegExp(/(theme\('colors.university.darkest\'\))/g),
        new: '#192543',
    },

    {
        old: 'theme(\'colors.external.banco24Horas\')',
        regex: new RegExp(/(theme\('colors.external.banco24Horas\'\))/g),
        new: '#da251c',
    },
    {
        old: 'theme(\'colors.external.facebook\')',
        regex: new RegExp(/(theme\('colors.external.facebook\'\))/g),
        new: '#3b5998',
    },
    {
        old: 'theme(\'colors.external.twitter\')',
        regex: new RegExp(/(theme\('colors.external.twitter\'\))/g),
        new: '#55acee',
    },
    {
        old: 'theme(\'colors.external.whatsapp\')',
        regex: new RegExp(/(theme\('colors.external.whatsapp\'\))/g),
        new: '#25d366',
    },
];

export default [
    // ...border,
    // ...spacing,
    ...criticalHexColor,
    ...successHexColor,
    ...warningHexColor,
    ...neutralHexColor,
    ...grayscaleHexColor,
    ...brandHexColor,
    ...removedColors,
] as const;

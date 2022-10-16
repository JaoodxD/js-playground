//@ts-check
'use strict';

const COUNTRIES = {
    'UA': ['Украина', 'UA', '🇺🇦'],
    'KZ': ['Казахстан', 'KZ', '🇰🇿']
};
const DEFAULT_COUNTRY = 'GLOBAL';

const normalizeCountry = country =>
    Object.entries(COUNTRIES)
        .find(([, nameVariants]) =>
            nameVariants.includes(country))
    ?.[0] ?? DEFAULT_COUNTRY;

const inputs = [
    'UA', 'Казахстан', 'asdasd'
];
console.table([inputs, inputs.map(normalizeCountry)]);

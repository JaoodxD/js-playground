//@ts-check
'use strict';

const COUNTRIES = {
    'UA': ['Украина', 'UA', '🇺🇦'],
    'KZ': ['Казахстан', 'KZ', '🇰🇿']
};
const DEFAULT_COUNTRY = 'GLOBAL';

const getCountryCode = country =>
    Object.entries(COUNTRIES)
        .find(([, nameVariants]) =>
            nameVariants.includes(country))
    ?.[0];

const normalize = country => getCountryCode(country) ?? DEFAULT_COUNTRY;
const inputs = [
    'UA', 'Казахстан', 'asdasd'
];
console.table([inputs, inputs.map(normalize)]);

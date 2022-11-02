const factorify = ({ name, className, innerComponent }) => `<li class='${className}'>
\t${name} 
${innerComponent}
</li>`;

const arr = [
    { name: 'Zdarova', className: 'main-css-class', innerComponent: '<textarea/>' },
    { name: 'Yopta', className: 'other-css-class', innerComponent: `<div onClick="alert('zdarova')"> asdasd</div>` },
];

const list = arr.map(factorify);

console.log(list.join('\n'));

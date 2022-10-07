const pipe = (...f) => (value) => f.reduce((prev, next) => next(prev), value);

const replaceBrWithNL = (text) => text.replace(/<br>/gm, '\n');
const replaceNLWithBr = (text) => text.replace(/\n/gm, '<br>');
const stripSpannedContent = (text) => text
    .replace(/(<span class="text-tooltip">)(.+)(<\/span>)/gms, '$2');
const wrapContentWithSpan = (text) => text
    .replace(/\n(.*)/gms, '\n<span class="text-tooltip">$1<\/span>');

const split = (text) => text.split(/\n(.*)/s).slice(0, 2);

const strip = pipe(replaceBrWithNL, stripSpannedContent, split);
const wrap = pipe(wrapContentWithSpan, replaceNLWithBr);

module.exports = {
    strip,
    wrap
}

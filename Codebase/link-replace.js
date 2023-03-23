const link = `<a href="https://w3techs.com/technologies/details/ws-nodejs" target="_blank" rel="nofollow noopener">W3Tech</a>`;

const regex = /(?<=<a href="https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/\/=]*).*rel=")nofollow(?=.*".*<\/a>)/gm;

const newText = 'dofollow';
const result = link.replace(regex, newText);

console.log(result);


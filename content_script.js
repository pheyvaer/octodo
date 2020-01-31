// Put all the javascript code here, that you want to execute after page load.

const titleEl = document.querySelector('.js-issue-title');
const title = titleEl.innerText;
const url = titleEl.baseURI;
const issueNumber = document.querySelector('.gh-header-number').innerText.replace('#', '');
console.log(issueNumber);

console.log(title);
console.log(url);

browser.storage.local.set({title, url, issueNumber});

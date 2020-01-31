main();

function main() {
  let issueTitle;
  let url = window.location.href;
  let issueNumber;
  let error;

  if (url.indexOf('github.com') !== -1) {
    const titleEl = document.querySelector('.js-issue-title');
    issueTitle = titleEl.innerText;
    issueNumber = document.querySelector('.gh-header-number').innerText.replace('#', '');
  } else if (url.indexOf('gitlab.') !== -1) {
    const titleEl = document.querySelector('.title-container h2.title.qa-title');
    issueTitle = titleEl.innerText;
    issueNumber = document.querySelector('.js-title-container h2.breadcrumbs-sub-title').innerText.replace('#', '');
  } else {
    error = 'invalid url';
  }

  console.log(issueNumber);
  console.log(issueTitle);
  console.log(url);

  browser.storage.local.set({issueTitle, issueNumber, url, error});
}

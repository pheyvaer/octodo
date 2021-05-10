main();

function main() {
  let title;
  let url = window.location.href;
  let number;
  let error;
  let type;

  if (url.indexOf('github.com') !== -1) {
    const titleEl = document.querySelector('.js-issue-title');
    title = titleEl.innerText;
    number = document.querySelector('.gh-header-number').innerText.replace('#', '');

    if (url.indexOf('/pull/') !== -1) {
      type = 'merge-request';
    } else {
      type = 'issue';
    }
  } else if (url.indexOf('gitlab.') !== -1) {
    let titleEl = document.querySelector('.issue-details h2.title.qa-title');
    number = document.querySelector('h2.breadcrumbs-sub-title').innerText.replace('#', '');
    type = 'issue';

    if (!titleEl) {
      // No title found for an issue. Let's try for a merge request.
      titleEl = document.querySelector('.merge-request-details h2.title.qa-title');
      number = document.querySelector('h2.breadcrumbs-sub-title').innerText.replace('!', '');
      type = 'merge-request';
    }

    if (titleEl) {
      title = titleEl.innerText;
    } else {
      error = 'data not found';
    }
  } else {
    error = 'invalid url';
  }

  console.log(number);
  console.log(title);
  console.log(url);
  console.log(error);
  console.log(type);

  browser.storage.local.set({title, number, url, type, error});
}

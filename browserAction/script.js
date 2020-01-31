const executing = browser.tabs.executeScript({file: "/content_script.js"})
.catch(console.error);

executing.then(() => {
  createTodo();
}, console.error);

async function createTodo(emoji = '👨‍💻') {
  const {issueTitle, issueNumber, url, error} = await browser.storage.local.get(['issueTitle', 'url', 'issueNumber', 'error']);

  if (error === 'invalid url') {
    document.querySelector('#message').innerText = 'This website is not supported.';
  } else {
    const todo = emoji + ` Fix [issue ${issueNumber}](${url}): ${issueTitle}`;

    navigator.clipboard.writeText(todo).then(function() {
      document.querySelector('#message').innerText = 'Copied!';
    }, function() {
      document.querySelector('#message').innerText = 'Unable to copy!';
    });
  }
};

const executing = browser.tabs.executeScript({file: "/content_script.js"})
.catch(console.error);

executing.then(() => {
  createTodo();
}, console.error);

const buttons = document.querySelectorAll('#emojis button');

for (let i = 0; i < buttons.length; i++) {
  buttons[i].onclick = () => {
    createTodo(buttons[i].innerText);
  };
}

const simpleButton = document.querySelector('#simple button');

simpleButton.onclick = createSimpleText;

async function createTodo(emoji = '👨‍💻') {
  const {issueTitle, issueNumber, url, error} = await browser.storage.local.get(['issueTitle', 'url', 'issueNumber', 'error']);

  if (error === 'invalid url') {
    document.querySelector('#message').innerText = 'This website is not supported.';
  } else {
    const todo = emoji + ` Fix [issue ${issueNumber}](${url}): ${issueTitle}`;
    document.querySelector('#emojis').classList.remove('hidden');
    document.querySelector('#simple').classList.remove('hidden');

    navigator.clipboard.writeText(todo).then(function() {
      document.querySelector('#message').innerText = `Copied with ${emoji}!`;
    }, function() {
      document.querySelector('#message').innerText = 'Unable to copy!';
    });
  }
};

async function createSimpleText() {
  const {issueTitle, issueNumber, url, error} = await browser.storage.local.get(['issueTitle', 'url', 'issueNumber', 'error']);
  const text = `${issueTitle} (see [issue ${issueNumber}](${url}))`;

  navigator.clipboard.writeText(text).then(function() {
    document.querySelector('#message').innerText = `Copied simple text!`;
  }, function() {
    document.querySelector('#message').innerText = 'Unable to copy!';
  });
}

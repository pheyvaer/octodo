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
  const {title, number, url, error, type} = await browser.storage.local.get(['title', 'url', 'number', 'error', 'type']);

  if (error === 'invalid url') {
    document.querySelector('#message').innerText = 'This website is not supported.';
  } else if (error === 'data not found') {
    document.querySelector('#message').innerText = 'This page is not suppored.';
  } else {
    let todo;

    if (type === 'issue') {
      todo = emoji + ` Fix [issue ${number}](${url}): ${title}`;
    } else {
      todo = emoji + ` [PR ${number}](${url}): ${title}`;
    }

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
  const {title, number, url, error} = await browser.storage.local.get(['title', 'url', 'number', 'error']);
  const text = `${title} (see [issue ${number}](${url}))`;

  navigator.clipboard.writeText(text).then(function() {
    document.querySelector('#message').innerText = `Copied simple text!`;
  }, function() {
    document.querySelector('#message').innerText = 'Unable to copy!';
  });
}

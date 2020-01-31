window.onload = async () => {
  const {title, url, issueNumber} = await browser.storage.local.get(['title', 'url', 'issueNumber']);
  const todo = `👨‍💻 Fix [issue ${issueNumber}](${url}): ${title}`;
  console.log(todo);

  navigator.clipboard.writeText(todo).then(function() {
    document.querySelector('#message').innerText = 'Copied!';
  }, function() {
    /* clipboard write failed */
  });
};

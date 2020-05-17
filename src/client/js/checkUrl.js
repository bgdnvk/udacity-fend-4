function checkUrl(url) {
  const urlPattern = new RegExp(
    //regex to check for valid url
    //https://stackoverflow.com/questions/3809401/what-is-a-good-regular-expression-to-match-a-url
    /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi
  );
  return url.match(urlPattern);
}

export { checkUrl };

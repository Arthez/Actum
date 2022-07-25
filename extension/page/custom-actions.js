const CUSTOM_ACTIONS = {

    // Example of custom action
    getRandomJoke: () => {
        const copyToClipboard = str => {
            const el = document.createElement('textarea');
            el.value = str;
            el.setAttribute('readonly', '');
            el.style.position = 'absolute';
            el.style.left = '-9999px';
            document.body.appendChild(el);
            el.select();
            document.execCommand('copy');
            document.body.removeChild(el);
        };
        return fetch('https://api.chucknorris.io/jokes/random?category=dev')
            .then(response => response.json())
            .then(joke => {
                console.log(joke.value);
                copyToClipboard(joke.value);
                return true;
            });
    },

};

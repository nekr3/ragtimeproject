const HOSTURL = document.location.host;
const PAGEURL = document.location.host + document.location.pathname;

if (confirm(`I AM HEREEEEE at ${HOSTURL} + ${PAGEURL}`)) {
    if (document.location.pathname === "/") switchHomePage();
    else switchArticlePage();
}

function switchHomePage() {
    switch (HOSTURL) {
        case "www.foxnews.com":
            alert("hello?");
            chrome.storage.local.get("www.vox.com", (data) => {
                const articles = data["www.vox.com"];

                var i = 0;
                document.querySelectorAll(".content a").forEach((e) => {
                    if (e.children.length === 0) {
                        console.log("looking for article " + articles[i]);

                        getArticleDetails(articles[i], (title, _) => {
                            e.textContent = title;
                        });

                        i = (i + 1) % articles.length;
                    }
                });
            });
            break;
        case "www.vox.com":
            alert("hello?");
            chrome.storage.local.get("www.foxnews.com", (data) => {
                const articles = data["www.foxnews.com"];

                var i = 0;
                document.querySelectorAll(".c-entry-box--compact__body").forEach((e) => {
                    console.log("looking for article " + articles[i]);

                    getArticleDetails(articles[i], (title, _) => {
                        e.querySelector(".c-entry-box--compact__title a").textContent = "CHANGED: " + title;
                        e.querySelector(".c-entry-box--compact__dek").textContent = "blurb";
                    });

                    i = (i + 1) % articles.length;
                });
            });
            break;
        case "www.msnbc.com":
            alert("hello?");
            chrome.storage.local.get("www.breitbart.com", (data) => {
                const articles = data["www.breitbart.com"];

                var i = 0;
                document.querySelectorAll(".cover-spread-tease__headline span:not(.icon)").forEach((e) => {
                    e.textContent = articles[i];
                    i = (i + 1) % articles.length;
                });

                document.querySelectorAll(".twoByOne h3 a").forEach((e) => {
                    e.textContent = articles[i];
                    i = (i + 1) % articles.length;
                });

                document.querySelectorAll(".cover-spread__headline").forEach((e) => {
                    e.textContent = articles[i];
                    i = (i + 1) % articles.length;
                });
            });
            break;
        case "www.breitbart.com":
            alert("hello?");
            chrome.storage.local.get("www.msnbc.com", (data) => {
                const articles = data["www.msnbc.com"];

                var i = 0;
                document.querySelectorAll("article").forEach((e) => {
                    e.querySelector("h2 a").textContent = articles[i];
                    e.querySelector(".excerpt p").textContent = articles[i];
                    i = (i + 1) % articles.length;
                });
                document.querySelectorAll("#BBTrendUL a").forEach((e) => {
                    e.textContent = articles[i];
                    i = (i + 1) % articles.length;
                });
                document.querySelectorAll("#DQSW em").forEach((e) => {
                    e.textContent = articles[i];
                    i = (i + 1) % articles.length;
                });
            });
            break;
        case "www.cnn.com":
            alert("hello?");
            chrome.storage.local.get("www.wsj.com", (data) => {
                const articles = data["www.wsj.com"];

                var i = 0;
                document.querySelectorAll(".cd__headline-text").forEach((e) => {
                    e.textContent = articles[i];
                    i = (i + 1) % articles.length;
                });
            });
            break;
        case "www.wsj.com": //TODO DOESNT WORK
            alert("hello?");
            chrome.storage.local.get("www.cnn.com", (data) => {
                const articles = data["www.cnn.com"];

                var i = 0;
                document.querySelectorAll("article").forEach((e) => {
                    const a = e.querySelector("h3 a");
                    if (a) a.textContent = articles[i];
                    const b = e.querySelector("p");
                    if (b) b.textContent = articles[i];
                    i = (i + 1) % articles.length;
                });
            });
            break;
        case "www.nytimes.com":
            alert("hello?");
            chrome.storage.local.get("www.infowars.com", (data) => {

            });
            //TODO idk how 2 do plz help
            break;
        case "www.infowars.com":
            alert("hello?");
            chrome.storage.local.get("www.nytimes.com", (data) => {
                const articles = data["www.nytimes.com"];

                var i = 0;
                document.querySelectorAll(".title a").forEach((e) => {
                    e.textContent = articles[i];
                    i = (i + 1) % articles.length;
                });
                document.querySelectorAll(".title-ddd").forEach((e) => {
                    e.textContent = articles[i];
                    i = (i + 1) % articles.length;
                });
                document.querySelectorAll(".stansberry_item a").forEach((e) => {
                    e.textContent = articles[i];
                    i = (i + 1) % articles.length;
                });
                document.querySelectorAll(".article-content").forEach((e) => {
                    e.querySelector("h3 a").textContent = articles[i];
                    e.querySelector("h4").textContent = articles[i];
                    i = (i + 1) % articles.length;
                });
            });
            break;
        case "www.theatlantic.com":
            alert("hello?");
            chrome.storage.local.get("www.theonion.com", (data) => {
                const articles = data["www.theonion.com"];

                var i = 0;

                document.querySelectorAll(".c-cover-story__content").forEach((e) => {
                    e.querySelector("h1 a").textContent = articles[i];
                    e.querySelector("p").textContent = articles[i];
                    i = (i + 1) % articles.length;
                });

                document.querySelectorAll("article").forEach((e) => {
                    const a = e.querySelector("h2 a");
                    if (a) a.textContent = articles[i];

                    const b = e.querySelector("p");
                    if (b) b.textContent = articles[i];

                    const c = e.querySelector("h3 a");
                    if (c) c.textContent = articles[i];

                    i = (i + 1) % articles.length;
                });

                document.querySelectorAll(".c-popular__link").forEach((e) => {
                    e.textContent = articles[i];
                    i = (i + 1) % articles.length;
                });
            });
            break;
        case "www.theonion.com":
            alert("hello?");
            chrome.storage.local.get("www.theatlantic.com", (data) => {
                const articles = data["www.theatlantic.com"];

                var i = 0;
                document.querySelectorAll("article").forEach((e) => {
                    console.log(`Article ${i}: ${articles[i]}`);
                    const a = e.querySelector("h4");
                    if (a) a.textContent = articles[i];

                    const b = e.querySelector("p");
                    if (b) b.textContent = articles[i];

                    i = (i + 1) % articles.length;
                });
            });
            break;
    }
}

function switchArticlePage() {
    switch (HOSTURL) {
        case "www.foxnews.com":
            chrome.storage.local.get(["www.fox.com", "www.vox.com"], (data) => {
                const vox = data["www.vox.com"];
                const fox = data["www.fox.com"];

                const nextArticle = vox[fox.indexOf(fullpath) % vox.length];
                getArticleDetails("www.vox.com", nextArticle, (title, article) => {

                });
            });
            break;
        case "www.vox.com":
            chrome.storage.local.get(["www.fox.com", "www.vox.com"], (data) => {
                const vox = data["www.vox.com"];
                const fox = data["www.fox.com"];

                const nextArticle = fox[vox.indexOf(fullpath) % fox.length];
                getArticleDetails("www.vox.com", nextArticle, (title, article) => {

                });
            });
            break;
        case "www.msnbc.com":
            chrome.storage.local.get(["www.msnbc.com", "www.breitbart.com"], (data) => {
                const msnbc = data["www.msnbc.com"];
                const breitbart = data["www.breitbart.com"];

                const nextArticle = breitbart[msnbc.indexOf(fullpath) % breitbart.length];
                getArticleDetails("www.breitbart.com", nextArticle, (title, article) => {

                });
            });
            break;
        case "www.breitbart.com":
            chrome.storage.local.get(["www.msnbc.com", "www.breitbart.com"], (data) => {
                const msnbc = data["www.msnbc.com"];
                const breitbart = data["www.breitbart.com"];

                const nextArticle = msnbc[breitbart.indexOf(fullpath) % msnbc.length];
                getArticleDetails("www.msnbc.com", nextArticle, (title, article) => {

                });
            });
            break;
        case "www.cnn.com":
            chrome.storage.local.get(["www.cnn.com", "www.wsj.com"], (data) => {
                const cnn = data["www.cnn.com"];
                const wsj = data["www.wsj.com"];

                const nextArticle = wsj[cnn.indexOf(fullpath) % wsj.length];
                getArticleDetails("www.wsj.com", nextArticle, (title, article) => {

                });
            });
            break;
        case "www.wsj.com":
            chrome.storage.local.get(["www.cnn.com", "www.wsj.com"], (data) => {
                const cnn = data["www.cnn.com"];
                const wsj = data["www.wsj.com"];

                const nextArticle = cnn[wsj.indexOf(fullpath) % cnn.length];
                getArticleDetails("www.cnn.com", nextArticle, (title, article) => {

                });
            });
            break;
        case "www.nytimes.com":
            chrome.storage.local.get(["www.nytimes.com", "www.infowars.com"], (data) => {
                const nyt = data["www.nytimes.com"];
                const info = data["www.infowars.com"];

                const nextArticle = info[nyt.indexOf(fullpath) % info.length];
                getArticleDetails("www.infowars.com", nextArticle, (title, article) => {

                });
            });
            break;
        case "www.infowars.com":
            chrome.storage.local.get(["www.nytimes.com", "www.infowars.com"], (data) => {
                const nyt = data["www.nytimes.com"];
                const info = data["www.infowars.com"];

                const nextArticle = nyt[info.indexOf(fullpath) % nyt.length];
                getArticleDetails("www.nytimes.com", nextArticle, (title, article) => {

                });
            });
            break;
        case "www.theatlantic.com":
            chrome.storage.local.get(["www.theatlantic.com", "www.theonion.com"], (data) => {
                const atl = data["www.theatlantic.com"];
                const onion = data["www.theonion.com"];

                const nextArticle = onion[atl.indexOf(fullpath) % onion.length];
                getArticleDetails("www.theonion.com", nextArticle, (title, article) => {

                });
            });
            break;
        case "www.theonion.com":
            chrome.storage.local.get(["www.theatlantic.com", "www.theonion.com"], (data) => {
                const atl = data["www.theatlantic.com"];
                const onion = data["www.theonion.com"];

                const nextArticle = atl[onion.indexOf(fullpath) % atl.length];
                getArticleDetails("www.theatlantic.com", nextArticle, (title, article) => {

                });
            });
            break;
    }
}

function getArticleDetails(fullpath, callback) {
    chrome.storage.local.get(fullpath, (data) => {
        console.log(fullpath);
        console.log(data[fullpath][0]);
        console.log(data[fullpath][1]);
        callback(data[fullpath][0], data[fullpath][1]);
    });
}

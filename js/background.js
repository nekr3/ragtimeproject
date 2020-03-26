console.log("Hi there!");

const ALL_SITES = ["https://www.foxnews.com/", "https://www.vox.com/", "https://www.msnbc.com/", "https://www.breitbart.com/", "https://www.cnn.com/", "https://www.wsj.com/", "https://www.nytimes.com/", "https://www.infowars.com/", "https://www.theatlantic.com/", "https://www.theonion.com/"];

chrome.storage.local.clear();

ALL_SITES.forEach((val) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
        const doc = this.responseXML;
        const url = val.substring(8, val.length - 1);
        const articleLinks = [];
        switch (url) {
            case "www.foxnews.com":
                doc.querySelectorAll(".content a").forEach((e) => {
                    if (e.children.length === 0) articleLinks.push(e.href);
                });
                break;
            case "www.vox.com":
                doc.querySelectorAll(".c-entry-box--compact__title a").forEach((e) => {
                    articleLinks.push(e.href);
                });
                break;
            case "www.msnbc.com":
                doc.querySelectorAll(".cover-spread-tease__headline a").forEach((e) => {
                    articleLinks.push(e.href);
                });

                doc.querySelectorAll(".twoByOne h3 a").forEach((e) => {
                    articleLinks.push(e.href);
                });

                doc.querySelectorAll(".cover-spread__headline a").forEach((e) => {
                    articleLinks.push(e.href);
                });
                break;
            case "www.breitbart.com":
                doc.querySelectorAll("article h2 a").forEach((e) => {
                    articleLinks.push(e.href);
                });
                doc.querySelectorAll("#BBTrendUL a").forEach((e) => {
                    articleLinks.push(e.href);
                });
                doc.querySelectorAll("#DQSW a").forEach((e) => {
                    articleLinks.push(e.href);
                });
                break;
            case "www.cnn.com": //TODO DOESN'T WORK
                doc.querySelectorAll(".cd__headline a").forEach((e) => {
                    articleLinks.push(e.href);
                });
                break;
            case "www.wsj.com":
                doc.querySelectorAll("article h3 a").forEach((e) => {
                    articleLinks.push(e.href);
                });
                break;
            case "www.nytimes.com":


                //TODO idk how 2 do plz help
                break;
            case "www.infowars.com":
                doc.querySelectorAll(".title a").forEach((e) => {
                    articleLinks.push(e.href);
                });
                doc.querySelectorAll(".flex-caption-wrapper h3 a").forEach((e) => {
                    articleLinks.push(e.href);
                });
                doc.querySelectorAll(".stansberry_item a").forEach((e) => {
                    articleLinks.push(e.href);
                });
                doc.querySelectorAll(".article-content h3 a").forEach((e) => {
                    articleLinks.push(e.href);
                });
                break;
            case "www.theatlantic.com":
                doc.querySelectorAll(".c-cover-story__hed-link").forEach((e) => {
                    articleLinks.push(e.href);
                });

                doc.querySelectorAll("article h2 a").forEach((e) => {
                    articleLinks.push(e.href);
                });

                doc.querySelectorAll("article h3 a").forEach((e) => {
                    articleLinks.push(e.href);
                });

                doc.querySelectorAll(".c-popular__link").forEach((e) => {
                    articleLinks.push(e.href);
                });
                break;
            case "www.theonion.com":
                doc.querySelectorAll("article h4").forEach((e) => {
                    articleLinks.push(e.parentElement.href);
                });
                break;
        }

        chrome.storage.local.set({[url]: articleLinks}, () => {
            console.log(`Read in articles for ${url}`);
            console.log(articleLinks);
        });

        articleLinks.forEach((fullpath) => {
            if (fullpath.startsWith("https://" + url)) {
                getArticleDetails(url, fullpath, (title, article) => {
                    chrome.storage.local.set({[fullpath]: [title, article]});
                });
            }
        });
    };
    xhr.responseType = "document";
    xhr.open("GET", val);
    xhr.send();
});


function getArticleDetails(host, fullpath, callback) {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
        const doc = this.responseXML;

        var fullTitle = "";
        var fullArticle = "";

        console.log(`I AM AT ${fullpath}`);
        switch (host) {
            case "www.foxnews.com":
                fullTitle = doc.querySelector(".headline").textContent;
                doc.querySelectorAll(".article-body p").forEach((e) => {
                    fullArticle += e.textContent + "\n";
                });
                break;
            case "www.vox.com":
                fullTitle = doc.querySelector(".c-page-title").textContent;
                doc.querySelectorAll(".c-entry-content p").forEach((e) => {
                    fullArticle += e.textContent + "\n";
                });
                break;
            case "www.msnbc.com":
                fullTitle = doc.querySelector(".headline___CuovH").textContent;
                doc.querySelectorAll(".article-body p").forEach((e) => {
                    fullArticle += e.textContent + "\n";
                });
                break;
            case "www.breitbart.com":
                fullTitle = doc.querySelector(".the-article header h1").textContent;
                doc.querySelectorAll(".entry-content p").forEach((e) => {
                    fullArticle += e.textContent + "\n";
                });
                break;
            case "www.cnn.com":
                fullTitle = doc.querySelector(".pg-headline").textContent;
                doc.querySelectorAll(".zn-body__paragraph").forEach((e) => {
                    fullArticle += e.textContent + "\n";
                });
                break;
            case "www.wsj.com": //TODO CAN'T DO
                fullTitle = doc.querySelector(".wsj-article-headline").textContent;
                doc.querySelectorAll(".zn-body__paragraph").forEach((e) => {
                    fullArticle += e.textContent + "\n";
                });
                break;
            case "www.nytimes.com": //TODO CAN'T DO
                fullTitle = doc.querySelector(".pg-headline").textContent;
                doc.querySelectorAll(".zn-body__paragraph").forEach((e) => {
                    fullArticle += e.textContent + "\n";
                });
                break;
            case "www.infowars.com":
                fullTitle = doc.querySelector(".entry-title").textContent;
                doc.querySelectorAll("article p").forEach((e) => {
                    fullArticle += e.textContent + "\n";
                });
                break;
            case "www.theatlantic.com":
                fullTitle = doc.querySelector(".c-article-header__hed").textContent;
                doc.querySelectorAll(".l-article__section p").forEach((e) => {
                    fullArticle += e.textContent + "\n";
                });
                break;
            case "www.theonion.com":
                fullTitle = doc.querySelector("header a").textContent;
                doc.querySelectorAll(".js_post-content p").forEach((e) => {
                    fullArticle += e.textContent + "\n";
                });
                break;
        }

        console.log(`${fullTitle}`);
        console.log(`${fullArticle}`);
        callback(fullTitle, fullArticle);
    };
    xhr.responseType = "document";
    xhr.open("GET", fullpath);
    xhr.send();
}
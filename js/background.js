console.log("Hi there!");

const ALL_SITES = ["https://www.foxnews.com/", "https://www.vox.com/", "https://www.msnbc.com/", "https://www.breitbart.com/", "https://www.cnn.com/", "https://www.wsj.com/", "https://www.nytimes.com/", "https://www.infowars.com/", "https://www.theatlantic.com/", "https://www.theonion.com/", "https://www.bbc.com/"];

chrome.storage.local.clear();

ALL_SITES.forEach((val) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
        const doc = this.responseXML;
        const url = val.substring(12, val.length - 5);
        const articleLinks = [];
        switch (url) {
            case "foxnews":
                doc.querySelectorAll(".content a").forEach((e) => {
                    if (e.children.length === 0) articleLinks.push(e.href);
                });
                break;
            case "vox":
                doc.querySelectorAll(".c-entry-box--compact__title a").forEach((e) => {
                    articleLinks.push(e.href);
                });
                break;
            case "msnbc":
                doc.querySelectorAll(".showDot___34ZrJ a").forEach((e) => {
                    articleLinks.push(e.href);
                });
                break;
            case "breitbart":
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
            case "cnn": //TODO DOESN'T WORK
                doc.querySelectorAll(".cd__headline a").forEach((e) => {
                    articleLinks.push(e.href);
                });
                break;
            case "wsj":
                doc.querySelectorAll("article h3 a").forEach((e) => {
                    articleLinks.push(e.href);
                });
                break;
            case "nytimes":


                //TODO idk how 2 do plz help
                break;
            case "infowars":
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
            case "theatlantic":
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
            case "theonion":
                doc.querySelectorAll("article h4").forEach((e) => {
                    articleLinks.push(e.parentElement.href);
                });
                break;
        }

        var worthyArticles = [];
        articleLinks.forEach((fullpath, i) => {
            getArticleDetails(url, fullpath, (title, blurb, article) => {
                if (title !== "" && article !== "") {
                    console.log("===========================================");
                    console.log(`${fullpath}\n${title}\n${blurb}\n${article}`);
                    console.log("===========================================");

                    chrome.storage.local.set({[fullpath]: [title, blurb, article]});
                    worthyArticles.push(fullpath);
                }

                if (i === articleLinks.length - 1) {
                    chrome.storage.local.set({[url]: [worthyArticles, articleLinks]}, () => {
                        console.log(`Read in articles for ${url}`);
                        console.log(articleLinks);
                    });
                }
            });
        });
    };
    xhr.responseType = "document";
    xhr.open("GET", val);
    xhr.send();
});


function getArticleDetails(host, fullpath, callback) {
    console.log(`https://.*${host}`);
    console.log(fullpath);
    if (!new RegExp(`https://.*${host}`).test(fullpath)) return callback("", "", "");

    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
        const doc = this.responseXML;

        var fullTitle = "";
        var fullBlurb = "";
        var fullArticle = "";

        switch (host) {
            case "foxnews":
                fullTitle = elText(doc.querySelector(".headline"));
                doc.querySelectorAll(".article-body > p").forEach((e) => {
                    if (!e.textContent.startsWith("Get all the latest news on coronavirus")) {
                        fullArticle += e.textContent + "<br>";
                    }
                });
                fullBlurb = fullArticle.substring(0, 200).replace(/<br>/g, " ");
                break;
            case "vox":
                fullTitle = elText(doc.querySelector(".c-page-title"));
                fullBlurb = elText(doc.querySelector(".c-entry-summary"));
                doc.querySelectorAll(".c-entry-content p").forEach((e) => {
                    fullArticle += e.textContent + "<br>";
                });
                break;
            case "nbcnews":
            case "msnbc": //TODO NO TITLES
                fullTitle = elText(doc.querySelector(".headline___CuovH"));
                fullBlurb = elText(doc.querySelector(".articleDek"));
                doc.querySelectorAll(".article-body p").forEach((e) => {
                    fullArticle += e.textContent + "<br>";
                });
                break;
            case "breitbart":
                fullTitle = elText(doc.querySelector(".the-article header h1"));
                fullBlurb = elText(doc.querySelector(".subheading"));
                doc.querySelectorAll(".entry-content p").forEach((e) => {
                    fullArticle += e.textContent + "<br>";
                });
                break;
            case "cnn":
                fullTitle = elText(doc.querySelector(".pg-headline"));
                doc.querySelectorAll(".zn-body__paragraph").forEach((e) => {
                    fullArticle += e.textContent + "<br>";
                });
                fullBlurb = fullArticle.substring(0, 200).replace(/<br>/g, " ");
                break;
            case "wsj": //TODO CAN'T DO
                fullTitle = elText(doc.querySelector(".wsj-article-headline"));
                doc.querySelectorAll(".zn-body__paragraph").forEach((e) => {
                    fullArticle += e.textContent + "<br>";
                });
                fullBlurb = fullArticle.substring(0, 200).replace(/<br>/g, " ");
                break;
            case "nytimes": //TODO CAN'T DO
                fullTitle = elText(doc.querySelector(".pg-headline"));
                doc.querySelectorAll(".zn-body__paragraph").forEach((e) => {
                    fullArticle += e.textContent + "<br>";
                });
                fullBlurb = fullArticle.substring(0, 200).replace(/<br>/g, " ");
                break;
            case "infowars":
                fullTitle = elText(doc.querySelector(".entry-title"));
                fullBlurb = elText(doc.querySelector(".entry-subtitle"));
                doc.querySelectorAll("article p").forEach((e) => {
                    fullArticle += e.textContent + "<br>";
                });
                break;
            case "theatlantic":
                fullTitle = elText(doc.querySelector(".c-article-header__hed"));
                fullBlurb = elText(doc.querySelector(".c-dek"));
                doc.querySelectorAll(".l-article__section p").forEach((e) => {
                    fullArticle += e.textContent + "<br>";
                });
                break;
            case "theonion":
                fullTitle = elText(doc.querySelector("header a"));
                doc.querySelectorAll(".js_post-content p").forEach((e) => {
                    fullArticle += e.textContent + "<br>";
                });
                fullBlurb = fullArticle.substring(0, 200).replace(/<br>/g, " ");
                break;
        }

        callback(fullTitle, fullBlurb, fullArticle);
    };
    xhr.responseType = "document";
    xhr.open("GET", fullpath);
    xhr.send();
}

function elText(el) {
    return (el) ? el.textContent : "";
}

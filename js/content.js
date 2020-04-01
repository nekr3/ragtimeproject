const HOSTURL = document.location.host.split(".")[1];
const PAGEURL = document.location.protocol + "//" + document.location.host + document.location.pathname;

//if (confirm(`I AM HEREEEEE at ${HOSTURL}, ${PAGEURL}`)) {
chrome.storage.local.get("extOn", (data) => {
    if (data["extOn"]) {
        if (document.location.pathname === "/" || PAGEURL === "https://www.bbc.com/news") switchHomePage();
        else switchArticlePage();
    }
});

chrome.storage.local.get("lastLoad", (data) => {
    if (Date.now() - data["lastLoad"] > 30 * 60 * 1000) chrome.runtime.reload();
});

//}

function switchHomePage() {
    switch (HOSTURL) {
        case "foxnews":
            chrome.storage.local.get("cbsnews", (data) => {
                const articles = data["cbsnews"][0];

                var i = 0;
                document.querySelectorAll(".content a").forEach((e) => {
                    if (e.children.length === 0) {
                        console.log("looking for article " + articles[i]);

                        getArticleDetails(articles[i], (title, _, __) => {
                            e.textContent = title;
                        });

                        i = (i + 1) % articles.length;
                    }
                });
            });
            break;
        case "cbsnews":
            chrome.storage.local.get("foxnews", (data) => {
                const articles = data["foxnews"][0];
                var i = 0;
                document.querySelectorAll("article").forEach((e) => {
                    getArticleDetails(articles[i], (title, blurb, __) => {
                        elSet(e.querySelector(".item__hed"), "CHANGED" + title);
                        elSet(e.querySelector(".item__dek"), blurb);
                    });
                    i = (i + 1) % articles.length;
                });
            });
            break;
        case "vox":
            chrome.storage.local.get("theonion", (data) => {
                const articles = data["theonion"][0];

                var i = 0;
                document.querySelectorAll(".c-entry-box--compact__body").forEach((e) => {
                    console.log("looking for article " + articles[i]);

                    getArticleDetails(articles[i], (title, blurb, _) => {
                        elSet(e.querySelector(".c-entry-box--compact__title a"), title);
                        elSet(e.querySelector(".c-entry-box--compact__dek"), blurb);
                    });

                    i = (i + 1) % articles.length;
                });
            });
            break;
        case "theonion":
            chrome.storage.local.get("vox", (data) => {
                const articles = data["vox"][0];

                var i = 0;
                document.querySelectorAll("article").forEach((e) => {
                    getArticleDetails(articles[i], (title, blurb, _) => {
                        elSet(e.querySelector("h4"), title);
                        elSet(e.querySelector("p"), blurb);
                    });
                    i = (i + 1) % articles.length;
                });
            });
            break;
        case "msnbc":
            chrome.storage.local.get("infowars", (data) => {
                const articles = data["infowars"][0];

                var i = 0;
                document.querySelectorAll(".showDot___34ZrJ a").forEach((e) => {
                    getArticleDetails(articles[i], (title, _, __) => {
                        e.textContent = "CHANGED" + title;
                    });
                    i = (i + 1) % articles.length;
                });
            });
            break;
        case "infowars":
            chrome.storage.local.get("msnbc", (data) => {
                const articles = data["msnbc"][0];

                var i = 0;
                document.querySelectorAll(".title a").forEach((e) => {
                    getArticleDetails(articles[i], (title, _, __) => {
                        e.textContent = title;
                    });
                    i = (i + 1) % articles.length;
                });
                document.querySelectorAll(".title-ddd").forEach((e) => {
                    getArticleDetails(articles[i], (title, _, __) => {
                        e.textContent = title;
                    });
                    i = (i + 1) % articles.length;
                });
                document.querySelectorAll(".stansberry_item a").forEach((e) => {
                    getArticleDetails(articles[i], (title, _, __) => {
                        e.textContent = title;
                    });
                    i = (i + 1) % articles.length;
                });
                document.querySelectorAll(".article-content").forEach((e) => {
                    getArticleDetails(articles[i], (title, blurb, _) => {
                        elSet(e.querySelector("h3 a"), title);
                        elSet(e.querySelector("h4"), blurb);
                    });
                    i = (i + 1) % articles.length;
                });
            });
            break;
        case "breitbart":
            chrome.storage.local.get("bbc", (data) => {
                const articles = data["bbc"][0];

                var i = 0;
                document.querySelectorAll("article").forEach((e) => {
                    getArticleDetails(articles[i], (title, blurb, _) => {
                        elSet(e.querySelector("h2 a"), title);
                        elSet(e.querySelector(".excerpt p"), blurb);
                    });
                    i = (i + 1) % articles.length;
                });
                document.querySelectorAll("#BBTrendUL a").forEach((e) => {
                    getArticleDetails(articles[i], (title, _, __) => {
                        e.textContent = title;
                    });
                    i = (i + 1) % articles.length;
                });
                document.querySelectorAll("#DQSW em").forEach((e) => {
                    getArticleDetails(articles[i], (title, _, __) => {
                        e.textContent = title;
                    });
                    i = (i + 1) % articles.length;
                });
            });
            break;
        case "bbc":
            chrome.storage.local.get("breitbart", (data) => {
                const articles = data["breitbart"][0];
                var i = 0;
                document.querySelectorAll(".gs-c-promo-heading").forEach((e) => {
                    getArticleDetails(articles[i], (title, blurb, __) => {
                        elSet(e.querySelector(".gs-c-promo-heading__title"), title);
                        elSet(e.parentElement.querySelector(".gs-c-promo-summary"), blurb);
                    });
                    i = (i + 1) % articles.length;
                });
            });
            break;
        case "theatlantic":
            chrome.storage.local.get("economist", (data) => {
                const articles = data["economist"][0];

                var i = 0;
                document.querySelectorAll("article").forEach((e) => {
                    getArticleDetails(articles[i], (title, blurb, __) => {
                        elSet(e.querySelector("h2 a"), title);

                        elSet(e.querySelector("h3 a"), title);

                        elSet(e.querySelector("p"), title);
                    });

                    i = (i + 1) % articles.length;
                });

                document.querySelectorAll(".c-popular__link").forEach((e) => {
                    getArticleDetails(articles[i], (title, _, __) => {
                        e.textContent = title;
                    });
                    i = (i + 1) % articles.length;
                });


                document.querySelectorAll(".c-cover-story__content").forEach((e) => {
                    getArticleDetails(articles[i], (title, blurb, _) => {
                        elSet(e.querySelector("h1 a"), title);
                        elSet(e.querySelector("p"), blurb);
                    });
                    i = (i + 1) % articles.length;
                });
            });
            break;

        case "economist":
            chrome.storage.local.get("theatlantic", (data) => {
                const articles = data["theatlantic"][0];
                var i = 0;
                document.querySelectorAll(".teaser").forEach((e) => {
                    getArticleDetails(articles[i], (title, blurb, __) => {
                        elSet(e.querySelector(".teaser__text .teaser__headline"), title);
                        elSet(e.querySelector(".teaser__text .teaser__description"), blurb);
                    });
                    i = (i + 1) % articles.length;
                });
            });
            break;
        /*        case "cnn":
                    chrome.storage.local.get("breitbart", (data) => {
                        const articles = data["breitbart"][0];

                        var i = 0;
                        document.querySelectorAll(".cd__headline-text").forEach((e) => {
                            getArticleDetails(articles[i], (title, _, __) => {
                                e.textContent = title;
                            });
                            i = (i + 1) % articles.length;
                        });
                    });
                    break;
                case "wsj": //TODO DOESNT WORK
                    chrome.storage.local.get("bbc", (data) => {
                        const articles = data["bbc"][0];

                        var i = 0;
                        document.querySelectorAll("article").forEach((e) => {
                            getArticleDetails(articles[i], (title, _, __) => {
                                elSet(e.querySelector("h3 a"), title);
                            });
                            i = (i + 1) % articles.length;

                            getArticleDetails(articles[i], (title, _, __) => {
                                elSet(e.querySelector("p"), title)
                            });
                            i = (i + 1) % articles.length;
                        });
                    });
                    break;*/
    }
}

function switchArticlePage() {
    switch (HOSTURL) {
        case "foxnews":
            chrome.storage.local.get(["foxnews", "cbsnews"], (data) => {
                const cbs = data["cbsnews"][0];
                const fox = data["foxnews"][1];

                const nextArticle = cbs[fox.indexOf(PAGEURL) % cbs.length];
                getArticleDetails(nextArticle, (title, blurb, article) => {
                    elSet(document.querySelector(".headline"), title);
                    document.querySelectorAll(".article-body > p").forEach((e, i) => {
                        if (i === 0) e.innerHTML = article;
                        else elSet(e, "");
                    });
                });
            });
            break;
        case "cbsnews":
            chrome.storage.local.get(["cbsnews", "foxnews"], (data) => {
                const cbs = data["cbsnews"][1];
                const fox = data["foxnews"][0];

                const nextArticle = fox[cbs.indexOf(PAGEURL) % fox.length];
                getArticleDetails(nextArticle, (title, blurb, article) => {
                    elSet(document.querySelector(".content__title"), title);
                    document.querySelectorAll(".content__body p").forEach((e, i) => {
                        if (i === 0) e.innerHTML = article;
                        else elSet(e, "");
                    });
                });
            });
            break;
        case "vox":
            chrome.storage.local.get(["theonion", "vox"], (data) => {
                const onion = data["theonion"][0];
                const vox = data["vox"][1];

                const nextArticle = onion[vox.indexOf(PAGEURL) % onion.length];
                getArticleDetails(nextArticle, (title, blurb, article) => {
                    elSet(document.querySelector(".c-page-title"), title);
                    elSet(document.querySelector(".c-entry-summary"), blurb);
                    document.querySelectorAll(".c-entry-content p").forEach((e, i) => {
                        if (i === 0) e.innerHTML = article;
                        else elSet(e, "");
                    });
                });
            });
            break;
        case "theonion":
            chrome.storage.local.get(["vox", "theonion"], (data) => {
                const vox = data["vox"][0];
                const onion = data["theonion"][1];

                const nextArticle = vox[onion.indexOf(PAGEURL) % vox.length];
                getArticleDetails(nextArticle, (title, blurb, article) => {
                    elSet(document.querySelector("header a"), title);
                    document.querySelectorAll(".js_post-content p").forEach((e, i) => {
                        if (i === 0) e.innerHTML = article;
                        else elSet(e, "");
                    });
                });
            });
            break;
        case "nbcnews":
        case "msnbc":
            chrome.storage.local.get(["msnbc", "infowars"], (data) => {
                const info = data["infowars"][0];
                const msnbc = data["msnbc"][1];

                const nextArticle = info[msnbc.indexOf(PAGEURL) % info.length];
                getArticleDetails(nextArticle, (title, blurb, article) => {
                    elSet(document.querySelector(".headline___CuovH"), title);
                    elSet(document.querySelector(".articleDek"), blurb);
                    document.querySelectorAll(".article-body p").forEach((e, i) => {
                        if (i === 0) e.innerHTML = article;
                        else elSet(e, "");
                    });
                });
            });
            break;
        case "infowars":
            chrome.storage.local.get(["msnbc", "infowars"], (data) => {
                const msnbc = data["msnbc"][0];
                const info = data["infowars"][1];

                const nextArticle = msnbc[info.indexOf(PAGEURL) % msnbc.length];
                getArticleDetails(nextArticle, (title, blurb, article) => {
                    elSet(document.querySelector(".entry-title"), title);
                    elSet(document.querySelector(".entry-subtitle"), blurb);
                    document.querySelectorAll("article p").forEach((e, i) => {
                        if (i === 0) e.innerHTML = article;
                        else elSet(e, "");
                    });
                });
            });
            break;
        case "breitbart":
            chrome.storage.local.get(["bbc", "breitbart"], (data) => {
                const bbc = data["bbc"][0];
                const breitbart = data["breitbart"][1];

                const nextArticle = bbc[breitbart.indexOf(PAGEURL) % bbc.length];
                getArticleDetails(nextArticle, (title, blurb, article) => {
                    elSet(document.querySelector(".the-article header h1"), title);
                    elSet(document.querySelector(".subheading"), blurb);
                    document.querySelectorAll(".entry-content p").forEach((e, i) => {
                        if (i === 0) e.innerHTML = article;
                        else elSet(e, "");
                    });
                });
            });
            break;
        case "bbc":
            chrome.storage.local.get(["bbc", "breitbart"], (data) => {
                const breit = data["breitbart"][0];
                const bbc = data["bbc"][1];

                const nextArticle = breit[bbc.indexOf(PAGEURL) % breit.length];
                getArticleDetails(nextArticle, (title, blurb, article) => {
                    elSet(document.querySelector(".story-body__h1"), title);
                    document.querySelectorAll(".story-body__inner p").forEach((e, i) => {
                        if (i === 1) e.innerHTML = article; //Skip the intro that is bolded
                        else elSet(e, "");
                    });
                });
            });
            break;
        case "theatlantic":
            chrome.storage.local.get(["theatlantic", "economist"], (data) => {
                const eco = data["economist"][0];
                const atl = data["theatlantic"][1];

                const nextArticle = eco[atl.indexOf(PAGEURL) % eco.length];
                getArticleDetails(nextArticle, (title, blurb, article) => {
                    elSet(document.querySelector(".c-article-header__hed"), title);
                    elSet(document.querySelector(".c-dek"), blurb);
                    document.querySelectorAll(".l-article__section p").forEach((e, i) => {
                        if (i === 0) e.innerHTML = article;
                        else elSet(e, "");
                    });
                });
            });
            break;
        case "economist":
            chrome.storage.local.get(["economist", "theatlantic"], (data) => {
                const atl = data["theatlantic"][0];
                const econ = data["economist"][1];

                const nextArticle = atl[econ.indexOf(PAGEURL) % atl.length];
                getArticleDetails(nextArticle, (title, blurb, article) => {
                    elSet(document.querySelector(".article__headline"), title);
                    elSet(document.querySelector(".article__description"), blurb);
                    document.querySelectorAll(".article__body-text").forEach((e, i) => {
                        if (i === 0) e.innerHTML = article;
                        else elSet(e, "");
                    });
                });
            });
            break;
        /*        case "cnn":
                    chrome.storage.local.get(["cnn", "breitbart"], (data) => {
                        const breit = data["breitbart"][0];
                        const cnn = data["cnn"][1];

                        const nextArticle = breit[cnn.indexOf(PAGEURL) % breit.length];
                        getArticleDetails(nextArticle, (title, blurb, article) => {
                            elSet(document.querySelector(".pg-headline"), title);
                            document.querySelectorAll(".zn-body__paragraph").forEach((e, i) => {
                                if (i === 0) e.innerHTML = article;
                                else elSet(e, "");
                            });
                        });
                    });
                    break;
                case "wsj":
                    chrome.storage.local.get(["bbc", "wsj"], (data) => {
                        const bbc = data["bbc"][0];
                        const wsj = data["wsj"][1];

                        const nextArticle = bbc[wsj.indexOf(PAGEURL) % bbc.length];
                        getArticleDetails(nextArticle, (title, blurb, article) => {
                            elSet(document.querySelector(".wsj-article-headline"), title);
                            document.querySelectorAll(".zn-body__paragraph").forEach((e, i) => {
                                if (i === 0) e.innerHTML = article;
                                else elSet(e, "");
                            });
                        });
                    });
                    break;*/
    }
}

function getArticleDetails(fullpath, callback) {
    chrome.storage.local.get(fullpath, (data) => {
        console.log(fullpath);
        console.log(data[fullpath][0]);
        console.log(data[fullpath][1]);
        console.log(data[fullpath][2]);
        console.log(data[fullpath][3]);
        callback(data[fullpath][0], data[fullpath][1], data[fullpath][2], data[fullpath][3]);
    });
}

function elSet(el, text) {
    if (el) el.textContent = text;
}

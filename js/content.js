const HOSTURL = document.location.host.split(".")[1];
const PAGEURL = document.location.protocol + "//" + document.location.host + document.location.pathname;

//if (confirm(`I AM HEREEEEE at ${HOSTURL}, ${PAGEURL}`)) {
    if (document.location.pathname === "/") switchHomePage();
    else switchArticlePage();
//}

function switchHomePage() {
    switch (HOSTURL) {
        case "foxnews":
            //alert("hello?");
            chrome.storage.local.get("vox", (data) => {
                const articles = data["vox"][0];

                var i = 0;
                document.querySelectorAll(".content a").forEach((e) => {
                    if (e.children.length === 0) {
                        console.log("looking for article " + articles[i]);

                        getArticleDetails(articles[i], (title, _, __) => {
                            e.textContent = "CHANGED: " + title;
                        });

                        i = (i + 1) % articles.length;
                    }
                });
            });
            break;
        case "vox":
            //alert("hello?");
            chrome.storage.local.get("foxnews", (data) => {
                const articles = data["foxnews"][0];

                var i = 0;
                document.querySelectorAll(".c-entry-box--compact__body").forEach((e) => {
                    console.log("looking for article " + articles[i]);

                    getArticleDetails(articles[i], (title, blurb, _) => {
                        elSet(e.querySelector(".c-entry-box--compact__title a"), "CHANGED: " + title);
                        elSet(e.querySelector(".c-entry-box--compact__dek"), "BLURB: " + blurb);
                    });

                    i = (i + 1) % articles.length;
                });
            });
            break;
        case "msnbc":
            //alert("hello?");
            chrome.storage.local.get("breitbart", (data) => {
                const articles = data["breitbart"][0];

                var i = 0;
                document.querySelectorAll(".showDot___34ZrJ a").forEach((e) => {
                    getArticleDetails(articles[i], (title, _, __) => {
                        e.textContent = "CHANGED: " + title;
                    });
                    i = (i + 1) % articles.length;
                });
            });
            break;
        case "breitbart":
            //alert("hello?");
            chrome.storage.local.get("msnbc", (data) => {
                const articles = data["msnbc"][0];

                var i = 0;
                document.querySelectorAll("article").forEach((e) => {
                    getArticleDetails(articles[i], (title, blurb, _) => {
                        elSet(e.querySelector("h2 a"), "CHANGED: " + title);
                        elSet(e.querySelector(".excerpt p"), "BLURB: " + blurb);
                    });
                    i = (i + 1) % articles.length;
                });
                document.querySelectorAll("#BBTrendUL a").forEach((e) => {
                    getArticleDetails(articles[i], (title, _, __) => {
                        e.textContent = "CHANGED: " + title;
                    });
                    i = (i + 1) % articles.length;
                });
                document.querySelectorAll("#DQSW em").forEach((e) => {
                    getArticleDetails(articles[i], (title, _, __) => {
                        e.textContent = "CHANGED: " + title;
                    });
                    i = (i + 1) % articles.length;
                });
            });
            break;
        case "cnn":
            //alert("hello?");
            chrome.storage.local.get("wsj", (data) => {
                const articles = data["wsj"][0];

                var i = 0;
                document.querySelectorAll(".cd__headline-text").forEach((e) => {
                    getArticleDetails(articles[i], (title, _, __) => {
                        e.textContent = "CHANGED: " + title;
                    });
                    i = (i + 1) % articles.length;
                });
            });
            break;
        case "wsj": //TODO DOESNT WORK
            //alert("hello?");
            chrome.storage.local.get("cnn", (data) => {
                const articles = data["cnn"][0];

                var i = 0;
                document.querySelectorAll("article").forEach((e) => {
                    const a = e.querySelector("h3 a");
                    if (a) {
                        getArticleDetails(articles[i], (title, _, __) => {
                            a.textContent = "CHANGED: " + title;
                        });
                        i = (i + 1) % articles.length;
                    }
                    const b = e.querySelector("p");
                    if (b) {
                        getArticleDetails(articles[i], (title, _, __) => {
                            b.textContent = "CHANGED: " + title;
                        });
                        i = (i + 1) % articles.length;
                    }
                });
            });
            break;
        case "nytimes":
            //alert("hello?");
            chrome.storage.local.get("infowars", (data) => {

            });
            //TODO idk how 2 do plz help
            break;
        case "infowars":
            //alert("hello?");
            chrome.storage.local.get("nytimes", (data) => {
                const articles = data["nytimes"][0];

                var i = 0;
                document.querySelectorAll(".title a").forEach((e) => {
                    getArticleDetails(articles[i], (title, _, __) => {
                        e.textContent = "CHANGED: " + title;
                    });
                    i = (i + 1) % articles.length;
                });
                document.querySelectorAll(".title-ddd").forEach((e) => {
                    getArticleDetails(articles[i], (title, _, __) => {
                        e.textContent = "CHANGED: " + title;
                    });
                    i = (i + 1) % articles.length;
                });
                document.querySelectorAll(".stansberry_item a").forEach((e) => {
                    getArticleDetails(articles[i], (title, _, __) => {
                        e.textContent = "CHANGED: " + title;
                    });
                    i = (i + 1) % articles.length;
                });
                document.querySelectorAll(".article-content").forEach((e) => {
                    getArticleDetails(articles[i], (title, blurb, _) => {
                        elSet(e.querySelector("h3 a"), "CHANGED: " + title);
                        elSet(e.querySelector("h4"), "BLURB: " + blurb);
                    });
                    i = (i + 1) % articles.length;
                });
            });
            break;
        case "theatlantic":
            //alert("hello?");
            chrome.storage.local.get("theonion", (data) => {
                const articles = data["theonion"][0];

                var i = 0;
                document.querySelectorAll("article").forEach((e) => {
                    getArticleDetails(articles[i], (title, blurb, __) => {
                        elSet(e.querySelector("h2 a"), "CHANGED: " + title);

                        elSet(e.querySelector("h3 a"), "CHANGED: " + title);

                        elSet(e.querySelector("p"), "BLURB: " + title);
                    });

                    i = (i + 1) % articles.length;
                });

                document.querySelectorAll(".c-popular__link").forEach((e) => {
                    getArticleDetails(articles[i], (title, _, __) => {
                        e.textContent = "CHANGED: " + title;
                    });
                    i = (i + 1) % articles.length;
                });


                document.querySelectorAll(".c-cover-story__content").forEach((e) => {
                    getArticleDetails(articles[i], (title, blurb, _) => {
                        elSet(e.querySelector("h1 a"), "CHANGED: " + title);
                        elSet(e.querySelector("p"), "BLURB: " + blurb);
                    });
                    i = (i + 1) % articles.length;
                });
            });
            break;
        case "theonion":
            //alert("hello?");
            chrome.storage.local.get("theatlantic", (data) => {
                const articles = data["theatlantic"][0];

                var i = 0;
                document.querySelectorAll("article").forEach((e) => {
                    getArticleDetails(articles[i], (title, blurb, _) => {
                        elSet(e.querySelector("h4"), "CHANGED: " + title);
                        elSet(e.querySelector("p"), "BLURB: " + blurb);
                    });
                    i = (i + 1) % articles.length;
                });
            });
            break;
		case "bbc":
			//alert("beebeeceee");
			document.querySelectorAll(".media").forEach((e) => {
				elSet(e.querySelector(".media__content .media__link"), "hahahaha");
			});
			break;
		case "economist":
			alert("hello?");
			chrome.storage.local.get("bbc", (data) => {
				const articles = data["bbc"][0];
				var i = 0;
				getArticleDetails(articles[1], (title, blurb, __) => {alert(title);});
				document.querySelectorAll(".teaser__headline").forEach((e) => {
					getArticleDetails(articles[i], (title, blurb, __) => {
						elSet(e, "CHANGED: " + title);
						
						i = (i + 1) % articles.length;
					});
				});
			});
			break;
		case "cbsnews":
			//alert("hello?");
			document.querySelectorAll(".item__hed").forEach((e) => {
				elSet(e, "haha");
			});
			break;
    }
}

function switchArticlePage() {
    switch (HOSTURL) {
        case "foxnews":
            chrome.storage.local.get(["foxnews", "vox"], (data) => {
                const vox = data["vox"][0];
                const fox = data["foxnews"][1];

                const nextArticle = vox[fox.indexOf(PAGEURL) % vox.length];
                console.log(`REPLACING ${PAGEURL} WITH ${nextArticle}`);
                getArticleDetails(nextArticle, (title, blurb, article) => {
                    elSet(document.querySelector(".headline"), title);
                    document.querySelectorAll(".article-body > p").forEach((e, i) => {
                        if (i === 0) e.innerHTML = article;
                        else elSet(e, "");
                    });
                });
            });
            break;
        case "vox":
            chrome.storage.local.get(["foxnews", "vox"], (data) => {
                const fox = data["foxnews"][0];
                const vox = data["vox"][1];

                const nextArticle = fox[vox.indexOf(PAGEURL) % fox.length];
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
        case "nbcnews":
        case "msnbc":
            chrome.storage.local.get(["msnbc", "breitbart"], (data) => {
                const breitbart = data["breitbart"][0];
                const msnbc = data["msnbc"][1];

                const nextArticle = breitbart[msnbc.indexOf(PAGEURL) % breitbart.length];
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
        case "breitbart":
            chrome.storage.local.get(["msnbc", "breitbart"], (data) => {
                const msnbc = data["msnbc"][0];
                const breitbart = data["breitbart"][1];

                const nextArticle = msnbc[breitbart.indexOf(PAGEURL) % msnbc.length];
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
        case "cnn":
            chrome.storage.local.get(["cnn", "wsj"], (data) => {
                const wsj = data["wsj"][0];
                const cnn = data["cnn"][1];

                const nextArticle = wsj[cnn.indexOf(PAGEURL) % wsj.length];
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
            chrome.storage.local.get(["cnn", "wsj"], (data) => {
                const cnn = data["cnn"][0];
                const wsj = data["wsj"][1];

                const nextArticle = cnn[wsj.indexOf(PAGEURL) % cnn.length];
                getArticleDetails(nextArticle, (title, blurb, article) => {
                    elSet(document.querySelector(".wsj-article-headline"), title);
                    document.querySelectorAll(".zn-body__paragraph").forEach((e, i) => {
                        if (i === 0) e.innerHTML = article;
                        else elSet(e, "");
                    });
                });
            });
            break;
        case "nytimes":
            chrome.storage.local.get(["nytimes", "infowars"], (data) => {
                const info = data["infowars"][0];
                const nyt = data["nytimes"][1];

                const nextArticle = info[nyt.indexOf(PAGEURL) % info.length];
                getArticleDetails(nextArticle, (title, blurb, article) => {

                });
            });
            break;
        case "infowars":
            chrome.storage.local.get(["nytimes", "infowars"], (data) => {
                const nyt = data["nytimes"][0];
                const info = data["infowars"][1];

                const nextArticle = nyt[info.indexOf(PAGEURL) % nyt.length];
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
        case "theatlantic":
            chrome.storage.local.get(["theatlantic", "theonion"], (data) => {
                const onion = data["theonion"][0];
                const atl = data["theatlantic"][1];

                const nextArticle = onion[atl.indexOf(PAGEURL) % onion.length];
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
        case "theonion":
            chrome.storage.local.get(["theatlantic", "theonion"], (data) => {
                const atl = data["theatlantic"][0];
                const onion = data["theonion"][1];

                const nextArticle = atl[onion.indexOf(PAGEURL) % atl.length];
                getArticleDetails(nextArticle, (title, blurb, article) => {
                    elSet(document.querySelector("header a"), title);
                    document.querySelectorAll(".js_post-content p").forEach((e, i) => {
                        if (i === 0) e.innerHTML = article;
                        else elSet(e, "");
                    });
                });
            });
            break;
		case "bbc":
			alert("omg were at bbc now");
			break;
    }
}

function getArticleDetails(fullpath, callback) {
    chrome.storage.local.get(fullpath, (data) => {
        console.log(fullpath);
        console.log(data[fullpath][0]);
        console.log(data[fullpath][1]);
        console.log(data[fullpath][2]);
        callback(data[fullpath][0], data[fullpath][1], data[fullpath][2]);
    });
}

function elSet(el, text) {
    if (el) el.textContent = text;
}

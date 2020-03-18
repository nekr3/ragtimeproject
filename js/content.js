const WEBPAGEURL = document.location.host;

if (confirm(`I AM HEREEEEE at ${WEBPAGEURL}`)) {

    switch (WEBPAGEURL) {
        case "www.foxnews.com":
            alert("hello?");
            chrome.storage.local.get("www.vox.com", (data) => {
                const articles = data["www.vox.com"];

                var i = 0;
                document.querySelectorAll(".content a").forEach((e) => {
                    if (e.children.length === 0) {
                        e.textContent = articles[i];
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
                    e.querySelector(".c-entry-box--compact__title a").textContent = articles[i];
                    e.querySelector(".c-entry-box--compact__dek").textContent = articles[i];
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
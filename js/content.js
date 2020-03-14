const WEBPAGEURL = document.location.host;

if (confirm(`I AM HEREEEEE at ${WEBPAGEURL}`)) {

    var articles;
    switch (WEBPAGEURL) {
        case "www.foxnews.com":
            alert("hello?");

            document.querySelectorAll(".content a").forEach((e) => {
                if (e.children.length === 0) e.textContent = "oh no im gone :(";
            });
            break;
        case "www.vox.com":
            alert("hello?");

            document.querySelectorAll(".c-entry-box--compact__body").forEach((e) => {
                e.querySelector(".c-entry-box--compact__title a").textContent = "oh no im gone :(";
                e.querySelector(".c-entry-box--compact__dek").textContent = "Im a description!";
            });
            break;
        case "www.msnbc.com":
            alert("hello?");

            document.querySelectorAll(".cover-spread-tease__headline span:not(.icon)").forEach((e) => {
                e.textContent = "oh no im gone :(";
            });

            document.querySelectorAll(".twoByOne h3 a").forEach((e) => {
                e.textContent = "oh no im gone :(";
            });

            document.querySelectorAll(".cover-spread__headline").forEach((e) => {
                e.textContent = "Im a big headline!!!";
            });
            break;
        case "www.breitbart.com":
            alert("hello?");

            document.querySelectorAll("article h2 a").forEach((e) => {
                e.textContent = "oh no im gone :(";
            });
            document.querySelectorAll("#BBTrendUL a").forEach((e) => {
                e.textContent = "oh no im gone :(";
            });
            document.querySelectorAll("#DQSW em").forEach((e) => {
                e.textContent = "side article :)";
            });
            break;
        case "www.cnn.com":
            alert("hello?");

            document.querySelectorAll(".cd__headline-text").forEach((e) => {
                e.textContent = "oh no im gone :(";
            });
            break;
        case "www.wsj.com": //DOESNT WORK
            alert("hello?");

            document.querySelectorAll("article").forEach((e) => {
                e.querySelector("h3 a").textContent = "oh no im gone :(";
                e.querySelector("p").textContent = "Im a description!";
            });
            break;
        case "www.nytimes.com":
            alert("hello?");

            //idk how 2 do plz help
            break;
        case "www.infowars.com":
            alert("hello?");

            document.querySelectorAll(".title a").forEach((e) => {
                e.textContent = "oh no im gone :(";
            });
            document.querySelectorAll(".title-ddd").forEach((e) => {
                e.textContent = "oh no im gone :(";
            });
            document.querySelectorAll(".stansberry_item a").forEach((e) => {
                e.textContent = "wtf is a stansberry";
            });
            document.querySelectorAll(".article-content").forEach((e) => {
                e.querySelector("h3 a").textContent = "Hi im a title!";
                e.querySelector("h4").textContent = "im a baby summary";
            });
            break;
        case "www.theatlantic.com":
            alert("hello?");

            document.querySelectorAll(".c-cover-story__content").forEach((e) => {
                e.querySelector("h1 a").textContent = "BIG TITLE";
                e.querySelector("p").textContent = "im also big!";
            });

            document.querySelectorAll("article").forEach((e) => {
                const a = e.querySelector("h2 a");
                if (a) a.textContent = "baby title";

                const b = e.querySelector("p");
                if (b) b.textContent = "sorta big";

                const c = e.querySelector("h3 a");
                if (c) c.textContent = "hallo";
            });

            document.querySelectorAll(".c-popular__link").forEach((e) => {
                e.textContent = "oh no im gone :(";
            });
            break;
        case "www.theonion.com":
            alert("hello?");

            document.querySelectorAll("article").forEach((e) => {
                const a = e.querySelector("h4");
                if (a) a.textContent = "BIG TITLE";

                const b = e.querySelector("p");
                if (b) b.textContent = "im also big!";
            });
            break;
    }
}
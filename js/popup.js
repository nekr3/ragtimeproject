window.onload = function () {
    const btn = document.querySelector("button")
    btn.onclick = function () {
        chrome.storage.local.get("extOn", (data) => {
            var toggled = (data["extOn"] !== undefined) ? data["extOn"] : true;
            chrome.storage.local.set({"extOn": !toggled}, () => {
                setBtn(btn)
            });
        });
    };

    document.querySelectorAll("a").forEach((e) => {
        e.onclick = function () {
            chrome.tabs.create({"url": e.href});
            return false;
        }
    });

    setBtn(btn);
};

function setBtn(btn) {
    chrome.storage.local.get("extOn", (data) => {
        var extOn = (data["extOn"] !== undefined) ? data["extOn"] : true;
        if (!extOn) btn.textContent = "Turn On";
        else btn.textContent = "Turn Off";
    });
}
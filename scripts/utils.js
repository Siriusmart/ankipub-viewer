async function fetchJSON(url) {
    try {
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        alert(`Fetch failed ${url}`);
    }
}

async function fetchText(url) {
    try {
        const response = await fetch(url);
        return await response.text();
    } catch (error) {
        alert(`Fetch failed ${url}`);
    }
}

function fetchTexts(urls) {
    return urls.map(fetchText);
}

function loaded() {
    document.getElementById("loading").hidden = true;
}

function downloadDeck(name) {
    const link = document.createElement("a");
    link.href = `./${name}.apkg`;
    link.download = `${name}.apkg`;
    link.click();
}

async function addDownload() {
    let url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    let index = await fetchJSON("./packages.json");
    let packageDownload = index[params.get("package")];

    if (packageDownload === undefined || packageDownload.download === undefined) {
        return;
    }

    let footer = document.getElementById("footer");
    let a = document.createElement("a");
    a.innerText = "Download";
    a.href = packageDownload.download;
    a.download = packageDownload.download;
    let space = document.createTextNode("\u00A0");
    footer.prepend(a, space);
}

function addTheme() {
    let footer = document.getElementById("footer");
    let a = document.createElement("a");
    a.innerText = "Theme";
    a.href = "./"
    a.addEventListener("click", e => {
        e.preventDefault();
        const url = new URL(window.location.href);
        if (url.pathname.endsWith("dark.html"))
            url.pathname = ""
        else
            url.pathname = "dark.html"

        window.location.href = url
    });
    footer.prepend(a);
}

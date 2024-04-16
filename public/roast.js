function reset() {
    document.querySelector("#screenshot").classList.add("hidden");
    document.querySelector("#response").classList.add("hidden");
    document.querySelector("#screenshot img").classList.add("hidden");
    document.querySelector("#response #airesponse").innerHTML = "";
}

function sendRequest() {
    reset();
    const url = document.querySelector("#urlInput").value;
    const roastBtn = document.querySelector("#roastBtn");
    roastBtn.disabled = true;
    document.querySelector("#screenshot").classList.remove("hidden");
    document.querySelector("#screenshot .loading").classList.remove("hidden");
    fetch("/screenshot?url=" + encodeURIComponent(url))
        .then((response) => response.json())
        .then((data) => {
            document.querySelector("#screenshot .loading").classList.add("hidden");
            document.querySelector("#screenshot img").classList.remove("hidden");
            document.querySelector("#screenshot img").src = data.screenshot;
        })
        .then((data) => {
            document.querySelector("#response").classList.remove("hidden");
            document.querySelector("#response .loading").classList.remove("hidden");
            const roastStyle = document.querySelector("#roastStyle").value;
            fetch("/roast?url=" + encodeURIComponent(url) + "&roastStyle=" + encodeURIComponent(roastStyle))
                // .then((response) => response.json())
                .then((response) => {
                    const reader = response.body.getReader();//.pipeThrough(new TextDecoderStream());
                    reader.read().then(function pump({ done, value }) {
                        if (done) {
                            // console.log("done");
                            return;
                        }
                        // console.log(new TextDecoder().decode(value));
                        // Otherwise do something here to process current chunk
                        document.querySelector("#response .loading").classList.add("hidden");
                        document.querySelector("#response #airesponse").innerHTML += new TextDecoder().decode(value);
                        // Read some more, and call this function again
                        return reader.read().then(pump);
                    });
                })
                .catch((error) => console.log(error))
                .finally(() => roastBtn.disabled = false);
        })
        .catch((error) => console.log(error))
        .finally(() => roastBtn.disabled = false);
}
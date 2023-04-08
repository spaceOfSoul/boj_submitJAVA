const languege = document.querySelector("#language_chosen > a > span");

console.log('execute');

function pasteCodeToCodeMirror(name, code) {
    chrome.runtime.sendMessage({
        type: 'pasteCodeToCodeMirror',
        name: name,
        code: code
    });
}

document.addEventListener('paste', (e) => {
    e.preventDefault();
    // console.log(e);
    // console.log(languege.innerText);

    if (languege.innerText.substr(0, 4) != "Java")
        return;

    let paste_txt = (e.clipboardData || window.clipboardData).getData("text");
    txt_list = paste_txt.split('\n');
    // console.log(txt_list);
    paste_txt = "";
    for (let i = 0; i < txt_list.length; i++) {
        let txt = txt_list[i];
        if (txt.indexOf('package ') === 0) {
            continue;
        } else if (txt.indexOf('public class ') === 0) {
            txt = "public class Main {";
        }
        paste_txt += txt + "\n";
    }
    pasteCodeToCodeMirror("source", paste_txt);
    console.log("?")
});
const languege = document.querySelector("#language_chosen > a > span");
const codemirror = document.getElementsByName("source");

console.log('execute');

const pasteCodeToCodeMirror = new Function('name', 'code', `
const codemirro_instance = OnlineJudgeCodeMirror.get(name);
if (codemirro_instance) {
    codemirro_instance.setValue(code);
} else {
    console.error('codemirror 인스턴스가 없습니다.');
}
`);

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
    // codemirror.setValue("asd");
    console.log(codemirror);
});
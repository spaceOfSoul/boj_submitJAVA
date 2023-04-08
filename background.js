chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === 'pasteCodeToCodeMirror') {
        const { name, code } = request;
        const codeToExecute = function() {
            const CodeMirrorInstance = OnlineJudgeCodeMirror.get(name);
            if (CodeMirrorInstance) {
                CodeMirrorInstance.setValue(code);
            }
        };

        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const activeTab = tabs[0];
            chrome.scripting.executeScript({
                target: { tabId: activeTab.id },
                function: codeToExecute,
            });
        });
    }
});
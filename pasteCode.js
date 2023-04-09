const codemirro_instance = OnlineJudgeCodeMirror.get(name);
if (codemirro_instance) {
    codemirro_instance.setValue(code);
} else {
    console.error('codemirror 인스턴스가 없습니다.');
}
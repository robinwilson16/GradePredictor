function doQuestionModalAction() {
    let changesNeedSaving = document.getElementById("QuestionModalAnswerID");

    if (changesNeedSaving.value === "Y") {
        $("#SaveButtonBottom").trigger("click");
    }
    else if (changesNeedSaving.value === "N") {
        changesNeedSaving.value = "N";
        loadingBox.style.display = "flex";
        window.location.href = "/";
    }
    else {

    }
}
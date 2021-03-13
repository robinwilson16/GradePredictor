const commentSummaryMaxLength = 20;

attachListFunctions(
    "EditStudentButton"
);

var loadingBox = document.getElementById('LoadingAnimation');
loadingBox.style.display = "flex";
getStudentData();

//var modalNote = document.getElementById('ModalNote');
//modalNote.addEventListener('shown.bs.modal', function () {
$('#ModalNote').on('shown.bs.modal', function () {
    let enrolmentID = document.getElementById("EnrolmentID").value;
    let currentComment = $("#Comment-" + enrolmentID).val();
    let activeNoteText = document.getElementById("ActiveNoteText");
    let formTitle = $("#FormTitleID").val();

    activeNoteText.value = currentComment;

    if (!formTitle) {
        formTitle = "Prediction for Student";
    }

    $("#ModalNoteLabel").find(".title").html(formTitle);
    $("#FormTitleID").val("");
});

$('#ModalNote').on('hidden.bs.modal', function () {
    let enrolmentID = document.getElementById("EnrolmentID").value;
    let currentCommentBox = $("#Comment-" + enrolmentID);
    let currentCommentIntroBox = $("#CommentIntro-" + enrolmentID);
    let activeNoteText = document.getElementById("ActiveNoteText");

    let currentCommentIntroText = activeNoteText.value;
    if (currentCommentIntroText.length > commentSummaryMaxLength) {
        currentCommentIntroText = currentCommentIntroText.substring(0, commentSummaryMaxLength) + "...".trimEnd();
    }

    currentCommentBox.val(activeNoteText.value);
    currentCommentIntroBox.html(currentCommentIntroText);
    activeNoteText.value = "";
});

var timelyMeasuresButton = document.querySelectorAll('.TimelyMeasuresButton');
timelyMeasuresButton.forEach(function (button) {
    button.addEventListener('click', function (event) {
        let title = `Timely Measures`;
        let content = `
            <ul class="list-group">
              <li class="list-group-item">The timely QAR calculation uses the planned end year of the learning aim.</li>
              <li class="list-group-item">This calculation measures the number of aims achieved on or before their planned end date, or no more than 90 days after it, as a percentage of the number of aims planned to complete in the reporting year.</li>
              <li class="list-group-item">The QAR does not count achieved aims with an actual end date more than 90 days after the planned end date as achievements in the timely method.</li>
            </ul>
            <p></p>
            <div class="alert alert-success" role="alert">
                <a href="https://www.gov.uk/government/publications/qualification-achievement-rates-qar-2019-to-2020" title="QAR Rules" target="_blank" rel="noopener">Click here</a> to view the QAR Rules on the GOV.uk website
            </div>`;

        doModal(title, content);
    });
});

var overallMeasuresButton = document.querySelectorAll('.OverallMeasuresButton');
overallMeasuresButton.forEach(function (button) {
    button.addEventListener('click', function (event) {
        let title = `Overall Measures`;
        let content = `
            The overall QAR, pass rate and retention rate calculations use the hybrid end year of the learning aim. The hybrid end year is the latter of the: 
            <ul class="list-group">
              <li class="list-group-item">A. Achievement year (for apprenticeship standards on funding model 36 only)</li>
              <li class="list-group-item">B. Planned end year of the learning aim</li>
              <li class="list-group-item">C. Actual end year of the learning aim d reporting year</li>
            </ul>
            <p></p>
            <div class="alert alert-success" role="alert">
                <a href="https://www.gov.uk/government/publications/qualification-achievement-rates-qar-2019-to-2020" title="QAR Rules" target="_blank" rel="noopener">Click here</a> to view the QAR Rules on the GOV.uk website
            </div>`;

        doModal(title, content);
    });
});

var clearCommentButton = document.querySelectorAll('.ClearCommentButton');
clearCommentButton.forEach(function (button) {
    button.addEventListener('click', function (event) {
        let activeNoteText = document.getElementById("ActiveNoteText");
        activeNoteText.value = "";
    });
});

var backButton = document.querySelectorAll('.BackButton');
backButton.forEach(function (button) {
    button.addEventListener('click', function (event) {
        goBack();
    });
});

var saveButton = document.querySelectorAll('.SaveButton');
saveButton.forEach(function (button) {
    button.addEventListener('click', function (event) {
        saveData();
    });
});

function goBack() {
    let hasUnsavedChanges = document.getElementById("HasUnsavedChangesID").value;
    //window.location.href = "/";
    if (hasUnsavedChanges === "Y") {
        askSaveChanges();
    }
    else {
        loadingBox.style.display = "flex";
        window.location.href = "/";
    }
}

function askSaveChanges() {
    let title = `Would You Like to Save?`;
    let text = `
    You have unsaved changes on this screen.<br />
    Would you like to save these changes to ProSolution ?`;
    let size = ``;
    let id = `SaveChangesQuestion`;

    doQuestionModal(title, text, size, id);
}

async function saveData() {
    let antiForgeryTokenID = $("#AntiForgeryTokenID").val();
    let academicYearID = document.getElementById("AcademicYearID").value;
    let students = JSON.parse(window.localStorage.getItem("students"));
    let studentTable = document.getElementById("StudentList");

    let recordsSaved = 0;
    let recordsInvalid = 0;
    let recordsFailed = 0;
    let validationErrors = `<ul class="list-group">`;

    //To validate the selected datalist item is a valid selection
    let predictedGradeItems = document.getElementById("PredictedGradeID").innerHTML;

    for (let row of studentTable.rows) {
        if (row.id) {
            //Get form values
            let enrolmentID = Number.parseInt(row.id);
            let predictedToAchieveFld = row.querySelector(".PredictedToAchieve");
            let predictedToAchieveVal = predictedToAchieveFld.value;
            let predictedToAchieveByFld = row.querySelector(".PredictedToAchieveBy");
            let predictedToAchieveByVal = Number.parseInt(predictedToAchieveByFld.value);
            let predictedToAchieveByText = predictedToAchieveByFld.options[predictedToAchieveByFld.selectedIndex].text;
            let predictedGradeFld = row.querySelector(".PredictedGrade");
            let predictedGradeVal = predictedGradeFld.value;
            let commentFld = row.querySelector(".Comment");
            let commentVal = commentFld.value;

            let predictedToAchieveBool = null;
            if (predictedToAchieveVal === "Y") {
                predictedToAchieveBool = true;
            }
            else if (predictedToAchieveVal === "N") {
                predictedToAchieveBool = false;
            }

            if (isNaN(predictedToAchieveByVal)) {
                predictedToAchieveByVal = null;
            }

            if (predictedGradeVal === "") {
                predictedGradeVal = null;
            }

            if (commentVal === "") {
                commentVal = null;
            }

            let commentIntro = commentVal;
            if (commentIntro && commentIntro.length > commentSummaryMaxLength) {
                commentIntro = commentIntro.substring(0, commentSummaryMaxLength) + "...".trimEnd();
            }

            //Find out if values have changed
            for (let student of students) {
                if (enrolmentID === Number.parseInt(student.enrolmentID)) {
                    if (predictedToAchieveBool !== student.predictedToAchieve || predictedToAchieveByVal !== student.predictedToAchieveBy || predictedGradeVal !== student.predictedGrade || commentVal !== student.comment) {
                        //Data has changed so need to save and also update cached data
                        let recordValid = true;

                        //Check if data is valid
                        if (predictedGradeVal !== null && !predictedGradeItems.includes(predictedGradeVal)) {
                            recordValid = false;
                            validationErrors += `
                                <li class="list-group-item list-group-item-warning">
                                    <strong>${student.forename} ${student.surname}</strong> has been given an invalid grade of: <code>${predictedGradeVal}</code>.
                                </li>`;
                            predictedGradeFld.classList.add("is-invalid");
                        }
                        if (predictedToAchieveBool === true && predictedToAchieveByVal === null) {
                            recordValid = false;
                            validationErrors += `
                                <li class="list-group-item list-group-item-warning">
                                    <strong>${student.forename} ${student.surname}</strong> has been recorded as achieved but the date predicted to achieve by has not been set.
                                </li>`;
                            predictedToAchieveByFld.classList.add("is-invalid");
                        }
                        if (predictedToAchieveBool === false && predictedToAchieveByVal !== null) {
                            recordValid = false;
                            validationErrors += `
                                <li class="list-group-item list-group-item-warning">
                                    <strong>${student.forename} ${student.surname}</strong> has been recorded as not achieved but the date predicted to achieve by has been set as <code>${predictedToAchieveByText}</code>.
                                </li>`;
                            predictedToAchieveByFld.classList.add("is-invalid");
                        }
                        if (predictedToAchieveBool === false && commentVal === null) {
                            recordValid = false;
                            validationErrors += `
                                <li class="list-group-item list-group-item-warning">
                                    <strong>${student.forename} ${student.surname}</strong> has been recorded as not achieved but no comment has been entered to explain why.
                                </li>`;
                            predictedToAchieveFld.classList.add("is-invalid");
                        }
                        if (predictedToAchieveBool === true && (predictedGradeVal === "FL" || predictedGradeVal === "U")) {
                            recordValid = false;
                            validationErrors += `
                                <li class="list-group-item list-group-item-warning">
                                    <strong>${student.forename} ${student.surname}</strong> has been recorded as achieved but the grade has been recorded as a fail: <code>${predictedGradeVal}</code>.
                                </li>`;
                            predictedToAchieveFld.classList.add("is-invalid");
                        }

                        //Set default values
                        if (recordValid === true) {
                            if (predictedToAchieveBool === false && predictedGradeVal === null) {
                                let failGrade = "FL";
                                let predictedGradeLookupTypeID = document.getElementById("PredictedGradeLookupTypeID").value;

                                if (predictedGradeLookupTypeID.indexOf("ALEVEL") === true || predictedGradeLookupTypeID.indexOf("GCSE") === true) {
                                    failGrade = "U";
                                }

                                predictedGradeVal = failGrade;
                                predictedGradeFld.value = failGrade;
                            }
                        }

                        //alert(`
                        //    PredictedToAchieve New(${predictedToAchieveBool}) Old(${student.predictedToAchieve})
                        //    PredictedToAchieveBy New(${predictedToAchieveByVal}) Old(${student.predictedToAchieveBy})
                        //    PredictedGrade New(${predictedGradeVal}) Old(${student.predictedGrade})
                        //    Comment New(${commentVal}) Old(${student.comment})
                        //`);
                        let result = null;
                        if (recordValid === true) {
                            result = await saveRecord(academicYearID, enrolmentID, predictedToAchieveBool, predictedToAchieveByVal, predictedGradeVal, commentVal, antiForgeryTokenID);
                        }
                        
                        if (recordValid === false) {
                            recordsInvalid += 1;
                        }
                        else if (result === 1) {
                            recordsSaved += 1;

                            student.predictedToAchieve = predictedToAchieveBool;
                            student.predictedToAchieveBy = predictedToAchieveByVal;
                            student.predictedGrade = predictedGradeVal;
                            student.comment = commentVal;
                            students[student] = student;
                        }
                        else {
                            recordsFailed += 1;
                        }
                    }
                }
            }
        }
    }
    validationErrors += `</ul>`;

    //Update cached data if any changes
    if (recordsSaved + recordsFailed > 0) {
        window.localStorage.setItem("students", JSON.stringify(students));

        hasUnsavedChanges = document.getElementById("HasUnsavedChangesID");
        hasUnsavedChanges.value = "N";

        //Shouldn't be needed as updating storage above but Datatables uses cached version if not added too
        //getStudentData();
    }

    if (recordsFailed > 0) {
        console.log(`Number of Enrolments Invalid: ${recordsInvalid}`);
        let audio = new Audio("/sounds/error.wav");
        audio.play();

        let title = `Error Saving Data for ${recordsFailed} enrolments`;
        let content = ``;

        if (recordsSaved === 0) {
            content = `All ${recordsFailed} records failed to save.<br />Please try again.`;
        }
        else {
            content = `Only ${recordsSaved} records saved successfully and ${recordsFailed} records failed to save.<br />Please try again.`;
        }

        if (recordsInvalid > 0) {
            content += `
                The following records were also invalid and have not been saved. Please correct these errors and save again:
                ${validationErrors}`;
        }

        doErrorModal(title, content);
    }
    else if (recordsInvalid > 0) {
        console.log(`Number of Enrolments Invalid: ${recordsInvalid}`);
        let audio = new Audio("/sounds/error.wav");
        audio.play();

        let title = `Error saving ${recordsInvalid} records as they have invalid data`;
        let content = `
            The following records were invalid and have not been saved. Please correct these errors and save again:
            ${validationErrors}`;

        doModal(title, content);
    }
    else if (recordsSaved === 0) {
        console.log(`Enrolments saved successfully`);
        let audio = new Audio("/sounds/confirm.wav");
        audio.play();

        let title = `No Changes Made`;
        let content = `
            There were no changes to save.<br />
            No data has been changed in ProSolution.`;

        doModal(title, content);
    }
    else {
        console.log(`Enrolments saved successfully`);
        let audio = new Audio("/sounds/confirm.wav");
        audio.play();

        let title = `Changes for ${recordsSaved} Students Updated`;
        let content = `Changes for ${recordsSaved} Students have been successfully updated within ProSolution`;
        doModal(title, content);
    }
}

function saveRecord(academicYearID, enrolmentID, predictedToAchieve, predictedToAchieveBy, predictedGrade, comment, antiForgeryTokenID) {
    return new Promise(resolve => {
        let academicYear = academicYearID.replace("/", "-");

        let recordsSaved = 0;
        let recordsFailed = 0;

        let submitLocation = `/Enrolments/Edit/${academicYear}/${enrolmentID}/`;

        $.ajax({
            type: "POST",
            url: submitLocation,
            beforeSend: function (xhr) {
                xhr.setRequestHeader("RequestVerificationToken", antiForgeryTokenID);
            },
            data: {
                'Enrolment.PredictedToAchieve': predictedToAchieve,
                'Enrolment.PredictedToAchieveBy': predictedToAchieveBy,
                'Enrolment.PredictedGrade': predictedGrade,
                'Enrolment.Comment': comment,
                '__RequestVerificationToken': antiForgeryTokenID
            },
            success: function (data) {
                if (data.isSuccessful !== false) {
                    console.log(`${submitLocation}: Enrolment ${enrolmentID} updated`);
                    recordsSaved += 1;
                }
                else {
                    console.error(`${submitLocation}: Enrolment ${enrolmentID} failed to be updated due to the error: ${data.errorDescription}`);
                    recordsFailed += 1;
                }
                resolve(1);
            },
            error: function (error) {
                console.error(`${submitLocation}: Enrolment ${enrolmentID} failed to be updated`);
                recordsFailed += 1;
                resolve(0);
            }
        });
    });
}

async function getStudentData() {
    //Save student data into local browser storage
    let rootPath = $("#RootPath").val();
    if (!rootPath) {
        rootPath = ``;
    }

    let academicYearID = document.getElementById("AcademicYearID").value;
    let courseCode = document.getElementById("CourseCodeID").value;
    let groupCode = document.getElementById("GroupCodeID").value;

    let academicYear = academicYearID.replace("/", "-");

    let studentData = `${rootPath}/Students/${academicYear}/${courseCode}/`;

    if (groupCode != "") {
        studentData += `${groupCode}/`;
    }

    studentData += `?handler=Json`;

    let dataToLoad = studentData;

    loadData("GET", dataToLoad)
        .then(data => {
            try {
                window.localStorage.setItem("students", data);
                console.log(dataToLoad + " Loaded");
            }
            catch (e) {
                doErrorModal("Error Storing Data in Browser", "Sorry an error occurred storing data in your web browser. Please check the local storage settings and your available disk space.");
            }
        });
}

function loadData(method, url) {
    //url = `${url}&${new Date().getTime()};`
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.setRequestHeader("Cache-Control", "no-cache, no-store, max-age=0");
        xhr.onload = function () {
            if (this.status >= 200 && this.status < 300) {
                resolve(xhr.response);
            } else {
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                });
            }
        };
        xhr.onerror = function () {
            reject({
                status: this.status,
                statusText: xhr.statusText
            });
        };
        xhr.send();
    });
}

$(function () {
    //$.extend($.fn.dataTable.defaults, {
    //    language: {
    //        processing: '<div class="col text-center LoadingArea"><i class="fas fa-spinner fa-spin"></i></div>'
    //    }
    //});

    let rootPath = $("#RootPath").val();
    if (!rootPath) {
        rootPath = ``;
    }

    let academicYearID = document.getElementById("AcademicYearID").value;
    let courseCode = document.getElementById("CourseCodeID").value;
    let groupCode = document.getElementById("GroupCodeID").value;

    let academicYear = academicYearID.replace("/", "-");

    let studentData = `${rootPath}/Students/${academicYear}/${courseCode}/`;

    if (groupCode != "") {
        studentData += `${groupCode}/`;
    }

    studentData += `?handler=Json`;

    console.log(studentData + " Loaded");

    let students = JSON.parse(window.localStorage.getItem("students"));

    StudentListDT = $('#StudentList').DataTable({
        dom: '<"row"<"col-md"l><"col-md"f>>rt<"row"<"col-md"ip><"col-md text-right"B>>',
        buttons: [
            {
                extend: 'colvis',
                text: '<i class="fas fa-columns"></i> Columns'
            },
            {
                extend: 'copyHtml5',
                text: '<i class="far fa-copy"></i> Copy',
                exportOptions: {
                    columns: ':visible'
                }
            },
            {
                extend: 'excelHtml5',
                text: '<i class="far fa-file-excel"></i> Excel',
                exportOptions: {
                    columns: ':visible'
                }
            },
            {
                extend: 'csvHtml5',
                text: '<i class="fas fa-file-csv"></i> CSV',
                exportOptions: {
                    columns: ':visible'
                }
            },
            {
                extend: 'pdfHtml5',
                text: '<i class="far fa-file-pdf"></i> PDF',
                exportOptions: {
                    columns: ':visible'
                }
            },
            {
                extend: 'print',
                text: '<i class="fas fa-print"></i> Print',
                exportOptions: {
                    columns: ':visible'
                }
            }
        ],
        //sDom: "fprtp", 
        processing: true,
        responsive: true, //Add this
        //language: {
        //    processing: '<i class="fa fa-spinner fa-spin fa-3x fa-fw"></i><span class="sr-only">Loading...</span>'
        //},
        serverSide: false,
        colReorder: true,
        deferRender: true,
        scroller: true,
        scrollY: 300,
        ajax: {
            url: studentData,
            dataSrc: ""
        },
        //Use existing JSON data
        //data: students,
        rowId: "enrolmentID",
        createdRow: function (row, data, dataIndex) {
            if (data.predictedToAchieve === true) {
                $(row).addClass('table-success');
            }
            else if (data.predictedToAchieve === false) {
                $(row).addClass('table-danger');
            }
        },
        columns: [
            {
                data: {
                    _: "studentRef",
                    sort: "studentRef",
                    filter: "studentRef"
                }
            },
            {
                data: {
                    _: "surname",
                    sort: "surname",
                    filter: "surname"
                }
            },
            {
                data: {
                    _: "forename",
                    sort: "forename",
                    filter: "forename"
                }
            },
            {
                data: {
                    _: "groupCode",
                    sort: "groupCode",
                    filter: "groupCode"
                },
                className: "text-center"
            },
            {
                data: {
                    _: "completionStatusName",
                    sort: "completionStatusName",
                    filter: "completionStatusName"
                }
            },
            {
                data: {
                    _: "attendPer",
                    sort: "attendPer",
                    filter: "attendPer",
                    display: stuAttendPer
                },
                className: "align-middle"
            },
            {
                data: {
                    _: "startDate",
                    sort: "startDate",
                    filter: "startDate",
                    display: stuStartDate
                },
                className: "text-center"
            },
            {
                data: {
                    _: "expEndDate",
                    sort: "expEndDate",
                    filter: "expEndDate",
                    display: stuExpEndDate
                },
                className: "text-center"
            },
            {
                data: {
                    _: "predictedToAchieve",
                    sort: "predictedToAchieve",
                    filter: "predictedToAchieve",
                    display: stuPredictedToAchieve
                }
            },
            {
                data: {
                    _: "predictedToAchieveBy",
                    sort: "predictedToAchieveBy",
                    filter: "predictedToAchieveBy",
                    display: stuPredictedToAchieveBy
                }
            },
            {
                data: {
                    _: "predictedGrade",
                    sort: "predictedGrade",
                    filter: "predictedGrade",
                    display: stuPredictedGrade
                }
            },
            {
                data: {
                    _: "comment",
                    sort: "comment",
                    filter: "comment",
                    display: stuComment
                }
            }
        ],
        //order: [[3, "asc"], [4, "asc"], [2, "asc"]],
        order: [],
        drawCallback: function (settings, json) {
            studentListFunctions();
            loadingBox.style.display = "none";
            attachListFunctions(
                "EditCommentButton"
            );
        }
    });
});

function studentListFunctions() {
    //Track if any changes have been made in order to show warning on leaving page
    var dataToBeSaved = document.querySelectorAll('.DataToBeSaved');
    dataToBeSaved.forEach(function (input) {
        input.addEventListener('change', function (event) {
            hasUnsavedChanges = document.getElementById("HasUnsavedChangesID");
            hasUnsavedChanges.value = "Y";
            input.classList.remove("is-invalid");
        });
    });

    //Re-colour background based on if predicted to achieve
    var predictedToAchieve = document.querySelectorAll('.PredictedToAchieve');
    predictedToAchieve.forEach(function (input) {
        input.addEventListener('change', function (event) {
            let trRow = input.parentElement.parentElement;

            if (input.value === "Y") {
                trRow.classList.remove('table-danger');
                trRow.classList.add('table-success');
            }
            else if (input.value === "N") {
                trRow.classList.remove('table-success');
                trRow.classList.add('table-danger');
            }
            else {
                trRow.classList.remove('table-success');
                trRow.classList.remove('table-danger');
            }
        });
    });

    //Add options to select lists
    let predictedToAchieveSelect = document.querySelectorAll('.PredictedToAchieve');
    let predictedToAchieveItems = document.getElementById("PredictedToAchieveID").innerHTML;
    predictedToAchieveSelect.forEach(function (select) {
        select.innerHTML = predictedToAchieveItems;
        let selectedValue = select.dataset.content;
        //change value to correct format
        let selectedYesNo = null;
        if (selectedValue === "true") {
            selectedYesNo = `Y`;
        }
        else if (selectedValue === "false") {
            selectedYesNo = `N`;
        }

        if (selectedYesNo !== "null") {
            select.value = selectedYesNo;
        }
    });

    let predictedToAchieveBySelect = document.querySelectorAll('.PredictedToAchieveBy');
    let predictedToAchieveByItems = document.getElementById("PredictedToAchieveByID").innerHTML;
    predictedToAchieveBySelect.forEach(function (select) {
        select.innerHTML = predictedToAchieveByItems;
        let selectedValue = select.dataset.content;
        if (selectedValue !== "null") {
            select.value = selectedValue;
        }
    });

    let predictedGradeDatalist = document.querySelectorAll('.PredictedGradeDatalist');
    let predictedGradeItems = document.getElementById("PredictedGradeID").innerHTML;
    predictedGradeDatalist.forEach(function (select) {
        select.innerHTML = predictedGradeItems;
    });
    let predictedGradeSelect = document.querySelectorAll('.PredictedGrade');
    predictedGradeSelect.forEach(function (select) {
        let selectedValue = select.dataset.content;
        if (selectedValue !== "null") {
            select.value = selectedValue;
        }
    });
}

function stuAttendPer(data, type, dataToSet) {
    if (data.attendPer === null) {
        return ``;
    }
    else {

        let percent = Number(data.attendPer).toLocaleString(undefined, { style: 'percent', minimumFractionDigits: 1 });

        return `
            <div class="AttendPercent ${data.attendRate}">
                <div class="AttendValue">${percent}</div>
                <div class="AttendBar" style="width: ${percent}">
                </div>
            </div>`;
    }
}

function stuStartDate(data, type, dataToSet) {
    if (data.startDate === null) {
        return ``;
    }
    else {
        moment.locale('en-gb');
        return `${moment(data.startDate).format('L')}`;
    }
}

function stuExpEndDate(data, type, dataToSet) {
    if (data.expEndDate === null) {
        return ``;
    }
    else {
        moment.locale('en-gb');
        return `${moment(data.expEndDate).format('L')}`;
    }
}

function stuPredictedToAchieve(data, type, dataToSet) {
    return `
        <select name="PredictedToAchieve" class="form-control custom-select PredictedToAchieve DataToBeSaved" data-content="${data.predictedToAchieve}">
        </select>`;
}

function stuPredictedToAchieveBy(data, type, dataToSet) {
    return `
        <select name="PredictedToAchieveBy" class="form-control custom-select PredictedToAchieveBy DataToBeSaved" data-content="${data.predictedToAchieveBy}">
        </select>`;
}

function stuPredictedGrade(data, type, dataToSet) {
    return `
        <input list="PredictedGrades-${data.enrolmentID}" class="form-control custom-select PredictedGrade DataToBeSaved" data-content="${data.predictedGrade}" />
        <datalist id="PredictedGrades-${data.enrolmentID}" class="PredictedGradeDatalist" data-content="${data.predictedGrade}">
        </datalist>`;
}

function stuComment(data, type, dataToSet) {
    let comment = data.comment ? data.comment : "";
    let commentSummary = data.commentSummary ? data.commentSummary : "";

    return `
        <textarea id="Comment-${data.enrolmentID}" name="Comment" class="form-control Comment DataToBeSaved" hidden>${comment}</textarea>
        <button type="button" class="btn btn-primary EditCommentButton" data-bs-toggle="modal" data-bs-target="#ModalNote" data-toggle="modal" data-target="#ModalNote" data-id="${data.enrolmentID}" data-selector="EnrolmentID" data-path="Edit" data-loading-text="Prediction for ${data.forename} ${data.surname}">
            <i class="fas fa-sticky-note"></i>
        </button> <code id="CommentIntro-${data.enrolmentID}" class="CommentIntro">${commentSummary}</code>`;
}
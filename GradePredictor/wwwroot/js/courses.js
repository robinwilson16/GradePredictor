attachListFunctions(
    "EditCourseButton"
);

getFolderPath();
switchDisplay();
getLecturerClassStats();

var loadingBox = document.getElementById('LoadingAnimation');
loadingBox.style.display = "flex";

async function getFolderPath() {
    //Save student data into local browser storage
    let rootPath = $("#RootPath").val();
    if (!rootPath) {
        rootPath = ``;
    }

    let academicYearID = document.getElementById("AcademicYearID").value;
    let college = document.getElementById("CollegeGroupID").value;
    let fac = document.getElementById("FacID").value;
    let team = document.getElementById("TeamID").value;

    let academicYear = academicYearID.replace("/", "-");

    let folderData = `${rootPath}/FolderPaths/Details/${academicYear}/`;

    if (college != "") {
        folderData += `${college}/`;
    }
    if (fac != "") {
        folderData += `${fac}/`;
    }
    if (team != "") {
        folderData += `${team}/`;
    }

    let dataToLoad = folderData;

    loadData("GET", dataToLoad)
        .then(data => {
            try {
                let folderData = $(data).find("#FolderPathData");
                $("#FolderPathLinks").html(folderData);
                console.log(dataToLoad + " Loaded");
            }
            catch (e) {
                let title = `Error Loading Folder Data`;
                let content = `The folder path data could not be loaded`;

                doErrorModal(title, content);
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

var courseSearchInput = document.getElementById('CourseSearchID');
if (courseSearchInput) {
    courseSearchInput.addEventListener('keyup', function (event) {
        doCourseSearch();
        loadingBox.style.display = "flex";
    });
}

var staffSearchInput = document.getElementById('StaffSearchID');
if (staffSearchInput) {
    staffSearchInput.addEventListener('keyup', function (event) {
        doCourseSearch();
        loadingBox.style.display = "flex";
    });
}

var academicYearInput = document.getElementById('AcademicYearID');
academicYearInput.addEventListener('change', function (event) {
    doCourseSearch();
    loadingBox.style.display = "flex";
});

var coursesITeachInput = document.getElementById('CoursesITeachID');
coursesITeachInput.addEventListener('change', function (event) {
    doCourseSearch();
    loadingBox.style.display = "flex";
});

function doCourseSearch() {
    let rootPath = $("#RootPath").val();
    if (!rootPath) {
        rootPath = ``;
    }

    let academicYearID = document.getElementById("AcademicYearID").value;
    let userID = document.getElementById("UserID").value;
    let collegeGroupID = document.getElementById("CollegeGroupID").value;
    let facID = document.getElementById("FacID").value;
    let teamID = document.getElementById("TeamID").value;
    let dataModeID = document.getElementById("DataModeID").value;
    let courseSearchID = null
    if (document.getElementById("CourseSearchID")) {
        courseSearchID = document.getElementById("CourseSearchID").value;
    }
    let staffSearchID = null
    if (document.getElementById("StaffSearchID")) {
        staffSearchID = document.getElementById("StaffSearchID").value;
    }
    let coursesITeachID = document.getElementById("CoursesITeachID").checked;
    let structureLevelID = Number.parseInt(document.getElementById("StructureLevelID").value);

    let academicYear = academicYearID.replace("/", "-");

    if (!structureLevelID) {
        structureLevelID = 1;
    }

    let collegeStructureData = `${rootPath}/CollegeStructures/${academicYear}/${userID}/${coursesITeachID}/${structureLevelID}/?handler=Json`;

    if (dataModeID) {
        collegeStructureData += `&dataMode=${dataModeID}`;
    }

    if (collegeGroupID) {
        collegeStructureData += `&collegeGroup=${collegeGroupID}`;
    }

    if (facID) {
        collegeStructureData += `&fac=${facID}`;
    }

    if (teamID) {
        collegeStructureData += `&team=${teamID}`;
    }

    if (courseSearchID) {
        collegeStructureData += `&courseSearch=${courseSearchID}`;
    }

    if (staffSearchID) {
        collegeStructureData += `&staffSearch=${staffSearchID}`;
    }

    let courseData = `${rootPath}/Courses/${academicYear}/${userID}/${coursesITeachID}/?handler=Json`;

    if (dataModeID) {
        courseData += `&dataMode=${dataModeID}`;
    }

    if (collegeGroupID) {
        courseData += `&collegeGroup=${collegeGroupID}`;
    }

    if (facID) {
        courseData += `&fac=${facID}`;
    }

    if (teamID) {
        courseData += `&team=${teamID}`;
    }

    if (courseSearchID) {
        courseData += `&courseSearch=${courseSearchID}`;
    }

    if (staffSearchID) {
        courseData += `&staffSearch=${staffSearchID}`;
    }

    if (structureLevelID < 4) {
        let listData = $("#CollegeStructureList").DataTable();
        listData.ajax.url(collegeStructureData).load(null, false);
        console.log(collegeStructureData + " Loaded");
    }
    else {
        let listData = $("#CourseList").DataTable();
        listData.ajax.url(courseData).load(null, false);
        console.log(courseData + " Loaded");
    }
    getFolderPath();
}

function switchDisplay() {
    //If showing course level need to switch visible element
    let structureLevelID = Number.parseInt(document.getElementById("StructureLevelID").value);

    if (structureLevelID >= 4) {
        collegeStructureTableRow = document.getElementById("CollegeStructureListAreaRow");
        courseTableRow = document.getElementById("CourseListAreaRow");

        collegeStructureTableRow.classList.add("d-none");
        courseTableRow.classList.remove("d-none");
    }
}

function getLecturerClassStats() {
    //Save student data into local browser storage
    let rootPath = $("#RootPath").val();
    if (!rootPath) {
        rootPath = ``;
    }

    let academicYearID = document.getElementById("AcademicYearID").value;
    let userID = document.getElementById("UserID").value;

    let academicYear = academicYearID.replace("/", "-");

    let classStatsData = `${rootPath}/LecturerClassStats/Details/${academicYear}/${userID}/?handler=Json`;

    let dataToLoad = classStatsData;

    loadData("GET", dataToLoad)
        .then(data => {
            try {
                json = JSON.parse(data);
                
                if (!json) {
                    //If not a lecturer
                    coursesITeachCheckbox = document.getElementById("CoursesITeachID");
                    coursesITeachCheckbox.checked = false;
                    coursesITeachCheckbox.disabled = true;
                }
            }
            catch (e) {
                let title = `Error Loading Class Stats for ${userID}`;
                let content = `The class stats data for ${userID} could not be loaded`;

                doErrorModal(title, content);
            }
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
    let userID = document.getElementById("UserID").value;
    let collegeGroupID = document.getElementById("CollegeGroupID").value;
    let facID = document.getElementById("FacID").value;
    let teamID = document.getElementById("TeamID").value;
    let dataModeID = document.getElementById("DataModeID").value;
    let courseSearchID = null
    if (document.getElementById("CourseSearchID")) {
        courseSearchID = document.getElementById("CourseSearchID").value;
    }
    let staffSearchID = null
    if (document.getElementById("StaffSearchID")) {
        staffSearchID = document.getElementById("StaffSearchID").value;
    }
    let structureLevelID = document.getElementById("StructureLevelID").value;
    let coursesITeachID = document.getElementById("CoursesITeachID").checked;
    let academicYear = academicYearID.replace("/", "-");

    if (!structureLevelID) {
        structureLevelID = 1;
    }

    let collegeStructureData = `${rootPath}/CollegeStructures/${academicYear}/${userID}/${coursesITeachID}/${structureLevelID}/?handler=Json`;

    if (dataModeID) {
        collegeStructureData += `&dataMode=${dataModeID}`;
    }

    if (collegeGroupID) {
        collegeStructureData += `&collegeGroup=${collegeGroupID}`;
    }

    if (facID) {
        collegeStructureData += `&fac=${facID}`;
    }

    if (teamID) {
        collegeStructureData += `&team=${teamID}`;
    }

    if (courseSearchID) {
        collegeStructureData += `&courseSearch=${courseSearchID}`;
    }

    if (staffSearchID) {
        collegeStructureData += `&staffSearch=${staffSearchID}`;
    }

    console.log(collegeStructureData + " Loaded");
    let courseData = null;

    //Ensure initial page load does not load any data
    if (structureLevelID >= 4) {
        courseData = `${rootPath}/Courses/${academicYear}/${userID}/${coursesITeachID}/?handler=Json`;
    }
    else {
        courseData = `${rootPath}/Courses/${academicYear}/${0}/${false}/?handler=Json`;
    }

    if (dataModeID) {
        courseData += `&dataMode=${dataModeID}`;
    }

    if (collegeGroupID) {
        courseData += `&collegeGroup=${collegeGroupID}`;
    }

    if (facID) {
        courseData += `&fac=${facID}`;
    }

    if (teamID) {
        courseData += `&team=${teamID}`;
    }

    if (courseSearchID) {
        courseData += `&courseSearch=${courseSearchID}`;
    }

    if (staffSearchID) {
        courseData += `&staffSearch=${staffSearchID}`;
    }

    console.log(courseData + " Loaded");

    CollegeStructureListDT = $('#CollegeStructureList').DataTable({
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
        scrollY: 460,
        //ajax: { url: `${rootPath}/Transactions/?handler=Json&search=${searchParams}`, dataSrc: "" },
        ajax: {
            url: collegeStructureData,
            dataSrc: ""
        },
        columns: [
            {
                data: {
                    _: "collegeStructureID",
                    sort: "collegeStructureID",
                    filter: "collegeStructureID",
                    display: strCollegeStructureDetails
                }
            },
            {
                data: {
                    _: "collegeStructureCode",
                    sort: "collegeStructureCode",
                    filter: "collegeStructureCode"
                }
            },
            {
                data: {
                    _: "collegeStructureName",
                    sort: "collegeStructureName",
                    filter: "collegeStructureName"
                }
            },
            {
                data: {
                    _: "courses",
                    sort: "courses",
                    filter: "courses"
                },
                className: "text-center"
            },
            {
                data: {
                    _: "groups",
                    sort: "groups",
                    filter: "groups"
                },
                className: "text-center"
            },
            {
                data: {
                    _: "attendPer",
                    sort: "attendPer",
                    filter: "attendPer",
                    display: strAttendPer
                },
                className: "align-middle"
            },
            {
                data: {
                    _: "contEnrols",
                    sort: "contEnrols",
                    filter: "contEnrols"
                },
                className: "text-center contColumn"
            },
            {
                data: {
                    _: "predictionsCompletedNum",
                    sort: "predictionsCompletedNum",
                    filter: "predictionsCompletedNum"
                },
                className: "text-center"
            },
            {
                data: {
                    _: "predictionsCompletedPer",
                    sort: "predictionsCompletedPer",
                    filter: "predictionsCompletedPer",
                    display: strPredictionsCompletedPer
                },
                className: "text-center"
            },
            {
                data: {
                    _: "predictedToAchieveNum",
                    sort: "predictedToAchieveNum",
                    filter: "predictedToAchieveNum"
                },
                className: "text-center passColumn"
            },
            {
                data: {
                    _: "predictedToAchievePer",
                    sort: "predictedToAchievePer",
                    filter: "predictedToAchievePer",
                    display: strPredictedToAchievePer
                },
                className: "text-center achColumn"
            },
            {
                data: {
                    _: "predictedToAchieveHighNum",
                    sort: "predictedToAchieveHighNum",
                    filter: "predictedToAchieveHighNum"
                },
                className: "text-center"
            },
            {
                data: {
                    _: "predictedToAchieveHighPer",
                    sort: "predictedToAchieveHighPer",
                    filter: "predictedToAchieveHighPer",
                    display: strPredictedToAchieveHighPer
                },
                className: "text-center passHighColumn"
            }
        ],
        //order: [[3, "asc"], [4, "asc"], [2, "asc"]],
        order: [],
        drawCallback: function (settings, json) {
            loadingBox.style.display = "none";
            attachListFunctions(
                "EditCollegeStructureButton"
            );
            extraCollegeStructureFunctions();
        }
    });

    CourseListDT = $('#CourseList').DataTable({
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
        scrollY: 460,
        ajax: {
            url: courseData,
            dataSrc: ""
        },
        columns: [
            {
                data: {
                    _: "courseID",
                    sort: "courseID",
                    filter: "courseID",
                    display: crsCourseDetails
                }
            },
            {
                data: {
                    _: "courseCode",
                    sort: "courseCode",
                    filter: "courseCode"
                }
            },
            {
                data: {
                    _: "courseTitleShort",
                    sort: "courseTitleShort",
                    filter: "courseTitleShort"
                }
            },
            {
                data: {
                    _: "groupCode",
                    sort: "groupCode",
                    filter: "groupCode"
                }
            },
            {
                data: {
                    _: "startDate",
                    sort: "startDate",
                    filter: "startDate",
                    display: crsStartDate
                }
            },
            {
                data: {
                    _: "endDate",
                    sort: "endDate",
                    filter: "endDate",
                    display: crsEndDate
                }
            },
            {
                data: {
                    _: "mainLecturerCode",
                    sort: "mainLecturerCode",
                    filter: "mainLecturerCode",
                    display: crsMainLecturer
                }
            },
            {
                data: {
                    _: "contEnrols",
                    sort: "contEnrols",
                    filter: "contEnrols"
                },
                className: "text-center contColumn"
            },
            {
                data: {
                    _: "attendPer",
                    sort: "attendPer",
                    filter: "attendPer",
                    display: crsAttendPer
                },
                className: "align-middle"
            },
            {
                data: {
                    _: "predictionsCompletedPer",
                    sort: "predictionsCompletedPer",
                    filter: "predictionsCompletedPer",
                    display: crsPredictionsCompletedPer
                },
                className: "text-center"
            },
            {
                data: {
                    _: "predictedToAchievePer",
                    sort: "predictedToAchievePer",
                    filter: "predictedToAchievePer",
                    display: crsPredictedToAchievePer
                },
                className: "text-center achColumn"
            },
            {
                data: {
                    _: "lastUpdated",
                    sort: "lastUpdated",
                    filter: "lastUpdated",
                    display: crsLastUpdated
                }
            }
        ],
        //order: [[3, "asc"], [4, "asc"], [2, "asc"]],
        order: [],
        drawCallback: function (settings, json) {
            loadingBox.style.display = "none";
            attachListFunctions(
                "EditCourseButton"
            );
            extraCourseFunctions();
        }
    });
});

function extraCollegeStructureFunctions() {
    var openButton = document.querySelectorAll('.OpenCollegeStructureButton');
    openButton.forEach(function (button) {
        button.addEventListener('click', function (event) {
            var loadingBox = document.getElementById('LoadingAnimation');
            loadingBox.style.display = "flex";
            let structureLevelID = Number.parseInt(button.dataset.selector);
            //let newStructureLevelID = structureLevelID + 1;
            let structureCode = button.dataset.container;
            let structureLevelFld = document.getElementById("StructureLevelID");
            let collegeGroupFld = document.getElementById("CollegeGroupID");
            let facFld = document.getElementById("FacID");
            let teamFld = document.getElementById("TeamID");

            //Set field to new structure level being loaded then record the structure code value
            structureLevelFld.value = structureLevelID;

            if (structureLevelID <= 2) {
                collegeGroupFld.value = structureCode;
            }
            else if (structureLevelID === 3) {
                facFld.value = structureCode;
            }
            else if (structureLevelID === 4) {
                teamFld.value = structureCode;
            }
            else {
                collegeGroupFld.value = structureCode;
            }

            doCollegeStructureDrill();
        });
    });
}

function doCollegeStructureDrill() {
    let rootPath = $("#RootPath").val();
    if (!rootPath) {
        rootPath = ``;
    }

    let academicYearID = document.getElementById("AcademicYearID").value;
    let userID = document.getElementById("UserID").value;
    let collegeGroupID = document.getElementById("CollegeGroupID").value;
    let facID = document.getElementById("FacID").value;
    let teamID = document.getElementById("TeamID").value;
    let dataModeID = document.getElementById("DataModeID").value;
    let courseSearchID = null
    if (document.getElementById("CourseSearchID")) {
        courseSearchID = document.getElementById("CourseSearchID").value;
    }
    let staffSearchID = null
    if (document.getElementById("StaffSearchID")) {
        staffSearchID = document.getElementById("StaffSearchID").value;
    }
    let coursesITeachID = document.getElementById("CoursesITeachID").checked;
    let structureLevelID = Number.parseInt(document.getElementById("StructureLevelID").value);

    let academicYear = academicYearID.replace("/", "-");

    if (!structureLevelID) {
        structureLevelID = 1;
    }

    let collegeStructureData = `${rootPath}/CollegeStructures/${academicYear}/${userID}/${coursesITeachID}/${structureLevelID}/?handler=Json`;

    if (dataModeID) {
        collegeStructureData += `&dataMode=${dataModeID}`;
    }

    if (collegeGroupID) {
        collegeStructureData += `&collegeGroup=${collegeGroupID}`;
    }

    if (facID) {
        collegeStructureData += `&fac=${facID}`;
    }

    if (teamID) {
        collegeStructureData += `&team=${teamID}`;
    }

    if (courseSearchID) {
        collegeStructureData += `&courseSearch=${courseSearchID}`;
    }

    if (staffSearchID) {
        collegeStructureData += `&staffSearch=${staffSearchID}`;
    }

    let courseData = `${rootPath}/Courses/${academicYear}/${userID}/${coursesITeachID}/?handler=Json`;

    if (dataModeID) {
        courseData += `&dataMode=${dataModeID}`;
    }

    if (collegeGroupID) {
        courseData += `&collegeGroup=${collegeGroupID}`;
    }

    if (facID) {
        courseData += `&fac=${facID}`;
    }

    if (teamID) {
        courseData += `&team=${teamID}`;
    }

    if (courseSearchID) {
        courseData += `&courseSearch=${courseSearchID}`;
    }

    if (staffSearchID) {
        courseData += `&staffSearch=${staffSearchID}`;
    }

    if (structureLevelID < 4) {
        let listData = $("#CollegeStructureList").DataTable();
        listData.ajax.url(collegeStructureData).load(null, false);
        console.log(collegeStructureData + " Loaded");
    }
    else {
        collegeStructureTableRow = document.getElementById("CollegeStructureListAreaRow");
        courseTableRow = document.getElementById("CourseListAreaRow");

        let listData = $("#CourseList").DataTable();
        listData.ajax.url(courseData).load(null, false);
        console.log(courseData + " Loaded");

        collegeStructureTableRow.classList.add("d-none");
        courseTableRow.classList.remove("d-none");
    }

    getFolderPath();
}

function extraCourseFunctions() {
    var openButton = document.querySelectorAll('.OpenCourseButton');
    openButton.forEach(function (button) {
        button.addEventListener('click', function (event) {
            var loadingBox = document.getElementById('LoadingAnimation');
            loadingBox.style.display = "flex";
        });
    });
}

function strCollegeStructureDetails(data, type, dataToSet) {
    let rootPath = $("#RootPath").val();
    if (!rootPath) {
        rootPath = ``;
    }
    let academicYearID = document.getElementById("AcademicYearID").value;
    academicYear = academicYearID.replace("/", "-");
    let userID = document.getElementById("UserID").value;
    let newStructureLevelID = data.collegeStructureLevel + 1;

    let linkTitle = null;
    if (newStructureLevelID === 1) {
        linkTitle = `View Faculties in ${data.collegeCode}`;
    }
    else if (newStructureLevelID === 2) {
        linkTitle = `View Faculties in ${data.collegeCode}`;
    }
    else if (newStructureLevelID === 3) {
        linkTitle = `View Teams in ${data.facCode}`;
    }
    else {
        linkTitle = `View Faculties in ${data.collegeCode}`;
    }

    return `
        <button class="btn btn-secondary btn-sm OpenCollegeStructureButton" title="${linkTitle}" data-selector="${newStructureLevelID}" data-container="${data.collegeStructureCode}">
            <i class="fas fa-external-link-alt"></i>
        </a>`;
}

function strAttendPer(data, type, dataToSet) {
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

function strPredictionsCompletedPer(data, type, dataToSet) {
    if (data.predictionsCompletedPer === null) {
        return ``;
    }
    else {
        let percent = Number(data.predictionsCompletedPer).toLocaleString(undefined, { style: 'percent', minimumFractionDigits: 1 });
        return `${percent}`;
    }
}

function strPredictedToAchievePer(data, type, dataToSet) {
    if (data.predictionsCompletedPer === null) {
        return ``;
    }
    else {
        let percent = Number(data.predictedToAchievePer).toLocaleString(undefined, { style: 'percent', minimumFractionDigits: 1 });
        return `${percent}`;
    }
}

function strPredictedToAchieveHighPer(data, type, dataToSet) {
    if (data.predictionsCompletedPer === null) {
        return ``;
    }
    else {
        let percent = Number(data.predictedToAchieveHighPer).toLocaleString(undefined, { style: 'percent', minimumFractionDigits: 1 });
        return `${percent}`;
    }
}

function crsCourseDetails(data, type, dataToSet) {
    let academicYearID = document.getElementById("AcademicYearID").value;
    academicYearString = academicYearID.replace("/", "-");

    let dataModeID = document.getElementById("DataModeID").value;

    let courseGroupURL = `/Courses/Details/${academicYearString}/${data.courseCode}/`;
    let courseGroupCode = data.courseCode;
    if (data.groupCode) {
        courseGroupURL += `${data.groupCode}/`;
        courseGroupCode += `-${data.groupCode}`;
    }
    else {
        courseGroupURL += `0/`;
    }
    if (dataModeID) {
        courseGroupURL += `?dataMode=${dataModeID}`;
    }

    return `
        <a href="${courseGroupURL}" class="btn btn-secondary btn-sm OpenCourseButton" title="View Course ${courseGroupCode}">
            <i class="fas fa-external-link-alt"></i>
        </a>`;
}

function crsStartDate(data, type, dataToSet) {
    if (data.startDate === null) {
        return ``;
    }
    else {
        moment.locale('en-gb');
        return `${moment(data.startDate).format('L')}`;
    }
}

function crsEndDate(data, type, dataToSet) {
    if (data.endDate === null) {
        return ``;
    }
    else {
        moment.locale('en-gb');
        return `${moment(data.endDate).format('L')}`;
    }
}

function crsMainLecturer(data, type, dataToSet) {
    let mainLecturer = null;

    if (!data.mainLecturerCode) {
        mainLecturer = `
            <i class="fas fa-user-times"></i> No Lecturers`;
    }
    else {
        mainLecturer = `
            <i class="fas fa-chalkboard-teacher"></i> ${data.mainLecturerForename} ${data.mainLecturerSurname} (${data.mainLecturerCode})`;
    }

    return mainLecturer;
}

function crsAttendPer(data, type, dataToSet) {
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

function crsPredictionsCompletedPer(data, type, dataToSet) {
    if (data.predictionsCompletedPer === null) {
        return ``;
    }
    else {
        let percent = Number(data.predictionsCompletedPer).toLocaleString(undefined, { style: 'percent', minimumFractionDigits: 1 });
        return `${percent}`;
    }
}

function crsPredictedToAchievePer(data, type, dataToSet) {
    if (data.predictionsCompletedPer === null) {
        return ``;
    }
    else {
        let percent = Number(data.predictedToAchievePer).toLocaleString(undefined, { style: 'percent', minimumFractionDigits: 1 });
        return `${percent}`;
    }
}

function crsLastUpdated(data, type, dataToSet) {
    if (data.lastUpdated === null) {
        return ``;
    }
    else {
        moment.locale('en-gb');
        return `${moment(data.lastUpdated).calendar()}`;
    }
}
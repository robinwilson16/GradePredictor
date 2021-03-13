attachListFunctions(
    "EditCourseButton"
);

var loadingBox = document.getElementById('LoadingAnimation');
loadingBox.style.display = "flex";

var courseSearchInput = document.getElementById('CourseSearchID');
courseSearchInput.addEventListener('keyup', function (event) {
    doCourseSearch();
    loadingBox.style.display = "flex";
});

var staffSearchInput = document.getElementById('StaffSearchID');
staffSearchInput.addEventListener('keyup', function (event) {
    doCourseSearch();
    loadingBox.style.display = "flex";
});

var academicYearInput = document.getElementById('AcademicYearID');
academicYearInput.addEventListener('change', function (event) {
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
    let courseSearchID = document.getElementById("CourseSearchID").value;
    let staffSearchID = document.getElementById("StaffSearchID").value;
    let structureLevelID = Number.parseInt(document.getElementById("StructureLevelID").value);

    let academicYear = academicYearID.replace("/", "-");

    if (!structureLevelID) {
        structureLevelID = 1;
    }

    let collegeStructureData = `${rootPath}/CollegeStructures/${academicYear}/${userID}/${structureLevelID}/?handler=Json`;

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

    let courseData = `${rootPath}/Courses/${academicYear}/${userID}/?handler=Json`;

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
    let structureLevelID = document.getElementById("StructureLevelID").value;
    let userID = document.getElementById("UserID").value;
    let collegeGroupID = document.getElementById("CollegeGroupID").value;
    let facID = document.getElementById("FacID").value;
    let teamID = document.getElementById("TeamID").value;
    let courseSearchID = document.getElementById("CourseSearchID").value;
    let staffSearchID = document.getElementById("StaffSearchID").value;

    let academicYear = academicYearID.replace("/", "-");

    if (!structureLevelID) {
        structureLevelID = 1;
    }

    let collegeStructureData = `${rootPath}/CollegeStructures/${academicYear}/${userID}/${structureLevelID}/?handler=Json`;

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

    //let courseData = `${rootPath}/Courses/${academicYear}/${userID}/?handler=Json`;
    //Ensure initial page load does not load any data
    let courseData = `${rootPath}/Courses/${academicYear}/${0}/?handler=Json`;

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
        //ajax: { url: `${rootPath}/Transactions/?handler=Json&search=${searchParams}`, dataSrc: "" },
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
    let courseSearchID = document.getElementById("CourseSearchID").value;
    let staffSearchID = document.getElementById("StaffSearchID").value;
    let structureLevelID = Number.parseInt(document.getElementById("StructureLevelID").value);

    let academicYear = academicYearID.replace("/", "-");

    if (!structureLevelID) {
        structureLevelID = 1;
    }

    let collegeStructureData = `${rootPath}/CollegeStructures/${academicYear}/${userID}/${structureLevelID}/?handler=Json`;

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

    let courseData = `${rootPath}/Courses/${academicYear}/${userID}/?handler=Json`;

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

    let courseGroupURL = `/Courses/Details/${academicYearString}/${data.courseCode}/`;
    let courseGroupCode = data.courseCode;
    if (data.groupCode) {
        courseGroupURL += `${data.groupCode}/`;
        courseGroupCode += `-${data.groupCode}`;
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
//Buttons that load content
attachListFunctions(
    "EditUserButton"
);

//Action Buttons that save data
$(".SaveUserButton").click(function (event) {
    $("#UserFormData").submit();
    performButtonAction(this);
});
$(".SaveUserRoleButton").click(function (event) {
    $("#UserRoleFormData").submit();
    performButtonAction(this);
});
$(".DeleteUserRoleButton").click(function (event) {
    $("#UserRoleDeleteFormData").submit();
    performButtonAction(this);
});
$(".SaveUserCompanyButton").click(function (event) {
    $("#UserCompanyFormData").submit();
    performButtonAction(this);
});
$(".DeleteUserCompanyButton").click(function (event) {
    $("#UserCompanyDeleteFormData").submit();
    performButtonAction(this);
});


//Load data in when model is displayed
$("#ModalUser").on("shown.bs.modal", function () {
    let userID = $("#UserID").val();
    let actionID = $("#ActionID").val();
    let formTitle = $("#FormTitleID").val();
    let rootPath = $("#RootPath").val();

    //If no action specified then default to showing the detail screen
    if (actionID == null) {
        actionID = `Details`;
    }
    if (formTitle === "") {
        formTitle = "User Details";
    }
    if (rootPath == null) {
        rootPath = ``;
    }

    $("#ModalUserLabel").find(".title").html(formTitle);

    //Set form title back to blank to default to new recond functionality
    $("#FormTitleID").val("");

    let objectID = null;
    let objectIDField = null;
    let objectTypeID = null;
    let remoteElementID = null;
    let loadIntoElementID = null;
    let parentID = null;
    let childID = null;
    let modalID = null;
    let formID = null;
    let listID = null;
    let buttonClass = null;
    let closeModalOnSuccess = null;

    objectID = userID;
    objectIDField = "UserID";
    objectTypeID = `WebPortal/Users`;
    remoteElementID = "UserForm";
    loadIntoElementID = "UserDetails";
    parentID = null;
    childID = null;
    modalID = "ModalUser";
    formID = "UserFormData";
    listID = "UserList";
    buttonClass = "EditUserButton";
    closeModalOnSuccess = true;
    loadForm(objectID, objectIDField, objectTypeID, actionID, remoteElementID, loadIntoElementID, parentID, childID, rootPath, modalID, formID, listID, buttonClass, closeModalOnSuccess);

    objectTypeID = `WebPortal/UserRoles`;
    listID = "RoleList";
    parentID = userID;
    childID = null;
    loadList(objectTypeID, listID, parentID, childID, rootPath)

    objectTypeID = `WebPortal/UserCompanies`;
    listID = "CompanyList";
    parentID = userID;
    childID = null;
    loadList(objectTypeID, listID, parentID, childID, rootPath)
});

$("#ModalUser").on("hidden.bs.modal", function () {
    let loadingAnim = $("#LoadingHTML").html();
    $("#UserDetails").html(loadingAnim);

    //Switch back to first tab on users screen
    $("#UserTabs a:first").tab("show");
});

$("#ModalUserRole").on("shown.bs.modal", function () {
    let userID = $("#UserID").val();
    let roleID = $("#RoleID").val();
    let actionID = $("#ActionID").val();
    let formTitle = $("#FormTitleID").val();
    let rootPath = $("#RootPath").val();

    //If no action specified then defailt to showing the detail screen
    if (actionID == null) {
        actionID = `Details`;
    }
    if (formTitle === "") {
        formTitle = "Role Details";
    }
    if (rootPath == null) {
        rootPath = ``;
    }

    $("#ModalUserRoleLabel").find(".title").html(formTitle);

    //Set form title back to blank to default to new recond functionality
    $("#FormTitleID").val("");

    let objectID = null;
    let objectIDField = null;
    let objectTypeID = null;
    let remoteElementID = null;
    let loadIntoElementID = null;
    let parentID = null;
    let childID = null;
    let modalID = null;
    let formID = null;
    let listID = null;
    let buttonClass = null;
    let closeModalOnSuccess = null;

    objectID = roleID;
    objectIDField = "RoleID";
    objectTypeID = `WebPortal/UserRoles`;
    remoteElementID = "UserRoleForm";
    loadIntoElementID = "UserRoleDetails";
    parentID = userID;
    childID = null;
    modalID = "ModalUserRole";
    formID = "UserRoleFormData";
    listID = "RoleList";
    buttonClass = "EditUserRoleButton";
    closeModalOnSuccess = true;
    loadForm(objectID, objectIDField, objectTypeID, actionID, remoteElementID, loadIntoElementID, parentID, childID, rootPath, modalID, formID, listID, buttonClass, closeModalOnSuccess);
});

$("#ModalUserRole").on("hidden.bs.modal", function () {
    let loadingAnim = $("#LoadingHTML").html();
    $("#UserRoleDetails").html(loadingAnim);
});

$("#ModalUserRoleDelete").on("shown.bs.modal", function () {
    let userID = $("#UserID").val();
    let roleID = $("#RoleID").val();
    let actionID = $("#ActionID").val();
    let formTitle = $("#FormTitleID").val();
    let rootPath = $("#RootPath").val();

    //If no action specified then defailt to showing the detail screen
    if (actionID == null) {
        actionID = `Details`;
    }
    if (formTitle === "") {
        formTitle = "Role Details";
    }
    if (rootPath == null) {
        rootPath = ``;
    }

    $("#ModalUserRoleDeleteLabel").find(".title").html(formTitle);

    //Set form title back to blank to default to new recond functionality
    $("#FormTitleID").val("");

    let objectID = null;
    let objectIDField = null;
    let objectTypeID = null;
    let remoteElementID = null;
    let loadIntoElementID = null;
    let parentID = null;
    let childID = null;
    let modalID = null;
    let formID = null;
    let listID = null;
    let buttonClass = null;
    let closeModalOnSuccess = null;

    objectID = roleID;
    objectIDField = "RoleID";
    objectTypeID = `WebPortal/UserRoles`;
    remoteElementID = "UserRoleDeleteForm";
    loadIntoElementID = "UserRoleDeleteDetails";
    parentID = userID;
    childID = null;
    modalID = "ModalUserRoleDelete";
    formID = "UserRoleDeleteFormData";
    listID = "RoleList";
    buttonClass = "EditUserRoleButton";
    closeModalOnSuccess = true;
    loadForm(objectID, objectIDField, objectTypeID, actionID, remoteElementID, loadIntoElementID, parentID, childID, rootPath, modalID, formID, listID, buttonClass, closeModalOnSuccess);
});

$("#ModalUserRoleDelete").on("hidden.bs.modal", function () {
    let loadingAnim = $("#LoadingHTML").html();
    $("#UserRoleDeleteDetails").html(loadingAnim);
});

$("#ModalUserCompany").on("shown.bs.modal", function () {
    let userID = $("#UserID").val();
    let userCompanyID = $("#UserCompanyID").val();
    let actionID = $("#ActionID").val();
    let formTitle = $("#FormTitleID").val();
    let rootPath = $("#RootPath").val();

    //If no action specified then defailt to showing the detail screen
    if (actionID == null) {
        actionID = `Details`;
    }
    if (formTitle === "") {
        formTitle = "Company Details";
    }
    if (rootPath == null) {
        rootPath = ``;
    }

    $("#ModalUserCompanyLabel").find(".title").html(formTitle);

    //Set form title back to blank to default to new recond functionality
    $("#FormTitleID").val("");

    let objectID = null;
    let objectIDField = null;
    let objectTypeID = null;
    let remoteElementID = null;
    let loadIntoElementID = null;
    let parentID = null;
    let childID = null;
    let modalID = null;
    let formID = null;
    let listID = null;
    let buttonClass = null;
    let closeModalOnSuccess = null;

    objectID = userCompanyID;
    objectIDField = "UserCompanyID";
    objectTypeID = `WebPortal/UserCompanies`;
    remoteElementID = "UserCompanyForm";
    loadIntoElementID = "UserCompanyDetails";
    parentID = userID;
    childID = null;
    modalID = "ModalUserCompany";
    formID = "UserCompanyFormData";
    listID = "CompanyList";
    buttonClass = "EditUserCompanyButton";
    closeModalOnSuccess = true;
    loadForm(objectID, objectIDField, objectTypeID, actionID, remoteElementID, loadIntoElementID, parentID, childID, rootPath, modalID, formID, listID, buttonClass, closeModalOnSuccess);
});

$("#ModalUserCompany").on("hidden.bs.modal", function () {
    let loadingAnim = $("#LoadingHTML").html();
    $("#UserCompanyDetails").html(loadingAnim);
});

$("#ModalUserCompanyDelete").on("shown.bs.modal", function () {
    let userID = $("#UserID").val();
    let userCompanyID = $("#UserCompanyID").val();
    let actionID = $("#ActionID").val();
    let formTitle = $("#FormTitleID").val();
    let rootPath = $("#RootPath").val();

    //If no action specified then defailt to showing the detail screen
    if (actionID == null) {
        actionID = `Details`;
    }
    if (formTitle === "") {
        formTitle = "Company Details";
    }
    if (rootPath == null) {
        rootPath = ``;
    }

    $("#ModalUserCompanyDeleteLabel").find(".title").html(formTitle);

    //Set form title back to blank to default to new recond functionality
    $("#FormTitleID").val("");

    let objectID = null;
    let objectIDField = null;
    let objectTypeID = null;
    let remoteElementID = null;
    let loadIntoElementID = null;
    let parentID = null;
    let childID = null;
    let modalID = null;
    let formID = null;
    let listID = null;
    let buttonClass = null;
    let closeModalOnSuccess = null;

    objectID = userCompanyID;
    objectIDField = "UserCompanyID";
    objectTypeID = `WebPortal/UserCompanies`;
    remoteElementID = "UserCompanyDeleteForm";
    loadIntoElementID = "UserCompanyDeleteDetails";
    parentID = userID;
    childID = null;
    modalID = "ModalUserCompanyDelete";
    formID = "UserCompanyDeleteFormData";
    listID = "CompanyList";
    buttonClass = "EditUserCompanyButton";
    closeModalOnSuccess = true;
    loadForm(objectID, objectIDField, objectTypeID, actionID, remoteElementID, loadIntoElementID, parentID, childID, rootPath, modalID, formID, listID, buttonClass, closeModalOnSuccess);
});

$("#ModalUserCompanyDelete").on("hidden.bs.modal", function () {
    let loadingAnim = $("#LoadingHTML").html();
    $("#UserCompanyDeleteDetails").html(loadingAnim);
});

$(function () {
    //$.extend($.fn.dataTable.defaults, {
    //    language: {
    //        processing: '<div class="col text-center LoadingArea"><i class="fas fa-spinner fa-spin"></i></div>'
    //    }
    //});

    let rootPath = $("#RootPath").val();
    if (rootPath == null) {
        rootPath = ``;
    }

    let userData = `${rootPath}/WebPortal/Users/?handler=Json`;
    console.log(userData + " Loaded");

    UserListDT = $('#UserList').DataTable({
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
            url: userData,
            dataSrc: ""
        },
        columns: [
            {
                data: {
                    _: "userID",
                    sort: "userID",
                    filter: "userID",
                    display: usrUserDetails
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
                    _: "email",
                    sort: "email",
                    filter: "email",
                    display: usrEmail
                }
            },
            {
                data: {
                    _: "passwordSet",
                    sort: "passwordSet",
                    filter: "passwordSet",
                    display: usrPasswordSet
                }
            },
            {
                data: {
                    _: "failedLoginCount",
                    sort: "failedLoginCount",
                    filter: "failedLoginCount",
                    display: usrFailedLoginCount
                }
            },
            {
                data: {
                    _: "isLockedOut",
                    sort: "isLockedOut",
                    filter: "isLockedOut",
                    display: usrLockedOut
                }
            },
            {
                data: {
                    _: "lockoutEnd",
                    sort: "lockoutEnd",
                    filter: "lockoutEnd"
                }
            },
            {
                data: {
                    _: "roles",
                    sort: "roles",
                    filter: "roles",
                    display: usrRoles
                }
            },
            {
                data: {
                    _: "companies",
                    sort: "companies",
                    filter: "companies",
                    display: usrCompanies
                }
            }
        ],
        //order: [[3, "asc"], [4, "asc"], [2, "asc"]],
        order: [],
        drawCallback: function (settings, json) {
            attachListFunctions(
                "EditUserButton"
            );
        }
    });

    let userRoleData = `${rootPath}/WebPortal/UserRoles/0/?handler=Json`;
    console.log(userRoleData + " Loaded");

    UserRoleListDT = $('#RoleList').DataTable({
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
        scrollY: 260,
        //ajax: { url: `${rootPath}/Transactions/?handler=Json&search=${searchParams}`, dataSrc: "" },
        ajax: {
            url: userRoleData,
            dataSrc: ""
        },
        columns: [
            {
                data: {
                    _: "userRoleID",
                    sort: "userRoleID",
                    filter: "userRoleID",
                    display: uroUserRoleDetails
                }
            },
            {
                data: {
                    _: "roleName",
                    sort: "roleName",
                    filter: "roleName",
                    display: uroRoleName
                }
            }
        ],
        //order: [[3, "asc"], [4, "asc"], [2, "asc"]],
        order: [],
        drawCallback: function (settings, json) {
            attachListFunctions(
                "EditUserRoleButton"
            );
        }
    });

    let userCompanyData = `${rootPath}/WebPortal/UserCompanies/0/?handler=Json`;
    console.log(userCompanyData + " Loaded");

    UserCompanyListDT = $('#CompanyList').DataTable({
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
        scrollY: 260,
        //ajax: { url: `${rootPath}/Transactions/?handler=Json&search=${searchParams}`, dataSrc: "" },
        ajax: {
            url: userCompanyData,
            dataSrc: ""
        },
        columns: [
            {
                data: {
                    _: "userCompanyID",
                    sort: "userCompanyID",
                    filter: "userCompanyID",
                    display: ucoUserCompanyDetails
                }
            },
            {
                data: {
                    _: "company.name",
                    sort: "company.name",
                    filter: "company.name",
                    display: ucoCompanyName
                }
            }
        ],
        //order: [[3, "asc"], [4, "asc"], [2, "asc"]],
        order: [],
        drawCallback: function (settings, json) {
            attachListFunctions(
                "EditUserCompanyButton"
            );
        }
    });
});

function usrUserDetails(data, type, dataToSet) {
    return `
        <button type="button" class="btn btn-secondary btn-sm EditUserButton" data-bs-toggle="modal" data-bs-target="#ModalUser" data-toggle="modal" data-target="#ModalUser" data-id="${data.userID}" data-selector="UserID" data-path="Edit" data-path="Edit" data-loading-text="User: ${data.forename} ${data.surname}">
            <i class="fas fa-external-link-alt"></i>
        </button>`;
}

function usrEmail(data, type, dataToSet) {
    return `
        <a class="btn btn-outline-info btn-sm" href="mailto:${data.email}?subject=FM4U%20Web%20Portal%20User%20Management"><i class="fas fa-envelope"></i> ${data.email}</a>`;
}

function usrPasswordSet(data, type, dataToSet) {
    let tickCross = null;
    if (data.passwordSet === true) {
        tickCross = `<i class="fas fa-check-circle text-success"></i>`;
    }
    else {
        tickCross = `<i class="fas fa-times-circle text-danger"></i>`;
    }

    return `
        ${tickCross}`;
}

function usrFailedLoginCount(data, type, dataToSet) {
    return `
        <div class="text-right">${data.failedLoginCount}</div>`;
}

function usrLockedOut(data, type, dataToSet) {
    let alert = null;
    if (data.lockedOut === true) {
        alert = `<i class="fas fa-exclamation-circle text-warning"></i>`;
    }
    else {
        alert = ``;
    }

    return `
        ${alert}`;
}

function usrRoles(data, type, dataToSet) {
    let roleString = "";
    let buttonType = "secondary"

    if (data.roles !== null) {
        let roleList = data.roles.split(", ");

        for (const role of roleList) {
            if (role === "Admin") {
                buttonType = "danger"
            }
            else {
                buttonType = "secondary"
            }

            let roleDetails = `<button type="button" class="btn btn-outline-${buttonType} btn-sm btn-block"><i class="fas fa-user-tag"></i> ${role}</button>`
            roleString += roleDetails
        }
    }
    return `
        ${roleString}`;
}

function usrCompanies(data, type, dataToSet) {
    let companyString = "";

    if (data.companies !== null) {
        let companyList = data.companies.split(", ");

        for (const company of companyList) {
            let companyDetails = `<button type="button" class="btn btn-outline-primary btn-sm btn-block"><i class="fas fa-building"></i> ${company}</button>`
            companyString += companyDetails
        }
    }
    return `
        ${companyString}`;
}

function uroUserRoleDetails(data, type, dataToSet) {
    return `
        <button type="button" class="btn btn-secondary btn-sm EditUserRoleButton" data-bs-toggle="modal" data-bs-target="#ModalUserRole" data-toggle="modal" data-target="#ModalUserRole" data-id="${data.roleID}" data-selector="RoleID" data-path="Edit" data-loading-text="User Role: ${data.roleName}">
            <i class="fas fa-external-link-alt"></i>
        </button>`;
}

function uroRoleName(data, type, dataToSet) {
    return `
        <i class="fas fa-user-tag"></i> ${data.roleName}`;
}

function ucoUserCompanyDetails(data, type, dataToSet) {
    return `
        <button type="button" class="btn btn-secondary btn-sm EditUserCompanyButton" data-bs-toggle="modal" data-bs-target="#ModalUserCompany" data-toggle="modal" data-target="#ModalUserCompany" data-id="${data.userCompanyID}" data-selector="UserCompanyID" data-path="Edit" data-loading-text="User Company: ${data.company.name}">
            <i class="fas fa-external-link-alt"></i>
        </button>`;
}

function ucoCompanyName(data, type, dataToSet) {
    return `
        <i class="fas fa-building"></i> ${data.company.name}`;
}
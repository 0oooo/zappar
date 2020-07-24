/**
 *  As per design the front end, we start with a fake database.
 *  The "in" property tells us if the element is displayed in the table
 *  The name and photos are HTML elements
 *  The email and permissions are just string
 */
var db = [
    { "in": true, name: "<span class=\"id-name\">Camille Lacheni</span>", photo: "<img src=\"assets/Atom/Avatar/Initial/mini.svg\" class=\"id-photo\"/>", email: "joe.joe@email.com", permission: "Owner" },
    { "in": true, name: "<span class=\"id-name\">Claire Lecoleo</span>", photo: "<img src=\"assets/Atom/Avatar/User/mini.svg\" class=\"id-photo\"/>", email: "Jacob.ahtoewnay@seriousmail.com", permission: "Admin" },
    { "in": true, name: "<span class=\"id-name\">Elie Labru</span>", photo: "<img src=\"assets/Atom/Avatar/User/mini.svg\" class=\"id-photo\"/>", email: ">mylishoe@shoemail.com", permission: "Standard" },
    { "in": false, name: "<span class=\"id-name\">Pending acceptance</span>", photo: "<img src=\"assets/Atom/Avatar/Placeholder/mini.svg\" class=\"id-photo\"/>", email: "j.dog@example.com", permission: "Standard" },
    { "in": false, name: "<span class=\"id-name\">Erica Badu</span>", photo: "<img src=\"assets/Atom/Avatar/Initial/mini.svg\" class=\"id-photo\"/>", email: "e.badu@example.com", permission: "Owner" },
    { "in": false, name: "<span class=\"id-name\">Pat Nelsson</span>", photo: "<img src=\"assets/Atom/Avatar/User/mini.svg\" class=\"id-photo\"/>", email: "p.nelsson@example.com", permission: "Admin" },
    { "in": false, name: "<span class=\"id-name\">Amy Namy</span>", photo: "<img src=\"assets/Atom/Avatar/Initial/mini.svg\" class=\"id-photo\"/>", email: "a.namy@example.com", permission: "Standard" },
    { "in": false, name: "<span class=\"id-name\">Victor D.</span>", photo: "<img src=\"assets/Atom/Avatar/User/mini.svg\" class=\"id-photo\"/>", email: "v.d@example.com", permission: "Standard" },
    { "in": false, name: "<span class=\"id-name\">Olly</span>", photo: "<img src=\"assets/Atom/Avatar/Initial/mini.svg\" class=\"id-photo\"/>", email: "o.hunter@example.com", permission: "Standard" }
];
// Helper to keep track of the number of entries in the table.
// We start with 4 (that includes the headers) as it is used to know the index of the next row to add
var sizeOfTable = 4;
// This is an little hack to know what bin we've clicked on when we want to delete a row.
// We keep track of the id as we need to give new ones when adding a new row
var binId = 3;
/**
 * Add the information of one person to a new row in the table
 * |  Photo  Name   |  Email  | Permission |  Bin icon |
 * @param row (HTML element) to fill
 * @param index of person in the db
 */
var populateCells = function (row, index) {
    var cellName = row.insertCell(0);
    cellName.className = "identity";
    cellName.className += sizeOfTable < 1 ? " first-row" : "";
    cellName.innerHTML = db[index]["photo"];
    cellName.innerHTML += db[index]["name"];
    var cellEmail = row.insertCell(1);
    cellEmail.className = "email";
    cellEmail.className += sizeOfTable < 1 ? " first-row" : "";
    cellEmail.innerHTML = db[index]["email"];
    var cellPermission = row.insertCell(2);
    cellPermission.className = "permission";
    cellPermission.className += sizeOfTable < 1 ? " first-row" : "";
    cellPermission.innerHTML = db[index]["permission"];
    var cellBin = row.insertCell(3);
    cellBin.className = sizeOfTable < 1 ? " first-row" : "";
    cellBin.innerHTML = "<img src=\"assets/bin.svg\" class=\"bin\" id=\"bin\" onclick=\"deleteUser(this.id)\"/>";
    document.getElementById("bin").id = "bin" + binId.toString();
    binId++;
    cellBin.align = "right";
};
/**
 * Check if there are users left to add in the table
 * If yes, create a new row and populate it
 */
var addNewUser = function () {
    var index = Math.floor(Math.random() * (db.length));
    if (sizeOfTable < db.length) {
        // Try to find a person that is not already in the table
        while (db[index]["in"]) {
            index = Math.floor(Math.random() * (db.length));
        }
        db[index]["in"] = true;
        // Add the person to the table
        var table = document.getElementById("table");
        var row = table.insertRow(sizeOfTable);
        populateCells(row, index);
        // Keep track of the size of the table and update the number of people in the table
        sizeOfTable++;
        updateMemberNumber();
    }
};
/**
 * Find the user we are deleting to mark it as NOT in the table (anymore)
 * And delete the row
 * @param id passed through the click to find the user and the row to delete
 */
var deleteUser = function (id) {
    // Find the user with the email we are deleting to mark it as not in the table
    var emailOfDeletedPerson = document.getElementById(id).parentElement.parentElement.children["1"].innerHTML;
    for (var _i = 0, db_1 = db; _i < db_1.length; _i++) {
        var person = db_1[_i];
        if (person["email"] == emailOfDeletedPerson) {
            person["in"] = false;
            break;
        }
    }
    // Remove it
    document.getElementById(id).parentElement.parentElement.remove();
    // Keep track of the size of the table and update the number of people in the table
    sizeOfTable--;
    updateMemberNumber();
};
/**
 * Update the number of members in the table
 */
var updateMemberNumber = function () {
    document.getElementById("active-member").innerHTML = (sizeOfTable - 1).toString();
    document.getElementById("total-member").innerHTML = (db.length - 1).toString();
};
(function () {
    window.addEventListener('load', function (event) {
        updateMemberNumber();
    });
})();

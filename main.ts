const db:Array<object> = [
    {in: true, name: "<span class=\"id-name\">Camille Lacheni</span>", photo: "<img src=\"assets/Atom/Avatar/Initial/mini.svg\" class=\"id-photo\"/>", email: "joe.joe@email.com", permission: "Owner"},
    {in: true, name: "<span class=\"id-name\">Claire Lecoleo</span>", photo: "<img src=\"assets/Atom/Avatar/Placeholder/mini.svg\" class=\"id-photo\"/>", email:"Jacob.ahtoewnay@seriousmail.com", permission: "Admin"},
    {in: true, name: "<span class=\"id-name\">Elie Labru</span>", photo: "<img src=\"assets/Atom/Avatar/User/mini.svg\" class=\"id-photo\"/>", email:">mylishoe@shoemail.com", permission: "Standard"},
    {in: false, name: "<span class=\"id-name\">Pending acceptance</span>", photo: "<img src=\"assets/Atom/Avatar/Placeholder/mini.svg\" class=\"id-photo\"/>", email: "j.dog@example.com", permission: "Standard"},
    {in: false, name: "<span class=\"id-name\">Erica Badu</span>", photo: "<img src=\"assets/Atom/Avatar/Initial/mini.svg\" class=\"id-photo\"/>", email:"e.badu@example.com", permission: "Owner"},
    {in: false, name: "<span class=\"id-name\">Pat Nelsson</span>", photo: "<img src=\"assets/Atom/Avatar/User/mini.svg\" class=\"id-photo\"/>", email:"p.nelsson@example.com", permission: "Admin"},
    {in: false, name: "<span class=\"id-name\">Amy Namy</span>", photo: "<img src=\"assets/Atom/Avatar/Initial/mini.svg\" class=\"id-photo\"/>", email:"a.namy@example.com", permission: "Standard"},
    {in: false, name: "<span class=\"id-name\">Victor D.</span>", photo: "<img src=\"assets/Atom/Avatar/User/mini.svg\" class=\"id-photo\"/>", email:"v.d@example.com", permission: "Standard"},
    {in: false, name: "<span class=\"id-name\">Olly</span>", photo: "<img src=\"assets/Atom/Avatar/Initial/mini.svg\" class=\"id-photo\"/>", email:"o.hunter@example.com", permission: "Standard"}
];


let sizeOfTable = 4; // starting size of the table;
let binid = 3;


const populateCells = (row:HTMLTableRowElement, index:number) => {
    const cellName = row.insertCell(0);
    cellName.className = "identity";
    cellName.className += sizeOfTable < 1 ? " first-row" : "";
    cellName.innerHTML = db[index]["photo"];
    cellName.innerHTML += db[index]["name"];

    const cellEmail = row.insertCell(1);
    cellEmail.className = "email";
    cellEmail.className += sizeOfTable < 1 ? " first-row" : "";
    cellEmail.innerHTML = db[index]["email"];

    const cellPermission = row.insertCell(2);
    cellPermission.className = "permission";
    cellPermission.className += sizeOfTable < 1 ? " first-row" : "";
    cellPermission.innerHTML = db[index]["permission"];

    const cellBin = row.insertCell(3);
    cellBin.className = sizeOfTable < 1 ? " first-row" : "";
    cellBin.innerHTML = "<img src=\"assets/bin.svg\" class=\"bin\" id=\"bin\" onclick=\"deleteUser(this.id)\"/>";
    document.getElementById("bin").id = "bin" + binid.toString();
    binid++;
    cellBin.align = "right";
};


const addNewUser = () => {
    let index:number = Math.floor(Math.random() * (db.length));

    if(sizeOfTable < db.length + 1){
        while(db[index]["in"]){
            console.log("already in the table");
            index = Math.floor(Math.random() * (db.length));
        }
        db[index]["in"] = true;
        const table: HTMLTableElement = <HTMLTableElement> document.getElementById("table");
        const row:HTMLTableRowElement = table.insertRow(sizeOfTable);
        populateCells(row, index);
        sizeOfTable++;
        updateMemberNumber();
    }else{
     //todo add error message?
    }

};


const deleteUser = (id:string) => {
    const emailOfDeletedPerson = document.getElementById(id).parentElement.parentElement.children["1"].innerHTML;
        for(let person of db){
            if(person["email"] == emailOfDeletedPerson){
                person["in"] = false;
                break;
            }
        }

    document.getElementById(id).parentElement.parentElement.remove();
    sizeOfTable--;
    updateMemberNumber();
};

const updateMemberNumber = () => {
    document.getElementById("active-member").innerHTML = (sizeOfTable -1).toString();
    document.getElementById("total-member").innerHTML = db.length.toString();
};

(() => {
    window.addEventListener('load', (event) => {
        updateMemberNumber();
    });
})();
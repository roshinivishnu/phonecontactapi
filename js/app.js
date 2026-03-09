let nameInput = document.getElementById("name");
let phoneInput = document.getElementById("phone");
let addBtn = document.getElementById("addBtn");
let contactList = document.getElementById("contactList");
let search = document.getElementById("search");

let contacts = [];

// Fetch contacts
const getContacts = async () => {
    try{
        const res = await fetch("https://jsonplaceholder.typicode.com/users");
        const data = await res.json();

        contacts = data;
        displayContacts(contacts);
    }
    catch(err){
        console.log("Error fetching contacts",err);
    }
};

// Display contacts
function displayContacts(list){
    contactList.innerHTML="";

    list.forEach(contact => {

        let li = document.createElement("li");

        li.innerHTML = `
        ${contact.name} - ${contact.phone}
        <button onclick="deleteContact(${contact.id})">Delete</button>
        <button onclick="editContact(${contact.id})">Edit</button>
        `;

        contactList.appendChild(li);
    });
}

// Add contact
addBtn.addEventListener("click", () => {

    let newContact = {
        id: Date.now(),
        name: nameInput.value,
        phone: phoneInput.value
    };

    contacts.push(newContact);
    displayContacts(contacts);

    nameInput.value="";
    phoneInput.value="";
});

// Delete contact
function deleteContact(id){
    contacts = contacts.filter(c => c.id !== id);
    displayContacts(contacts);
}

// Edit contact
function editContact(id){

    let contact = contacts.find(c => c.id === id);

    nameInput.value = contact.name;
    phoneInput.value = contact.phone;

    deleteContact(id);
}

// Search contact
search.addEventListener("input", () => {

    let value = search.value.toLowerCase();

    let filtered = contacts.filter(c =>
        c.name.toLowerCase().includes(value) ||
        c.phone.includes(value)
    );

    displayContacts(filtered);
});

getContacts();
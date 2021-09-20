// create vairable to hold db connection
let db;
// establish a connection to IndexDB database called 'pizza_hunt and set it to version 1
const request = indexedDB.open('pizza_hunt', 1);

// this event will emit if the database version changes (nonexistant to version 1, v1, to v2, etc.)
request.onUpgradeNeeded = function(event) {
    // save a reference to the database
    const db = event.target.result;
    // create an object store (table) called `new_pizza`, set iot to have an auto incrementing primary key of sorts
    db.createObjectStore('new_pizza', { autoIncrement: true });
};

// upon a successful
request.onSuccess = function(event) {
    // When db is successfully created with its object store (from onUpgradeNeeded event above) or simply established a connection, 
    // save reference to db in global variable.
    db = event.target.result;

    // check if app is online,
    if (navigator.online) {
        // uploadPizza(); (NOT CREATED YET; UNCOMMENT WHEN CREATED)
    }
};

request.onError = function(event) {
    // log error here
    console.log(event.target.errorCode);
};
let users = [
    { id: 1, name: "otman", email: "otmana@gmail.com"},
    { id: 2, name: "omar", email: "omar@gmail.com" },
    { id: 3, name: "amin", email: "amin@gmail.com" },
];

async function addUser(name, email){
    if(isEmailTaken(email)) {
        console.log("Sorry This email is Already Taken")
        return null
    } 

    let newId = users.length > 0 ? users[users.length - 1].id + 1 : 1;
    let newUser = {
        id: newId,
        name:  name,
        email: email
    };
    users.push(newUser);
    console.log(`✅ User "${name}" added successfully!`);
    try {
        let result = await saveUserToDatabase(newUser);
    console.log(result);
    } catch(error){
        console.log(`database Error ${Error.message}`);
        console.log(`user ${name} wass added only locally not in the database`)
    }
    return newUser;
}

function findUserById(id){
    return users.find(user => user.id === id) || null;
}

function listAllUsers() {
    console.log("---Here all users saved in the database---");
    users.forEach(user => {
        console.log(`${user.id}: ${user.name} (${user.email})`);
    });
}

function isEmailTaken(email) {
    return users.some(user => user.email === email );
}


function saveUserToDatabase(user){
    return new Promise((resolve, reject) => {  // ✅ Added reject
        setTimeout(() => {
            if (Math.random() > 0.5) {  // ✅ Fixed typo
                reject(new Error("Database Has Crashed"));
            } else {
                resolve(`${user.name} Saved to database!`);
            }
        }, 2000);
    });
}

function updateUser(id, newData) {
    users = users.map(user => {
        if (user.id === id) {
            return { ...user, ...newData, id: user.id };
        }
        return user;
    });
    console.log(`✅ User with ID ${id} updated successfully!`);
}

function deleteUser(id){
    users = users.filter(user => user.id !== id);
    console.log(`✅ User with ID ${id} deleted successfully!`);
}

function countUsers() {
  return users.length;
}

console.log("Total users:", countUsers()); 

// ===== TESTING =====

console.log("Before adding:");
listAllUsers();

console.log("\nAdding a new user...");
let newUser = await addUser("saad", "saad@gmail.com");
console.log("Added:", newUser);

console.log("\nAfter adding:");
listAllUsers();

console.log("\nFinding user with ID 2:");
let foundUser = findUserById(2);
console.log("Found:", foundUser);

console.log("\nFinding user with ID 99 (doesn't exist):");
let notFound = findUserById(99);
console.log("Result:", notFound);

async function testRegistration() {
    console.log("\n--- Testing Registration with Async ---");
    console.log("Starting registration...");
    await addUser("youssef", "youssef@gmail.com");
    console.log("Registration complete!");
}

testRegistration();
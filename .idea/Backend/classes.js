// classes.js

class Plan {
    constructor(name, credits, list) {
        this.name = name;
        this.credits = credits;
        this.list = []; // initialize the list array
        for (let i = 0; i < list.length; i++) {
            this.list[i] = new Course(list[i]);
        }
    }

    // If you need to initialize prerequisites as Course objects, adjust accordingly
    init(list) {
        for (let i = 0; i < list.length; i++) {
            for (let x = 0; x < list[i].prereq.length; x++) {
                for (let z = 0; z < list[i].prereq[x].length; z++) {
                    for (let y = 0; y < list.length; y++) {
                        if (list[y].name === list[i].prereq[x][z]) {
                            list[i].prereq[x][z] = list[y];
                            break;
                        }
                    }
                }
            }
        }
    }
}

class Course {
    // Expected format:
    // "CMSC 102; intro to computer science 2; 3; CMSC 101|TEST 101; Second CMSC intro class; John Smith, Jane Doe;"
    // Where prerequisites are in a 2D format:
    // Each group is separated by a comma, alternatives in a group are separated by a pipe.
    constructor(courseData) {
        // Split the course data on semicolons
        let parts = courseData.split(";");
        this.name = parts[0].trim();
        this.title = parts[1].trim();
        this.credits = Number(parts[2].trim());
        // Process prerequisites:
        // First, trim the prerequisites string
        let prereqString = parts[3].trim();
        // If empty, use an empty 2D array
        if (prereqString === "") {
            this.prereq = [];
        } else {
            // Split groups by comma and then alternatives by pipe
            this.prereq = prereqString.split(",").map(group => {
                return group.split("|").map(alt => alt.trim());
            });
        }
        this.description = parts[4].trim();
        // Process professors (split by comma)
        this.professors = parts[5].split(",").map(prof => prof.trim());
    }
}

module.exports = { Plan, Course };

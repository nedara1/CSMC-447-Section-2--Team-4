// classes.js

class Plan {
    constructor(name, credits, list) {
        this.name = name;
        this.credits = credits;
        this.list = []; // Initialize list as an array

        // Create Course objects from the provided list data
        for (let i = 0; i < list.length; i++) {
            this.list[i] = new Course(list[i]);
        }
    }

    init(list) {
        // Additional initialization code if needed
    }
}

class Course {
    // Example list:
    // "CMSC 102; intro to computer science 2; 3; CMSC 101, TEST 101; Second CMSC intro class; John Smith, Jane Doe;"
    constructor(list) {
        this.name = "";
        this.num = 0;
        this.title = "";
        let credittemp = "";
        this.credits = 0;
        let prereqtemp = "";
        this.prereq = [];
        this.description = "";
        let proftemp = "";
        this.professors = [];

        let holder = 0;
        // Use list.length (not list.length()) for iterating over the string
        for (let i = 0; i < list.length; i++) {
            if (list.charAt(i) === ";") {
                holder++;
                i++; // Skip any extra space (if needed)
            } else {
                switch (holder) {
                    case 0:
                        // Course code/name
                        this.name += list.charAt(i);
                        break;
                    case 1:
                        // Course title
                        this.title += list.charAt(i);
                        break;
                    case 2:
                        // Credit count
                        credittemp += list.charAt(i);
                        break;
                    case 3:
                        // Prerequisites string
                        prereqtemp += list.charAt(i);
                        break;
                    case 4:
                        // Course description
                        this.description += list.charAt(i);
                        break;
                    case 5:
                        // Professors string
                        proftemp += list.charAt(i);
                        break;
                    default:
                        break;
                }
            }
        }

        // Process numeric values and arrays
        // Assumes that the course number is the last 2 characters of the course code.
        this.num = Number(this.name.substring(this.name.length - 2));
        this.credits = Number(credittemp);

        // Split prerequisites and professors by comma, then trim any extra whitespace
        this.prereq = prereqtemp.split(",").map(item => item.trim()).filter(item => item !== "");
        this.professors = proftemp.split(",").map(item => item.trim()).filter(item => item !== "");
    }
}

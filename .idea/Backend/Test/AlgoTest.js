// AlgoTest.js

const { Course } = require('../Models/classes');
const { checkPrerequisites, checkCourseSequence } = require('../Utils/DataAlgo');

// ---------------------------------------------------------------------
// Helper Functions
// ---------------------------------------------------------------------

/**
 * Adds a course name to the given takenCourses array.
 * @param {string} courseName
 * @param {Array} takenCourses
 */
function addCourseTaken(courseName, takenCourses) {
    takenCourses.push(courseName);
    console.log(`Added ${courseName} to taken courses.`);
}

/**
 * Displays the current list of courses the student has taken.
 * @param {Array} takenCourses
 */
function displayTakenCourses(takenCourses) {
    console.log("Student's taken courses: " + takenCourses.join(", "));
}

/**
 * Prints out the necessary prerequisites for the given course.
 * @param {Course} course
 */
function printNecessaryPrereqs(course) {
    console.log(`Necessary prerequisites for ${course.name}:`);
    if (course.prereq.length === 0 || (course.prereq.length === 1 && course.prereq[0].length === 0)) {
        console.log("  None.");
    } else {
        course.prereq.forEach((group, index) => {
            console.log(`  Group ${index + 1}: ${group.join(" OR ")}`);
        });
    }
}

/**
 * Tests a single course's prerequisites using the provided takenCourses array.
 * @param {string} testLabel - Label to identify the test.
 * @param {Course} course - The course to test.
 * @param {Array} takenCourses - Array of courses the student has taken.
 */
function testCourse(testLabel, course, takenCourses) {
    console.log(`\n[${testLabel}] Testing prerequisites for ${course.name}...`);
    printNecessaryPrereqs(course);
    if (checkPrerequisites(course, takenCourses)) {
        console.log(`Prerequisites for ${course.name} are satisfied.`);
        console.log(`You are eligible to enroll in ${course.name}.`);
    } else {
        console.log(`You are NOT eligible to enroll in ${course.name}.`);
    }
}

/**
 * Runs a sequence test for an ordered array of courses.
 * @param {string} testLabel
 * @param {Array} courseSequence - An ordered array of Course objects.
 * @param {boolean} expectedValid - Expected outcome (true if valid sequence).
 */
function runSequenceTest(testLabel, courseSequence, expectedValid) {
    console.log(`\n[${testLabel}]`);
    console.log("Course sequence: " + courseSequence.map(c => c.name).join(" -> "));
    console.log("Necessary prerequisites for each course in the sequence:");
    courseSequence.forEach((course, index) => {
        console.log(`  ${index + 1}. ${course.name}:`);
        if (course.prereq.length === 0 || (course.prereq.length === 1 && course.prereq[0].length === 0)) {
            console.log("      None.");
        } else {
            course.prereq.forEach((group, i) => {
                console.log(`      Group ${i + 1}: ${group.join(" OR ")}`);
            });
        }
    });
    const result = checkCourseSequence(courseSequence);
    console.log(`Expected sequence valid: ${expectedValid}`);
    console.log(`Result: ${result ? "Valid" : "Invalid"}`);
    console.log(result === expectedValid ? "Test PASSED" : "Test FAILED");
}

// ---------------------------------------------------------------------
// Part 1: Single Course Tests
// ---------------------------------------------------------------------

console.log("==== Single Course Tests ====");

// Test A: PHYS 101 (requires MATH 100) - Expected to PASS.
let studentTakenCourses = ["MATH 100", "ENGL 101"];
console.log("\nTest Type: Single Prerequisite (PHYS 101) [PASS]");
displayTakenCourses(studentTakenCourses);
const coursePhys101 = new Course(
    "PHYS 101; Basic Physics; 3; MATH 100; Intro to physics; Prof. X;"
);
testCourse("Test A", coursePhys101, studentTakenCourses);

// Test B: ENG 101 (requires ENGL 50) - Expected to FAIL.
studentTakenCourses = ["ENGL 40", "HIST 100"];
console.log("\nTest Type: Single Prerequisite (ENG 101) [FAIL]");
displayTakenCourses(studentTakenCourses);
const courseEng101 = new Course(
    "ENG 101; Intro to English; 3; ENGL 50; Composition basics; Prof. Y;"
);
testCourse("Test B", courseEng101, studentTakenCourses);

// Test C: CS 201 (requires CS 101 and MATH 101) - Expected to PASS.
studentTakenCourses = ["CS 101", "MATH 101", "ENGL 101"];
console.log("\nTest Type: Two Prerequisites (CS 201) [PASS]");
displayTakenCourses(studentTakenCourses);
const courseCS201 = new Course(
    "CS 201; Data Structures; 3; CS 101, MATH 101; Intermediate programming; Prof. C;"
);
testCourse("Test C", courseCS201, studentTakenCourses);

// Test D: CS 201 with missing one prereq (only CS 101) - Expected to FAIL.
studentTakenCourses = ["CS 101", "ENGL 101"];
console.log("\nTest Type: Two Prerequisites (CS 201 missing MATH 101) [FAIL]");
displayTakenCourses(studentTakenCourses);
testCourse("Test D", courseCS201, studentTakenCourses);

// Test E: HIST 201 (requires HIST 101, and either POLS 100 OR ECON 101) - Expected to PASS.
studentTakenCourses = ["HIST 101", "ECON 101"];
console.log("\nTest Type: One Prerequisite + OR Condition (HIST 201) [PASS]");
displayTakenCourses(studentTakenCourses);
const courseHist201 = new Course(
    "HIST 201; Modern History; 3; HIST 101, POLS 100|ECON 101; History course; Prof. D;"
);
testCourse("Test E", courseHist201, studentTakenCourses);

// Test F: HIST 201 (requires HIST 101, and either POLS 100 OR ECON 101) - Expected to FAIL.
studentTakenCourses = ["HIST 101"];
console.log("\nTest Type: One Prerequisite + OR Condition (HIST 201) [FAIL]");
displayTakenCourses(studentTakenCourses);
testCourse("Test F", courseHist201, studentTakenCourses);

// ---------------------------------------------------------------------
// Part 2: Course Sequence Tests
// ---------------------------------------------------------------------

// Group 1: Single Prerequisite Sequence
const math101 = new Course("MATH 101; Basic Math; 3; ; Intro math; Prof. X;");
const math102 = new Course("MATH 102; Advanced Math; 3; MATH 101; Advanced math; Prof. Y;");
const seq1_valid = [math101, math102];
const seq1_invalid = [math102, math101];
runSequenceTest("Sequence Group 1 - Single Prereq (Valid)", seq1_valid, true);
runSequenceTest("Sequence Group 1 - Single Prereq (Invalid)", seq1_invalid, false);

// Group 2: Two Prerequisites Sequence
const cs101 = new Course("CS 101; Intro CS; 3; ; Intro CS; Prof. A;");
const math101B = new Course("MATH 101; Basic Math; 3; ; Intro math; Prof. B;");
const cs201_seq = new Course("CS 201; Data Structures; 3; CS 101, MATH 101; Data Structures; Prof. C;");
const seq2_valid = [cs101, math101B, cs201_seq];
const seq2_invalid = [cs101, cs201_seq, math101B];
runSequenceTest("Sequence Group 2 - Two Prereq (Valid)", seq2_valid, true);
runSequenceTest("Sequence Group 2 - Two Prereq (Invalid)", seq2_invalid, false);

// Group 3: One Prerequisite with OR Condition Sequence
const bio101 = new Course("BIO 101; Intro Biology; 3; ; Intro Biology; Prof. D;");
const chem101 = new Course("CHEM 101; Intro Chemistry; 3; ; Intro Chemistry; Prof. E;");
const bio201 = new Course("BIO 201; Advanced Biology; 3; BIO 101, CHEM 101|CHEM 102; Advanced Biology; Prof. F;");
const seq3_valid = [bio101, chem101, bio201];
const seq3_invalid = [bio101, bio201];
runSequenceTest("Sequence Group 3 - One Prereq OR (Valid)", seq3_valid, true);
runSequenceTest("Sequence Group 3 - One Prereq OR (Invalid)", seq3_invalid, false);

// Group 4: Complex Sequence with Multiple OR Conditions
const chem101_main = new Course("CHEM 101; General Chemistry; 3; ; Basic Chemistry; Prof. G;");
const chem210 = new Course("CHEM 210; Organic Lab; 3; ; Lab experience; Prof. H;");
const chem201 = new Course("CHEM 201; Organic Chemistry; 3; CHEM 101; Organic Chemistry; Prof. I;");
const chem301 = new Course("CHEM 301; Advanced Organic Chemistry; 3; CHEM 201, CHEM 210|CHEM 220|CHEM 230; Advanced Organic; Prof. J;");
const seq4_valid = [chem101_main, chem210, chem201, chem301];
const seq4_invalid = [chem101_main, chem201, chem301];
runSequenceTest("Sequence Group 4 - Complex OR (Valid)", seq4_valid, true);
runSequenceTest("Sequence Group 4 - Complex OR (Invalid)", seq4_invalid, false);

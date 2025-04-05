// DataAlgo.js

/**
 * Checks whether the prerequisites for a course are met.
 * Now, course.prereq is assumed to be a 2D array.
 * Each row represents a group of alternatives (i.e. "one of these must be taken").
 *
 * @param {Object} course - A Course object with a 2D prereq array.
 * @param {Array} takenCourses - An array of course names the student has taken.
 * @returns {Boolean} - True if all groups of prerequisites are satisfied.
 */
function checkPrerequisites(course, takenCourses) {
    // Iterate over each group (row) of prerequisites.
    for (let prereqGroup of course.prereq) {
        // Each prereqGroup is an array of alternative prerequisites.
        let satisfied = false;
        let prefix = "";
        if (prereqGroup.length > 0) {
            // Infer a common prefix from the first alternative.
            const parts = prereqGroup[0].trim().split(" ");
            if (parts.length > 1) {
                prefix = parts[0]; // e.g., "STAT" from "STAT 350"
            }
        }
        // Check if at least one alternative in the group is satisfied.
        for (let alt of prereqGroup) {
            alt = alt.trim();
            // If alt appears to be missing the prefix (no space), prepend it.
            if (prefix && alt.indexOf(" ") === -1) {
                alt = prefix + " " + alt;
            }
            if (takenCourses.includes(alt)) {
                satisfied = true;
                break;
            }
        }
        // If none of the alternatives in this group are met, return false.
        if (!satisfied) {
            console.error(`Error: To enroll in ${course.name}, you must have taken one of the following: ${prereqGroup.join(" OR ")}.`);
            return false;
        }
    }
    return true;
}

/**
 * Checks an entire sequence of courses to ensure that, as you progress,
 * each course's prerequisites are met by the courses taken earlier in the sequence.
 *
 * @param {Array} courseList - An ordered array of Course objects.
 * @returns {Boolean} - True if the entire sequence is valid; otherwise, false.
 */
function checkCourseSequence(courseList) {
    // Keep track of course names that have been completed.
    let completedCourses = [];

    for (let course of courseList) {
        // Check if the prerequisites for the current course are met by completed courses.
        if (!checkPrerequisites(course, completedCourses)) {
            console.error(`Sequence error: prerequisites for ${course.name} are not met. Completed courses: ${completedCourses.join(", ")}`);
            return false;
        }
        console.log(`${course.name} prerequisites met. Adding ${course.name} to completed courses.`);
        completedCourses.push(course.name);
    }

    console.log("All courses in the sequence have met their prerequisites.");
    return true;
}

module.exports = { checkPrerequisites, checkCourseSequence };

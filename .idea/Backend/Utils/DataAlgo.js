// DataAlgo.js

function checkPrerequisites(course, takenCourses) {
    for (let prereqGroup of course.prereq) {
        let satisfied = false;
        let prefix = "";
        if (prereqGroup.length > 0) {
            const parts = prereqGroup[0].trim().split(" ");
            if (parts.length > 1) {
                prefix = parts[0];
            }
        }
        for (let alt of prereqGroup) {
            alt = alt.trim();
            if (prefix && alt.indexOf(" ") === -1) {
                alt = prefix + " " + alt;
            }
            if (takenCourses.includes(alt)) {
                satisfied = true;
                break;
            }
        }
        if (!satisfied) {
            console.error(`Error: To enroll in ${course.name}, you must have taken one of the following: ${prereqGroup.join(" OR ")}.`);
            return false;
        }
    }
    return true;
}

function checkCourseSequence(courseList) {
    let completedCourses = [];
    for (let course of courseList) {
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

// Always export for Node:
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { checkPrerequisites, checkCourseSequence };
}

// Also attach to window if running in browser:
if (typeof window !== 'undefined') {
    window.checkPrerequisites = checkPrerequisites;
    window.checkCourseSequence = checkCourseSequence;
}





/**
function checkPrerequisites(course, takenCourses) {
    console.log(`    ↳ checkPrerequisites for ${course.name}; takenCourses: [${takenCourses.join(', ')}]`);
    for (let prereqGroup of course.prereq) {
        console.log(`      • checking group: [${prereqGroup.join(' OR ')}]`);
        let satisfied = false;
        // (existing prefix logic…)
        for (let alt of prereqGroup) {
            // (existing alt normalization…)
            if (takenCourses.includes(alt)) {
                console.log(`        ✓ satisfied by ${alt}`);
                satisfied = true;
                break;
            }
        }
        if (!satisfied) {
            console.error(`        ✗ none of [${prereqGroup.join(', ')}] satisfied for ${course.name}`);
            return false;
        }
    }
    console.log(`    ↳ all prereq groups satisfied for ${course.name}`);
    return true;
}

function checkCourseSequence(courseList) {
    console.log('→ checkCourseSequence called with:', courseList.map(c => c.name));
    let completedCourses = [];
    for (let course of courseList) {
        console.log(`  → Testing ${course.name}…`);
        if (!checkPrerequisites(course, completedCourses)) {
            console.error(`  ✗ Sequence error at ${course.name}`);
            return false;
        }
        console.log(`  ✓ ${course.name} OK — adding to completed`);
        completedCourses.push(course.name);
    }
    console.log('→ All courses passed sequence check');
    return true;
}


 **/
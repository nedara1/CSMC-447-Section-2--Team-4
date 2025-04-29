// Controllers/CourseController.js
const { retrieveCourse } = require('./RetrieveCourse');

async function getCourseById(req, res) {
    console.log('GET /api/course/:courseId →', req.params.courseId);
    try {
        const doc = await retrieveCourse(req.params.courseId);
        if (!doc) {
            console.log('  → No document found');
            return res.status(404).json({ error: 'Course not found' });
        }
        console.log('  → Found document:', doc);
        res.json(doc);
    } catch (err) {
        console.error('  → Error retrieving course:', err);
        res.status(500).json({ error: 'Server error' });
    }
}

module.exports = { getCourseById };

// addCourses_CMSConlyFiltered.js - inserts courses, only CMSC prereqs that are also being added
const { MongoClient } = require('mongodb');

// Replace with your connection string.
const uri = "mongodb+srv://test1:Hello12345@4ypdatabase.99j9mje.mongodb.net/?retryWrites=true&w=majority&appName=4YPDatabase";
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

async function addCourses() {
    try {
        // Connect to MongoDB
        await client.connect();
        console.log("Connected to MongoDB for course insertion");

        // Choose your database and collection
        const database = client.db("4YPDatabase");  // adjust as needed
        const courses = database.collection("courses");

        // Array of course documents to insert
        const courseDocs = [
            {
                courseId: "CMSC 104",
                title: "Problem Solving and Computer Programming",
                credits: 3,
                description: "",
                professors: [],
            },
            {
                courseId: "CMSC 121",
                title: "Introduction to UNIX",
                credits: 1,
                description: "",
                professors: [],
            },
            {
                courseId: "CMSC 201",
                title: "Computer Science 1",
                credits: 4,
                description: "",
                professors: [],
            },
            {
                courseId: "CMSC 202",
                title: "Computer Science 2",
                credits: 4,
                prerequisites: ["CMSC 201"],
                description: "",
                professors: [],
            },
            {
                courseId: "CMSC 203",
                title: "Discrete Structures",
                credits: 3,
                description: "",
                professors: [],
            },
            {
                courseId: "CMSC 304",
                title: "Social and Ethical Issues in Information Technology",
                credits: 3,
                prerequisites: ["CMSC 202"],
                description: "",
                professors: [],
            },
            {
                courseId: "CMSC 313",
                title: "Computer Organization and Assembly Language Programming",
                credits: 3,
                prerequisites: ["CMSC 202", "CMSC 203"],
                description: "",
                professors: [],
            },
            {
                courseId: "CMSC 331",
                title: "Principles of Programming Language",
                credits: 3,
                prerequisites: ["CMSC 203"],
                description: "",
                professors: [],
            },
            {
                courseId: "CMSC 340",
                title: "Advanced C++",
                credits: 3,
                prerequisites: ["CMSC 341"],
                description: "",
                professors: [],
            },
            {
                courseId: "CMSC 341",
                title: "Data Structures",
                credits: 3,
                prerequisites: ["CMSC 202", "CMSC 203"],
                description: "",
                professors: [],
            },
            {
                courseId: "CMSC 396",
                title: "Undergraduate Teaching Fellowship",
                credits: 3,
                prerequisites: ["CMSC 201"],
                description: "",
                professors: [],
            },
            {
                courseId: "CMSC 411",
                title: "Computer Architecture",
                credits: 3,
                prerequisites: ["CMSC 313"],
                description: "",
                professors: [],
            },
            {
                courseId: "CMSC 421",
                title: "Principles of Operating Systems",
                credits: 3,
                prerequisites: ["CMSC 341", "CMSC 313"],
                description: "",
                professors: [],
            },
            {
                courseId: "CMSC 426",
                title: "Principles of Computer Security",
                credits: 3,
                prerequisites: ["CMSC 341", "CMSC 313"],
                description: "",
                professors: [],
            },
            {
                courseId: "CMSC 427",
                title: "Wearable Computing",
                credits: 3,
                description: "",
                professors: [],
            },
            {
                courseId: "CMSC 428",
                title: "Introduction to Mobile Computing",
                credits: 3,
                prerequisites: ["CMSC 421"],
                description: "",
                professors: [],
            },
            {
                courseId: "CMSC 431",
                title: "Compiler Design Principles",
                credits: 3,
                prerequisites: ["CMSC 313", "CMSC 331", "CMSC 341"],
                description: "",
                professors: [],
            },
            {
                courseId: "CMSC 433",
                title: "Scripting Languages",
                credits: 3,
                prerequisites: ["CMSC 331"],
                description: "",
                professors: [],
            },
            {
                courseId: "CMSC 435",
                title: "Computer Graphics",
                credits: 3,
                prerequisites: ["CMSC 313", "CMSC 341"],
                description: "",
                professors: [],
            },
            {
                courseId: "CMSC 436",
                title: "Data Visualization",
                credits: 3,
                prerequisites: ["CMSC 341"],
                description: "",
                professors: [],
            },
            {
                courseId: "CMSC 437",
                title: "Graphical User Interface Programming",
                credits: 3,
                prerequisites: ["CMSC 341"],
                description: "",
                professors: [],
            },
            {
                courseId: "CMSC 438",
                title: "Graphics for Games",
                credits: 3,
                prerequisites: ["CMSC 341"],
                description: "",
                professors: [],
            },
            {
                courseId: "CMSC 441",
                title: "Design and Analysis of Algorithms",
                credits: 3,
                prerequisites: ["CMSC 341"],
                description: "",
                professors: [],
            },
            {
                courseId: "CMSC 442",
                title: "Information and Coding Theory",
                credits: 3,
                prerequisites: ["CMSC 203"],
                description: "",
                professors: [],
            },
            {
                courseId: "CMSC 443",
                title: "Cryptology",
                credits: 3,
                prerequisites: ["CMSC 341"],
                description: "",
                professors: [],
            },
            {
                courseId: "CMSC 444",
                title: "Information Assurance",
                credits: 3,
                prerequisites: ["CMSC 421", "CMSC 481"],
                description: "",
                professors: [],
            },
            {
                courseId: "CMSC 446",
                title: "Introduction to Design Patterns",
                credits: 3,
                prerequisites: ["CMSC 331"],
                description: "",
                professors: [],
            },
            {
                courseId: "CMSC 447",
                title: "Software Engineering I",
                credits: 3,
                prerequisites: ["CMSC 341"],
                description: "",
                professors: [],
            },
            {
                courseId: "CMSC 448",
                title: "Software Engineering II",
                credits: 3,
                prerequisites: ["CMSC 447"],
                description: "",
                professors: [],
            },
            {
                courseId: "CMSC 449",
                title: "Malware Analysis",
                credits: 3,
                prerequisites: ["CMSC 313", "CMSC 341"],
                description: "",
                professors: [],
            },
            {
                courseId: "CMSC 451",
                title: "Automata Theory and Fromal Languages",
                credits: 3,
                prerequisites: ["CMSC 202", "CMSC 203"],
                description: "",
                professors: [],
            },
            {
                courseId: "CMSC 452",
                title: "Logic for Computer Science",
                credits: 3,
                prerequisites: ["CMSC 203"],
                description: "",
                professors: [],
            },
            {
                courseId: "CMSC 453",
                title: "Applied Combinatorics and Graph Theory",
                credits: 3,
                prerequisites: ["CMSC 341"],
                description: "",
                professors: [],
            },
            {
                courseId: "CMSC 455",
                title: "Numerical Computations",
                credits: 3,
                prerequisites: ["CMSC 341"],
                description: "",
                professors: [],
            },
            {
                courseId: "CMSC 456",
                title: "Symbolic Computation",
                credits: 3,
                prerequisites: ["CMSC 341"],
                description: "",
                professors: [],
            },
            {
                courseId: "CMSC 457",
                title: "Quantum Computatins",
                credits: 3,
                prerequisites: ["CMSC 203"],
                description: "",
                professors: [],
            },
            {
                courseId: "CMSC 461",
                title: "Database Management Systems",
                credits: 3,
                prerequisites: ["CMSC 341"],
                description: "",
                professors: [],
            },
            {
                courseId: "CMSC 462",
                title: "Introduction to Data Science",
                credits: 3,
                prerequisites: ["CMSC 341"],
                description: "",
                professors: [],
            },
            {
                courseId: "CMSC 463",
                title: "Data Privacy",
                credits: 3,
                prerequisites: ["CMSC 341"],
                description: "",
                professors: [],
            },
            {
                courseId: "CMSC 471",
                title: "Introduction to Artificial Intelligence",
                credits: 3,
                prerequisites: ["CMSC 341"],
                description: "",
                professors: [],
            },
            {
                courseId: "CMSC 473",
                title: "Introduction to Natural Language Processing",
                credits: 3,
                prerequisites: ["CMSC 341"],
                description: "",
                professors: [],
            },
            {
                courseId: "CMSC 474",
                title: "Introduction to Brain-Computer Interaction",
                credits: 3,
                prerequisites: ["CMSC 341"],
                description: "",
                professors: [],
            },
            {
                courseId: "CMSC 475",
                title: "Introduction to Neural Networks",
                credits: 3,
                prerequisites: ["CMSC 341"],
                description: "",
                professors: [],
            },
            {
                courseId: "CMSC 476",
                title: "Information Retrieval",
                credits: 3,
                prerequisites: ["CMSC 341"],
                description: "",
                professors: [],
            },
            {
                courseId: "CMSC 477",
                title: "Agent Architectures and Multi-Agent Systems",
                credits: 3,
                prerequisites: ["CMSC 471"],
                description: "",
                professors: [],
            },
            {
                courseId: "CMSC 478",
                title: "Introduction to Machine Learning",
                credits: 3,
                prerequisites: ["CMSC 341"],
                description: "",
                professors: [],
            },
            {
                courseId: "CMSC 479",
                title: "Introduction to Robotics",
                credits: 3,
                prerequisites: ["CMSC 471"],
                description: "",
                professors: [],
            },
            {
                courseId: "CMSC 481",
                title: "Computer Networks",
                credits: 3,
                prerequisites: ["CMSC 341"],
                description: "",
                professors: [],
            },
            {
                courseId: "CMSC 483",
                title: "Parallel and Distributed Processing",
                credits: 3,
                prerequisites: ["CMSC 421", "CMSC 481"],
                description: "",
                professors: [],
            },
            {
                courseId: "CMSC 486",
                title: "Mobile Radio Communication",
                credits: 3,
                description: "",
                professors: [],
            },
            {
                courseId: "CMSC 487",
                title: "Introduction to Network Security",
                credits: 3,
                description: "",
                professors: [],
            },
            {
                courseId: "CMSC 491",
                title: "Special Topics in Computer Science",
                credits: 3,
                prerequisites: ["CMSC 341"],
                description: "",
                professors: [],
            },
            {
                courseId: "CMSC 493",
                title: "Capstone Game Group Project",
                credits: 3,
                prerequisites: ["CMSC 471"],
                description: "",
                professors: [],
            },
        ];

        // Optionally, create a unique index on courseId
        // await courses.createIndex({ courseId: 1 }, { unique: true });

        // Insert each course document
        for (const courseDoc of courseDocs) {
            try {
                const result = await courses.insertOne(courseDoc);
                console.log(`Course inserted with _id: ${result.insertedId} (${courseDoc.courseId})`);
            } catch (error) {
                console.error(`Error inserting ${courseDoc.courseId}:`, error.message);
            }
        }
    } catch (error) {
        console.error("Error while inserting courses:", error);
    } finally {
        // Close the connection.
        await client.close();
    }
}

addCourses().catch(console.error);
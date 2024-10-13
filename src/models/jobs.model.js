import mongoose from "mongoose";


// Example job model document
// {
//     company:"Amazon",
//     jobTitle:"Software Developer I",
//     jobDescription:"Software Developer with the following requirments",
//     workLocation:"Bengaluru",
//     workMode:"On-Site",
//     workType:"Full-time",
//     salary:"5LPA - 8 LPA",
//     postedBy:"hr@amazon.com" // id of the user

// }
const jobSchema = new mongoose.Schema({
    company: {
        type: String,
        required: [true, "Company name is required"]
    },
    jobTitle: {
        type: String,
        required: [true, "Job Title is required"],
        maxLength: 200
    },
    jobDescription: {
        type: String,
        required: [true, "Job Description is required"],
        minLength: 100
    },
    workLocation: {
        type: String,
        default: "Not Available"
    },
    workMode: {
        type: String,
        enum: ['Remote', 'Hybrid', 'On-Site'],
        default: 'On-Site'
    },
    workType: {
        type: String,
        enum: ['Full-time', 'Part-time', 'Internship', 'Contract'],
        default: 'Full-time'
    },
    salary: {
        type: String,
        required: [true, "Salary range is required"]
    },
    postedBy: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true });

const jobModel = mongoose.model("Job", jobSchema);

export default jobModel;
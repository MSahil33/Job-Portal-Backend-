import jobModel from "../models/jobs.model.js";
import { ApiErrors } from "../utils/ApiErrors.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// ---------Steps or Algorithms of postJob Controller
// Step-1 : Getting the job details from the user
// Step-2 : Validating the details (Whether it is provided or not)
// Step-3 : Storing the current logged in userId into the postedBy field of new created Job document
// Step-4 : Storing the received details in the database
// Step-5 : Checking whether the job document is created or not
// Step-6 : Returning the appropriate response

const postJob = async (req, res) => {

    // Step-1 : Getting the job details from the request body
    const { company, jobTitle, jobDescription, workLocation, salary } = req.body;

    // Step-2 : Validating the details (Whether it is provided or not)
    if (!company || !jobTitle || !jobDescription || !salary) {
        throw new ApiErrors(400, "All Field are required!!");
    }

    // Step-3 : Storing the current logged in userId into the postedBy field of new created Job document
    const currUserId = req.user?._id;

    // Step-4 : Storing the received details in the database
    const job = await jobModel.create({
        company,
        company,
        jobTitle,
        jobDescription,
        workLocation,
        salary,
        postedBy: currUserId
    })

    // Step-5 : Checking whether the job document is created or not
    if (!job) {
        throw new ApiErrors(409, "Something went wrong while posting a job");
    }
    // Step-6 : Returning the appropriate response

    return res
        .status(200)
        .json(new ApiResponse(201, job, "Job Posted Successfully"));
}

// Controller to get all the jobs posted by the current user
const getMyJobs = async (req, res) => {

    // Current logged In Users userId
    const currUserId = req.user?._id;

    // Fetching all the jobs posted by the current user
    const jobs = await jobModel.find({ postedBy: currUserId })

    // Total no. of job count 
    const totalJobs = jobs.length;

    //Returning the result
    return res
        .status(200)
        .json({
            jobs,
            totalJobs
        });

}

// Controller to update the job
const updateJob = async (req, res) => {

    // Step-1 : 
    // Getting the job-id from the url
    const { id } = req.params;
    // Getting the details to update  
    const { company, jobTitle, jobDescription, workLocation, workMode, workType, salary } = req.body;

    // Step-2 : Fetching the job-document from the database
    const job = await jobModel.findById(id);

    // Step-3 : Before updating the job details checking whether the current logged user created the job or it is created by someone else.
    // Only allowing that user to update if the userId of the current user matches with the postedBy field of the job

    const { currUserId } = req.user?._id;
    const { postedBy } = job?.postedBy;

    console.log(req.user._id);
    console.log(job.postedBy)
    if (currUserId === postedBy) {

        // Step-4 : Checking whether the job exists with that id or not
        if (!job) {
            throw new ApiErrors(404, "No Job available for this id");
        }

        // Step-5 : Updating the individual field by checking the data to be updated or not
        if (company) {
            job.company = company;
        }
        if (jobTitle) {
            job.jobTitle = jobTitle;
        }
        if (jobDescription) {
            job.jobDescription = jobDescription;
        }
        if (workLocation) {
            job.workLocation = workLocation;
        }
        if (workMode) {
            job.workMode = workMode;
        }
        if (workType) {
            job.workType = workType;
        }
        if (salary) {
            job.salary = salary;
        }

        // Step-5 : Saving the updated document in the database
        await job.save();

        // Step-7 : Returning the response
        return res
            .status(200)
            .json(new ApiResponse(202, job, "User Details updated Successfully!!"));
    } else {
        return res
            .status(409)
            .json(new ApiResponse(409, [], "You are not authorized to update this job"));
    }
}

export {
    postJob,
    getMyJobs,
    updateJob
}
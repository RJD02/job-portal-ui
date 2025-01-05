import { Link } from "react-router-dom"
import { JobType } from "../../pages/job/Jobs"

export const JobCard = (props: { job: JobType }) => {
    const j = props.job

    return (
        <>
            <div className="w-full md:w-1/2 lg:w-1/3 p-4">

                <div className="p-6 bg-white border-2 border-black rounded-lg shadow-md">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold text-black">{j.designation}</h2>
                        <span className="px-3 py-1 text-sm font-medium text-white bg-black rounded-full">{j.location}</span>
                    </div>
                    <p className="font-semibold text-black">{j.batch}</p>

                    <div className="mt-4">
                        <span className="block text-gray-500 text-sm">Company:</span>
                        <p className="font-semibold text-black">{j.companyName}</p>
                    </div>
                    <div className="mt-4">
                        <span className="block text-gray-500 text-sm">Description:</span>
                        <p className="truncate mt-2 text-gray-700 text-ellipses overflow-hidden">{j.description}</p>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                        <div>
                            <span className="block text-gray-500 text-sm">Salary:</span>
                            <p className="font-semibold text-black">{j.salary}</p>
                        </div>
                        <Link to={`/jobs/${j.id}`}>
                            <button className="px-4 py-2 text-sm font-semibold text-white bg-black rounded-md transition-colors duration-300 hover:bg-gray-800">
                                Apply Now
                            </button>
                        </Link>
                    </div>
                </div>
            </div>

        </>
    )
}

import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { ADMIN_KEY, serverUrl } from '../../config/config';
import { Response, useAuth } from '../../components/store/authContext';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import BackLink from '../../components/BackLink/BackLink';

export default function AddJobPage() {
    const [jobTitle, setJobTitle] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [requirements, setRequirements] = useState('');
    const [salary, setSalary] = useState('')
    const [submitClicked, setSubmitClicked] = useState(false)
    const [applicationLink, setApplicationLink] = useState('')
    const [deadline, setDeadline] = useState<Date>(new Date)
    const ctx = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        if (submitClicked) {
            const addJob = async () => {
                if (jobTitle === '') {
                    toast.error('Job Title cannot be blank')
                    return;
                }
                if (companyName === '') {
                    toast.error('Company Name cannot be blank')
                    return;
                }
                if (salary === '') {
                    toast.error('Salary cannot be blank')
                    return
                }

                const response = await fetch(serverUrl + '/jobs', {
                    method: "POST",
                    headers: {
                        'Authorization': `Bearer ${ctx?.token}`,
                        'X-Admin-Auth': ADMIN_KEY
                    },
                    body: JSON.stringify({
                        companyName,
                        img: '',
                        description,
                        role: jobTitle,
                        shortDescription: '',
                        salary,
                        deadline,
                        applyLink: applicationLink
                    })
                })

                // if (!response.ok) {
                //     toast.error("something went wrong, please try again")
                //     return
                // }

                const res: Response = await response.json()
                if (res.statuscode !== 200) {
                    toast.error(res.message);
                    console.log(res.error);
                    return
                }
                const jobId = res.data.id

                navigate(`/jobs/${jobId}`)

            }
            addJob()
            setSubmitClicked(false)
        }

    }, [submitClicked])

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Add your submit logic here
        console.log({ jobTitle, companyName, location, description, requirements });
        setSubmitClicked(true)
    };

    return (
        <>
            <Navbar />
            <BackLink />
            <div className="min-h-screen flex flex-col items-center justify-center border-lg">
                <form
                    onSubmit={handleSubmit}
                    className="bg-white shadow-md rounded-md p-8 w-full max-w-md space-y-6 border border-gray-200"
                >
                    <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">Add a New Job</h2>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Job Title</label>
                        <input
                            type="text"
                            value={jobTitle}
                            onChange={(e) => setJobTitle(e.target.value)}
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
                            placeholder="e.g. Frontend Developer"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Company Name</label>
                        <input
                            type="text"
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
                            placeholder="e.g. OpenAI"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Location</label>
                        <input
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
                            placeholder="e.g. Remote, San Francisco"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Job Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
                            placeholder="Describe the job responsibilities..."
                            rows={3}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Requirements</label>
                        <textarea
                            value={requirements}
                            onChange={(e) => setRequirements(e.target.value)}
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
                            placeholder="List the requirements for the role..."
                            rows={3}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Salary</label>
                        <input
                            type="text"
                            value={salary}
                            onChange={(e) => setSalary(e.target.value)}
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
                            placeholder="e.g. 10LPA,10LPA-15LPA"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Apply Link</label>
                        <input
                            type="text"
                            value={applicationLink}
                            onChange={(e) => setApplicationLink(e.target.value)}
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
                            placeholder="e.g. https://"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Deadline</label>
                        <input
                            type="date"
                            onChange={(e) => setDeadline(new Date(e.target.value))}
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-black text-white font-medium rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-600"
                    >
                        Add Job
                    </button>
                </form>
            </div>
        </>
    )
}


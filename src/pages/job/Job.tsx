import { useEffect, useState } from 'react'
import { JobType } from './Jobs'
import { useParams } from 'react-router-dom'
import { Response, useAuth } from '../../components/store/authContext'
import { toast } from 'react-toastify'
import Navbar from '../../components/Navbar'
import BackLink from '../../components/BackLink/BackLink'
import { serverUrl } from '../../config/config'

const defaultJob: JobType = {
    id: '0',
    companyName: "None",
    imageUrl: "something",
    description: "This job sucks",
    role: "Next sins",
    created: 'Yesterday',
    shortDescription: "Don't apply",
    salary: "Will not give"
}

export default function Job() {

    const [job, setJob] = useState<JobType>(defaultJob)

    const { id } = useParams<{ id: string }>();
    const url = serverUrl + `/jobs/${id}`
    const ctx = useAuth()
    console.log(job)




    useEffect(() => {
        const getJob = async () => {
            try {
                const response = await fetch(url, {
                    method: "GET",
                    headers: { "Authorization": `Bearer ${ctx?.token}` }
                })
                const res: Response = await response.json()
                console.log('Response status = ', res.statuscode)
                if (res.statuscode != 200) {
                    toast.error(res.message)
                    console.log(res.error)
                } else {
                    const j: JobType = res.data
                    if (j.deadline)
                        j.deadline = (new Date(j.deadline))
                    if (j.created)
                        j.created = new Date(j.created)
                    setJob(j)
                }
            } catch (e) {
                console.log(e)
                toast.error('Something went wrong')
            }
        }
        getJob()
    }, [])


    return (
        <>
            <Navbar />
            <BackLink />

            <div className="flex flex-col items-center bg-white min-h-screen py-10 px-4">
                <div className="flex justify-context-between bg-black text-gold p-6 rounded-lg shadow-lg w-full max-w-2xl">
                    <h1 className="text-4xl font-bold text-center text-white">{job.companyName}</h1>
                </div>
                <div className="bg-gray-100 text-black p-8 mt-6 rounded-lg shadow-lg w-full max-w-2xl">
                    <div className="mb-4">
                        <h2 className="text-xl font-semibold text-gold">Role</h2>
                        <p className="text-lg font-medium mt-2">{job.role}</p>
                    </div>
                    <div className="mb-4">
                        <h2 className="text-xl font-semibold text-gold">Description</h2>
                        <p className="text-gray-700 mt-1">{job.description}</p>
                        <p className="text-gray-700">{job.shortDescription}</p>
                    </div>
                    <div className="mb-4">
                        <h2 className="text-xl font-semibold text-gold">Salary</h2>
                        <p className="text-gray-700 mt-1">{job.salary}</p>
                    </div>
                    <div className="mb-4">
                        <h2 className="text-xl font-semibold text-gold">Created</h2>
                        <p className="text-gray-700 mt-1">{job.created?.toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    </div>
                    <div className="mb-4">
                        <h2 className='text-xl font-semibold text-gold'>ApplyLink</h2>
                        <p className="text-gray-700 mt-1">Click <a target='_blank' className='text-blue-700' href={job.applyLink}>here</a> to go to application page</p>
                    </div>
                    <div className="mb-4">
                        <h2 className='text-xl font-semibold text-gold'>Deadline</h2>
                        <p className="text-gray-700 mt-1">{job.deadline?.toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) || ""}</p>
                    </div>
                </div>
            </div>
        </>
    )
}


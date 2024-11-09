import { useEffect, useState } from 'react'
import { JobType } from './Jobs'
import { useParams } from 'react-router-dom'
import { Response, useAuth } from '../../components/store/authContext'
import { toast } from 'react-toastify'
import Navbar from '../../components/Navbar'
import BackLink from '../../components/BackLink/BackLink'

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
    const url = `https://job-portal-go-ntuh.onrender.com/jobs/${id}`
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
                    setJob(res.data)
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
                <div className="bg-black text-gold p-6 rounded-lg shadow-lg w-full max-w-2xl">
                    <h1 className="text-4xl font-bold text-center">{job.shortDescription}</h1>
                    <p className="text-lg font-medium text-center text-white mt-2">{job.role}</p>
                </div>
                <div className="bg-gray-100 text-black p-8 mt-6 rounded-lg shadow-lg w-full max-w-2xl">
                    <div className="mb-4">
                        <h2 className="text-xl font-semibold text-gold">Description</h2>
                        <p className="text-gray-700 mt-1">{job.description}</p>
                    </div>
                    <div className="mb-4">
                        <h2 className="text-xl font-semibold text-gold">Salary</h2>
                        <p className="text-gray-700 mt-1">{job.salary}</p>
                    </div>
                    <div className="mb-4">
                        <h2 className="text-xl font-semibold text-gold">Created</h2>
                        <p className="text-gray-700 mt-1">{job.created}</p>
                    </div>
                </div>
            </div>
        </>
    )
}


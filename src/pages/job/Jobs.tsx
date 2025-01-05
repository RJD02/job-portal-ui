import { useEffect, useState } from "react"
import { JobCard } from "../../components/JobCard/JobCard"
import { SearchBar } from "../../components/SearchBar/SearchBar"
import Navbar from "../../components/Navbar"
import { Response, useAuth } from "../../components/store/authContext"
import { toast } from "react-toastify"
import { useLocation, useNavigate } from "react-router-dom"
import { serverUrl } from "../../config/config"

// model for job
export type JobType = {
    id: Number,
    companyName: string,
    image: string,
    description: string,
    designation: string,
    salary: string
    applicationLink?: string
    deadline?: Date
    location: string
    batch: string
}

const defaultJob: JobType =

{
    "id": 1,
    "companyName": "EY Default",
    "designation": "DET-ASSOCIATE SOFTWARE ENGINEER-GDSN02",
    "location": "Kolkata",
    "description": "",
    "image": "https://th.bing.com/th/id/OIP.hRdpi21W-qf50yPPNKsrwQHaHy?w=157&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    "salary": "4.5LPA (expected)",
    "deadline": new Date("2025-01-12"),
    "batch": "Freshers 2024",
    "applicationLink": "https://eyglobal.yello.co/jobs/hQQPL5j7MXwpBNVakXcM8A?job_board_id=c1riT--B2O-KySgYWsZO1Q&"
}

export default function Jobs() {

    const [jobs, setJobs] = useState<JobType[]>([defaultJob])
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    let searchTerm = queryParams.get('search')
    console.log('searching for', queryParams.get('search'))
    const ctx = useAuth()

    const getJobs = async () => {
        try {
            let url = '';
            if (searchTerm) {
                url = serverUrl + `/search?term=${searchTerm}`;
            } else {
                url = serverUrl
            }
            const response = await fetch(url, {
                method: "POST",
                headers: { "Authorization": `Bearer ${ctx?.token}` }
            })
            const res: Response = await response.json()
            console.log(res)
            if (res.statuscode !== 200) {
                toast.error(res.message)
            } else {
                setJobs(res?.data)
            }
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        getJobs()
    }, [location.search])

    const navigate = useNavigate()

    const handleSearch = (text: string) => {
        console.log(text)
        navigate(`/jobs?search=${text}`)
        searchTerm = text
    }
    console.log(jobs)
    return (
        <>
            <Navbar />
            <div className="container mx-auto px-4 py-8">
                <SearchBar onSearch={handleSearch} />
                <div className="flex flex-wrap -mx-4">
                    {jobs.map((job) =>
                        <JobCard job={job} key={job.id} />
                    )}
                </div>
            </div>
        </>
    )
}

import { useEffect, useState } from "react"
import { JobCard } from "../../components/JobCard/JobCard"
import { SearchBar } from "../../components/SearchBar/SearchBar"
import Navbar from "../../components/Navbar"
import { Response, useAuth } from "../../components/store/authContext"
import { toast } from "react-toastify"
import { useLocation, useParams } from "react-router-dom"

// model for job
export type JobType = {
    id: string,
    companyName: string,
    imageUrl: string,
    description: string,
    role: string,
    created: string
    shortDescription: string
    salary: string
}

const defaultJob: JobType = {
    companyName: "Raviraj Tech Ltd.",
    imageUrl: "hello",
    id: "1",
    description: "Description",
    shortDescription: "Short description",
    salary: "10000-20000",
    role: "Software Developer",
    created: "Now"

}


export default function Jobs() {

    const [jobs, setJobs] = useState<JobType[]>([])
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    console.log('searching for', queryParams.get('search'))
    const ctx = useAuth()


    useEffect(() => {
        const getJobs = async () => {
            try {
                const url = 'https://job-portal-go-ntuh.onrender.com/jobs'
                const response = await fetch(url, {
                    method: "GET",
                    headers: { "Authorization": `Bearer ${ctx?.token}` }
                })
                const res: Response = await response.json()
                if (res.statuscode !== 200) {
                    toast.error(res.message)
                } else {
                    setJobs(res.data.jobs)
                }

            } catch (e) {
                console.log(e)
            }
        }
        getJobs()
    }, [])

    const handleSearch = (text: string) => {
        console.log(text)
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

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
    id: string,
    companyName: string,
    imageUrl: string,
    description: string,
    role: string,
    created: Date,
    shortDescription: string
    salary: string
    applyLink?: string
    deadline?: Date
}

const defaultJob: JobType = {
    companyName: "Raviraj Tech Ltd.",
    imageUrl: "hello",
    id: "1",
    description: "Description",
    shortDescription: "Short description",
    salary: "10000-20000",
    role: "Software Developer",
    created: new Date
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
            console.log(url)
            const response = await fetch(url, {
                method: "POST",
                headers: { "Authorization": `Bearer ${ctx?.token}` }
            })
            const res: Response = await response.json()
            console.log(res)
            if (res.statuscode !== 200) {
                toast.error(res.message)
            } else {
                setJobs(res?.data.jobs)
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

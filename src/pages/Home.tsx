import { useNavigate } from "react-router-dom"
import { SearchBar } from "../components/SearchBar/SearchBar"
import { JobType } from "./job/Jobs"
import { JobCard } from "../components/JobCard/JobCard"
import Navbar from "../components/Navbar"

export default function Home() {

    const navigate = useNavigate()
    const handleSearch = (text: string) => {
        console.log(text)
        navigate(`/jobs?search=${text}`)
    }
    const jobCards: JobType[] = [{
        companyName: "Raviraj Tech Ltd.",
        imageUrl: `data:image/jpeg;base64,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`,
        id: "1",
        description: "Description",
        shortDescription: "Short description",
        salary: "10000-20000",
        role: "Software Developer",
        created: "Now"

    }]



    return (
        <>
            <Navbar />
            <div className="container mx-auto px-4 py-8">
                <SearchBar onSearch={handleSearch} />
                <div className=" -mx-4 my-4 ">
                    <h1 className="text-4xl text-md-3xl center font-bold text-center">Welcome traveller, may I help?</h1>

                    <div className="container flex flex-wrap my-4 justify-between">
                        <p>Some text here</p>
                        <img alt='Some image here' />
                    </div>
                </div>
            </div>
        </>
    )
}

/*
            <div className="mt-8 grid gap-6 md:grid-cols-3 lg:grid-cols-4">
                <div className="md:col-span-2 lg:col-span-3">
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {jobs.map((job) => (
                            <JobCard key={job.id} {...job} />
                        ))}
                    </div>
                </div>
                <div className="space-y-6">
                    <GoogleAds />
                    <GoogleAds />
                </div>
            </div>
        </div>
*/

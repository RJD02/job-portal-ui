import { ChangeEvent, FormEvent, useState } from "react"

export const SearchBar = (props: { onSearch: (text: string) => void }) => {
    const [searchText, setSearchText] = useState<string>("")
    const handleClick = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()


        props.onSearch(searchText)
    }

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value)
    }
    return (
        <form onSubmit={handleClick} className="flex items-center justify-center w-full py-10 bg-white border-b-2 border-gray-200">
            <div className="flex w-2/3 max-w-2xl">
                <input onChange={(e) => handleSearchChange(e)} type="text" placeholder="Search for jobs, companies, or categories..."
                    className="w-full px-4 py-3 text-lg border-2 border-black rounded-l-lg focus:outline-none focus:ring-2 focus:ring-gray-500" />
                <button className="px-6 py-3 text-lg font-semibold text-white bg-black rounded-r-lg transition-colors duration-300 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500">
                    Search
                </button>
            </div>
        </form>

    )
}

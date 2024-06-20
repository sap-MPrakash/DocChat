import { FC, PropsWithChildren } from "react"
import UploadButton from "./UploadButton"

type DashboardProps = {
    email: string,
    id: string
}
const Dashboard: FC<DashboardProps>  = () => {

    return(
        <main className="mx-auto max-w-7xl md:p-10">
            <div className="mt-8 flex flex-col items-start justify-between gap-4 border-b border-gray-800 pb-5 sm:flex-row sm:items-center sm:gap-0">
                <h1 className="mb-3 font-bold text-5xl text-gray-200">My Files</h1>

                <UploadButton/>
            </div>
        </main>
    )
} 
export default Dashboard
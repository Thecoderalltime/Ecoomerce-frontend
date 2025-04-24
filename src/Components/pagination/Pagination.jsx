import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid"
import { ITEM_PAR_PAGE } from "../../app/constant"
import { Link } from "react-router-dom";


const Pagination = ({page, setPage, totalItem}) => {



   //page pagination
    const handlePage = (page) => {
      setPage(page);
    };
  
  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
    <div className="flex flex-1 justify-between sm:hidden">
      <a
        href="#"
        className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
      >
        Previous
      </a>
      <a
        href="#"
        className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
      >
        Next
      </a>
    </div>
    <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
      <div>
        <p className="text-sm text-gray-700">
          Showing{" "}
          <span className="font-medium">
            {(page - 1) * ITEM_PAR_PAGE + 1}
          </span>{" "}
          to{" "}
          <span className="font-medium">
            {page * ITEM_PAR_PAGE}
          </span>{" "}
          of <span className="font-medium">{totalItem}</span>{" "}
          results
        </p>
      </div>
      <div>
        <nav
          aria-label="Pagination"
          className="isolate inline-flex -space-x-px rounded-md shadow-sm"
        >
          <div
              onClick={()=>setPage(page-1)}
            
            className="
           cursor-pointer relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
          >
            <span
        
            
            className="sr-only">Previous</span>
            <ChevronLeftIcon
              aria-hidden="true"
              className="h-5 w-5"
              
            />
          
          </div>
          {Array.from({
            length: Math.ceil(totalItem / ITEM_PAR_PAGE),
          }).map((item, index) => (
            <div
              key={index}
              onClick={(e) => handlePage(index + 1)}
              aria-current="page"
              className={`cursor-pointer relative z-10 inline-flex items-center ${
                index + 1 === page
                  ? `bg-indigo-600  text-white `
                  : `text-gray-700`
              }  px-4 py-2 text-sm font-semibold focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
            >
              {index + 1}
            </div>
          ))}

          <div
          onClick={()=>setPage(page+1)}
           className="cursor-pointer relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
          <ChevronRightIcon
              aria-hidden="true"
              className="h-5 w-5"
            />
          </div>
        </nav>
      </div>
    </div>
  </div>
  )
}

export default Pagination
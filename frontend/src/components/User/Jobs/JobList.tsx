import React, { Dispatch, SetStateAction } from "react";
import { Menu, Transition } from "@headlessui/react";
import { JobsInterface } from "../../../types/JobInterface";
import { useDispatch} from "react-redux";
import { setJobId } from "../../../features/redux/slices/user/jobDetailsSlice";
import {
  BriefcaseIcon,
  CalendarIcon,
  ChevronDownIcon,
  CurrencyDollarIcon,
  LinkIcon,
  MapPinIcon,
} from "@heroicons/react/20/solid";

interface AllJobsProps {
  jobs: JobsInterface;
  selected: string;
  setSelected: Dispatch<SetStateAction<string>>;
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const JobList: React.FC<AllJobsProps> = ({ jobs, selected, setSelected }) => {
  const dispatch = useDispatch();

  const handleViewJob = (jobId: string) => {
    dispatch(setJobId(jobId));
    setSelected(jobId);
  };

  return (
    <>
      <div
        className={`border border-gray-300 rounded-md p-4 mb-4 bg-white ${
          selected === jobs._id
            ? "ring-2 ring-purple-500 transition-all duration-500"
            : ""
        }`}
      >
        <div className=" lg:flex lg:items-center lg:justify-between">
          <div className="min-w-0 flex-1">
            <h2 className="text-xl font-bold leading-7 text-gray-900 sm:truncate sm:text-xl sm:tracking-tight">
              {jobs.title}
            </h2>
            <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
              {/* Render job details */}
              <div className="mt-2 flex items-center text-sm text-gray-500">
                <BriefcaseIcon
                  className="mr-1.5 h-5 w-5 flex-shrink-0 text-purple-600"
                  aria-hidden="true"
                />
                {jobs.employmentType}
              </div>
              <div className="mt-2 flex items-center text-sm text-gray-500">
                <MapPinIcon
                  className="mr-1.5 h-5 w-5 flex-shrink-0 text-purple-400"
                  aria-hidden="true"
                />
                {jobs.location}
              </div>
              <div className="mt-2 flex items-center text-sm text-gray-500">
                <CurrencyDollarIcon
                  className="mr-1.5 h-5 w-5 flex-shrink-0"
                  aria-hidden="true"
                />
                {jobs.salary}
              </div>
              <div className="mt-2 flex items-center text-sm text-gray-500">
                <CalendarIcon
                  className="mr-1.5 h-5 w-5 flex-shrink-0 text-purple-400"
                  aria-hidden="true"
                />
                Created on {new Date(jobs.createdAt).toLocaleDateString()}
              </div>
            </div>
          </div>
          <div className="mt-5 flex lg:ml-4 lg:mt-0">
            {/* Render action buttons */}
            <span className="ml-3 hidden sm:block">
              <button
                type="button"
                className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                onClick={() => handleViewJob(jobs._id)}
              >
                <LinkIcon
                  className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
                View
              </button>
            </span>
            {/* Dropdown */}
            <Menu as="div" className="relative ml-3 sm:hidden">
              <Menu.Button className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:ring-gray-400">
                More
                <ChevronDownIcon
                  className="-mr-1 ml-1.5 h-5 w-5 text-purple-400"
                  aria-hidden="true"
                />
              </Menu.Button>
              <Transition
                as={React.Fragment}
                enter="transition ease-out duration-200"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 -mr-1 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="l"
                        className={classNames(
                          active ? "bg-gray-100" : "",
                          "block px-4 py-2 text-sm text-black"
                        )}
                      >
                        Edit
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="l"
                        className={classNames(
                          active ? "bg-gray-100" : "",
                          "block px-4 py-2 text-sm text-black"
                        )}
                      >
                        View
                      </a>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobList;

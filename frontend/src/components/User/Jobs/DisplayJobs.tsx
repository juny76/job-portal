import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllJobs } from "../../../features/redux/slices/user/getAllJobsSlice";
import { RootState } from "../../../features/redux/reducers/Reducer";
import { JobsInterface } from "../../../types/JobInterface";
import { Navbar, Button, Input } from "@material-tailwind/react";
import JobList from "./JobList";
import JobDetails from "./JobDetails";
import UserSideJobListingShimmer from "../../shimmer/UserSideJobListingShimmer";
import { isApplied } from "../../../features/axios/api/user/applyForJob";
import {
  distinctTitleLocationSalary,
  filterJobs,
} from "../../../features/axios/api/user/jobDetails";

function DisplayJobs(this: any) {
  const dispatch = useDispatch();
  const jobs = useSelector((state: RootState) => state.allJobs.jobs);
  const status = useSelector((state: RootState) => state.allJobs.status);
  const error = useSelector((state: RootState) => state.allJobs.error);
  const user = useSelector((state: RootState) => state.userDetails.userDetails);

  const [jobsList, setJobsList] = useState<any>([]);
  // variable for job selection ring
  const [selected, setSelected] = useState("");
  // variables for search searching
  const [searchQuery, setSearchQuery] = useState("");
  const [locations, setLocations] = useState([]);
  const [titles, setTitles] = useState([]);
  const [salaries, setSalaries] = useState([]);
  // variables for filtering
  const [selectedTitle, setSelectedTitle] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedSalary, setSelectedSalary] = useState("");

  const [filtered, setFiltered] = useState<any>([]);
  const [isFiltered, setIsFiltered] = useState(false);

  // for the scroll behavior of nav
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;

      setVisible(prevScrollPos > currentScrollPos);

      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  useEffect(() => {
    dispatch(fetchAllJobs());
  }, [dispatch]);

  useEffect(() => {
    distinctTitleLocationSalary("location", setLocations);
    distinctTitleLocationSalary("title", setTitles);
    distinctTitleLocationSalary("salary", setSalaries);
  }, []);

  useEffect(() => {
    let filterJob = jobs?.filter(
      (job: JobsInterface) =>
        job?.title?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
        job?.location?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
        job?.employmentType?.toLowerCase().includes(searchQuery?.toLowerCase())
    );
    setJobsList(filterJob);
  }, [jobs, searchQuery]);

  const handleFilter = async () => {
    const filteredJobs = await filterJobs(
      selectedTitle,
      selectedLocation,
      selectedSalary
    );
    setFiltered(filteredJobs);
    setIsFiltered(true);
  };

  // for filtering out the applied jobs
  useEffect(() => {
    const fetchFilteredJobs = async () => {
      let filteredJobs = [];
      if (isFiltered) {
        filteredJobs = await Promise.all(
          (filtered ?? [])?.map(async (job: JobsInterface) => {
            const jobStatus = await isApplied(job?._id, user?._id);
            if (jobStatus?.status !== "Applied") {
              return job;
            }
            return null;
          })
        );
      } else {
        filteredJobs = await Promise.all(
          (jobsList ?? [])?.map(async (job: JobsInterface) => {
            const jobStatus = await isApplied(job?._id, user?._id);
            if (jobStatus?.status !== "Applied") {
              return job;
            }
            return null;
          })
        );
      }
      setFiltered(filteredJobs?.filter(Boolean));
    };

    fetchFilteredJobs();
  }, [jobs]);

  if (status === "loading") {
    return (
      <div className="p-20">
        <UserSideJobListingShimmer />
      </div>
    );
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div
        className={`fixed top-0 left-0 w-full pt-16 z-30 transition-opacity duration-300 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      >
        <Navbar className="mx-auto max-w-[1320px] px-4 py-3 shadow-lg">
          <div className="flex flex-wrap items-center justify-between gap-y-4  text-blue-gray-900">
            <div className="relative flex w-full gap-2 md:w-max">
              <input
                type="search"
                placeholder="Search here..."
                color="purple"
                className="p-2 border-2 rounded-xl focus:border-purple-600 text-black"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="sm:col-span-1">
              <select
                className="focus:ring-2 focus:ring-purple-600 border-2 rounded-lg py-2 px-4 text-gray-500"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
              >
                <option value="">Select location</option>
                {locations.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>
            <div className="sm:col-span-1">
              <select
                className="focus:ring-2 focus:ring-purple-600 border-2 rounded-lg py-2 px-4 text-gray-500"
                value={selectedSalary}
                onChange={(e) => setSelectedSalary(e.target.value)}
              >
                <option value="">Select salary</option>
                {salaries.map((salary) => (
                  <option key={salary} value={salary}>
                    {salary}
                  </option>
                ))}
              </select>
            </div>
            <div className="sm:col-span-1">
              <select
                className="focus:ring-2 focus:ring-purple-600 border-2 rounded-lg py-2 px-4 text-gray-500"
                value={selectedTitle}
                onChange={(e) => setSelectedTitle(e.target.value)}
              >
                <option value="">Select Role</option>
                {titles.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>
            <Button
              size="sm"
              className="rounded sm:col-span-1"
              color="purple"
              onClick={() => handleFilter()}
            >
              Filter
            </Button>
          </div>
        </Navbar>
      </div>

      <div className="p-28 px-4 sm:px-8 bg-purple-200 md:px-16 lg:px-32 flex flex-wrap min-h-screen">
        <div className="w-full sm:w-2/4 p-4 sm:p-6">
          <div
            className="overflow-y-auto p-6"
            style={{ maxHeight: "calc(100vh - 80px)" }}
          >
            {isFiltered
              ? filtered.map((job: JobsInterface) => (
                  <JobList
                    key={job._id}
                    jobs={job}
                    selected={selected}
                    setSelected={setSelected}
                  />
                ))
              : jobsList?.map((job: JobsInterface) => (
                  <JobList
                    key={job._id}
                    jobs={job}
                    selected={selected}
                    setSelected={setSelected}
                  />
                ))}
          </div>
        </div>
        <div className="w-full sm:w-2/4 p-4 sm:p-6 bg-white">
          <div
            className="overflow-y-auto"
            style={{ maxHeight: "calc(100vh - 80px)" }}
          >
            <JobDetails />
          </div>
        </div>
      </div>
    </>
  );
}

export default DisplayJobs;

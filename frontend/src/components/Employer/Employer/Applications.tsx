import {
  MagnifyingGlassIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/24/outline";
import { EyeIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Avatar,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { allApplications } from "../../../features/axios/api/applications/allApplicationEmployer";
import { jobDetails } from "../../../features/axios/api/user/jobDetails";
import { useNavigate } from "react-router-dom";
import ApplicationDetails from "../../../types/ApplicationsInterface";

const TABLE_HEAD = [
  "Candidate",
  "Applied For",
  "Application Status",
  "Applied on",
  "",
];
const ITEMS_PER_PAGE = 4;

export default function Applications() {
  const [applicationData, setApplicationData] = useState<ApplicationDetails[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const applications = async () => {
      const data = await allApplications();
      setApplicationData(data?.applications);
    };
    applications();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 400);

    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);

  const handleViewApplicant = (applicationId: string) => {
    navigate(`/application/view-applicant/${applicationId}`);
  };

  const filterApplication = applicationData?.filter(
    (application: ApplicationDetails) =>
      application?.userId?.name
        ?.toLocaleLowerCase()
        .includes(debouncedSearchQuery?.toLocaleLowerCase()) ||
      application?.jobId?.title
        ?.toLocaleLowerCase()
        .includes(debouncedSearchQuery?.toLocaleLowerCase()) ||
      application?.applicationStatus
        ?.toLocaleLowerCase()
        .includes(debouncedSearchQuery?.toLocaleLowerCase())
  );

  const reverseFilterApplication = [...filterApplication].reverse();

  const getPaginatedData = () => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return reverseFilterApplication?.slice(startIndex, endIndex);
  };

  const changePage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Card className="h-full w-full bg-purple-100">
      <CardHeader floated={false} shadow={false} className="rounded-none bg-purple-100 pl-4">
        <div className="mb-8 flex items-center justify-between gap-8">
          <div className="">
            <h1 className="uppercase font-bold text-3xl text-gray-700">All applications</h1>
            <h3 className="mt-1 ">See information about all applicants</h3>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="w-full md:w-72">
            <input
              placeholder="Search"
              color="purple"
              value={searchQuery}
              className="py-1 px-4 rounded-xl border-2 focus:border-purple-500 focus:outline-none"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-scroll px-0">
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD?.map((head, index) => (
                <th
                  key={head}
                  className="cursor-pointer border-y border-blue-gray-100 bg-gray-100 p-4 transition-colors hover:bg-blue-gray-50"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                  >
                    {head}{" "}
                    {index !== TABLE_HEAD.length - 1 && (
                      <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                    )}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {getPaginatedData()?.map((data, index) => {
              const isLast = index === jobDetails.length - 1;
              const classes = isLast
                ? "p-4"
                : "p-4 border-b border-blue-gray-50";

              return (
                <tr key={index}>
                  <td className={classes}>
                    <div className="flex items-center gap-3">
                      <Avatar
                        src={
                          data?.userId?.image ||
                          "https://www.pavilionweb.com/wp-content/uploads/2017/03/man-300x300.png"
                        }
                        alt={"img"}
                        className="rouded-full max-w-12"
                      />
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {data?.userId?.name}
                        </Typography>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal opacity-70"
                        >
                          {data?.userId?.email}
                        </Typography>
                      </div>
                    </div>
                  </td>
                  <td className={classes}>
                    <div className="flex flex-col">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {data?.jobId?.title}
                      </Typography>
                    </div>
                  </td>
                  <td className={classes}>
                    <div className="w-max">
                      <Chip
                        variant="ghost"
                        size="sm"
                        value={
                          data.applicationStatus === "Applied"
                            ? "Applied"
                            : data.applicationStatus === "Rejected"
                            ? "Rejected"
                            : "Shortlisted"
                        }
                        className={
                          data.applicationStatus === "Applied"
                            ? "bg-green-500"
                            : data.applicationStatus === "Rejected"
                            ? "bg-red-500"
                            : "bg-orange-500"
                        }
                      />
                    </div>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {new Date(data.createdAt).toLocaleDateString()}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Tooltip content="View Application">
                      <IconButton
                        variant="text"
                        color="blue-gray"
                        onClick={() => handleViewApplicant(data._id)}
                      >
                        <EyeIcon className="h-4 w-4" />
                      </IconButton>
                    </Tooltip>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          Page {currentPage} of{" "}
          {Math.ceil(filterApplication?.length / ITEMS_PER_PAGE)}
        </Typography>
        <div className="flex gap-2">
          <Button
            variant="outlined"
            color="purple"
            size="sm"
            onClick={() => changePage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <Button
            variant="outlined"
            color="purple"
            size="sm"
            onClick={() => changePage(currentPage + 1)}
            disabled={
              currentPage ===
              Math.ceil(filterApplication?.length / ITEMS_PER_PAGE)
            }
          >
            Next
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

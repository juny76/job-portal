import { useEffect, useState } from "react";
import { PaperClipIcon } from "@heroicons/react/20/solid";
import ApplicationDetails from "../../../types/ApplicationsInterface";
import { applicationDetails } from "../../../features/axios/api/applications/applicationDetails";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Chip, Tooltip, Typography } from "@material-tailwind/react";
import { changeApplicationStatus } from "../../../features/axios/api/applications/changeApplication";
import { createConversation } from "../../../features/axios/api/messenger/conversation";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { Breadcrumbs } from "@material-tailwind/react";
import { EyeIcon } from "@heroicons/react/24/outline";
import { FaFacebookMessenger } from "react-icons/fa";

import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../features/redux/reducers/Reducer";
import { fetchEmployer } from "../../../features/redux/slices/employer/employerDetailsSlice";

function ViewApplicant() {
  const [applicationData, setApplicationData] = useState<ApplicationDetails>();
  const [status, setStatus] = useState(true);
  const employerId = useSelector(
    (state: RootState) => state.employerDetails.employerDetails
  )?.employerData?._id;
  const resumeUrl = applicationData?.userId?.resume;
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchEmployer());
  }, [dispatch]);

  useEffect(() => {
    const applications = async () => {
      const data = await applicationDetails(id ?? "");
      setApplicationData(data.applicationData);
    };
    applications();
  }, [id, status]);

  const notify = (msg: string, type: string) => {
    type === "error"
      ? toast.error(msg, { position: "top-right" })
      : toast.success(msg, { position: "top-right" });
  };

  const handleStatusChange = async (status: string, applicationId: string) => {
    await changeApplicationStatus(applicationId, status)
      .then(() => {
        setStatus(!status);
        notify("Status updated successfully", "success");
      })
      .catch((err: any) => {
        notify(err.message, "error");
      });
  };

  const startConversation = async (user1: string, user2: string) => {
    const response = await createConversation(user1, user2);
    if (response) {
      navigate("/employer/messenger");
    }
  };

  return (
    <>
      <div className="pl-40 pt-2">
        <Breadcrumbs className="bg-gray-100">
          <a href="#" className="opacity-60">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
          </a>
          <Link to={"/employer/all-jobs"} className="opacity-60">
            <span>Jobs</span>
          </Link>
          <a href="#">Applicant details</a>
        </Breadcrumbs>
      </div>
      <div className="mx-auto max-w-[1180px] p-2 mt-4 rounded lg:pl-6">
        <div className="max-w-7xl p-6">
          <div className="px-4 sm:px-0">
            <h1 className="text-3xl font-semibold leading-7 text-gray-900 uppercase">
              Applicant Information
            </h1>
            <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
              Personal details and application.
            </p>
          </div>
          <div className="flex justify-end mb-4">
            <Menu>
              <div className="flex gap-5">
                <Tooltip content="Start conversation">
                  <button
                    className="flex justify-center items-center bg-purple-500 text-white rounded-full w-12"
                    onClick={() =>
                      startConversation(
                        employerId,
                        applicationData?.userId?._id
                      )
                    }
                  >
                    <FaFacebookMessenger />
                  </button>
                </Tooltip>
                <MenuHandler>
                  <button className="bg-purple-500 rounded-full py-1 px-2 w-11/12 text-white font-normal">
                    Change Status
                  </button>
                </MenuHandler>
              </div>
              <MenuList className="bg-purple-400">
                <MenuItem
                  onClick={() =>
                    handleStatusChange("Rejected", applicationData?._id ?? "")
                  }
                  className=" hover:bg-purple-600"
                >
                  Reject
                </MenuItem>
                <MenuItem
                  onClick={() =>
                    handleStatusChange(
                      "Shortlisted",
                      applicationData?._id ?? ""
                    )
                  }
                  className="hover:bg-purple-600"
                >
                  Shortlist
                </MenuItem>
              </MenuList>
            </Menu>
          </div>
          <div className="mt-6 border-t border-gray-100">
            <dl className="divide-y divide-gray-100">
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 bg-gray-100">
                <dt className="px-4 text-lg font-medium leading-6 text-gray-900">
                  Full name
                </dt>
                <dd className="mt-1 text-lg leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {applicationData?.userId?.name}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="px-4 text-lg font-medium leading-6 text-gray-900">
                  Application for
                </dt>
                <dd className="mt-1 text-lg leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {applicationData?.jobId?.title}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 bg-gray-100">
                <dt className="px-4 text-lg font-medium leading-6 text-gray-900">
                  Email address
                </dt>
                <dd className="mt-1 text-lg leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {applicationData?.userId?.email}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="px-4 text-lg font-medium leading-6 text-gray-900">
                  Phone
                </dt>
                <dd className="mt-1 text-lg leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {applicationData?.userId?.phone}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 bg-gray-100">
                <dt className="text-lg px-4 font-medium leading-6 text-gray-900">
                  Application status
                </dt>
                <dd className="flex mt-1 text-lg leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <Chip
                    variant="ghost"
                    size="sm"
                    value={
                      applicationData?.applicationStatus === "Applied"
                        ? "Applied"
                        : applicationData?.applicationStatus === "Rejected"
                        ? "Rejected"
                        : "Shortlisted"
                    }
                    className={
                      applicationData?.applicationStatus === "Applied"
                        ? "bg-green-500"
                        : applicationData?.applicationStatus === "Rejected"
                        ? "bg-red-500"
                        : "bg-orange-500"
                    }
                  />
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-lg px-4 font-medium leading-6 text-gray-900">
                  About
                </dt>
                <dd className="mt-1 text-lg leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {applicationData?.userId?.about}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 bg-gray-100">
                <dt className="text-lg px-4 font-medium leading-6 text-gray-900">
                  Experience
                </dt>
                <dd className="mt-1 text-lg leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {applicationData?.userId?.experience ? (
                    <div className="flex flex-col">
                      <Typography
                        variant="medium"
                        className="font-bold text-blue-gray-500"
                      >
                        {applicationData?.userId?.experience?.position}
                      </Typography>
                      <Typography
                        variant="large"
                        className="font-bold text-blue-gray-500"
                      >
                        {applicationData?.userId?.experience?.companyName}
                      </Typography>
                      {applicationData?.userId?.experience && (
                        <Typography
                          variant="small"
                          className="font-normal text-blue-gray-500"
                        >
                          Start Date:{" "}
                          {applicationData?.userId?.experience?.startDate}
                        </Typography>
                      )}
                      {applicationData?.userId?.experience?.endDate ===
                      "present" ? (
                        <Typography
                          variant="small"
                          className="font-normal text-blue-gray-500"
                        >
                          End Date: present
                        </Typography>
                      ) : (
                        applicationData?.userId?.experience && (
                          <Typography
                            variant="small"
                            className="font-normal text-blue-gray-500"
                          >
                            End Date:{" "}
                            {applicationData?.userId?.experience?.endDate}
                          </Typography>
                        )
                      )}
                      {/* Display any other necessary information from the experience object */}
                    </div>
                  ) : (
                    <Typography
                      variant="small"
                      className="font-normal text-blue-gray-500"
                    >
                      No experience available.
                    </Typography>
                  )}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-lg px-4 font-medium leading-6 text-gray-900">
                  Key Skills
                </dt>
                <dd className="mt-1 text-lg leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <div className="flex gap-2">
                    {applicationData?.userId?.skills &&
                      applicationData?.userId?.skills?.map((skill) => (
                        <Chip
                          key={skill}
                          variant="ghost"
                          color="teal"
                          className="rounded-full py-1.5 bg-teal-400"
                          size="sm"
                          value={skill}
                        />
                      ))}
                  </div>
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 bg-gray-100">
                <dt className="text-lg px-4 font-medium leading-6 text-gray-900">
                  Attachments
                </dt>
                <dd className="mt-2 text-lg text-gray-900 sm:col-span-2 sm:mt-0">
                  <ul
                    role="list"
                    className="divide-y divide-gray-100 rounded-md border border-gray-200"
                  >
                    <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                      {resumeUrl ? (
                        <div className="flex w-80">
                          <PaperClipIcon
                            className="h-5 w-5 flex-shrink-0 text-gray-400"
                            aria-hidden="true"
                          />
                          <div className="ml-4 flex min-w-0 flex-1 gap-2">
                            <span className="truncate font-medium">
                              {`${applicationData?.userId?.name}.pdf`}
                            </span>
                            <span className="flex-shrink-0 text-gray-400">
                              4.5mb
                            </span>
                          </div>
                          <Tooltip content="view resume">
                            <Link
                              to={resumeUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <EyeIcon
                                className="ml-2 h-5 w-5 flex-shrink-0 text-blue-400"
                                aria-hidden="true"
                              />
                            </Link>
                          </Tooltip>
                        </div>
                      ) : null}
                    </li>
                  </ul>
                </dd>
              </div>
            </dl>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
}

export default ViewApplicant;

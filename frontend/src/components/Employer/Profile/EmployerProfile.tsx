import React, { useEffect, useState } from "react";
import { EmployerRegisterPayload } from "../../../types/PayloadInterface";
import { Link } from "react-router-dom";
import { employerData } from "../../../features/axios/api/employer/employerDetails";
import {
  Card,
  CardBody,
  Avatar,
  Typography,
  Tooltip,
} from "@material-tailwind/react";
import { PencilIcon } from "@heroicons/react/24/solid"; 

function EmployerProfile() {
  const [employerDetails, setEmployerDetails] =
    useState<EmployerRegisterPayload>();
  useEffect(() => {
    const employerDetails = async () => {
      const data = await employerData();
      setEmployerDetails(data?.employerData);
    };
    employerDetails();
  }, []);

  return (
    <div className="pl-16 pr-16 bg-purple-50">
      <div className="relative h-72 w-full overflow-hidden rounded-xl bg-[url(https://media.istockphoto.com/id/1129644198/vector/recruitment-modern-line-design-style-vector-illustration.jpg?s=612x612&w=0&k=20&c=ZBHS-k5azwnflpGW5gRmseB4CxUOpUUmGA3I45mJk9E=)] bg-auto bg-cover	bg-center">
        <div className="absolute inset-0 h-full w-full bg-purple-500/50" />
      </div>
      <Card className="mx-3 -mt-16 mb-6 lg:mx-4 shadow-lg shadow-gray-400">
        <CardBody className="p-4">
          <div className="mb-10 flex items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <Avatar
                src={employerDetails?.image ?? ""}
                alt="img"
                size="xl"
                className="rounded-lg shadow-lg shadow-blue-gray-500/40 w-40 h-40 bg-auto"
              />
              <div>
                <Typography variant="h5" color="blue-gray" className="mb-1">
                  {employerDetails?.companyName ?? ""}
                </Typography>
                <Typography
                  variant="small"
                  className="font-normal text-blue-gray-600"
                >
                  {employerDetails?.industry ?? ""}
                </Typography>
              </div>
            </div>
          </div>
          <div className="gird-cols-1 mb-12 grid gap-4 px-4 lg:grid-cols-2 xl:grid-cols-1">
            <Typography variant="h6" color="blue-gray" className="mb-3">
              <div className="flex gap-x-3">
                Profile Information
                <Link to={"/employer/edit-profile"}>
                  <Tooltip content="Edit Profile">
                    <PencilIcon className="h-4 w-4 cursor-pointer text-blue-500" />
                  </Tooltip>
                </Link>
              </div>
            </Typography>
            <hr className="my-1 border-blue-gray-50" />
            <div>
              <CardBody className="p-0">
                <ul className="flex flex-col gap-4 p-0">
                  <li className="flex items-center gap-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-semibold capitalize"
                    >
                      Company Name:
                    </Typography>

                    <Typography
                      variant="small"
                      className="font-normal text-blue-gray-500"
                    >
                      {employerDetails?.companyName ?? ""}
                    </Typography>
                  </li>
                  <hr className="my-1 border-blue-gray-50" />
                  <li className="flex items-center gap-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-semibold capitalize"
                    >
                      Email:
                    </Typography>

                    <Typography
                      variant="small"
                      className="font-normal text-blue-gray-500"
                    >
                      {employerDetails?.email ?? ""}
                    </Typography>
                  </li>
                  <hr className="my-1 border-blue-gray-50" />
                  <li className="flex items-center gap-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-semibold capitalize"
                    >
                      Location:
                    </Typography>

                    <Typography
                      variant="small"
                      className="font-normal text-blue-gray-500"
                    >
                      {employerDetails?.location ?? ""}
                    </Typography>
                  </li>
                  <hr className="my-1 border-blue-gray-50" />
                  <li className="flex items-center gap-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-semibold capitalize"
                    >
                      About:
                    </Typography>

                    <Typography
                      variant="small"
                      className="font-normal text-blue-gray-500"
                    >
                      {employerDetails?.about ?? "A healthy company"}
                    </Typography>
                  </li>
                  <hr className="my-1 border-blue-gray-50" />
                </ul>
              </CardBody>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default EmployerProfile;

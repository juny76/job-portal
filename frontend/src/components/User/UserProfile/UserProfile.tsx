import  { useEffect, useState } from "react";
import { userData } from "../../../features/axios/api/user/userDetails";
import { UserInterface } from "../../../types/UserInterface";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { deleteResume } from "../../../features/axios/api/user/userDetails";
import ConfirmResumeDelete from "./ConfirmResumeDelete";
import AddResume from "./AddResumeModal";
import AddKeySkillsModal from "./AddKeySkills";
import {
  Card,
  CardBody,
  Avatar,
  Typography,
  Tooltip,
  Button,
  Chip,
} from "@material-tailwind/react";
import {
  PencilIcon,
  PaperClipIcon,
  TrashIcon,
  EyeIcon,
} from "@heroicons/react/24/solid";

function UserProfile() {
  const [userDetails, setUserDetails] = useState<UserInterface>({});
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [resumeDeleted, setResumeDeleted] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const [showResumeUpload, setResumeUpload] = useState(false);
  const [showKeySkillUpload, setShowSkillUpload] = useState(false);

  const resumeUrl = userDetails?.resume;

  useEffect(() => {
    const userInfo = async () => {
      const data = await userData();
      setUserDetails(data);
    };
    userInfo();
  }, [resumeDeleted, isUploaded]);

  const resumeUploadButtonHandle = () => {
    setResumeUpload(true);
  };

  const skillUploadButtonHandle = () => {
    setShowSkillUpload(true);
  };

  const deleteButtonHandle = () => {
    setShowDeleteConfirmation(true);
  };

  return (
    <div className="pl-16 pr-16 pt-10 bg-purple-100">
      <div className="relative mt-8 h-72 w-full overflow-hidden rounded-xl bg-[url(https://media.istockphoto.com/id/1129644198/vector/recruitment-modern-line-design-style-vector-illustration.jpg?s=612x612&w=0&k=20&c=ZBHS-k5azwnflpGW5gRmseB4CxUOpUUmGA3I45mJk9E=)] bg-center">
        <div className="absolute inset-0 h-full w-full bg-purple-500/50" />
      </div>
      <Card className="mx-3 -mt-16 mb-6 lg:mx-4 shadow-lg shadow-gray-400">
        <CardBody className="p-4">
          <div className="mb-10 flex items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <Avatar
                src={
                  userDetails?.image ??
                  "https://www.pavilionweb.com/wp-content/uploads/2017/03/man-300x300.png"
                }
                alt="img"
                size="xl"
                className="rounded-full shadow-lg shadow-blue-gray-500/40 max-w-24"
              />
              <div>
                <Typography variant="h5" color="blue-gray" className="mb-1">
                  {userDetails?.name ?? ""}
                </Typography>
                <Typography
                  variant="small"
                  className="font-normal text-blue-gray-600"
                >
                  {userDetails?.profession ?? ""}
                </Typography>
              </div>
            </div>
          </div>
          <div className="gird-cols-1 mb-12 grid gap-4 px-4 lg:grid-cols-2 xl:grid-cols-1">
            <Typography variant="h6" color="blue-gray" className="mb-3">
              <div className="flex gap-x-3">
                Profile Information
                <Link to={"/user/edit-profile"}>
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
                      Name:
                    </Typography>

                    <Typography
                      variant="small"
                      className="font-normal text-blue-gray-500"
                    >
                      {userDetails?.name ?? ""}
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
                      {userDetails?.email ?? ""}
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
                      {userDetails?.location ?? ""}
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
                      {userDetails?.about ?? ""}
                    </Typography>
                  </li>
                  <hr className="my-1 border-blue-gray-50" />
                  <li className="flex items-center gap-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-semibold capitalize"
                    >
                      Experience:
                    </Typography>

                    {userDetails?.experience ? (
                      <div className="flex flex-col">
                        <Typography
                          variant="medium"
                          className="font-bold text-blue-gray-500"
                        >
                          {userDetails.experience.position}
                        </Typography>
                        <Typography
                          variant="large"
                          className="font-bold text-blue-gray-500"
                        >
                          {userDetails.experience.companyName}
                        </Typography>
                        {userDetails.experience.startDate && (
                          <Typography
                            variant="small"
                            className="font-normal text-blue-gray-500"
                          >
                            Start Date:{" "}
                            {new Date(
                              userDetails.experience.startDate
                            ).toLocaleDateString()}
                          </Typography>
                        )}
                        {userDetails.experience.endDate === "present" ? (
                          <Typography
                            variant="small"
                            className="font-normal text-blue-gray-500"
                          >
                            End Date: present
                          </Typography>
                        ) : (
                          userDetails.experience.endDate && (
                            <Typography
                              variant="small"
                              className="font-normal text-blue-gray-500"
                            >
                              End Date:{" "}
                              {new Date(
                                userDetails.experience.endDate
                              ).toLocaleDateString()}
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
                  </li>

                  <hr className="my-1 border-blue-gray-50" />
                  <li className="flex items-center gap-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-semibold capitalize"
                    >
                      Key Skills:
                    </Typography>
                    <div>
                      <Typography
                        variant="small"
                        className="font-normal text-blue-gray-500 flex gap-x-2"
                      >
                        <div>
                          <div className="flex gap-2">
                            {userDetails?.skills &&
                              userDetails?.skills?.map((skill) => (
                                <Chip
                                  key={skill}
                                  variant="ghost"
                                  color="teal"
                                  className="rounded-full py-1.5 bg-[#a8fff371]"
                                  size="sm"
                                  value={skill}
                                />
                              ))}
                          </div>
                          <Tooltip content={"Manage"} className="bg-black">
                            <Button
                              variant="text"
                              onClick={() => skillUploadButtonHandle()}
                              className="pt-5"
                            >
                              <PencilIcon className="h-4 w-4 cursor-pointer text-blue-500" />
                            </Button>
                          </Tooltip>
                        </div>
                      </Typography>
                    </div>
                  </li>
                  <hr className="my-1 border-blue-gray-50" />
                  <li className="flex items-center gap-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-semibold capitalize"
                    >
                      Resume:
                    </Typography>

                    {userDetails?.resume ? (
                      <div className="rounded-md border border-gray-300 p-1 lg:w-96">
                        <Typography
                          variant="small"
                          className="font-normal text-blue-gray-500 flex gap-x-2"
                        >
                          <PaperClipIcon
                            className="h-5 w-5 flex-shrink-0 text-gray-400"
                            aria-hidden="true"
                          />
                          "Your resume.pdf"
                          <Tooltip content={"Update Resume"}>
                            <button onClick={() => resumeUploadButtonHandle()}>
                              <PencilIcon
                                className="ml-20 h-5 w-5 flex-shrink-0 text-blue-400"
                                aria-hidden="true"
                              />
                            </button>
                          </Tooltip>
                          <Tooltip content="Delete Resume">
                            <button onClick={() => deleteButtonHandle()}>
                              <TrashIcon
                                className="ml-2 h-5 w-5 flex-shrink-0 text-red-400"
                                aria-hidden="true"
                              />
                            </button>
                          </Tooltip>
                          <Tooltip content="view resume">
                            {resumeUrl ? (
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
                            ) : null}
                          </Tooltip>
                        </Typography>
                      </div>
                    ) : (
                      <Typography
                        variant="small"
                        className="font-normal text-blue-gray-500 flex gap-x-2"
                      >
                        <Tooltip content={"Add resume"}>
                          <Button
                            variant="text"
                            onClick={() => resumeUploadButtonHandle()}
                            className="bg-gray-400"
                          >
                            Add
                          </Button>
                        </Tooltip>
                      </Typography>
                    )}
                  </li>
                </ul>
              </CardBody>
            </div>
          </div>
        </CardBody>
      </Card>

      {showDeleteConfirmation && (
        <ConfirmResumeDelete
          isOpen={showDeleteConfirmation}
          onClose={() => setShowDeleteConfirmation(false)}
          onConfirm={() => deleteResume()}
          isDeleted={() => setResumeDeleted(!resumeDeleted)}
        />
      )}
      <div className="z-10">
        {showResumeUpload && (
          <AddResume
            isOpen={showResumeUpload}
            onClose={() => setResumeUpload(false)}
            setIsUploaded={() => setIsUploaded(!isUploaded)}
          />
        )}
      </div>

      <div>
        <AddKeySkillsModal
          isOpen={showKeySkillUpload}
          onClose={() => setShowSkillUpload(false)}
          setIsUploaded={() => setIsUploaded(!isUploaded)}
        />
      </div>
      <ToastContainer className="z-50" />
    </div>
  );
}

export default UserProfile;

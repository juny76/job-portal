import React, { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { jobUpdateValidationSchema } from "../../../utils/validation";
import { JobCreationPayload } from "../../../types/PayloadInterface";
import { Link, useNavigate, useParams } from "react-router-dom";
import updateJob from "../../../features/axios/api/employer/updateJob";
import { jobDetailsEmployer } from "../../../features/axios/api/employer/jobDetailsEmployer";
import { JobsInterface } from "../../../types/JobInterface";
import { Breadcrumbs } from "@material-tailwind/react";

function EditJob() {
  const navigate = useNavigate();
  const [jobData, setJobData] = useState<JobsInterface | undefined>();
  const { id } = useParams();
  useEffect(() => {
    async function details() {
      const data = await jobDetailsEmployer(id ?? "");
      setJobData(data);
    }
    details();
  }, [id]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<JobCreationPayload>({
    resolver: yupResolver(jobUpdateValidationSchema),
  });

  useEffect(() => {
    if (jobData) {
      setValue("title", jobData?.title);
      setValue("employmentType", jobData?.employmentType);
      setValue("description", jobData?.description);
      setValue("location", jobData?.location);
      setValue("requirements", [jobData?.requirements?.join("\n")]);
      setValue("responsibilities", [jobData?.responsibilities.join("\n")]);
      setValue("salary", jobData?.salary ?? 0);
      setValue("openings", jobData?.openings ?? 0);
    }
  }, [jobData, setValue]);

  const notify = (msg: string, type: string) => {
    type === "error"
      ? toast.error(msg, { position: "top-right" })
      : toast.success(msg, { position: "top-right" });
  };

  const submitHandler = async (formData: JobCreationPayload) => {
    updateJob(formData, jobData?._id)
      .then((response) => {
        notify("Job updated successfully", "success");
        setTimeout(() => {
          navigate("/employer/all-jobs");
        }, 2000);
      })
      .catch((error: any) => {
        notify(error.message, "error");
      });
  };
  return (
    <div>
      <div className="pl-40 pt-2">
        <Breadcrumbs className="bg-white">
          <Link to={"/employer/all-jobs"} className="opacity-60">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
          </Link>
          <Link to={"/employer/all-jobs"}>
            <span>Jobs</span>
          </Link>
          <a href="#">Edit Job details</a>
        </Breadcrumbs>
      </div>
      <div className="max-w-lg mx-auto">
        <h1 className="text-2xl font-bold mb-4 bg-white text-center uppercase">
          Edit job details
        </h1>
        <div className="rounded border border-gray-300 p-4 bg-white">
          <form onSubmit={handleSubmit(submitHandler)}>
            <div className="mb-4 flex justify-between">
              <div className="w-1/2 mr-4">
                <label
                  htmlFor="title"
                  className="block text-sm mb-1 font-medium text-gray-400"
                >
                  Job Title:
                </label>
                <input
                  type="text"
                  id="title"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-600"
                  required
                  placeholder="Job Title"
                  {...register("title")}
                />
                {errors.title && (
                  <p className="text-red-500 text-sm">{errors.title.message}</p>
                )}
              </div>
              <div className="w-1/2 ml-2">
                <label
                  htmlFor="employmentType"
                  className="block text-sm mb-1 font-medium text-gray-400"
                >
                  Employment Type:
                </label>
                <select
                  id="employmentType"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-600"
                  required
                  placeholder="Employment Type"
                  {...register("employmentType")}
                >
                  {errors.employmentType && (
                    <p className="text-red-500 text-sm">
                      {errors.employmentType.message}
                    </p>
                  )}
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Freelance">Freelance</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>
            </div>

            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-sm mb-1 font-medium text-gray-400"
              >
                Job Description:
              </label>
              <textarea
                id="description"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-600"
                required
                placeholder="Job Description"
                {...register("description")}
              ></textarea>
            </div>

            <div className="mb-4">
              <label
                htmlFor="location"
                className="block text-sm mb-1 font-medium text-gray-400"
              >
                Location:
              </label>
              <input
                type="text"
                id="location"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-600"
                required
                placeholder="Location"
                {...register("location")}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="requirements"
                className="block text-sm mb-1 font-medium text-gray-400"
              >
                Requirements:
              </label>
              <textarea
                id="requirements"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-600"
                required
                placeholder="Requirements"
                {...register("requirements")}
              ></textarea>
              {errors.requirements && (
                <p className="text-red-500 text-sm">
                  {errors.requirements.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="responsibilities"
                className="block text-sm mb-1 font-medium text-gray-400"
              >
                Responsibilities:
              </label>
              <textarea
                id="responsibilities"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-600"
                required
                placeholder="Responsibilities"
                {...register("responsibilities")}
              ></textarea>
            </div>

            <div className="mb-4 flex justify-between">
              <div>
                <label
                  htmlFor="salary"
                  className="block text-sm mb-1 font-medium text-gray-400"
                >
                  Salary:
                </label>
                <input
                  type="number"
                  id="salary"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-600"
                  required
                  placeholder="salary"
                  {...register("salary")}
                />
              </div>
              <div>
                <label
                  htmlFor="openings"
                  className="block text-sm mb-1 font-medium text-gray-400"
                >
                  Openings:
                </label>
                <input
                  type="number"
                  id="openings"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-600"
                  required
                  placeholder="Openings"
                  {...register("openings")}
                />
              </div>
            </div>
            <button
              type="submit"
              className="px-4 py-2 font-medium text-white bg-purple-600 rounded hover:bg-purple-500 focus:outline-none"
            >
              Submit
            </button>
          </form>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
}

export default EditJob;

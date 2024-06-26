import { EmployerInterface } from "../../types/employerInterface";
import { HttpStatus } from "../../types/httpStatus";
import AppError from "../../utils/appError";
import { EmployerRepository } from "../../repositories/employerRepository";

export const findEmployerById = (
  id: string,
  dbRepositoryEmployer: ReturnType<EmployerRepository>
) => {
    try {
        const employer = dbRepositoryEmployer.findEmployerById(id);
        if(!employer) {
            throw new AppError('No employer found', HttpStatus.UNAUTHORIZED)
        }
        return employer;
    } catch (error: any) {
        throw new Error(error);
    }
};

export const updatedEmployer = (
    employerId: string,
    updates: Partial<EmployerInterface>,
    dbRepositoryEmployer: ReturnType<EmployerRepository>
) => {
    try {
        const employer   = dbRepositoryEmployer.updateEmployer(employerId, updates);
        if(!employer) {
            throw new AppError('No employer updates', HttpStatus.UNAUTHORIZED)
        }
        return employer;
    } catch (error: any) {
        throw new Error(`error while updating the employer ${error.message}`);
    }
}


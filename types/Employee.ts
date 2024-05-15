interface EmployeeType {
    employeeId: string;
    employeeName: string;
    designation: string;
    joiningDate: Date;
    dateOfBirth: Date;
    salary: number;
    isActive: boolean;
    phoneNumber: string;
    country: {
        countryCode: string;
        countryName: string;
    };
    createdAt?: Date;
}

export default EmployeeType
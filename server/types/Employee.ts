interface Employee {
    employeeId: string;
    employeeName: string;
    designation: string;
    joiningDate: Date;
    salary: number;
    isActive: boolean;
    phoneNumber: string;
    country: {
        countryCode: string;
        countryName: string;
    };
    userId: string;
    createdAt?: Date;
}

export default Employee
export interface IStudent {
    studentId: number,
    studentName: string,
    studentAge: number,
    studentStandard: string,
    studentEmail: string,
    studentFatherName: string,
    studentMotherName: string
}

export class Student implements IStudent {
    constructor(
        public studentId: number,
        public studentName: string,
        public studentAge: number,
        public studentStandard: string,
        public studentEmail: string,
        public studentFatherName: string,
        public studentMotherName: string
    ) {}
}

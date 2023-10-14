import { SubmittedFile } from './IFile-model';
import { Skill } from './ISkill-model';

export interface IEmployee {
    id: number;
    fullName: string;
    email?: string;
    phone?: number;
    contactPreference: string;
    skills: Skill[];
    submittedFile:SubmittedFile;
    IsDocSigned:boolean;
}
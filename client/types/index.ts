export interface Deliverable {
  title: string;
  description: string;
  status: string;
  progress: number;
  change: string;
}

export interface Feedback {
  author: string;
  text: string;
}

export interface Session {
  id: string;
  date: string;
  feedback: string;
  summary: string;
  module1:String;
  module2:String;
  module3:String;
  module4:String;
}

export interface ProjectProgress {
  id: string;
  name: string;
  globalProgress: number;
  sessions: Session[];
}

export interface ProjectMember {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  Year: string;
  role: string;
}

export interface ProjectRelation {
  projectId: string;
  relationType: string;
  relationData: ProjectMember[];
}

export interface Project {
  id: string;
  name: string;
  industry: string;
  about: string;
  problem: string;
  solution: string;
  idea: string;
  targetAudience: string;
  competitiveAdvantage: string;
  motivation: string;
  status: string;
  stage: string;
  createdAt: string;
  owners?: ProjectMember[];
  members?: ProjectMember[];
  encadrants?: ProjectMember[];
  juryMembers?: ProjectMember[];
  teamId: string;
  progress: ProjectProgress;
}

export interface Workshop{
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  duration: number;
  location: string;
  author: string;
}
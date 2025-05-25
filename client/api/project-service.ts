import { fetchWithAuth } from './user-service';
import {
  Deliverable,
  Feedback,
  Session,
  ProjectRelation,
  ProjectMember,
  Project,
} from '../types';

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;
const DUMMY_PROJECT_ID = 'dummy-project-id';

export const fetchProjectIdByUser = async (
  user: { id: string; name: string } | null,
  projectId?: string
): Promise<{ projectId: string | null; error: string | null }> => {
  const logPrefix = `[${new Date().toISOString()}] fetchProjectIdByUser`;
  try {
    console.debug(`${logPrefix}: Initiating project ID fetch`, { user, providedProjectId: projectId });

    if (!user) {
      console.warn(`${logPrefix}: User not authenticated`);
      return { projectId: null, error: 'User not authenticated. Please log in.' };
    }

    const userFirstName = user.name?.split(' ')[0] || user.name || '';
    console.debug(`${logPrefix}: Extracted user info`, { userId: user.id, userFirstName });

    if (!user.id || !userFirstName) {
      console.warn(`${logPrefix}: Missing user information`, { userId: user.id, userFirstName });
      return { projectId: null, error: 'Missing user information (ID or name). Please log in again.' };
    }

    if (projectId) {
      console.debug(`${logPrefix}: Using provided projectId, storing in localStorage`, { projectId });
      localStorage.setItem('projectId', projectId);
      return { projectId, error: null };
    }

    const storedProjectId = localStorage.getItem('projectId');
    if (storedProjectId) {
      console.debug(`${logPrefix}: Found projectId in localStorage`, { storedProjectId });
      return { projectId: storedProjectId, error: null };
    }

    console.debug(`${logPrefix}: Fetching projects for user`, { userId: user.id, userFirstName });
    const projects = await getProjectByUser({ id: user.id, firstName: userFirstName });
    if (!projects || projects.length === 0) {
      console.warn(`${logPrefix}: No projects found, using dummy project ID`, { DUMMY_PROJECT_ID });
      localStorage.setItem('projectId', DUMMY_PROJECT_ID);
      return { projectId: DUMMY_PROJECT_ID, error: null };
    }

    const newProjectId = projects[0].id;
    console.debug(`${logPrefix}: Selected first project ID, storing in localStorage`, { newProjectId });
    localStorage.setItem('projectId', newProjectId);
    return { projectId: newProjectId, error: null };
  } catch (err) {
    console.error(`${logPrefix}: Failed to fetch project ID`, {
      error: err instanceof Error ? err.message : String(err),
      stack: err instanceof Error ? err.stack : undefined,
    });
    return { projectId: null, error: 'Failed to load project ID. Please check your user data or contact support.' };
  }
};

export const getProjectById = async (projectId: string): Promise<Project> => {
  const logPrefix = `[${new Date().toISOString()}] getProjectById`;
  try {
    console.debug(`${logPrefix}: Fetching project`, { projectId });
    const project = await fetchWithAuth(`/projects/${projectId}`);
    console.debug(`${logPrefix}: Successfully fetched project`, { projectId, project });
    return project;
  } catch (err) {
    console.error(`${logPrefix}: Failed to fetch project`, {
      projectId,
      error: err instanceof Error ? err.message : String(err),
      stack: err instanceof Error ? err.stack : undefined,
    });
    throw err;
  }
};

export const getProjectSessions = async (projectId: string): Promise<Session[]> => {
  const logPrefix = `[${new Date().toISOString()}] getProjectSessions`;
  try {
    console.debug(`${logPrefix}: Fetching sessions`, { projectId });
    const sessions = await fetchWithAuth(`/projects/${projectId}/sessions`);
    console.debug(`${logPrefix}: Successfully fetched sessions`, { projectId, sessionCount: sessions.length });
    return sessions;
  } catch (err) {
    console.error(`${logPrefix}: Failed to fetch sessions`, {
      projectId,
      error: err instanceof Error ? err.message : String(err),
      stack: err instanceof Error ? err.stack : undefined,
    });
    throw err;
  }
};

export const getProjectMembers = async (projectId: string): Promise<ProjectRelation> => {
  const logPrefix = `[${new Date().toISOString()}] getProjectMembers`;
  try {
    console.log(`${logPrefix}: Fetching members`, { projectId });
    const members = await fetchWithAuth(`/projects/${projectId}/relation?relationType=members`);
    console.log(`${logPrefix}: Successfully fetched members`, {
      projectId,
      memberCount: members.relationData?.length || 0,
    });
    return members;
  } catch (err) {
    console.error(`${logPrefix}: Failed to fetch members`, {
      projectId,
      error: err instanceof Error ? err.message : String(err),
      stack: err instanceof Error ? err.stack : undefined,
    });
    throw err;
  }
};

export const getProjectEncadrants = async (projectId: string): Promise<ProjectRelation> => {
  const logPrefix = `[${new Date().toISOString()}] getProjectEncadrants`;
  try {
    console.log(`${logPrefix}: Fetching encadrants`, { projectId });
    const encadrants = await fetchWithAuth(`/projects/${projectId}/relation?relationType=encadrants`);
    console.log(`${logPrefix}: Successfully fetched encadrants`, {
      projectId,
      encadrantCount: encadrants.relationData?.length || 0,
    });
    return encadrants;
  } catch (err) {
    console.error(`${logPrefix}: Failed to fetch encadrants`, {
      projectId,
      error: err instanceof Error ? err.message : String(err),
      stack: err instanceof Error ? err.stack : undefined,
    });
    throw err;
  }
};

export const getProjectJuryMembers = async (projectId: string): Promise<ProjectRelation> => {
  const logPrefix = `[${new Date().toISOString()}] getProjectJuryMembers`;
  try {
    console.debug(`${logPrefix}: Fetching jury members`, { projectId });
    const juryMembers = await fetchWithAuth(`/projects/${projectId}/relation?relationType=juryMembers`);
    console.debug(`${logPrefix}: Successfully fetched jury members`, {
      projectId,
      juryMemberCount: juryMembers.relationData?.length || 0,
    });
    return juryMembers;
  } catch (err) {
    console.error(`${logPrefix}: Failed to fetch jury members`, {
      projectId,
      error: err instanceof Error ? err.message : String(err),
      stack: err instanceof Error ? err.stack : undefined,
    });
    throw err;
  }
};

export const getProjectByUser = async (user: { id: string; firstName: string }): Promise<Project[]> => {
  const logPrefix = `[${new Date().toISOString()}] getProjectByUser`;
  try {
    console.debug(`${logPrefix}: Fetching projects for user`, { userId: user.id, firstName: user.firstName });
    const projects = await fetchWithAuth(`/projects/search/owner/${encodeURIComponent(user.firstName)}`);
    const filteredProjects = projects.filter((project: Project) =>
      project?.owners?.some((owner: ProjectMember) => owner.id === user.id)
    );
    console.debug(`${logPrefix}: Successfully fetched and filtered projects`, {
      userId: user.id,
      projectCount: filteredProjects.length,
    });
    return filteredProjects;
  } catch (err) {
    console.error(`${logPrefix}: Failed to fetch projects`, {
      userId: user.id,
      error: err instanceof Error ? err.message : String(err),
      stack: err instanceof Error ? err.stack : undefined,
    });
    return [];
  }
};

export const createProject = async (projectData: {
  name: string;
  industry: string;
  about: string;
  problem: string;
  solution: string;
  idea: string;
  targetAudience: string;
  competitiveAdvantage: string;
  motivation: string;
  stage: string;
  memberEmails: string[];
  encadrantEmails: string[];
}): Promise<Project> => {
  const logPrefix = `[${new Date().toISOString()}] createProject`;
  try {
    console.debug(`${logPrefix}: Creating new project`, { projectName: projectData.name });
    const project = await fetchWithAuth('/projects', {
      method: 'POST',
      body: JSON.stringify(projectData),
    });
    console.debug(`${logPrefix}: Successfully created project`, { projectId: project.id, projectName: projectData.name });
    return project;
  } catch (err) {
    console.error(`${logPrefix}: Failed to create project`, {
      projectName: projectData.name,
      error: err instanceof Error ? err.message : String(err),
      stack: err instanceof Error ? err.stack : undefined,
    });
    throw err;
  }
};

export const searchProjectsByName = async (name: string): Promise<Project[]> => {
  const logPrefix = `[${new Date().toISOString()}] searchProjectsByName`;
  try {
    console.debug(`${logPrefix}: Searching projects by name`, { name });
    const projects = await fetchWithAuth(`/projects/search/name/${encodeURIComponent(name)}`);
    console.debug(`${logPrefix}: Successfully fetched projects`, { name, projectCount: projects.length });
    return projects;
  } catch (err) {
    console.error(`${logPrefix}: Failed to search projects`, {
      name,
      error: err instanceof Error ? err.message : String(err),
      stack: err instanceof Error ? err.stack : undefined,
    });
    throw err;
  }
};

export const getProjectsWithoutEncadrants = async (): Promise<{ projects: { id: string; name: string; membersCount: number }[] }> => {
  const logPrefix = `[${new Date().toISOString()}] getProjectsWithoutEncadrants`;
  try {
    console.debug(`${logPrefix}: Fetching projects without encadrants`);
    const result = await fetchWithAuth('/projects/noencadrants');
    console.debug(`${logPrefix}: Successfully fetched projects without encadrants`, { projectCount: result.projects.length });
    return result;
  } catch (err) {
    console.error(`${logPrefix}: Failed to fetch projects without encadrants`, {
      error: err instanceof Error ? err.message : String(err),
      stack: err instanceof Error ? err.stack : undefined,
    });
    throw err;
  }
};

export const addMemberToProject = async (projectId: string, userIdentifier: string) => {
  const logPrefix = `[${new Date().toISOString()}] addMemberToProject`;
  try {
    console.debug(`${logPrefix}: Adding member to project`, { projectId, userIdentifier });
    const result = await fetchWithAuth('/projects/add-member', {
      method: 'POST',
      body: JSON.stringify({ projectId, userIdentifier }),
    });
    console.debug(`${logPrefix}: Successfully added member`, { projectId, userIdentifier });
    return result;
  } catch (err) {
    console.error(`${logPrefix}: Failed to add member`, {
      projectId,
      userIdentifier,
      error: err instanceof Error ? err.message : String(err),
      stack: err instanceof Error ? err.stack : undefined,
    });
    throw err;
  }
};

export const addEncadrantToProject = async (projectId: string, userId: string) => {
  const logPrefix = `[${new Date().toISOString()}] addEncadrantToProject`;
  try {
    console.debug(`${logPrefix}: Adding encadrant to project`, { projectId, userId });
    const result = await fetchWithAuth(`/projects/${projectId}/add-encadrant/${userId}`, {
      method: 'POST',
    });
    console.debug(`${logPrefix}: Successfully added encadrant`, { projectId, userId });
    return result;
  } catch (err) {
    console.error(`${logPrefix}: Failed to add encadrant`, {
      projectId,
      userId,
      error: err instanceof Error ? err.message : String(err),
      stack: err instanceof Error ? err.stack : undefined,
    });
    throw err;
  }
};

export const addJuryMemberToProject = async (projectId: string, userId: string) => {
  const logPrefix = `[${new Date().toISOString()}] addJuryMemberToProject`;
  try {
    console.debug(`${logPrefix}: Adding jury member to project`, { projectId, userId });
    const result = await fetchWithAuth(`/projects/${projectId}/add-jury/${userId}`, {
      method: 'POST',
    });
    console.debug(`${logPrefix}: Successfully added jury member`, { projectId, userId });
    return result;
  } catch (err) {
    console.error(`${logPrefix}: Failed to add jury member`, {
      projectId,
      userId,
      error: err instanceof Error ? err.message : String(err),
      stack: err instanceof Error ? err.stack : undefined,
    });
    throw err;
  }
};

export const createSession = async (projectId: string, sessionData: Partial<Session>) => {
  const logPrefix = `[${new Date().toISOString()}] createSession`;
  try {
    console.debug(`${logPrefix}: Creating session for project`, { projectId, sessionData });
    const session = await fetchWithAuth(`/projects/${projectId}/sessions`, {
      method: 'POST',
      body: JSON.stringify(sessionData),
    });
    console.debug(`${logPrefix}: Successfully created session`, { projectId, sessionId: session.id });
    return session;
  } catch (err) {
    console.error(`${logPrefix}: Failed to create session`, {
      projectId,
      error: err instanceof Error ? err.message : String(err),
      stack: err instanceof Error ? err.stack : undefined,
    });
    throw err;
  }
};

export const getSessionById = async (sessionId: string): Promise<Session> => {
  const logPrefix = `[${new Date().toISOString()}] getSessionById`;
  try {
    console.debug(`${logPrefix}: Fetching session`, { sessionId });
    const session = await fetchWithAuth(`/sessions/${sessionId}`);
    console.debug(`${logPrefix}: Successfully fetched session`, { sessionId });
    return session;
  } catch (err) {
    console.error(`${logPrefix}: Failed to fetch session`, {
      sessionId,
      error: err instanceof Error ? err.message : String(err),
      stack: err instanceof Error ? err.stack : undefined,
    });
    throw err;
  }
};

export const updateSession = async (sessionId: string, sessionData: Partial<Session>) => {
  const logPrefix = `[${new Date().toISOString()}] updateSession`;
  try {
    console.debug(`${logPrefix}: Updating session`, { sessionId, sessionData });
    const session = await fetchWithAuth(`/sessions/${sessionId}`, {
      method: 'PATCH',
      body: JSON.stringify(sessionData),
    });
    console.debug(`${logPrefix}: Successfully updated session`, { sessionId });
    return session;
  } catch (err) {
    console.error(`${logPrefix}: Failed to update session`, {
      sessionId,
      error: err instanceof Error ? err.message : String(err),
      stack: err instanceof Error ? err.stack : undefined,
    });
    throw err;
  }
};

export const deleteSession = async (sessionId: string) => {
  const logPrefix = `[${new Date().toISOString()}] deleteSession`;
  try {
    console.debug(`${logPrefix}: Deleting session`, { sessionId });
    const result = await fetchWithAuth(`/sessions/${sessionId}`, {
      method: 'DELETE',
    });
    console.debug(`${logPrefix}: Successfully deleted session`, { sessionId });
    return result;
  } catch (err) {
    console.error(`${logPrefix}: Failed to delete session`, {
      sessionId,
      error: err instanceof Error ? err.message : String(err),
      stack: err instanceof Error ? err.stack : undefined,
    });
    throw err;
  }
};

export const addDeliverable = async (sessionId: string, deliverableData: Partial<Deliverable>) => {
  const logPrefix = `[${new Date().toISOString()}] addDeliverable`;
  try {
    console.debug(`${logPrefix}: Adding deliverable to session`, { sessionId, deliverableData });
    const deliverable = await fetchWithAuth(`/sessions/${sessionId}/deliverables`, {
      method: 'POST',
      body: JSON.stringify(deliverableData),
    });
    console.debug(`${logPrefix}: Successfully added deliverable`, { sessionId, deliverableId: deliverable.id });
    return deliverable;
  } catch (err) {
    console.error(`${logPrefix}: Failed to add deliverable`, {
      sessionId,
      error: err instanceof Error ? err.message : String(err),
      stack: err instanceof Error ? err.stack : undefined,
    });
    throw err;
  }
};

export const updateDeliverable = async (
  sessionId: string,
  deliverableId: string,
  deliverableData: Partial<Deliverable>
) => {
  const logPrefix = `[${new Date().toISOString()}] updateDeliverable`;
  try {
    console.debug(`${logPrefix}: Updating deliverable`, { sessionId, deliverableId, deliverableData });
    const deliverable = await fetchWithAuth(`/sessions/${sessionId}/deliverables/${deliverableId}`, {
      method: 'PATCH',
      body: JSON.stringify(deliverableData),
    });
    console.debug(`${logPrefix}: Successfully updated deliverable`, { sessionId, deliverableId });
    return deliverable;
  } catch (err) {
    console.error(`${logPrefix}: Failed to update deliverable`, {
      sessionId,
      deliverableId,
      error: err instanceof Error ? err.message : String(err),
      stack: err instanceof Error ? err.stack : undefined,
    });
    throw err;
  }
};

export const updateDeliverableProgress = async (sessionId: string, deliverableId: string, progress: number) => {
  const logPrefix = `[${new Date().toISOString()}] updateDeliverableProgress`;
  try {
    console.debug(`${logPrefix}: Updating deliverable progress`, { sessionId, deliverableId, progress });
    const result = await fetchWithAuth(`/sessions/${sessionId}/deliverables/${deliverableId}/progress`, {
      method: 'PATCH',
      body: JSON.stringify({ progress }),
    });
    console.debug(`${logPrefix}: Successfully updated deliverable progress`, { sessionId, deliverableId, progress });
    return result;
  } catch (err) {
    console.error(`${logPrefix}: Failed to update deliverable progress`, {
      sessionId,
      deliverableId,
      progress,
      error: err instanceof Error ? err.message : String(err),
      stack: err instanceof Error ? err.stack : undefined,
    });
    throw err;
  }
};

export const deleteDeliverable = async (sessionId: string, deliverableId: string) => {
  const logPrefix = `[${new Date().toISOString()}] deleteDeliverable`;
  try {
    console.debug(`${logPrefix}: Deleting deliverable`, { sessionId, deliverableId });
    const result = await fetchWithAuth(`/sessions/${sessionId}/deliverables/${deliverableId}`, {
      method: 'DELETE',
    });
    console.debug(`${logPrefix}: Successfully deleted deliverable`, { sessionId, deliverableId });
    return result;
  } catch (err) {
    console.error(`${logPrefix}: Failed to delete deliverable`, {
      sessionId,
      deliverableId,
      error: err instanceof Error ? err.message : String(err),
      stack: err instanceof Error ? err.stack : undefined,
    });
    throw err;
  }
};

export const addFeedback = async (sessionId: string, feedbackData: Partial<Feedback>) => {
  const logPrefix = `[${new Date().toISOString()}] addFeedback`;
  try {
    console.debug(`${logPrefix}: Adding feedback to session`, { sessionId, feedbackData });
    const feedback = await fetchWithAuth(`/sessions/${sessionId}/feedbacks`, {
      method: 'POST',
      body: JSON.stringify(feedbackData),
    });
    console.debug(`${logPrefix}: Successfully added feedback`, { sessionId, feedbackId: feedback.id });
    return feedback;
  } catch (err) {
    console.error(`${logPrefix}: Failed to add feedback`, {
      sessionId,
      error: err instanceof Error ? err.message : String(err),
      stack: err instanceof Error ? err.stack : undefined,
    });
    throw err;
  }
};

export const updateFeedback = async (sessionId: string, feedbackId: string, feedbackData: Partial<Feedback>) => {
  const logPrefix = `[${new Date().toISOString()}] updateFeedback`;
  try {
    console.debug(`${logPrefix}: Updating feedback`, { sessionId, feedbackId, feedbackData });
    const feedback = await fetchWithAuth(`/sessions/${sessionId}/feedbacks/${feedbackId}`, {
      method: 'PATCH',
      body: JSON.stringify(feedbackData),
    });
    console.debug(`${logPrefix}: Successfully updated feedback`, { sessionId, feedbackId });
    return feedback;
  } catch (err) {
    console.error(`${logPrefix}: Failed to update feedback`, {
      sessionId,
      feedbackId,
      error: err instanceof Error ? err.message : String(err),
      stack: err instanceof Error ? err.stack : undefined,
    });
    throw err;
  }
};

export const deleteFeedback = async (sessionId: string, feedbackId: string) => {
  const logPrefix = `[${new Date().toISOString()}] deleteFeedback`;
  try {
    console.debug(`${logPrefix}: Deleting feedback`, { sessionId, feedbackId });
    const result = await fetchWithAuth(`/sessions/${sessionId}/feedbacks/${feedbackId}`, {
      method: 'DELETE',
    });
    console.debug(`${logPrefix}: Successfully deleted feedback`, { sessionId, feedbackId });
    return result;
  } catch (err) {
    console.error(`${logPrefix}: Failed to delete feedback`, {
      sessionId,
      feedbackId,
      error: err instanceof Error ? err.message : String(err),
      stack: err instanceof Error ? err.stack : undefined,
    });
    throw err;
  }
};

export type { Session };
"use client";

import { useState, useEffect } from "react";
import {
  makeStyles,
  tokens,
  Button,
  Checkbox,
  Input,
  Avatar,
} from "@fluentui/react-components";
import {
  MoreHorizontalRegular,
  CopyRegular,
  ShareRegular,
  PersonAddRegular,
  PeopleTeamRegular,
} from "@fluentui/react-icons";
import {
  getProjectMembers,
  getProjectEncadrants,
  addMemberToProject,
} from "../../api/project-service";
import { getAllUsers } from "../../api/user-service";
import { ProjectMember } from "../../types";
import { useAuthContext } from "./components/AuthContext";

const useStyles = makeStyles({
  root: {
    display: "flex",
    backgroundColor: tokens.colorNeutralBackground2,
  },
  mainContent: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    overflow: "auto",
  },
  content: {
    padding: "1.5rem 2rem",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  headerSection: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "1rem",
  },
  title: {
    fontSize: "24px",
    fontWeight: "600",
    color: tokens.colorNeutralForeground1,
    margin: 0,
  },
  subtext: {
    fontSize: "14px",
    color: tokens.colorNeutralForeground2,
    marginTop: "0.5rem",
  },
  inviteButton: {
    backgroundColor: tokens.colorBrandBackground,
    color: tokens.colorNeutralForegroundOnBrand,
    fontWeight: "600",
    padding: "0.5rem 1rem",
    borderRadius: "4px",
    ":hover": { backgroundColor: tokens.colorBrandBackgroundHover },
  },
  section: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    marginBottom: "2rem",
  },
  sectionTitle: {
    fontSize: "18px",
    fontWeight: "600",
    color: tokens.colorNeutralForeground1,
    margin: 0,
  },
  table: {
    width: "100%",
    borderCollapse: "separate",
    borderSpacing: "0 4px",
  },
  tableHeader: {
    textAlign: "left",
    padding: "0.5rem 1rem",
    fontSize: "12px",
    fontWeight: "600",
    color: tokens.colorNeutralForeground2,
  },
  tableRow: {
    backgroundColor: tokens.colorNeutralBackground1,
    ":hover": { backgroundColor: tokens.colorNeutralBackground3 },
  },
  tableCell: {
    padding: "0.75rem 1rem",
    fontSize: "14px",
    color: tokens.colorNeutralForeground1,
    verticalAlign: "middle",
  },
  checkboxCell: { width: "40px", padding: "0.5rem 1rem" },
  profileCell: { display: "flex", alignItems: "center", gap: "0.75rem" },
  avatar: { position: "relative" },
  name: { fontSize: "14px", fontWeight: "500", color: tokens.colorNeutralForeground1 },
  emailCell: { fontSize: "14px", color: tokens.colorNeutralForeground2 },
  actionsCell: { width: "40px", textAlign: "center" },
  menuButton: {
    background: "transparent",
    border: "none",
    color: tokens.colorNeutralForeground2,
    padding: "4px",
    ":hover": { backgroundColor: tokens.colorNeutralBackground3, borderRadius: "4px" },
  },
  noDataContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "2rem",
    borderRadius: "4px",
    textAlign: "center",
    gap: "0.5rem",
  },
  noDataIcon: {
    fontSize: "32px",
    color: tokens.colorNeutralForeground3,
  },
  noDataText: {
    fontSize: "14px",
    color: tokens.colorNeutralForeground2,
  },
  errorContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "0.5rem",
    padding: "1rem",
    backgroundColor: tokens.colorStatusDangerBackground1,
    borderRadius: "4px",
    color: tokens.colorStatusDangerForeground1,
  },
  errorText: {
    fontSize: "14px",
  },
  retryButton: {
    backgroundColor: tokens.colorBrandBackground,
    color: tokens.colorNeutralForegroundOnBrand,
    padding: "0.25rem 0.75rem",
  },
});

const Team = () => {
  const styles = useStyles();
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [members, setMembers] = useState<ProjectMember[]>([]);
  const [mentors, setMentors] = useState<ProjectMember[]>([]);
  const [allUsers, setAllUsers] = useState<ProjectMember[]>([]);
  const [usersLoading, setUsersLoading] = useState(false);
  const [usersError, setUsersError] = useState<string | null>(null);
  const [inviteError, setInviteError] = useState<string | null>(null);
  const {user}=useAuthContext()
  const projectId=user?.projectId
  useEffect(() => {
  const fetchData = async () => {
    if (!projectId) {
      console.warn(`[${new Date().toISOString()}] Team: projectId is undefined or null, skipping fetchData`);
      return;
    }

    try {
      console.debug(`[${new Date().toISOString()}] Team: Initiating fetch for project members and mentors`, { projectId });

      // Fetch members and mentors concurrently for better performance
      const [membersData, encadrantsData] = await Promise.all([
        getProjectMembers(projectId).then(data => {
          console.debug(`[${new Date().toISOString()}] Team: Successfully fetched project members`, {
            projectId,
            memberCount: data.relationData?.length || 0,
          });
          return data;
        }),
        getProjectEncadrants(projectId).then(data => {
          console.debug(`[${new Date().toISOString()}] Team: Successfully fetched project mentors`, {
            projectId,
            mentorCount: data.relationData?.length || 0,
          });
          return data;
        }),
      ]);

      // Log combined success state
      console.debug(`[${new Date().toISOString()}] Team: Successfully fetched all project data`, {
        projectId,
        members: membersData.relationData,
        mentors: encadrantsData.relationData,
      });

      // Update state
      setMembers(membersData.relationData);
      setMentors(encadrantsData.relationData);
    } catch (error) {
      console.error(`[${new Date().toISOString()}] Team: Failed to fetch project data`, {
        projectId,
        error: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
      });
    }
  };

  if (projectId) {
    console.info(`[${new Date().toISOString()}] Team: Starting data fetch for project`, { projectId });
    fetchData();
  }
}, [projectId]);

  const fetchUsers = async () => {
    console.debug("Team: Initiating fetchUsers for getAllUsers", { isModalOpen });
    setUsersLoading(true);
    setUsersError(null);
    setAllUsers([]);

    try {
      const users = await getAllUsers();
      console.debug("Team: Successfully fetched all users", { users });
      setAllUsers(users);
      setUsersError(null);
    } catch (error) {
      const errorMessage = (error as Error).message || "Unable to load users. Please try again later.";
      console.error("Team: Failed to fetch all users", {
        error: errorMessage,
        stack: (error as Error).stack,
      });
      setUsersError(errorMessage);
    } finally {
      setUsersLoading(false);
      console.debug("Team: Completed fetchUsers", {
        usersLoading: false,
        usersError,
        allUsersCount: allUsers.length,
      });
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      fetchUsers();
    }
  }, [isModalOpen]);

  const filteredUsers = allUsers
    .filter((user) => !members.some((member) => member.id === user.id))
    .filter((user) => user.email.toLowerCase().includes(searchQuery.toLowerCase()))
    .slice(0, 5); 

  const handleCheckboxChange = (id: string) => {
    console.debug("Team: Toggling checkbox for user", { id, selectedMembers });
    setSelectedMembers((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleInvite = async (email: string) => {
    if (!email || !projectId) {
      console.warn("Team: Invalid invite parameters", { email, projectId });
      setInviteError("Please enter a valid email and ensure project ID is provided");
      return;
    }

    console.debug("Team: Attempting to invite user by email", { email });
    try {
      const user = allUsers.find(
        (u) => u.email.toLowerCase() === email.toLowerCase()
      );
      if (user) {
        console.debug("Team: Found user to invite", { user });
        await addMemberToProject(projectId, user.id);
        console.debug("Team: Successfully invited user", { email, userId: user.id });
        setSearchQuery("");
        setIsModalOpen(false);
        setInviteError(null);
        const membersData = await getProjectMembers(projectId);
        console.debug("Team: Refreshed members list after invite", {
          members: membersData.relationData,
        });
        setMembers(membersData.relationData);
      } else {
        console.warn("Team: User not found in registered users", { email });
        setInviteError("User not found in registered users");
      }
    } catch (error) {
      const errorMessage = (error as Error).message || "Failed to invite user";
      console.error("Team: Invite failed", {
        email,
        error: errorMessage,
        stack: (error as Error).stack,
      });
      setInviteError(errorMessage);
    }
  };

  const handleInviteUser = async (userId: string) => {
    if (!projectId) {
      console.warn("Team: Cannot invite user, projectId is not defined", { userId, projectId });
      setInviteError("Project ID is not defined. Cannot invite user.");
      return;
    }
    console.debug("Team: Attempting to invite registered user", { userId });
    try {
      await addMemberToProject(projectId, userId);
      console.debug("Team: Successfully invited registered user", { userId });
      setSearchQuery("");
      const membersData = await getProjectMembers(projectId);
      console.debug("Team: Refreshed members list after invite", {
        members: membersData.relationData,
      });
      setMembers(membersData.relationData);
    } catch (error) {
      console.error("Team: Failed to invite registered user", {
        userId,
        error: (error as Error).message,
        stack: (error as Error).stack,
      });
    }
  };

  const handleCopyLink = () => {
    const link = `https://www.starthub.com/project/${projectId}`;
    navigator.clipboard.writeText(link);
    console.debug("Team: Copied project link to clipboard", { link });
  };

  return (
    <div className={styles.root}>
      <div className={styles.mainContent}>
        <div className={styles.content}>
          <div className={styles.headerSection}>
            <div>
              <h1 className={styles.title}>My Team</h1>
              <p className={styles.subtext}>Manage your project team members and mentors</p>
            </div>
            <Button
              className={styles.inviteButton}
              icon={<PersonAddRegular />}
              onClick={() => {
                console.debug("Team: Opening invite modal");
                setSearchQuery("");
                setInviteError(null);
                setIsModalOpen(true);
              }}
            >
              Invite Member
            </Button>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Members ({members?.length})</h2>
            {members?.length > 0 ? (
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th className={styles.tableHeader} style={{ width: "40px" }}>
                      <Checkbox />
                    </th>
                    <th className={styles.tableHeader}>Name</th>
                    <th className={styles.tableHeader}>Email</th>
                    <th className={styles.tableHeader} style={{ width: "40px" }}></th>
                  </tr>
                </thead>
                <tbody>
                  {members.map((member) => (
                    <tr key={member.id} className={styles.tableRow}>
                      <td className={`${styles.tableCell} ${styles.checkboxCell}`}>
                        <Checkbox
                          checked={selectedMembers.includes(member.id)}
                          onChange={() => handleCheckboxChange(member.id)}
                        />
                      </td>
                      <td className={styles.tableCell}>
                        <div className={styles.profileCell}>
                          <div className={styles.avatar}>
                            <Avatar
                              name={`${member.firstName} ${member.lastName}`}
                              size={32}
                              color="colorful"
                            />
                          </div>
                          <span className={styles.name}>{`${member.firstName} ${member.lastName}`}</span>
                        </div>
                      </td>
                      <td className={`${styles.tableCell} ${styles.emailCell}`}>{member.email}</td>
                      <td className={`${styles.tableCell} ${styles.actionsCell}`}>
                        <Button className={styles.menuButton} icon={<MoreHorizontalRegular />} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className={styles.noDataContainer}>
                <PeopleTeamRegular className={styles.noDataIcon} />
                <p className={styles.noDataText}>No members yet. Invite someone to join your project!</p>
              </div>
            )}
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Mentors ({mentors?.length})</h2>
            {mentors?.length > 0 ? (
              <table className={styles.table}>
                <tbody>
                  {mentors?.map((mentor) => (
                    <tr key={mentor.id} className={styles.tableRow}>
                      <td className={`${styles.tableCell} ${styles.checkboxCell}`}>
                        <Checkbox
                          checked={selectedMembers.includes(mentor.id)}
                          onChange={() => handleCheckboxChange(mentor.id)}
                        />
                      </td>
                      <td className={styles.tableCell}>
                        <div className={styles.profileCell}>
                          <div className={styles.avatar}>
                            <Avatar
                              name={`${mentor.firstName} ${mentor.lastName}`}
                              size={32}
                              color="colorful"
                            />
                          </div>
                          <span className={styles.name}>{`${mentor.firstName} ${mentor.lastName}`}</span>
                        </div>
                      </td>
                      <td className={`${styles.tableCell} ${styles.emailCell}`}>{mentor.email}</td>
                      <td className={`${styles.tableCell} ${styles.actionsCell}`}>
                        <Button className={styles.menuButton} icon={<MoreHorizontalRegular />} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className={styles.noDataContainer}>
                <PeopleTeamRegular className={styles.noDataIcon} />
                <p className={styles.noDataText}>No mentors assigned yet. Add a mentor to guide your project!</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
          onClick={() => {
            console.debug("Team: Closing invite modal via backdrop click");
            setIsModalOpen(false);
          }}
        >
          <div
            style={{
              backgroundColor: tokens.colorNeutralBackground1,
              borderRadius: "8px",
              padding: "1.5rem",
              width: "450px",
              maxWidth: "90vw",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "1.5rem",
              }}
            >
              <h2 style={{ margin: 0, fontSize: "18px", fontWeight: "600" }}>
                Invite a New Member
              </h2>
              <Button
                appearance="subtle"
                size="small"
                onClick={() => {
                  console.debug("Team: Closing invite modal via close button");
                  setIsModalOpen(false);
                }}
                aria-label="Close"
                icon={<span style={{ fontSize: "16px" }}>×</span>}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <div>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <Input
                    style={{ flex: 1 }}
                    placeholder="Enter email to invite or search registered users"
                    value={searchQuery}
                    onChange={(e) => {
                      console.debug("Team: Updating search query", { searchQuery: e.target.value });
                      setSearchQuery(e.target.value);
                      setInviteError(null);
                    }}
                  />
                  <Button
                    style={{
                      backgroundColor: tokens.colorBrandBackground,
                      color: tokens.colorNeutralForegroundOnBrand,
                      minWidth: "100px",
                      marginTop: "0.5rem",
                    }}
                    onClick={() => handleInvite(searchQuery)}
                  >
                    Invite
                  </Button>
                </div>
                <div style={{ marginTop: "1rem" }}>
                  {usersLoading ? (
                    <p style={{ color: tokens.colorNeutralForeground2 }}>Loading users...</p>
                  ) : usersError ? (
                    <div className={styles.errorContainer}>
                      <p className={styles.errorText}>{usersError}</p>
                      <Button
                        className={styles.retryButton}
                        onClick={() => {
                          console.debug("Team: Retrying fetchUsers due to error");
                          fetchUsers();
                        }}
                      >
                        Retry
                      </Button>
                    </div>
                  ) : filteredUsers.length === 0 ? (
                    <p style={{ color: tokens.colorNeutralForeground2 }}>
                      {searchQuery
                        ? "No registered users found matching your search"
                        : "No registered users available to invite"}
                    </p>
                  ) : (
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      {filteredUsers.map((user) => (
                        <div
                          key={user.id}
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            padding: "0.5rem 0",
                            borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
                            flex: "1 1 auto", 
                          }}
                        >
                          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flex: "1" }}>
                            <Avatar
                              name={`${user.firstName} ${user.lastName}`}
                              size={32}
                              color="colorful"
                            />
                            <div style={{ flex: "1", overflow: "hidden" }}>
                              <div
                                style={{
                                  fontSize: "14px",
                                  fontWeight: "500",
                                  whiteSpace: "nowrap",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                }}
                              >
                                {`${user.firstName} ${user.lastName}`}
                              </div>
                              <div
                                style={{
                                  fontSize: "12px",
                                  color: tokens.colorNeutralForeground2,
                                  whiteSpace: "nowrap",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                }}
                              >
                                {user.email}
                              </div>
                            </div>
                          </div>
                          <Button
                            appearance="primary"
                            size="small"
                            onClick={() => handleInviteUser(user.id)}
                          >
                            Invite
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                  {inviteError && (
                    <p style={{ color: "red", marginTop: "0.5rem" }}>{inviteError}</p>
                  )}
                </div>
              </div>

              <div>
                <h3 style={{ fontSize: "14px", fontWeight: "600", marginBottom: "0.75rem" }}>
                  Invite via Link
                </h3>
                <div
                  style={{
                    display: "flex",
                    border: `1px solid ${tokens.colorNeutralStroke1}`,
                    borderRadius: "4px",
                    overflow: "hidden",
                  }}
                >
                  <input
                    style={{
                      flex: 1,
                      padding: "0.5rem 0.75rem",
                      border: "none",
                      outline: "none",
                      fontSize: "14px",
                    }}
                    value={`https://www.starthub.com/project/${projectId}`}
                    readOnly
                  />
                  <Button
                    appearance="subtle"
                    icon={<CopyRegular />}
                    onClick={handleCopyLink}
                    style={{ borderLeft: `1px solid ${tokens.colorNeutralStroke1}` }}
                  />
                  <Button
                    appearance="subtle"
                    icon={<ShareRegular />}
                    style={{ borderLeft: `1px solid ${tokens.colorNeutralStroke1}` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Team;
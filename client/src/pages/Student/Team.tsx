"use client";

import { useState, useEffect, useMemo } from "react";
import {
  makeStyles,
  tokens,
  Button,
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
  addEncadrantToProject,
} from "../../../api/project-service";
import { getAllUsers } from "../../../api/user-service";
import { ProjectMember } from "../../../types";
import { useAuthContext } from "../components/AuthContext";

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
  profileCell: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
  },
  avatar: {
    position: "relative",
  },
  name: {
    fontSize: "14px",
    fontWeight: "500",
    color: tokens.colorNeutralForeground1,
  },
  emailCell: {
    fontSize: "14px",
    color: tokens.colorNeutralForeground2,
  },
  actionsCell: {
    width: "40px",
    textAlign: "center",
  },
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
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [members, setMembers] = useState<ProjectMember[]>([]);
    const [mentors, setMentors] = useState<ProjectMember[]>([]);
    const [allUsers, setAllUsers] = useState<ProjectMember[]>([]);
    const [usersLoading, setUsersLoading] = useState<boolean>(false);
    const [usersError, setUsersError] = useState<string | null>(null);
    const [inviteError, setInviteError] = useState<string | null>(null);
    const [fetchError, setFetchError] = useState<string | null>(null);
    const { user } = useAuthContext();
    const projectId = user?.projectId;

    const fetchData = async () => {
        if (!projectId) {
        console.warn(`[${new Date().toISOString()}] Team: projectId is undefined`);
        setFetchError("No project ID provided.");
        setUsersLoading(false);
        return;
        }

        const token = localStorage.getItem("authToken");
        if (!token) {
        console.warn(`[${new Date().toISOString()}] Team: No auth token`);
        setFetchError("Please log in to view team data.");
        setUsersLoading(false);
        return;
        }

        try {
        setUsersLoading(true);
        console.debug(`[${new Date().toISOString()}] Team: Fetching members and mentors`, { projectId });

        const [membersData, encadrantsData] = await Promise.all([
            getProjectMembers(projectId),
            getProjectEncadrants(projectId),
        ]);

        if (!Array.isArray(membersData) || !Array.isArray(encadrantsData)) {
            console.warn(`[${new Date().toISOString()}] Team: Invalid response`, { projectId });
            throw new Error("Invalid response format from server");
        }

        const filteredMembers = [
            ...membersData.filter((user) => user.role === "MEMBER"),
            ...encadrantsData.filter((user) => user.role === "MEMBER"),
        ];

        const filteredEncadrants = [
            ...membersData.filter((user) => user.role === "SUPERVISOR"),
            ...encadrantsData.filter((user) => user.role === "SUPERVISOR"),
        ];

        console.debug(`[${new Date().toISOString()}] Team: Fetched and filtered`, {
            projectId,
            memberCount: filteredMembers.length,
            mentorCount: filteredEncadrants.length,
        });

        setMembers(filteredMembers);
        setMentors(filteredEncadrants);
        setFetchError(null);
        } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Failed to fetch team data";
        console.error(`[${new Date().toISOString()}] Team: Fetch error`, { projectId, error: errorMessage });
        setMembers([]);
        setMentors([]);
        setFetchError(errorMessage);
        } finally {
        setUsersLoading(false);
        }
    };

    useEffect(() => {
        if (projectId) {
        console.info(`[${new Date().toISOString()}] Team: Starting data fetch for project`, { projectId });
        fetchData();
        }
    }, [projectId]);

    const fetchUsers = async () => {
        const token = localStorage.getItem("authToken");
        if (!token) {
        console.warn(`[${new Date().toISOString()}] Team: No authentication token available`);
        setUsersError("Please log in to invite users");
        setUsersLoading(false);
        return;
        }
        console.debug(`[${new Date().toISOString()}] Team: Initiating fetchUsers`, { isModalOpen });
        setUsersLoading(true);
        setUsersError(null);
        setAllUsers([]);

        try {
        const users = await getAllUsers();
        console.debug(`[${new Date().toISOString()}] Team: Successfully fetched users`, { userCount: users.length });
        setAllUsers(users);
        setUsersError(null);
        } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Unable to load users.";
        console.error(`[${new Date().toISOString()}] Team: Failed to fetch users`, { error: errorMessage });
        setUsersError(errorMessage);
        } finally {
        setUsersLoading(false);
        }
    };

    useEffect(() => {
        if (isModalOpen) {
        fetchUsers();
        }
    }, [isModalOpen]);

    const filteredUsers = useMemo(() => {
        return allUsers
        .filter((user) => !members.some((member) => member.id === user.id))
        .filter((user) => {
            if (!searchQuery.trim()) return true;
            const searchLower = searchQuery.toLowerCase();
            return (
            (user.email && user.email.toLowerCase().includes(searchLower)) ||
            (user.firstName && user.firstName.toLowerCase().includes(searchLower)) ||
            (user.lastName && user.lastName.toLowerCase().includes(searchLower))
            );
        })
        .slice(0, 5);
    }, [allUsers, members, searchQuery]);

    const handleInviteUser = async (identifier: string, isEmail: boolean = false) => {
        if (!projectId) {
        console.warn(`[${new Date().toISOString()}] Team: No projectId`, { identifier, projectId });
        setInviteError("Project ID is not defined.");
        return;
        }

        console.debug(`[${new Date().toISOString()}] Team: Attempting to invite user`, { identifier, isEmail });

        try {
        let userId: string;
        let userRole: string | undefined;

        if (isEmail) {
            const user = allUsers.find((u) => u.email?.toLowerCase() === identifier.toLowerCase());
            if (!user) {
            console.warn(`[${new Date().toISOString()}] Team: User not found`, { email: identifier });
            setInviteError("User not found in registered users");
            return;
            }
            userId = user.id;
            userRole = user.role;
            console.debug(`[${new Date().toISOString()}] Team: Found user by email`, { userId, role: userRole });
        } else {
            userId = identifier;
            const user = allUsers.find((u) => u.id === userId);
            userRole = user?.role;
            console.debug(`[${new Date().toISOString()}] Team: Found user by ID`, { userId, role: userRole });
        }

        if (!userId) {
            console.warn(`[${new Date().toISOString()}] Team: Invalid user ID`, { identifier });
            setInviteError("Invalid user ID.");
            return;
        }

        if (userRole === "MEMBER") {
            await addMemberToProject(projectId, userId);
            console.debug(`[${new Date().toISOString()}] Team: Successfully added member`, { identifier, userId });
        } else if (userRole === "SUPERVISOR") {
            await addMemberToProject(projectId, userId);
            console.debug(`[${new Date().toISOString()}] Team: Successfully added encadrant`, { identifier, userId });
        } else {
            console.warn(`[${new Date().toISOString()}] Team: Invalid user role`, { identifier, role: userRole });
            setInviteError("Invalid user role. Cannot invite user.");
            return;
        }

        await fetchData();
        setSearchQuery("");
        setIsModalOpen(false);
        setInviteError(null);
        } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Failed to invite user";
        console.error(`[${new Date().toISOString()}] Team: Invite failed`, { identifier, error: errorMessage });
        setInviteError(errorMessage);
        }
    };

    const handleCopyLink = () => {
        const link = `https://www.starterhub.com/project/${projectId}`;
        try {
        navigator.clipboard.writeText(link);
        console.debug(`[${new Date().toISOString()}] Team: Copied link`, { link });
        } catch (err) {
        console.error(`[${new Date().toISOString()}] Team: Failed to copy link`, { error: String(err) });
        }
    };

    const handleShare = async () => {
        const link = `https://www.starterhub.com/project/${projectId}`;
        try {
        if (navigator.share) {
            await navigator.share({
            title: "Join My Project",
            text: "Check out my project on Starterhub!",
            url: link,
            });
            console.debug(`[${new Date().toISOString()}] Team: Shared link`, { link });
        } else {
            console.debug(`[${new Date().toISOString()}] Team: Web Share API not supported, copying link`, { link });
            handleCopyLink();
        }
        } catch (error) {
        console.error(`[${new Date().toISOString()}] Team: Failed to share link`, { error: String(error) });
        }
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
                    console.debug(`[${new Date().toISOString()}] Team: Opening invite modal`);
                    setSearchQuery("");
                    setInviteError(null);
                    setIsModalOpen(true);
                }}
                >
                Invite Member
                </Button>
            </div>

            <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Members ({members.length})</h2>
                {fetchError ? (
                <div className={styles.errorContainer}>
                    <p className={styles.errorText}>{fetchError}</p>
                    <Button
                    className={styles.retryButton}
                    onClick={() => {
                        console.debug(`[${new Date().toISOString()}] Team: Retrying fetchData`);
                        if (projectId) fetchData();
                    }}
                    >
                    Retry
                    </Button>
                </div>
                ) : members.length > 0 ? (
                <table className={styles.table}>
                    <thead>
                    <tr>
                        <th className={styles.tableHeader}>Name</th>
                        <th className={styles.tableHeader}>Email</th>
                        <th className={styles.tableHeader} style={{ width: "40px" }}></th>
                    </tr>
                    </thead>
                    <tbody>
                    {members.map((member) => {
                        const displayName = `${member.firstName ?? "Unknown"} ${member.lastName ?? ""}`.trim() || "No name provided";
                        const displayEmail = member.email ?? "No email provided";
                        return (
                        <tr key={member.id} className={styles.tableRow}>
                            <td className={styles.tableCell}>
                            <div className={styles.profileCell}>
                                <div className={styles.avatar}>
                                <Avatar name={displayName} size={32} color="colorful" />
                                </div>
                                <span className={styles.name}>{displayName}</span>
                            </div>
                            </td>
                            <td className={`${styles.tableCell} ${styles.emailCell}`}>{displayEmail}</td>
                            <td className={`${styles.tableCell} ${styles.actionsCell}`}>
                            <Button className={styles.menuButton} icon={<MoreHorizontalRegular />} />
                            </td>
                        </tr>
                        );
                    })}
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
                <h2 className={styles.sectionTitle}>Mentors ({mentors.length})</h2>
                {fetchError ? (
                <div className={styles.errorContainer}>
                    <p className={styles.errorText}>{fetchError}</p>
                    <Button
                    className={styles.retryButton}
                    onClick={() => {
                        console.debug(`[${new Date().toISOString()}] Team: Retrying fetchData`);
                        if (projectId) fetchData();
                    }}
                    >
                    Retry
                    </Button>
                </div>
                ) : mentors.length > 0 ? (
                <table className={styles.table}>
                    <tbody>
                    {mentors.map((mentor) => {
                        const displayName = `${mentor.firstName ?? "Unknown"} ${mentor.lastName ?? ""}`.trim() || "No name provided";
                        const displayEmail = mentor.email ?? "No email provided";
                        return (
                        <tr key={mentor.id} className={styles.tableRow}>
                            <td className={styles.tableCell}>
                            <div className={styles.profileCell}>
                                <div className={styles.avatar}>
                                <Avatar name={displayName} size={32} color="colorful" />
                                </div>
                                <span className={styles.name}>{displayName}</span>
                            </div>
                            </td>
                            <td className={`${styles.tableCell} ${styles.emailCell}`}>{displayEmail}</td>
                            <td className={`${styles.tableCell} ${styles.actionsCell}`}>
                            <Button className={styles.menuButton} icon={<MoreHorizontalRegular />} />
                            </td>
                        </tr>
                        );
                    })}
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
                console.debug(`[${new Date().toISOString()}] Team: Closing invite modal`);
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
                <h2 style={{ margin: 0, fontSize: "14px", fontWeight: "600" }}>Invite a New Member</h2>
                <Button
                    appearance="subtle"
                    size="small"
                    onClick={() => {
                    console.debug(`[${new Date().toISOString()}] Team: Closing invite modal`);
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
                        placeholder="Enter email or name to search users"
                        value={searchQuery}
                        onChange={(e) => {
                        console.debug(`[${new Date().toISOString()}] Team: Updating search`, { searchQuery: e.target.value });
                        setSearchQuery(e.target.value);
                        setInviteError(null);
                        }}
                    />
                    <Button
                        style={{
                        backgroundColor: tokens.colorBrandBackground,
                        color: tokens.colorNeutralForegroundOnBrand,
                        minWidth: "100px",
                        }}
                        onClick={() => handleInviteUser(searchQuery, true)}
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
                            console.debug(`[${new Date().toISOString()}] Team: Retrying fetchUsers`);
                            fetchUsers();
                            }}
                        >
                            Retry
                        </Button>
                        </div>
                    ) : filteredUsers.length === 0 ? (
                        <p style={{ color: tokens.colorNeutralForeground2 }}>
                        {searchQuery
                            ? "No users found matching your search"
                            : allUsers.length === 0
                            ? "No registered users available to invite"
                            : "All available users are already project members"}
                        </p>
                    ) : (
                        <div style={{ display: "flex", flexDirection: "column" }}>
                        {filteredUsers.map((user) => {
                            const displayName = `${user.firstName || "Unknown"} ${user.lastName || ""}`.trim() || "No name provided";
                            const displayEmail = user.email || "No email provided";
                            return (
                            <div
                                key={user.id}
                                style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                padding: "0.5rem 0",
                                }}
                            >
                                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flex: 1 }}>
                                <Avatar name={displayName} size={32} />
                                <div style={{ flex: 1, overflow: "hidden" }}>
                                    <div
                                    style={{
                                        fontSize: "14px",
                                        fontWeight: "500",
                                        whiteSpace: "nowrap",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                    }}
                                    >
                                    {displayName}
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
                                    {displayEmail}
                                    </div>
                                </div>
                                </div>
                                <Button
                                appearance="primary"
                                size="small"
                                onClick={() => handleInviteUser(user.id)}
                                disabled={!user.id}
                                >
                                Invite
                                </Button>
                            </div>
                            );
                        })}
                        </div>
                    )}
                    {inviteError && (
                        <p style={{ color: tokens.colorStatusDangerForeground1, marginTop: "0.5rem" }}>{inviteError}</p>
                    )}
                    </div>
                </div>

                <div>
                    <h3 style={{ fontSize: "14px", fontWeight: "600", marginBottom: "0.75rem" }}>Invite via Link</h3>
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
                        value={projectId ? `https://www.starterhub.com/project/${projectId}` : ""}
                        readOnly
                    />
                    <Button
                        appearance="subtle"
                        icon={<CopyRegular />}
                        onClick={handleCopyLink}
                        style={{ borderLeft: `1px solid ${tokens.colorNeutralStroke1}` }}
                        disabled={!projectId}
                    />
                    <Button
                        appearance="subtle"
                        icon={<ShareRegular />}
                        onClick={handleShare}
                        style={{ borderLeft: `1px solid ${tokens.colorNeutralStroke1}` }}
                        disabled={!projectId}
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
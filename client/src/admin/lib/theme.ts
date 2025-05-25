import { makeStyles, tokens, shorthands } from "@fluentui/react-components";

export const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "90vh", // <--- 90% of the viewport height (not 100%)
    backgroundColor: tokens.colorNeutralBackground2,
    overflow: "hidden",

    ":global(html, body)": {
      margin: 0,
      padding: 0,
      overflow: "hidden", // <--- important
      height: "100%",
    },
  },

  tableContainer: {
    flex: "1 1 0",
    display: "flex",
    flexDirection: "column",
    ...shorthands.gap("16px"),
    overflow: "hidden",
  },

  tableWrapper: {
    backgroundColor: tokens.colorNeutralBackground1,
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    ...shorthands.padding("16px"),
    overflowY: "auto",
    maxHeight: "100%", // <--- very important, so it doesn't overflow container
    scrollbarWidth: "none",
    msOverflowStyle: "none",
    "::webkit-scrollbar": { display: "none" },
    ":global(*::-webkit-scrollbar)": { display: "none" },
  },
  container: {
    display: "flex",
    flexDirection: "column",
    flex: 1, // <--- Important! allow it to grow
    overflow: "hidden",
    ...shorthands.gap("16px"),
  },

  projectsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: tokens.spacingHorizontalXL, // 👈 spacing between cards (horizontal and vertical)
    padding: tokens.spacingHorizontalXL, // 👈 padding around the grid itself
    overflowY: "auto",
    flexGrow: 1,
    minHeight: 0,
    scrollbarWidth: "none",
    msOverflowStyle: "none",
    "::webkit-scrollbar": { display: "none" },
    ":global(*::-webkit-scrollbar)": { display: "none" },
  },

  header: {
    flex: "0 0 auto",
    display: "flex",
    flexDirection: "column",
    ...shorthands.gap("8px"),
    marginBottom: "24px",
  },
  headerTitle: {
    fontSize: "24px",
    lineHeight: "32px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  headerSubtitle: {
    fontSize: "14px",
    lineHeight: "20px",
    color: tokens.colorNeutralForeground2,
  },
  statsContainer: {
    display: "flex",
    alignItems: "center",
    ...shorthands.gap("10px"),
    width: "100%",
    marginBottom: "24px",
  },
  statsCard: {
    backgroundColor: tokens.colorNeutralBackground1,
    ...shorthands.padding("12px"),
    flex: 1,
    boxShadow: tokens.shadow4,
  },
  statsContent: {
    display: "flex",
    alignItems: "center",
    ...shorthands.gap("12px"),
  },
  statsText: {
    display: "flex",
    flexDirection: "column",
    ...shorthands.gap("4px"),
  },

  addButtonContainer: {
    display: "flex",
    justifyContent: "flex-end",
    marginBottom: tokens.spacingVerticalM,
  },
  searchBar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    ...shorthands.gap("10px"),
    width: "100%",
    paddingBottom: "16px",
  },
  searchInput: {
    flexGrow: 1,
  },
  filterSection: {
    display: "flex",
    alignItems: "center",
    ...shorthands.gap("12px"),
  },
  filterLabel: {
    color: tokens.colorNeutralForeground1,
  },
  row: {
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.04)",
    },
  },

  avatar: {
    width: "24px",
    height: "24px",
    backgroundColor: tokens.colorNeutralBackground3,
    ...shorthands.borderRadius("50%"),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "12px",
    color: tokens.colorNeutralForeground1,
  },
  teamLeaderCell: {
    display: "flex",
    // alignItems: "center",
    ...shorthands.gap("8px"),
  },
  actionButtons: {
    display: "flex",
    ...shorthands.gap("4px"),
  },
  // pagination: {
  //   position: "fixed",
  //   bottom: 0,
  //   left: 0,

  //   width: "100%",
  //   padding: "1rem",
  //   display: "flex",
  //   alignItems: "center",
  //   justifyContent: "center",
  //   marginTop: "auto",
  //   boxShadow: "0 -2px 8px rgba(0, 0, 0, 0.05)",

  //   ...shorthands.gap("8px"),
  // }
  pagination: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "auto",
    padding: "1rem",
    boxShadow: "0 -2px 8px rgba(0, 0, 0, 0.05)",
    ...shorthands.gap("8px"),
  },

  paginationButton: {
    minWidth: "32px",
    height: "32px",
    ...shorthands.padding("4px"),
    ...shorthands.border("1px", "solid", tokens.colorNeutralStroke1),
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    "&:hover": {
      backgroundColor: tokens.colorNeutralBackground1Hover,
    },
  },
  paginationButtonActive: {
    backgroundColor: tokens.colorNeutralBackground1Selected,

    fontWeight: tokens.fontWeightSemibold,
  },
  highlightedRow: {
    backgroundColor: tokens.colorBrandBackground,
  },
  expandButton: {
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  statusBadge: {
    backgroundColor: tokens.colorNeutralForeground3,
    color: tokens.colorNeutralBackground1,
    padding: "0.25rem 0.75rem",
    borderRadius: "0.25rem",
    fontSize: tokens.fontSizeBase100,
  },
  membersContainer: {
    backgroundColor: tokens.colorNeutralBackground2,
    padding: "16px",
    borderTop: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  membersList: {
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
  },
  sectionTitle: {
    fontWeight: "600",
    fontSize: tokens.fontSizeBase300,
    marginBottom: "0.75rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  addButton: {
    backgroundColor: tokens.colorNeutralBackground1,
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    width: "1.5rem",
    height: "1.5rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "0.25rem",
    cursor: "pointer",
  },
  // menuItem: {
  //   display: "flex",
  //   alignItems: "center",
  //   gap: "0.5rem",
  // },
  // menuHeader: {
  //   padding: "0.5rem 1rem",
  //   color: tokens.colorNeutralForeground3,
  //   fontSize: "0.875rem",
  // },
  menuList: {
    display: "inline-flex",
    flexDirection: "column",
    alignItems: "flex-start",
    padding: "4px 0",
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: tokens.borderRadiusMedium,
  },
  menuItem: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem", // ← Increased from 0.5rem to 0.75rem
    width: "100%",
    padding: "8px 12px",
    fontSize: tokens.fontSizeBase200,
  },
  menuHeader: {
    padding: "8px 12px",
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground3,
  },

  title: {
    fontSize: tokens.fontSizeBase600,
    fontWeight: tokens.fontWeightSemibold,
    marginBottom: tokens.spacingVerticalXS,
  },
  subtitle: {
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground2,
  },
});

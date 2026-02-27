import {
  JOB_LEVEL,
  JOB_TYPE,
  MIN_EDUCATION,
  SALARY_CURRENCY,
  SALARY_PERIOD,
  WORK_TYPE,
} from "@/config/constant";
import { relations } from "drizzle-orm";
import {
  int,
  mysqlTable,
  varchar,
  text,
  timestamp,
  mysqlEnum,
  year,
  date,
  boolean,
} from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: int().autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  userName: varchar("username", { length: 255 }).unique().notNull(),
  password: text("password").notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  role: mysqlEnum("role", ["admin", "applicant", "employer"]).default(
    "applicant",
  ),
  phoneNumber: varchar("phone_number", { length: 255 }),
  avatarUrl: text("avatar_url"),
  deletedAt: timestamp("deleted_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});

export const sessions = mysqlTable("sessions", {
  id: varchar("id", { length: 255 }).primaryKey(),
  userId: int("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  userAgent: text("user_agent").notNull(),
  ip: varchar("ip", { length: 255 }).notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});

export const employers = mysqlTable("employers", {
  id: int("id")
    .primaryKey()
    .references(() => users.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 255 }),
  description: text("description"),
  // avatarUrl: text("avatar_url"),
  bannerImageUrl: text("banner_image_url"),
  organizationType: varchar("organization_type", { length: 100 }),
  teamSize: varchar("team_size", { length: 50 }),
  yearOfEstablishment: year("year_of_establishment"), // MySQL YEAR type
  websiteUrl: varchar("website_url", { length: 255 }),
  location: varchar("location", { length: 255 }),
  deletedAt: timestamp("deleted_at", { mode: "string" }),
  createdAt: timestamp("created_at", { mode: "string" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "string" }).defaultNow().notNull(),
});

export const applicants = mysqlTable("applicants", {
  id: int("id")
    .primaryKey()
    .references(() => users.id, { onDelete: "cascade" }),
  biography: text("biography"),
  dateOfBirth: date("date_of_birth"),
  nationality: varchar("nationality", { length: 100 }),
  maritalStatus: mysqlEnum("marital_status", ["single", "married", "divorced"]),
  gender: mysqlEnum("gender", ["male", "female", "other"]),
  education: mysqlEnum("education", [
    "none",
    "high school",
    "undergraduate",
    "masters",
    "phd",
  ]),
  experience: text("experience"),
  websiteUrl: varchar("website_url", { length: 255 }),
  location: varchar("location", { length: 255 }),
  deletedAt: timestamp("deleted_at", { mode: "string" }),
  createdAt: timestamp("created_at", { mode: "string" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "string" }).defaultNow().notNull(),
});

export const jobs = mysqlTable("jobs", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  employerId: int("employer_id")
    .notNull()
    .references(() => employers.id, { onDelete: "cascade" }),
  description: text("description").notNull(),
  tags: text("tags"),
  minSalary: int("min_salary"),
  maxSalary: int("max_salary"),
  salaryCurrency: mysqlEnum("salary_currency", SALARY_CURRENCY),
  salaryPeriod: mysqlEnum("salary_period", SALARY_PERIOD),
  location: varchar("location", { length: 255 }),
  jobType: mysqlEnum("job_type", JOB_TYPE),
  workType: mysqlEnum("work_type", WORK_TYPE),
  jobLevel: mysqlEnum("job_level", JOB_LEVEL),
  experience: text("experience"),
  minEducation: mysqlEnum("min_education", MIN_EDUCATION),
  isFeatured: boolean("is_featured").default(false).notNull(),
  expiresAt: date("expires_at"),
  deletedAt: timestamp("deleted_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});

export const resumes = mysqlTable("resumes", {
  id: int("id").autoincrement().primaryKey(),
  applicantId: int("applicant_id")
    .notNull()
    .references(() => applicants.id, { onDelete: "cascade" }),

  fileUrl: text("file_url").notNull(), // The UploadThing URL
  fileName: varchar("file_name", { length: 255 }).notNull(),

  fileSize: int("file_size"),
  isPrimary: boolean("is_primary").default(false),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});

//! resume realtion
export const resumesRelations = relations(resumes, ({ one }) => ({
  applicant: one(applicants, {
    fields: [resumes.applicantId],
    references: [applicants.id],
  }),
}));

//! applicant realtion
export const applicantsRelations = relations(applicants, ({ many }) => ({
  resumes: many(resumes),
}));

//!relation define of job and emplpyer
export const jobsRelations = relations(jobs, ({ one }) => ({
  // each job belongs to one employee
  employer: one(employers, {
    fields: [jobs.employerId],
    references: [employers.id],
  }),
}));

//!relation define
export const usersRealtion = relations(users, ({ one, many }) => ({
  // one users can have one employer profile (if role is employer)
  employer: one(employers, {
    fields: [users.id],
    references: [employers.id],
  }),

  // one users can have one applicant profile (if role is applicant)
  applicant: one(applicants, {
    fields: [users.id],
    references: [applicants.id],
  }),

  // one users can have many sessions
  session: many(sessions),
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
  // Each sessions belong to one users
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}));

export const applications = mysqlTable("applications", {
  id: int("id").autoincrement().primaryKey(),

  applicantId: int("applicant_id")
    .notNull()
    .references(() => applicants.id, { onDelete: "cascade" }),

  jobId: int("job_id")
    .notNull()
    .references(() => jobs.id, { onDelete: "cascade" }),

  status: mysqlEnum("status", [
    "pending",
    "reviewed",
    "shortlisted",
    "rejected",
  ]).default("pending"),

  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const savedJobs = mysqlTable("saved_jobs", {
  id: int("id").autoincrement().primaryKey(),

  applicantId: int("applicant_id")
    .notNull()
    .references(() => applicants.id, { onDelete: "cascade" }),

  jobId: int("job_id")
    .notNull()
    .references(() => jobs.id, { onDelete: "cascade" }),

  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const jobAlerts = mysqlTable("job_alerts", {
  id: int("id").autoincrement().primaryKey(),

  userId: int("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),

  keyword: varchar("keyword", { length: 255 }),
  location: varchar("location", { length: 255 }),

  createdAt: timestamp("created_at").defaultNow().notNull(),
});

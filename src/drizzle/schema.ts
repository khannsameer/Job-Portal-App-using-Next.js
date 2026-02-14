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
  serial,
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
  avatarUrl: text("avatar_url"),
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

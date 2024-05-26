import { pgTable, pgEnum, serial, text, varchar, jsonb, boolean } from "drizzle-orm/pg-core"
  import { sql } from "drizzle-orm"

export const aal_level = pgEnum("aal_level", ['aal1', 'aal2', 'aal3'])
export const code_challenge_method = pgEnum("code_challenge_method", ['s256', 'plain'])
export const factor_status = pgEnum("factor_status", ['unverified', 'verified'])
export const factor_type = pgEnum("factor_type", ['totp', 'webauthn'])
export const one_time_token_type = pgEnum("one_time_token_type", ['confirmation_token', 'reauthentication_token', 'recovery_token', 'email_change_token_new', 'email_change_token_current', 'phone_change_token'])
export const key_status = pgEnum("key_status", ['default', 'valid', 'invalid', 'expired'])
export const key_type = pgEnum("key_type", ['aead-ietf', 'aead-det', 'hmacsha512', 'hmacsha256', 'auth', 'shorthash', 'generichash', 'kdf', 'secretbox', 'secretstream', 'stream_xchacha20'])
export const role = pgEnum("role", ['system', 'user', 'assistant', 'function', 'data', 'tool'])
export const action = pgEnum("action", ['INSERT', 'UPDATE', 'DELETE', 'TRUNCATE', 'ERROR'])
export const equality_op = pgEnum("equality_op", ['eq', 'neq', 'lt', 'lte', 'gt', 'gte', 'in'])


export const palettes = pgTable("palettes", {
	id: serial("id").primaryKey().notNull(),
	userId: text("userId").notNull(),
	name: varchar("name", { length: 255 }),
	prompt: text("prompt"),
	colors: jsonb("colors"),
	sentiment: varchar("sentiment", { length: 50 }),
	public: boolean("public").default(false).notNull(),
	createdAt: text("createdAt").notNull(),
	updatedAt: text("updatedAt"),
});
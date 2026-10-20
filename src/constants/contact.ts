export const contactSubjects = {
  project: "Tenho um projeto",
  recruiter: "Sou recrutador(a)",
  chat: "Só quero conversar",
} as const;

export type ContactSubjectId = keyof typeof contactSubjects;

export const contactSubjectIds = Object.keys(contactSubjects) as ContactSubjectId[];

export const CONTACT_ADDON_MAX = 500;
export const CONTACT_COMPANY_MAX = 100;

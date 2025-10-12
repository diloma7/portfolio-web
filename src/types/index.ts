// export type Project = {
//   id: string;
//   title: string;
//   description: string;
//   tags: string[];
//   href?: string;
//   imageAlt: string;
//   imageSrc?: string; // optional: could be a placeholder or remote image
// };
export type Project = {
  title: string;
  description: string;
  tech: string[];
  gradient: string; // tailwind gradient tokens, e.g. "from-cyan-500 to-blue-500"
};

export type ContactFormData = {
  name: string;
  email: string;
  message: string;
};

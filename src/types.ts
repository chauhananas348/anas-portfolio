export interface Project {
  id: string;
  title: string;
  category: string; // e.g. "Web Application", "Software System", "Music Production"
  description: string;
  technologies: string[];
  liveDemoUrl?: string;
  githubUrl?: string;
  listenUrl?: string;
  imageUrl?: string;
  isMusic?: boolean;
}

export interface Skill {
  name: string;
  category: string;
  description: string;
}

export interface MusicTrack {
  id: string;
  title: string;
  artist: string;
  releaseYear: string;
  description: string;
  genre: string;
  duration: string;
  bpm: number;
  key: string;
  spotifyUrl: string;
  soundcloudUrl: string;
  imageUrl: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

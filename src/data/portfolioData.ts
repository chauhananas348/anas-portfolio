import { Project, Skill, MusicTrack } from '../types';

export const PERSONAL_INFO = {
  name: 'Anas Chauhan',
  moniker: 'ANTSHAIL',
  headline: 'Crafting Code by Day, Creating Sounds by Night.',
  heroBio: 'Anas Chauhan — IT Engineering Student & Developer based in Mira Road, architecting robust digital solutions and weaving auditory emotion.',
  shortBio: 'Anas Chauhan — IT Engineering Student, Developer & Music Producer.',
  college: 'VCET (Vidyavardhini\'s College of Engineering and Technology)',
  location: 'Mira Road, Mumbai',
  email: 'chauhananas348@gmail.com',
  avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBCFersDs5cnsHZeqZJUTen-T-YQU7UjKe-u2RR68-F5TBn_svJIOowiDgTxEoTEP80tD2eDCIaK7fOkqL90LJj83hTVAz4canqBLb1_J406uU6PLUBb-HT_dgCuaCJEdkHpFn0brIm7Xrd02fTbX1XDHlg0oPvQXsRIhKmX72LU_lqif997rCbWt6bCCvQIpeYbZmSg3n4FWwyZLmbXhJUlndQWvTsazcTrGOKc4ZBz2M50_ohIHsoiXqIIHcROJDabkk',
  socialLinks: {
    linkedIn: 'https://www.linkedin.com/in/anas-chauhan-6a1091330/',
    github: 'https://github.com/chauhananas348',
    spotify: 'https://open.spotify.com/artist/0khBCCBWyzJISDMZYzB4Mq',
    instagram: 'https://www.instagram.com/antshailmusic/',
  }
};

// Technical Arsenal: Python, HTML, CSS, JavaScript, SQL, Git, GitHub, Vercel.
// Strictly NO Dart, Flutter, or Firebase.
export const TECHNICAL_ARSENAL: Skill[] = [
  {
    name: 'Python',
    category: 'Backend & Data',
    description: 'Object-oriented programming, data structures, CRUD operations, and script automation.',
  },
  {
    name: 'HTML',
    category: 'Web Structure',
    description: 'Semantic markup, accessible DOM structures, and web standards.',
  },
  {
    name: 'CSS',
    category: 'Styling & Layouts',
    description: 'Responsive design, Flexbox, CSS Grid, custom themes, and animations.',
  },
  {
    name: 'JavaScript',
    category: 'Web Frontend',
    description: 'ES6+ features, asynchronous programming, DOM manipulation, and dynamic client logic.',
  },
  {
    name: 'SQL',
    category: 'Databases',
    description: 'Relational database query optimization, table schemas, and data management.',
  },
  {
    name: 'Git',
    category: 'Version Control',
    description: 'Source code management, branching workflows, and commit history tracking.',
  },
  {
    name: 'GitHub',
    category: 'Code Hosting',
    description: 'Collaborative development, repository management, and project releases.',
  },
  {
    name: 'Vercel',
    category: 'Deployment',
    description: 'Continuous integration, serverless hosting, and production web deployment.',
  },
];

// Featured Work: AliveHub, Student Management System, QUIET ROOM.
// Strictly NO Turf Booking Platform.
export const FEATURED_PROJECTS: Project[] = [
  {
    id: 'alivehub',
    title: 'AliveHub',
    category: 'WEB APPLICATION',
    description: 'A personal web project built to explore modern web development and create a practical digital experience.',
    technologies: ['HTML', 'CSS', 'JavaScript', 'Vercel'],
    liveDemoUrl: 'https://alivehub.vercel.app',
    githubUrl: 'https://github.com/anaschauhan/alivehub',
  },
  {
    id: 'student-management-system',
    title: 'Student Management System',
    category: 'SOFTWARE SYSTEM',
    description: 'A Python project for managing student records with CRUD operations and JSON-based data storage.',
    technologies: ['Python', 'JSON'],
    githubUrl: 'https://github.com/anaschauhan/student-management-system',
  },
  {
    id: 'quiet-room',
    title: 'QUIET ROOM',
    category: 'MUSIC PRODUCTION',
    description: 'A music project exploring atmosphere, emotion, and sound.',
    technologies: ['Sound Design', 'Electronic Synths', 'Audio Engineering'],
    listenUrl: 'https://youtu.be/9hpgRRIXkGA?si=JmG7Zf5Mq3o6Qzez',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBSeMrC3FLQPr9WsUEsKbVJMTE_AjUPEcLWSkZIOaPiw17qgAOdS46_4rxhUa-A-2QJn0r_ow2Z0QcY2dFkGTntz-nxuxYzhPN2nWosAAUHFT40jHwtBD6gynbqan3wrly3EgvcQL-1Ws23yXtWxoFDo7-ZPK1KGQ6AZmOnjw1wUM-SCBr2cGGPD8d_4Ld5d6qpRkJdcbrcjuXtcz6SF9CziVFgnR5WuvJzh7uv6irp_0Refarch6htciTsusvy2CGzZAk',
    isMusic: true,
  },
];

export const MUSIC_TRACKS: MusicTrack[] = [
  {
    id: 'quiet-room-track',
    title: 'QUIET ROOM',
    artist: 'ANTSHAIL',
    releaseYear: '2024',
    genre: 'Ambient / Experimental Electronic',
    duration: '3:42',
    bpm: 110,
    key: 'A Minor',
    description: 'A deep ambient soundscape featuring warm analog synth pads, tape saturation, and gentle rhythmic pulses designed for focus and nocturnal atmosphere.',
    spotifyUrl: 'https://open.spotify.com',
    soundcloudUrl: 'https://soundcloud.com',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBSeMrC3FLQPr9WsUEsKbVJMTE_AjUPEcLWSkZIOaPiw17qgAOdS46_4rxhUa-A-2QJn0r_ow2Z0QcY2dFkGTntz-nxuxYzhPN2nWosAAUHFT40jHwtBD6gynbqan3wrly3EgvcQL-1Ws23yXtWxoFDo7-ZPK1KGQ6AZmOnjw1wUM-SCBr2cGGPD8d_4Ld5d6qpRkJdcbrcjuXtcz6SF9CziVFgnR5WuvJzh7uv6irp_0Refarch6htciTsusvy2CGzZAk',
  },
  {
    id: 'nocturnal-echoes',
    title: 'Nocturnal Echoes',
    artist: 'ANTSHAIL',
    releaseYear: '2024',
    genre: 'Downtempo / Chill',
    duration: '4:15',
    bpm: 95,
    key: 'E Minor',
    description: 'Textured synth layers blended with vinyl crackle and organic basslines, capturing the stillness of late-night coding sessions.',
    spotifyUrl: 'https://open.spotify.com',
    soundcloudUrl: 'https://soundcloud.com',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBSeMrC3FLQPr9WsUEsKbVJMTE_AjUPEcLWSkZIOaPiw17qgAOdS46_4rxhUa-A-2QJn0r_ow2Z0QcY2dFkGTntz-nxuxYzhPN2nWosAAUHFT40jHwtBD6gynbqan3wrly3EgvcQL-1Ws23yXtWxoFDo7-ZPK1KGQ6AZmOnjw1wUM-SCBr2cGGPD8d_4Ld5d6qpRkJdcbrcjuXtcz6SF9CziVFgnR5WuvJzh7uv6irp_0Refarch6htciTsusvy2CGzZAk',
  },
];

/** Skill icons: Devicon brand SVGs where available, inline SVG fallback otherwise. */
(function (global) {
  var DEVICON = 'https://cdn.jsdelivr.net/gh/devicons/devicon@2.15.1/icons';
  var SIZE = 18;

  /** slug → devicon path (folder/file without .svg) */
  var brandSlugs = {
    react: 'react/react-original',
    nextjs: 'nextjs/nextjs-original',
    typescript: 'typescript/typescript-original',
    tailwind: 'tailwindcss/tailwindcss-plain',
    html: 'html5/html5-original',
    css: 'css3/css3-original',
    bootstrap: 'bootstrap/bootstrap-original',
    'react-native': 'reactnative/react-native-original',
    android: 'android/android-original',
    nodejs: 'nodejs/nodejs-original',
    express: 'express/express-original-wordmark',
    postgresql: 'postgresql/postgresql-original',
    mongodb: 'mongodb/mongodb-original',
    prisma: 'prisma/prisma-original',
    sqlite: 'sqlite/sqlite-original',
    javascript: 'javascript/javascript-original',
    python: 'python/python-original',
    java: 'java/java-original',
    cpp: 'cplusplus/cplusplus-original',
    php: 'php/php-original',
    git: 'git/git-original',
    docker: 'docker/docker-original',
    socketio: 'socketio/socketio-original',
    gemini: 'google/google-original',
  };

  var fallbackSvg = {
    mobile: '<path fill="#5C6BC0" d="M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm5 17a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/>',
    api: '<path fill="#2B5C3F" d="M4 6h16v2H4V6zm0 5h10v2H4v-2zm0 5h16v2H4v-2z"/>',
    testing: '<path fill="#43A047" d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>',
    dsa: '<path fill="#6A1B9A" d="M4 4h4v4H4V4zm6 0h4v4h-4V4zm6 0h4v4h-4V4zM4 10h4v4H4v-4zm6 6h4v4h-4v-4zm6-6h4v4h-4v-4z"/>',
    oop: '<path fill="#1565C0" d="M12 2a5 5 0 0 1 5 5v1h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v1h6V7a3 3 0 0 0-3-3z"/>',
    datascience: '<path fill="#FF6F00" d="M3 18v-2h2v-3H3v-2h2V8H3V6h2V3h3v3h2V3h3v3h2V3h3v3h-2v2h2v2h-2v3h2v2h-2v3H18v3h-3v-3h-2v3H10v-3H8v3H5v-3H3z"/>',
    ai: '<path fill="#7B1FA2" d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h2a4 4 0 0 1 4 4v1h1a2 2 0 1 1 0 4h-1v1a4 4 0 0 1-4 4h-2v1.27c.6.34 1 .99 1 1.73a2 2 0 1 1-4 0c0-.74.4-1.39 1-1.73V17H9a4 4 0 0 1-4-4v-1H4a2 2 0 1 1 0-4h1v-1a4 4 0 0 1 4-4h2V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z"/>',
    iot: '<path fill="#00838F" d="M12 2C6.48 2 2 6.48 2 12h2a8 8 0 1 1 8 8v2c5.52 0 10-4.48 10-10S17.52 2 12 2zm-1 6v6l5.25 3.15.75-1.23-4.5-2.67V8h-1.5z"/>',
    leadership: '<path fill="#2B5C3F" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>',
    communication: '<path fill="#2B5C3F" d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>',
    problem: '<path fill="#2B5C3F" d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7z"/>',
    jwt: '<path fill="#D63AFF" d="M12 2 4 6v12l8 4 8-4V6l-8-4zm0 3 5 2.5v5L12 15l-5-2.5v-5L12 5z"/>',
    router: '<path fill="#CA4245" d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm1 5v6h5v2h-7V7h2z"/>',
    storage: '<path fill="#FFA000" d="M4 4h16v4H4V4zm0 6h16v4H4v-4zm0 6h16v4H4v-4z"/>',
    swagger: '<path fill="#85EA2D" d="M12 2 4 6v12l8 4 8-4V6l-8-4zm0 2.5 5.5 2.75V17L12 19.5 6.5 16.75V7.25L12 4.5z"/>',
    zustand: '<path fill="#443E38" d="M4 4h16v16H4V4zm4 4v8h8V8H8z"/>',
    default: '<path fill="#7A7A74" d="M12 2 4 7v10l8 5 8-5V7l-8-5zm0 3 5 3v6l-5 3-5-3V8l5-3z"/>',
  };

  var skillIconMap = {
    'React.js': 'react',
    'Next.js': 'nextjs',
    'Next.js 15': 'nextjs',
    'TypeScript': 'typescript',
    'Tailwind CSS': 'tailwind',
    'HTML': 'html',
    'CSS': 'css',
    'Bootstrap': 'bootstrap',
    'React Native': 'react-native',
    'Android App Dev': 'android',
    'Mobile UI Design': 'mobile',
    'Node.js': 'nodejs',
    'Express': 'express',
    'PostgreSQL': 'postgresql',
    'MongoDB': 'mongodb',
    'Prisma ORM': 'prisma',
    'Prisma': 'prisma',
    'SQLite': 'sqlite',
    'REST APIs': 'api',
    'REST API': 'api',
    'JavaScript': 'javascript',
    'Python': 'python',
    'Java': 'java',
    'C++': 'cpp',
    'PHP': 'php',
    'Git': 'git',
    'API Testing': 'testing',
    'DSA': 'dsa',
    'OOP': 'oop',
    'Data Science': 'datascience',
    'AI / ML': 'ai',
    'IoT': 'iot',
    'Leadership': 'leadership',
    'Communication': 'communication',
    'Problem-solving': 'problem',
    'JWT': 'jwt',
    'JWT Auth': 'jwt',
    'React Router': 'router',
    'Local Storage': 'storage',
    'Google Gemini': 'gemini',
    'Socket.io': 'socketio',
    'Docker': 'docker',
    'Swagger': 'swagger',
    'Zustand': 'zustand',
    'JWT / RBAC': 'jwt',
  };

  function inlineSvg(px, inner) {
    return (
      '<svg class="icon-svg icon-svg--inline" width="' + px + '" height="' + px +
      '" viewBox="0 0 24 24" aria-hidden="true">' + inner + '</svg>'
    );
  }

  function brandImg(slug, px) {
    return (
      '<img class="skill-brand-icon" src="' + DEVICON + '/' + slug + '.svg" width="' + px +
      '" height="' + px + '" alt="" loading="lazy" decoding="async" />'
    );
  }

  global.SKILL_GROUPS = [
    { title: 'Frontend', skills: ['React.js', 'Next.js', 'TypeScript', 'Tailwind CSS', 'HTML', 'CSS', 'Bootstrap'] },
    { title: 'Mobile', skills: ['React Native', 'Android App Dev', 'Mobile UI Design'] },
    { title: 'Backend & DB', skills: ['Node.js', 'Express', 'PostgreSQL', 'MongoDB', 'Prisma ORM', 'SQLite', 'REST APIs'] },
    { title: 'Languages', skills: ['JavaScript', 'Python', 'Java', 'C++', 'PHP'] },
    { title: 'Tools & Concepts', skills: ['Git', 'API Testing', 'DSA', 'OOP', 'Data Science', 'AI / ML', 'IoT'] },
    { title: 'Soft Skills', skills: ['Leadership', 'Communication', 'Problem-solving'] },
  ];

  global.createSkillIcon = function (label, size) {
    var px = size || SIZE;
    var id = skillIconMap[label] || 'default';
    if (brandSlugs[id]) return brandImg(brandSlugs[id], px);
    var inner = fallbackSvg[id] || fallbackSvg.default;
    return inlineSvg(px, inner);
  };
})(typeof window !== 'undefined' ? window : globalThis);

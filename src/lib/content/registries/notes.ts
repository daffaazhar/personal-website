export const notesRegistry = {
  'killing-process-linux-port': {
    sourcePath: 'src/content/notes/killing-process-linux-port.mdx',
    load: () => import('@/content/notes/killing-process-linux-port.mdx'),
  },
  'fixing-laravel-storage-permissions': {
    sourcePath: 'src/content/notes/fixing-laravel-storage-permissions.mdx',
    load: () => import('@/content/notes/fixing-laravel-storage-permissions.mdx'),
  },
  'restarting-laravel-queues': {
    sourcePath: 'src/content/notes/restarting-laravel-queues.mdx',
    load: () => import('@/content/notes/restarting-laravel-queues.mdx'),
  },
  'supervisor-backoff-troubleshooting': {
    sourcePath: 'src/content/notes/supervisor-backoff-troubleshooting.mdx',
    load: () => import('@/content/notes/supervisor-backoff-troubleshooting.mdx'),
  },
  'nginx-php-fpm-configuration': {
    sourcePath: 'src/content/notes/nginx-php-fpm-configuration.mdx',
    load: () => import('@/content/notes/nginx-php-fpm-configuration.mdx'),
  },
} as const;

export type NoteSlug = keyof typeof notesRegistry;

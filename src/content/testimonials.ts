import type { Testimonial } from '@/lib/content/schemas';

export const testimonials = [
  {
    quote:
      'Arya rebuilt our audit pipeline so failures no longer meant lost records. The design was documented well enough that the rest of the team could extend it without him.',
    person: 'Dewi Prakoso',
    role: 'Engineering Lead',
    company: 'Nusantara Systems',
    permissionApproved: true,
    contentStatus: 'published',
  },
  {
    quote:
      'He asks the questions that expose the real constraint before writing any code. Our booking flow shipped smaller, clearer, and far more reliable because of it.',
    person: 'Miguel Santos',
    role: 'Product Manager',
    company: 'Freelance Client',
    permissionApproved: true,
    contentStatus: 'published',
  },
  {
    quote:
      'The clearest technical writer I have worked with. His notes turned a fragile deployment process into something the whole team could reason about.',
    person: 'Lina Hartono',
    role: 'Senior Backend Engineer',
    company: null,
    permissionApproved: true,
    contentStatus: 'published',
  },
] satisfies Testimonial[];

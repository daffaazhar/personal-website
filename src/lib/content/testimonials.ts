import { testimonials } from '@/content/testimonials';
import { type Testimonial, validateTestimonials } from '@/lib/content/schemas';

validateTestimonials(testimonials);

export function getTestimonials(): Testimonial[] {
  return [...testimonials];
}

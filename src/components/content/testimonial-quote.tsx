import type { Testimonial } from '@/lib/content/schemas';

type TestimonialQuoteProps = {
  testimonial: Testimonial;
};

export function TestimonialQuote({ testimonial }: TestimonialQuoteProps) {
  return (
    <figure className="testimonial-quote">
      <blockquote>{testimonial.quote}</blockquote>
      <figcaption>
        {testimonial.person}
        <span>
          {testimonial.company ? `${testimonial.role}, ${testimonial.company}` : testimonial.role}
        </span>
      </figcaption>
    </figure>
  );
}

import { Badge } from "@/components/ui/badge";
import { TestimonialMarquee } from "@/components/testimonials/testimonial-marquee";

export type Testimonial = {
  name: string;
  date: string;
  title: string;
  content: string;
  avatar?: string;
  rating: number;
};

const testimonials = [
  {
    name: "Eugene, Manifestor",
    date: "Feb 15",
    title: "Great app to better understand yourself",
    content: `"The app seemed very intuitive and clear to understand my human design and allowed me to know more deeply the reasons why I act and react daily"`,
    rating: 5,
  },
  {
    name: "Sarah, Projector",
    date: "Jan 28",
    title: "Life changing experience",
    content: `"Im loving the app, understand my personality through the human design it's life changing and the possibility to use the chat that aligns with my chart it feels really good and make total sense!"`,
    rating: 5,
  },
  {
    name: "Louise, Generator",
    date: "Mar 10",
    title: "Everything you need",
    content: `"This is an excellent app. It has everything you need about human design!!!! Very clear and useful."`,
    rating: 5,
  },
  {
    name: "Faustina, Generator",
    date: "Feb 22",
    title: "Resonated deeply",
    content: `"The Human Design aspect is very interesting and I resonated with what it said about me. And, as hard as it is to admit for me, the chat was very nice as well. It asks you questions more than giving you straight answers and helps you explore your thoughts. I like it!"`,
    rating: 5,
  },
  {
    name: "Samantha, Reflector",
    date: "Mar 5",
    title: "Connect with friends",
    content: `"I love seeing not only my design but also my friends'. It's such a unique way to connect and understand each other better."`,
    rating: 5,
  },
  {
    name: "John, Manifestor",
    date: "Jan 18",
    title: "Daily alignment",
    content: `"Vera helps me slow down and make choices that actually feel aligned. The daily practice is simple but powerful, and the chat makes Human Design feel alive."`,
    rating: 5,
  },
  {
    name: "Brooke, Projector",
    date: "Feb 8",
    title: "Unique connection",
    content: `"I love seeing not only my design but also my friends'. It's such a unique way to connect and understand each other better."`,
    rating: 5,
  },
  {
    name: "Emily, Manifesting Generator",
    date: "Mar 12",
    title: "Useful day to day",
    content: `"Finally an app that makes Human Design useful day to day. Vera's chat gives me clarity in minutes and the practices keep me consistent."`,
    rating: 5,
  },
  {
    name: "Ashley, Manifesting Generator",
    date: "Feb 25",
    title: "Clean and insightful",
    content: `"Clean design, insightful chat, daily prompts that stick, and a fun way to see friends' charts. Highly recommend!"`,
    rating: 5,
  },
] satisfies Testimonial[];

export function Testimonials() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-6 px-6 py-14 md:py-25">
      <Badge variant="secondary" className="mb-2 uppercase">
        Testimonial
      </Badge>
      <h2 className="font-serif text-center text-3xl leading-[1.1] font-bold tracking-tight sm:text-5xl">
        Hear it from<div className="text-muted-foreground">our Community</div>
      </h2>
      <p className="mb-3 max-w-lg text-center leading-6 tracking-tight sm:text-xl lg:mb-8">
      See how Vera is helping people make decisions and live more authentically.
      </p>
      <div className="relative w-[calc(100%+3rem)] overflow-x-hidden py-4 lg:w-full">
        <TestimonialMarquee testimonials={testimonials} className="mb-4" />
        <TestimonialMarquee testimonials={testimonials} reverse />
      </div>
    </div>
  );
}

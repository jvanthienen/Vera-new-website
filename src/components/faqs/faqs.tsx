import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import Link from "next/link";

function AccordionItemFAQs(props: React.ComponentProps<typeof AccordionItem>) {
  return (
    <AccordionItem
      {...props}
      className={cn(
        "bg-secondary/30 data-[state=open]:bg-card data-[state=open]:border-border rounded-lg border border-transparent px-4 py-1 transition-colors data-[state=open]:shadow-sm lg:px-5",
        props.className,
      )}
    />
  );
}

function AccordionTriggerFAQs(props: React.ComponentProps<typeof AccordionTrigger>) {
  return (
    <AccordionTrigger
      {...props}
      className={cn("[&[data-state=open]>svg]:text-foreground text-sm lg:text-base", props.className)}
    />
  );
}

function AccordionContentFAQs(props: React.ComponentProps<typeof AccordionContent>) {
  return <AccordionContent {...props} className={cn("text-muted-foreground lg:text-base", props.className)} />;
}

export function FAQs() {
  return (
    <div className="mx-auto grid max-w-6xl gap-6 px-6 py-14 md:grid-cols-2 md:gap-14 md:px-10 md:py-25">
      <div className="flex w-full flex-col gap-6">
        <Badge variant="secondary" className="mb-2 uppercase">
          FAQ
        </Badge>
        <h2 className="font-serif text-3xl leading-[1.1] font-bold tracking-tight sm:text-5xl">
          Frequently
          <br />
          Asked <span className="text-muted-foreground">Questions</span>
        </h2>
        <p className="max-w-lg text-xs leading-6 tracking-tight sm:text-base">
          We know Human Design can sometimes feel overwhelming. Vera is here to make it simple and practical, so you can actually use your design every day. Here are the questions people ask us most often:
        </p>
        <Button className="w-fit" size="lg" asChild>
          <Link href="https://apps.apple.com/us/app/vera-your-human-design-guide/id6748094016" target="_blank" rel="noopener noreferrer">Download the app</Link>
        </Button>
      </div>
      <Accordion type="single" collapsible defaultValue="what-is-hd" className="grid w-full gap-2">
        <AccordionItemFAQs value="what-is-hd">
          <AccordionTriggerFAQs>What is Human Design?</AccordionTriggerFAQs>
          <AccordionContentFAQs>
            <p>
              Human Design is a system that combines ancient wisdom (Astrology, I&apos;Ching, Kabbalah, Chakras) with modern science to give you a personalized map of how you&apos;re built to make decisions, use your energy, and live in alignment with who you are. It&apos;s like a blueprint for your authentic self.
            </p>
            <p className="mt-2">
              If you want to know more, <Link href="/blog" className="text-foreground underline">explore our blog</Link>.
            </p>
          </AccordionContentFAQs>
        </AccordionItemFAQs>
        <AccordionItemFAQs value="what-to-expect">
          <AccordionTriggerFAQs>What can I expect from the Vera App?</AccordionTriggerFAQs>
          <AccordionContentFAQs>
            <p>
              Vera gives you a full Human Design chart including your Energy Type, Authority, Strategy, and Energy Centers.
            </p>
            <p className="mt-2">
              With Vera Pro, you also unlock:
            </p>
            <ul className="mt-2 ml-4 list-disc space-y-1">
              <li>Exclusive challenges that help you practice and embody your chart</li>
              <li>Unlimited chat with an AI trained only on Human Design (accurate, no hallucinations)</li>
              <li>A personalized journal to track your progress</li>
              <li>The ability to add people in your life and read their charts</li>
              <li>Daily mantras tailored to your unique design</li>
            </ul>
          </AccordionContentFAQs>
        </AccordionItemFAQs>
        <AccordionItemFAQs value="unique-charts">
          <AccordionTriggerFAQs>Is each Vera chart unique?</AccordionTriggerFAQs>
          <AccordionContentFAQs>
            <p>
              Yes. Every chart is based on your exact birth data (date, time, and place), so no two are the same.
            </p>
          </AccordionContentFAQs>
        </AccordionItemFAQs>
        <AccordionItemFAQs value="beginners">
          <AccordionTriggerFAQs>Is the app accessible for beginners?</AccordionTriggerFAQs>
          <AccordionContentFAQs>
            <p>
              Absolutely. Vera is designed to translate the often complex language of Human Design into a practical, empowering, and easy-to-understand format. Even if you&apos;re new to Human Design, you&apos;ll be able to understand and apply what you learn right away.
            </p>
          </AccordionContentFAQs>
        </AccordionItemFAQs>
        <AccordionItemFAQs value="experienced-users">
          <AccordionTriggerFAQs>Is Vera useful if I&apos;ve already been studying my chart?</AccordionTriggerFAQs>
          <AccordionContentFAQs>
            <p>
              Yes! Many experienced Human Design readers use Vera—both for themselves and their clients. They love having the essential elements of their design all in one place, with guidance they can return to again and again to stay aligned.
            </p>
          </AccordionContentFAQs>
        </AccordionItemFAQs>
        <AccordionItemFAQs value="birth-time">
          <AccordionTriggerFAQs>Do I need to know my exact birth time?</AccordionTriggerFAQs>
          <AccordionContentFAQs>
            <p>
              Yes, to generate the most accurate chart you&apos;ll need your birth date, place, and exact time. If you&apos;re unsure, you can often find it on your birth certificate or request it from the hospital where you were born.
            </p>
          </AccordionContentFAQs>
        </AccordionItemFAQs>
        <AccordionItemFAQs value="other-people">
          <AccordionTriggerFAQs>Can I use Vera to learn about other people?</AccordionTriggerFAQs>
          <AccordionContentFAQs>
            <p>
              Yes. Vera Pro lets you add the charts of family, friends, or partners. Understanding how their energy works alongside yours can deepen your relationships and help you navigate them with more ease.
            </p>
          </AccordionContentFAQs>
        </AccordionItemFAQs>
        <AccordionItemFAQs value="what-makes-different">
          <AccordionTriggerFAQs>What makes Vera different from other Human Design apps?</AccordionTriggerFAQs>
          <AccordionContentFAQs>
            <p>
              Vera is designed to be practical and grounded. It&apos;s not about overwhelming you with information—it&apos;s about helping you embody your design. With challenges, journaling, mantras, and AI chat, Vera supports you in actually practicing your chart instead of just reading about it.
            </p>
          </AccordionContentFAQs>
        </AccordionItemFAQs>
        <AccordionItemFAQs value="offline">
          <AccordionTriggerFAQs>Can I access Vera offline?</AccordionTriggerFAQs>
          <AccordionContentFAQs>
            <p>
              You&apos;ll need an internet connection to generate your chart and use the AI chat. But once your chart is created, you can return to it anytime.
            </p>
          </AccordionContentFAQs>
        </AccordionItemFAQs>
        <AccordionItemFAQs value="platforms">
          <AccordionTriggerFAQs>Is Vera available on iOS and Android?</AccordionTriggerFAQs>
          <AccordionContentFAQs>
            <p>
              Currently Vera is available on iOS (App Store). We&apos;re working on expanding to other platforms.
            </p>
          </AccordionContentFAQs>
        </AccordionItemFAQs>
      </Accordion>
    </div>
  );
}

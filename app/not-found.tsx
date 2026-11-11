import { Button } from "@/components/ui/Button";
import { BotanicalDivider } from "@/components/ui/BotanicalDivider";

export default function NotFound() {
  return (
    <section className="flex flex-1 flex-col items-center justify-center px-5 py-24 text-center">
      <p className="text-xs uppercase tracking-[0.18em] text-olive">404</p>
      <h1 className="mt-3 font-serif text-4xl text-olive-deep md:text-5xl">
        Page not found
      </h1>
      <BotanicalDivider className="my-8" />
      <p className="max-w-md text-ink-soft">
        The page you are looking for may have moved. Return home or book an appointment with our
        team.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button href="/">Go home</Button>
        <Button href="/contact-us" variant="outline">
          Contact us
        </Button>
      </div>
    </section>
  );
}

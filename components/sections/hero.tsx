type HeroProps = {
  brideName: string;
  groomName: string;
  weddingDate: string;
};

export function Hero({ brideName, groomName, weddingDate }: HeroProps) {
  const formattedDate = new Date(weddingDate).toLocaleDateString("en-MY", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <section className="flex flex-col items-center justify-center gap-4 px-6 py-24 text-center">
      <p className="font-serif text-sm uppercase tracking-[0.3em] text-muted-foreground">
        The Wedding Of
      </p>
      <h1 className="font-script text-5xl text-primary sm:text-6xl">
        {brideName} &amp; {groomName}
      </h1>
      <p className="font-serif text-lg text-foreground">{formattedDate}</p>
    </section>
  );
}
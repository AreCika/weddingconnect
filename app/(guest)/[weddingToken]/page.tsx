import type { Metadata } from "next";
import { getWeddingPageData, getWishes } from "@/lib/weddings";
import { GuestExperience } from "@/components/guest/guest-experience";

type PageProps = {
  params: Promise<{ weddingToken: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { weddingToken } = await params;
  const wedding = await getWeddingPageData(weddingToken);

  const title = `${wedding.bride_name} & ${wedding.groom_name}`;
  const description =
    "You're invited to celebrate our wedding — tap to view details and RSVP.";

  return {
    title,
    description,
    openGraph: { title, description },
  };
}

export default async function GuestWeddingPage({ params }: PageProps) {
  const { weddingToken } = await params;
  const wedding = await getWeddingPageData(weddingToken);
  const wishes = await getWishes(wedding.id);

  return <GuestExperience wedding={wedding} wishes={wishes} weddingToken={weddingToken} />;
}
import { ScrollableGuestbook } from "@/components/scrollable-guestbook";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <ScrollableGuestbook />
    </main>
  );
}

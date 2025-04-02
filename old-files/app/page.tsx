import type { Metadata } from "next";
import GuestbookContainer from "@/components/guestbook-container";
import DownArrow from "@/components/down-arrow";

export const metadata: Metadata = {
  title: "Virtual Experiment",
  description: "A virtual guestbook for the park bench",
};

export default function Home() {
  return (
    <main className="bg-[#f5f5dc]">
      {/* Intro Section */}
      <section
        id="intro"
        className="min-h-screen flex flex-col items-center justify-center p-4"
      >
        <div className="text-center max-w-md w-full border border-black rounded-xl p-8 bg-white">
          <h1 className="text-4xl font-normal mb-6 text-black">
            Virtual Experiment
          </h1>
          <p className="mb-12 text-black">
            An internet art project designed and assembled in Ithaca, NY, and
            Toronto, ON.
          </p>
          <DownArrow targetId="explanation" />
        </div>
      </section>

      {/* Explanation Section */}
      <section
        id="explanation"
        className="min-h-screen flex flex-col items-center justify-center p-4"
      >
        <div className="text-center max-w-md w-full border border-black rounded-xl p-8 bg-white">
          <p className="mb-12 text-black leading-relaxed">
            we think the internet is too big/vast, too fast, othering, alien. we
            built this guestbook, anchored to your bench, to reimagine a sweet,
            slow web and microcommunity. welcome: read memories, leave a memory.
          </p>
          <DownArrow targetId="guestbook" />
        </div>
      </section>

      {/* Guestbook Section */}
      <section id="guestbook" className="min-h-screen p-8 md:p-16">
        <div className="max-w-2xl mx-auto">
          <GuestbookContainer />
        </div>
      </section>
    </main>
  );
}

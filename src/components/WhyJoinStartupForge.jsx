import { Rocket, Persons, Handshake, Star, Suitcase } from "@gravity-ui/icons";

const features = [
  {
    icon: Rocket,
    title: "Built for momentum",
    description:
      "Publish your idea and start collecting real interest within hours, not weeks. No cold outreach, no waiting on a network you don't have.",
    span: true,
  },
  {
    icon: Persons,
    title: "Assemble your crew",
    description:
      "Recruit developers, designers, and marketers who actually want to build, filtered by skill and commitment level.",
  },
  {
    icon: Suitcase,
    title: "Real roles, real opportunities",
    description:
      "Every posting is tied to an actual startup and a defined role — no vague 'exposure' offers.",
  },
  {
    icon: Star,
    title: "Get noticed for your work",
    description:
      "Founder and collaborator profiles are built to showcase what you've shipped, not just what you say you can do.",
  },
];

export default function WhyJoinStartupForge() {
  return (
    <section className="bg-[#FAFAFA] py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* header */}
        <div className="max-w-xl mb-14">
          <span className="font-inter text-xs font-semibold tracking-[0.15em] text-[#FF6B35] uppercase">
            Why StartupForge
          </span>
          <h2 className="mt-3 font-space-grotesk font-bold text-3xl sm:text-4xl text-[#131B3A]">
            Everything you need to go from idea to team
          </h2>
          <p className="mt-4 font-inter text-base text-slate-500">
            StartupForge strips out the friction between having an idea and
            having the people to build it.
          </p>
        </div>

        {/* bento grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className={`group relative rounded-2xl bg-white border border-[#131B3A]/8 p-8 overflow-hidden transition-all hover:border-[#FF6B35]/30 hover:shadow-[0_8px_30px_rgba(19,27,58,0.06)] ${
                  feature.span ? "sm:col-span-2" : ""
                }`}
              >
                {/* decorative corner accent */}
                <div
                  className="pointer-events-none absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-0 group-hover:opacity-[0.06] transition-opacity"
                  style={{ background: "#FF6B35" }}
                  aria-hidden="true"
                />

                <div className="relative flex items-start gap-5">
                  <div className="shrink-0 w-12 h-12 rounded-xl bg-[#131B3A] flex items-center justify-center group-hover:bg-[#FF6B35] transition-colors">
                    <Icon width={22} height={22} className="text-[#FAFAFA]" />
                  </div>

                  <div>
                    <h3 className="font-space-grotesk font-semibold text-lg text-[#131B3A]">
                      {feature.title}
                    </h3>
                    <p className="mt-2 font-inter text-sm text-slate-500 leading-relaxed max-w-md">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
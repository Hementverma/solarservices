import Icon from '@/components/Icon'
import Reveal from '@/components/Reveal'
import SectionHeading from '@/components/SectionHeading'
import { whyChooseUs } from '@/data/site'

export default function WhyChooseUs() {
  return (
    <section className="section bg-white">
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <SectionHeading
                eyebrow="Why Ramesh Solar"
                title="Solar done properly,"
                accent="from day one."
                description="A solar system is a long-term investment. We focus on the details that matter after the installation team has left — performance, safety, clarity and support."
              />
              <div className="relative mt-8 overflow-hidden rounded-5xl">
                <img
                  src="/images/installers.jpg"
                  alt="Solar installation professionals at work"
                  className="aspect-[4/3] w-full object-cover"
                  loading="lazy"
                  width="900"
                  height="675"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-950/65 via-transparent to-transparent" />
                <div className="absolute inset-x-5 bottom-5 flex items-center gap-3 rounded-2xl border border-white/15 bg-forest-950/55 px-4 py-3 text-white backdrop-blur-md">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-solar-400 text-forest-950">
                    <Icon name="HardHat" size={20} />
                  </span>
                  <div>
                    <p className="text-sm font-extrabold">Site-first planning</p>
                    <p className="text-[0.68rem] text-white/55">
                      Roof, shading and electrical check before every quote
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          <div className="grid gap-3 sm:grid-cols-2">
            {whyChooseUs.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.05}>
                <div className="group h-full rounded-3xl border border-forest-900/10 bg-mist/60 p-6 transition hover:border-forest-900/20 hover:bg-white hover:shadow-soft">
                  <div className="flex items-center justify-between">
                    <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white text-forest-700 shadow-sm transition group-hover:bg-forest-900 group-hover:text-solar-400">
                      <Icon name={item.icon} size={20} />
                    </span>
                    <span className="font-display text-3xl text-forest-900/10">
                      0{index + 1}
                    </span>
                  </div>
                  <h3 className="mt-5 text-base font-extrabold text-forest-900">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-ink/55">{item.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

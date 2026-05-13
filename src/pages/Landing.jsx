import { Link } from 'react-router-dom';
import { ArrowRight, Brain, Calendar, CheckCircle, MessageCircle, Mic, Search, Sparkles } from 'lucide-react';
import PublicTopbar from '../layouts/PublicTopbar';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';

const FEATURES = [
  {
    icon: Mic,
    title: 'Voice capture',
    description: 'Record lectures and ideas in one tap. Clear audio in, structured notes out.',
  },
  {
    icon: Brain,
    title: 'AI structuring',
    description: 'Automatic transcription, summary, and key points — organized like a study guide.',
  },
  {
    icon: Sparkles,
    title: 'Smart highlights',
    description: 'Mark “important” while recording to create crisp, reviewable highlights.',
  },
  {
    icon: Calendar,
    title: 'Deadlines',
    description: 'Extract due dates into tasks so you never lose track of what’s next.',
  },
  {
    icon: MessageCircle,
    title: 'Chat with notes',
    description: 'Ask questions across your transcripts and summaries in one conversation.',
  },
  {
    icon: Search,
    title: 'Search',
    description: 'Find phrases and concepts across all notes — fast, reliable recall.',
  },
];

const BENEFITS = [
  'Readable summaries that feel editorial',
  'Less clutter, more structure',
  'Designed for text-heavy study',
  'A calm interface you can trust',
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-paper">
      <PublicTopbar />

      {/* Hero */}
      <section className="pt-14">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <Badge tone="brand" className="mb-6">
                <Sparkles size={14} />
                Powered by Google Gemini
              </Badge>

              <h1 className="text-5xl md:text-6xl font-serif text-ink leading-[1.02]">
                A scholarly sanctuary for your <span className="text-brand-600">voice notes</span>.
              </h1>
              <p className="mt-5 text-lg text-ink-muted leading-relaxed max-w-xl">
                Record once. RecollectAI transforms your audio into transcript, summary, key points, and tasks — presented
                like a polished digital journal.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link to="/register">
                  <Button className="w-full sm:w-auto">
                    Start free <ArrowRight size={18} />
                  </Button>
                </Link>
                <Link to="/login" className="w-full sm:w-auto">
                  <Button variant="secondary" className="w-full sm:w-auto">
                    Sign in
                  </Button>
                </Link>
              </div>

              <div className="mt-8 grid gap-2 text-sm text-ink-muted">
                {BENEFITS.map((b) => (
                  <div key={b} className="flex items-start gap-2">
                    <CheckCircle size={16} className="mt-0.5 text-accent-sage" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Preview */}
            <div className="relative">
              <div className="absolute -inset-6 rounded-[20px] bg-[radial-gradient(circle_at_30%_20%,rgba(82,75,130,0.18),transparent_55%),radial-gradient(circle_at_80%_70%,rgba(176,141,87,0.14),transparent_55%)]" />
              <Card className="relative p-7 md:p-8">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="text-sm font-semibold text-ink-muted">Note</div>
                    <div className="text-xl font-serif text-ink">Cognitive Science — Attention</div>
                  </div>
                  <Badge tone="gold">Lecture Notes</Badge>
                </div>

                <div className="mt-6 grid gap-4">
                  <div className="rounded-lg border border-line bg-paper-50 p-4">
                    <div className="text-xs font-semibold text-ink-muted mb-2">Summary</div>
                    <p className="text-sm text-ink leading-relaxed">
                      Attention is limited and selective. Competing stimuli are filtered based on salience and goals,
                      producing a tradeoff between breadth and depth of processing.
                    </p>
                  </div>

                  <div className="rounded-lg border border-line bg-white p-4">
                    <div className="text-xs font-semibold text-ink-muted mb-2">Key points</div>
                    <ul className="space-y-2 text-sm text-ink-muted">
                      <li className="flex items-start gap-2">
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-brand-600" />
                        <span>Selective attention improves performance but risks missing changes.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-brand-600" />
                        <span>Working memory constraints shape what we encode and recall.</span>
                      </li>
                    </ul>
                  </div>

                  <div className="rounded-lg border border-line bg-paper-50 p-4">
                    <div className="text-xs font-semibold text-ink-muted mb-2">Transcript</div>
                    <p className="text-sm text-ink-muted leading-relaxed line-clamp-3">
                      “…we can think of attention as a gate. It’s not only about what comes in, but what stays long
                      enough to become usable…”
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-line bg-paper-50">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="max-w-2xl">
            <h2 className="text-4xl font-serif text-ink leading-tight">Built for studying — not just storage.</h2>
            <p className="mt-4 text-ink-muted leading-relaxed">
              The interface is intentionally editorial: generous spacing, crisp hierarchy, and calm surfaces that make
              long-form reading feel effortless.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f) => {
              const Icon = f.icon;
              return (
                <Card key={f.title} className="p-7">
                  <div className="mb-4 grid h-11 w-11 place-items-center rounded-lg border border-line bg-paper-50 text-brand-700">
                    <Icon size={20} />
                  </div>
                  <h3 className="text-xl font-serif text-ink">{f.title}</h3>
                  <p className="mt-2 text-ink-muted leading-relaxed">{f.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-t border-line">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="grid gap-10 lg:grid-cols-3">
            <div>
              <h2 className="text-4xl font-serif text-ink leading-tight">Three steps.</h2>
              <p className="mt-4 text-ink-muted leading-relaxed">
                Designed to feel like a premium journal: capture, refine, and recall.
              </p>
            </div>
            <div className="lg:col-span-2 grid gap-6 md:grid-cols-3">
              {[
                { n: '01', title: 'Record', text: 'Speak naturally — lectures, reminders, ideas.' },
                { n: '02', title: 'Process', text: 'AI organizes transcript, summary, and key points.' },
                { n: '03', title: 'Recall', text: 'Search and chat across your library.' },
              ].map((s) => (
                <Card key={s.n} className="p-7">
                  <div className="text-xs font-semibold text-ink-muted">{s.n}</div>
                  <div className="mt-3 text-xl font-serif text-ink">{s.title}</div>
                  <p className="mt-2 text-ink-muted leading-relaxed">{s.text}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-line">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <Card className="p-10 md:p-12">
            <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
              <div>
                <h2 className="text-4xl font-serif text-ink leading-tight">Make your notes feel publishable.</h2>
                <p className="mt-4 text-ink-muted leading-relaxed">
                  Turn audio into a library of clean, readable study material — with structured tasks you can actually
                  follow.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 lg:justify-end">
                <Link to="/register">
                  <Button className="w-full sm:w-auto">
                    Create account <ArrowRight size={18} />
                  </Button>
                </Link>
                <Link to="/login" className="w-full sm:w-auto">
                  <Button variant="secondary" className="w-full sm:w-auto">
                    Sign in
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
          <div className="mt-6 text-xs text-ink-muted">
            RecollectAI is built for clarity: subtle motion, structured layouts, and reading-first typography.
          </div>
        </div>
      </section>
    </div>
  );
}


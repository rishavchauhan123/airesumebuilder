import { Link } from "react-router-dom";
import { ArrowRight, FileText, Zap, Sparkles, Download, Lock } from "lucide-react";

export default function Index() {
  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "AI-Powered Content",
      description:
        "Get intelligent suggestions for your resume with Google Gemini integration",
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Professional Templates",
      description:
        "Choose from multiple modern, ATS-friendly resume templates",
    },
    {
      icon: <Download className="w-8 h-8" />,
      title: "Easy Export",
      description:
        "Download your resume as PDF with perfect formatting every time",
    },
    {
      icon: <Lock className="w-8 h-8" />,
      title: "Secure & Private",
      description: "Your resume data is encrypted and never shared with third parties",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-xl text-foreground">ResumeAI</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link
              to="/builder"
              className="px-6 py-2 rounded-lg font-medium text-white bg-primary hover:opacity-90 transition-all flex items-center gap-2"
            >
              Start Building
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl font-bold text-foreground leading-tight mb-6">
              Create Your Professional Resume in Minutes
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Build an ATS-friendly resume with AI-powered suggestions. Our
              step-by-step wizard guides you through creating a compelling
              resume that gets noticed by recruiters.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/builder"
                className="px-8 py-4 rounded-lg font-semibold text-white bg-gradient-to-r from-primary to-secondary hover:shadow-lg transition-all flex items-center justify-center gap-2 text-center"
              >
                <Sparkles className="w-5 h-5" />
                Build Your Resume
              </Link>
            </div>

            <p className="text-sm text-muted-foreground mt-6">
              ✓ No sign-up required • ✓ Completely free • ✓ Download as PDF
            </p>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl"></div>
            <div className="relative bg-white border border-border rounded-2xl p-8 shadow-xl">
              <div className="space-y-4">
                <div className="h-4 bg-gradient-to-r from-primary to-secondary rounded w-1/2"></div>
                <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3"></div>

                <div className="pt-6 border-t border-border">
                  <div className="h-3 bg-gray-200 rounded w-1/3 mb-3"></div>
                  <div className="h-2 bg-gray-100 rounded w-full mb-2"></div>
                  <div className="h-2 bg-gray-100 rounded w-5/6"></div>
                </div>

                <div className="pt-6 border-t border-border">
                  <div className="grid grid-cols-3 gap-3">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <div
                        key={i}
                        className="h-8 bg-primary/10 rounded text-xs text-primary font-medium flex items-center justify-center"
                      >
                        Skill
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Powerful Features for Your Resume
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to create a professional resume that impresses
              recruiters
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl border border-border hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-[104px]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 gap-18 items-start">
            {/* Left Column */}
            <div className="sticky top-[100px]">
              <div className="relative mb-8">
                <div className="relative inline-flex items-center text-[11.5px] font-semibold tracking-[2.5px] uppercase text-[#9d91fb]">
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-[1px] bg-[#9d91fb]" />
                  <span className="px-3">How It Works</span>
                  <span className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-[1px] bg-[#9d91fb]" />
                </div>
              </div>
              <h2 className="text-4xl font-bold text-foreground leading-tight mb-6">
                Seven steps to a<br />
                <span className="bg-gradient-to-r from-[#9d91fb] to-[#6c63ff] bg-clip-text text-transparent">
                  perfect resume.
                </span>
              </h2>
              <p className="text-base text-muted-foreground leading-relaxed mb-12">
                Our guided form walks you through every section. AI fills the gaps so you never face a blank page.
              </p>

              {/* Live Preview Card */}
              <div className="bg-[#0f0f1a] border border-[rgba(255,255,255,0.07)] rounded-[24px] shadow-[0_32px_64px_rgba(0,0,0,0.5)] overflow-hidden">
                <div className="bg-[#13131f] border-b border-[rgba(255,255,255,0.1)] px-6 py-3 flex items-center gap-2">
                  <div className="flex gap-1">
                    <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                    <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                    <span className="w-3 h-3 rounded-full bg-[#28ca41]" />
                  </div>
                  <div className="flex-1 text-center">
                    <span className="text-xs text-muted-foreground">resume-preview.pdf</span>
                  </div>
                </div>

                <div className="px-8 py-7">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-bold text-white">Jordan Singh</h3>
                      <p className="text-[10px] uppercase text-muted-foreground tracking-wide mt-1">
                        SENIOR SOFTWARE ENGINEER · REMOTE
                      </p>
                    </div>

                    <div className="border-t border-[rgba(255,255,255,0.07)]" />

                    <div>
                      <h4 className="text-[9px] uppercase tracking-wide text-muted-foreground mb-3">
                        Experience
                      </h4>
                      <div className="space-y-2">
                        <p className="text-sm text-white">Lead Engineer — Stripe</p>
                        <p className="text-sm text-white">Frontend Developer — Vercel</p>
                      </div>
                    </div>

                    <div className="border-t border-[rgba(255,255,255,0.07)]" />

                    <div>
                      <h4 className="text-[9px] uppercase tracking-wide text-muted-foreground mb-3">
                        Skills
                      </h4>
                      <div className="space-y-2">
                        {[
                          { name: "React", pct: "80%" },
                          { name: "TypeScript", pct: "75%" },
                          { name: "Node.js", pct: "85%" },
                        ].map((skill) => (
                          <div key={skill.name} className="flex items-center gap-3">
                            <span className="text-xs text-muted-foreground w-[86px]">
                              {skill.name}
                            </span>
                            <div className="flex-1 h-1.5 bg-[rgba(255,255,255,0.08)] rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-[#9d91fb] to-[#6c63ff] rounded-full"
                                style={{ width: skill.pct }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-[rgba(124,109,250,0.08)] border-t border-[rgba(124,109,250,0.15)] px-6 py-4 flex items-center gap-3">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 rounded-full bg-[#9d91fb] animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 rounded-full bg-[#9d91fb] animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 rounded-full bg-[#9d91fb] animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                  <span className="text-sm text-[#9d91fb] font-medium">
                    Gemini is writing your summary…
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-0">
              {[
                {
                  number: "01",
                  icon: "👤",
                  title: "Personal Information",
                  description: "Add your name, contact details, LinkedIn and location.",
                },
                {
                  number: "02",
                  icon: "💼",
                  title: "Work Experience",
                  description:
                    "AI rewrites your bullet points to be specific, impactful, and ATS-ready.",
                  badge: "AI-Enhanced",
                },
                {
                  number: "03",
                  icon: "🎓",
                  title: "Education",
                  description:
                    "Degrees, certifications, and courses — cleanly formatted.",
                },
                {
                  number: "04",
                  icon: "⚡",
                  title: "Skills",
                  description:
                    "Gemini AI suggests the most relevant skills for your role automatically.",
                  badge: "Gemini AI",
                },
                {
                  number: "05",
                  icon: "✍️",
                  title: "Professional Summary",
                  description:
                    "One click. Gemini writes a compelling tailored profile summary.",
                  badge: "One-click Generate",
                },
                {
                  number: "06",
                  icon: "🎨",
                  title: "Choose Your Template",
                  description:
                    "Pick from Modern, Classic, or Minimal. Live preview updates instantly.",
                },
                {
                  number: "07",
                  icon: "📄",
                  title: "Download Your PDF",
                  description: "One-click export. No account, no watermark, no fee.",
                },
              ].map((step) => (
                <div
                  key={step.number}
                  className="group grid grid-cols-[28px_40px_1fr] gap-4 items-start py-[26px] border-b border-[rgba(255,255,255,0.07)] hover:border-b-[rgba(124,109,250,0.4)] transition-colors"
                >
                  <span className="text-[11px] font-semibold text-text-3 pt-[11px]">
                    {step.number}
                  </span>
                  <div className="w-10 h-10 rounded-lg bg-[#13131f] border border-[rgba(255,255,255,0.07)] flex items-center justify-center group-hover:border-[rgba(124,109,250,0.4)] group-hover:shadow-[0_0_16px_rgba(124,109,250,0.18)] transition-all">
                    <span className="text-lg">{step.icon}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{step.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {step.description}
                    </p>
                    {step.badge ? (
                      <span className="inline-block text-[10px] font-semibold text-[#22d87a] bg-[rgba(34,216,122,0.1)] border border-[rgba(34,216,122,0.2)] px-2.5 py-0.5 rounded">
                        {step.badge}
                      </span>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary to-secondary py-16">
        <div className="max-w-4xl mx-auto px-6 text-center text-white">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Build Your Resume?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Create a professional resume in minutes with our AI-powered builder
          </p>
          <Link
            to="/builder"
            className="inline-block px-10 py-4 rounded-lg font-semibold bg-white text-primary hover:shadow-xl transition-all flex items-center justify-center gap-2"
          >
            <Sparkles className="w-5 h-5" />
            Start Building Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-white/80 py-12 border-t border-border">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                  <FileText className="w-5 h-5" />
                </div>
                <span className="font-bold">ResumeAI</span>
              </div>
              <p className="text-sm">
                Create professional resumes with AI assistance
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Templates
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Guides
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Terms
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border pt-8 flex justify-between items-center flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <span className="font-bold text-xl text-foreground">ResumeAI</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2026 ResumeAI. All rights reserved. Powered by <span className="text-accent font-medium">Google Gemini</span>.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

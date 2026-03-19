import { Link } from "react-router-dom";
import { ArrowRight, FileText, Zap, Sparkles, Download, Lock } from "lucide-react";

export default function Index() {
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
      <section id="how-it-works" className="py-32">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 gap-18 items-start">
            {/* Left Column */}
            <div className="sticky top-24">
              <div className="relative mb-8">
                <div className="text-xs font-semibold tracking-widest uppercase text-muted-foreground relative">
                  <span className="relative z-10">HOW IT WORKS</span>
                  <div className="absolute inset-0 flex items-center">
                    <div className="h-px bg-accent flex-1"></div>
                    <div className="w-8"></div>
                    <div className="h-px bg-accent flex-1"></div>
                  </div>
                </div>
              </div>
              <h2 className="text-4xl font-bold text-foreground leading-tight mb-6">
                Seven steps to a<br />
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">perfect resume.</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-12">
                Our guided form walks you through every section. AI fills the gaps so you never face a blank page.
              </p>

              {/* Live Preview Card */}
              <div className="bg-card border border-border rounded-3xl shadow-lg overflow-hidden">
                {/* Top Toolbar */}
                <div className="bg-muted/50 border-b border-border px-6 py-3 flex items-center gap-2">
                  <div className="flex gap-1">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="flex-1 text-center">
                    <span className="text-xs text-muted-foreground">resume-preview.pdf</span>
                  </div>
                </div>

                {/* Body */}
                <div className="p-8">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-bold text-foreground">Jordan Singh</h3>
                      <p className="text-xs uppercase text-muted-foreground tracking-wide">SENIOR SOFTWARE ENGINEER · REMOTE</p>
                    </div>

                    <div className="border-t border-border"></div>

                    <div>
                      <h4 className="text-sm font-semibold text-foreground mb-3">Experience</h4>
                      <div className="space-y-2">
                        <p className="text-sm text-foreground">Lead Engineer — Stripe</p>
                        <p className="text-sm text-foreground">Frontend Developer — Vercel</p>
                      </div>
                    </div>

                    <div className="border-t border-border"></div>

                    <div>
                      <h4 className="text-sm font-semibold text-foreground mb-3">Skills</h4>
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <span className="text-xs text-muted-foreground w-20">React</span>
                          <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-primary to-secondary rounded-full w-4/5"></div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-xs text-muted-foreground w-20">TypeScript</span>
                          <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-primary to-secondary rounded-full w-3/4"></div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-xs text-muted-foreground w-20">Node.js</span>
                          <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-primary to-secondary rounded-full w-5/6"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Strip */}
                <div className="bg-accent/5 border-t border-border px-6 py-4 flex items-center gap-3">
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                  <span className="text-sm text-accent font-medium">Gemini is writing your summary…</span>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-0">
              {/* Step 1 */}
              <div className="grid grid-cols-[28px_40px_1fr] gap-4 items-start py-6.5 border-b border-border/50">
                <span className="text-xs font-semibold text-muted-foreground pt-3">01</span>
                <div className="w-10 h-10 rounded-lg bg-muted border border-border flex items-center justify-center hover:border-accent hover:shadow-sm transition-all cursor-pointer">
                  <span className="text-lg">👤</span>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Personal Information</h3>
                  <p className="text-sm text-muted-foreground">Add your name, contact details, LinkedIn and location.</p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="grid grid-cols-[28px_40px_1fr] gap-4 items-start py-6.5 border-b border-border/50">
                <span className="text-xs font-semibold text-muted-foreground pt-3">02</span>
                <div className="w-10 h-10 rounded-lg bg-muted border border-border flex items-center justify-center hover:border-accent hover:shadow-sm transition-all cursor-pointer">
                  <span className="text-lg">💼</span>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Work Experience</h3>
                  <p className="text-sm text-muted-foreground mb-2">AI rewrites your bullet points to be specific, impactful, and ATS-ready.</p>
                  <span className="inline-block text-[10px] font-semibold bg-accent/10 text-accent border border-accent/20 px-2.5 py-0.5 rounded">AI-Enhanced</span>
                </div>
              </div>

              {/* Step 3 */}
              <div className="grid grid-cols-[28px_40px_1fr] gap-4 items-start py-6.5 border-b border-border/50">
                <span className="text-xs font-semibold text-muted-foreground pt-3">03</span>
                <div className="w-10 h-10 rounded-lg bg-muted border border-border flex items-center justify-center hover:border-accent hover:shadow-sm transition-all cursor-pointer">
                  <span className="text-lg">🎓</span>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Education</h3>
                  <p className="text-sm text-muted-foreground">Degrees, certifications, and courses — cleanly formatted.</p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="grid grid-cols-[28px_40px_1fr] gap-4 items-start py-6.5 border-b border-border/50">
                <span className="text-xs font-semibold text-muted-foreground pt-3">04</span>
                <div className="w-10 h-10 rounded-lg bg-muted border border-border flex items-center justify-center hover:border-accent hover:shadow-sm transition-all cursor-pointer">
                  <span className="text-lg">⚡</span>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Skills</h3>
                  <p className="text-sm text-muted-foreground mb-2">Gemini AI suggests the most relevant skills for your role automatically.</p>
                  <span className="inline-block text-[10px] font-semibold bg-accent/10 text-accent border border-accent/20 px-2.5 py-0.5 rounded">Gemini AI</span>
                </div>
              </div>

              {/* Step 5 */}
              <div className="grid grid-cols-[28px_40px_1fr] gap-4 items-start py-6.5 border-b border-border/50">
                <span className="text-xs font-semibold text-muted-foreground pt-3">05</span>
                <div className="w-10 h-10 rounded-lg bg-muted border border-border flex items-center justify-center hover:border-accent hover:shadow-sm transition-all cursor-pointer">
                  <span className="text-lg">✍️</span>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Professional Summary</h3>
                  <p className="text-sm text-muted-foreground mb-2">One click. Gemini writes a compelling tailored profile summary.</p>
                  <span className="inline-block text-[10px] font-semibold bg-accent/10 text-accent border border-accent/20 px-2.5 py-0.5 rounded">One-click Generate</span>
                </div>
              </div>

              {/* Step 6 */}
              <div className="grid grid-cols-[28px_40px_1fr] gap-4 items-start py-6.5 border-b border-border/50">
                <span className="text-xs font-semibold text-muted-foreground pt-3">06</span>
                <div className="w-10 h-10 rounded-lg bg-muted border border-border flex items-center justify-center hover:border-accent hover:shadow-sm transition-all cursor-pointer">
                  <span className="text-lg">🎨</span>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Choose Your Template</h3>
                  <p className="text-sm text-muted-foreground">Pick from Modern, Classic, or Minimal. Live preview updates instantly.</p>
                </div>
              </div>

              {/* Step 7 */}
              <div className="grid grid-cols-[28px_40px_1fr] gap-4 items-start py-6.5">
                <span className="text-xs font-semibold text-muted-foreground pt-3">07</span>
                <div className="w-10 h-10 rounded-lg bg-muted border border-border flex items-center justify-center hover:border-accent hover:shadow-sm transition-all cursor-pointer">
                  <span className="text-lg">📄</span>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Download Your PDF</h3>
                  <p className="text-sm text-muted-foreground">One-click export. No account, no watermark, no fee.</p>
                </div>
              </div>
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

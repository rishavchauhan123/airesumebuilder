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

  const steps = [
    {
      number: "1",
      title: "Fill Your Information",
      description:
        "Start with your personal details, contact info, and profile photo",
    },
    {
      number: "2",
      title: "Add Your Experience",
      description:
        "Showcase your professional background with multiple positions",
    },
    {
      number: "3",
      title: "Highlight Your Skills",
      description:
        "Add skills manually or choose from AI-suggested recommendations",
    },
    {
      number: "4",
      title: "Choose & Download",
      description:
        "Select a template and download your polished resume as PDF",
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
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Simple step-by-step process to build your professional resume
          </p>
        </div>

        <div className="grid grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden sm:block absolute top-12 left-1/2 w-[calc(100%+24px)] h-1 bg-gradient-to-r from-primary to-transparent -translate-x-1/2 -translate-y-1/2"></div>
              )}

              <div className="relative bg-white border-2 border-primary rounded-xl p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-primary text-white font-bold flex items-center justify-center mx-auto mb-4 text-lg">
                  {step.number}
                </div>
                <h3 className="font-bold text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
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

          <div className="border-t border-white/10 pt-8 flex justify-between items-center">
            <p className="text-sm">
              © 2024 ResumeAI. All rights reserved.
            </p>
            <p className="text-sm">Made with ❤️</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

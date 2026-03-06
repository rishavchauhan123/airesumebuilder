import { useState } from "react";
import { ChevronRight, ChevronLeft, Download, Sparkles, Loader } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { generateResumePDF } from "@/lib/pdf-export";
import {
  generateProfessionalSummary,
  generateSkillSuggestions,
} from "@/lib/gemini-api";
import ResumePreview from "@/components/ResumePreview";

interface FormData {
  // Header
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  linkedIn: string;
  portfolio: string;
  profilePhoto: string | null;

  // Work Experience
  experiences: Array<{
    id: string;
    jobTitle: string;
    company: string;
    startDate: string;
    endDate: string;
    currentlyWorking: boolean;
    responsibilities: string;
  }>;

  // Education
  education: Array<{
    id: string;
    degree: string;
    institution: string;
    year: string;
    fieldOfStudy: string;
  }>;

  // Skills
  skills: string[];
  suggestedSkills: string[];

  // Professional Summary
  professionalSummary: string;

  // Additional Details
  certifications: string;
  languages: string;
  projects: string;

  // Template
  selectedTemplate: "modern" | "classic" | "minimal";
}

type StepType =
  | "header"
  | "experience"
  | "education"
  | "skills"
  | "summary"
  | "details"
  | "finalize";

const STEPS: { id: StepType; label: string; shortLabel: string }[] = [
  { id: "header", label: "Header", shortLabel: "1" },
  { id: "experience", label: "Experience", shortLabel: "2" },
  { id: "education", label: "Education", shortLabel: "3" },
  { id: "skills", label: "Skills", shortLabel: "4" },
  { id: "summary", label: "Summary", shortLabel: "5" },
  { id: "details", label: "Details", shortLabel: "6" },
  { id: "finalize", label: "Finalize", shortLabel: "7" },
];

const SUGGESTED_SKILLS = [
  "JavaScript",
  "React",
  "TypeScript",
  "Python",
  "Project Management",
  "Leadership",
  "Communication",
  "Problem Solving",
  "Team Collaboration",
  "Data Analysis",
];

export default function ResumeBuild() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [isExportingPDF, setIsExportingPDF] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "",
    linkedIn: "",
    portfolio: "",
    profilePhoto: null,
    experiences: [],
    education: [],
    skills: [],
    suggestedSkills: SUGGESTED_SKILLS,
    professionalSummary: "",
    certifications: "",
    languages: "",
    projects: "",
    selectedTemplate: "modern",
  });

  const currentStep = STEPS[currentStepIndex];
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === STEPS.length - 1;

  const handleNext = () => {
    if (!isLastStep) setCurrentStepIndex(currentStepIndex + 1);
  };

  const handlePrev = () => {
    if (!isFirstStep) setCurrentStepIndex(currentStepIndex - 1);
  };

  const handleInputChange = (field: keyof FormData, value: unknown) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const addExperience = () => {
    const newId = Date.now().toString();
    setFormData((prev) => ({
      ...prev,
      experiences: [
        ...prev.experiences,
        {
          id: newId,
          jobTitle: "",
          company: "",
          startDate: "",
          endDate: "",
          currentlyWorking: false,
          responsibilities: "",
        },
      ],
    }));
  };

  const updateExperience = (id: string, field: string, value: unknown) => {
    setFormData((prev) => ({
      ...prev,
      experiences: prev.experiences.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      ),
    }));
  };

  const removeExperience = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      experiences: prev.experiences.filter((exp) => exp.id !== id),
    }));
  };

  const addEducation = () => {
    const newId = Date.now().toString();
    setFormData((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        {
          id: newId,
          degree: "",
          institution: "",
          year: "",
          fieldOfStudy: "",
        },
      ],
    }));
  };

  const updateEducation = (id: string, field: string, value: unknown) => {
    setFormData((prev) => ({
      ...prev,
      education: prev.education.map((edu) =>
        edu.id === id ? { ...edu, [field]: value } : edu
      ),
    }));
  };

  const removeEducation = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      education: prev.education.filter((edu) => edu.id !== id),
    }));
  };

  const toggleSkill = (skill: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter((s) => s !== skill)
        : [...prev.skills, skill],
    }));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        handleInputChange("profilePhoto", event.target?.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const exportPDF = async () => {
    try {
      // Validate minimum required fields
      if (!formData.firstName && !formData.lastName) {
        toast.error("Please enter your name before downloading");
        return;
      }

      setIsExportingPDF(true);
      toast.loading("Generating your resume PDF...");

      // Execute html2pdf on the live preview component 
      const element = document.getElementById("resume-live-preview");
      if (!element) {
        throw new Error("Could not find resume preview element");
      }

      // Clone the element so we can remove strict scroll container constraints for the PDF
      const clone = element.cloneNode(true) as HTMLElement;
      clone.style.height = "auto";
      clone.style.overflow = "visible";
      clone.style.position = "absolute";
      clone.style.top = "-9999px";
      clone.style.left = "-9999px";
      clone.style.width = "8.5in"; // Standard desktop preview width for US letter
      clone.style.padding = "20px";
      document.body.appendChild(clone);

      const fileName = `${formData.firstName || "My"}_${formData.lastName || "Resume"}.pdf`.replace(/\s+/g, '_');
      
      const opt = {
        margin:       0,
        filename:     fileName,
        image:        { type: 'jpeg' as const, quality: 0.98 },
        html2canvas:  { scale: 2, useCORS: true },
        jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' as const }
      };

      // Ensure html2pdf is dynamically imported for client-side rendering
      const html2pdf = (await import("html2pdf.js")).default;
      
      await html2pdf().from(clone).set(opt).save();

      // Clean up UI clone
      if (document.body.contains(clone)) {
        document.body.removeChild(clone);
      }

      toast.success("Resume PDF downloaded successfully!");
    } catch (error) {
      console.error("PDF export error:", error);
      toast.error("Failed to generate PDF. Please make sure pop-ups are enabled");
    } finally {
      setIsExportingPDF(false);
    }
  };

  const handleGenerateProfessionalSummary = async () => {
    setIsGeneratingAI(true);
    try {
      const mostRecentExp =
        formData.experiences.length > 0 ? formData.experiences[0] : null;
      const jobTitle = mostRecentExp?.jobTitle || "Professional";
      const company = mostRecentExp?.company || "Company";
      const experience =
        mostRecentExp?.responsibilities || "various roles";

      const summary = await generateProfessionalSummary(
        jobTitle,
        company,
        experience,
        formData.skills
      );

      handleInputChange("professionalSummary", summary);
    } catch (error) {
      console.error("Error generating professional summary:", error);
    } finally {
      setIsGeneratingAI(false);
    }
  };

  const handleGenerateSkillSuggestions = async () => {
    setIsGeneratingAI(true);
    try {
      const mostRecentExp =
        formData.experiences.length > 0 ? formData.experiences[0] : null;
      const jobTitle = mostRecentExp?.jobTitle || "Professional";
      const experience =
        mostRecentExp?.responsibilities || "various roles";

      const suggestions = await generateSkillSuggestions(jobTitle, experience);

      // Update suggested skills
      const uniqueSuggestions = suggestions.filter(
        (s) => !formData.skills.includes(s)
      );
      handleInputChange("suggestedSkills", uniqueSuggestions);
    } catch (error) {
      console.error("Error generating skill suggestions:", error);
    } finally {
      setIsGeneratingAI(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep.id) {
      case "header":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">
                Your Information
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={(e) =>
                    handleInputChange("firstName", e.target.value)
                  }
                  className="w-full px-4 py-3 bg-white border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={(e) =>
                    handleInputChange("lastName", e.target.value)
                  }
                  className="w-full px-4 py-3 bg-white border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="mt-4 grid grid-cols-2 gap-4">
                <input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <input
                  type="tel"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="mt-4 grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Location"
                  value={formData.location}
                  onChange={(e) =>
                    handleInputChange("location", e.target.value)
                  }
                  className="w-full px-4 py-3 bg-white border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <input
                  type="url"
                  placeholder="LinkedIn URL"
                  value={formData.linkedIn}
                  onChange={(e) =>
                    handleInputChange("linkedIn", e.target.value)
                  }
                  className="w-full px-4 py-3 bg-white border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="mt-4">
                <input
                  type="url"
                  placeholder="Portfolio URL"
                  value={formData.portfolio}
                  onChange={(e) =>
                    handleInputChange("portfolio", e.target.value)
                  }
                  className="w-full px-4 py-3 bg-white border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-foreground mb-3">
                  Profile Photo
                </label>
                <div className="flex items-center gap-4">
                  {formData.profilePhoto && (
                    <img
                      src={formData.profilePhoto}
                      alt="Profile"
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="px-4 py-2 text-sm border border-border rounded-lg cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case "experience":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Work Experience
              </h2>
              <p className="text-muted-foreground mb-6">
                Add your professional experience
              </p>
            </div>

            {formData.experiences.map((exp, index) => (
              <div key={exp.id} className="p-4 bg-muted rounded-lg space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold">Experience {index + 1}</h3>
                  <button
                    onClick={() => removeExperience(exp.id)}
                    className="text-destructive hover:bg-red-50 px-3 py-1 rounded text-sm"
                  >
                    Remove
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Job Title"
                    value={exp.jobTitle}
                    onChange={(e) =>
                      updateExperience(exp.id, "jobTitle", e.target.value)
                    }
                    className="w-full px-4 py-3 bg-white border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <input
                    type="text"
                    placeholder="Company Name"
                    value={exp.company}
                    onChange={(e) =>
                      updateExperience(exp.id, "company", e.target.value)
                    }
                    className="w-full px-4 py-3 bg-white border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="date"
                    placeholder="Start Date"
                    value={exp.startDate}
                    onChange={(e) =>
                      updateExperience(exp.id, "startDate", e.target.value)
                    }
                    className="w-full px-4 py-3 bg-white border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <input
                    type="date"
                    placeholder="End Date"
                    disabled={exp.currentlyWorking}
                    value={exp.endDate}
                    onChange={(e) =>
                      updateExperience(exp.id, "endDate", e.target.value)
                    }
                    className="w-full px-4 py-3 bg-white border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-muted"
                  />
                </div>

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={exp.currentlyWorking}
                    onChange={(e) =>
                      updateExperience(
                        exp.id,
                        "currentlyWorking",
                        e.target.checked
                      )
                    }
                    className="w-4 h-4"
                  />
                  <span className="text-sm text-foreground">
                    I currently work here
                  </span>
                </label>

                <textarea
                  placeholder="Job Responsibilities"
                  value={exp.responsibilities}
                  onChange={(e) =>
                    updateExperience(
                      exp.id,
                      "responsibilities",
                      e.target.value
                    )
                  }
                  className="w-full px-4 py-3 bg-white border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary min-h-24"
                />
              </div>
            ))}

            <button
              onClick={addExperience}
              className="w-full px-4 py-3 border-2 border-dashed border-primary text-primary rounded-lg hover:bg-primary hover:text-white font-medium transition-colors"
            >
              + Add Experience
            </button>
          </div>
        );

      case "education":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Education
              </h2>
              <p className="text-muted-foreground mb-6">
                Add your educational background
              </p>
            </div>

            {formData.education.map((edu, index) => (
              <div key={edu.id} className="p-4 bg-muted rounded-lg space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold">Education {index + 1}</h3>
                  <button
                    onClick={() => removeEducation(edu.id)}
                    className="text-destructive hover:bg-red-50 px-3 py-1 rounded text-sm"
                  >
                    Remove
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Degree"
                    value={edu.degree}
                    onChange={(e) =>
                      updateEducation(edu.id, "degree", e.target.value)
                    }
                    className="w-full px-4 py-3 bg-white border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <input
                    type="text"
                    placeholder="Institution"
                    value={edu.institution}
                    onChange={(e) =>
                      updateEducation(edu.id, "institution", e.target.value)
                    }
                    className="w-full px-4 py-3 bg-white border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Field of Study"
                    value={edu.fieldOfStudy}
                    onChange={(e) =>
                      updateEducation(edu.id, "fieldOfStudy", e.target.value)
                    }
                    className="w-full px-4 py-3 bg-white border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <input
                    type="text"
                    placeholder="Year (e.g., 2020)"
                    value={edu.year}
                    onChange={(e) =>
                      updateEducation(edu.id, "year", e.target.value)
                    }
                    className="w-full px-4 py-3 bg-white border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
            ))}

            <button
              onClick={addEducation}
              className="w-full px-4 py-3 border-2 border-dashed border-primary text-primary rounded-lg hover:bg-primary hover:text-white font-medium transition-colors"
            >
              + Add Education
            </button>
          </div>
        );

      case "skills":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Skills
              </h2>
              <p className="text-muted-foreground mb-6">
                Add your professional skills
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-3">
                Your Skills
              </label>
              <div className="flex flex-wrap gap-2 mb-4">
                {formData.skills.map((skill) => (
                  <button
                    key={skill}
                    onClick={() => toggleSkill(skill)}
                    className="px-3 py-1 bg-primary text-white rounded-full text-sm font-medium hover:opacity-90"
                  >
                    ✕ {skill}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="block text-sm font-medium text-foreground">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-secondary" />
                    Suggested Skills
                  </div>
                </label>
                <button
                  onClick={handleGenerateSkillSuggestions}
                  disabled={isGeneratingAI || formData.experiences.length === 0}
                  className="text-xs px-3 py-1 rounded bg-secondary/10 text-secondary hover:bg-secondary/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isGeneratingAI ? "Generating..." : "Suggest for me"}
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.suggestedSkills.map((skill) => (
                  <button
                    key={skill}
                    onClick={() => toggleSkill(skill)}
                    className={cn(
                      "px-3 py-1 rounded-full text-sm font-medium transition-colors border",
                      formData.skills.includes(skill)
                        ? "bg-primary text-white border-primary"
                        : "bg-white text-foreground border-border hover:border-primary"
                    )}
                  >
                    + {skill}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-3">
                Add Custom Skill
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Type a skill..."
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      const value = e.currentTarget.value.trim();
                      if (value && !formData.skills.includes(value)) {
                        toggleSkill(value);
                        e.currentTarget.value = "";
                      }
                    }
                  }}
                  className="flex-1 px-4 py-3 bg-white border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
          </div>
        );

      case "summary":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Professional Summary
              </h2>
              <p className="text-muted-foreground mb-6">
                Brief overview of your professional background
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-3">
                Professional Summary
              </label>
              <textarea
                value={formData.professionalSummary}
                onChange={(e) =>
                  handleInputChange("professionalSummary", e.target.value)
                }
                placeholder="Write a compelling professional summary..."
                className="w-full px-4 py-3 bg-white border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary min-h-40"
              />
            </div>

            <button
              onClick={handleGenerateProfessionalSummary}
              disabled={isGeneratingAI}
              className="w-full px-4 py-3 bg-secondary text-white rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed font-medium flex items-center justify-center gap-2"
            >
              {isGeneratingAI ? (
                <>
                  <Loader className="w-4 h-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Generate with AI
                </>
              )}
            </button>
          </div>
        );

      case "details":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Additional Details
              </h2>
              <p className="text-muted-foreground mb-6">
                Add certifications, languages, and projects
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-3">
                Certifications
              </label>
              <textarea
                value={formData.certifications}
                onChange={(e) =>
                  handleInputChange("certifications", e.target.value)
                }
                placeholder="List your certifications (one per line)..."
                className="w-full px-4 py-3 bg-white border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary min-h-24"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-3">
                Languages
              </label>
              <textarea
                value={formData.languages}
                onChange={(e) =>
                  handleInputChange("languages", e.target.value)
                }
                placeholder="List languages you speak..."
                className="w-full px-4 py-3 bg-white border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary min-h-24"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-3">
                Projects
              </label>
              <textarea
                value={formData.projects}
                onChange={(e) => handleInputChange("projects", e.target.value)}
                placeholder="Describe notable projects you've worked on..."
                className="w-full px-4 py-3 bg-white border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary min-h-24"
              />
            </div>
          </div>
        );

      case "finalize":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Finalize Your Resume
              </h2>
              <p className="text-muted-foreground mb-6">
                Choose a template and download your resume
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-4">
                Select Template
              </label>
              <div className="grid grid-cols-3 gap-4">
                {["modern", "classic", "minimal"].map((template) => (
                  <button
                    key={template}
                    onClick={() =>
                      handleInputChange(
                        "selectedTemplate",
                        template as "modern" | "classic" | "minimal"
                      )
                    }
                    className={cn(
                      "p-4 rounded-lg border-2 transition-all text-center capitalize",
                      formData.selectedTemplate === template
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    )}
                  >
                    <div className="font-medium">{template}</div>
                    <div className="text-xs text-muted-foreground mt-2">
                      Professional layout
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={exportPDF}
              disabled={isExportingPDF}
              className="w-full px-6 py-4 bg-primary text-white rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed font-medium flex items-center justify-center gap-2 text-lg transition-all"
            >
              {isExportingPDF ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Download className="w-5 h-5" />
                  Download as PDF
                </>
              )}
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-secondary text-white p-6 rounded-b-2xl shadow-md">
          <h1 className="text-3xl font-bold">Resume Builder</h1>
          <p className="text-white/80 mt-1">
            Create a professional resume with AI assistance
          </p>
        </div>

        <div className="grid grid-cols-4 gap-6 p-6">
          {/* Left Sidebar - Progress Steps */}
          <div className="col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-4 sticky top-6">
              <h3 className="font-bold text-foreground mb-6">Progress</h3>
              <div className="space-y-2">
                {STEPS.map((step, index) => (
                  <button
                    key={step.id}
                    onClick={() => setCurrentStepIndex(index)}
                    className={cn(
                      "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-left",
                      currentStepIndex === index
                        ? "bg-primary text-white font-semibold"
                        : index < currentStepIndex
                          ? "bg-green-100 text-green-900"
                          : "bg-gray-100 text-muted-foreground hover:bg-gray-200"
                    )}
                  >
                    <span className="font-bold text-sm w-6 h-6 flex items-center justify-center rounded-full border-2">
                      {index < currentStepIndex ? "✓" : step.shortLabel}
                    </span>
                    <span className="text-sm">{step.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Center Section - Form */}
          <div className="col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-8">
              {renderStepContent()}

              {/* Navigation Buttons */}
              <div className="flex gap-4 mt-8">
                <button
                  onClick={handlePrev}
                  disabled={isFirstStep}
                  className={cn(
                    "flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all",
                    isFirstStep
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-white border border-border text-foreground hover:bg-gray-50"
                  )}
                >
                  <ChevronLeft className="w-4 h-4" />
                  Back
                </button>

                <button
                  onClick={handleNext}
                  disabled={isLastStep}
                  className={cn(
                    "flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ml-auto",
                    isLastStep
                      ? "bg-green-100 text-green-700"
                      : "bg-primary text-white hover:opacity-90"
                  )}
                >
                  {isLastStep ? "Complete" : "Next"}
                  {!isLastStep && <ChevronRight className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>

          {/* Right Section - Live Resume Preview */}
          <div className="col-span-1">
            <div className="sticky top-6 max-h-[calc(100vh-120px)]">
              <h3 className="font-bold text-foreground mb-4 px-2">Resume Preview</h3>
              <ResumePreview
                firstName={formData.firstName}
                lastName={formData.lastName}
                email={formData.email}
                phone={formData.phone}
                location={formData.location}
                linkedIn={formData.linkedIn}
                portfolio={formData.portfolio}
                profilePhoto={formData.profilePhoto}
                experiences={formData.experiences}
                education={formData.education}
                skills={formData.skills}
                professionalSummary={formData.professionalSummary}
                languages={formData.languages}
                selectedTemplate={formData.selectedTemplate}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

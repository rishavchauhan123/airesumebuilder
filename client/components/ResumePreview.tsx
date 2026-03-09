import { cn } from "@/lib/utils";

interface ResumePreviewProps {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  linkedIn: string;
  portfolio: string;
  profilePhoto: string | null;
  experiences: Array<{
    id: string;
    jobTitle: string;
    company: string;
    startDate: string;
    endDate: string;
    currentlyWorking: boolean;
    responsibilities: string;
  }>;
  education: Array<{
    id: string;
    degree: string;
    institution: string;
    year: string;
    fieldOfStudy: string;
  }>;
  skills: string[];
  professionalSummary: string;
  certifications: string;
  languages: string;
  projects: string;
  selectedTemplate: "modern" | "classic" | "minimal";
}

const getInitials = (firstName: string, lastName: string): string => {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
};

const formatDate = (dateString: string): string => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
};

const getTemplateStyles = (template: "modern" | "classic" | "minimal") => {
  const baseStyles =
    "bg-white text-gray-900 rounded-lg shadow-lg overflow-hidden flex flex-col";

  switch (template) {
    case "modern":
      return `${baseStyles} bg-gradient-to-b from-white to-gray-50`;
    case "classic":
      return baseStyles;
    case "minimal":
      return `${baseStyles} shadow-sm`;
    default:
      return baseStyles;
  }
};

export default function ResumePreview({
  firstName,
  lastName,
  email,
  phone,
  location,
  linkedIn,
  portfolio,
  profilePhoto,
  experiences,
  education,
  skills,
  professionalSummary,
  certifications,
  languages,
  projects,
  selectedTemplate,
}: ResumePreviewProps) {
  const initials = getInitials(firstName, lastName);
  const fullName = `${firstName} ${lastName}`.trim();

  // Parse languages string into array
  const languageList = languages
    .split("\n")
    .filter((l) => l.trim())
    .map((l) => {
      const [lang, proficiency] = l.split("-").map((s) => s.trim());
      return { language: lang, proficiency: proficiency || "Intermediate" };
    });

  return (
    <div 
      id="resume-live-preview" 
      className={cn("h-full overflow-y-auto", getTemplateStyles(selectedTemplate))}
    >
      {/* Header Section */}
      <div className={cn(
        "px-6 pt-8 pb-6 text-center",
        selectedTemplate === "modern"
          ? "bg-gradient-to-r from-primary/10 to-secondary/10"
          : selectedTemplate === "classic"
            ? "bg-white"
            : "bg-white"
      )}>
        {/* Avatar */}
        <div className="flex justify-center mb-4">
          {profilePhoto ? (
            <img
              src={profilePhoto}
              alt={fullName}
              className="w-20 h-20 rounded-full object-cover border-4 border-primary/20 shadow-md"
            />
          ) : fullName.trim() ? (
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-2xl shadow-md border-4 border-white">
              {initials}
            </div>
          ) : (
            <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 shadow-md border-4 border-white">
              <span className="text-xs">Photo</span>
            </div>
          )}
        </div>

        {/* Name */}
        {fullName && (
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{fullName}</h1>
        )}

        {/* Contact Info */}
        {(email || phone || location) && (
          <div className="text-xs text-gray-600 space-y-1">
            <div className="flex flex-wrap justify-center gap-2 text-gray-700 font-medium">
              {email && <span>{email}</span>}
              {email && (phone || location) && (
                <span className="text-gray-400">•</span>
              )}
              {phone && <span>{phone}</span>}
              {phone && location && <span className="text-gray-400">•</span>}
              {location && <span>{location}</span>}
            </div>
            {(linkedIn || portfolio) && (
              <div className="flex flex-wrap justify-center gap-2 text-gray-600 text-xs">
                {linkedIn && (
                  <a
                    href={linkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    LinkedIn
                  </a>
                )}
                {linkedIn && portfolio && (
                  <span className="text-gray-400">•</span>
                )}
                {portfolio && (
                  <a
                    href={portfolio}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    Portfolio
                  </a>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Content Sections */}
      <div className="px-6 py-6 flex-1 space-y-6">
        {/* Professional Summary */}
        {professionalSummary && (
          <section>
            <h2 className={cn(
              "text-xs font-bold uppercase tracking-wide mb-3 pb-2 border-b-2",
              selectedTemplate === "modern"
                ? "text-primary border-primary/30"
                : "text-gray-900 border-gray-300"
            )}>
              Summary
            </h2>
            <p className="text-xs text-gray-700 leading-relaxed">
              {professionalSummary}
            </p>
          </section>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <section>
            <h2 className={cn(
              "text-xs font-bold uppercase tracking-wide mb-3 pb-2 border-b-2",
              selectedTemplate === "modern"
                ? "text-primary border-primary/30"
                : "text-gray-900 border-gray-300"
            )}>
              Skills
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {skills.map((skill) => (
                <div key={skill} className="flex items-start gap-2">
                  <span className={cn(
                    "w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0",
                    selectedTemplate === "modern"
                      ? "bg-primary"
                      : "bg-gray-400"
                  )} />
                  <span className="text-xs text-gray-700 leading-relaxed">
                    {skill}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Experience */}
        {experiences.length > 0 && (
          <section>
            <h2 className={cn(
              "text-xs font-bold uppercase tracking-wide mb-3 pb-2 border-b-2",
              selectedTemplate === "modern"
                ? "text-primary border-primary/30"
                : "text-gray-900 border-gray-300"
            )}>
              Experience
            </h2>
            <div className="space-y-4">
              {experiences.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-start gap-2 mb-1">
                    <h3 className="text-xs font-bold text-gray-900">
                      {exp.jobTitle}
                    </h3>
                    {exp.startDate && (
                      <span className="text-xs text-gray-500 whitespace-nowrap">
                        {formatDate(exp.startDate)} -{" "}
                        {exp.currentlyWorking
                          ? "Present"
                          : exp.endDate
                            ? formatDate(exp.endDate)
                            : ""}
                      </span>
                    )}
                  </div>
                  {exp.company && (
                    <p className="text-xs text-gray-600 mb-1 font-medium">
                      {exp.company}
                    </p>
                  )}
                  {exp.responsibilities && (
                    <ul className="text-xs text-gray-700 space-y-1">
                      {exp.responsibilities
                        .split("\n")
                        .filter((r) => r.trim())
                        .slice(0, 3)
                        .map((resp, idx) => (
                          <li key={idx} className="flex gap-2">
                            <span className="text-gray-400 flex-shrink-0">•</span>
                            <span>{resp.trim()}</span>
                          </li>
                        ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {education.length > 0 && (
          <section>
            <h2 className={cn(
              "text-xs font-bold uppercase tracking-wide mb-3 pb-2 border-b-2",
              selectedTemplate === "modern"
                ? "text-primary border-primary/30"
                : "text-gray-900 border-gray-300"
            )}>
              Education & Training
            </h2>
            <div className="space-y-3">
              {education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-start gap-2 mb-1">
                    <h3 className="text-xs font-bold text-gray-900">
                      {edu.degree}
                      {edu.fieldOfStudy && ` in ${edu.fieldOfStudy}`}
                    </h3>
                    {edu.year && (
                      <span className="text-xs text-gray-500 whitespace-nowrap">
                        {edu.year}
                      </span>
                    )}
                  </div>
                  {edu.institution && (
                    <p className="text-xs text-gray-600 font-medium">
                      {edu.institution}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Languages */}
        {languageList.length > 0 && (
          <section>
            <h2 className={cn(
              "text-xs font-bold uppercase tracking-wide mb-3 pb-2 border-b-2",
              selectedTemplate === "modern"
                ? "text-primary border-primary/30"
                : "text-gray-900 border-gray-300"
            )}>
              Languages
            </h2>
            <div className="space-y-2">
              {languageList.map((lang, idx) => (
                <div key={idx}>
                  <div className="flex justify-between mb-1">
                    <span className="text-xs font-medium text-gray-900">
                      {lang.language}
                    </span>
                    <span className="text-xs text-gray-500">
                      {lang.proficiency}
                    </span>
                  </div>
                  <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={cn(
                        "h-full rounded-full",
                        lang.proficiency === "Native"
                          ? "w-full"
                          : lang.proficiency === "Fluent"
                            ? "w-4/5"
                            : lang.proficiency === "Advanced"
                              ? "w-3/4"
                              : lang.proficiency === "Intermediate"
                                ? "w-1/2"
                                : "w-1/3",
                        selectedTemplate === "modern"
                          ? "bg-gradient-to-r from-primary to-secondary"
                          : "bg-gray-400"
                      )}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Certifications */}
        {certifications && (
          <section>
            <h2 className={cn(
              "text-xs font-bold uppercase tracking-wide mb-3 pb-2 border-b-2",
              selectedTemplate === "modern"
                ? "text-primary border-primary/30"
                : "text-gray-900 border-gray-300"
            )}>
              Certifications
            </h2>
            <div className="text-xs text-gray-700 leading-relaxed whitespace-pre-line">
              {certifications}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects && (
          <section>
            <h2 className={cn(
              "text-xs font-bold uppercase tracking-wide mb-3 pb-2 border-b-2",
              selectedTemplate === "modern"
                ? "text-primary border-primary/30"
                : "text-gray-900 border-gray-300"
            )}>
              Projects
            </h2>
            <div className="text-xs text-gray-700 leading-relaxed whitespace-pre-line">
              {projects}
            </div>
          </section>
        )}
      </div>

      {/* Footer Info */}
      {!fullName && (
        <div className="px-6 py-8 text-center text-gray-400 text-xs">
          Your resume preview will appear here as you fill in the form
        </div>
      )}
    </div>
  );
}

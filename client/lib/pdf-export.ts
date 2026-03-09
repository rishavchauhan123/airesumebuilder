interface ResumeData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  linkedIn: string;
  portfolio: string;
  profilePhoto: string | null;
  experiences: Array<{
    jobTitle: string;
    company: string;
    startDate: string;
    endDate: string;
    currentlyWorking: boolean;
    responsibilities: string;
  }>;
  education: Array<{
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

import React from "react";
import ReactDOM from "react-dom/client";
import html2pdf from "html2pdf.js";
import ResumePreview from "@/components/ResumePreview";

/**
 * Generate resume PDF
 * Creates a PDF document and triggers a direct file download
 */
export async function generateResumePDF(data: ResumeData) {
  try {
    // create an off-screen container and mount the React preview component
    const container = document.createElement("div");
    container.id = "resume-download-container";
    container.style.position = "absolute";
    container.style.top = "0";
    container.style.left = "0";
    container.style.opacity = "0";          // invisible but rendered
    container.style.pointerEvents = "none";
    container.style.width = "816px";       // fixed pixel width for A4
    container.style.minHeight = "1056px";  // fixed pixel height for A4
    container.style.backgroundColor = "white";
    container.style.overflow = "visible";  // ensure content isn't clipped
    document.body.appendChild(container);

    // render resume preview into container so it matches the live UI exactly
    const root = ReactDOM.createRoot(container);
    root.render(
      React.createElement(ResumePreview, {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        location: data.location,
        linkedIn: data.linkedIn,
        portfolio: data.portfolio,
        profilePhoto: data.profilePhoto,
        experiences: data.experiences.map(exp => ({
          id: Math.random().toString(), // not used by PDF
          jobTitle: exp.jobTitle,
          company: exp.company,
          startDate: exp.startDate,
          endDate: exp.endDate,
          currentlyWorking: exp.currentlyWorking,
          responsibilities: exp.responsibilities,
        })),
        education: data.education.map(edu => ({
          id: Math.random().toString(),
          degree: edu.degree,
          institution: edu.institution,
          year: edu.year,
          fieldOfStudy: edu.fieldOfStudy,
        })),
        skills: data.skills,
        professionalSummary: data.professionalSummary,
        certifications: data.certifications,
        languages: data.languages,
        projects: data.projects,
        selectedTemplate: data.selectedTemplate,
      })
    );

    // give React a tick to paint
    await new Promise(resolve => requestAnimationFrame(() => resolve(null)));
    // allow images/fonts to load
    await new Promise(resolve => setTimeout(resolve, 300));

    // force the resume preview to have proper dimensions for PDF
    const resumePreview = container.querySelector('#resume-live-preview') as HTMLElement;
    if (resumePreview) {
      resumePreview.style.height = 'auto';
      resumePreview.style.minHeight = '1056px';
      resumePreview.style.overflow = 'visible';
      resumePreview.style.position = 'relative';
    }

    // debug dump: ensure container has rendered content
    console.log("[PDF] container dims", container.offsetWidth, container.offsetHeight);
    console.log("[PDF] container innerHTML snippet", container.innerHTML.slice(0, 500));
    // also log full text length for sanity
    console.log("[PDF] container innerHTML length", container.innerHTML.length);

    // generate pdf from container element
    const fileName = `${data.firstName}_${data.lastName}_Resume.pdf`.replace(/\s+/g, '_');
    const opt = {
      margin:       0,
      filename:     fileName,
      image:        { type: 'jpeg' as const, quality: 1 },
      html2canvas:  {
        scale: 2,
        useCORS: true,
        logging: true,
        width: 816,
        height: 1056,
        windowWidth: 816,
        windowHeight: 1056,
        allowTaint: true,
        backgroundColor: '#ffffff'
      },
      jsPDF:        { unit: 'px', format: [816, 1056], orientation: 'portrait' as const }
    };
    console.log("[PDF] calling html2pdf with opts", opt);

    await html2pdf().from(container).set(opt).save();

    // cleanup
    root.unmount();
    if (document.body.contains(container)) {
      document.body.removeChild(container);
    }

  } catch (error) {
    console.error("Error generating PDF:", error);
    throw new Error("Failed to generate PDF. Please try again.");
  }
}

function generateResumeHTML(data: ResumeData): string {
  const getInitials = (firstName: string, lastName: string): string => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const colors = getTemplateColors(data.selectedTemplate);
  const headerGradient = data.selectedTemplate === "modern" 
    ? `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`
    : `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primary} 100%)`;

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${data.firstName} ${data.lastName} - Resume</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        html, body {
          margin: 0;
          padding: 0;
          width: 100%;
          height: auto;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
          line-height: 1.5;
          color: #1f2937;
          background: #f9fafb;
        }

        @page {
          size: letter;
          margin: 0;
          padding: 0;
        }

        .container {
          width: 8.5in;
          margin: 0;
          padding: 0;
          background: white;
          min-height: 11in;
        }

        /* HEADER SECTION */
        .header {
          background: ${headerGradient};
          text-align: center;
          padding: 0.4in 0.5in;
          color: white;
        }

        .avatar-container {
          display: flex;
          justify-content: center;
          margin-bottom: 0.15in;
        }

        .avatar {
          width: 0.7in;
          height: 0.7in;
          border-radius: 50%;
          object-fit: cover;
          border: 3px solid white;
          box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        }

        .avatar-initials {
          width: 0.7in;
          height: 0.7in;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          font-weight: bold;
          color: white;
          border: 3px solid white;
          background: rgba(255,255,255,0.2);
          box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        }

        .name {
          font-size: 28px;
          font-weight: 700;
          color: white;
          margin: 0.1in 0;
          letter-spacing: -0.5px;
        }

        .contact-info {
          font-size: 8.5px;
          color: rgba(255,255,255,0.95);
          line-height: 1.4;
          font-weight: 500;
        }

        .contact-row {
          display: flex;
          justify-content: center;
          gap: 0.15in;
          flex-wrap: wrap;
        }

        .contact-item {
          display: flex;
          gap: 4px;
        }

        .contact-divider {
          color: rgba(255,255,255,0.6);
        }

        .social-links {
          margin-top: 0.08in;
          display: flex;
          justify-content: center;
          gap: 0.15in;
          font-size: 8px;
          font-weight: 500;
        }

        .social-link {
          color: rgba(255,255,255,0.9);
          text-decoration: none;
        }

        .social-divider {
          color: rgba(255,255,255,0.5);
        }

        /* CONTENT SECTION */
        .content {
          padding: 0.4in 0.5in;
        }

        .section {
          margin-bottom: 0.25in;
          page-break-inside: avoid;
        }

        .section-title {
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          color: ${colors.primary};
          margin-bottom: 0.1in;
          padding-bottom: 0.05in;
          border-bottom: 2px solid ${colors.primary};
          letter-spacing: 0.8px;
        }

        /* SUMMARY */
        .summary-text {
          font-size: 9px;
          line-height: 1.5;
          color: #374151;
          text-align: justify;
        }

        /* SKILLS */
        .skills-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.08in 0.1in;
        }

        .skill-item {
          display: flex;
          align-items: flex-start;
          gap: 0.06in;
          font-size: 9px;
          color: #374151;
          line-height: 1.3;
        }

        .skill-bullet {
          width: 3px;
          height: 3px;
          background-color: ${colors.primary};
          border-radius: 50%;
          margin-top: 4px;
          flex-shrink: 0;
        }

        /* EXPERIENCE & EDUCATION */
        .entry {
          margin-bottom: 0.12in;
          page-break-inside: avoid;
        }

        .entry-header {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: 0.02in;
          gap: 0.1in;
        }

        .entry-title {
          font-size: 9px;
          font-weight: 700;
          color: #1f2937;
          margin: 0;
        }

        .entry-date {
          font-size: 8px;
          color: #666;
          white-space: nowrap;
          flex-shrink: 0;
        }

        .entry-subtitle {
          font-size: 8.5px;
          font-weight: 600;
          color: #4b5563;
          margin-bottom: 0.02in;
        }

        .responsibilities {
          font-size: 8px;
          color: #555;
          line-height: 1.4;
          margin-left: 0.08in;
          padding-left: 0;
        }

        .responsibilities li {
          margin-bottom: 0.01in;
          list-style: disc inside;
        }

        /* LANGUAGES */
        .languages-list {
          display: flex;
          flex-direction: column;
          gap: 0.08in;
        }

        .language-item {
          display: flex;
          flex-direction: column;
          gap: 0.03in;
        }

        .language-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .language-name {
          font-size: 9px;
          font-weight: 600;
          color: #1f2937;
        }

        .language-proficiency {
          font-size: 8px;
          color: #666;
        }

        .language-bar {
          width: 100%;
          height: 4px;
          background-color: #e5e7eb;
          border-radius: 2px;
          overflow: hidden;
        }

        .language-progress {
          height: 100%;
          border-radius: 2px;
        }

        /* CERTIFICATIONS & PROJECTS */
        .cert-item {
          font-size: 9px;
          color: #374151;
          line-height: 1.4;
          margin-bottom: 0.05in;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <!-- HEADER -->
        <div class="header">
          ${
            data.profilePhoto
              ? `<div class="avatar-container"><img src="${data.profilePhoto}" alt="Profile" class="avatar" /></div>`
              : `<div class="avatar-container"><div class="avatar-initials">${getInitials(data.firstName, data.lastName)}</div></div>`
          }
          <h1 class="name">${escapeHtml(`${data.firstName} ${data.lastName}`)}</h1>
          <div class="contact-info">
            <div class="contact-row">
              ${data.email ? `<span class="contact-item">${escapeHtml(data.email)}</span>` : ""}
              ${data.email && data.phone ? `<span class="contact-divider">•</span>` : ""}
              ${data.phone ? `<span class="contact-item">${escapeHtml(data.phone)}</span>` : ""}
              ${(data.email || data.phone) && data.location ? `<span class="contact-divider">•</span>` : ""}
              ${data.location ? `<span class="contact-item">${escapeHtml(data.location)}</span>` : ""}
            </div>
            ${
              data.linkedIn || data.portfolio
                ? `
            <div class="social-links">
              ${data.linkedIn ? `<a class="social-link" href="${escapeHtml(data.linkedIn)}">LinkedIn</a>` : ""}
              ${data.linkedIn && data.portfolio ? `<span class="social-divider">|</span>` : ""}
              ${data.portfolio ? `<a class="social-link" href="${escapeHtml(data.portfolio)}">Portfolio</a>` : ""}
            </div>
            `
                : ""
            }
          </div>
        </div>

        <!-- CONTENT -->
        <div class="content">
          ${
            data.professionalSummary
              ? `
          <div class="section">
            <div class="section-title">Summary</div>
            <p class="summary-text">${escapeHtml(data.professionalSummary)}</p>
          </div>
          `
              : ""
          }

          ${
            data.skills.length > 0
              ? `
          <div class="section">
            <div class="section-title">Skills</div>
            <div class="skills-grid">
              ${data.skills
                .map(
                  (skill) => `
              <div class="skill-item">
                <div class="skill-bullet"></div>
                <span>${escapeHtml(skill)}</span>
              </div>
              `
                )
                .join("")}
            </div>
          </div>
          `
              : ""
          }

          ${
            data.experiences.length > 0
              ? `
          <div class="section">
            <div class="section-title">Experience</div>
            ${data.experiences
              .map(
                (exp) => `
            <div class="entry">
              <div class="entry-header">
                <h3 class="entry-title">${escapeHtml(exp.jobTitle)}</h3>
                <span class="entry-date">${escapeHtml(exp.startDate)} - ${exp.currentlyWorking ? "Present" : escapeHtml(exp.endDate)}</span>
              </div>
              <div class="entry-subtitle">${escapeHtml(exp.company)}</div>
              ${
                exp.responsibilities
                  ? `
              <ul class="responsibilities">
                ${exp.responsibilities
                  .split("\n")
                  .filter((r) => r.trim())
                  .slice(0, 3)
                  .map((resp) => `<li>${escapeHtml(resp.trim())}</li>`)
                  .join("")}
              </ul>
              `
                  : ""
              }
            </div>
            `
              )
              .join("")}
          </div>
          `
              : ""
          }

          ${
            data.education.length > 0
              ? `
          <div class="section">
            <div class="section-title">Education & Training</div>
            ${data.education
              .map(
                (edu) => `
            <div class="entry">
              <div class="entry-header">
                <h3 class="entry-title">${escapeHtml(edu.degree)}${edu.fieldOfStudy ? ` in ${escapeHtml(edu.fieldOfStudy)}` : ""}</h3>
                <span class="entry-date">${escapeHtml(edu.year)}</span>
              </div>
              <div class="entry-subtitle">${escapeHtml(edu.institution)}</div>
            </div>
            `
              )
              .join("")}
          </div>
          `
              : ""
          }

          ${
            data.languages
              ? `
          <div class="section">
            <div class="section-title">Languages</div>
            <div class="languages-list">
              ${data.languages
                .split("\n")
                .filter((l) => l.trim())
                .map((lang) => {
                  const [language, proficiency] = lang.split("-").map((s) => s.trim());
                  const prof = proficiency || "Intermediate";
                  const width = prof === "Native" ? "100%" : 
                               prof === "Fluent" ? "80%" : 
                               prof === "Advanced" ? "60%" : 
                               prof === "Intermediate" ? "40%" : "20%";
                  return `
              <div class="language-item">
                <div class="language-header">
                  <span class="language-name">${escapeHtml(language)}</span>
                  <span class="language-proficiency">${escapeHtml(prof)}</span>
                </div>
                <div class="language-bar">
                  <div class="language-progress" style="width: ${width}; background: linear-gradient(90deg, ${colors.primary}, ${colors.secondary});"></div>
                </div>
              </div>
                  `;
                })
                .join("")}
            </div>
          </div>
          `
              : ""
          }

          ${
            data.certifications
              ? `
          <div class="section">
            <div class="section-title">Certifications</div>
            <div>
              ${data.certifications
                .split("\n")
                .filter((c) => c.trim())
                .map((cert) => `<div class="cert-item">• ${escapeHtml(cert.trim())}</div>`)
                .join("")}
            </div>
          </div>
          `
              : ""
          }

          ${
            data.projects
              ? `
          <div class="section">
            <div class="section-title">Projects</div>
            <div>
              ${data.projects
                .split("\n")
                .filter((p) => p.trim())
                .map((proj) => `<div class="cert-item">• ${escapeHtml(proj.trim())}</div>`)
                .join("")}
            </div>
          </div>
          `
              : ""
          }
        </div>
      </div>
    </body>
    </html>
  `;
}

function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (char) => map[char]);
}

function getTemplateColors(template: "modern" | "classic" | "minimal"): {
  primary: string;
  secondary: string;
} {
  switch (template) {
    case "modern":
      return {
        primary: "#3b82f6", // Blue
        secondary: "#a78bfa", // Purple
      };
    case "classic":
      return {
        primary: "#1f2937", // Dark gray
        secondary: "#6b7280", // Medium gray
      };
    case "minimal":
      return {
        primary: "#374151", // Gray
        secondary: "#9ca3af", // Light gray
      };
    default:
      return {
        primary: "#3b82f6",
        secondary: "#a78bfa",
      };
  }
}

function getTemplateStyle(template: "modern" | "classic" | "minimal"): string {
  const baseStyle = `
    .header {
      border-bottom: 2px solid #3b82f6;
      padding-bottom: 10px;
      margin-bottom: 15px;
    }

    .name {
      font-size: 24px;
      font-weight: bold;
      color: #1f2937;
      margin-bottom: 5px;
    }

    .contact-info {
      font-size: 11px;
      color: #666;
    }

    .contact-info span {
      margin-right: 5px;
    }

    .section {
      margin-bottom: 12px;
    }

    .section h2 {
      font-size: 12px;
      font-weight: bold;
      color: #1f2937;
      text-transform: uppercase;
      border-bottom: 1px solid #e5e7eb;
      padding-bottom: 5px;
      margin-bottom: 8px;
      letter-spacing: 0.5px;
    }

    .entry {
      margin-bottom: 8px;
    }

    .entry-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 2px;
    }

    .entry h3 {
      font-size: 11px;
      font-weight: bold;
      color: #1f2937;
    }

    .date {
      font-size: 10px;
      color: #666;
    }

    .company {
      font-size: 10px;
      font-style: italic;
      color: #4b5563;
      margin-bottom: 2px;
    }

    .description {
      font-size: 10px;
      color: #555;
      line-height: 1.4;
    }

    .section p {
      font-size: 10px;
      color: #555;
      line-height: 1.4;
    }

    .skills {
      display: flex;
      flex-wrap: wrap;
      gap: 5px;
    }

    .skill-tag {
      display: inline-block;
      background-color: #eff6ff;
      color: #3b82f6;
      padding: 2px 6px;
      border-radius: 3px;
      font-size: 9px;
      font-weight: 500;
    }
  `;

  if (template === "modern") {
    return (
      baseStyle +
      `
      .header {
        background: linear-gradient(135deg, #3b82f6 0%, #a78bfa 100%);
        color: white;
        padding: 15px;
        border-radius: 5px;
        margin: -20px -20px 15px -20px;
      }

      .header .name {
        color: white;
      }

      .header .contact-info {
        color: rgba(255,255,255,0.9);
      }

      .section h2 {
        border-color: #3b82f6;
        color: #3b82f6;
      }

      .skill-tag {
        background-color: #dbeafe;
        color: #1e40af;
      }
    `
    );
  } else if (template === "classic") {
    return (
      baseStyle +
      `
      .header {
        border-bottom: 3px solid #1f2937;
      }

      .name {
        color: #000;
      }

      .section h2 {
        border-color: #1f2937;
        color: #000;
      }

      .skill-tag {
        background-color: #f3f4f6;
        color: #111827;
        border: 1px solid #d1d5db;
      }
    `
    );
  } else {
    return (
      baseStyle +
      `
      .header {
        border-bottom: 1px solid #d1d5db;
      }

      .section h2 {
        border-color: #e5e7eb;
        font-size: 10px;
      }

      .skill-tag {
        background-color: #f9fafb;
        color: #374151;
      }
    `
    );
  }
}

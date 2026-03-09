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

import html2pdf from "html2pdf.js";

/**
 * Generate resume PDF
 * Creates a PDF document and triggers a direct file download
 */
export async function generateResumePDF(data: ResumeData) {
  try {
    // Create a temporary container for the resume
    const container = document.createElement("div");
    container.id = "resume-download-container";
    container.style.width = "8.5in"; // Standard US Letter width
    container.style.padding = "0.5in";
    container.style.backgroundColor = "white";
    
    // Keep it at the top-left but make it invisible rather than moving it
    // out of the viewport or behind everything. html2canvas will still render
    // the element when it's transparent, whereas hidden/off-screen elements can
    // end up with a computed height of 0 or be skipped entirely.
    container.style.position = "absolute";
    container.style.top = "0";
    container.style.left = "0";
    container.style.opacity = "0";
    container.style.pointerEvents = "none";
    const htmlContent = generateResumeHTML(data);
    console.log("[PDF] generated HTML content length", htmlContent.length);
    container.innerHTML = htmlContent;
    document.body.appendChild(container);

    // inspect container for debugging
    console.log("[PDF] container appended, innerHTML snippet", container.innerHTML.slice(0, 200));
    console.log("[PDF] container dimensions", container.offsetWidth, container.offsetHeight);

    // Wait a moment to ensure fonts/images are ready
    await new Promise(resolve => setTimeout(resolve, 500));

    // Configure html2pdf options
    const fileName = `${data.firstName}_${data.lastName}_Resume.pdf`.replace(/\s+/g, '_');
    const opt = {
      margin:       0, // Margins handled by container padding
      filename:     fileName,
      image:        { type: 'jpeg' as const, quality: 0.98 },
      html2canvas:  { scale: 2, useCORS: true },
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' as const }
    };

    // Generate and download the PDF
    await html2pdf().from(container).set(opt).save();

    // Clean up container
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
          height: 100%;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
          line-height: 1.6;
          color: #1f2937;
          background: white;
        }

        @page {
          size: letter;
          margin: 0;
        }

        @media print {
          html, body {
            margin: 0 !important;
            padding: 0 !important;
            width: 100% !important;
            height: 100% !important;
          }

          .container {
            margin: 0 !important;
            padding: 0.5in !important;
            page-break-after: avoid;
          }

          .section {
            page-break-inside: avoid;
          }
        }

        .container {
          width: 8.5in;
          height: 11in;
          margin: 0;
          padding: 0.5in;
          background: white;
          line-height: 1.4;
        }

        .header {
          text-align: center;
          margin-bottom: 0.3in;
          padding-bottom: 0.2in;
          border-bottom: 3px solid ${colors.primary};
        }

        .avatar-container {
          display: flex;
          justify-content: center;
          margin-bottom: 0.15in;
        }

        .avatar {
          width: 0.8in;
          height: 0.8in;
          border-radius: 50%;
          object-fit: cover;
          border: 3px solid ${colors.primary};
        }

        .avatar-initials {
          width: 0.8in;
          height: 0.8in;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          font-weight: bold;
          color: white;
          border: 3px solid white;
          background: linear-gradient(135deg, ${colors.primary}, ${colors.secondary});
        }

        .name {
          font-size: 24px;
          font-weight: bold;
          color: ${colors.primary};
          margin-bottom: 0.08in;
        }

        .contact-info {
          font-size: 9px;
          color: #666;
          line-height: 1.3;
        }

        .section {
          margin-bottom: 0.2in;
        }

        .section h2 {
          font-size: 11px;
          font-weight: bold;
          color: ${colors.primary};
          text-transform: uppercase;
          border-bottom: 2px solid ${colors.primary};
          padding-bottom: 0.06in;
          margin-bottom: 0.1in;
          letter-spacing: 0.5px;
        }

        .summary-text {
          font-size: 10px;
          line-height: 1.4;
          color: #374151;
        }

        .skills-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.08in;
        }

        .skill-item {
          display: flex;
          align-items: flex-start;
          gap: 0.08in;
        }

        .skill-bullet {
          width: 4px;
          height: 4px;
          background-color: ${colors.primary};
          border-radius: 50%;
          margin-top: 4px;
          flex-shrink: 0;
        }

        .skill-text {
          font-size: 10px;
          color: #374151;
        }

        .entry {
          margin-bottom: 0.15in;
        }

        .entry-header {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: 0.03in;
        }

        .entry h3 {
          font-size: 10px;
          font-weight: bold;
          color: #1f2937;
          margin: 0;
        }

        .date {
          font-size: 9px;
          color: #666;
          white-space: nowrap;
        }

        .company {
          font-size: 9px;
          font-weight: 600;
          color: #4b5563;
          margin-bottom: 0.02in;
        }

        .responsibilities {
          font-size: 9px;
          color: #555;
          line-height: 1.3;
          margin-left: 0.1in;
        }

        .responsibilities li {
          margin-bottom: 0.02in;
          list-style: disc;
        }

        .languages-list {
          display: flex;
          flex-direction: column;
          gap: 0.08in;
        }

        .language-item {
          display: flex;
          flex-direction: column;
          gap: 0.04in;
        }

        .language-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .language-name {
          font-size: 10px;
          font-weight: 600;
          color: #1f2937;
        }

        .language-proficiency {
          font-size: 9px;
          color: #666;
        }

        .language-bar {
          width: 100%;
          height: 6px;
          background-color: #e5e7eb;
          border-radius: 3px;
          overflow: hidden;
        }

        .language-progress {
          height: 100%;
          border-radius: 3px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          ${
            data.profilePhoto
              ? `<div class="avatar-container"><img src="${data.profilePhoto}" alt="Profile" class="avatar"></div>`
              : `<div class="avatar-container"><div class="avatar-initials">${getInitials(data.firstName, data.lastName)}</div></div>`
          }
          <h1 class="name">${escapeHtml(`${data.firstName} ${data.lastName}`)}</h1>
          <div class="contact-info">
            ${data.email ? `<div>${escapeHtml(data.email)}</div>` : ""}
            ${data.phone ? `<div>${escapeHtml(data.phone)}</div>` : ""}
            ${data.location ? `<div>${escapeHtml(data.location)}</div>` : ""}
          </div>
        </div>

        ${
          data.professionalSummary
            ? `
          <div class="section">
            <h2>Summary</h2>
            <p class="summary-text">${escapeHtml(data.professionalSummary)}</p>
          </div>
        `
            : ""
        }

        ${
          data.skills.length > 0
            ? `
          <div class="section">
            <h2>Skills</h2>
            <div class="skills-grid">
              ${data.skills
                .map(
                  (skill) => `
                <div class="skill-item">
                  <div class="skill-bullet"></div>
                  <div class="skill-text">${escapeHtml(skill)}</div>
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
            <h2>Experience</h2>
            ${data.experiences
              .map(
                (exp) => `
              <div class="entry">
                <div class="entry-header">
                  <h3>${escapeHtml(exp.jobTitle)}</h3>
                  <span class="date">${escapeHtml(exp.startDate)} - ${exp.currentlyWorking ? "Present" : escapeHtml(exp.endDate)}</span>
                </div>
                <div class="company">${escapeHtml(exp.company)}</div>
                <ul class="responsibilities">
                  ${exp.responsibilities
                    .split("\n")
                    .filter((r) => r.trim())
                    .slice(0, 3)
                    .map((resp) => `<li>${escapeHtml(resp.trim())}</li>`)
                    .join("")}
                </ul>
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
            <h2>Education & Training</h2>
            ${data.education
              .map(
                (edu) => `
              <div class="entry">
                <div class="entry-header">
                  <h3>${escapeHtml(edu.degree)}${edu.fieldOfStudy ? ` in ${escapeHtml(edu.fieldOfStudy)}` : ""}</h3>
                  <span class="date">${escapeHtml(edu.year)}</span>
                </div>
                <div class="company">${escapeHtml(edu.institution)}</div>
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
            <h2>Languages</h2>
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
            <h2>Certifications</h2>
            <div class="summary-text">${escapeHtml(data.certifications).replace(/\n/g, "<br>")}</div>
          </div>
        `
            : ""
        }

        ${
          data.projects
            ? `
          <div class="section">
            <h2>Projects</h2>
            <div class="summary-text">${escapeHtml(data.projects).replace(/\n/g, "<br>")}</div>
          </div>
        `
            : ""
        }
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

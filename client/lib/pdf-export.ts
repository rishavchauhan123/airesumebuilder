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
 * Generate resume PDF - creates a professional PDF with clean HTML and inline styles
 */
export async function generateResumePDF(data: ResumeData) {
  try {
    // Generate clean HTML with inline styles (not React, not Tailwind)
    const htmlContent = createResumeHTML(data);
    
    // Create container with the HTML string
    const container = document.createElement("div");
    container.innerHTML = htmlContent;
    container.style.position = "fixed";
    container.style.top = "0";
    container.style.left = "0";
    container.style.width = "816px";
    container.style.height = "1056px";
    container.style.opacity = "0";
    container.style.pointerEvents = "none";
    container.style.zIndex = "-9999";
    document.body.appendChild(container);

    // Wait for render
    await new Promise(r => setTimeout(r, 300));

    const fileName = `${data.firstName}_${data.lastName}_Resume.pdf`.replace(/\s+/g, '_');
    
    // html2pdf options
    const opt = {
      margin: 0,
      filename: fileName,
      image: { type: 'jpeg' as const, quality: 0.95 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        windowWidth: 816,
        backgroundColor: '#ffffff'
      },
      jsPDF: { unit: 'px', format: [816, 1056], orientation: 'portrait' as const }
    };

    // Generate PDF
    await html2pdf().set(opt).from(container).save();

    // Cleanup
    document.body.removeChild(container);

  } catch (error) {
    console.error("Error generating PDF:", error);
    throw new Error("Failed to generate PDF. Please try again.");
  }
}

/**
 * Create resume HTML with inline styles for reliable PDF generation
 */
function createResumeHTML(data: ResumeData): string {
  const getInitials = (firstName: string, lastName: string): string => {
    return (firstName.charAt(0) + lastName.charAt(0)).toUpperCase();
  };

  const colors = getLayoutColors(data.selectedTemplate);
  const initials = getInitials(data.firstName, data.lastName);

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .page { width: 816px; height: 1056px; background: white; display: flex; flex-direction: column; }
        .header { background: linear-gradient(135deg, ${colors.primary}, ${colors.secondary}); color: white; padding: 40px; text-align: center; }
        .avatar { width: 80px; height: 80px; border-radius: 50%; background: rgba(255,255,255,0.3); display: flex; align-items: center; justify-content: center; font-size: 32px; font-weight: bold; margin: 0 auto 15px; }
        .name { font-size: 28px; font-weight: bold; margin: 10px 0; }
        .contact { font-size: 12px; line-height: 1.4; margin-top: 10px; }
        .contact-item { margin: 3px 0; }
        .social { margin-top: 10px; font-size: 11px; }
        .content { flex: 1; padding: 30px; overflow: hidden; }
        .section { margin-bottom: 20px; }
        .section-title { font-size: 12px; font-weight: bold; color: ${colors.primary}; text-transform: uppercase; border-bottom: 2px solid ${colors.primary}; padding-bottom: 5px; margin-bottom: 10px; letter-spacing: 1px; }
        .summary-text { font-size: 11px; line-height: 1.5; color: #555; text-align: justify; }
        .skills-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        .skill { font-size: 11px; color: #555; }
        .skill::before { content: "• "; color: ${colors.primary}; font-weight: bold; margin-right: 5px; }
        .entry { margin-bottom: 12px; page-break-inside: avoid; }
        .entry-header { display: flex; justify-content: space-between; align-items: baseline; gap: 10px; }
        .entry-title { font-size: 11px; font-weight: bold; color: #000; }
        .entry-date { font-size: 10px; color: #666; white-space: nowrap; }
        .entry-company { font-size: 10px; font-weight: 600; color: #4b5563; margin-top: 2px; }
        .responsibilities { font-size: 10px; color: #555; margin-left: 15px; margin-top: 4px; line-height: 1.4; }
        .responsibilities li { margin: 2px 0; }
        .lang-item { margin-bottom: 10px; font-size: 10px; }
        .lang-header { display: flex; justify-content: space-between; margin-bottom: 3px; }
        .lang-name { font-weight: 600; }
        .lang-level { color: #666; }
        .lang-bar { width: 100%; height: 4px; background: #e0e0e0; border-radius: 2px; overflow: hidden; }
        .lang-progress { height: 100%; background: linear-gradient(90deg, ${colors.primary}, ${colors.secondary}); }
        .bullet-list { font-size: 11px; margin-left: 15px; color: #555; line-height: 1.4; }
        .bullet-list li { margin: 3px 0; }
      </style>
    </head>
    <body>
      <div class="page">
        <!-- HEADER -->
        <div class="header">
          <div class="avatar">${initials}</div>
          <div class="name">${escapeHtml(data.firstName + ' ' + data.lastName)}</div>
          <div class="contact">
            <div class="contact-item">${escapeHtml(data.email)}</div>
            <div class="contact-item">${escapeHtml(data.phone)}</div>
            <div class="contact-item">${escapeHtml(data.location)}</div>
            ${data.linkedIn || data.portfolio ? `<div class="social">${data.linkedIn ? 'LinkedIn | ' : ''}${data.portfolio ? 'Portfolio' : ''}</div>` : ''}
          </div>
        </div>

        <!-- CONTENT -->
        <div class="content">
          ${data.professionalSummary ? `
          <div class="section">
            <div class="section-title">Summary</div>
            <div class="summary-text">${escapeHtml(data.professionalSummary)}</div>
          </div>
          ` : ''}

          ${data.skills.length > 0 ? `
          <div class="section">
            <div class="section-title">Skills</div>
            <div class="skills-grid">
              ${data.skills.map(skill => `<div class="skill">${escapeHtml(skill)}</div>`).join('')}
            </div>
          </div>
          ` : ''}

          ${data.experiences.length > 0 ? `
          <div class="section">
            <div class="section-title">Experience</div>
            ${data.experiences.map(exp => `
            <div class="entry">
              <div class="entry-header">
                <div class="entry-title">${escapeHtml(exp.jobTitle)}</div>
                <div class="entry-date">${escapeHtml(exp.startDate)} - ${exp.currentlyWorking ? 'Present' : escapeHtml(exp.endDate)}</div>
              </div>
              <div class="entry-company">${escapeHtml(exp.company)}</div>
              ${exp.responsibilities ? `
              <ul class="responsibilities">
                ${exp.responsibilities.split('\n').filter(r => r.trim()).slice(0, 3).map(r => `<li>${escapeHtml(r.trim())}</li>`).join('')}
              </ul>
              ` : ''}
            </div>
            `).join('')}
          </div>
          ` : ''}

          ${data.education.length > 0 ? `
          <div class="section">
            <div class="section-title">Education</div>
            ${data.education.map(edu => `
            <div class="entry">
              <div class="entry-header">
                <div class="entry-title">${escapeHtml(edu.degree)}${edu.fieldOfStudy ? ` - ${escapeHtml(edu.fieldOfStudy)}` : ''}</div>
                <div class="entry-date">${escapeHtml(edu.year)}</div>
              </div>
              <div class="entry-company">${escapeHtml(edu.institution)}</div>
            </div>
            `).join('')}
          </div>
          ` : ''}

          ${data.languages ? `
          <div class="section">
            <div class="section-title">Languages</div>
            ${data.languages.split('\n').filter(l => l.trim()).map(lang => {
              const [name, level] = lang.split('-').map(s => s.trim());
              const flevel = level || 'Intermediate';
              const w = flevel === 'Native' ? 100 : flevel === 'Fluent' ? 80 : flevel === 'Advanced' ? 60 : flevel === 'Intermediate' ? 40 : 20;
              return `
              <div class="lang-item">
                <div class="lang-header">
                  <div class="lang-name">${escapeHtml(name)}</div>
                  <div class="lang-level">${escapeHtml(flevel)}</div>
                </div>
                <div class="lang-bar">
                  <div class="lang-progress" style="width: ${w}%;"></div>
                </div>
              </div>
              `;
            }).join('')}
          </div>
          ` : ''}

          ${data.certifications ? `
          <div class="section">
            <div class="section-title">Certifications</div>
            <ul class="bullet-list">
              ${data.certifications.split('\n').filter(c => c.trim()).map(cert => `<li>${escapeHtml(cert.trim())}</li>`).join('')}
            </ul>
          </div>
          ` : ''}

          ${data.projects ? `
          <div class="section">
            <div class="section-title">Projects</div>
            <ul class="bullet-list">
              ${data.projects.split('\n').filter(p => p.trim()).map(proj => `<li>${escapeHtml(proj.trim())}</li>`).join('')}
            </ul>
          </div>
          ` : ''}
        </div>
      </div>
    </body>
    </html>
  `;
}

function escapeHtml(text: string): string {
  const map: {[key: string]: string} = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

function getLayoutColors(template: string): {primary: string; secondary: string} {
  const colors: {[key: string]: {primary: string; secondary: string}} = {
    modern: { primary: '#3b82f6', secondary: '#a78bfa' },
    classic: { primary: '#1f2937', secondary: '#6b7280' },
    minimal: { primary: '#374151', secondary: '#9ca3af' }
  };
  return colors[template] || colors.modern;
}

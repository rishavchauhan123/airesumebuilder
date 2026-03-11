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
    
    console.log("Generated HTML length:", htmlContent.length);
    
    // Create container - must be visible for html2canvas to capture it
    const container = document.createElement("div");
    container.innerHTML = htmlContent;
    container.style.position = "absolute";
    container.style.top = "-9999px";
    container.style.left = "0";
    
    // Append to body so it's in the DOM
    document.body.appendChild(container);
    
    // Make sure container has proper dimensions for html2pdf to work
    const resumePage = container.querySelector(".resume-page") as HTMLElement;
    if (!resumePage) {
      throw new Error("Resume page element not found in generated HTML");
    }
    
    // Force reflow to ensure element is rendered
    resumePage.offsetHeight;
    
    console.log("Resume page dimensions:", {
      width: resumePage.offsetWidth,
      height: resumePage.offsetHeight,
      scrollHeight: resumePage.scrollHeight
    });

    // Wait for rendering
    await new Promise(r => setTimeout(r, 1000));
    
    const fileName = `${data.firstName}_${data.lastName}_Resume.pdf`.replace(/\s+/g, '_');
    
    // html2pdf options - use simpler configuration
    const opt = {
      margin: [0, 0],
      filename: fileName,
      image: { type: 'jpeg' as const, quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      },
      jsPDF: { 
        unit: 'mm', 
        format: 'letter', 
        orientation: 'portrait' as const 
      }
    };

    console.log("Starting html2pdf conversion");
    
    // Generate PDF from the resume page element  
    await html2pdf().set(opt).from(resumePage).save();
    
    console.log("PDF generated successfully");

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

  // Just return the styled content, not a full HTML document
  return `
    <style>
      body { margin: 0; padding: 0; font-family: Arial, sans-serif; }
      .resume-page { width: 816px; margin: 0 auto; background: white; padding: 0; }
      .header { background: linear-gradient(135deg, ${colors.primary}, ${colors.secondary}); color: white; padding: 40px; text-align: center; }
      .avatar { width: 80px; height: 80px; border-radius: 50%; background: rgba(255,255,255,0.3); display: flex; align-items: center; justify-content: center; font-size: 32px; font-weight: bold; margin: 0 auto 15px; border: 3px solid white; overflow: hidden; object-fit: cover; }
      .avatar-img { width: 100%; height: 100%; object-fit: cover; }
      .avatar-initials { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background: rgba(255,255,255,0.3); }
      .name { font-size: 28px; font-weight: bold; margin: 10px 0; }
      .contact { font-size: 11px; line-height: 1.8; margin-top: 10px; }
      .contact-item { margin: 2px 0; word-break: break-word; }
      .contact-separator { margin: 0 4px; }
      .content { padding: 30px 40px; }
      .section { margin-bottom: 20px; page-break-inside: avoid; }
      .section-title { font-size: 12px; font-weight: bold; color: ${colors.primary}; text-transform: uppercase; border-bottom: 2px solid ${colors.primary}; padding-bottom: 5px; margin-bottom: 10px; letter-spacing: 1px; }
      .summary-text { font-size: 11px; line-height: 1.5; color: #555; }
      .skills-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
      .skill { font-size: 11px; color: #555; }
      .skill::before { content: "• "; color: ${colors.primary}; font-weight: bold; margin-right: 5px; }
      .entry { margin-bottom: 12px; }
      .entry-header { display: flex; justify-content: space-between; gap: 10px; margin-bottom: 3px; }
      .entry-title { font-size: 11px; font-weight: bold; color: #000; }
      .entry-date { font-size: 10px; color: #666; white-space: nowrap; }
      .entry-company { font-size: 10px; font-weight: 600; color: #4b5563; margin-bottom: 3px; }
      .responsibilities { font-size: 10px; color: #555; margin: 4px 0 0 20px; line-height: 1.4; }
      .responsibilities li { margin: 2px 0; }
      .lang-item { margin-bottom: 10px; font-size: 10px; }
      .lang-header { display: flex; justify-content: space-between; margin-bottom: 3px; font-size: 10px; }
      .lang-name { font-weight: 600; }
      .lang-level { color: #666; }
      .lang-bar { width: 100%; height: 4px; background: #e0e0e0; border-radius: 2px; overflow: hidden; }
      .lang-progress { height: 100%; background: linear-gradient(90deg, ${colors.primary}, ${colors.secondary}); }
      .bullet-list { font-size: 11px; margin: 0 0 0 20px; color: #555; line-height: 1.4; }
      .bullet-list li { margin: 3px 0; }
    </style>
    <div class="resume-page">
      <div class="header">
        <div class="avatar">
          ${data.profilePhoto ? `<img src="${data.profilePhoto}" alt="Profile" class="avatar-img" />` : `<div class="avatar-initials">${initials}</div>`}
        </div>
        <div class="name">${escapeHtml(data.firstName + ' ' + data.lastName)}</div>
        <div class="contact">
          ${data.email ? `<div class="contact-item">${escapeHtml(data.email)}</div>` : ''}
          ${data.phone ? `<div class="contact-item">${escapeHtml(data.phone)}</div>` : ''}
          ${data.location ? `<div class="contact-item">${escapeHtml(data.location)}</div>` : ''}
          ${data.linkedIn || data.portfolio ? `
          <div class="contact-item">
            ${data.linkedIn ? `<span>${escapeHtml(data.linkedIn)}</span>` : ''}
            ${data.linkedIn && data.portfolio ? `<span class="contact-separator">•</span>` : ''}
            ${data.portfolio ? `<span>${escapeHtml(data.portfolio)}</span>` : ''}
          </div>
          ` : ''}
        </div>
      </div>

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

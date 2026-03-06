/**
 * Google Gemini API Integration
 * For AI-powered resume suggestions and content generation
 */

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";

interface GenerateContentRequest {
  contents: Array<{
    parts: Array<{
      text: string;
    }>;
  }>;
}

interface GenerateContentResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string;
      }>;
    };
  }>;
}

/**
 * Generate a professional summary based on user information
 */
export async function generateProfessionalSummary(
  jobTitle: string,
  company: string,
  experience: string,
  skills: string[]
): Promise<string> {
  if (!GEMINI_API_KEY) {
    console.warn("VITE_GEMINI_API_KEY not set. Using placeholder summary.");
    return generatePlaceholderSummary(jobTitle, company, experience, skills);
  }

  const prompt = `Generate a professional resume summary for a person with the following background:
- Current/Most Recent Job Title: ${jobTitle}
- Company: ${company}
- Experience: ${experience}
- Key Skills: ${skills.join(", ")}

Please write a concise, compelling professional summary (2-3 sentences) suitable for a resume. The summary should highlight their strengths and career direction.`;

  try {
    const response = await fetch(
      `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
        } as GenerateContentRequest),
      }
    );

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.statusText}`);
    }

    const data = (await response.json()) as GenerateContentResponse;

    if (
      data.candidates &&
      data.candidates[0] &&
      data.candidates[0].content.parts[0]
    ) {
      return data.candidates[0].content.parts[0].text;
    }

    return generatePlaceholderSummary(jobTitle, company, experience, skills);
  } catch (error) {
    console.error("Error generating summary with Gemini API:", error);
    return generatePlaceholderSummary(jobTitle, company, experience, skills);
  }
}

/**
 * Generate skill suggestions based on job title and experience
 */
export async function generateSkillSuggestions(
  jobTitle: string,
  experience: string
): Promise<string[]> {
  if (!GEMINI_API_KEY) {
    console.warn("VITE_GEMINI_API_KEY not set. Using placeholder skills.");
    return generatePlaceholderSkills(jobTitle);
  }

  const prompt = `Based on the job title "${jobTitle}" and experience: "${experience}", 
suggest 10 relevant professional skills that someone in this role should have. 
Return only the skill names, one per line, without numbering or additional text.`;

  try {
    const response = await fetch(
      `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
        } as GenerateContentRequest),
      }
    );

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.statusText}`);
    }

    const data = (await response.json()) as GenerateContentResponse;

    if (
      data.candidates &&
      data.candidates[0] &&
      data.candidates[0].content.parts[0]
    ) {
      const text = data.candidates[0].content.parts[0].text;
      return text
        .split("\n")
        .filter((line: string) => line.trim().length > 0)
        .map((line: string) => line.trim().replace(/^[\d+\.\-\*]\s*/, ""));
    }

    return generatePlaceholderSkills(jobTitle);
  } catch (error) {
    console.error("Error generating skills with Gemini API:", error);
    return generatePlaceholderSkills(jobTitle);
  }
}

/**
 * Improve resume content using AI
 */
export async function improveResumeContent(
  content: string,
  context: "job_responsibility" | "summary" | "experience"
): Promise<string> {
  if (!GEMINI_API_KEY) {
    console.warn("VITE_GEMINI_API_KEY not set. Using original content.");
    return content;
  }

  const contextPrompts = {
    job_responsibility:
      "Improve this job responsibility description for a resume. Make it more impactful, action-oriented, and quantifiable if possible. Keep it concise.",
    summary:
      "Improve this professional summary. Make it more compelling and concise while maintaining the key points.",
    experience:
      "Improve this work experience description for a resume. Make it professional and impactful.",
  };

  const prompt = `${contextPrompts[context]}

Original: ${content}

Improved:`;

  try {
    const response = await fetch(
      `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
        } as GenerateContentRequest),
      }
    );

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.statusText}`);
    }

    const data = (await response.json()) as GenerateContentResponse;

    if (
      data.candidates &&
      data.candidates[0] &&
      data.candidates[0].content.parts[0]
    ) {
      return data.candidates[0].content.parts[0].text;
    }

    return content;
  } catch (error) {
    console.error("Error improving content with Gemini API:", error);
    return content;
  }
}

/**
 * Placeholder summary generator (fallback when API key is not available)
 */
function generatePlaceholderSummary(
  jobTitle: string,
  company: string,
  experience: string,
  skills: string[]
): string {
  return `Results-driven professional with expertise in ${skills.slice(0, 3).join(", ")}. Experienced ${jobTitle} at ${company} with a proven track record of ${experience}. Committed to delivering high-quality work and driving organizational success.`;
}

/**
 * Placeholder skills generator (fallback when API key is not available)
 */
function generatePlaceholderSkills(jobTitle: string): string[] {
  const skillsByRole: Record<string, string[]> = {
    developer: [
      "JavaScript",
      "React",
      "TypeScript",
      "Node.js",
      "HTML/CSS",
      "Git",
      "SQL",
      "API Development",
      "Problem Solving",
      "Team Collaboration",
    ],
    designer: [
      "UI Design",
      "UX Design",
      "Figma",
      "Adobe Creative Suite",
      "Prototyping",
      "User Research",
      "Visual Communication",
      "Web Design",
      "Mobile Design",
      "Design Systems",
    ],
    manager: [
      "Project Management",
      "Leadership",
      "Team Building",
      "Communication",
      "Strategic Planning",
      "Budget Management",
      "Problem Solving",
      "Decision Making",
      "Agile Methodology",
      "Performance Management",
    ],
    default: [
      "Communication",
      "Problem Solving",
      "Project Management",
      "Team Collaboration",
      "Leadership",
      "Time Management",
      "Critical Thinking",
      "Attention to Detail",
      "Organization",
      "Adaptability",
    ],
  };

  const role = jobTitle.toLowerCase();
  for (const [key, skills] of Object.entries(skillsByRole)) {
    if (role.includes(key)) {
      return skills;
    }
  }

  return skillsByRole.default;
}

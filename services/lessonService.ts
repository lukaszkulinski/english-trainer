
import { Chapter } from "../types";
import { LESSON_CONTENT } from "../data/lessonContent";

export const lessonService = {
  /**
   * Retrieves lesson content from the static dictionary.
   */
  async getLessonContent(chapter: Chapter): Promise<string> {
    // Simulate a tiny delay for UI consistency (optional, but feels smoother)
    await new Promise(resolve => setTimeout(resolve, 300));

    const content = LESSON_CONTENT[chapter.title];
    
    if (content) {
      return content;
    }

    // Fallback for chapters not yet implemented in the static file
    return `# ${chapter.title}\n\n## Lesson Coming Soon\nWe are currently finalizing the high-quality content for this lesson. Please check back in the next update!\n\nIn the meantime, you can practice this topic in the **Practice** section or ask the **AI Tutor** about it.`;
  }
};

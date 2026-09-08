/**
 * Repository & README Markdown Parser
 * Mahammad Irfan Shaik — ML Engineer & Data Scientist Portfolio
 */

(function(window) {
  'use strict';

  class RepositoryParser {
    /**
     * Cleans raw markdown: removes badges, HTML comments, shields.io URLs
     */
    static cleanMarkdown(rawMarkdown) {
      if (!rawMarkdown) return '';
      return rawMarkdown
        .replace(/<!--[\s\S]*?-->/g, '') // remove HTML comments
        .replace(/\[!\[.*?\]\(.*?\)\]\(.*?\)/g, '') // remove linked badges
        .replace(/!\[.*?\]\(.*?(?:shields\.io|badge|img\.shields).*?\)/gi, '') // remove shield badges
        .replace(/<div align="center">[\s\S]*?<\/div>/gi, (match) => {
          // Keep inner text if informative, else clean badge wrappers
          if (match.includes('shields.io') || match.includes('badge')) return '';
          return match.replace(/<[^>]+>/g, '');
        })
        .trim();
    }

    /**
     * Parses markdown headers (#, ##, ###) into structured sections
     */
    static parseSections(rawMarkdown) {
      const clean = this.cleanMarkdown(rawMarkdown);
      const lines = clean.split('\n');
      const sections = [];
      let currentSection = { title: 'Overview', level: 1, content: [] };

      lines.forEach(line => {
        const headerMatch = line.match(/^(#{1,4})\s+(.+)$/);
        if (headerMatch) {
          if (currentSection.content.length > 0 || currentSection.title !== 'Overview') {
            sections.push({
              title: currentSection.title.trim(),
              level: currentSection.level,
              text: currentSection.content.join('\n').trim()
            });
          }
          currentSection = {
            title: headerMatch[2].replace(/[#*_`]/g, '').trim(),
            level: headerMatch[1].length,
            content: []
          };
        } else {
          currentSection.content.push(line);
        }
      });

      if (currentSection.content.length > 0) {
        sections.push({
          title: currentSection.title.trim(),
          level: currentSection.level,
          text: currentSection.content.join('\n').trim()
        });
      }

      return sections;
    }

    /**
     * Maps raw parsed sections into standard Case Study fields
     */
    static extractStructuredData(repo, rawMarkdown) {
      const sections = this.parseSections(rawMarkdown);
      const result = {
        title: '',
        overview: '',
        problem: [],
        objectives: [],
        architecture: null,
        features: [],
        results: [],
        decisions: [],
        futureScope: []
      };

      // 1. Extract Title
      const h1Section = sections.find(s => s.level === 1);
      if (h1Section && h1Section.title) {
        result.title = h1Section.title.replace(/^Project:\s*/i, '').trim();
      }

      // 2. Extract Overview / First paragraph
      const overviewSection = sections.find(s =>
        /overview|about|introduction|summary/i.test(s.title)
      );

      if (overviewSection && overviewSection.text) {
        result.overview = this.getFirstParagraph(overviewSection.text);
      } else if (sections[0] && sections[0].text) {
        result.overview = this.getFirstParagraph(sections[0].text);
      } else if (repo.description) {
        result.overview = repo.description;
      }

      // 3. Section Pattern Matcher
      sections.forEach(sec => {
        const titleLower = sec.title.toLowerCase();

        // Problem Statement
        if (/problem|challenge|motivation|background/i.test(titleLower)) {
          const items = this.extractBulletPoints(sec.text);
          if (items.length > 0) result.problem.push(...items);
        }

        // Objectives / Goals
        if (/objective|goal|purpose|aim/i.test(titleLower)) {
          const items = this.extractBulletPoints(sec.text);
          if (items.length > 0) result.objectives.push(...items);
        }

        // Architecture / Workflow
        if (/architecture|workflow|pipeline flow|system design/i.test(titleLower)) {
          result.architecture = {
            description: this.getFirstParagraph(sec.text),
            steps: this.extractBulletPoints(sec.text)
          };
        }

        // Key Features / Pipeline
        if (/feature|pipeline|capability|components|modules/i.test(titleLower) && !/future/i.test(titleLower)) {
          const items = this.extractBulletPoints(sec.text);
          if (items.length > 0) result.features.push(...items);
        }

        // Results / Performance / Metrics
        if (/result|performance|evaluation|metric|accuracy|outcome/i.test(titleLower)) {
          const items = this.extractBulletPoints(sec.text);
          if (items.length > 0) result.results.push(...items);
        }

        // Engineering Decisions
        if (/decision|why|trade-off|choice/i.test(titleLower)) {
          const items = this.extractBulletPoints(sec.text);
          if (items.length > 0) result.decisions.push(...items);
        }

        // Future Scope / Roadmap / Improvements
        if (/future|roadmap|next step|enhancement|improvement/i.test(titleLower)) {
          const items = this.extractBulletPoints(sec.text);
          if (items.length > 0) result.futureScope.push(...items);
        }
      });

      return result;
    }

    /**
     * Extracts the first meaningful non-heading text paragraph
     */
    static getFirstParagraph(text) {
      if (!text) return '';
      const paras = text.split(/\n\s*\n/);
      for (const p of paras) {
        const cleaned = p.replace(/^[-*#\s>]+/, '').trim();
        if (cleaned.length > 20 && !cleaned.startsWith('![')) {
          return cleaned;
        }
      }
      return text.substring(0, 200).trim();
    }

    /**
     * Extracts bullet points or list items from text
     */
    static extractBulletPoints(text) {
      if (!text) return [];
      const lines = text.split('\n');
      const items = [];

      lines.forEach(line => {
        const bulletMatch = line.match(/^\s*[-*+]\s+(.+)$/) || line.match(/^\s*\d+\.\s+(.+)$/);
        if (bulletMatch) {
          const itemText = bulletMatch[1].replace(/[*_`]/g, '').trim();
          if (itemText.length > 5) {
            items.push(itemText);
          }
        }
      });

      // If no bullet points found, split by sentences
      if (items.length === 0) {
        const sentences = text.split(/(?<=[.!?])\s+/).filter(s => s.trim().length > 15);
        return sentences.slice(0, 4);
      }

      return items;
    }

    /**
     * Safely escapes HTML special characters to prevent XSS
     */
    static escapeHtml(str) {
      if (!str) return '';
      return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    }
  }

  window.RepositoryParser = RepositoryParser;
})(window);

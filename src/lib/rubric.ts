import { Facet, FacetEvaluation, PlaybookItem } from "./types";

// Enhanced pattern detection functions
function containsAbsoluteLanguage(text: string): boolean {
  // More specific absolute language detection - avoid false positives with common words
  return /\b(always|never|every|everything|completely|entirely|totally|absolutely|invariably|without exception)\b/i.test(text) ||
         /\ball\s+(students|faculty|people|cases|research|studies|evidence)\b/i.test(text);
}

function hasConditionMarker(text: string): boolean {
  return /(when|if|under|in cases where|provided that|given that|tends to|generally|typically|often|usually|in contexts)/i.test(text);
}

function isContestable(text: string): boolean {
  // Enhanced contestability detection
  const assertionPatterns = /(predict|argue|claim|suggest|propose|assert|maintain|contend|hypothesis|theorize)/i;
  const causalPatterns = /(cause|lead to|result in|increase|decrease|improve|reduce|enhance|affect|influence|impact)/i;
  const comparisonPatterns = /(better|worse|more effective|less effective|superior|inferior|outperform)/i;

  return assertionPatterns.test(text) || causalPatterns.test(text) || comparisonPatterns.test(text);
}

function hasEvidenceSpecificity(text: string): boolean {
  const sourcePatterns = /(study|studies|research|trial|experiment|survey|data|dataset|analysis|meta-analysis|review|database|PubMed|Google Scholar)/i;
  const methodPatterns = /(randomized|controlled|longitudinal|cross-sectional|qualitative|quantitative|sample|participants|subjects)/i;
  const criteriaPatterns = /(reliable|valid|peer-reviewed|published|credible|trustworthy|methodology|quality)/i;

  return sourcePatterns.test(text) && (methodPatterns.test(text) || criteriaPatterns.test(text));
}

function hasExplicitWarrant(text: string): boolean {
  const causalLinkage = /(because|since|therefore|thus|hence|consequently|as a result|due to|owing to)/i;
  const mechanismWords = /(mechanism|principle|rule|theory|process|pathway|explains why|reason that)/i;

  return causalLinkage.test(text) && mechanismWords.test(text);
}

function hasTheoreticalBacking(text: string): boolean {
  const theoryPatterns = /(theory|model|framework|paradigm|research by|studies by|meta-analysis|systematic review)/i;
  const citationPatterns = /\(\w+,?\s*\d{4}\)|[\w\s]+\s*\(\d{4}\)/; // Basic citation pattern

  return theoryPatterns.test(text) || citationPatterns.test(text);
}

function hasQualifyingLanguage(text: string): boolean {
  const qualifierPatterns = /(generally|typically|tends to|likely|probably|may|might|often|usually|sometimes|appears to|suggests that)/i;
  const conditionalPatterns = /(under certain conditions|in specific contexts|for some|among|approximately|around|roughly)/i;

  return qualifierPatterns.test(text) || conditionalPatterns.test(text);
}

function hasStrongCounterargument(text: string): boolean {
  const counterPatterns = /(critics|opponents|skeptics|however|conversely|on the other hand|counterargument|objection|limitation)/i;
  const responsePatterns = /(address|respond|counter|mitigate|acknowledge|account for)/i;

  return counterPatterns.test(text) && responsePatterns.test(text);
}

function calculateClaimLevel(text: string): {level: 1 | 2 | 3 | 4, issues: string[]} {
  const issues: string[] = [];
  const hasAbsolute = containsAbsoluteLanguage(text);
  const hasConditions = hasConditionMarker(text);
  const isDebatable = isContestable(text);
  const length = text.length;

  // Only flag absolute language if it's present AND no conditions are specified
  if (hasAbsolute && !hasConditions) {
    issues.push("I see absolute language (always/all/never). Please specify conditions.");
  }

  // Only flag if not debatable
  if (!isDebatable) {
    issues.push("Express a clear 'position' rather than just observational facts.");
  }

  // Only flag if no evidence/methodology mention and no conditions
  if (!hasConditions && !/(evidence|data|study|research|experiment|analysis|method)/i.test(text)) {
    issues.push("Add a sentence about what evidence could verify this claim.");
  }

  // Sophisticated level calculation - pass if meets criteria and has few issues
  if (isDebatable && hasConditions && !hasAbsolute && length > 50 && issues.length === 0) return {level: 4, issues};
  if (isDebatable && (hasConditions || length > 30) && issues.length <= 1) return {level: 3, issues};
  if ((isDebatable || hasConditions) && issues.length <= 2) return {level: 2, issues};
  return {level: 1, issues};
}

function calculateEvidenceLevel(text: string): {level: 1 | 2 | 3 | 4, issues: string[]} {
  const issues: string[] = [];
  const hasSpecificity = hasEvidenceSpecificity(text);
  const hasGenericMention = /(evidence|data|research|study)/i.test(text);
  const length = text.length;

  if (!hasGenericMention) {
    issues.push("Specify the source or collection method of evidence.");
  }
  if (!/(reliable|valid|credible|peer-reviewed|quality|criteria)/i.test(text)) {
    issues.push("State 1-2 evaluation criteria (reliability, validity, reproducibility, etc.).");
  }

  if (hasSpecificity && length > 80) return {level: 4, issues};
  if (hasSpecificity || (hasGenericMention && length > 50)) return {level: 3, issues};
  if (hasGenericMention) return {level: 2, issues};
  return {level: 1, issues};
}

function calculateReasoningLevel(text: string): {level: 1 | 2 | 3 | 4, issues: string[]} {
  const issues: string[] = [];
  const hasExplicit = hasExplicitWarrant(text);
  const hasCausal = /(because|since|therefore|thus|mechanism)/i.test(text);
  const length = text.length;

  if (!hasCausal) {
    issues.push("Write the rule in one sentence using 'because/since/therefore'.");
  }
  if (!/(condition|when|if|under)/i.test(text)) {
    issues.push("Specify the conditions under which generalization holds.");
  }

  if (hasExplicit && length > 60) return {level: 4, issues};
  if (hasExplicit || (hasCausal && length > 40)) return {level: 3, issues};
  if (hasCausal) return {level: 2, issues};
  return {level: 1, issues};
}

function calculateBackingLevel(text: string): {level: 1 | 2 | 3 | 4, issues: string[]} {
  const issues: string[] = [];
  const hasTheoretical = hasTheoreticalBacking(text);
  const hasBasicMention = /(research|study|theory)/i.test(text);

  if (!hasBasicMention) {
    issues.push("Briefly mention 1-2 prior studies/theories.");
  }
  if (!hasTheoreticalBacking(text)) {
    issues.push("If possible, provide simple citation format (author, year).");
  }

  if (hasTheoretical && text.length > 80) return {level: 4, issues};
  if (hasTheoretical || (hasBasicMention && text.length > 40)) return {level: 3, issues};
  if (hasBasicMention) return {level: 2, issues};
  return {level: 1, issues};
}

function calculateQualifierLevel(text: string): {level: 1 | 2 | 3 | 4, issues: string[]} {
  const issues: string[] = [];
  const hasQualifying = hasQualifyingLanguage(text);
  const hasAbsolute = containsAbsoluteLanguage(text);

  if (hasAbsolute) {
    issues.push("Use expressions like 'generally/tends to/likely' and conditional clauses.");
  }
  if (!/(limitation|condition|except|but|however)/i.test(text)) {
    issues.push("Briefly mention situations where it might not hold.");
  }

  if (hasQualifying && !hasAbsolute && text.length > 60) return {level: 4, issues};
  if (hasQualifying && !hasAbsolute) return {level: 3, issues};
  if (hasQualifying || text.length > 30) return {level: 2, issues};
  return {level: 1, issues};
}

function calculateRebuttalLevel(text: string): {level: 1 | 2 | 3 | 4, issues: string[]} {
  const issues: string[] = [];
  const hasStrong = hasStrongCounterargument(text);
  const hasBasicCounter = /(counter|against|opposition|disagree|criticize)/i.test(text);

  if (!hasBasicCounter) {
    issues.push("Make the counterargument stronger (focus on strengths, not weaknesses).");
  }
  if (!/(response|address|counter|mitigate)/i.test(text)) {
    issues.push("Summarize your response strategy in one sentence.");
  }

  if (hasStrong && text.length > 100) return {level: 4, issues};
  if (hasStrong || (hasBasicCounter && text.length > 60)) return {level: 3, issues};
  if (hasBasicCounter) return {level: 2, issues};
  return {level: 1, issues};
}

export function evaluateFacetAnswer(item: PlaybookItem, answer: string): FacetEvaluation {
  const a = String(answer || "").trim();

  if (a.length < 10) {
    return { passed: false, level: 1, nudges: ["Please provide a more detailed response."] };
  }

  let result: {level: 1 | 2 | 3 | 4, issues: string[]};

  switch (item.facet as Facet) {
    case "claim":
      result = calculateClaimLevel(a);
      break;
    case "evidence":
      result = calculateEvidenceLevel(a);
      break;
    case "reasoning":
      result = calculateReasoningLevel(a);
      break;
    case "backing":
      result = calculateBackingLevel(a);
      break;
    case "qualifier":
      result = calculateQualifierLevel(a);
      break;
    case "rebuttal":
      result = calculateRebuttalLevel(a);
      break;
    default:
      result = {level: 1, issues: ["Unknown facet type"]};
  }

  const passed = item.passThreshold === "meets_all" ? result.level >= 4 :
                item.passThreshold === "proficient" ? result.level >= 3 :
                result.level >= 2;
  const mergedNudges = passed ? [] : Array.from(new Set([...(item.nudges || []), ...result.issues])).slice(0, 3);

  return { passed, level: result.level, nudges: mergedNudges };
}

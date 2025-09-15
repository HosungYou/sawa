# SAWA Release Notes

## v1.3.1 - Evaluation Logic Fixes
*Release Date: September 14, 2024*

### 🐛 Bug Fixes

#### Fixed Evaluation Logic Issues
- **Resolved identical feedback loop**: Fixed issue where users received same feedback repeatedly without progression
- **Improved absolute language detection**: Refined pattern matching to avoid false positives with common words like "all"
- **Enhanced pass threshold logic**: Changed default threshold from "meets_all" (Level 4) to "proficient" (Level 3) for better progression
- **Fixed condition detection**: Corrected logic for detecting conditional statements and evidence mentions

#### Technical Improvements
- **Pattern Refinement**: Used word boundary regex (`\b`) for more precise absolute language detection
- **Logic Restructuring**: Improved evaluation criteria to prevent conflicting feedback
- **Threshold Optimization**: Better balance between rigor and accessibility in evaluation standards

### 🚀 Impact
- Users can now progress through coaching steps more fluidly
- Feedback is more contextually appropriate and actionable
- Evaluation standards better reflect real-world research writing expectations

---

## v1.3.0 - Enhanced Evaluation Engine Release
*Release Date: September 14, 2024*

### 🚀 Major Features

#### 4-Level Rubric System
- **Advanced Evaluation**: Replaced binary pass/fail with sophisticated 1-4 level scoring
- **Detailed Criteria**: Each facet now has specific criteria for Weak (1), Developing (2), Proficient (3), and Advanced (4) levels
- **Nuanced Assessment**: More accurate evaluation of student responses with targeted feedback

#### Comprehensive Example Database
- **Rich Examples**: Expanded from basic weak examples to comprehensive weak/strong pairs
- **Contextual Guidance**: Specific improvement suggestions for each example type
- **Research-Based**: Examples aligned with actual academic writing scenarios

#### Enhanced Pattern Detection
- **Sophisticated Algorithms**: Improved from basic regex to multi-dimensional pattern analysis
- **English-Focused**: Optimized detection patterns for academic English writing
- **Context-Aware**: Length, complexity, and semantic analysis for better accuracy

### 🎯 Evaluation Improvements

#### Claim Assessment
- **Contestability Detection**: Enhanced recognition of debatable positions vs. factual statements
- **Condition Markers**: Sophisticated detection of qualifying language and scope specification
- **Absolute Language**: Improved identification of overconfident assertions

#### Evidence Evaluation
- **Specificity Analysis**: Multi-layered assessment of source quality and methodology
- **Criteria Recognition**: Detection of reliability, validity, and credibility markers
- **Connection Assessment**: Evaluation of evidence-claim relationship strength

#### Reasoning Analysis
- **Warrant Detection**: Enhanced recognition of logical mechanisms and causal pathways
- **Explicit Linkage**: Identification of "because/since/therefore" reasoning structures
- **Mechanism Recognition**: Detection of underlying principles and rules

#### Backing Validation
- **Citation Recognition**: Basic citation pattern detection (Author, Year format)
- **Theoretical Framework**: Recognition of established theories and research traditions
- **Source Quality**: Assessment of academic credibility markers

#### Qualifier Assessment
- **Confidence Calibration**: Detection of appropriate qualifying language
- **Condition Recognition**: Identification of boundary conditions and limitations
- **Absolute Language**: Enhanced detection and flagging of overconfident claims

#### Rebuttal Analysis
- **Counterargument Strength**: Assessment of objection quality and fairness
- **Response Strategy**: Evaluation of mitigation and addressing techniques
- **Balance Recognition**: Detection of fair representation of opposing views

### 🎨 UI/UX Enhancements

#### Visual Feedback System
- **Level Indicators**: Color-coded badges showing 1-4 performance levels
- **Progress Visualization**: Clear distinction between Weak, Developing, Proficient, and Advanced
- **Contextual Colors**: Green (Advanced), Blue (Proficient), Yellow (Developing), Red (Weak)

#### Enhanced User Experience
- **Real-Time Assessment**: Immediate level feedback upon submission
- **Detailed Descriptions**: Clear explanations of each performance level
- **Motivational Design**: Positive reinforcement for higher levels achieved

### 🔧 Technical Architecture

#### Type System Updates
- **Enhanced Interfaces**: Updated TypeScript definitions for rubric levels
- **Flexible Configuration**: Support for detailed rubric criteria in playbook
- **Backward Compatibility**: Maintains existing API structure

#### Evaluation Engine
- **Modular Design**: Separate evaluation functions for each facet type
- **Scalable Patterns**: Easy addition of new detection patterns
- **Performance Optimized**: Efficient text analysis algorithms

### 📊 Quality Metrics

#### Assessment Accuracy
- **Multi-Dimensional Scoring**: Considers multiple factors beyond simple pattern matching
- **Length Considerations**: Accounts for response depth and detail
- **Semantic Analysis**: Basic understanding of content meaning

#### Feedback Quality
- **Targeted Nudges**: Specific improvement suggestions based on detected issues
- **Prioritized Guidance**: Most important feedback presented first
- **Actionable Advice**: Clear steps for improvement

### 🔄 Migration Notes

#### Configuration Updates
- **Playbook Enhancement**: Added `rubricLevels` and enhanced `anchoredExamples`
- **Backward Compatibility**: Existing configurations continue to work
- **Gradual Migration**: Can adopt new features incrementally

#### API Consistency
- **Existing Endpoints**: All current API routes unchanged
- **Enhanced Responses**: Additional `level` field in evaluation responses
- **Session Management**: Existing session structure preserved

### 🎓 Educational Impact

#### Improved Learning Experience
- **Clear Progression**: Students can see their improvement across 4 levels
- **Specific Guidance**: Targeted feedback for each performance level
- **Motivational Framework**: Achievement system encourages improvement

#### Assessment Sophistication
- **Research Alignment**: Evaluation criteria based on academic writing standards
- **Comprehensive Coverage**: All aspects of argumentative writing addressed
- **Scaffolded Development**: Progressive skill building through detailed rubrics

---

*This release significantly enhances the evaluation sophistication while maintaining the core Socratic methodology and student autonomy principles.*

## v1.2.1 - Improved Question Clarity Release
*Release Date: September 14, 2024*

### 🔧 Bug Fixes & Improvements

#### Enhanced Question Design
- **More Specific Prompts**: Replaced abstract questions with concrete, actionable prompts
- **Research-Oriented**: Questions now guide users through actual research scenarios
- **Step-by-Step Guidance**: Each question provides clear direction and context

#### Updated Question Framework

**Claim Module**
- **Before**: "Present your scientific claim in one sentence"
- **After**: "What specific research question are you investigating, and what do you predict the answer will be? Frame this as a testable claim about cause, effect, or relationship between variables."

**Evidence Module**
- **More Specific**: "What specific types of evidence will you need to test your claim? Describe your data sources, methodology, or literature you'll examine."
- **Evaluation Focus**: "What criteria will you use to evaluate whether this evidence is trustworthy and relevant to your claim?"

**Reasoning Module**
- **Clearer Logic**: "Explain the logical connection: WHY does your evidence support your claim? What rule, principle, or mechanism makes this connection valid?"

**Backing Module**
- **Citation Guidance**: "What established theory, prior research, or scholarly work supports the reasoning you just described? Provide 1-2 credible sources."

**Qualifier Module**
- **Confidence Calibration**: "How confident are you in your claim? Under what conditions might it be true, and when might it not apply? Use qualifying language to show appropriate certainty."

**Rebuttal Module**
- **Structured Opposition**: "What is the strongest objection someone could raise against your argument? Present this counterargument fairly, then explain how you would address it."

#### Pedagogical Improvements
- **Contextual Learning**: Questions now provide learning context within the prompt
- **Research Skills**: Emphasis on actual research methodology and critical thinking
- **Academic Standards**: Questions align with university-level argumentation standards

### 🤖 AI Role Clarification

#### What AI Does in SAWA
- **Pattern Recognition**: Detects linguistic patterns (absolute language, hedging, evidence markers)
- **Structural Evaluation**: Assesses argument completeness based on Toulmin model
- **Pass/Fail Assessment**: Determines if responses meet threshold criteria
- **Nudge Generation**: Provides rule-based feedback for improvement

#### What AI Does NOT Do
- ❌ **No Content Generation**: Never writes or suggests specific content
- ❌ **No Evidence Creation**: Never invents or recommends evidence
- ❌ **No Co-Writing**: Strictly prohibits collaborative writing
- ❌ **No Answer Suggestions**: Only provides structural feedback

#### Evaluation Method
- **Heuristic-Based**: Uses regex patterns and keyword detection
- **Rule-Driven**: Follows predetermined rubric criteria
- **Student-Centered**: Maintains student autonomy in content creation
- **Socratic Purity**: Focuses on questioning rather than answering

### 🎯 User Experience Impact
- **Reduced Cognitive Load**: Clearer questions reduce confusion
- **Better Scaffolding**: Progressive skill building through structured prompts
- **Research Alignment**: Questions mirror actual academic research process
- **Confidence Building**: Students understand what's expected at each step

---

*This release addresses user feedback about question clarity while maintaining the core Socratic methodology and student autonomy principles.*

## v1.2.0 - English Localization Release
*Release Date: September 14, 2024*

### 🌍 Internationalization

#### Complete English Interface
- **Full UI Translation**: All frontend text converted from Korean to English
- **Playbook Localization**: Complete translation of coaching questions, nudges, and feedback
- **User Experience**: Consistent English terminology throughout the application
- **Professional Language**: Academic English suitable for international users

#### Updated Components
- **Main Interface**: All button labels, form fields, and navigation in English
- **Progress Tracking**: "Progress" instead of "진행률", "Current" instead of "진행 중"
- **Feedback System**: English nudges and evaluation criteria
- **Export Feature**: "Export Prep Sheet" and "Copy to Clipboard" functionality

#### Coaching Content Translation
- **Questions**: All Socratic questions translated to clear, academic English
- **Checklists**: Evaluation criteria in professional English
- **Nudges**: Constructive feedback messages in supportive English tone
- **Examples**: Sample weak/strong responses updated for English context

### 📝 Updated Playbook Content

#### Claim Module
- Goal: "Contestable, scoped, evidence-addressable scientific claim"
- Questions: "Present your scientific claim in one sentence. (Include conditions/scope)"
- Nudges: Focus on avoiding absolute language and specifying conditions

#### Evidence Module
- Emphasis on evidence types, sources, and evaluation criteria
- Questions about reliability assessment and bias consideration
- Clear connection requirements between claims and evidence

#### Reasoning Module
- Focus on explicit warrants and mechanisms
- "Because/since/therefore" language for logical connections
- Generalization conditions and scope specification

#### Backing Module
- Theoretical foundations and prior research requirements
- Citation format guidance (author, year)
- Brief but substantive backing expectations

#### Qualifier Module
- Appropriate claim strength calibration
- Use of hedge words and conditional language
- Recognition of limitation contexts

#### Rebuttal Module
- Strong counterargument presentation
- Fair and balanced opposition viewpoints
- Strategic response development

### 🔧 Technical Updates

#### Consistent Terminology
- **Facet Labels**: Claim, Evidence, Reasoning, Backing, Qualifier, Rebuttal
- **UI Elements**: Progress bars, step indicators, form labels
- **Status Messages**: Loading states, success confirmations, error messages

#### Maintained Functionality
- All API endpoints unchanged
- Session management preserved
- Evaluation logic intact
- Export functionality working

### 🎯 Target Audience Expansion

#### International Accessibility
- **Global Academic Market**: Suitable for English-speaking institutions
- **Research Community**: International research methodology training
- **Academic Writing**: Compatible with global academic standards
- **Cross-Cultural**: Universal argumentation principles

#### Educational Benefits
- **Clear Instructions**: Unambiguous English guidance
- **Academic Tone**: Professional language appropriate for higher education
- **Consistent Terminology**: Standardized vocabulary throughout
- **International Standards**: Aligned with global academic writing practices

### 🔄 Backward Compatibility
- Session storage format unchanged
- API structure preserved
- Configuration file format maintained
- All existing functionality intact

### 📊 Quality Assurance
- **Translation Accuracy**: Professional academic English
- **Consistency**: Uniform terminology across all components
- **Clarity**: Clear, actionable instructions and feedback
- **Accessibility**: Suitable for non-native English speakers in academic contexts

---

*This release makes SAWA accessible to the global academic community while maintaining all core Socratic coaching functionality.*

## v1.1.0 - Enhanced UI/UX Release
*Release Date: September 14, 2024*

### 🎨 UI/UX Improvements

#### Enhanced Visual Design
- **Responsive Layout**: New grid-based layout with sidebar navigation and main content area
- **Progress Visualization**: Real-time progress bar showing completion percentage
- **Modern Design System**: Updated color palette, spacing, and typography for better readability
- **Professional Header**: Branded header with project description

#### Improved User Experience
- **Step-by-Step Navigation**: Visual progress sidebar with step indicators
- **Status Indicators**: Clear visual feedback for current, completed, and pending steps
- **Loading States**: Submit button shows loading state during API calls
- **Character Counter**: Real-time character count for text inputs
- **Better Form Design**: Enhanced textarea with focus states and improved styling

#### Enhanced Feedback System
- **Contextual Icons**: Warning and success icons for better visual hierarchy
- **Improved Nudge Display**: Better formatted feedback with amber color scheme
- **Success Celebration**: Congratulatory message with checkmark icon upon completion
- **Copy to Clipboard**: Easy copy functionality for generated prep sheets

#### Accessibility & Usability
- **Keyboard Navigation**: Better focus management and tab order
- **Screen Reader Support**: Semantic HTML structure with proper ARIA labels
- **Responsive Design**: Mobile-friendly layout that works on all screen sizes
- **Clear Visual Hierarchy**: Improved typography and spacing

### 🔧 Technical Improvements

#### Component Architecture
- **Reusable Components**: New `ProgressBar` and `StepIndicator` components in `/src/components/`
- **Better State Management**: Enhanced loading states and error handling
- **Type Safety**: Improved TypeScript interfaces for better development experience

#### Enhanced Functionality
- **Completion Tracking**: Better tracking of completed vs. current facets
- **Visual Progress**: Dynamic progress calculation with smooth animations
- **Submit Protection**: Prevents double-submission with loading states

### 📱 Design System Updates

#### Layout Structure
- **Sidebar Navigation**: Persistent progress tracking in left sidebar
- **Main Content Area**: Focused content area with proper whitespace
- **Card-Based Design**: Content organized in clean, bordered cards
- **Consistent Spacing**: Systematic spacing using Tailwind's spacing scale

#### Color Scheme
- **Primary Blue**: #2563eb for active states and progress
- **Success Green**: #16a34a for completed states
- **Warning Amber**: #f59e0b for feedback and nudges
- **Neutral Grays**: Consistent gray palette for text and backgrounds

#### Interactive Elements
- **Button States**: Proper hover, disabled, and loading states
- **Focus Indicators**: Clear focus rings for keyboard navigation
- **Smooth Transitions**: CSS transitions for better perceived performance

### 🔄 Backward Compatibility
- All existing API endpoints remain unchanged
- Session state structure preserved
- Playbook configuration format unchanged
- Core Socratic logic untouched

### 📊 User Experience Metrics
- **Visual Hierarchy**: Improved scanability with clear section divisions
- **Cognitive Load**: Reduced mental effort with better progress visualization
- **Task Completion**: Clearer path to completion with step indicators
- **Error Recovery**: Better feedback for failed submissions

### 🎯 Impact
- **Professional Appearance**: Enterprise-ready interface suitable for educational institutions
- **User Engagement**: More engaging experience with visual progress feedback
- **Accessibility**: Improved usability for diverse user needs
- **Scalability**: Component-based architecture ready for future enhancements

---

*This release significantly improves the user experience while maintaining the core Socratic coaching principles and functionality.*

## v1.0.0 - Initial MVP Release
*Release Date: September 14, 2024*

### 🎯 Overview
First stable release of SAWA (Socratic Writing Coach) - a Socratic methodology-based pre-writing coach that generates structured prep sheets without co-writing or inventing evidence.

### ✨ Features

#### Core Socratic Engine
- **6-Stage Coaching Process**: Claim → Evidence → Reasoning → Backing → Qualifier → Rebuttal
- **Question-Driven Approach**: One module at a time with focused Socratic questioning
- **Rule-Based Evaluation**: Heuristic assessment with pass/fail thresholds
- **Nudge System**: Principle-based feedback without co-writing

#### Playbook System
- **Structured Configuration**: `config/sawa-playbook.json` with module definitions
- **Korean Language Support**: Bilingual interface with Korean educational context
- **Anchored Examples**: Contextual examples for student guidance
- **Pass Thresholds**: Configurable criteria ("meets_all" or "meets_most")

#### Session Management
- **Stateful Sessions**: UUID-based session tracking with file storage
- **Progress Tracking**: Sequential module advancement
- **History Logging**: Complete interaction history with timestamps
- **Export Functionality**: Markdown prep sheet generation

#### User Interface
- **Step-by-Step Wizard**: Linear progression through 6 modules
- **Real-Time Feedback**: Immediate nudge display for failed evaluations
- **Clean Interface**: Minimal, focused design for writing coaching

### 🏗️ Technical Architecture

#### Backend (`src/lib/`)
- **Flow Engine** (`flow.ts`): Session initialization, facet transitions, prep sheet building
- **Rubric System** (`rubric.ts`): Heuristic evaluation with pattern matching
- **Playbook Loader** (`playbook.ts`): Configuration management
- **File Storage** (`store.ts`): JSON-based session persistence
- **Type Safety** (`types.ts`): Complete TypeScript definitions

#### Frontend (`src/app/`)
- **Next.js 15.5.3**: React-based with Turbopack
- **API Routes**: RESTful endpoints for session management
- **Client Components**: Interactive coaching interface
- **Tailwind CSS**: Utility-first styling

#### Configuration
- **Modular Design**: Each facet with goals, checklists, questions, nudges
- **Evaluation Rules**: Pattern-based assessment for Korean/English text
- **Example Library**: Weak examples with improvement guidance

### 🔍 Evaluation Capabilities

#### Text Analysis Heuristics
- **Claim Assessment**: Contestability, scope, evidence-addressability
- **Evidence Evaluation**: Source identification, reliability criteria
- **Reasoning Analysis**: Warrant detection, mechanism explanation
- **Backing Validation**: Theoretical foundation checking
- **Qualifier Recognition**: Strength calibration, condition markers
- **Rebuttal Assessment**: Counterargument and response strategy

#### Language Processing
- **Bilingual Support**: Korean/English pattern recognition
- **Academic Writing Focus**: Scientific claim evaluation
- **Domain Flexibility**: Adaptable to various subjects

### 📝 Anti-Goals Implementation
- **No Co-Writing**: Strict prohibition on paragraph generation/rewriting
- **No Evidence Creation**: Students must provide their own sources
- **Coaching Type Guards**: Detection and rejection of inappropriate requests
- **Student Autonomy**: Focus on guidance rather than content creation

### 🎓 Educational Design
- **Toulmin Model**: Based on structured argumentation framework
- **Scaffolded Learning**: Progressive skill building through modules
- **Metacognitive Support**: Explicit reasoning process guidance
- **Korean Academic Context**: Culturally appropriate educational approach

### 📊 Current Limitations
- Basic UI without progress visualization
- No navigation between completed steps
- File-based storage (not production-scalable)
- Limited error handling in API endpoints
- No instructor dashboard or analytics

### 🔧 Technical Stack
- **Runtime**: Node.js with TypeScript
- **Framework**: Next.js 15.5.3 (App Router)
- **Storage**: File system JSON
- **Styling**: Tailwind CSS 4
- **Dependencies**: Minimal external dependencies for maintainability

### 📦 File Structure
```
src/
├── app/
│   ├── api/session/          # Session management endpoints
│   ├── coach/page.tsx        # Main coaching interface
│   └── layout.tsx           # App layout
├── lib/
│   ├── flow.ts              # Session flow logic
│   ├── rubric.ts            # Evaluation engine
│   ├── playbook.ts          # Configuration loader
│   ├── store.ts             # Session persistence
│   └── types.ts             # TypeScript definitions
config/
└── sawa-playbook.json       # Module configurations
```

### 🎯 Success Metrics
- **Functional MVP**: All 6 modules operational
- **Type Safety**: 100% TypeScript coverage
- **Evaluation Engine**: Heuristic-based assessment working
- **Session Persistence**: State management functional
- **Export Capability**: Prep sheet generation working

---

*This release establishes the foundation for Socratic writing coaching with a focus on student autonomy and structured argumentation development.*
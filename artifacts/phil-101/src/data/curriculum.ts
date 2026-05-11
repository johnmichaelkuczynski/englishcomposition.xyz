// AUTO-GENERATED from attached_assets/Clean_EngComp_101_Course_Book.docx — verbatim curriculum content.

export interface Module {
  id: string;
  number: number;
  title: string;
  points: number;
  type: "discussion" | "essay" | "termpaper";
  objectives: string[];
  reading: string;
  assignment: string;
  modelResponse: string;
}

export const modules: Module[] = [
  {
    id: "d1",
    number: 1,
    title: "Discussion 1: The Rhetorical Situation",
    points: 50,
    type: "discussion",
    objectives: [
      "Identify the three core components of the rhetorical situation (writer, audience, purpose).",
      "Analyze a real-world piece of writing in terms of how one component is handled and what it reveals about writing more generally.",
    ],
    reading: `Every act of writing happens inside a rhetorical situation. The rhetorical situation has three core components, all of which shape what counts as effective writing in any given case:

Writer — The person producing the text, including their purpose, knowledge, and credibility
  - What is the writer trying to accomplish?
  - What knowledge or authority does the writer bring?
  - How does the writer want to be perceived?

Audience — The people the text is being written for
  - Who will read this and in what context?
  - What does the audience already know, believe, or expect?
  - What objections will the audience bring to the text?

Purpose — What the text is trying to do
  - Is the goal to inform, persuade, entertain, or instruct?
  - What change does the writer want in the reader?
  - What counts as success for this particular piece of writing?`,
    assignment: `Assignment (50 points):
1. Choose one of the three components of the rhetorical situation
2. Identify a piece of real-world writing (an article, an email, a flyer, a social-media post) where this component is being handled well or poorly
3. Explain in detail:
   - Why this component is decisive in this case
   - What the writer gets right or wrong about it
   - How the writing would change if this component were rethought
   - What this case reveals about writing more generally`,
    modelResponse: `Model Response:
Component: Audience
Case: A university financial-aid office sends an email titled "Notice of Verification Requirement" to incoming first-year students. The email opens with the line: "Pursuant to 34 CFR 668.54, your file has been selected for verification, and disbursement of Title IV funds will be withheld pending receipt of supporting documentation."

Analysis: The audience is eighteen-year-olds, most of whom are the first in their families to attend college, almost none of whom have ever heard of Title IV, federal regulation citations, or "verification" in this technical sense. The writer has chosen a register appropriate for a federal compliance auditor, not for the actual reader.

The audience is decisive here because the entire purpose of the email — getting the student to send in tax documents — depends on the student understanding what is being asked. A regulator-facing email might be technically correct and still fail completely as writing, because it produces no action in the actual reader. The most likely outcomes are: the student deletes the email, panics, or forwards it to a parent who also does not know what Title IV is.

What the writer gets wrong is treating the audience as if it shares the writer's professional vocabulary. The writer probably drafted this in the institutional voice they use with auditors and supervisors, then sent the same text to first-year students. This is the most common writing failure in institutional contexts: the writer thinks of the document as a record rather than as a message to a specific person.

If the audience were genuinely thought through, the email would open with a plain sentence: "You need to send us a copy of your tax return so we can release your financial aid." The regulatory citation could go in a footer or be removed entirely. The deadline and the consequence would be in bold.

This case reveals that audience is not a soft or stylistic concern. It is the difference between writing that does its job and writing that fails despite being technically accurate. A financial-aid office that loses students to administrative confusion has misunderstood what writing is for.

Why This is a Model Response:
1. Clear structure and organization:
   - Identifies chosen component clearly
   - Presents specific real-world case
   - Develops analysis systematically
2. Demonstrates understanding of the rhetorical situation:
   - Properly situates the component within the larger framework
   - Shows why audience determines effectiveness
   - Engages with the gap between writer's voice and reader's needs
3. Original thinking:
   - Uses contemporary, recognizable example
   - Diagnoses a real institutional pattern
   - Develops practical implications
4. Depth of analysis:
   - Identifies multiple consequences
   - Shows how revision would proceed
   - Generalizes to a wider claim about writing
5. Clear writing:
   - Uses concrete examples
   - Avoids jargon
   - Maintains logical flow
6. Meets assignment requirements:
   - Explains why the component is decisive
   - Discusses what the writer got wrong
   - Considers implications for writing generally`,
  },
  {
    id: "e1",
    number: 2,
    title: "Essay 1: Audience and Purpose",
    points: 50,
    type: "essay",
    objectives: [
      "Define audience and purpose and analyze how each shapes evidence, organization, and word choice.",
      "Rewrite a single piece of content for three different audiences and explain the concrete differences.",
    ],
    reading: ``,
    assignment: `Write your essay for someone unfamiliar with this class, like a fellow student who is not taking composition. Clearly label each section.

Section 1 (30 points) - Audience and Purpose
- Define audience and purpose in your own words
- Explain how each shapes choices about evidence, organization, and word choice
- Analyze what happens when a writer misjudges the audience
- Evaluate whether good writing can ever be "audience-neutral"
- Support your position with reasons

Section 2 (20 points) - Same Content, Different Audiences
- Take a single piece of information (a scientific finding, a school policy change, a product feature)
- Write three short versions of the same content for three different audiences
- Briefly explain what changed between versions and why
- Focus on concrete differences in word choice, structure, and emphasis

Notes:
- No minimum/maximum word count (typical range: 1-5 pages)
- Include Works Cited page if using external sources
- Cite using any standard format
- Label sections clearly with bold numbers or titles`,
    modelResponse: `Model Essay: Audience and Purpose

Section 1: Audience and Purpose

Audience is the set of actual readers a piece of writing is addressed to — not the imagined ideal reader, but the people whose hands the text will reach and whose understanding determines whether the writing succeeds. Purpose is what the writer wants to happen as a result of being read: a decision changed, a fact transmitted, an emotion produced, an action taken. Together, audience and purpose are the two facts that make a piece of writing answerable to anything outside itself.

These two facts shape every smaller decision. If the audience is technical and the purpose is to inform a peer, the writer can use shorthand and assume background knowledge. If the audience is general and the purpose is to persuade, the writer must build context, anticipate skepticism, and carry the reader through every step. The same evidence — a study, a quotation, a statistic — supports an argument differently depending on what the reader is prepared to accept. The same word can be precise to one reader and alienating to another.

When a writer misjudges the audience, the failure is rarely visible to the writer. The writer sees a finished, correct, well-formed text. The audience sees something irrelevant, inscrutable, or insulting. A teacher who writes a parent letter at a graduate-school reading level loses the parent. An attorney who writes a settlement letter in colloquial register loses the gravity of the offer. A scientist who writes a press release in journal-paper register produces a press release no one will read past the first sentence.

Can good writing ever be audience-neutral? I would argue no. Even writing that seems to address a generic reader — a textbook, a public-service announcement, a billboard — has made specific assumptions about who that reader is and what they need. The illusion of neutrality is itself a rhetorical choice, usually made for an educated, attentive, sympathetic reader who has time to figure things out. The moment the writing reaches a reader outside that imagined frame, the neutrality vanishes and the choices become visible.

Section 2: Same Content, Different Audiences

The content: A new study finds that students who handwrite lecture notes remember more conceptual material a week later than students who type their notes.

Version 1 — A friend in a text message:

apparently if you take notes by hand you remember the actual ideas better than if you type them. like a week later. don't know if i buy it but kind of makes me want to bring a notebook

Version 2 — A professor in an email:

I came across a study (Mueller and Oppenheimer, 2014) suggesting that handwritten note-taking outperforms laptop note-taking on conceptual recall after a one-week delay. I'm wondering whether you've thought about how this might affect classroom policy on devices, especially in lecture-based courses where conceptual understanding is the main goal.

Version 3 — Parents at a school-board meeting:

Recent research suggests that students who take notes by hand remember ideas better, a week later, than students who type their notes on laptops. This is one reason some schools are reconsidering when laptops belong in the classroom. The point is not to ban technology, but to make sure the tools we use actually serve the kind of learning we say we value.

What changed between versions: the friend version uses lowercase, no citation, casual hedging, and a personal application. The professor version uses formal register, includes a citation, and frames the question as a policy implication. The parent version foregrounds the practical stakes, softens the technical content, and pre-empts the most likely objection (that this is anti-technology). The underlying fact is identical in all three; the rhetorical packaging is entirely rebuilt for each audience.

Why This is a Model Response:
1. Structure and Organization:
   - Clear sections with logical flow
   - Builds understanding progressively
   - Strong transitions between ideas
2. Analysis Depth:
   - Goes beyond restating definitions
   - Explores implications
   - Connects concepts meaningfully
3. Original Thinking:
   - Argues an actual position on audience-neutrality
   - Creative concrete examples
   - Thoughtful contrast across registers
4. Writing Quality:
   - Clear, engaging prose
   - Concrete examples
   - Appropriate composition-class register
5. Assignment Adherence:
   - Addresses all required points
   - Balances sections appropriately
   - Maintains focus on key questions
6. Critical Thinking:
   - Evaluates multiple perspectives
   - Supports claims with reasoning
   - Considers implications`,
  },
  {
    id: "d2",
    number: 3,
    title: "Discussion 2: Thesis Statements and Claims",
    points: 50,
    type: "discussion",
    objectives: [
      "Distinguish a thesis statement from a topic, question, or description using the criteria of arguable, specific, and substantive.",
      "Construct three versions of a thesis on a chosen topic and explain why the strong version satisfies all three criteria.",
    ],
    reading: `A thesis statement is the single most consequential sentence in an academic essay. It is not a topic, not a question, and not a description of what the paper will do. It is a defensible claim that the rest of the essay supports.

Three properties separate a real thesis from a non-thesis:

Arguable — A reasonable person could disagree
  - "Climate change is real" is not arguable in serious circles
  - "Climate policy should prioritize adaptation over mitigation in the next decade" is arguable

Specific — Narrow enough to be defended in the available space
  - "Social media affects mental health" is too broad to defend
  - "Adolescent girls' use of image-based platforms predicts depressive symptoms more strongly than text-based platform use" is specific

Substantive — Says something that matters if true
  - "Many people enjoy reading fiction" is true but trivial
  - "Reading literary fiction measurably improves theory-of-mind performance in adults" is substantive`,
    assignment: `Assignment (50 points):
1. Take a topic you care about (a policy, a cultural phenomenon, a campus issue, a historical event)
2. Write three versions of a thesis on that topic:
   - A non-thesis (description, observation, or question)
   - A weak thesis (technically a claim but vague, obvious, or trivial)
   - A strong thesis (arguable, specific, and substantive)
3. Explain in detail why the strong version meets the three criteria and the others do not`,
    modelResponse: `Model Response:
Topic: The use of plea bargains in the American criminal justice system

Non-thesis: "This paper will discuss plea bargaining in the United States."
Why this is not a thesis: It announces a topic but makes no claim. It tells the reader what the paper is about but not what the paper argues. The reader has nothing to agree or disagree with. A reader could finish the paper and say "yes, that was a discussion of plea bargaining" without forming any view about whether the paper was right.

Weak thesis: "Plea bargaining has both advantages and disadvantages."
Why this is weak: It is technically arguable in the loosest sense — someone could deny that plea bargaining has any advantages — but no one credible would. It is too vague to defend, since "advantages and disadvantages" could mean almost anything. It is not substantive, because it leaves the reader knowing nothing they did not already assume. It is the thesis equivalent of saying water is sometimes wet and sometimes not.

Strong thesis: "The current scale of plea bargaining in American felony cases — over ninety percent of convictions — undermines the constitutional jury-trial right not in theory but in practice, because defendants who exercise that right face systematically harsher post-trial sentences."

Why this is strong:
- It is arguable. A reasonable person could deny it. Defenders of plea bargaining argue that the practice is voluntary, that sentence differentials reflect legitimate differences in evidence at trial, and that the system would collapse without it. The thesis takes one side of a real disagreement.
- It is specific. It names the exact mechanism (the post-trial sentencing differential), the exact scale (over ninety percent), and the exact constitutional value at stake (the jury-trial right). This is narrow enough to defend in a paper of reasonable length.
- It is substantive. If the thesis is correct, it has consequences — for how courts evaluate plea-bargain voluntariness, for sentencing reform, and for whether the Sixth Amendment guarantee is treated as a real right or a nominal one. A reader who is convinced by this paper has had a view changed; a reader who rejects it has been forced to articulate why.

The contrast across the three versions reveals what the thesis actually does in an essay. The non-thesis describes terrain. The weak thesis pretends to argue but commits to nothing. The strong thesis stakes a claim, narrows it enough to defend, and makes the rest of the paper genuinely necessary.

Analysis:
- Clear distinction across the three versions
- Shows understanding of all three thesis criteria
- Maintains analytical rigor
- Demonstrates why specificity matters`,
  },
  {
    id: "e2",
    number: 4,
    title: "Essay 2: Argument Structure",
    points: 50,
    type: "essay",
    objectives: [
      "Define and connect the five elements of an argument: claim, reason, evidence, warrant, and counterargument.",
      "Construct a complete labeled argument on a defensible question that handles a serious counterargument honestly.",
    ],
    reading: ``,
    assignment: `Write your essay for a fellow student who has never analyzed an argument formally. Clearly label each section.

Section 1 (30 points) - The Anatomy of an Argument
- Define claim, reason, evidence, warrant, and counterargument
- Explain how these elements connect to form a complete argument
- Analyze what is missing when an argument feels weak even if the writer is correct
- Evaluate whether all five elements are always required

Section 2 (20 points) - Building an Argument
- Take a position on a real, defensible question
- Construct one full argument with all five elements clearly labeled
- Address at least one serious counterargument
- Avoid both straw-manning and conceding the actual point`,
    modelResponse: `Model Response:

Section 1: The Anatomy of an Argument

An argument in the academic sense is not a quarrel. It is a structured attempt to convince a reasonable, skeptical reader of a particular claim. The five elements that make up a complete argument are claim, reason, evidence, warrant, and counterargument.

The claim is the position being defended — what the writer wants the reader to accept. The reason is the basis offered for that claim — the "because" that links the claim to its support. The evidence is the concrete material — data, examples, expert testimony, documented cases — that backs up the reason. The warrant is the often-unstated principle that licenses moving from the evidence to the reason and from the reason to the claim; it is the bridge that has to hold for the argument to work. The counterargument is the strongest possible objection, taken seriously, with a response.

These connect as follows. The claim asserts something. The reason answers "why should I believe that?" The evidence answers "how do you know?" The warrant answers "why does that evidence even bear on the question?" The counterargument answers "but what about...?" An argument that has all five does not merely assert a position; it earns it from a reader who started skeptical.

When an argument feels weak even though the writer is correct, what is usually missing is the warrant or the counterargument. A writer can have a true claim, a real reason, and good evidence, and still leave the reader unmoved — because the reader does not see why the evidence connects to the claim, or because the reader's actual objection has not been heard. Many student arguments fail at the warrant. The writer assumes the reader will see the connection that the writer sees, and the connection goes unstated.

Are all five always required? In short writing, sometimes the warrant is genuinely obvious and stating it would be patronizing. But the discipline of articulating it during drafting is almost always useful, even when the final version drops it. Counterargument is more negotiable: in a one-paragraph claim, there may be no room. But any argument longer than a page that fails to engage a real counterargument is unfinished. The reader who has the objection in mind has not been answered.

Section 2: Building an Argument

Question: Should public universities replace standardized-test admissions requirements with portfolio-and-interview admissions?

Claim:
Public universities should not replace standardized-test admissions requirements with portfolio-and-interview admissions, because the alternative is more, not less, susceptible to the inequities reformers want to address.

Reason:
Portfolio-and-interview admissions reward access to coaching, well-connected mentors, and time to produce polished extracurricular work — resources that track wealth even more closely than test prep does.

Evidence:
Studies of holistic admissions practices at selective institutions show stronger correlations between admitted-student family income and admissions outcomes than test-score-based admissions produced. Interview-heavy systems in countries that use them (the U.K. tutorial-interview tradition, for example) have repeatedly shown class-based bias in interviewer ratings even when test data is set aside. Portfolio review depends on the quality of the projects a student has had access to, which itself depends on schools, families, and free time.

Warrant:
If a reform aims to reduce inequity, the relevant question is not whether the old measure is biased but whether the new one is less biased. A measure can be imperfect and still be the least bad available.

Counterargument and Response:
The strongest objection is that standardized tests have well-documented racial and class disparities in scores, and that any system that uses them perpetuates those disparities. This is true. The response is that the disparity is not produced by the test itself but by upstream conditions — schools, neighborhoods, opportunity — and that removing the test does not remove those conditions; it only hides them and shifts the bias to a less measurable channel. The honest reformer's task is to address the upstream conditions while using the most transparent and contestable measure available, which is the test. Portfolios and interviews are less transparent and less contestable, which makes the bias inside them harder to fix.

Why This is a Model Response:
1. Structure and Organization:
   - Clearly labels every element of the argument
   - Builds from definition to construction
   - Strong transitions between sections
2. Analysis Depth:
   - Distinguishes warrant from reason carefully
   - Identifies the typical failure points
   - Treats counterargument as serious, not pro forma
3. Original Thinking:
   - Takes a real position on a contested question
   - Articulates the warrant explicitly
   - Avoids strawmanning the opposing view
4. Writing Quality:
   - Precise vocabulary
   - Concrete examples
   - Composed prose throughout
5. Assignment Adherence:
   - All five elements present and labeled
   - Counterargument substantively addressed
   - Position taken without overstating
6. Critical Thinking:
   - Engages the strongest objection
   - Concedes what should be conceded
   - Holds the actual point under pressure`,
  },
  {
    id: "d3",
    number: 5,
    title: "Discussion 3: Evidence and Source Evaluation",
    points: 50,
    type: "discussion",
    objectives: [
      "Apply the five-question source evaluation framework (authority, accuracy, currency, purpose, coverage) to real sources.",
      "Reach a defensible ranking of sources for a single contested factual claim and explain the reasoning.",
    ],
    reading: `Not all evidence is equal. A thesis is only as strong as the sources behind it, and college-level writing requires the writer to evaluate sources, not merely cite them. Five questions structure source evaluation:

Authority — Who produced this and what qualifies them to speak on this topic?
Accuracy — Are the factual claims verifiable, and does the source show its work?
Currency — Is the source recent enough for the question being asked?
Purpose — Why does this source exist? Who funded it? What does it want the reader to do?
Coverage — Does the source address the actual question, or is it being stretched to fit?

A source can be authoritative but outdated, current but agenda-driven, accurate but irrelevant. The writer's job is to use the right source for the right claim — not to treat every cited URL as equally weighty.`,
    assignment: `Assignment (50 points):
1. Take a single contested factual claim that is plausible but not obvious — for example, "caffeine improves athletic endurance," "early voting increases turnout," "raising the minimum wage reduces small-business hiring."
2. Find three sources that bear on the claim and apply the five questions to each.
3. Explain which source you would actually trust on this claim and why.`,
    modelResponse: `Model Response:
Claim: Owning a dog reduces all-cause mortality in adults over 60.

Source 1: A 2019 systematic review and meta-analysis published in Circulation: Cardiovascular Quality and Outcomes pooling ten cohort studies covering nearly four million participants.
- Authority: Cardiology subspecialty journal, peer-reviewed, authors with epidemiology credentials. High.
- Accuracy: Pre-registered methodology, declared funding, supplementary data available. High.
- Currency: Published 2019, recent enough for an effect that is unlikely to have changed. Adequate.
- Purpose: To synthesize existing evidence for the cardiology research community. Aligned with the question.
- Coverage: Directly examines mortality outcomes in dog owners across multiple populations. Excellent fit.

Source 2: A blog post from a popular pet-supply company titled "7 Reasons Dogs Make You Live Longer."
- Authority: No author credentials given, no editorial review. Low.
- Accuracy: Cites "a study" without naming it, includes claims that go beyond what the underlying research supports. Low.
- Currency: Undated. Suspicious.
- Purpose: To sell dog products. Strongly biased toward an affirmative answer regardless of evidence.
- Coverage: Touches the topic but loosely. Poor fit for a serious claim.

Source 3: A single observational study from 1992 published in a regional Australian journal, with 5,741 participants.
- Authority: Peer-reviewed at the time, but a smaller regional outlet. Moderate.
- Accuracy: Methods described, data presented, but a single study has limited weight on a large claim.
- Currency: 1992 — three decades old. The population, the diagnostic categories, and the confounders have all shifted.
- Purpose: Original research contribution. Neutral.
- Coverage: Addresses the question but for one population at one time.

Which source to trust: The 2019 meta-analysis, by a wide margin. It pools the strongest available studies, applies systematic methodology, and reports its limits. The 1992 single study is reasonable to cite as historical context but cannot carry the claim on its own. The blog post should not be cited at all; the most that could be said is that it represents a popular belief that the better sources help test.

The general lesson: source evaluation is not snobbery. It is the only way to know whether the writer has actually answered a question or has merely repeated whatever happened to come up first.

Analysis:
- Applies all five criteria to each source
- Distinguishes authority from accuracy
- Recognizes that currency depends on the question
- Reaches a defensible ranking, not a relativist tie`,
  },
  {
    id: "e3",
    number: 6,
    title: "Essay 3: Logical Fallacies",
    points: 50,
    type: "essay",
    objectives: [
      "Define logical fallacy, distinguish formal from informal fallacies, and analyze why fallacies feel persuasive.",
      "Identify five informal fallacies in real-world examples and rewrite each as a non-fallacious version.",
    ],
    reading: ``,
    assignment: `Write your essay for a reader who has never studied logic. Clearly label each section.

Section 1 (30 points) - What Fallacies Are
- Define "logical fallacy" in your own words
- Explain the difference between formal and informal fallacies
- Analyze why fallacious arguments often feel persuasive
- Evaluate whether identifying a fallacy is the same as refuting an argument

Section 2 (20 points) - Five Fallacies in the Wild
- Choose five common informal fallacies
- For each, give a concrete real-world example (not a textbook example)
- Explain why the example commits the fallacy
- Suggest what a non-fallacious version of the same point would look like`,
    modelResponse: `Model Response:

Section 1: What Fallacies Are

A logical fallacy is a pattern of reasoning that looks like it supports a conclusion but actually does not. Fallacies are not simply arguments the listener disagrees with. They are arguments whose internal structure fails to do what the speaker is implicitly claiming it does — connect premises to a conclusion in a way that makes the conclusion more credible.

Formal fallacies are failures of structure. Affirming the consequent — "if it is raining, the streets are wet; the streets are wet, therefore it is raining" — is fallacious regardless of content, because the form does not preserve truth from premises to conclusion. Informal fallacies are failures of substance — the structure looks fine, but something has gone wrong in how the content fills the structure. Ad hominem, straw man, false dilemma, slippery slope, and appeal to authority are all informal: they involve real-world content being misused.

Fallacious arguments are persuasive because they exploit real cognitive shortcuts that usually serve us well. Appeals to authority work because experts usually do know more. Slippery-slope arguments work because some slopes are real. Ad hominem feels relevant because a speaker's track record sometimes does bear on credibility. The fallacy is not in using the shortcut; it is in using it where it does not apply, or stretching it beyond what the evidence will bear.

Identifying a fallacy is not the same as refuting an argument. This is one of the most common confusions in casual debate. To say "that is a slippery-slope argument" is to say only that the argument as stated does not establish its conclusion; it does not establish that the conclusion is false. A bad argument can have a true conclusion. The proper response to a fallacious argument is to point out that the argument fails to establish its conclusion, then ask what a better argument for the same position would look like — or refuse to grant the conclusion until one is offered.

Section 2: Five Fallacies in the Wild

1. Ad Hominem
Example: A pundit responding to an economist's testimony on housing policy by noting that the economist owns three rental properties, and treating that fact as if it disposed of the analysis.
Why fallacious: The economist's financial interest is relevant to credibility but does not refute the analysis. Whether the rent-control claims are correct is a separate question from whether the speaker has a stake.
Non-fallacious version: Disclose the conflict of interest, then engage the actual argument.

2. Straw Man
Example: "Critics of standardized testing want to abolish all academic standards."
Why fallacious: Almost no critic holds this view. The actual critique is narrower — about what the tests measure, how the scores are used, and whether better measures exist. The straw version is easier to attack but is not the position anyone is defending.
Non-fallacious version: "Critics of standardized testing argue that the tests measure preparation more than aptitude, and that high-stakes use produces curriculum narrowing."

3. False Dilemma
Example: "Either we cut social spending or the deficit destroys the economy."
Why fallacious: There are at least three other options — raising revenue, growing the economy, restructuring debt — and the speaker is treating two outcomes as exhaustive when they are not.
Non-fallacious version: "Among the available options, cutting social spending is the most reliable lever, because [specific reasoning]."

4. Appeal to Tradition
Example: "This is how we have always handled hiring at this firm."
Why fallacious: That something has been done a long time is not a reason that it should continue, especially if the conditions that produced the tradition have changed.
Non-fallacious version: "This hiring approach has worked because [specific mechanism], and that mechanism still applies because [reason]."

5. Hasty Generalization
Example: "My two cousins went to that university and both struggled, so the school must not prepare students well."
Why fallacious: Two data points from one family cannot support a generalization about an institution serving thousands of students.
Non-fallacious version: "My two cousins struggled at that university, which made me curious — looking at the school's outcomes data, retention rates are below the regional average."

Why This is a Model Response:
1. Structure and Organization:
   - Clear sections with logical flow
   - Definitional work followed by application
   - Strong transitions
2. Analysis Depth:
   - Distinguishes formal from informal fallacies
   - Explains why fallacies are persuasive
   - Holds the line on fallacy-spotting versus refutation
3. Original Thinking:
   - Real examples rather than recycled textbook ones
   - Non-fallacious rewrites for each
   - Subtle handling of when shortcuts are legitimate
4. Writing Quality:
   - Clear definitions
   - Tight examples
   - Composed argumentative prose
5. Assignment Adherence:
   - All five fallacies covered
   - Each example explained and rewritten
   - Sections balanced appropriately
6. Critical Thinking:
   - Avoids the trap of treating fallacy-detection as argument-winning
   - Recognizes that fallacious arguments can have true conclusions
   - Models constructive criticism rather than dismissal`,
  },
  {
    id: "d4",
    number: 7,
    title: "Discussion 4: Voice, Tone, and Style",
    points: 50,
    type: "discussion",
    objectives: [
      "Distinguish voice (persistent), tone (situational), and style (technical) and explain how style produces voice and tone.",
      "Rewrite an existing paragraph in three deliberate registers and analyze what changed and what stayed.",
    ],
    reading: `Voice, tone, and style are the dimensions of writing that go beyond what is being said and into how it is being said. They are not decorative. They are the parts of writing that determine whether a reader trusts the writer, attends to the argument, and finishes the piece at all.

Voice — The recognizable identity of the writer behind the text
  - Voice persists across pieces: the same writer recognizable on different topics
  - Voice is built from word choice, sentence rhythm, and stance toward the material

Tone — The attitude the writer takes toward the subject and the reader in this piece
  - Tone changes from piece to piece based on purpose
  - The same writer can be playful, grave, urgent, or dispassionate as the situation requires

Style — The set of formal choices that produce voice and tone
  - Sentence length, vocabulary level, use of figurative language, paragraph rhythm
  - Style is the technical layer; voice and tone are what style produces`,
    assignment: `Assignment (50 points):
Take a paragraph from your own earlier writing — a discussion post, an old essay, a long text message you sent — and rewrite it three times: once with a deliberate stylistic shift toward formality, once toward informality, and once toward urgency. Then explain what changed in voice and tone and what stayed the same.`,
    modelResponse: `Model Response:

Original (from a discussion post about a campus parking change):
They are taking away the south lot starting next semester and giving us the new garage instead, which is supposed to be better but it is way farther from most of the buildings and the meters in the garage are more expensive. I get why they are doing it but it feels like the people making the decision do not actually park here.

Version 1 — Formal:
The administration has announced that the south lot will be decommissioned at the start of next semester and replaced by access to the new parking structure. While the structure is intended as an upgrade, it sits significantly farther from most academic buildings, and meter rates are higher than the lot it replaces. The rationale is understandable, but the decision suggests that those making it are not regular users of the facilities being changed.

Version 2 — Informal:
So they're killing the south lot next semester. Instead we get the new garage — supposedly nicer, but it's way farther from anything and the meters cost more. I get it on paper. But come on. Whoever made that call clearly does not park here.

Version 3 — Urgent:
The south lot closes next semester. We are being moved to the new garage. It is farther. It is more expensive. The decision was made by people who do not park on this campus and who will not feel the change. If we want this revisited, we have until the end of this semester to say so.

What changed and what stayed:

Across all three versions, the underlying claim is identical: a parking change is going into effect, the new arrangement is worse for daily users, and the decision-makers are insulated from the consequences. The voice — a frustrated, observation-driven student — is recognizable in all three. What shifts is tone.

The formal version takes a measured, reportorial tone. Sentences are longer, contractions are removed, and judgment is delivered through cooler vocabulary ("decommissioned," "rationale"). The informal version foregrounds the speaker's frustration and uses colloquial markers ("so," "come on") and shorter sentences. The urgent version drops elaboration entirely, uses staccato sentences, and shifts from observation to call-to-action; it is the same content reframed as a deadline rather than a complaint.

Style is the lever. In the formal version, longer sentences and Latinate vocabulary produce a registered, official-feeling voice. In the informal version, contractions and conversational interjections produce closeness. In the urgent version, repetition and short declarative sentences produce pressure. The writer's identity persists through all of them because voice is deeper than style. Tone is the choice the writer makes for this particular act of writing.

Analysis:
- Distinguishes voice (persistent), tone (situational), and style (technical) cleanly
- Shows recognizable identity across versions
- Demonstrates concrete technical means (sentence length, register, contractions)
- Avoids treating style as decoration`,
  },
  {
    id: "e4",
    number: 8,
    title: "Essay 4: Rhetorical Analysis",
    points: 50,
    type: "essay",
    objectives: [
      "Conduct a rhetorical analysis of a public text, identifying the rhetorical situation and analyzing ethos, pathos, and logos.",
      "Analyze a single rhetorical move up close and show how small writing decisions produce large effects.",
    ],
    reading: ``,
    assignment: `Write your essay for a reader who has never read the text you are analyzing. Clearly label each section.

Section 1 (30 points) - Rhetorical Analysis
- Choose a short, real, public text — a speech, an op-ed, an advertisement, a famous letter
- Identify the rhetorical situation (writer, audience, purpose)
- Analyze the writer's use of ethos, pathos, and logos
- Evaluate whether the appeals work — and for which audiences
- Support claims about the text with quotations or paraphrase

Section 2 (20 points) - One Move Up Close
- Choose a single rhetorical move from the text — one paragraph, one sentence, one word choice
- Explain in detail what that move accomplishes
- Consider what a different choice would have done
- Show that small writing decisions are not small in effect`,
    modelResponse: `Model Response:

Section 1: Rhetorical Analysis of King's "Letter from Birmingham Jail" (1963)

Martin Luther King, Jr. wrote "Letter from Birmingham Jail" in April 1963 from a city jail cell, in response to a public statement by eight white Alabama clergymen who had called King's nonviolent direct-action campaign "unwise and untimely." The rhetorical situation is unusually layered. The named audience is the eight clergymen. The actual audience is white moderate Christians across the United States, a constituency King considered the most decisive obstacle to civil-rights progress — sympathetic in private, cautious in public, and inclined to defer to law-and-order arguments. The purpose is not to refute the clergymen as such; it is to use them as a means of speaking past them, to a national audience whose support was needed and whose hesitations had to be answered directly.

King's use of ethos is dense throughout. He establishes himself, in the opening pages, not as an outside agitator but as an invited participant within the Christian and American traditions his readers share — quoting Paul, citing Augustine, Aquinas, Buber, and Tillich, and grounding his appeal in the founding documents of the United States. He builds credibility by making clear that he is operating from within his readers' own moral vocabulary, not against it.

His use of pathos is restrained but devastating. The famous long sentence cataloguing what segregation feels like — "when you have seen vicious mobs lynch your mothers and fathers at will... when you suddenly find your tongue twisted and your speech stammering as you seek to explain to your six-year-old daughter why she can't go to the public amusement park" — does not editorialize. It accumulates concrete particulars until the reader is forced to feel what the prose has refused to dramatize. The emotion is generated by the facts, not imposed on them.

His use of logos is the structural backbone of the letter. He distinguishes just from unjust laws using a precise philosophical criterion (a just law squares with the moral law; an unjust law does not). He responds to the charge of "untimeliness" with a direct argument: nonviolent direct action is necessary precisely because the alternative — waiting — has produced no change. He addresses the charge of extremism by showing that Jesus, Paul, Lincoln, and Jefferson all, in their contexts, were called extremists, and asking the reader to consider not whether one will be an extremist but for what.

The appeals work, and they work because they are aimed at the right audience. The clergymen could be expected to recognize the theological references. The white moderate could be expected to feel the force of the daughter-and-the-amusement-park sentence, and to be unable to dismiss the just/unjust law distinction without also dismissing Aquinas. The letter is rhetorically devastating because every move is calibrated for the reader who is most resistant in the most polite way.

Section 2: One Move Up Close

The move I want to focus on is King's pivot in the middle of the letter from "the white moderate" as a third-person object of analysis to "you" as a second-person addressee. He has been writing about the white moderate for several pages — the figure who "prefers a negative peace which is the absence of tension to a positive peace which is the presence of justice." Then, without warning, he is no longer writing about that figure. He is writing to him.

The shift is small in word count. It is enormous in effect. While the white moderate was a third-person object, the reader could agree with King's analysis at a comfortable distance — yes, those people are a problem. Once the address shifts, the reader who has been nodding along recognizes that the figure being described is not someone else. The reader either has to break with the description or has to sit with the recognition that they are the audience for it.

If King had stayed in the third person throughout, the letter would still have been an important argument, but it would have read as a sociological observation rather than a confrontation. The second-person turn forces the reader's identification. It is the rhetorical equivalent of a hand on the shoulder. Almost no one writes this move now, because almost no one earns it. King earns it because he has spent ten pages building credibility, naming the shared tradition, and showing what it costs not to act. By the time the second person arrives, refusing to be addressed by it would require the reader to disclaim the very tradition King has spent the letter inviting them to take seriously.

Small writing decisions are not small in effect. A pronoun shift is the difference between describing a reader and reaching one.

Why This is a Model Response:
1. Structure and Organization:
   - Distinguishes named audience from actual audience
   - Treats ethos, pathos, logos as analytical tools, not a checklist
   - Strong transitions between large and close analysis
2. Analysis Depth:
   - Goes beyond identifying appeals to evaluating them
   - Engages the strategic situation seriously
   - Connects rhetorical means to political ends
3. Original Thinking:
   - The pronoun-shift focus is not standard textbook analysis
   - Treats King as a rhetorician, not only a moral figure
   - Considers what alternative choices would have done
4. Writing Quality:
   - Quotes used precisely
   - Concrete claims throughout
   - Composition-class register maintained
5. Assignment Adherence:
   - All required elements present
   - Sections balanced appropriately
   - Both wide and narrow lenses
6. Critical Thinking:
   - Resists the trap of admiring the text without analyzing it
   - Treats rhetorical choices as choices
   - Respects the reader's ability to follow technical analysis`,
  },
  {
    id: "d5",
    number: 9,
    title: "Discussion 5: The Writing Process and Revision",
    points: 50,
    type: "discussion",
    objectives: [
      "Distinguish pre-writing, drafting, revision, and editing as separate stages of the writing process.",
      "Reflect on a real piece of revised writing and articulate what genuine revision (not editing) actually changed.",
    ],
    reading: `Most inexperienced writers think of writing as a single act: sit down, produce text, hand it in. Experienced writers know that writing is a process with distinct stages, and that the most consequential stage is almost never the first draft.

Pre-writing — Generating, narrowing, planning
  - Brainstorming, outlining, locating sources
  - Settling on a thesis worth defending

Drafting — Producing the first version
  - The goal is to get a complete attempt on the page, not a perfect one
  - Writers who try to perfect each sentence before moving on rarely finish

Revision — Re-seeing the whole
  - Structural revision: is the argument the right argument? Is this the right order?
  - Local revision: is each paragraph doing what it should be doing?

Editing and proofreading — Sentence-level work
  - Word choice, grammar, mechanics
  - This is the last stage, not the first, and it is not what writing teachers mean by "revision"`,
    assignment: `Assignment (50 points):
Describe a piece of your own recent writing where you genuinely revised — not just edited — the draft. Explain:
1. What changed between the first version and the final one
2. Why it changed
3. What you would have produced if you had stopped at the first version
4. What this case teaches you about your own writing process`,
    modelResponse: `Model Response:
The piece: a five-page argumentative essay for an introductory political science course, on whether ranked-choice voting should replace plurality voting in U.S. congressional elections.

My first draft was structured around a thesis I now think was wrong: that ranked-choice voting would produce more centrist outcomes by reducing the influence of party primaries. I had read three articles that made this point, and I had built the entire essay around it. The draft was finished, on time, technically competent, and roughly what most introductory papers on this topic look like.

What changed: while reading the draft aloud to a roommate, I realized the third article I had cited actually pushed back against the centrism claim. The author argued that ranked-choice voting produces moderation only under specific institutional conditions — when there are enough viable candidates to use the ranking, when voters understand the system well enough to rank strategically, and when the underlying electorate is itself ideologically distributed in a way that rewards moderation. None of those conditions hold uniformly across U.S. congressional districts.

The revision was structural, not cosmetic. I changed the thesis to a narrower claim: ranked-choice voting is likely to produce moderating effects in some districts but not others, and the reform debate should be about which districts qualify. This required throwing out roughly half of the body paragraphs, because they were defending a thesis I no longer held. I rewrote the middle of the essay around the institutional-conditions analysis. I kept the introduction's framing of the debate but rewrote the thesis sentence. I added a counterargument section addressing the strongest version of the universal-moderation claim, since I had previously been making that claim myself.

If I had stopped at the first version, I would have submitted an essay defending a position I did not actually hold, supported by sources that I had quoted out of context. The grade might have been similar. The intellectual experience would have been entirely different — I would have practiced writing without practicing thinking. The revision is what made it an essay rather than an exercise.

What this teaches me about my own process: the first draft is for me, not for the reader. It is a way of finding out what I actually think, which I cannot know in advance. The most important question to ask after a first draft is not "is this well-written" but "is this the argument I want to make." If the answer is no, the editing-level fixes are wasted effort. If the answer is yes, then the editing has real work to do. Either way, drafting and revising are different activities, and trying to do them simultaneously is the most reliable way to do neither.

Analysis:
- Distinguishes structural revision from editing
- Shows the actual mechanism by which revision changed the argument
- Resists the temptation to claim revision was minor
- Generalizes to a self-aware process insight`,
  },
  {
    id: "e5",
    number: 10,
    title: "Essay 5: Persuasion and Ethical Argument",
    points: 50,
    type: "essay",
    objectives: [
      "Define ethical persuasion in contrast to manipulation and analyze whether intent or audience autonomy matters more.",
      "Construct a hard case in which ethical and effective persuasion seem to conflict and reach a defensible position.",
    ],
    reading: ``,
    assignment: `Write your essay for a reader who is skeptical of the idea that persuasion can be done ethically at all. Clearly label each section.

Section 1 (30 points) - The Ethics of Persuasion
- Define ethical persuasion and contrast it with manipulation
- Explain what makes a persuasive technique ethical or unethical
- Analyze whether the writer's intent or the reader's autonomy matters more
- Evaluate whether all rhetoric is on a spectrum with manipulation

Section 2 (20 points) - A Hard Case
- Construct a case in which ethical and effective persuasion seem to come apart
- Show how a writer should think through the conflict
- Reach a defensible position, not an evasive one`,
    modelResponse: `Model Response:

Section 1: The Ethics of Persuasion

Ethical persuasion is the attempt to change a reader's mind by giving them reasons they can evaluate, weigh, and accept or reject as their own. Manipulation is the attempt to change a reader's mind by means that bypass their evaluative capacity — by exploiting fear, exhaustion, social pressure, cognitive bias, or limited information in ways the reader would not endorse if they recognized what was being done.

The line between the two is not always sharp, but it is real. A few markers reliably distinguish ethical persuasion from manipulation. Ethical persuasion can be conducted in front of the audience: the writer would not behave differently if the reader knew exactly what techniques were being used. Manipulation depends on the reader not seeing the technique. Ethical persuasion accepts that the reader might disagree at the end and counts that as a legitimate outcome. Manipulation is structured to make disagreement feel impossible. Ethical persuasion gives the reader the strongest counterargument fairly. Manipulation either omits it or weakens it.

What makes a technique ethical or unethical is not the technique itself but how it relates to the reader's reasoning. Emotional appeal is not inherently manipulative; it can illuminate stakes the reader had not felt. The same emotional appeal becomes manipulative when it is used to short-circuit thinking the reader was about to do — when it makes the reader feel that further consideration is itself a betrayal of the feeling.

Whether intent or autonomy matters more is a question the literature treats as more interesting than I think it is. In practice the two tend to cohere. A writer who genuinely respects the reader's autonomy will tend to choose techniques that survive disclosure. A writer whose intent is to win regardless of the reader's reasoning will tend to choose techniques that depend on concealment. The cases where intent and effect come apart are rare enough that the central principle — does this technique work better if the reader sees it, or worse? — captures most of the territory.

Is all rhetoric on a spectrum with manipulation? I think this overstates it. Manipulation is a specific failure of rhetoric, not a darker shade of it. A doctor explaining the risks of a surgery is using rhetoric — choosing what to emphasize, how to organize, what tone to take — and is not on a slippery slope toward manipulation. The slippery-slope view is appealing because it sounds tough-minded, but it misses that ethical and unethical persuasion differ not in degree but in their relationship to the reader's reasoning.

Section 2: A Hard Case

The case: a public health writer is asked to compose a campaign aimed at increasing vaccine uptake among adults in a community where uptake is low and a measles outbreak is plausible within months. The available evidence suggests that fear-based messaging — graphic descriptions of measles complications in children — produces higher short-term uptake than calm, information-based messaging. The writer believes the fear-based messaging works partly by overriding the reader's tendency to evaluate the question on the merits. Ethical and effective persuasion appear to pull in opposite directions.

How a writer should think through the conflict: the first move is to specify what "effective" means. If effectiveness is measured only by next-quarter uptake numbers, fear-based messaging wins. If it is measured by sustained vaccination over years, by trust between the public health system and the community, and by the population's capacity to evaluate the next public health message — fear-based messaging often loses. Communities that have been moved by fear once are more skeptical the next time, and the institutional capital is non-renewable.

The second move is to distinguish strong emotional appeal from manipulation. A campaign that includes accurate, vivid descriptions of what measles can do to a child is not manipulating anyone. The complication and the death rate are real; the reader's emotional response to them is appropriate to the facts. The campaign crosses into manipulation when it presents a small risk as if it were the typical outcome, when it omits real and reasonable concerns about the vaccine, or when it uses techniques (rapid emotional cuts, ominous music, manufactured testimonials) that work specifically by overriding deliberation.

My defensible position is this: the writer should produce a campaign with strong, accurate emotional content, full honest disclosure of the actual risks on both sides, and a clear path to authoritative information for readers who want to look into it. This will be slightly less effective in the short term than a manipulative campaign would be, and significantly more effective in the long term. The trade-off is real. The writer who refuses to make it has either ignored the long-term cost or has decided that short-term numbers are the only thing that counts. Neither is a tenable position once it is stated.

Why This is a Model Response:
1. Structure and Organization:
   - Tight definitional opening
   - Clear progression from principles to a concrete dilemma
   - Strong transitions
2. Analysis Depth:
   - Distinguishes manipulation from strong rhetoric
   - Treats the slippery-slope view critically rather than uncritically
   - Considers long-term effects, not only immediate ones
3. Original Thinking:
   - The disclosure-test as a marker is not the textbook line
   - Reframes the intent-versus-autonomy debate
   - Holds a defensible position on the hard case
4. Writing Quality:
   - Precise diction
   - Concrete examples
   - Composed argumentative prose
5. Assignment Adherence:
   - Both sections substantive
   - Hard case fully developed
   - Position taken, not evaded
6. Critical Thinking:
   - Engages the strongest version of the opposing view
   - Does not retreat into vagueness when the case gets hard
   - Identifies what counts as effective rather than assuming`,
  },
  {
    id: "d6",
    number: 11,
    title: "Discussion 6: Citation, Plagiarism, and Intellectual Honesty",
    points: 50,
    type: "discussion",
    objectives: [
      "Distinguish mechanical citation error, patchwriting, and plagiarism and explain why each is treated differently.",
      "Construct an example contrasting patchwriting with genuine paraphrase and explain why citation alone does not authorize structural copying.",
    ],
    reading: `Citation is more than a formatting requirement. It is the system by which writers acknowledge their debts, allow readers to verify claims, and place their own work inside an ongoing conversation. Failures of citation come in three forms, and they are not equally serious.

Mechanical error — Wrong page number, missing comma, inconsistent format
  - These are correctable and not ethical violations

Patchwriting — Lightly paraphrasing a source while preserving its structure
  - This is a research and writing skill problem; many beginning writers do it without intent to deceive

Plagiarism — Presenting someone else's words or ideas as one's own
  - This is a serious violation regardless of intent, because intent is hard to verify and the harm is the same

The deeper principle behind citation is intellectual honesty: the writer takes responsibility for distinguishing what they thought from what they learned, and gives the reader the means to check.`,
    assignment: `Assignment (50 points):
Construct an example of patchwriting using a real short passage from a source you have read. Show:
1. The original passage
2. A patchwritten version that would not pass an academic-integrity review
3. A genuine paraphrase that integrates the idea while making the writer's contribution clear
4. Analysis of why the patchwritten version is unacceptable even when cited`,
    modelResponse: `Model Response:

Original passage (from a hypothetical but representative source on the diffusion of misinformation):
"False stories on social media platforms travel substantially faster and reach larger audiences than true stories on the same platforms, in part because falsehoods are systematically more novel and provoke stronger emotional reactions, both of which platform algorithms reward through increased distribution."

Patchwritten version (with citation):
False stories on social media travel much faster and reach bigger audiences than true stories on the same platforms, partly because falsehoods are more novel and trigger stronger emotional responses, which the algorithms reward by giving them more distribution (Author, year).

Why this fails: nearly every clause mirrors the original. The writer has changed "substantially" to "much," "larger" to "bigger," "systematically" to nothing, and "provoke" to "trigger." The structure is unchanged, the technical claims are unchanged, and the distinctive moves of the source — that the speed difference is partly explained by novelty plus emotion plus algorithmic amplification — are reproduced step by step. The citation is necessary but not sufficient. The reader is being told the source said this, but the writer's own contribution to the sentence is essentially zero. A reader reasonably infers that the writer is paraphrasing, not borrowing structure, and that the writer has thought through and reformulated the claim. Neither inference is true.

Genuine paraphrase:
Recent research on social-media diffusion finds that false content outperforms true content on the same platforms, traveling further and faster (Author, year). The proposed mechanism is twofold: false stories tend to be more novel than true ones — there are far more possible false claims than true ones in any given news cycle — and they tend to provoke stronger emotional reactions. Both features are amplified by recommendation systems whose distribution decisions are tuned to engagement. If this account is right, the speed asymmetry is not a quirk of any particular platform but a predictable consequence of optimization criteria that any major recommender system shares.

Why this works: the underlying claim is the same, but the writer has restructured it (claim first, then mechanism), added analysis (why novelty is asymmetric, what the implication is for platform design), and integrated the source rather than transcribed it. The citation now points to where the empirical claim came from, while the writer takes responsibility for the framing and the implication.

Why the patchwritten version is unacceptable even when cited: citation acknowledges intellectual debt, but it does not authorize copying linguistic structure. A cited patchwrite still passes off the source's organization, sentence rhythm, and conceptual moves as the writer's own work. The writer who turns in patchwritten prose is producing the appearance of synthesis without the work of synthesis. This is why most institutions treat sustained patchwriting as a form of plagiarism even when the citations are present — the citations document the source of the facts but not the source of the writing.

Analysis:
- Clear three-version comparison
- Names the specific mechanism by which patchwriting fails (structural copying)
- Distinguishes citation of facts from authorship of writing
- Holds the line that intent does not excuse the form`,
  },
  {
    id: "d7",
    number: 12,
    title: "Discussion 7: Clarity, Concision, and the Sentence",
    points: 50,
    type: "discussion",
    objectives: [
      "Identify common sentence-level failures (hidden actors, nominalizations, stacked modifiers, filler, over-hedging).",
      "Rewrite an opaque, padded paragraph for clarity and concision and articulate what the original was hiding.",
    ],
    reading: `Most college writing problems are not problems of ideas. They are problems of sentences. A clear sentence is a sentence in which a reader can identify, on a single pass, who is doing what to whom. A concise sentence is one that uses the available words to do necessary work. Clarity and concision are not the same thing, but they tend to fail together.

The most common sentence-level failures in college writing:

Hidden actors — "It has been determined that" instead of "the committee decided that"
Nominalizations — "the reduction of confusion" instead of "reducing confusion"
Stacked modifiers — three adjectives where one would do
Filler — "in order to," "due to the fact that," "at this point in time"
Hedging beyond what the writer means — "it could perhaps be argued that maybe"`,
    assignment: `Assignment (50 points):
Construct a paragraph of opaque, padded prose on any topic — the kind of paragraph that fills space without saying much. Then rewrite it for clarity and concision, keeping all the actual content but eliminating the failures above. Briefly explain what you cut, what you saved, and what you discovered the original was hiding.`,
    modelResponse: `Model Response:

Original (opaque, padded):
It has been increasingly recognized in recent times by a number of stakeholders within the academic community that there exist various challenges associated with the implementation of effective time-management strategies on the part of students, particularly with respect to the balancing of academic and non-academic obligations. Due to the fact that students are oftentimes in a position of having to manage multiple competing demands at any given point in time, it could perhaps be argued that the development of habits conducive to the maintenance of focused attention may potentially be of considerable importance.

Revised (clear, concise):
Many students struggle to manage their time, especially when academic and outside obligations compete. Building habits that protect focused attention helps.

What was cut:
- "It has been increasingly recognized" — hidden actor (who recognizes?)
- "in recent times" — filler
- "a number of stakeholders within the academic community" — vague and inflated for "academics" or, more honestly, for nobody in particular
- "there exist various challenges associated with the implementation of" — eight words for "struggles"
- "with respect to the balancing of" — "with"
- "Due to the fact that" — "because" or, in this revision, restructured away
- "oftentimes in a position of having to manage" — "have to manage"
- "at any given point in time" — "now" or nothing
- "it could perhaps be argued that" — pure throat-clearing
- "the development of habits conducive to the maintenance of" — five nominalizations in a row
- "may potentially be of considerable importance" — "helps"

What was saved:
- Two real claims: students have a time-management problem, and habits help
- The specific tension that drives the problem: academic versus outside demands

What the original was hiding:
The original was hiding the fact that the writer did not have very much to say. It contains roughly two clauses' worth of actual content, dressed up to fill a paragraph. The padding does specific work: it produces the appearance of academic seriousness, it lets the writer avoid committing to who exactly is making the claim ("a number of stakeholders" is no one), and it softens the only real recommendation ("may potentially be of considerable importance") to the point where the writer cannot be wrong because the writer has not said anything definite. The clear version is shorter not because it has fewer ideas but because the ideas the original had are now in the open, where they can be agreed with, disagreed with, or developed further.

The deeper lesson: padded prose is often not a stylistic problem. It is a thinking problem in disguise. When a writer does not yet know what they want to say, the easiest cover is throat-clearing language. Cutting the throat-clearing forces the writer to confront the gap and either fill it or admit it.

Analysis:
- Identifies specific failure modes by name
- Shows the cuts at the phrase level, not just the sentence level
- Connects sentence-level work to thinking
- Avoids treating clarity as merely a matter of style`,
  },
  {
    id: "d8",
    number: 13,
    title: "Discussion 8: Writing in the Age of AI",
    points: 50,
    type: "discussion",
    objectives: [
      "Distinguish legitimate from illegitimate uses of AI assistance in college writing.",
      "Evaluate whether the AI-as-tool principle differs in kind from older tools (calculators, spell-checkers) and articulate what is at stake.",
    ],
    reading: `Large language models can now produce competent-looking prose on demand. This changes the writing classroom in ways that have not fully settled yet. Three questions are unavoidable for any college writer working today:

- What does it mean to be a writer when prose can be generated on request?
- What kinds of writing tasks remain meaningful for human writers?
- How should AI-assisted writing be acknowledged, used, and limited?

The temptation is to treat the question as a yes/no — should students use AI for writing or not? — but the real question is more particular: at what stage, for what task, with what disclosure, and with what consequence for the writer's own development?`,
    assignment: `Assignment (50 points):
Take a position on the proper role of AI assistance in college writing. Address:
1. How you would distinguish legitimate from illegitimate use
2. Whether the relevant principle is the same as for older tools (calculators, spell-checkers, citation managers) or different in kind
3. What you think is at stake in the answer — for students, for instructors, for the value of writing itself`,
    modelResponse: `Model Response:
My position: AI tools can be used legitimately in college writing at every stage except the one where the writing itself happens — the formulation of claims and their defense in the writer's own sentences. The principle that distinguishes legitimate from illegitimate use is whether the tool extends the writer's thinking or replaces it.

Legitimate uses: brainstorming candidate angles on a topic before settling on one; getting unfamiliar concepts explained in plain terms before deciding which sources to read; generating counterarguments the writer can stress-test their position against; checking grammar and mechanics on a draft the writer has produced; suggesting tighter wording for a sentence the writer has already chosen to say. In all of these, the writer remains the agent of the argument. The tool is a research-and-revision aide, not a substitute for the writer's reasoning.

Illegitimate uses: prompting the model to write a draft and submitting it as one's own; generating a thesis and a defense without having worked out whether one believes either; using AI output as the source of ideas one then claims to have produced; or, more subtly, using AI to fill the parts of an essay one has not thought through, which produces text the writer cannot defend in conversation. The latter case is the most common, and the easiest to rationalize, because the writer can tell themselves they are just "getting started" or "working out their ideas." The test is simple: if the writer cannot rephrase, defend, or extend any sentence in the essay without the tool, the writer did not write it.

Is the principle the same as for older tools? Partly yes, partly no. Calculators and spell-checkers automate the mechanical layer of work that is not what the discipline is testing — arithmetic for a physics problem, comma placement for a literature paper. The student is still being asked to produce the substantive work, and the tool just removes friction from the surroundings. AI is different in kind because it can produce the substantive work itself. The traditional analogy — "AI is just like a calculator" — fails at exactly this point. A calculator cannot solve the physics problem; it can only do the arithmetic once you have set up the problem. A current language model can set up the problem and write the solution, in fluent English, with citations that may or may not exist. The class of tasks the tool can do is now overlapping with the class of tasks the assignment is testing.

What is at stake. For students, the answer is the development of a writing capacity that does not depend on the tool. A student who outsources every essay through a degree never builds the capacity to think on the page, which is a different and harder skill than knowing what "good writing" looks like. The tool can produce work that looks like the result of writing without the writer ever doing what writing actually is — confronting an unclear thought, choosing words, finding out whether the sentence one just produced says what one meant. For instructors, the answer is whether the writing classroom continues to be a place where this capacity is built or becomes a place where the appearance of it is rewarded. For the value of writing itself, the answer is whether the population of educated adults will be able to think their way through an unfamiliar problem in their own words, or whether they will be able to do so only when their tool is at hand.

My honest position: AI is a powerful adjunct to writing, and pretending otherwise is futile. But it is also possible to use it in ways that destroy the very capacity the writing classroom exists to build. The discipline required is not abstinence — it is knowing, for every prompt, whether one is asking the tool to extend one's thinking or to replace it, and refusing the latter. This is harder than the policies typically posted on syllabi, because it requires a judgment about one's own honesty that no syllabus can verify. That difficulty is the actual situation.

Analysis:
- Stakes out an actual position rather than a both-sides hedge
- Distinguishes the calculator analogy and shows where it breaks
- Names the most common form of self-deception
- Connects the technical question to what writing is for`,
  },
  {
    id: "tp",
    number: 14,
    title: "Term Paper (Outline + Final)",
    points: 200,
    type: "termpaper",
    objectives: [
      "Construct a detailed outline summarizing a chosen essay's argument with a critical objection and response.",
      "Defend an original thesis against a serious objection in a complete, well-cited term paper on a foundational essay about writing.",
    ],
    reading: ``,
    assignment: `PART 1 — TERM PAPER OUTLINE (100 points)

Choose one essay or article:
- George Orwell, "Politics and the English Language" (1946)
- Joan Didion, "Why I Write" (1976)
- William Zinsser, "Simplicity" (from On Writing Well, 1976)

Create a detailed outline with:
Introduction (5%)
  - Article overview
  - Your chosen argument
  - Section previews
Argument Summary (40%)
  - Key definitions
  - Article's scope/purpose
  - Chosen argument analysis
Critical Objection (25%)
  - Original counterargument
  - Supporting examples
  - Implications
Critical Response (25%)
  - Defense against objection
  - Practical proposals
  - Implications for writing pedagogy or practice
Conclusion (5%)
  - Key points review
  - Broader significance

PART 1 MODEL OUTLINE:
Orwell's Six Rules and the Limits of the Plain-Style Doctrine

I. Introduction
- Overview: Orwell argues that the decay of language and the decay of political honesty are linked, and offers six rules to resist that decay
- Focus: Core argument that plain English is morally and politically prior to ornate or abstract English
- Preview: Will examine the argument, raise an objection from rhetorical-effectiveness research, propose a refinement

II. Argument Summary
A. Key Definitions
   - Bad writing: stale metaphors, pretentious diction, vagueness, the passive voice when it conceals an actor
   - Good writing: concrete, active, accountable, capable of being checked against the world
B. Article Scope
   - Diagnosing how political language conceals — "pacification" for bombing, "transfer of population" for ethnic cleansing
   - Linking aesthetic failures of prose to ethical failures of public reasoning
C. Core Argument Analysis
   - Vague language allows vague thinking
   - Vague thinking allows political abuses to be defended without being named
   - Therefore writing clearly is itself a small act of political resistance

III. Critical Objection
A. The Effectiveness Problem
   - Plain style is not always the most effective form for the rhetorical situation at hand
   - Some arguments require difficulty — technical concepts, unfamiliar perspectives, sustained logical chains
   - Examples: legal writing where precision requires nominalization; theoretical writing where new vocabulary is unavoidable; some kinds of literary and political writing whose force depends on cadence and indirection
   - Implication: Orwell's rules describe a useful default, not a universal standard

IV. Critical Response
A. Refined Plain-Style Doctrine
   - Orwell's underlying principle is sound: writing should not conceal more than it reveals
   - But the rules need to be applied through that principle, not as a checklist
   - Practical proposals:
     - Treat plain style as a default, not a uniform
     - Use specialized vocabulary only when it does work the plain version cannot do
     - Apply Orwell's spirit — accountability of language to the world — across registers

V. Conclusion
- Orwell's central insight survives the objection: language that conceals is corrosive
- The six rules need calibration, not abandonment
- Implication for the writing classroom: teach the principle, not the rules in isolation

Works Cited
Orwell, G. (1946). Politics and the English Language. Horizon, 13(76), 252–265.
Pinker, S. (2014). The Sense of Style: The Thinking Person's Guide to Writing in the 21st Century. Viking.

Outline Analysis:
- Clear structure following requirements
- Specific argument focus
- Original objection grounded in rhetorical-situation reasoning
- Appropriate detail level
- Shows understanding of writing-studies norms

---

PART 2 — TERM PAPER (100 points)

Choose one essay or article:
- Orwell: "Politics and the English Language"
- Didion: "Why I Write"
- Zinsser: "Simplicity"

Requirements:
Introduction (5%)
Argument Summary (40%)
Critical Objection (25%)
Critical Response (25%)
Conclusion (5%)
Works Cited (any standard format)`,
    modelResponse: `Model Response:

The Limits of the Plain Style: A Critique of Orwell's Six Rules

Introduction

George Orwell's "Politics and the English Language" argues that the corruption of public language and the corruption of public reasoning are linked, and that plain, concrete writing is therefore a small but meaningful form of political honesty. The essay's six rules — never use a metaphor you are used to seeing in print, never use a long word where a short one will do, and so on — have shaped writing instruction for the better part of a century. This paper examines Orwell's central claim and the rules that operationalize it. I argue that the underlying principle is sound and that the rules, applied as a checklist, miss the principle in important cases.

Argument Summary

Orwell's diagnosis is that mid-twentieth-century English political writing had become a closed vocabulary of stock phrases, abstractions, and euphemisms, and that this stock vocabulary made it possible for educated speakers to defend indefensible policies without having to picture what those policies actually involved. The phrase "pacification of the countryside" lets the speaker avoid the image of villages being burned. The phrase "transfer of population" lets the speaker avoid the image of families being driven from their homes. The vocabulary itself does the political work.

From this diagnosis follows a remedy. If concealment is achieved by abstraction, accountability is achieved by concreteness. If euphemism enables policy abuse, plain language exposes it. The six rules — short over long, active over passive, never the cliché if a fresh phrase will do, cut every word that can be cut, never the foreign word when an English one will do, never the rule itself when the rule produces something barbarous — operationalize this principle into practice.

Orwell's argument therefore connects three claims: language can corrupt thought; corrupted thought permits political abuses; the discipline of plain writing is one of the few weapons private citizens hold against this corruption. The essay's enduring force comes from refusing to treat writing as a technical or aesthetic matter only. It is, at the same time, a moral matter.

Critical Objection

Orwell's argument is most vulnerable at its operationalization. The rules describe a useful default, but applied uniformly they would impair writing whose value depends on doing what the rules forbid.

Three categories of writing make this clear. First, technical writing in fields with developed vocabularies — law, medicine, mathematics, philosophy — uses long words because the long words are more precise than the short ones. "Negligence per se" is not a fancier way of saying "obviously careless." It is a doctrine with specific elements that the short version cannot capture without becoming both longer and less accurate.

Second, theoretical writing whose purpose is to articulate concepts that ordinary language has not yet named requires neologisms and unusual vocabulary. Foucault did not write "governmentality" because plainer alternatives were unavailable; he wrote it because nothing simpler picked out the phenomenon. To insist on the plain English equivalent in such cases is to insist that the phenomenon does not exist.

Third, some kinds of political and literary writing depend on cadence, indirection, and rhetorical force in ways that resist the rules. Lincoln's Gettysburg Address violates several of Orwell's rules — it is full of elevated diction, it uses old-fashioned constructions, it contains phrases that would qualify as borrowed metaphors — and the violations are not failures. They are the source of the speech's power. Plain prose at that moment would have been smaller, not more honest.

These cases do not refute Orwell's principle. They refute a particular reading of his rules. They suggest that the rules describe a default for ordinary expository prose addressed to a general audience, not a universal standard. Treating them as universal — which is how they have often been taught — flattens the writing classroom and produces a generation of students who believe the only honest prose is the simplest.

Critical Response

One might defend the rules by noting that Orwell himself includes the safety clause — break any of these rules sooner than say anything outright barbarous. This concession matters and weakens the universal-standard reading. But the safety clause is not enough on its own, because it tells the writer when to break the rules without telling them how to know whether the break is justified.

A better response is to retain Orwell's underlying principle while adjusting its application:
- Treat plain style as the default for general-audience expository prose, not the universal standard for all writing
- Use specialized vocabulary, longer constructions, or rhetorical heightening only when they do work that the plain version cannot do
- Apply Orwell's diagnostic test — does my language make my meaning more or less accountable to the world? — across all registers
- Teach the principle, not the rules in isolation, since the rules without the principle become a style cult

This adjustment preserves what Orwell got right: language that conceals is corrosive, and writers have a responsibility for what their words do. It rejects what the rules-only reading gets wrong: the implicit claim that elevated, technical, or unusual prose is automatically suspect. The honest version of Orwell's argument is that any prose, plain or elevated, can be tested against the question of whether it makes the world easier to see or harder.

Conclusion

Orwell's contribution is enduring. The link between honest writing and honest thinking is real, and the diagnostic core of "Politics and the English Language" survives every objection that can be raised against the surface-level rules. What does not survive is the reading that treats the rules as a checklist and plain style as the only ethical register. The implication for writing instruction is that students should be taught the principle that grounds the rules, equipped to apply that principle across the registers their actual writing lives will require, and trusted to recognize when plain prose is the right choice and when something else is. Anything less makes Orwell's argument smaller than he made it.

Works Cited
Orwell, G. (1946). Politics and the English Language. Horizon, 13(76), 252–265.
Pinker, S. (2014). The Sense of Style: The Thinking Person's Guide to Writing in the 21st Century. Viking.
Wills, G. (1992). Lincoln at Gettysburg: The Words That Remade America. Simon & Schuster.

Analysis:
- Clear thesis and argument focus
- Evidence-based objection grounded in concrete counter-cases
- Practical, proportioned proposals
- Balanced analysis that preserves the genuine contribution while limiting overreach`,
  },
];

export function moduleById(id: string): Module | undefined {
  return modules.find((m) => m.id === id);
}

export function moduleIndexById(id: string): number {
  return modules.findIndex((m) => m.id === id);
}

# Accelerate

## Ch.1 Accelerate 

- Executives are prone to overestimate their org's DevOps maturity compared with practitioners (p.5)
  - DevOps capabilities offer research-backed benefits 
  - This disconnect points to "the need to measure DevOps capabilities accurately and to communicate these measurement results to leaders, who can use them to make decisions"

- Distinction between maturity and capability models 

> Maturity models are structured as a series of levels of effectiveness. It's assumed that anyone in the field will pass through the levels in sequence as they become more capable
[1] Knows how to make a dozen basic drinks (eg "make me a Manhattan") 
[2] Knows at least 100 recipes, can substitute ingredients (eg "make me a Vieux Carre in a bar that lacks Peychaud's")
[3]Able to come up with cocktails (either invented or recalled) with a few simple constraints on ingredients and styles (eg "make me something with sherry and tequila that's moderately sweet"). https://martinfowler.com/bliki/MaturityModel.html

* __Capability models__ focus on key outcomes (p.7)
  * And how capabilities, or levers, drive improvements in those outcomes
  * Key outcomes are selected because of their impact on the business
* They identify “24 key capabilities” (p.9)
* “High performers understand that they don’t have to trade speed for stability or vice versa, because by building quality in they get both” (p.10)

## Ch.2 Measuring Performance

* “Measuring performance in the domain of software is hard... inventory is invisible” (p.11)
- "Queue theory": As we approach 100% utilization it takes longer to get things done (p.13)
  - Agile manifesto and "consistent pace indefinitely" as baking in the less than 100% utilization
* Shorter delivery lead times, faster feedback, allow us to course correct more rapidly (p.15)
* “batch size” - batch of cars or parts (Toyota)
  - Smaller batch sizes improves efficiency, motivation, urgency (p.16)
  * No visible inventory, batch = deployment frequency

- Do our teams hold this dogma to be true: “moving faster requires trade offs against other performance goals” (p.20)
* Does this describe our decisions sometimes? “ignoring critical rework at the expense of new work” (p.23)

- It seems like a clear action: measure...
    - lead time
    - deployment frequency
    - time to restore service
    - change fail rates
- Make those measurements visible to the team
- Ask the team to set targets for those measures

- Excellent nuance pointing to the intersection of team culture and measurements 
  - Generative/collaborative culture needs to be in place in order to effectively adopt navigating team priorities based on target measurements 
  - Why? Pathological or bureaucratic organizations lead to _distorted_ numbers 
  - "measurement is used as a form of control and people hide information..." (p.27) 
* “whenever there is fear, you get the wrong numbers” (p.27)
  * I feel like the original on this quote is even better than what they have in the book
  * "Fear invites wrong figures"  https://deming.org/where-there-is-fear-you-do-not-get-honest-figures/
- "Before you are ready to deploy a scientific approach to improving performance, you must first understand and develop your culture" (p.27)

## Ch.3 Measuring and Changing Culture
* 3 levels of culture (p.29–30)
    * basic assumptions: least visible, just known—can be hard to articulate after a long time on a team
    * values: norms, discussed + debated
        * cameras on or off?
        * signing off around 5pm
    * artifacts
* Ron Westrum—sociologist studying system safety in aviation and healthcare
  - 1988, typology of organizational cultures: pathological, bureaucratic, generative 
- Generative: focused on the mission. "How do we accomplish our goal? Everything is subordinated to good performance"
  - "everything is subordinated" stands out for me as I read it in contrast to the other 2 org. cultures where "fear/threat" or "turf" are primary decision criteria
  - I also read the phrase as enabling revisions to focus to be "nimble" or effectively focused in a dynamic/evolving work context

- "generative culture emphasizes the mission, an emphasis that allows people involved to put aside their personal issues and also the departmental issues that are so evident in bureaucratic organizations. The mission is primary" (p.35)

- Westrum: "organizational culture predicts the way information flows through an organization" (p.31)
* ⭐️ “Good information” (p.31)
    * Provides answers to the questions that the receiver needs answered
    * It is timely
    * It is presented in such a way that it can be effectively used by the receiver
- "Good information flow is critical to the safe and effective operation of high-tempo and high-consequence environments"
* Table with types of org. cultures (p.32) 
* Culture enables information processing through 3 mechanisms (p.35)
    * Collaborate effectively + higher trust across + up and down org
    * Emphasize the mission - put aside personal + departmental issues
    * Level playing field - hierarchy less of a role 
* “Organizations with better information flow function more effectively“ p. 36
* In the context of accident investigations: “Our goal should be to discover how we could improve information flow so that people have better or more timely information...” (p.39)


## Ch.4 Technical Practices

## Ch.10 Employee Satisfaction, Identity, and Engagement 
- Research pointing to highly engaged employees and high-trust work environments having clear revenue and stock value impact (p.103)
- Helpful contrast of 
  - [Engaged] Teams using CD practices and taking an experimental approach to product development -> feeling more connected to org. -> increased rate of idea validation 
  - [Not engaged] Requirements handed down to dev teams and work delivered in large batches. "In this model, employees feel little control over the products they build and the customer outcomes they create, and little connection to the organizations they work for." (p.107) -> demotivating -> emotionally disconnected from work -> worse org. outcomes
- "Our analysis is clear... the best thing you can do...is institute a culture of experimentation and learning" (p.107–108)
- "The cycle of continuous improvement and learning is what sets successful companies apart, enabling them to innovate, get ahead of the competition" (p.108)
- DevOps + job satisfaction: automating toilsome tasks enables people to apply their judgement, experience, skills -> satisfaction with work

## Ch.11 Leaders and Managers

- "leadership is about inspiring and motivating those around you" (p.115)
- "establishing and supporting generative and high-trust cultural norms" (p.116)
- Have to point back to this article: https://rework.withgoogle.com/blog/five-keys-to-a-successful-google-team/

> Psychological safety was far and away the most important of the five dynamics...remember the last time you were working on a project. Did you feel like you could ask what the goal was without the risk of sounding like you’re the only one out of the loop? Or did you opt for continuing without clarifying anything, in order to avoid being perceived as someone who is unaware?

- "Leaders are those that set the tone of the organization and reinforce the desired cultural norms" (p.117)
- 5 characteristics of a transformational leader (p.117)
 - "Vision: Has a clear understanding of where the organization is going and where it should be in five years"
- Transformational leadership involves inspiring and motivating followers by appealing to their _values_ and _sense of purpose_ (p.117)
  - How often are we able to convey our team's mission in a way that stimulates the team's values? 
  - If individuals on the team were randomly asked about our team's guiding principles, would they be able to confidently respond and would the responses be more or less similar between people across our teams? 
  - Is knowledge of mission effectively communicated and reinforced?

- Helpful distinction between servant and transformational leader
  - Servant leaders focus on development and performance of those they lead
  - Transformational leaders focus on getting those they lead to _identify_ with the org. and act to further org. goals (transform as changing to internalize)

- Great set of survey questions based on Rafferty and Griffin work, "My leader or manager..." (p.118)
- Nicely articulated relationship: effective transformational leaders _indirectly_ supports great team performance (p.121)
  - Leaders enable teams ("provide air cover", "change incentives") and "amplify the effectiveness of the technical and organizational practices" 
  - But interesting distinction about the teams/orgs of the top 10% of strongest leaders being equally or even less likely to be high performers
  - "leaders cannot achieve goals on their own" (p.120)

### Role of managers

- "creating a work environment where employees feel safe" (p.122)
- “Managers should make performance metrics visible and take pains to align these with organizational goals“ (p.122)
- Great list of things technology leaders can do to support their teams (p.123)
    - "yak days" 
  
# Notes on Clean Coder

Notes from the [Robert C. Martin book](https://www.amazon.co.uk/Clean-Coder-Conduct-Professional-Programmers/dp/0137081073)

## Ch. 1 Professionalism

### Taking Responsibility
Neglecting testing to say you met a deadline (p.10)
- Saving face
- Pressure to be get things done fast and hesitance to indicate a need for more time

### Do No Harm to Function 

Devs can do harm to _function_ and _structure_ of software (p.11)
- Awareness that adding features or fixing bugs can provide an immediate sense of accomplishment
- But harm introduced to the longer term maintainability of the code base is hard to track because it often seems like a secondary concern
- And calling it out can introduce friction in interpersonal dynamics if a team does not have a culture of collaborative solution making

Practice apologizing because your software will always contain bugs and errors (p.12)
- However, you must strive to avoid repeating those errors

#### QA Should Find Nothing

Idea that some people send code to QA expecting them to find bugs (p.12)
- "Releasing code to QA that you don't know works is unprofessional." (lazy, irresponsible)

Every time someone else finds a bug, you should be surprised and determined to prevent it from happening again

#### You Must _Know_ It Works

Only way to know your code works is to test it. (p.13)

Concern about time needed to test is answered by advice to _automate_ the unit tests
- Tension remains if a team has been operating _without_ automated tests
- Don't teams sometimes see the time required to include tests as a "done" criteria an excessive demand?
  - In what contexts is it appropriate to forgo writing unit tests? 

All code should be tested
- "All. Of. It."
- "Every single line of code that you write should be tested. Period" 

Design code to be easy to test by writing tests first.
- Code that isn't written this way can indeed be harder to write tests for

### Do No Harm to Structure 

"delivering function at the expense of structure is a fool's errand" (p.14)
- Key to the economics of software is the ability to make changes without big costs
- Flexibility 

"mired in tar pit of poor structure" 
- Yikes!
- In hopes of regaining momentum, more devs added and structural damage deepened

"Flex" software to ensure it's flexible
- Make easy changes to it all the time
- If change is not as easy as you thought, refine the design
- Every time working with a module, make small changes to improve its structure
- Developers may hesitate to do this because they don't have tests in place to make them confident that they won't break things

### Work Ethic

20 hours a week caring for your profession / working on your career 

### Know Your Field

50 years of terminology and knowledge and techniques and technologies. A professional should know a good chunk of it
- My finding GCP training alien. 
- The constant confusion of being in a new unknown

### Practice

__Katas__ not really as a means to solve problems, but as a muscle memory enhancer like scales for a musician
- Useful also to practice in a new language

### Mentoring

Take personal responsibility for mentoring a junior
- Never let a junior "flail about unsupervised"

### Know Your Domain

Your responsibility to understand the domain you're programming 

"You should know enough about the domain to be able to recognize and challenge specification errors" (p.21)

### Identify with Your Employer/Customer

Understand their problems and make them your problems

Avoid dev vs. client attitude "at all costs"

### Humility

- Never ridicule others
- Accept ridicule when deserved
- Laugh it off when it's not

### To research:

- Principles, Patterns, and Practices of Agile Software Development (2002, Robert C. Martin)

Minimal list of things every software pro should be conversant in:
- Design patterns
  - All 24 in GOF book
  - Many in POSA books
- Design principles
  - SOLID principles
  - Component principles
- Methods
  - XP
  - Scrum
  - Lean
  - Kanban
  - Waterfall
  - Structured Analysis
  - Structured Design
- Disciplines
  - TDD
  - Object-Oriented design
  - Structured Programming 
  - Continuous Integration
  - Pair Programming
- Artifacts
  - UML
  - DFDs
  - Structure Charts
  - Petri Nets
  - State Transition Diagrams and Tables
  - flow charts
  - decision tables

### Personal takeaways:

"You should know enough about the domain to be able to recognize and challenge specification errors."

- Grateful to be able to observe this in some colleagues, and aware I'd like to have more of a voice during specification discussions

- Can think of individuals with informed and nuanced opinions on apps I've worked on, and how those people could challenge and collaboratively build on the direction of product owners 

"A code of conduct for professional programmers"

- Felt very aware of gap in professional status between myself and lawyers on site at my current workplace
- Disorienting when software work involves
  - a necessary openness to joiners
  - a nonconformist streak baked in
  - gamer culture influence

## Ch. 2 Saying No

- Professionals speak truth to power. Courage to say no to managers. (p.25)

### Adversarial Roles

- Notion that hard decisions best made through the "confrontation of adversarial roles" (p.26) 
- Manager is depending on you to pursue and defend your objectives as aggressively as he defends his
- Notion that manager doesn't have your best intentions in mind, but rather the objective they are trying to hit

- Finding and defining "the best possible outcome" is tricky 
- Developer needs to be comfortable disappointing the hopes of management because the outcome management has proposed is out of step with the reality of the work
- But equally, the manager needs to accept that their understanding of the work to be completed to achieve a given goal is incomplete without the honest assessment of those close to the code

- A manager can knowingly deceive an engineer and give a false sense that their time estimates are being considered and communicated to concerned parties (p.27–28, 30, 31–32, 34)
  - WHEN IN FACT, the manager just assumes they can pressure the developer into meeting a target and does not communicate his/her input to anyone else
  - "wheedling and cajoling" (p.32) 

- "How about two week from now?"
_vs_
- "It's going to take me two weeks, Mike"

### What about the Why?
- "the _why_ is a lot less important than the _fact_"
- possibly an invitation to micro management
- Changelog podcast (Squarespace Good Technical Debt) - Dev would not even indicate that part of the time involved in a task will be for adding tests, because it's simply built into how long his definition of done is

### High Stakes

- Being "absolutely determined to give your managers the best information you can. And this often means saying no." (p.29)
  - Very confrontation dialogue

### Trying

- Admission that the goal is attainable through the application of an extra reserve of effort you've been holding back

- Promising to try entails you have a new plan

- Idea that:
  - if you don't change your original plans
  - exert a reserve of effort you'd been holding back
  - and you feel reasonably confident in original estimates
- ... then you're just lying to save face when you say "We'll try"

- Encourages us to "stress the uncertainty and never back off"

### Passive aggression

- Asking for yes/no confirmation if your position/estimate has been communicated by manager to whomever it needs to be conveyed to
- Being ready to go over manager to communicate directly if not

### Cost of Saying Yes

- Feature's are always more complex than the effort to describe them (p.37)
- Example where cutting corners to meet an initial deadline and ending up with code that is not extendable will always come back to haunt you once the client inevitably 
  - asks for new features
  - extends the deadline
- Playbook of ways developers are manipulated by clients or management (in another person's blog post)
  - Tell developer the app is simple
  - Add features and fault team for not realising their necessity (or hired a new guy who noticed that)
  - Push the deadline over and over
- Responsibility on the dev in the blog post for accepting unreasonable timelines and feature sets 
  - AND for choosing to work the long hours 
- Trying to be a hero (temptation is huge)
- "saying yes to dropping our professional disciplines is is not the way to solve problems. Dropping those disciplines is the way you create problems"

### Personal takeaways:

Assuming an adversarial role is not intuitive for me.

Want to believe that a manager is providing guidance and helping me, when in fact they may very well be pursing their own interests. AND those interests can contradict your own interests and in fact be detrimental to you if you're not vigilant and guarding your interests. Feeling naive about how I'd thought of the manager relationship. 

Discomfort with disappointing

As pointed to over and over in this chapter, it's common for engineers to be ignored when communicating something that doesn't fit into manager's or client's aspirational targets.

I've definitely played the hero a time or two, and been quietly shocked when no one seems to care that I'd  met a deadline.

__Key lessons:__ 
- Developer must reality check delivery commitments and management depends on them to do so.
- It can be helpful to approach confrontation as being: "absolutely determined to give your managers the best information you can"

## Ch. 3 Saying Yes

### A Language of Commitment

- "There are very few people who, when they say something, they mean it and then actually get it done. There are some who will say things and _mean_ them, but they never get it done. There are far more people who promise things things and don't even _mean_ to do them."

### Recognizing Lack of Commitment

- need/should
- hope/wish
- Let's (not followed by "I...")

### What Does Commitment Sound Like?

- "I will ... by ..."
- "I will finish this by Tuesday"
- Important aspect of the language is you're stating something YOU'll do with a clear end time.
- Scary because, yes, you will feel awkward if you need to tell someone it's not done and people can hold you to the promise

- If the end goal depends on someone else, commit to specific actions that bring you closer to the end goal
  - Nice tie in with the earlier chapter's examples of saying no but committing to less involved outcomes that might suffice for the needs of demonstrating progress 

- If you're not sure if something can be done, finding out can be one of the actions you commit to.

- If you can't make a commitment, most important thing to do is raise a red flag ASAP to whoever you committed to

- "Creating a language of commitment" can help you "be taken as a serious developer who lives up to their word, and that's one of the best things you can hope for in our industry."

### Learning how to say "yes"

- "probably, but it might be the next day"
- "Monday is possible, but it might be as late as Tuesday"
  - Honestly describing uncertainty
  - Might be sufficient, but might not be

- Incorrect suppositions: Won't get done faster if you don't refactor, write tests, omit a full regression suite
  - "Years of experience have taught us that breaking disciplines only slows us down." (p.55)

- Need to be very honest with yourself about stamina and reserves
  - "Professional know their limits. They know how much overtime they can effectively apply, and they know what the cost will be."
- Nice example about someone agreeing to work over the weekend, after careful consideration of if the weekend is clear to take on work, and then asserting the need to take off Tu/We

- Professionals are not required to say yes to everything, but they _work hard to find creative ways_ to make "yes" possible
- When professionals say yes, they use the language of commitment, so there is no doubt about what they've promised.


### Personal takeaways:

Immediately useful to consider the language of commitment 
- I'll ___ by _____
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


## Ch. 4 Coding

### Preparedness

Breakdown of why coding is an "intellectually challenging and exhausting activity":

Your code must: 
1. work and solution must remain "consistent within the language, platform, current architecture, and all the warts of the current system"
1. solve the customer's problem. In full awareness that the customer's requirements don't always solve their problem. Responsibility to negotiate with customer to ensure true needs are met
1. not increase the "rigidity, fragility, or opacity" of the existing system. (_solid_ engineering principles) 
1. be readable by other programmers. Hard / might be "most difficult thing a programmer can master". 

- Readability as a guide to code reviews 
- If you cannot focus or concentrate sufficiently, your code will be wrong and will need to be redone. "Working while distracted creates waste." (p.59)
- If tired or distracted, find a way to settle your mind rather than coding

#### 3AM Code
 
- 3AM code where his solution was _the only thing_ he could think of
  - Capacity to creatively imagine several potential solutions and begin pursuing the best one, while also maintaining an awareness that you can change course and pursue an alternative
  - Easy for me to consider this in writing, where different sentence structures or word choices or just ideas are accessible
- That one badly designed but at-the-time sufficient solution introduced a recurring need to work around it in the months that followed
  - "It caused all kinds of strange timing errors and odd feedback loops"
  - Never seemed to have time to rewrite the problematic solution, but always seemed to have time to write workaround after workaround
- Professionalism = balancing your life (rest, effort, all-the-everything) so you can put in 8 good hours of work a day (p.60)

#### Worry Code

- Calling out the ways that we can stare at the code in front of us, but mentally be a million miles away trying to resolve a disturbed or upset head state
- Take some time (maybe an hour) to resolve the worry. Then turn back to coding
- Mentions somewhere (p.65) the way that being fearful can also block your coding brain. I feel that when I'm just aware enough that I'm working to an impossible deadline to achieve and yet quietly in denial, resisting the idea of pausing to reassess what a realistic outcome would be

### Flow zone

- While developers often say they want to get into __the zone__, can see it really as a "mild meditative state in which certain rational faculties are diminished in favor of a sense of speed."
- Being in the zone often means moving quickly, which feels god
  - In fact, might just be disabling the capacity to critically evaluate if the solutions you intuitively lands on are the right ones or if alternatives might be better
  - May write code faster, but will need to revisit it more often
- Big benefit of pair programming is that it's impossible to slip into the zone
- Caveat that when practicing with something like katas, the zone might be chill

#### Interruptions

- Be wary of the ways we can be rude in responding to interruptions because we resent being pulled out of the zone (or an attempt to get into the zone)
- Pairing is helpful for interruptions because your partner can help hold the context of the work. 
  - Help you "reconstruct the mental context"
  - I always feel like I'm juggling and drop the balls during an interruption, so maybe can think of passing the balls to your partner
- TDD also helpful because it too can hold the mental context
- "polite willingness to help" is really the professional response (p.64)
  - Of course, also a need to choose a good time, which he mentions later on with the idea of blocking out individual time and open-to-help time (p.74) 

### Writer's Block

- Not getting enough sleep or worry, fear, and depression can cause writer's block
- Uncanny how well it works to find a partner to pair with to overcome writer's block

#### Creative Input

- Hours spent away from usual problems "being actively stimulated by challenging and creative ideas, results in an almost irresistible pressure to create something myself"

### Debugging Time 

- We don't think of debugging time as coding time, but it's just as expensive
- Analogy of surgeon reopening a patient or a lawyer retrying a case as being unprofessional
  - As a developer, creating bugs that cause a need to return to code to resolve a problem is unprofessional (p.69)

### Being Late

- When you know you've fallen behind a time target, telling everyone you'll be on time until the very end = worst
- Instead, _regularly_ measure progress against end goal
  - and come up with 3 fact-based end dates" best, nominal and worst case
- "Do not incorporate hope into your estimates!" (p.71)

#### Hope

- In the common case that you _might_ miss a deadline
- e.g. You've got an event in 10 days and your estimates are best 8, nominal 12, worst 20 days
  - "_Do not hope you can get it done in 10 days!_"
  - Your responsibility to make sure the team and stakeholders know that you will not make the deadline
  - "Don't let anyone else have hope." LOL
- Hope is the project killer, destroyer of schedules and ruiner of reputations 

#### Rushing 

- Hold to your estimates and don't agree to rush
- "original estimates are more accurate than any you'll make while your boss is confronting you"
- If asked to do something faster, say you've already considered the workload and the only way to do things faster is to reduce scope
- "_Do not be tempted to rush_"
- Do not agree to "try" to make a deadline
  - You are then guilty of giving team and stakeholders false hope 
  - Only avoid facing the issue of making a tough decision and make that conversation more difficult later 
- "There is not way to rush"
  - Cannot solve problems faster, will only slow yourself down and other along with you by making a mess
- "you must answer your boss, your team, and your stakeholders by depriving them of hope."

#### Overtime

- Overtime can work in some situations
- It will certainly fail if it goes on for more that 2–3 weeks
- Agree only if you can personally afford it, it's short term and there's a fall-back plan
- The person asking you to work overtime _must have a fall-back plan_ in case the overtime fails
  - No fall-back plan = do not agree to work overtime

#### False delivery

- Saying you're done when you know you're not
  - Drives me crazy when people do this
  - I'm sure I've done it too. Feels like this is the key place done criteria comes up
- "far more insidious case is when we manage to rationalize a new definition of done" (p.73)
- Then other people follow suit and it becomes a lazy, destructive norm. 
- Managers hear everything is going fine there's a time delay before the short cut blows up an expensive timeline is disrupted and reputations are knocked 

#### Define "done"

- Have "business analysts and testers create automated acceptance tests"

### Help

- Challenging to carefully partition code solutions into small understandable units that have as little to do with each other as possible
- "No matter how skilled you are, you will certainly benefit from another programmer's thoughts and ideas"
  - Nice to think of in the context of PR reviews for more experienced devs 

#### Helping others

- Violation of pro obligation to hide away in a room in order to avoid any interruptions / queries
- As a professional, honour bound to offer help when it is needed
- Amazing how much of these insights seem evident once they're presented this way, but I've never once had anyone say them to me
  - Apart from "Be kind"
- "You should be conscious of the status of your teammates"
  - If someone seems in trouble offer help. 
  - Not that you're smarter than your teammates, but a fresh perspective can be a "profound catalyst for solving problems"
- When helping, plan to spend some time, probably and hour. 
  - Don't appear to be rushed
  - "Resign yourself to the task and give it a solid effort"

#### Being helped

- "Do not protect your turf"
- Accept an offer of help
  - If nothing much comes out of it after 30 minutes, politely end the pairing  
- Learn to ask for help
  - "It is unprofessional to remain stuck when help is easily accessible" (p.75)
- Notion that programmers may not be collaborative by instinct, so need discipline to foster collaboration 


### Personal Takeaways

- Hope is the project killer, destroyer of schedules and ruiner of reputations (p.71)
- I must deprive others of hope (if our original estimates support it)
- Saying you'll "try" and rush to meet a deadline makes you guilty of providing false hope
- When offering help, plan to sit with a problem for an hour
- Be wary of "the zone" since you may simply be embracing a head space in which you're incapable of holding multiple potential ways of solving a problem. THe solutions might be those that are the most intuitively evident rather than the most appropriate.
- Even the most skilled developer benefits from a second perspective
  - Easy win for current project to break down large components into smaller, more understandable units


## Ch. 5 Test Driven Development

- Three laws of TDD lock you into a quick cycle (30 seconds) of writing a test, then needing to write the production code to make it pass

1. No production code until written first failing test
1. Not allowed to write more unit test than is sufficient to fail
1. Not allowed to write more production code than is sufficient to pass the failing test

- Defect injection rates much lower than w/o TDD
  - This has a huge effect on a project and should not be ignored

#### Documentation

- Each unit test is an example written in code that describes how a system should work
- Unit tests are the best kind of low-level documentation
- "unambiguous, accurate and written in a language that the audience understands"  

#### Design

- Writing tests first forces you to think of good design
- Prevents coupling "functions together into an untestable mess"


### Discussion Questions

- Have you had a time when you've needed to work overtime and needed to negotiate a fall-back plan? (p.72)

- Drives me crazy when there's a sense of false delivery. How do you navigate defining done?

## Ch. 6 Practicing

- Musicians practice scales so they can be free to perform 
- This chapter is about a similar premise in software where a developer practices a routine so that other thinking processes are more clearly accessible while coding  

### Kata

- "a precise set of choreographed keystroke and mouse movements that simulates the solving of some programming problem." (p.90)
- Already know the solution, so not really problem solving
  - Instead, "practicing the movements and decisions involved in solving the problem"
  - Interesting to think of practicing _decisions_ so they become more automatic
  - Completely different to what I thought of, where I approach a Code War kata as a brief problem solving exercise
- https://katas.softwarecraftsmanship.org
- www.butunclebob.com/ArticleS.UncleBob.TheBowlingGameKata

### Broadening Your Experience

- w/o a "broadening influence" can become unprepared for changes that sweep the industry
- Open source as "pro-bono" work like a other professionals might take on
- Practice time is not paid for by employer 
  - Liberty there is that you can pick up whatever language you want and keep your "polyglot skills sharp"
  - Good encouragement to maintain that suppleness and humility of mind that learners need

## Ch. 7 Acceptance Testing

#### Communicating Requirements 

- Premature precision = desire for both business and programers to know what they'll get or exactly what they'll build at the outset

#### Uncertainty principle 

- Only once a business sees a requirement actually running do they get a better idea of what they really want (p.97)
- "Observer effect", as in, demoing a feature gives more information than business had before, and the new information impacts how they ses the whole system

#### Late ambiguity

- "An ambiguity in a requirements document represents an argument amongst the stakeholders."
  - Idea that a disagreement is often papered over by language
- Example of a misunderstanding where two parties didn't work hard enough to ensure they'd fully understood one another
- Responsibility of professional developers (and stakeholders) to make sure ambiguity is removed from requirements
  - It's a hard thing to do, and the only way he knows how to do it is through...

### Acceptance Tests

- Term itself is overused and commonly not clearly understood
- Here test written by stakeholders and programmers in collaboration to define when a requirement is done
- Nod to the fact that devs often say something is "done" when they really just no longer want to work on the parts required to fully complete it
  - But a professional developer only has a single definition of done: all code written, tests pass, QA and stakeholders accepted
- Pros drive their definition of a requirement all the way to __automated acceptance tests__
 - Easy to say, but the actual work of ensuring stakeholders and QA agree that the tests are a "complete specification of done" is __not simple__ and involves pushing beyond false understandings / finishing points 

 #### Communication

 - Acceptance tests help to demand a standard of detailed communication
 - Developers, stakeholders and testers all understand what the plan for the system behavior is
   - Considering the the general desire to hand wave away complexity during discussions, this is a challenging task. It looks deceptively simple in writing, but the actual work of clearly specifying is rigorous 
   - "Professional developers make it their responsibility" to work with all parties to know what is about to  be built

#### Automation

- Cost of automating acceptance tests is not very much compared to the cost of paying people to perform manual tests 
  - "makes no economic sense to write scripts for humans to execute" (p104)
- Responsibility of professional developers to ensure acceptance tests are automated
  - As in, if you're allowing others to manually test, you're being _irresponsible_

#### Extra work

- Common for writing acceptance tests to be seen as "extra work"
- But considering you'd have to specify a manual testing script anyway, it's not _extra_
  - "Writing these tests is simply the work of specifying the system"
- Frame them as massive time and money savers
  - Will prevent you from implementing the wrong system and let you know when you are done.

#### Who writes acceptance tests and when

- Ideally, stakeholders and QA would write these tests and developers review for consistency
- IRL, its delegated to business analysts, QA or even developers
  - If devs need to write these tests, make sure another dev is the one implementing the tested feature
- Typically: BA's write "happy path" because those tests describe the features providing business value
- QA writes unhappy path tests: boundary conditions, corner cases, exceptions
- Principle of "late precision" = acceptance tests should be written as late as possible
  - A few days before feature is implemented 
- In a sprint, first tests written for day one of the sprint/implementation. Aiming to have all tests complete by midpoint
  - If not complete by midpoint, other devs need to help out. If that happens frequently, need to bring on BA/QAs

#### The Developer's Role

- Developer should start implementation work with a set of tests that all fail when they run
- The developer's job is to:
  - connect the acceptance test to the system/application 
  - make the tests pass 
- Be cautious to avoid the __passive-aggressive option__ of writing code to pass a test you think is incorrectly written
- As a professional, it's your job to help the team create the best software they can
  - This means looking out for errors and putting in the work to correct them

### Acceptance Tests and Unit Tests

- Unit tests = by programmers for programmers
  - Describe lowest level structure and behavior of the code
- Acceptance tests = by the business for the business
  - Formal requirements doc that specifies how the system should behave from the businesses POV
  - Audience is business and programmers
- Interesting framing that both unit and acceptance tests are _documents first_ and tests second
  - Primarily, they "formally document the design, structure, and behavior of the system"
- Specification is their true purpose
  - Verifying everything works is hugely useful too though

#### GUIs and Other Complications

- __Single Responsibility Principle__: Separate those things that change for different reasons. Group things that change for the same reasons.
- Underlying capabilities and abstractions of a GUI often don't change that often
- Tests need to target unique ID since UI tends to change somewhat frequently
- "Write your business rule tests to go through an API just below the GUI" (p. 110)
  - Separate a GUI from business rules. Is this similar to what we have when a client can use our product as an "API user", maybe making their own GUI?
- Tests of the GUI itself should be kept to a minimum because they are fragile
- "When every GUI change breaks a thousand tests, you are either going to start throwing the tests away or you are going to stop changing the GUI." 
  - Interesting to think of tests as creating the perverse effect of discouraging change to a GUI. So often we think of tests enabling devs to refactor with confidence, but you can see how the extra effort of needing to update a test could discourage being able to easily change a UI.

#### Continuous Integration

- All tests should be run several times a day in a CI system triggered by incoming code commits/PRs
- "Stop the Presses": CI tests should _never_ fail
  - If they fail, the whole team should stop what they're doing and focus on getting them to pass again

### Acceptance Tests Conclusion

- Communication between stakeholders and developers about the details of an application is __hard__.
  - "It is too easy for each party to wave their hands and _assume_ that the other party understands" (p.111)
  - Entirely possible for both to "agree" and walk off with different ideas
- Only way Uncle Bob knows to eliminate comms errors is to write automated acceptance tests
- Completely unambiguous and can never get out of sync with the application = perfect requirements document 

## Ch. 8 Testing Strategies

### QA Should Find Nothing

- Every time QA finds something wrong, the dev team should be dismayed, and ask themselves how it happened and how it can never happen again
- QA's role is to work with the business to create the automated acceptance tests that because the true spec and requirements doc for the system

### Test Automation Pyramid

- Unit Tests: 
  - Specify system at the lowest level
  - Written before the production code the developer is about to write (TDD)

- Component Tests:
  - One form of acceptance tests related to the business rules a component executes
  - Passes input data into a component and tests output
  - All other system components are decoupled via mocking and "test-doubling"
  - Half the system. Typically happy-path as unhappy-path are covered in unit tests
  - Written by QA + business with support from devs
  - Business should be able to read and interpret these tests if not author them

- Integration Tests:
  - Only for a system with many components. Tests that they all communicate together well
  - Don't test business rules but instead how well assembly of components works together
  - "properly connected and can clearly communicate"
  - Not executed as part of CI because typically longer runtimes
    - Periodically (nightly, weekly)

- System Tests:
  - "ultimate integration tests"
  - Entire system's parts interoperate as planned
  - Throughput and performance tests here, but not business tests
  - Written by system architects and tech leads
  - Only cover 10% of system and not focused on behavior (already covered), only focused on system construction


- Manual Exploratory Tests:
  - Not automated or scripted, but when people click around and try to find bugs intuitively and creatively

## Ch. 9 Time Management

### Meetings

- Professionals are aware that they have code to write and schedules to meet. 
  - Actively resist attending meetings that don't have an immediate and significant benefit

#### Declining

- Don't need to go to every meeting invited to. Indeed, unprofessional to attend too many meetings.
- Don't accept invites unless meeting is one for which participation is _immediately and significantly necessary to the job you're doing now_
  - Trade offs if particularly interesting meeting or if it benefits other teams in a key way
  - Important thing to keep in mind is if you can afford it
  - Your responsibility is to your projects first, not other teams'
  - "The person inviting you to a meeting is not responsible for man
- Important duty of a manager is to keep devs out of meetings 
  - Good manager will defend decision to decline because they are concerned about your time

#### Leaving

- Meetings don't always go as planned
  - Bob's rule: "When the meeting gets boring, leave" (p.124)
- It's your obligation to manage your time well, which might mean finding a way to politely exit
- __Ask if your presence is still necessary__
- Remaining in a meeting that is not a good use of your time and to which you can no longer contribute is _unprofessional_
- Obligation to wisely spend your employer's time and money

#### Have an agenda and a goal

- Before agreeing to go to a meeting, insist that the discussion topics are clear, as are their allocated time, and there's a goal

#### Iteration/sprint planning meetings

- Estimates should already be done for candidate items before the planning meeting
- Assessment of business value should already be done
- Real good: acceptance/component tests already written before planning session
- Idea is to allow candidate items to be quickly discussed and rejected or accepted
  - No more than 5 minutes on a given item
- Interesting rule: shouldn't take longer than 5% of sprint/iteration
  - 1 week sprint = 2 hour meeting 

#### Retro + Demo

- Each retro should have a demo to stakeholders
- Stakeholders should see a demo of newly working features at the end of each sprint
  - We did this, or at least attempted, in VRP

#### Arguments/Disagreements

- "Any argument that can't be settled in 5 minutes can't be settled by arguing" (p.126)
  - Needs evidences to support the resolution of the dispute
- Technical disagreements can have loads of justifications but still won't be able to forge agreement 
  - Only way to resolve is through getting data
- Some will attempt to win by "force of character"—yelling or acting condescending
  - Won't settle an argument for long. Only data will
- Some will be passive aggressive and agree only to see something crash and burn
  - Never do this. "If you agree, then you _must_ engage"
- How to get data? Agree on a set of criteria and a length time to try one of the alternatives out and then come back and check in on how it went

### Focus-manna

- Programming is a taxing intellectual exercise that will deplete you and require regeneration
- Focus-manna = know it when you got it because you're able to focus
  - Is a __decaying resource__: if you don't use it while it's there you'll lose it
  - It can be eaten up by meetings, when it should be applied to coding 
- Pros learn to strategically organize their day to make use of the focus-manna
- Recharging rather than writing code while spent that will almost certainly have to be written again the next day
  - Take 30 minutes to de-focus
- "Muscle focus" facilitating greater mental focus 

### Time boxing and tomatoes

- Real benefit is that the 25 minutes allows you to aggressively defend your focus against all interruptions
- Nice to accumulate over the course of the day as a metric of how well you were able to focus

### Avoidance

-  I really like this phrase __priority inversion__
  - A lie we tell ourselves because we're unwilling to face what needs to be done
  - Elevating the priority of a task that really doesn't need to be done _right now_

### Blind alleys

- Making a technical decisions that leads nowhere
- "The real skill you need is to quickly realize when you are in one, and have the courage to back out." (131)
- Pros avoid getting so vested in an idea that they can't abandon it and turn around

### Messes

- "Nothing has a more profound or long-lasting negative effect on the productivity of a software team than a mess. Nothing."
- Progression of a mess is insidious.
  - Everything is written cleanly, but at some point you realize a design decision doesn't scale in the direction the requirements are progressing
  - "This is the inflection point! You can still go back and fix the design." It will never be easier than at that moment
  - If you don't change the design you proceed and in the coming months get into a mess from which you never escape!
- Pros feat messes far more than blind alleys
  - They are always on the look out for them and will expend all effort needed to escape as early and quickly as possible

## Ch. 10 Estimation

- Source of nearly all _distrust_ between developers and business people

#### Commitments

- Professionals only make commitments if they are certain they can satisfy them
  - If not _certain_ then required to decline the commitment 
  - If you _can_ make a commitment but know it will take long nights and weekend, better be ready to do what it takes before agreeing to the commitment 
- Others will make plans based on your commitment
  - If you fail to meet a commitment, cost to them and your reputation is significant
  - "Missing a commitment is an act of __dishonesty__ only slightly less onerous than an overt lie" (138)

#### An estimate

- A probability distribution rather than a number 
- __Implied commitment__ - very interesting
  - Scenario which you could easily imagine: dev gives estimation distribution of 2–3 days in best case scenario, but possibly 5–6 or even more depending on unknowns
  - Manager tries to get _implied commitment_ by first asking "no more than 4 days" then "can you _try_ to get it done in 6 days"
  - Revisiting an earlier point: "try" is a loaded term implying a commitment that will force the dev to work long nights or cancel family vacations to meet if he's implicitly committed to it
  - Professional resists commitment in each instance, instead "communicating the probability distribution as clearly as they can so managers can make appropriate plans"
  
#### PERT

- Program evaluation and review technique from US Navy
- _Trivariate estimation_: Optimistic (wildly), nominal (likely), pessimistic (wildly) estimations
  - Then a bit of math to arrive at a number to work with
  - Expected duration: (O + N4 + P) / 6 
  - Standard deviation to account for _uncertainty_: (P - 0)/ 6
  - For a sequence of tasks, standard deviation is given more weight
  - "the uncertainty in those tasks compounds in a  way that adds _realism_ to the plan" (144)
- Just one technique to help avoid setting optimistic expectations
  - Need to avoid optimistic estimations and build times that take 3–5 times longer than expected
- Good engineers are __careful to set reasonable expectations__ despite pressure to go fast

### Estimating tasks

- Various modes of estimating with consensus (_wideband delphi_)
- Simultaneity of displaying estimates is important (don't want people to change estimates based on others')
- _Affinity estimation_: no talking, put all tasks as cards on board and team members sort them relative to one another 
  - If any card is moved more than (x) times, then it's set aside to be discussed
  - Then lines for Fibonacci dividers are drawn (days to complete)
- Most of the time, we want 3 estimates to provide a _probability distribution_ (can use above techniques to get trivariate)
- _Law of Large Numbers_: Avoid large tasks. Break them down into smaller parts and estimate those

### Estimation conclusion
 
 - Professionals meet commitments when they make them, and they meet hard numbers
 - But in most cases, professionals don't make these kinds of commitments
   - Instead, "they provide probabilistic estimates that describe the expected completion time and the likely variance" (148)

## Ch. 11 Pressure

- Example of demeanor and how you'd expect a surgeon to conduct themselves under pressure
  - Point being, swearing and blaming management for unrealistic expectations or just constantly complaining is immature and unprofessional 

### Avoid pressure

- As a pro engineer, your __job is to avoid pressure__

#### Commitments

- One way to avoid pressure is to avoid making commitments you can't meet
- Business will always want commitments because they want to eliminate risk
- Out job is to make sure risk is quantified and presented clearly to the business so they can plan accordingly and manage it appropriately
- Is business makes a commitment for us, then we help find a way to meet that goal
- But if there's no way to meet those promises, those that made the commitment must ultimately accept responsibility (perhaps easier said than done, but still a guiding principle)

#### Staying Clean

- "do not succumb to the temptation to create a mess in order to move quickly" (152)
  - "quick and dirty" = oxymoron because dirty always = slow in the long run
- Avoid pressure by keeping our systems code and design as clean as possible
 - Not endlessly polishing, more so not tolerating messes
- Messes will slow us down, cause us to miss dates and break commitments
- Crisis discipline: follow the techniques you'd use in a crisis all the time

### Handling Pressure

- "Manage your stress" 
- Not sleeping or sitting and fretting won't help
- Also, _resist the temptation to rush_ at all costs. It will only drive you deeper into the hole
- Instead, slow down, plan out the best possible outcome and drive toward that at a steady reasonable pace
- _Communicate_: let team and superiors know your in trouble and plan to get out of it
  - Ask for their input
  - "Avoid creating surprises" (154)
- Trust your disciplines. Under pressure is not the time to abandon or question them
- If you see someone who's under pressure, offer to pair with them 

## Ch. 12 Collaboration

- Various examples of how programmers can fall into harmful habits of preferring self-serving focus to a pursuing a shared aim
- Idea of people on a team doing what seems interesting/what they _want_ to do over a sense of what would help the team and business achieve its goals

#### Programmers vs. Employers

- Story of employer being frustrated by description of a bug as interesting
  - "_Bug's aren't interesting! They just need to be fixed_"
  - Be mindful of the values and goals of the people who pay you
- Don't bury yourself in technologies that interest you while the business burns down
  - Your job is to keep the business afloat
- Professional programmers take time to understand the business
  - Talk to users about the software
  - Talk to sales and marketing about the problems they have
  - Talk to managers to understand the short and long term goals of the team

#### Programmers vs. Programmers

- Building a wall around code and not letting others touch it is a sure sign of a dysfunctional team
  - "Owned code"
- Far better to break down walls of code ownership and have the team own all the code
  - Professionals work with each other to on as much of the system as possible
  - Learn from each other by working on different parts of the system
- One great way to avoid creating knowledge silos: pairing
  - Everyone should be able to step into any role in a pinch
  - Interesting idea to think of pairing as _a way of conducting a code review_
- "I want you sitting around tables _facing_ each other" (165)
  - Overhearing frustrated mutterings, serendipitous communications, verbal and body language 

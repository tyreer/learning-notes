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

## Discussion questions 

1. This chapter sets a pretty high bar. Which of the standards of professionalism do you find the most challenging to live up to and why?

1. Which "unprofessional" practices are you... familiar with? Have you ever done or worked with someone who has acted in a way Uncle Bob critiques?

1. In what contexts is it appropriate to forgo writing unit tests? 



- Mention disfluency 
- Practice: Daily Katas 
- Add discussion questions to a Google Doc for others to contribute to
- Maybe one extra bit of homework is for everyone to pick one of the "minimal list" and report back on it by the end of the book club in the Slack chanel?

To research:

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
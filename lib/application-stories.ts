export type ApplicationStoryData = {
slug:string;company:string;role:string;headline:string;emphasis:string;intro:string;monogram:string;problem:string;
conceptTitle:string;conceptIntro:string;workspaceName:string;
steps:{label:string;title:string;body:string;signal:string;takeaway:string}[];
thesis:string;thesisBody:string;
evidence:{title:string;description:string;url?:string}[];closing:string;
};
const sharedEvidence=[
{title:"SAVRON Business OS",description:"Booking, walk-ins, memberships, staff communications and an early bilingual AI voice concierge pilot, shaped with a real service business.",url:"https://savronmn.com"},
{title:"NxtSeat",description:"A service-business software exploration bringing booking, messaging, memberships and voice assistance into a more connected workflow.",url:"https://nxtseat.co"},
{title:"Fofo Labs",description:"Founded and coordinated a four-person team. Contributed to a La Estancia short-form campaign reaching about 540,000 views and 1,200 new followers in its first month."}
];
export const stories:Record<string,ApplicationStoryData>={
stripe:{
slug:"stripe",company:"Stripe",role:"Demo Engineer",monogram:"S",
headline:"Don't just show the product.",emphasis:"Show the possibility.",
intro:"I build the moments where complex software becomes immediately understandable. A demo should begin with the customer's job, not the product menu.",
problem:"A useful demo tells one clear story. What changed for the customer, how did the products work together, and why did it matter?",
conceptTitle:"One business. One connected experience.",
conceptIntro:"An illustrative demo storyline for a neighborhood service business. Each stage answers a real operator question. This is not a working Stripe integration.",
workspaceName:"Demo storyboard",
steps:[
{label:"The booking",title:"Start where the customer starts.",body:"A client books a service. The experience captures intent, keeps the next step clear, and sets expectations before the appointment.",signal:"One booking journey, no handoff confusion.",takeaway:"The story begins with a real customer action."},
{label:"The payment",title:"The moment of commitment.",body:"Introduce a hypothetical payment step only after the booking context is established. Explain when money moves and how the customer knows what happened.",signal:"The payment makes sense inside the workflow.",takeaway:"A production demo would validate actual API and product behavior."},
{label:"The business",title:"Close the loop for the operator.",body:"Show how an owner might review the appointment and payment outcome without switching between disconnected narratives.",signal:"A better story is an end-to-end outcome.",takeaway:"No fictional transaction or Stripe integration is represented as real."}
],
thesis:"The best demo is not a feature tour.",thesisBody:"It's a compact product experience built around a customer decision. Clear scoping and technical accuracy make the story credible.",
evidence:sharedEvidence,closing:"Let's turn a complex workflow into something people can see."
},
rox:{
slug:"rox",company:"Rox",role:"Product Marketing Manager",monogram:"R",
headline:"Show the work.",emphasis:"Not just the promise.",
intro:"Revenue agents become compelling when a seller can point to the work that disappeared and the customer relationship that improved.",
problem:"AI positioning gets stronger when every claim can be traced to a customer signal, an action, and an outcome.",
conceptTitle:"From customer signal to seller action.",
conceptIntro:"A hypothetical demonstration framework for explaining agentic revenue workflows. No actual Rox agent or customer data is connected.",
workspaceName:"Revenue story",
steps:[
{label:"The signal",title:"Find the moment that matters.",body:"Imagine a customer asks about changing their plan while an open opportunity is being reviewed. Begin with the context a seller needs, not an AI adjective.",signal:"The right context changes the next action.",takeaway:"Example scenario, not a live Rox product demonstration."},
{label:"The agent",title:"Explain exactly what the agent does.",body:"Make the boundary clear: what an agent can gather or prepare, what it can recommend, and what still needs human judgment.",signal:"Useful autonomy needs visible boundaries.",takeaway:"Specific product behavior would be validated with Rox's team."},
{label:"The seller",title:"Return the time to the relationship.",body:"End with the human outcome: a seller spends less time coordinating information and more time talking to a customer.",signal:"Less administration. More customer focus.",takeaway:"A commercial message should be supported by real customer evidence."}
],
thesis:"Specificity is the competitive advantage.",thesisBody:"A strong launch can connect technical architecture, real workflow proof, seller language and a repeatable field story. I like working across all four.",
evidence:sharedEvidence,closing:"I would love to help make Rox impossible to misunderstand."
},
thatch:{
slug:"thatch",company:"Thatch",role:"Product Marketing Manager",monogram:"T",
headline:"One product.",emphasis:"Different reasons to care.",
intro:"Employers, brokers, and employees can look at the same benefits product and need three entirely different explanations.",
problem:"Clarity is not simplifying the product until it loses meaning. It is choosing the right meaning for each audience.",
conceptTitle:"Make the value visible to each person.",
conceptIntro:"A sample messaging exercise for distinct audiences. This is independent positioning work, not a description of Thatch's official product implementation.",
workspaceName:"Audience messaging",
steps:[
{label:"Employer",title:"Predictability without indifference.",body:"Lead with the employer's decision: how to offer meaningful choice while keeping benefits spending understandable.",signal:"A budget story for the buyer.",takeaway:"Validate claims and eligibility with benefits specialists."},
{label:"Broker",title:"A story worth recommending.",body:"Give the advisor language that anticipates confusion and focuses on the practical conversations they have with employers.",signal:"Make the explanation repeatable.",takeaway:"Broker research should precede any launch recommendation."},
{label:"Employee",title:"Start with the person living it.",body:"Explain choice in everyday terms without turning a complicated healthcare decision into a misleading promise.",signal:"Confidence begins with clear options.",takeaway:"This is messaging only, not health insurance advice."}
],
thesis:"Good product marketing respects complexity.",thesisBody:"It keeps the promise accurate while giving every audience a reason to understand, trust, and act on it.",
evidence:sharedEvidence,closing:"I'd like to help make complicated choices feel understandable."
},
plaid:{
slug:"plaid",company:"Plaid",role:"Product Marketing Manager, Onboarding",monogram:"P",
headline:"The first useful moment",emphasis:"changes everything.",
intro:"Onboarding is where positioning meets product reality. The goal is not just getting people through steps. It's getting them to value.",
problem:"A great first-run experience should tell customers why they are here, what happens next, and what they have gained.",
conceptTitle:"A first-value onboarding narrative.",
conceptIntro:"A conceptual product adoption exercise, not an implementation of Plaid's APIs or a claim about its current onboarding.",
workspaceName:"Activation journey",
steps:[
{label:"Understand",title:"Show the outcome first.",body:"Introduce the job the user wants to complete before presenting setup terminology, permissions, or technical choices.",signal:"Know why before learning how.",takeaway:"Start with research into user intent."},
{label:"Connect",title:"Make the next step obvious.",body:"Explain progress and trust at every boundary. Reduce surprise without hiding important user choices.",signal:"Confidence is part of conversion.",takeaway:"Validate with security, compliance and product teams."},
{label:"Realize",title:"Make the first success unmistakable.",body:"Show what actually changed and suggest the most relevant follow-on action. Measure whether people reach the intended moment.",signal:"Time to first value is the story.",takeaway:"Conversion hypotheses require actual funnel data."}
],
thesis:"Activation is a product and messaging problem.",thesisBody:"I bring direct customer discovery, interface prototyping and hands-on growth execution, while continuing to build the deeper fintech expertise this role requires.",
evidence:sharedEvidence,closing:"Let's make the first useful moment easier to reach."
},
roboflow:{
slug:"roboflow",company:"Roboflow",role:"Product Marketing",monogram:"R",
headline:"From model.",emphasis:"To real-world outcome.",
intro:"A platform story becomes more persuasive when buyers can picture what changes at their factory, facility, or worksite.",
problem:"A buyer does not invest in a model alone. They invest in a workflow they can trust and an outcome they can explain.",
conceptTitle:"Turn a vision use case into a buyer story.",
conceptIntro:"A hypothetical vertical messaging exercise. No computer vision model is running here, and no outcomes are attributed to Roboflow customers.",
workspaceName:"Vision AI narrative",
steps:[
{label:"Observe",title:"Name the operational problem.",body:"For an illustrative inspection workflow, begin with what humans need to notice and why consistent visibility matters.",signal:"Start with the operation.",takeaway:"The scenario is conceptual, not a deployed model."},
{label:"Deploy",title:"Explain the system, not the magic.",body:"Show the path from inputs and model behavior to the people who will consume results. Treat reliability and exceptions as part of the story.",signal:"Proof requires system context.",takeaway:"Actual deployment claims require verified technical evidence."},
{label:"Measure",title:"Describe the decision that improves.",body:"Tie the potential workflow to a meaningful operational measure, then separate a hypothesis from a proven customer result.",signal:"An outcome, not an AI adjective.",takeaway:"No real performance metrics are implied."}
],
thesis:"The platform story should meet the buyer where the work happens.",thesisBody:"Developer credibility and executive relevance can coexist when use cases, product behavior and customer proof remain precise.",
evidence:sharedEvidence,closing:"I'd love to help translate vision into value."
},
ripple:{
slug:"ripple",company:"Ripple",role:"Product Marketing Manager, Treasury",monogram:"R",
headline:"Make complexity",emphasis:"clear enough to act.",
intro:"Financial infrastructure needs messaging that is both accessible and technically credible. This is a sample clarity exercise from a product and marketing generalist.",
problem:"Better financial storytelling begins by respecting the expertise and actual work of the treasury practitioner.",
conceptTitle:"From financial terms to decisions.",
conceptIntro:"An independent messaging exercise, not treasury software, financial advice, or a representation of Ripple's live product.",
workspaceName:"Treasury narrative",
steps:[
{label:"Visibility",title:"What can the team see?",body:"A cash-visibility message should address what information is available, how current it is, and which decision it supports.",signal:"Clarity before claims.",takeaway:"Treasury practitioner validation is essential."},
{label:"Exposure",title:"Which risk actually matters?",body:"For an FX-related story, show the business question first. Avoid pretending an illustrative dashboard proves risk can be eliminated.",signal:"Lead with the real financial decision.",takeaway:"Any FX claims require domain and legal review."},
{label:"Action",title:"What is the next useful step?",body:"Connect the information to the user's workflow, then make every limitation and assumption understandable.",signal:"Useful detail builds credibility.",takeaway:"This exercise is not a working TMS integration."}
],
thesis:"Technical credibility is part of the creative standard.",thesisBody:"My experience is in customer-facing software and messaging rather than hands-on treasury. The work shown here is an approach to explaining complexity, not a claim of domain expertise.",
evidence:sharedEvidence,closing:"I'd welcome the chance to learn from your practitioners."
}
};
---
title: "Design Trust, Credentials, and Dataspace Profiles"
description: "A path for the people who define how a dataspace works: roles, the dataspace profile, credentials, onboarding, policy terms, lifecycle, use cases, and what is left to applications."
prev: false
---

This path is about the decisions behind a dataspace. Before two members can share anything, somebody has decided who may join, what a member must prove, who confirms it, and which conditions a provider can put on an offer. The software carries out those decisions. It cannot make them.

The path follows the working group of the Bike Industry Association as it designs the fictional **Bike Dataspace**. The group works in three layers. **Facts** are what the association has verified about a member, stated in credentials. **Rules** are policy terms that turn facts into conditions every connector checks the same way. **Decisions** are what each member's applications settle in the individual case. The **dataspace profile** records all of it in a form that platforms and participants can configure.

In the Bike Dataspace an association admits members and confirms membership with a credential. This is the most common setup, and it keeps the examples concrete. It is one design and not a requirement. Lecture 4 says what changes without a membership credential.

## Who this path is for

- **Dataspace designers and governance authorities**: associations, consortia, and project teams that define the rules of a dataspace.
- **Onboarding and issuing teams** that admit members and attest facts about them.
- **Architects** who write the technical rulebook and need it to be implementable.
- **Platform teams** who want to understand what they are asked to configure, and why.

You do not need to write code. Some lectures show a small technical artifact, such as a credential or a policy constraint, where it makes a decision concrete. You should know the basic pattern of a dataspace exchange. If you do not, read [A Dataspace Use Case](../use-case/) first.

## What you will be able to do

After this path you can:

- separate the responsibilities of the governance authority, the issuer, the platform operator, the participants, and the owners of a use case;
- write a dataspace profile that every platform and every participant can configure without guessing;
- decide which credentials a dataspace needs, what they state, and in which format;
- design an onboarding process that keeps review and technical setup apart and leaves evidence;
- define a small policy vocabulary, and decide which credentials are presented with every request and which only when a contract requires them;
- plan renewal, changed facts, revocation, and the end of a participation, and say what each does to running exchanges;
- define a use case with its owner, its conditions, and the agreement its participants sign, and add it without rebuilding the platform;
- decide what belongs in a policy and what belongs in an application.

## Lectures

| # | Lecture | What it covers |
|---|---|---|
| 1 | [Why trust needs design](./01-why-trust-needs-design/) | What members rely on before they share, and the three layers of facts, rules, and decisions. |
| 2 | [Roles and responsibilities](./02-roles-and-responsibilities/) | Who decides, who attests, who signs, and who runs. |
| 3 | [The dataspace profile](./03-the-dataspace-profile/) | The technical rulebook as a versioned set of files, and where each part ends up in the components. |
| 4 | [Design the credentials](./04-design-the-credentials/) | Facts instead of permissions, membership as a common but optional start, the two credentials of the Bike Dataspace, and identifiers. |
| 5 | [Onboarding](./05-onboarding/) | Application, review, setup, and issuance, and who owns each step. |
| 6 | [Policy vocabulary](./06-policy-vocabulary/) | Policy terms, the expressions behind them, and the rule for presenting credentials. |
| 7 | [Credential lifecycle](./07-credential-lifecycle/) | Renewal, changed facts, revocation, and members that leave. |
| 8 | [Use cases and agreements](./08-use-cases-and-agreements/) | Who owns a use case, which agreements members sign, how versions are handled, and how a use case is added. |
| 9 | [Beyond the policy](./09-beyond-the-policy/) | What a contract leaves open, what each participant decides, and what the dataspace settles for those decisions. |
| 10 | [From pilot to scale](./10-from-pilot-to-scale/) | Where to start, what to add and when, and how to change a profile. |

Each lecture takes five to ten minutes to read. The lectures build on each other, so read them in order the first time.

## Before you start

The path continues the story of [A Dataspace Use Case](../use-case/). It uses the same companies and looks at the same events from the side of the people who set the rules.

It also uses the vocabulary of the [IDSA Rulebook](https://kb.internationaldataspaces.org/external/rulebook/001_Introduction/), the reference for dataspace governance. Where the Rulebook defines a term, the lecture links to the matching chapter.

## What this path leaves out

This path does not cover legal drafting, pricing, or the business case for a dataspace. It keeps configuration to a minimum:

- [Set Up a Dataspace Platform](../platform-setup/) shows how a profile is written as files, applied to a platform, and operated.
- [Build a Dataspace Application](../application/) shows how applications publish offers, write policies with the vocabulary defined here, and use the verified facts they receive.

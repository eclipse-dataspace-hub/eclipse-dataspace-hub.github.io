---
title: "A Dataspace Use Case"
description: "A story-first introduction to dataspaces: follow a group of bicycle-industry companies from a document-sharing problem to a working dataspace."
prev: false
---

This path explains how a dataspace works by following one example from start to finish. It contains no code and no deployment steps. It gives you the mental model that the other paths build on.

The example is a fictional **Bike Dataspace**. Bicycle manufacturers, their suppliers, and recyclers use it to share two kinds of information across company boundaries: supplier certificates and battery data. The companies and the association are invented. The problems they have are common, and the way they solve them reflects how dataspaces are built with Eclipse components today.

## Who this path is for

- **Newcomers** who want to understand what a dataspace is before touching any technology.
- **Decision makers and product owners** who need to judge whether a dataspace fits their problem.
- **Architects, developers, and operators** who want the end-to-end picture before going deeper.

You do not need to know the Eclipse Dataspace Components, the Dataspace Protocol, or verifiable credentials. Each term is introduced when the story needs it.

## What you will be able to do

After this path you can:

- explain why email, portals, and one-off integrations break down when many companies share data;
- describe how a company joins a dataspace and proves who it is;
- follow a data exchange from offer to agreement to transfer;
- explain what credentials and policies do, and what they do not do;
- say what happens when a certificate is renewed, a credential expires, or a member leaves;
- decide whether a dataspace is a reasonable answer to your own problem.

## Lectures

| # | Lecture | What it covers |
|---|---|---|
| 1 | [The problem](./01-the-problem/) | Why sharing supplier certificates is harder than it looks. |
| 2 | [The participants](./02-the-participants/) | The companies in the story and the roles they play. |
| 3 | [How a dataspace works](./03-how-a-dataspace-works/) | The basic pattern and the building blocks behind it. |
| 4 | [Joining the dataspace](./04-joining-the-dataspace/) | How a company becomes a participant and receives its first credential. |
| 5 | [Publishing an offer](./05-publishing-an-offer/) | How a supplier makes its certificates available without sending them anywhere. |
| 6 | [Finding and agreeing](./06-finding-and-agreeing/) | How a customer discovers an offer and negotiates a contract. |
| 7 | [Getting the data](./07-getting-the-data/) | How data moves once there is an agreement, and how updates are handled. |
| 8 | [A second use case](./08-a-second-use-case/) | How the same dataspace carries battery data with stricter rules. |
| 9 | [When things change](./09-when-things-change/) | Expiry, revocation, stricter policies, and members who leave. |
| 10 | [Is a dataspace right for you?](./10-is-a-dataspace-right-for-you/) | What the story showed, a decision checklist, and where to continue. |

Each lecture takes five to ten minutes to read. Read them in order the first time.

## What this path leaves out

This path does not show API calls, policy syntax, or deployment. Those belong to the other paths:

- [Set Up a Dataspace Platform](../platform-setup/) for the team that runs the infrastructure.
- [Build a Dataspace Application](../application/) for the team that connects business systems.
- [Design Trust, Credentials, and Dataspace Profiles](../trust-and-profiles/) for the team that defines the rules.

For the formal definition of dataspace concepts and roles, the [IDSA Rulebook](https://kb.internationaldataspaces.org/external/rulebook/001_Introduction/) is the reference. This path uses the same vocabulary where it can.

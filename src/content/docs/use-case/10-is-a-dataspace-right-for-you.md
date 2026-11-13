---
title: "Is a dataspace right for you?"
description: "A summary of what the Bike Dataspace showed, a checklist for judging your own situation, and where to continue."
next: false
---

You have followed the Bike Dataspace from a document-sharing problem to two working use cases. This last lecture sums up what the story showed, helps you judge whether the approach fits your own situation, and points to the next step.

:::note[In this lecture]
- The story mapped to dataspace concepts and Eclipse components.
- Signs that a dataspace fits, and signs that it does not.
- Where to continue, depending on your role.
:::

## What the story showed

| In the story | Concept | Eclipse component or specification |
|---|---|---|
| The association admits Costa and confirms its membership | Governance authority, credential issuer | EDC Identity Hub (its Issuer Service) |
| Costa's identifier and its proof of membership | DID, verifiable credential, Credential Service | EDC Identity Hub, Decentralized Claims Protocol |
| Costa describes its certificates and states conditions | Asset, policy, offer | EDC Connector |
| Lindner asks what Costa offers and concludes a contract | Catalog, contract negotiation, agreement | EDC Connector, Dataspace Protocol |
| The certificates travel from Costa to Lindner | Transfer, data plane | A data plane with Data Plane Signaling |
| Danube Cloud sets up each new member in seconds | Participant provisioning | Connector Fabric Manager |
| Brandt restricts detailed battery data to recyclers | Attribute credential, contract policy | EDC Identity Hub (its Issuer Service), connector policy engine |
| Hansen loses access when its permit is withdrawn | Revocation | EDC Identity Hub (Issuer Service and Credential Service) |

## A dataspace fits when

- **Many organizations share data with many others.** The benefit comes from replacing separate arrangements with one common method. Thirty customers and two hundred suppliers is a typical shape.
- **Each organization must keep control of its data.** Nobody is willing or allowed to put the data into a shared database owned by someone else.
- **Access depends on verified facts about the requester.** Membership, a license, a certification, a role in a supply chain.
- **The data changes.** Consumers need the current version from the source, not a copy.
- **The group can agree on rules.** There is an association, a consortium, or a lead organization that can set terms and admit members.

## A dataspace is probably too much when

- **The data is public.** Publish it on a website.
- **There are two parties and a stable relationship.** A direct integration is simpler.
- **One organization legitimately owns all the data.** A central platform with user accounts does the job.
- **Nobody can say who should be admitted or on what terms.** Technology cannot supply missing governance. Settle the rules first.

## Questions to answer before you start

1. Who are the participants, and how many do you expect in three years?
2. Who sets the rules and admits members?
3. Which facts about a participant matter for access decisions, and who can verify them?
4. What is the first use case, and who benefits from it on both sides?
5. Who operates the platform: a service provider, the participants themselves, or a mix?
6. Which existing systems hold the data, and which need to receive it?

If you can answer the first four, you have the outline of a dataspace. The last two are implementation questions, and this hub has a path for each.

## Where to continue

| If you want to | Continue with |
|---|---|
| See a dataspace running on your own machine | [Demonstrators](../../demonstrators/) |
| Operate the platform for participants, or host your own connector | [Set Up a Dataspace Platform](../../platform-setup/) |
| Connect business systems and build applications | [Build a Dataspace Application](../../application/) |
| Define the rules, credentials, and onboarding of a dataspace | [Design Trust, Credentials, and Dataspace Profiles](../../trust-and-profiles/) |
| Find the specifications and project documentation | [Documentation and source repositories](../../#documentation-and-source-repositories) |

## Key takeaways

- A dataspace is a set of agreed rules and open protocols for sharing data directly between organizations.
- It fits where many parties share changing data, must keep control, and can agree on governance.
- It does not replace governance. The rules come first, and the technology implements them.
- The Eclipse ecosystem provides open-source components for each building block in the story.

## Go deeper

- [IDSA Rulebook: Creating a data space](https://kb.internationaldataspaces.org/external/rulebook/114_Creating_a_data_space/) describes the steps and decisions when founding a dataspace.
- [EDC documentation for adopters](https://eclipse-edc.github.io/documentation/for-adopters/) is the entry point to the component documentation.

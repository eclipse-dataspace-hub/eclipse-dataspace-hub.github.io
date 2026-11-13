---
title: "From pilot to scale"
description: "The smallest design worth starting with, what to add and when, how to test interoperability, how to change a profile, and a checklist of the decisions from this path."
next: false
---

The working group presents its design to the board of the association. The first question is the usual one: where do we start, and what can wait? The design covers two use cases, two credentials, and six roles. The first release needs far less.

:::note[In this lecture]
- The smallest design that is worth starting with.
- What to add, and the sign that it is time.
- How to test that independent installations work together.
- How to change a profile, and a checklist for the whole design.
:::

## Start small

The first release is small: one use case (supplier certificates), as few credentials as its offers need, one platform (Danube Cloud), and version 1.0 of the profile. For the Bike Dataspace that is the membership credential, with its two policy terms.

Add three or four members with a real need on both sides of the use case. That is enough to run every process of this path once: an application, a review, an issuance, an offer, a contract, a renewal, and a revocation. Do the last two on purpose, with a test member. A process that has only been written down is not a process yet.

## What to add, and when

| Add | When | What it needs |
|---|---|---|
| A second credential | A provider needs a verified fact that membership does not state. | Evidence rules, a review step, a definition, and a policy term. |
| A second use case | Members ask for it, and an owner exists. | The steps from [lecture 8](../08-use-cases-and-agreements/). No change to the platform. |
| A member with its own software, or a second platform | A member such as Brandt cannot or will not be hosted. | A profile that is complete by itself, and a conformance test. |
| A second issuer | Another body is the better authority for a fact. | An entry as trusted issuer, limited to the credential types it may issue. |
| A second dataspace | Members also belong to another community. | Nothing in this profile. The other dataspace has its own. |

The second row is the cheap one, and that is the point of the design.

## Interoperability is tested

Brandt's connector and Danube Cloud's platform implement the same protocols. That is a claim until somebody tests it.

The Eclipse Dataspace TCK project publishes compatibility kits for the Dataspace Protocol and the Decentralized Claims Protocol. Ask every operator and every member with its own software for a passing run of both.

The kits test the protocols, not your profile. Add an acceptance test that every new installation passes against a reference participant:

1. obtain the credentials that every participant must hold;
2. see the reference offer in the catalog;
3. conclude a contract for it and fetch data;
4. be declined for an offer that requires a credential the test participant does not hold.

Step 4 matters as much as the others. An installation that lets everything through passes steps 1 to 3.

## Changing the profile

Members have configured version 1.0. Agreements refer to its terms, and credentials carry its claims for up to a year. A change has to respect all three.

| Change | How to do it |
|---|---|
| A new term, credential type, or use case | Release a minor version. Members adopt it when they need it. |
| A new claim in an existing credential | It arrives as credentials are renewed, or sooner if the issuer offers new ones. |
| A new meaning for a published term or claim | Do not do it. Publish a new term and retire the old one with a date. |
| Another credential format or issuer identifier | A migration with a date, a period in which connectors trust both, and new credentials for every member. |

Announce every release to operators and self-hosted members before it takes effect.

## The checklist

One question for each lecture of this path:

- **Roles.** Who decides, attests, signs, and runs? Who controls the issuer's identifier?
- **Profile.** Could a second operator apply it without asking what was meant?
- **Credentials.** Does each state a verified fact, with defined claims, validity, and format?
- **Onboarding.** Are requested and attested values kept apart, and is every acceptance on record?
- **Vocabulary.** Does every term have a meaning, an expression, and a credential behind it?
- **Lifecycle.** Who acts at renewal, change, revocation, and when a member leaves?
- **Use cases.** Does each have an owner, a description of its data, conditions, and a data sharing agreement that its participants sign?
- **Applications.** Which verified facts do they receive, and for how long?

A group that can answer these has designed the trust of its dataspace.

## Key takeaways

- Start with one use case, the credentials that every member holds, and one platform, and run every process once, including a revocation.
- Test interoperability with the compatibility kits and with an acceptance test for your own profile.
- Adding to a profile is compatible. Changing a meaning, a format, or an issuer is a migration.

## Go deeper

- [IDSA Rulebook: Creating a data space](https://kb.internationaldataspaces.org/external/rulebook/114_Creating_a_data_space/) describes the steps and decisions when founding a dataspace.
- [Eclipse Dataspace TCK](https://github.com/eclipse-dataspacetck) hosts the compatibility kits for both protocols.
- [Demonstrators](../../demonstrators/) lists the dataspaces you can run yourself to try a design.
- [Set Up a Dataspace Platform](../../platform-setup/) and [Build a Dataspace Application](../../application/) continue with configuration and software.

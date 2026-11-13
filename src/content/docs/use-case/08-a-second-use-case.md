---
title: "A second use case"
description: "How the Bike Dataspace carries battery data alongside certificates, using a second credential and stricter conditions on the same infrastructure."
---

Supplier certificates were the reason the Bike Dataspace was founded. Once members have an identity, a Credential Service, and a way to make agreements, a second need can use the same foundation. In this story it is battery data.

:::note[In this lecture]
- How a second use case reuses the identity, credentials, and platform of the first.
- How a second credential restricts sensitive data to qualified participants.
- What a use case consists of.
:::

## The need

European regulation introduces a digital battery passport for e-bike batteries. A passport contains information for different audiences. Some of it is for the public. Some of it, such as the detailed composition of the cells and the instructions for safe dismantling, is meant only for parties with a legitimate interest, for example recyclers.

Brandt Batteries holds this data for every battery model it makes. Two groups in the dataspace need it:

- **Lindner Bikes** needs basic battery data for the bikes it builds: capacity, chemistry type, carbon footprint.
- **Hansen Recycling** needs the detailed composition and dismantling data to process returned batteries safely.

Brandt is willing to share both. It is not willing to give the detailed data to every member.

## A second credential

Membership alone does not tell Brandt whether a company is a recycler. The dataspace needs a second verified fact.

The association defines a new credential, the **recycler credential**. A member that wants one submits its waste treatment permit. The association checks the permit and issues the credential to the member's Credential Service. Hansen Recycling now holds two credentials: one for membership and one that confirms it is a licensed recycler.

Like the membership credential, the recycler credential states a verified fact. It does not grant access to anything by itself. Providers decide what to do with it.

## Two offers with different conditions

Brandt publishes two offers.

| Offer | Who may see it | Who may get a contract |
|---|---|---|
| Basic battery data | Any member | Any member |
| Composition and dismantling data | Any member | Members with a recycler credential |

The second row shows why a dataspace separates two checks. Brandt lets every member see that detailed data exists, so that recyclers can find it. A contract for it requires the recycler credential.

When Hansen requests a contract for the detailed data, its Credential Service presents both credentials, and Brandt's connector agrees. When Lindner requests the same contract, its Credential Service has no recycler credential to present, and Brandt's connector declines. Lindner obtains the basic data under the first offer without difficulty.

A dataspace can also be set up so that such an offer is hidden from non-recyclers entirely. Whether providers have that option depends on a rule the dataspace sets: which credentials a participant presents with every request, and which only when a contract requires them.

## What stayed the same

For this second use case, the members did not need:

- a new identity or a new Credential Service;
- a new platform;
- a new way to publish, negotiate, or transfer.

Hansen joined the dataspace for battery data and can, from the same day, also obtain supplier certificates if it needs them. Lindner consumes battery data from Brandt and certificates from Costa, and provides its own certificates to its customers, all with the same setup.

Brandt runs its own software and is not hosted by Danube Cloud. Hansen and Lindner are. The exchanges work the same way.

## What a use case consists of

A use case in a dataspace is the combination of four things:

1. **The data**: what is shared and in which format.
2. **The conditions**: which credentials a participant must hold.
3. **The terms**: what participants agree to when they take part, such as permitted use of the data.
4. **The applications**: the systems on each side that produce and use the data.

Identity, membership, and the exchange mechanism are shared by all use cases. This is why a dataspace becomes more valuable with each use case added: the second one costs far less than the first.

## Key takeaways

- A new use case reuses the identity, Credential Service, and platform that participants already have.
- Additional credentials let providers restrict data to participants with a verified qualification.
- Seeing an offer and getting a contract are separate checks, and a provider can set them differently.
- A use case is defined by its data, conditions, terms, and applications.

## Go deeper

- [IDSA Rulebook: Attributes and claims](https://kb.internationaldataspaces.org/external/rulebook/104_Attributes_and_claims/) explains how verified attributes support policy decisions.
- [Design Trust, Credentials, and Dataspace Profiles: Design the credentials](../../trust-and-profiles/04-design-the-credentials/) covers how to decide which credentials a dataspace needs.
- [Design Trust, Credentials, and Dataspace Profiles: Use cases and agreements](../../trust-and-profiles/08-use-cases-and-agreements/) covers how use cases are defined and governed.

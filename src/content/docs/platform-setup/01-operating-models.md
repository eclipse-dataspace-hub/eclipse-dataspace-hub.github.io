---
title: "Operating models"
description: "Who can run a participant's connector, Credential Service, and data plane, what a platform operator takes on, and why a platform is not the dataspace."
---

Danube Cloud wants to offer participation in the Bike Dataspace as a service. Before its platform team installs anything, it has to decide what it will run for its customers and what stays with them. Brandt Batteries answers the same question from the other side when it decides to run its own software.

:::note[In this lecture]
- The three ways a participant's software can be operated.
- What an operator takes on, and what stays outside its role.
- Why a platform is not the dataspace.
:::

## Three operating models

Every participant needs a connector, a Credential Service, and a data plane. The models differ in who runs them.

| Model | Who runs the software | In the Bike Dataspace |
|---|---|---|
| **Self-hosted** | The participant runs everything for itself. | Brandt Batteries |
| **Managed** | An operator runs one platform. Each participant gets an isolated part of it. | Costa Frames, Lindner Bikes, and Hansen Recycling on Danube Cloud |
| **Mixed** | Some members are hosted, others host themselves. | The dataspace as a whole |

The Eclipse Dataspace Components support the first two with two ways of assembling the same software. A **single-participant runtime** serves exactly one participant. A **multi-participant runtime** hosts any number of **participant contexts**. A participant context holds one participant's identity, configuration, offers, agreements, and keys, apart from all others. The EDC documentation also calls the two modes "classic" and "virtual".

## What an operator takes on

An operator of a managed platform does five things for its participants:

- It runs, upgrades, and backs up the services.
- It keeps participants isolated from each other.
- It exposes each participant's public endpoints.
- It creates and removes participants when it is told to.
- It signs with each participant's private keys.

The last point deserves a plain statement, because the platform must be able to use a hosted participant's keys. With **managed keys**, a key is created in a key service that signs on request and never releases it. Identity Hub can work this way with HashiCorp Vault. With **bring your own key**, a participant supplies a key that it created itself. At the time of writing Identity Hub accepts such a key only when it does not sign through the key service. Write the arrangement that you offer into your service agreement and security design.

Many operators also offer the way in: a company applies in the operator's portal, which passes the application to the association. The decision stays with the association, like the other rows of this table.

| Decision or task | Bike Industry Association | Danube Cloud | Participant |
|---|---|---|---|
| Who becomes a member | Decides | Passes applications on, has no say | Applies |
| What credentials attest | Decides and attests | Runs the issuing software for the association | Holds its credentials |
| Runtime, keys, upgrades | Not involved | Runs them for hosted members | Runs them if it hosts itself |
| Offers, policies, contracts | Defines the vocabulary | Has no say | Decides |

## A platform is not the dataspace

The Bike Dataspace is defined by its rules and protocols. Danube Cloud's platform is one place where members can run.

**Several operators can serve one dataspace.** A second cloud provider can host other members under the same rules, and Brandt serves itself. None of them needs permission from Danube Cloud.

**One platform can serve more than one dataspace.** The platform is generic and the dataspace is configuration, as the next lecture shows.

**Counterparties cannot tell, and do not need to.** Every participant is reached through its own identifier and its own public endpoints. The connectors of Costa and Lindner talk to each other over these endpoints, as they would with Brandt.

## Danube Cloud's choice

Danube Cloud chooses the managed model with a multi-participant runtime. Its customers are mid-sized companies such as Costa Frames that want to share certificates and do not want to run servers. One installation serves all of them.

The choice has a price, and the team writes it down. Isolation between participants is enforced by software, not by separate processes. All participants are upgraded at the same time. And the platform signs with every participant's keys.

A customer that cannot accept one of these is a candidate for a dedicated installation or for self-hosting. Danube Cloud therefore plans for the mixed model from the first day: its hosted members must work with Brandt Batteries exactly as they work with each other. Lecture 12 looks at Brandt's side.

## Key takeaways

- A participant's software can be self-hosted or managed by an operator, and both kinds exist side by side in one dataspace.
- A multi-participant runtime hosts many participant contexts in one installation. A single-participant runtime serves one.
- An operator runs the services and signs with its participants' keys. It does not decide who takes part, which credentials exist, or who shares what.
- A platform is one place where members run. The dataspace is its rules and protocols, and it can span many platforms.

## Go deeper

- [EDC documentation: Participant contexts](https://eclipse-edc.github.io/documentation/for-adopters/control-plane/participant-contexts/) compares single-participant and multi-participant runtimes.
- [Connector Fabric Manager: System architecture](https://github.com/eclipse-cfm/cfm/blob/main/docs/developer/architecture/system.architecture.md) explains the model behind hosting many participants in shared services.
- [A Dataspace Use Case: The participants](../../use-case/02-the-participants/) introduces the three kinds of responsibility without technology.
- [Design Trust, Credentials, and Dataspace Profiles: Roles and responsibilities](../../trust-and-profiles/02-roles-and-responsibilities/) covers the same split from the governance side.

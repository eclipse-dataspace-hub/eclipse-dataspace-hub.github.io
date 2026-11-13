---
title: "Build a Dataspace Application"
description: "A path for developers and integrators: build a use-case application that publishes API offers, opens channels to partners, serves and calls the use-case API, and makes its own decisions."
prev: false
---

This path shows how to build software that shares data in a dataspace. The connector, the Credential Service, and the token service come from the platform. What you build is the **use-case application**: the software that implements one use case, serves and calls its API, decides what each counterparty gets, and keeps the records.

The path follows two applications in the fictional **Bike Dataspace**. A team at Danube Cloud builds the **supplier certificate service**, which members such as Costa Frames and Lindner Bikes use to exchange supplier certificates. Brandt Batteries builds a **battery data service** next to its own connector. The examples use the multi-participant Management API of a managed platform. Where a self-hosted connector differs, the lecture says so.

## Who this path is for

- **Application developers and system integrators** who connect document stores, ERP systems, or other business software to a dataspace.
- **Data plane developers** who build the component that serves or moves the data. Lectures 9 and 10 are written for you and can be read on their own.
- **Architects** who need to know where application logic ends and platform services begin.

You should be comfortable with HTTP APIs, JSON, and access tokens. You do not need to know the internals of the Eclipse Dataspace Components.

## What you will be able to do

After this path you can:

- explain what a use-case application does and what the platform already does for it;
- call the Management API with the right address, token, and request envelope;
- publish an API offer from an asset, a policy definition, and a contract definition;
- write policies with the terms of your dataspace, and know which conditions work in an access policy and which only in a contract policy;
- request a catalog, negotiate a contract, and start a transfer, and manage all three with a pattern that this path calls a channel;
- check the access token of a data flow and use its claims;
- design and implement the application protocol of a use case in both directions;
- decide in the application what a caller gets, for example with partner lists and grants;
- handle asynchronous state with events, an inbox, and reconciliation;
- test against a demonstrator and prepare the application for production.

## Lectures

| # | Lecture | What it covers |
|---|---|---|
| 1 | [What you are building](./01-what-you-are-building/) | The two example applications and the split between application and platform. |
| 2 | [Your starting point](./02-your-starting-point/) | The addresses, identifiers, and tokens you receive from the platform operator. |
| 3 | [Application architecture](./03-application-architecture/) | Control path and data path, the parts of an application, and where rules live. |
| 4 | [Publish an offer](./04-publish-an-offer/) | What a contract covers, and an offer from an asset, a policy definition, and a contract definition. |
| 5 | [Policies in practice](./05-policies-in-practice/) | ODRL as the connector accepts it, access and contract policy, the term for the data sharing agreement, and conditions that only work in a contract policy. |
| 6 | [Discover and negotiate](./06-discover-and-negotiate/) | Catalog requests, the right dataset, contract negotiation, and the agreement. |
| 7 | [Transfer data](./07-transfer-data/) | Transfer requests, what a started transfer means, and the first call with a token. |
| 8 | [Channels](./08-channels/) | A pattern for managing catalog, agreement, and transfer as one object, and two flows per pair. |
| 9 | [Data plane architecture](./09-data-plane-architecture/) | Data Plane Signaling, the shapes of a data plane, and where your endpoint comes from. |
| 10 | [Flow tokens](./10-flow-tokens/) | The claims of an access token and the checks on both sides. |
| 11 | [Design the use-case protocol](./11-design-the-use-case-protocol/) | The application protocol that a use case needs on top of the dataspace protocols. |
| 12 | [Calls and decisions in the application](./12-calls-and-decisions/) | Inbound calls, decisions with partners and grants as one design, failure handling, and documents. |
| 13 | [Credentials and claims](./13-credentials-and-claims/) | How verified claims reach your code, and how long they stay true. |
| 14 | [Events and resilience](./14-events-and-resilience/) | Events, an inbox, retries, and reconciliation. |
| 15 | [A second use case](./15-a-second-use-case/) | Battery data: what a second application reuses and what is new. |
| 16 | [Test and ship](./16-test-and-ship/) | Test levels, demonstrators, and a checklist for going live. |

Lectures 1 to 8 cover the side of the application that faces the connector. Lectures 9 to 14 cover the data path and the application's own logic. Lectures 15 and 16 apply the result to a second use case and take it to production.

## Before you start

If dataspaces are new to you, read [A Dataspace Use Case](../use-case/) first. It introduces the Bike Dataspace, the companies, and the pattern of publish, discover, agree, and transfer without any code.

To try the calls from this path, you need a running platform. The [demonstrators](../demonstrators/) page explains which one fits which goal.

## What this path leaves out

- Installing and operating the platform, including the token service and the event stream, belongs to [Set Up a Dataspace Platform](../platform-setup/).
- Deciding which credentials, policy terms, and use cases a dataspace has belongs to [Design Trust, Credentials, and Dataspace Profiles](../trust-and-profiles/).

This path does not repeat the reference documentation of the Management API. Each lecture shows the minimal shape of a call and links to the authoritative source.

---
title: "Self-hosted participants"
description: "What a participant that runs its own connector, Credential Service, and data plane needs from the dataspace, what it must expose, and how to check that it interoperates with hosted members."
next: false
---

Brandt Batteries has an IT department and a security policy that keeps signing keys in its own data center. It joins the Bike Dataspace without Danube Cloud.

:::note[In this lecture]
- Two ways to run the software for a single participant.
- What a self-hosted participant needs from the dataspace.
- What it must make reachable from outside.
- How to check that hosted and self-hosted participants work together.
:::

## Two ways to run one participant

Brandt can assemble its connector, its Credential Service, and its data plane in two ways.

| | The platform stack for one participant | A single-participant connector |
|---|---|---|
| What you run | The Core Platform Distribution with one participant in it. | A connector built from the single-participant bundles of EDC, an Identity Hub, and a data plane. |
| Management API | Version 5, with tokens from the token exchange. | Version 4, with an API key. |
| How the profile gets in | Through APIs, as in lecture 7. | The trusted issuer and the credential scopes as configuration. The policy terms as code. |

EDC does not ship finished runtimes. A project assembles its own from modules. The expressions that give policy terms a meaning on Danube Cloud's platform are a feature of the multi-participant bundles. A single-participant connector needs the same meaning as a policy function in code.

At the time of writing JAD runs the platform stack. The Minimum Viable Dataspace shows two companies that each run their own connector and Identity Hub, but it builds on a release line before version 1.0.

Brandt chooses the single-participant connector. Its application developers therefore work with version 4 of the Management API.

## What Brandt needs from the dataspace

Brandt needs everything in the dataspace profile except the provisioning part. Four parts need the most care.

| From the profile | Brandt uses it to |
|---|---|
| The issuer's identifier | Trust credentials that carry its signature. |
| Credential types and scopes | Ask every counterparty for the membership credential, and for the recycler credential when a policy uses the recycler term. |
| The meaning of the policy terms | Evaluate all three terms exactly as every other participant does. |
| The claim mapping | Put a recycler's verified activities into the access tokens of its battery data service. |

Brandt implements the terms a second time, in another form. If its meaning of "member" differs from Danube Cloud's, nobody notices until a negotiation fails. This is the strongest argument for an association to publish its profile as files.

Brandt joins as Costa did, with two differences. It applies through the association's own portal, and it does the setup itself: it creates the identifier `did:web:brandt-batteries.example` and publishes its identity document. After the approval the association's onboarding application registers Brandt as a holder. Brandt's Identity Hub then requests the credential at the issuer's public endpoint, and the issuer delivers it.

## What must be reachable

| Endpoint | Called by |
|---|---|
| The identity document, at `https://brandt-batteries.example/.well-known/did.json` | Everybody who resolves Brandt's identifier. |
| The protocol endpoint of the connector | The connectors of counterparties. |
| The Credential Service | Counterparties that ask for a presentation, and the issuer when it delivers a credential. |
| The battery data service, at `https://battery-data.brandt-batteries.example` | The applications of consumers, with an access token. |

Everything else stays inside: the Management API, the administration API of the Identity Hub, the signaling between the connector and the data plane, and the secret store.

Outbound, Brandt's connector must reach other identity documents, the issuer's status lists, and other connectors.

## Check interoperability

Hosted and self-hosted participants interoperate when four things are equal: the protocol versions, the credential format, the trusted issuer, and the meaning of the terms. Check it from both sides.

1. **Resolve.** From a hosted participant, resolve Brandt's identifier. The multi-participant Management API has a discovery call that reports which profiles can be used with a counterparty.
2. **Request a catalog in both directions.** Each side presents its membership credential to the other.
3. **Negotiate with every term.** Let Hansen Recycling negotiate Brandt's offer for dismantling data, and let Lindner Bikes try the same. Hansen must get a contract and Lindner must not. Repeat it with an offer that requires a data sharing agreement.
4. **Transfer and call.** Call the battery data service with the access token, and check that the token carries the claim `activities`.
5. **Revoke.** Revoke a test credential, wait for the status list cache to expire, and expect a refusal.

Run these checks when Brandt joins, and again after every change of the profile or upgrade on either side.

## Key takeaways

- A single participant can run the platform stack or a single-participant connector. They differ in the Management API and in how the profile gets in.
- A self-hosted participant needs the dataspace profile and has to implement it with the same meaning as every platform.
- It exposes its identity document, its protocol endpoint, its Credential Service, and the data path of its application, and nothing else.
- Check interoperability in both directions and with every policy term.

## Go deeper

- [EDC documentation: Participant contexts](https://eclipse-edc.github.io/documentation/for-adopters/control-plane/participant-contexts/) compares the two kinds of runtime.
- [EDC documentation: Distributions, deployment, and operations](https://eclipse-edc.github.io/documentation/for-adopters/distributions-deployment-operations/) explains how a runtime is assembled.
- [Minimum Viable Dataspace](https://github.com/eclipse-dataspace-hub/MinimumViableDataspace) shows participants that run their own software.
- [Build a Dataspace Application: A second use case](../../application/15-a-second-use-case/) follows Brandt's battery data service.

---
title: "A second use case"
description: "How the battery data service reuses offers, channels, tokens, and events from the first use case, and what is new: two contract policies, a claim that decides content, and a different protocol."
---

Six months after the Bike Dataspace started, its members ask for battery passport data, and Brandt Batteries starts to build for it. Brandt runs its own connector and builds its own application, the battery data service. Its developers expect to start from the beginning. Most of what they need has been described in the lectures before this one.

:::note[In this lecture]
- The two offers of the battery use case and their policies.
- How a verified claim decides what a caller receives.
- A protocol with a different shape.
- What was reused, what was new, and what differs with an own connector.
:::

## Two offers, two policies

The Bike Dataspace specifies two APIs for battery data. Brandt publishes one asset for each, in the way lecture 4 describes.

| Asset | `dct:subject` | Access policy | Contract policy |
|---|---|---|---|
| `battery-data-v1-basic` | `https://bike-dataspace.example/api/battery-data/basic` | `bike-membership` | `bike-membership` |
| `battery-data-v1-dismantling` | `https://bike-dataspace.example/api/battery-data/dismantling` | `bike-membership` | `bike-recycler` |

Both assets have the type `https://bike-dataspace.example/api/battery-data` and the version `1.0`. Every member sees both offers. Lindner Bikes gets a contract for basic data only, and Hansen Recycling gets both, as lecture 5 explained.

The battery use case also contracts per use case. It splits its data into two assets because the rule for admission differs, and data that differs in content alone stays behind one API. If Brandt wants only signatories of the battery agreement, it adds the `DataSharingAgreement` term with the value `battery-passport-data:1.0` to a policy.

## A claim decides the content

The contract policy admits Hansen as a recycler. It does not say what kind. The recycler credential lists activities, and the flow token carries them in the claim `activities`, as lecture 13 showed.

| The caller's `activities` | The dismantling API returns |
|---|---|
| `dismantling` | Dismantling instructions |
| `material-recovery` | Cell composition |
| Both | Both |
| Empty or missing | Nothing |

The battery data service reads the claim on every call and filters what it returns. Brandt did not create an offer per activity. One claim with a list carries the difference.

## A different protocol shape

The supplier certificate protocol is a conversation about single documents. Battery data is a collection that a provider shares with audiences and updates over time.

- **Records and versions.** There is one record per battery model, with structured data and attached files. Every change creates a new version, and a consumer synchronizes versions.
- **Access rules by audience.** Brandt attaches rules to a record. An audience is a named partner, a verified attribute such as a recycler activity, or any member.
- **Delivery.** A rule states how a record reaches its audience: proactively as soon as it is published, on request, or after a person approved.
- **Receipts.** The receiver reports what it did with a version: accepted, rejected with a reason, or stopped, which means that it wants no further versions.
- **Withdrawal.** Brandt can withdraw a record, and everyone who received it is told. Imported copies cannot be recalled, so the data sharing agreement of the use case covers them.

Both protocols follow the design rules of lecture 11, and both have a second API in the opposite direction.

## What was reused and what was new

Brandt's developers reuse most of the design without change: offers with fixed IDs, channels with their second flow, the token checks, the outbound client, the event inbox, and the reconciliation job.

New are the two APIs and their messages, the audience rules, the store for records and files, and the screens for Brandt's staff.

This suggests a structure for the code: a core that knows nothing about any use case, and one module per use case with its API, decisions, and store.

## Brandt runs its own connector

For Brandt's developers a few things differ from the hosted case.

| Topic | Hosted on a platform | Brandt's own installation |
|---|---|---|
| **Management API** | Version 5, with a participant context in the path and a token from the token exchange | Version 4, with an API key or Brandt's identity provider |
| **Data plane** | The operator runs Siglet and sets the transfer type mapping | Brandt runs a data plane itself and configures endpoint and claim mapping |
| **Policy terms** | The operator loads them from the profile | Brandt's team implements them from the profile, in code at the time of writing |
| **Events** | The platform's stream | A stream of its own, or HTTP callbacks from its connector |

For counterparties nothing differs. Hansen's application cannot tell that Brandt operates its own software.

## Key takeaways

- A second use case reuses offers, channels, token checks, events, and the log of the first.
- A second asset follows from a different admission rule. Finer differences are handled by a claim and by the application.
- Use cases differ in their protocol: a conversation about documents, or records shared with audiences and synchronized.
- A participant with its own connector differs in setup and operations, and not in what its counterparties see.

## Go deeper

- [EDC documentation: Management API](https://eclipse-edc.github.io/documentation/for-adopters/control-plane/management-api/) compares version 4 and version 5 and their authentication.
- [Siglet documentation](https://github.com/eclipse-dataplane-core/siglet/blob/main/docs/siglet.md) describes the claim mappings that put verified facts into a token.
- [A Dataspace Use Case: A second use case](../../use-case/08-a-second-use-case/) tells the battery data story from the participants' side.
- [Set Up a Dataspace Platform: Self-hosted participants](../../platform-setup/12-self-hosted-participants/) covers what a participant like Brandt operates itself.

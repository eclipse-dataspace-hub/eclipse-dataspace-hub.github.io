---
title: "Publishing an offer"
description: "How Costa Frames makes its certificates available to customers by describing them and stating the conditions, without sending them anywhere."
---

Costa Frames holds a current ISO 9001 certificate. Thirty customers want it. Costa now publishes it in the dataspace once, and every eligible customer can obtain it from there.

:::note[In this lecture]
- The three things a provider defines: what, under which conditions, and for whom.
- Why publishing an offer does not move any data.
- Why policies refer to credentials and not to company names.
:::

## What Costa defines

Publishing takes three steps. Costa's staff do them in a portal or let Costa's document system do them through an API. The steps are the same either way.

**1. Describe the data.** Costa creates an **asset** in its connector. An asset is a description: a name, a type, and other properties that help a customer recognize what is offered.

| Property | Value |
|---|---|
| Name | Company certificates of Costa Frames |
| Content | ISO 9001, ISO 14001 |
| Format | PDF with structured metadata |

The asset does not contain the certificates. They stay in Costa's document store.

**2. State the conditions.** Costa creates a **policy**. For certificates the rule is simple:

> Any member of the Bike Dataspace may use this data.

In technical terms the policy requires a valid membership credential. It does not list customers by name.

**3. Make the offer.** Costa links the asset to the policy. The result is an **offer** that appears in Costa's catalog.

## Nothing has moved

After these three steps:

- no file has been sent to anyone;
- no customer has been given an account;
- nothing has been uploaded to the association or to a shared store.

Costa has announced that the certificates exist and under which terms they can be obtained. The certificates leave Costa's systems only when a customer has agreed to the terms and requests them.

Publishing in a dataspace means making data available under stated conditions. It does not mean distributing copies.

## Why the policy names a credential

Costa could have written a policy that lists its thirty customers. It would then have to change the policy for each new customer and each one that leaves.

A policy that refers to the membership credential needs no maintenance. A company that joins the dataspace next month is eligible on the day it receives its credential. A company that loses its membership loses access at the same moment. The association keeps the member list. Costa keeps one rule.

Costa can still be more selective where it wants to be. A dataspace gives providers several levels of control:

- **Who can see the offer.** A rule checked when a customer requests the catalog. Customers that do not meet it never learn that the offer exists.
- **Who can get a contract.** A rule checked when a customer asks for an agreement. It can be stricter than the first.
- **Decisions inside Costa's own system.** For example, Costa may release detailed audit reports to selected customers only. Its supplier certificate service applies that rule itself, after the dataspace has established who is asking.

The first two are called the **access policy** and the **contract policy**. Lecture 8 shows a case where they differ.

## One offer, many customers

Costa published once. Lindner Bikes, and every other member that buys from Costa, can now find the same offer and negotiate its own contract. Costa does not manage thirty portal uploads any more. Its customers always reach the current certificates, because they fetch them from Costa.

## Key takeaways

- A provider defines an asset, a policy, and the link between them. Together they form an offer.
- An asset describes data. The data stays in the provider's systems.
- Policies refer to credentials, so they keep working as members join and leave.
- The provider controls who sees an offer, who gets a contract, and what its own systems release.

## Go deeper

- [EDC documentation: Control plane](https://eclipse-edc.github.io/documentation/for-adopters/control-plane/) explains assets, policies, and contract definitions.
- [IDSA Rulebook: Policies](https://kb.internationaldataspaces.org/external/rulebook/105_Policies/) describes the role of policies in a dataspace.
- [Build a Dataspace Application: Publish an offer](../../application/04-publish-an-offer/) shows the same steps as API calls.

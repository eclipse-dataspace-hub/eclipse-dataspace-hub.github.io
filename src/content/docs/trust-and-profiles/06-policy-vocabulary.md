---
title: "Policy vocabulary"
description: "How a dataspace defines the terms that providers use in policies, and why the way a credential is presented limits where a term can be used."
---

Costa wants to offer its certificates to members only. Brandt wants a contract for dismantling data to require a recycler. Both need words for these conditions that every connector in the dataspace understands in the same way. The working group defines them.

:::note[In this lecture]
- What a policy term is, and who defines it.
- The vocabulary of the Bike Dataspace.
- The rule for presenting credentials, and what follows from it.
- Guidelines for a vocabulary that lasts.
:::

## Terms belong to the dataspace

A **policy term** is a named condition with a fixed meaning. Providers combine terms into policies. They do not define terms.

Brandt's policy for dismantling data says two things: the counterparty is a member, and it is a licensed recycler. Each half is one term. For every term the profile states which credential a connector looks at and what it has to find there. Every connector in the dataspace applies the same check, so a term means the same at Costa's connector and at Brandt's.

## The vocabulary of the Bike Dataspace

| Term | A provider writes | It holds when |
|---|---|---|
| Membership | `Membership` is `active` | The counterparty presents a membership credential of the Bike Dataspace. |
| DataSharingAgreement | `DataSharingAgreement` is `supplier-certificates:1.0` | The counterparty's membership credential lists that agreement in that version. |
| Recycler | `Recycler` is `active` | The counterparty presents a recycler credential. |

The vocabulary follows the credentials. A dataspace that builds on other credentials has other terms.

A term only says which credential and which claim count. Before a connector applies it, the connector has verified every credential it was shown: the association signed it, it belongs to the counterparty, and it has neither expired nor been revoked.

In the profile each term also has a full identifier, such as `https://bike-dataspace.example/policy/Membership`, and a technical definition that platforms load. [Write a dataspace profile](../../platform-setup/06-write-a-dataspace-profile/) shows both. State the meaning of every term in words as well. A platform and a participant with its own software may implement a term differently, and the words are what both are checked against.

## The presentation rule

The use-case path closed its battery story with a remark. Whether a provider can hide an offer from non-recyclers "depends on a rule the dataspace sets: which credentials a participant presents with every request, and which only when a contract requires them". This is that rule.

| | Presented with every request | Presented on demand |
|---|---|---|
| A connector asks for it | In every catalog request, negotiation, and transfer request. | Only when the policy of the contract contains a term that is mapped to this credential. |
| In the Bike Dataspace | Membership credential | Recycler credential |

Three things follow.

1. **A credential that is asked for and missing fails the whole request.** The connector does not go on with what it received. If the recycler credential were in the first column, Costa and Lindner could not present it, and every one of their requests would fail. A credential can be in the first column only if every member holds one.
2. **A catalog request carries the first column only.** There is no contract yet, so nothing asks for more. A term that needs an on-demand credential is never satisfied while a catalog is put together.
3. **The recycler term therefore belongs in the contract policy.** Brandt requires membership to see the offer, and membership and recycler status to get a contract. Hansen sees the offer and gets the contract. Lindner sees the offer and is declined. If Brandt put the recycler term on the access policy, the offer would disappear for everyone, Hansen included.

The accepted agreements are a claim of the membership credential, which every member presents. The term for them therefore works in an access policy as well. Hiding offers by another attribute needs the same: a credential that every member holds, with a list that may be empty.

## Guidelines

- **Few terms.** Every term needs a credential that somebody issues. A term without one can never be met.
- **Positive statements.** "Is a recycler" works. "Is not a competitor" does not, because nobody can present a credential for the absence of a fact.
- **Stable identifiers.** Use a namespace that the association controls. Never give a published term a new meaning, because concluded agreements refer to it.
- **Standard policies per use case.** Publish the two or three policies that a use case needs. Providers then choose a policy and do not write one.

## Key takeaways

- The dataspace defines policy terms. Providers combine them.
- Each term has a meaning in words and a technical definition that every platform loads.
- A credential presented with every request must be held by every member, because a missing credential fails the request.
- A term that needs an on-demand credential works in a contract policy. In an access policy it hides the offer from everyone.

## Go deeper

- [EDC documentation: CEL policy expressions](https://eclipse-edc.github.io/documentation/for-adopters/control-plane/policy-engine/cel/) describes how a platform defines the check behind a term.
- [EDC documentation: Dataspace profiles](https://eclipse-edc.github.io/documentation/for-adopters/control-plane/dataspace-profiles/) describes the two kinds of scope behind the presentation rule.
- [W3C ODRL Information Model](https://www.w3.org/TR/odrl-model/) defines the language that policies are written in.
- [Build a Dataspace Application: Policies in practice](../../application/05-policies-in-practice/) shows how a provider writes policies with this vocabulary.

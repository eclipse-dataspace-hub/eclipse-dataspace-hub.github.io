---
title: "When things change"
description: "What happens in a dataspace when credentials expire or are revoked, providers tighten their conditions, or a member leaves."
---

So far every participant has been a member in good standing and every offer has stayed the same. Real business relationships change. A dataspace has to handle that without anyone reconfiguring thirty connections by hand.

:::note[In this lecture]
- How expiry and revocation of credentials take effect.
- What happens to existing agreements when conditions change.
- Where technical control ends and legal agreements take over.
:::

## A credential expires

Every credential has a validity period. Costa's membership credential is valid for one year.

Before it expires, Costa's Credential Service requests a new one from the association automatically. If Costa is still a member, the association issues it, and nothing visible happens.

If the renewal fails, for instance because Costa's membership has lapsed, the old credential expires. From that moment Costa cannot prove membership. Its requests for catalogs and contracts no longer succeed. No provider had to change anything.

## A credential is revoked

Sometimes a fact stops being true before the credential expires. Suppose Hansen Recycling loses its waste treatment permit. The association revokes Hansen's recycler credential.

The association makes known which credentials it has withdrawn. Whenever a provider checks a credential, it also checks whether that credential is still in force. From the moment of the revocation, Brandt's connector sees that Hansen's recycler credential no longer counts and declines any new request for detailed battery data. Nobody has to inform Brandt.

Hansen's membership credential is unaffected. Hansen can still obtain supplier certificates and basic battery data. Each credential is withdrawn individually.

## A provider tightens its conditions

Costa decides that its certificates should go only to members that have accepted the terms of the supplier certificate use case. It changes the policy on its offer. The membership credential records which use-case terms a member has accepted, so Costa's connector can check this.

New catalog requests and new negotiations are evaluated against the new policy immediately. Existing agreements were concluded under the old policy. What happens to them is for Costa to decide: it can let them run, or it can end them. A provider can terminate an agreement, and consumers then need to negotiate again under the current conditions.

## A member leaves

Lindner sells its bicycle business and leaves the association. The association revokes Lindner's membership credential. Danube Cloud removes Lindner's identity, Credential Service, and connector context from the platform.

Lindner's offers disappear, because the connector that published them is gone. Lindner can no longer request anything, because it cannot prove membership. Other members did not have to remove Lindner from any list.

## Running transfers

A credential is checked each time it matters: at the catalog request, at the negotiation, and when a transfer starts. A revoked or expired credential therefore blocks every new request.

A transfer that is already running is a different matter. The provider's connector re-checks conditions written into the agreement itself, such as an end date, and stops the transfer when they are no longer met. It does not learn about a revocation that way. If a long-running transfer has to end because a participant lost a credential, the provider terminates it.

## Where technical control ends

One limit needs to be stated plainly. A dataspace controls access. It does not control what a company does with data it has already received.

When Hansen's recycler credential is revoked, Hansen cannot fetch new data. The data it fetched last month is still on Hansen's systems. What Hansen may do with it is governed by the terms it accepted: the dataspace terms, the use case terms, and the contract agreement. Those are legal commitments, and the agreement record on both sides is the evidence for them.

A dataspace combines technical control over access with legal agreements about use. It needs both.

## Key takeaways

- Credentials expire and can be revoked. Either event takes effect at the next check, for every provider at once.
- Each credential is withdrawn independently of the others.
- A changed policy applies to new requests immediately. The provider decides what happens to existing agreements.
- Technical control covers access. Use of data after delivery is covered by the terms that participants accepted.

## Go deeper

- [IDSA Rulebook: Trust](https://kb.internationaldataspaces.org/external/rulebook/008_Trust/) explains why trust in a dataspace is time-bound and purpose-specific.
- [EDC documentation: Policy monitor](https://eclipse-edc.github.io/documentation/for-contributors/control-plane/policy-monitor/) describes how running transfers are re-evaluated.
- [Design Trust, Credentials, and Dataspace Profiles: Credential lifecycle](../../trust-and-profiles/07-credential-lifecycle/) covers the decisions a governance team makes about expiry, renewal, and revocation.

---
title: "Credential lifecycle"
description: "The decisions a governance team makes about validity, renewal, changed facts, revocation, and members that leave."
---

A year after the start, the working group looks at what happened to the credentials it designed. Most were renewed without anyone noticing. One recycler extended its permit to a second activity. One lost its permit. One member left the association. Each of these events needs a defined path.

:::note[In this lecture]
- How renewal works, and what makes it fail on purpose.
- How a changed fact becomes a new credential.
- How fast a revocation takes effect, and what it does not stop.
- What happens when a member leaves.
:::

## Validity and renewal

Every credential of the Bike Dataspace is valid for one year. The period is a governance choice. It is the longest time a fact can stay in circulation if every other safeguard fails.

Renewal needs no person. A Credential Service watches its credentials and requests a new one shortly before the old one expires. At the time of writing, EDC Identity Hub starts seven days before expiry by default. The issuer does not copy the old credential. It issues from what is registered for the member now.

This is the association's main lever. A renewal succeeds only while the member is registered at the issuer. Remove the registration, and the member's credentials run out by themselves.

## A fact changes

Hansen's new permit also covers material recovery.

1. Hansen submits the permit in the onboarding application. A reviewer attests the second activity.
2. The onboarding application replaces the values that are registered for Hansen at the issuer.
3. The onboarding application has the issuer send an offer to Hansen's Credential Service. The Credential Service requests the new recycler credential and receives it.
4. The onboarding application revokes the old one.

Step 4 is easy to forget. A credential is a signed statement in the holder's hands. It stays valid until it expires or is revoked, whatever is registered now.

The order matters. Here the fact grew, so it is safe to revoke the old credential last. When a fact shrinks, revoke first.

A member that accepts another data sharing agreement, or a new version of one, takes the same path with its membership credential.

## Revocation

Hansen later loses its permit, and the association revokes the recycler credential. The Issuer Service marks the credential in a **status list** that it publishes. Every connector consults that list when it checks a credential.

- **It is not instant.** A connector keeps a status list that it has fetched. The default in the EDC connector is 15 minutes at the time of writing. For that long a revoked credential can still pass. If the dataspace needs less, the profile says so.
- **It is per credential.** Hansen's membership credential is not affected.
- **It is final.** At the time of writing the Issuer Service cannot suspend a credential and restore it later. A credential revoked by mistake is issued again.

A revocation blocks new requests, because a connector checks credentials at every catalog request, every negotiation, and every transfer request. Two things continue:

- **Existing agreements.** The agreement stays on record on both sides. The terms that Hansen accepted still govern the data it received.
- **Running transfers.** A transfer that has started keeps running. The connector checks running transfers from time to time with the facts that were stored with the agreement. It does not ask for credentials again.

The dataspace therefore needs a rule for long-running transfers. The Bike Dataspace sets one: no transfer runs longer than a day. Applications start a new transfer when they need one, and each start is checked against current credentials. Providers end transfers that are older. A revoked credential then stops working within a day.

## A member leaves

Lindner sells its bicycle business and leaves the association. The steps are a checklist with an owner each.

| Step | Owner |
|---|---|
| Record the end of the membership and its date. | Association |
| Revoke all credentials of the member, and remove its registration at the issuer so that no renewal succeeds. | Association |
| End running transfers. Remove the identity, the Credential Service, and the connector. | Platform operator, or the member if it runs its own software |

Do not assume that removing a member from a platform also revokes its credentials. Revocation is an act of the issuer.

## Key takeaways

- Renewal is automatic and draws on what is registered at the issuer. Removing the registration ends it.
- A changed fact needs three acts: replace the registered values, issue a new credential, and revoke the old one.
- Revocation is per credential, final, and visible to verifiers after a short delay.
- A revocation blocks new requests. It does not end agreements or running transfers, so limit how long a transfer may run.

## Go deeper

- [EDC documentation: Identity Hub](https://eclipse-edc.github.io/documentation/for-adopters/identity-hub/) describes renewal and credential offers.
- [EDC Identity Hub: Credential revocation](https://github.com/eclipse-edc/IdentityHub/blob/main/docs/developer/architecture/issuer/credential-revocation/credential-revocation.md) explains status lists and what a revocation does.
- [A Dataspace Use Case: When things change](../../use-case/09-when-things-change/) shows these events from the participants' side.

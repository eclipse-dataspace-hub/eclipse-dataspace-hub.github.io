---
title: "Joining the dataspace"
description: "How Costa Frames becomes a participant: admission by the association, a digital identity, and a membership credential in its Credential Service."
---

Costa Frames decides to join the Bike Dataspace. Before it can share anything, two things have to happen. The association has to admit Costa as a member, and Costa needs the technical means to take part. These are separate steps with separate owners.

:::note[In this lecture]
- The difference between being admitted and being technically set up.
- What a digital identity and a verifiable credential are.
- What a participant holds once it has joined.
:::

## Admission: a business decision

Costa applies to the Bike Industry Association. The application contains what any membership application would: company details, a contact person, and Costa's acceptance of the dataspace terms.

The association reviews the application. It checks that Costa is a real company in the bicycle industry and that an authorized person accepted the terms. Then it approves or rejects. This is a decision made by people according to the association's rules. Software supports the process and does not replace the judgment.

## Setup: a technical step

Once Costa is approved, it needs the building blocks from the previous lecture. Costa has no wish to operate them, so it uses Danube Cloud. Danube Cloud's platform creates everything Costa needs in a few seconds:

- a **digital identity** for Costa;
- a **Credential Service** that belongs to that identity;
- a **connector** context in which Costa will manage its offers and contracts;
- access to a **data plane**.

Costa's identity is a **decentralized identifier**, or DID. It looks like this:

```text
did:web:identity.danube-cloud.example:costa-frames
```

A DID is an identifier that anyone can look up to obtain a small public document. That document contains Costa's public keys and the addresses of its dataspace services. Anyone who receives a message signed by Costa can fetch the document and check the signature. No central user directory is involved.

## The membership credential

Costa now has an identity, but an identity only says "this is Costa". Other participants need to know that Costa is a member in good standing.

For that, the association issues a **verifiable credential**: a digitally signed statement about Costa. The statement says, in effect:

> The Bike Industry Association confirms that the holder of `did:web:identity.danube-cloud.example:costa-frames` is a member of the Bike Dataspace. Valid for one year.

The credential is delivered to Costa's Credential Service and stays there. When another participant asks for proof of membership, the Credential Service presents it. The other participant checks three things: that the association signed it, that it was issued to the party presenting it, and that it has not expired or been revoked.

Three points are worth holding on to:

- The association is asked once, at issuance. It is not contacted every time Costa shares data.
- Everyone in the dataspace agrees to trust credentials signed by the association. That agreement is what makes the association the **trust anchor**.
- A credential states a fact that someone verified. It is not a permission to see any particular data. Each provider still decides what it shares.

## The same result on a different route

Brandt Batteries runs its own software. It creates its own DID on its own domain, runs its own Credential Service, and requests the membership credential from the association in the same way. Its credential looks the same as Costa's. Other participants treat both identically.

## What Costa has now

| Item | Purpose |
|---|---|
| A DID | Identifies Costa to every other participant. |
| A Credential Service with a membership credential | Proves membership when asked. |
| A connector | Publishes offers and negotiates contracts. |
| Access to a data plane | Delivers data once a contract exists. |

Costa has not shared any data yet. It is now able to.

## Key takeaways

- Joining has two parts: admission by the governance authority and technical setup by a platform operator or by the participant itself.
- A DID identifies a participant without a central directory.
- A verifiable credential is a signed statement that the participant holds in its Credential Service and presents when needed.
- The issuer is involved when a credential is issued, not each time it is used.

## Go deeper

- [IDSA Rulebook: Dataspace membership](https://kb.internationaldataspaces.org/external/rulebook/106_Dataspace_Membership/) covers membership policies and onboarding.
- [EDC documentation: Identity Hub](https://eclipse-edc.github.io/documentation/for-adopters/identity-hub/) describes the Credential Service component.
- [Design Trust, Credentials, and Dataspace Profiles: Onboarding](../../trust-and-profiles/05-onboarding/) looks at onboarding from the governance side.
- [Set Up a Dataspace Platform: Provision a participant](../../platform-setup/09-provision-a-participant/) shows what the platform does during setup.

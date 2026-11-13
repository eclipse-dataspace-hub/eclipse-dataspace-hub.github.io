---
title: "Design the credentials"
description: "How to decide which credentials a dataspace needs: facts instead of permissions, membership as a common but optional start, the two credentials of the Bike Dataspace, claims, format, and the identifier behind them."
---

The working group's first draft lists nine credentials, from member and supplier to premium member. The association would have to check evidence for each, and every provider would have to learn what each means. The group starts again from the question that a credential answers.

:::note[In this lecture]
- What a credential should state, and what it should not.
- Why a membership credential is a common start and not a requirement.
- The two credentials of the Bike Dataspace, and why two are enough.
- What goes into a credential, and the identifier it is issued to.
:::

## Facts, not permissions

A credential states a fact that an authority verified. It does not grant access to anything.

The group uses one test for every proposal: could the association confirm this from evidence, without knowing what any provider offers? "Hansen holds a waste treatment permit" passes. "Hansen may read Brandt's dismantling data" fails. That is Brandt's decision, and Brandt makes it in a policy.

Two rules follow.

1. **Split a credential where its parts are withdrawn separately.** Recycler status ends with the permit while the membership goes on, so it gets a credential of its own. What a member signed as part of its membership ends with it and can stay in that credential.
2. **Few types.** Every type has a price: a review process, a definition, a renewal, a way to withdraw it, and a term that providers have to learn.

## Which credentials

Most dataspaces start with a **membership credential**: one authority admits participants and confirms it. The Bike Dataspace does this. Every member holds a membership credential, which states one thing: the holder is a member.

This is a common starting point and not a requirement. The software has no concept of membership and checks whatever credentials the profile names. A dataspace can build on other facts instead, such as a company registration or a license from an existing authority, and name the issuers it trusts for each. Nobody admits participants then, and no single act removes one. Decide this first, because onboarding and the end of a participation follow from it.

The Bike Dataspace has two credentials.

| | Membership credential | Recycler credential |
|---|---|---|
| States | The holder is a member, and which data sharing agreements it has accepted, each with its version. | The holder is a licensed recycler, and for which activities. |
| Held by | Every member. | Licensed recyclers only. |
| Presented | With every request. | Only when a contract requires it. |
| A provider can use it | Anywhere, also to decide who sees an offer at all. | As a condition for a contract. |

[Lecture 6](../06-policy-vocabulary/) explains the last two rows. A connector that asks for a credential and does not get it rejects the request, so a credential can be requested routinely only if every member holds one.

A dataspace can also attest accepted agreements in a credential of their own. The Bike Dataspace keeps them inside the membership credential. That is one credential less to issue and withdraw. In return, a membership credential is issued again when a member accepts another agreement or a new version.

## What a credential contains

This is Costa's membership credential, decoded from its signed form:

```json
{
  "@context": ["https://www.w3.org/ns/credentials/v2"],
  "id": "urn:uuid:6513270e-269e-4d37-b2a7-4de452e6b438",
  "type": ["VerifiableCredential", "MembershipCredential"],
  "issuer": "did:web:issuer.bike-dataspace.example:issuer",
  "validFrom": "2026-11-02T09:00:00Z",
  "validUntil": "2027-11-02T09:00:00Z",
  "credentialSubject": [
    {
      "id": "did:web:identity.danube-cloud.example:costa-frames",
      "memberOf": "bike-dataspace",
      "agreements": ["supplier-certificates:1.0"]
    }
  ],
  "credentialStatus": {
    "id": "urn:uuid:d23f0824-128b-4f33-8c5c-7fd0a6a3a450",
    "type": "BitstringStatusListEntry",
    "statusPurpose": "revocation",
    "statusListIndex": "412",
    "statusListCredential": "https://danube-cloud.example/statuslist/9531985d-5d9d-49f8-9818-e811892f902b"
  }
}
```

Each part is a decision.

- **Issuer.** The trust anchor of the dataspace.
- **Subject.** The identifier of the member. Nobody else can present the credential.
- **Claims.** `memberOf` names the dataspace. `agreements` lists every accepted data sharing agreement as use case and version. Keep claims small, and define every allowed value in the profile.
- **Validity.** One year: short enough for a forgotten fact to disappear, long enough for renewal to be routine.
- **Status.** The address where a verifier checks whether the credential was withdrawn. [Lecture 7](../07-credential-lifecycle/) covers revocation.
- **Format.** The profile fixes one of the two combinations of data model and status list that the Decentralized Claims Protocol defines. The group takes `vc20-bssl/jwt`, the default of the EDC Issuer Service at the time of writing. `vc11-sl2021/jwt` suits a dataspace that must stay compatible with older software.

Hansen's recycler credential looks the same, with one claim: `activities`, a list with the allowed values `dismantling` and `material-recovery`.

## The identifier behind the credential

A credential is issued to an identifier. The Bike Dataspace uses `did:web`, which builds the identifier from a domain name:

```text
did:web:identity.danube-cloud.example:costa-frames
did:web:brandt-batteries.example
```

Costa's identifier is on the domain of its host, Danube Cloud. Brandt's is on its own. Two consequences follow:

- Whoever controls the domain controls the identifier. For hosted members that is the operator.
- A member that moves to another operator gets a new identifier and needs new credentials.

The group also decides that an identifier belongs to one dataspace. A company that joins a second one gets a second identifier there, so that credentials and offers stay separate.

## Key takeaways

- A credential states a verified fact and never a permission.
- Create few types, and split a credential where its parts are withdrawn separately.
- A membership credential is a common start and a design choice. A dataspace can build on other verified facts instead.
- Only a credential that every member holds can be requested with every request.
- Fix claims, allowed values, validity, format, and the identifier scheme in the profile.

## Go deeper

- [IDSA Rulebook: Attributes and claims](https://kb.internationaldataspaces.org/external/rulebook/104_Attributes_and_claims/) explains attributes, claims, and trust anchors.
- [W3C Verifiable Credentials Data Model 2.0](https://www.w3.org/TR/vc-data-model-2.0/) defines the structure of a credential.
- [EDC documentation: Issuer Service](https://eclipse-edc.github.io/documentation/for-adopters/issuer-service/) covers credential definitions, formats, and status lists.
- [Set Up a Dataspace Platform: Credentials and the issuer](../../platform-setup/08-credentials-and-the-issuer/) turns these decisions into definitions for the Issuer Service.

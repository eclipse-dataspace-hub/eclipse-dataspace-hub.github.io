---
title: "The dataspace profile"
description: "What a dataspace profile fixes, where each part ends up in the components, why it is a versioned set of files, and how one profile relates to platforms and to other dataspaces."
---

The working group has agreed on its rules in a meeting. Danube Cloud asks for something it can configure. Brandt Batteries, which runs its own connector, asks for the same thing. Meeting minutes will not do. The group needs a technical rulebook that two independent teams can implement and end up with systems that work together.

:::note[In this lecture]
- What a dataspace profile fixes.
- Why the profile is a versioned set of files and not a document.
- Where each part ends up in the components.
- How a profile relates to platforms and to other dataspaces.
:::

## What the profile fixes

A **dataspace profile** is the technical rulebook of a dataspace. It contains every choice that all participants have to make in the same way.

| The profile fixes | For the Bike Dataspace | Where it ends up |
|---|---|---|
| Name and protocol versions | `bike-dataspace`, Dataspace Protocol 2025-1, Decentralized Claims Protocol 1.0 | The dataspace profile of every connector, and the profile that provisioning uses |
| Trusted issuer | `did:web:issuer.bike-dataspace.example:issuer`, for both credential types | The trusted issuers in the connector's dataspace profile |
| Credentials | Membership credential and recycler credential, each valid for one year, in the format `vc20-bssl/jwt` | A credential definition for each type, and the format setting of the Issuer Service |
| Presentation rule | Membership with every request, recycler on demand | A credential scope for each type in every connector |
| Policy terms | `Membership`, `DataSharingAgreement`, and `Recycler` under `https://bike-dataspace.example/policy/` | The check behind each term in every connector, as a policy expression or in code |
| Claims for applications | The `activities` of a recycler | A claim mapping in the data plane, which fills the access token |
| Identifier rule | `did:web`, one identifier for each membership | The identifier that a new member receives. No component stores the rule. |
| Use cases | `supplier-certificates` and `battery-passport-data`, each with interface identifiers and a data sharing agreement | The offers of use-case applications. No platform component reads a use-case definition. |

Everything else stays open on purpose. Offers, partners, and software are each member's choice.

## A set of files, not a document

The group keeps the profile as a directory under version control. No single file is the profile, and no component reads an overview like the table above. Each decision is written in the format of the component that reads it.

The first six rows become objects in the Eclipse components. [Write a dataspace profile](../../platform-setup/06-write-a-dataspace-profile/) shows each of them. The last two rows are rules for people and for applications. They belong in the profile all the same, because every participant has to follow them.

Files have advantages over a PDF. A change is a visible difference that people review. A release is a tag that everyone can refer to. An operator applies the files as they are, so nothing is retyped.

Danube Cloud applies these files to its platform. Brandt's team configures its own connector and Credential Service from the same files. How a term is implemented can differ between the two. What it means cannot, so the profile states every rule in words as well as in a technical form.

If the two installations then disagree, the profile was ambiguous. That is a defect in the profile, and it is fixed there.

## Ownership and change

The association owns the profile, and the working group maintains it. Operators and members that run their own software review each change before it is released, because they have to implement it.

Every release has a version. The group distinguishes two kinds of change:

- **Compatible.** A new use case, a new policy term, a new credential type. Existing members are not affected until they want to use it.
- **Breaking.** A different meaning for a published term, different claims in an existing credential, another credential format, another issuer. These need a migration plan with dates.

One rule has no exception: a published policy term never gets a new meaning. Contract agreements that members have already concluded refer to it.

## Profiles, platforms, and dataspaces

A profile is not a platform, and the two do not come in pairs.

- **One dataspace runs on several platforms.** Danube Cloud's platform and Brandt's own installation both carry the Bike profile. A second operator can join later.
- **One platform can carry several profiles.** If Danube Cloud's customers also join another dataspace, the same platform can serve it next to the first, each with its own protocol settings, trusted issuers, and credentials.

:::caution
Serving several profiles from one connector installation is marked as experimental in the EDC documentation at the time of writing. Check its status before you plan around it.
:::

## Key takeaways

- The dataspace profile fixes every choice that all participants must make the same way, and leaves the rest open.
- Keep it as versioned files in the formats of the components that read them, so that changes are reviewed and nothing is retyped.
- Every platform and every self-hosted participant applies the same profile.
- Adding to a profile is compatible. Changing the meaning of something published is not.

## Go deeper

- [EDC documentation: Dataspace profiles](https://eclipse-edc.github.io/documentation/for-adopters/control-plane/dataspace-profiles/) describes the part of a profile that a connector reads.
- [JAD dataspace profile](https://github.com/eclipse-dataspace-hub/jad/tree/main/charts/jad-dataspace-profile) is a public example of a profile that is applied on top of a platform.
- [Set Up a Dataspace Platform: Write a dataspace profile](../../platform-setup/06-write-a-dataspace-profile/) shows these parts as files, and [Apply the profile](../../platform-setup/07-apply-the-profile/) shows how they reach a platform.

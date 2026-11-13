---
title: "Operate and evolve"
description: "Running a dataspace platform over time: upgrades while components are release candidates, backups, a platform proof, the delay of revocation, and growth."
---

Danube Cloud's platform has members and a hosted application. From here on the work is to keep it correct while everything around it moves.

:::note[In this lecture]
- Upgrades, and what to back up and watch.
- A platform proof that you run after every change.
- How long a revocation takes to reach every verifier.
- What a new use case and a second dataspace mean for the platform.
:::

## Upgrades

At the time of writing the connector and the Identity Hub are release candidates of version 1.0, and the chart is at 0.0.39. Names in the APIs still change between versions.

1. **Pin everything.** Pin the chart version and the image tags. Some defaults in the chart are `latest`.
2. **Upgrade a test installation first**, with the same profile applied, and run the platform proof described below.
3. **After the upgrade**, check that the two seed jobs from lecture 4 did not run, apply the profile again, and run the proof again.

## What to back up and what to watch

| Back up | Because it holds |
|---|---|
| The databases of all services | Offers, agreements, credentials, identity documents, holder records, and the records of provisioning. |
| The secret store | The private keys of every participant, the signing key of the issuer, and the keys that sign tokens. These keys are the identities. |
| The profile repository | The source of everything that lectures 6 and 7 put into the platform. |

Test a restore: can a restored participant present its credential, and can a counterparty verify it?

The chart sends traces, metrics, and logs to a small observability stack of its own. Watch these signals first:

- negotiations and transfers that do not reach a final state;
- credentials close to expiry. A Credential Service renews a credential seven days before it expires by default, and a renewal that fails shows up later as a member that cannot connect to anybody;
- failed lookups of identity documents and status lists, which usually point to DNS or to the gateway.

## A platform proof

A **platform proof** is a scripted check of the whole platform that uses no application. It answers one question: can two participants of this dataspace, on this installation, complete an exchange?

1. Provision two test participants and give both their credentials.
2. Let one publish an offer with a policy term of your profile, here the membership term, and let the other request the catalog.
3. Negotiate a contract and start a transfer.
4. Read the access token, verify it at Siglet, terminate the transfer, and check that the token is now refused.
5. Remove both participants and check what is left.

Run it after every installation, every upgrade, and every change of the profile. It also tells you quickly whether a reported problem lies in the platform or in an application. JAD's end-to-end tests are a public example of such a check.

## Revocation takes time

A revoked credential is not refused everywhere at the same moment. Verifiers download the issuer's status list and keep it in a cache. In the connector the cache is valid for 15 minutes by default. The setting is `edc.iam.credential.revocation.cache.validity`, in milliseconds. Within that window a connector can still accept a credential that the issuer has already revoked.

Agree on the acceptable delay with the association, and set the cache on your connector to match.

A running transfer does not end by itself when a credential is revoked. Its access token is renewed until the transfer is terminated. The Bike Dataspace therefore limits every transfer to one day: applications renew their transfers, and providers end older ones, as [Credentials and claims](../../application/13-credentials-and-claims/) in the application path shows.

## Growth

**A new use case** leaves the platform as it is. Its data sharing agreement is a new value in members' credentials and in providers' policies. If the use case needs a new credential type or policy term, the association adds it to the profile, and you apply the additive change from lecture 7.

**A second dataspace** on the same installation needs care. The connector can serve several profiles side by side, and each participant context is attached to the profiles that it uses. The EDC documentation marks this mode as experimental. The chart, at the time of writing, publishes one profile name in the protocol address of every participant and runs one issuer context. A second installation is therefore the predictable route today.

A company in two dataspaces also needs an answer for its identity: one identifier for both, or one for each dataspace. [Design the credentials](../../trust-and-profiles/04-design-the-credentials/) in the trust path discusses this decision.

## Key takeaways

- Pin versions, upgrade a test installation first, and apply the profile again after every upgrade.
- Back up the databases, the secret store, and the profile repository. The keys in the secret store are the participants' identities.
- A platform proof checks an exchange between two test participants without any application. Run it after every change.
- Revocation reaches verifiers with the delay of the status list cache. Running transfers have to be ended by the provider.

## Go deeper

- [EDC documentation: Observability](https://eclipse-edc.github.io/documentation/for-adopters/observability/) describes health checks, metrics, and tracing of the components.
- [EDC documentation: Dataspace profiles](https://eclipse-edc.github.io/documentation/for-adopters/control-plane/dataspace-profiles/) explains how one runtime serves several profiles.
- [EDC Identity Hub: Credential revocation](https://github.com/eclipse-edc/IdentityHub/blob/main/docs/developer/architecture/issuer/credential-revocation/credential-revocation.md) describes status lists and how they are published.
- [Design Trust, Credentials, and Dataspace Profiles: Credential lifecycle](../../trust-and-profiles/07-credential-lifecycle/) covers expiry, renewal, and revocation as decisions of the governance authority.

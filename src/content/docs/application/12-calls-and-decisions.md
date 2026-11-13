---
title: "Calls and decisions in the application"
description: "What a use-case application checks on every call, what it decides itself with partners, grants, and rules, and how it reacts to failed calls and handles documents."
---

A request from Lindner Bikes reaches Costa's context of the supplier certificate service: please send the ISO 9001 certificate. The token is valid, Lindner is a member, and a contract exists. The service still has to answer the question that matters to Costa. Should Lindner get this certificate? No credential and no policy knows the answer.

:::note[In this lecture]
- The steps every inbound call passes, and what is still open after them.
- Partners, grants, and rules as one way to decide, and what other use cases do.
- How to react to the result of an outbound call, and how to handle documents.
:::

## An inbound call

The supplier certificate service handles every call to its API in the same order.

1. **Check the token.** A missing or invalid token gets `401`. Lecture 10 lists the checks.
2. **Select the tenant.** The audience of the token names the member that is called.
3. **Match the API.** The dataset in the token must belong to the API of this route. Otherwise the call gets `403`.
4. **Identify the caller.** The subject of the token is the calling company.
5. **Decide and answer.**

Put steps 1 to 4 into one component that runs before any route.

After step 4, the caller's identity, its credentials, and the contract are settled. What is still open depends on the use case. For supplier certificates it is three things: whether Costa does business with this company, which certificates it may read, and whether a request needs a person.

## One way to decide: partners and grants

No protocol says how an application answers such questions. The supplier certificate service keeps two records, because its members choose whom they work with and release certificates one by one.

A **partner** is a counterparty that a member has chosen to work with. Requests go to partners, and whether Costa lists Lindner decides how Costa answers. Removing a partner revokes its grants and ends the transfers to it.

A **grant** records that one counterparty may read one certificate, including every later version. The application writes it when Costa shares a certificate with a partner and when a request is fulfilled.

Both are rows in your store. Changing them touches no asset, no policy, and no contract definition.

Without a grant, a read is answered with `404`, exactly as for a certificate that does not exist. A `403` would confirm that it exists. After a grant is revoked, what the counterparty fetched earlier stays on its systems, and the data sharing agreement governs what it may do with it.

## Rules, defaults, and people

In the supplier certificate service, a request that an existing grant covers is fulfilled at once. Every other request is decided in this order.

1. **The caller is not a partner.** The member's default applies. The usual default declines with the reason `not-a-partner`.
2. **The caller is a partner with an automatic rule.** If the rule lists the requested certificate type and a published certificate of that type exists, the application fulfills the request and writes the grant.
3. **Everything else goes to a person.** The request appears in a queue, and a user with the right role fulfills or declines it.

Store with every decision how it was made: by a grant, by a rule, or by a person.

Other use cases need less, or something else. The battery data service in lecture 15 keeps no grant per item: a rule on each record names its audience, which can be a partner, a verified attribute of the caller, or any member. A use case that gives every participant with a contract the same data decides nothing per call.

The connector has two instruments of its own: **partner groups** for policy expressions, and holding a contract request until a person **approves** it. Both decide who gets a contract, not which document a customer reads.

## Outbound calls

Costa's context delivers an answer to Lindner's consumer API. It takes the channel, gets token and endpoint for its flow, and sends the call with the `messageId` of the message.

| Result | Reaction |
|---|---|
| `2xx` | Delivered. Record the outcome. |
| `401` | The token expired or the flow ended. Ask Siglet again and repeat once. After a second `401`, reopen the channel. |
| `403` | The token does not fit this API. Do not repeat. Report a configuration error. |
| `404` | The object does not exist for you. A business answer, so do not repeat. |
| `409` | The message conflicts with the current state. Read the state from the other side and correct your own. |
| `429`, `5xx`, or no answer | Repeat with growing delays and the same `messageId`. |

Repeating is safe because a receiver that sees a `messageId` again returns the first result. After a set number of attempts, park the work and show it to an operator.

## Documents

Certificates are PDF files. Pass a document through as a stream with a size limit. Compare its SHA-256 hash with the hash in the metadata, and discard the file if they differ. Store a revised certificate as a new version next to the previous one. Check the type of a received document and scan it before a person opens it.

## Key takeaways

- An inbound call passes token check, tenant selection, API match, and caller identification before any business logic runs.
- Identity, credentials, and the contract are settled when a call arrives. Business decisions are not.
- How an application decides follows from its use case. Partners and grants suit one where companies choose whom they work with and release items one by one.
- Each result of an outbound call has one defined reaction. Repeating is safe because messages carry an ID.

## Go deeper

- [EDC documentation: Partners and partner groups](https://eclipse-edc.github.io/documentation/for-adopters/control-plane/policy-engine/partners/) describes the connector's own partner records and their use in policy expressions.
- [EDC documentation: Contract negotiation approval](https://eclipse-edc.github.io/documentation/for-adopters/control-plane/policy-engine/negotiation-approval/) describes how a negotiation is held for a manual decision.
- [RFC 9110: HTTP Semantics](https://www.rfc-editor.org/rfc/rfc9110) defines the status codes and which methods are safe to repeat.
- [Design Trust, Credentials, and Dataspace Profiles: Beyond the policy](../../trust-and-profiles/09-beyond-the-policy/) covers what a dataspace should leave to applications.

---
title: "Test and ship"
description: "Three levels of tests for a use-case application, how to use a demonstrator for integration tests, and a checklist for going live."
next: false
---

The supplier certificate service is feature complete. Before the first member uses it, the team has to answer three questions. Does our logic work? Does it work with a real connector? Are we ready to run it?

:::note[In this lecture]
- Three levels of tests and what each one proves.
- How to use a demonstrator for integration tests.
- A checklist for going live.
- What you do not have to test.
:::

## Three levels of tests

| Level | Runs against | Proves |
|---|---|---|
| **Logic** | Fakes of the connector client, the token check, and the event stream | Decisions, protocol states, failure handling, and reactions to events |
| **Integration** | A demonstrator with two participants | Your requests have the right shape, channels open, tokens are accepted, and events arrive |
| **Acceptance** | The target platform with test members | The use case works from one person's screen to another's |

Most tests belong to the first level. Three examples:

- Let the fake connector client return a catalog with no dataset and with two datasets. Let it time out on a contract request, and check that the channel ends up blocked.
- Sign test tokens with a test key. Send one with the wrong audience, an expired one, and one for the other API.
- Replay recorded events twice and in the wrong order. The result must be the same as for one delivery in the right order.

## Integration against a demonstrator

The fakes encode what you believe about the platform. An integration test checks the belief.

The demonstrator JAD follows the same model as the Danube Cloud platform: one installation with several participants, version 5 of the Management API, token exchange, and Siglet. Start it, create two participants, and run your application for both.

1. Publish the offers for both participants.
2. Open the channels in both directions and wait until they are ready.
3. Run one complete exchange: request, answer, download, feedback.
4. Terminate a transfer through the Management API, and watch the channel become stale and recover.
5. Stop your application in the middle of step 3, start it again, and check that nothing is lost or sent twice.

Automate this run. A renamed field in a platform API shows up here first. The [demonstrators](../../demonstrators/) page compares JAD with the Minimum Viable Dataspace, which fits developers who work against their own connector.

## Proving the platform and accepting the application

When an acceptance test fails, the first question is whose defect it is.

A **platform proof** runs without your application. A script creates two participants and performs catalog request, negotiation, transfer, token retrieval, and one call with plain requests. It belongs to the operator. If it fails, your team can stop searching.

An **application acceptance** assumes a proven platform and follows the use case as people experience it.

## A checklist for going live

**Access**

- Every call to a platform API uses a token that was exchanged for that call's participant context and carries the one narrow scope the call needs.
- The operator's registration for your service account lists only the scopes the application uses, and no admin scope.
- Tokens never appear in logs.

**Correctness**

- Publishing offers can run again at any time, and every write in the use-case API handles a repeated message ID.
- A test proves on every route that a token for tenant A cannot read data of tenant B.

**Robustness**

- Every outbound call has a timeout, and retries are limited.

**Operations**

- Logs and stored records contain no tokens and no document contents.
- The versions of the platform APIs you tested against are written down, and you read the release notes before the operator upgrades.
- Monitoring shows the channels by state, the failed rows of the inbox, the parked outbound messages, and the credential states of the members.

## What you do not have to test

You do not test whether the connector implements the Dataspace Protocol correctly, or whether credentials are verified according to the Decentralized Claims Protocol. Technology compatibility kits exist for both protocols.

Your tests start at the Management API and at your own API. Test that your application reacts correctly when a negotiation is terminated. Do not test why the connector terminated it.

The supplier certificate service is fictional, and none of its patterns is a standard. They are what applications of this kind tend to arrive at: an API offer per use case, channels to partners, a use-case protocol in both directions, decisions in the application, and state that survives failures.

## Key takeaways

- Test the logic against fakes, the integration against a demonstrator, and the use case on the target platform.
- A platform proof without your application separates platform defects from application defects.
- Going live requires narrow scopes, repeatable writes, tenant isolation, limits, a complete log, and monitoring.
- Protocol conformance is tested by the compatibility kits, not by your application.

## Go deeper

- [JAD](https://github.com/eclipse-dataspace-hub/jad) is the demonstrator for the platform model, with a request collection and end-to-end tests to start from.
- [Eclipse Dataspace TCK](https://github.com/eclipse-dataspacetck) hosts the technology compatibility kits for the Dataspace Protocol and the Decentralized Claims Protocol.
- [Set Up a Dataspace Platform: Operate and evolve](../../platform-setup/11-operate-and-evolve/) covers the operator's side, including the platform proof and upgrades.
- [Design Trust, Credentials, and Dataspace Profiles](../../trust-and-profiles/) is the path for the team that defines the rules your application follows.

---
title: "Set Up a Dataspace Platform"
description: "The operator path: install a platform that hosts many participants, turn it into a platform for one dataspace with a dataspace profile, and run it."
prev: false
---

This path is for the team that runs the software behind a dataspace. It follows the platform team of **Danube Cloud**, the cloud provider in the fictional [Bike Dataspace](../use-case/). The team installs a platform that hosts many participants, makes it a platform for the Bike Dataspace, brings the first members onto it, and keeps it running. The last lecture changes sides and follows **Brandt Batteries**, which runs its own software.

Two ideas carry the path. The platform is generic: the **Core Platform Distribution** installs a runtime for many participants and contains no dataspace. Everything that belongs to one dataspace is a **dataspace profile**: files that the association of the dataspace publishes and that you apply on top.

The lectures explain how the parts fit and what an operator has to decide. They do not repeat the installation guides and API references of the projects. Each lecture shows the minimal shape of a step and links to the project that documents it in full.

## Who this path is for

- **Platform operators and cloud providers** that host dataspace services for their customers.
- **Platform, DevOps, and SRE engineers** who install and run the components.
- **Teams of a participant that runs its own software.** Lecture 12 is written for you. Lectures 2, 6, 8, and 10 give the background.
- **Architects** who decide what belongs to the platform, to the profile, and to applications.

You should be comfortable with Kubernetes, Helm, and HTTP APIs. You do not need to know the internals of the Eclipse Dataspace Components.

## What you will be able to do

After this path you can:

- choose between hosting participants, letting them host themselves, and a mix of both;
- name the components of the Core Platform Distribution and say what it leaves out on purpose;
- prepare a cluster so that identifiers and public endpoints resolve from every side;
- give jobs and applications access to platform APIs without passwords, with the narrowest scope that works;
- read the dataspace profile that the association publishes, add what is your own, and apply it so that the run can be repeated;
- configure the issuer and explain how a member receives its credentials;
- provision a participant, check the result, and say what removal involves;
- connect applications to the platform through Siglet and host a use-case application for many members;
- upgrade, back up, and test the platform, and say what a self-hosted participant needs from you.

## Lectures

| # | Lecture | What it covers |
|---|---|---|
| 1 | [Operating models](./01-operating-models/) | Who can run a participant's software, and what an operator takes on. |
| 2 | [Platform and profile](./02-platform-and-profile/) | The generic runtime, the dataspace profile, and the order of work. |
| 3 | [Prepare the cluster](./03-prepare-the-cluster/) | Gateway, public names, state, and the defaults that are for development only. |
| 4 | [Install the core platform](./04-install-the-core-platform/) | The install command, the values to set, the routes, and a first check. |
| 5 | [Access and workload identity](./05-access-and-workload-identity/) | Token exchange, scopes, and which workload gets which mapping. |
| 6 | [Write a dataspace profile](./06-write-a-dataspace-profile/) | The profile that the association publishes: a directory with one part per component that reads it. |
| 7 | [Apply the profile](./07-apply-the-profile/) | The calls, how to make them repeatable, and how to change a profile later. |
| 8 | [Credentials and the issuer](./08-credentials-and-the-issuer/) | Definitions, holders, issuance, revocation, and the issuer's identifier. |
| 9 | [Provision a participant](./09-provision-a-participant/) | Two calls and a poll, the member's credential request, checks, and removal. |
| 10 | [Data planes and use-case applications](./10-data-planes-and-applications/) | Siglet as the token half of the data plane, and what a hosted application for many members needs from the platform. |
| 11 | [Operate and evolve](./11-operate-and-evolve/) | Upgrades, backups, a platform proof, revocation, and growth. |
| 12 | [Self-hosted participants](./12-self-hosted-participants/) | What a participant that runs its own software needs, and how to check that it interoperates. |

Lectures 1 and 2 give the model. Lectures 3 to 5 produce a running, empty platform. Lectures 6 to 8 make it a platform for one dataspace. Lectures 9 and 10 bring participants, data planes, and applications. Lectures 11 and 12 cover operations and the participant that hosts itself.

## Before you start

If dataspaces are new to you, read [A Dataspace Use Case](../use-case/) first. It introduces the Bike Dataspace, the companies, and the building blocks that this path installs.

To see the two layers of this path running on a local cluster, use JAD. The [demonstrators](../demonstrators/) page explains what it shows and how it differs from a production platform.

## What this path leaves out

- What an application does with the platform, from publishing an offer to serving data, belongs to [Build a Dataspace Application](../application/).
- Which credentials, policy terms, and rules a dataspace should have belongs to [Design Trust, Credentials, and Dataspace Profiles](../trust-and-profiles/). This path takes those decisions as given and shows where they go.
- The path does not give instructions for a particular cloud, and it is not a hardening guide. It tells you which defaults are for development only. Securing a production installation remains your work.

---
title: Demonstrators
description: Runnable end-to-end dataspaces for learning. Compare JAD and the Minimum Viable Dataspace, and find the samples and related material around them.
---

A demonstrator is a complete dataspace that you start on your own machine. It lets you watch real components exchange real messages before you plan anything of your own.

The Eclipse Dataspace Hub maintains two demonstrators. They show two different ways of deploying the same technology, so the first decision is which model you want to study.

:::caution
Demonstrators are learning environments. They use fixed development passwords, in-memory or unprotected secret stores, and local hostnames. Do not base a production installation on them.
:::

## Which one to start with

| | JAD: Just Another Demonstrator | Minimum Viable Dataspace (MVD) |
|---|---|---|
| **Deployment model** | One platform hosts many participants ("virtual" mode) | Each company runs its own connector ("classic" mode) |
| **Shows** | How a service provider onboards participants and how they then share data | How two connectors prove their identity to each other and exchange data |
| **Participants** | Created by you during the walkthrough, through the Connector Fabric Manager | A provider and a consumer, both set up for you |
| **Main components** | Virtual EDC Connector, Identity Hub, Issuer Service, Connector Fabric Manager, Siglet, jwtlet, NATS, Vault, PostgreSQL | Per company: EDC Connector, Identity Hub, data plane, Vault, PostgreSQL. Shared: one Issuer Service and one Keycloak for API access |
| **Data exchanged** | A certificate file that the provider uploads | Sample JSON from a demo API |
| **Management API** | Version 5, scoped to a participant | Version 4 |
| **You need** | KinD, Docker, kubectl, Helm, Java 17 or later, Bruno. macOS or Linux | KinD, Docker, Helm, JDK 17 or later, Bruno |
| **Choose it if you** | Plan to operate a platform, or will build on one | Plan to host your own connector, or want to study the protocols in isolation |
| **Continues in** | [Set Up a Dataspace Platform](../platform-setup/) | [Self-hosted participants](../platform-setup/12-self-hosted-participants/) |

If you have no preference, start with JAD. It reflects where the ecosystem is heading, and the platform and application paths in this hub follow its model.

## JAD: Just Another Demonstrator

[github.com/eclipse-dataspace-hub/jad](https://github.com/eclipse-dataspace-hub/jad)

JAD shows a dataspace offered as a service. It installs in two steps, and the two steps mirror an important separation:

1. The **Core Platform Distribution**, a Helm chart from the Connector Fabric Manager project. It contains the generic platform and no dataspace.
2. The **JAD dataspace profile**, a small chart in the JAD repository. It adds the credentials, policies, and data plane of the demo dataspace.

The walkthrough then takes you through the roles of a real deployment:

- as **operator**, you obtain a token and create two tenants through the Connector Fabric Manager, and watch it provision an identity, a Credential Service, and a connector context for each;
- as **provider**, you publish an asset with a membership policy and upload a certificate;
- as **consumer**, you request the catalog, negotiate a contract, start a transfer, and download the certificate.

Useful entry points in the repository:

- [README](https://github.com/eclipse-dataspace-hub/jad/blob/main/README.md) for installation and the walkthrough.
- [Token exchange](https://github.com/eclipse-dataspace-hub/jad/blob/main/docs/token-exchange.md) for how API access is secured.
- [`charts/jad-dataspace-profile`](https://github.com/eclipse-dataspace-hub/jad/tree/main/charts/jad-dataspace-profile) for a complete example of a dataspace profile.

JAD changes quickly. Where the README and the charts differ, the charts and the end-to-end tests show the current state.

## Minimum Viable Dataspace

[github.com/eclipse-dataspace-hub/MinimumViableDataspace](https://github.com/eclipse-dataspace-hub/MinimumViableDataspace)

MVD shows the classic arrangement: "Provider Corp" and "Consumer Corp" each run a complete set of components in their own Kubernetes namespace, and a shared issuer provides their credentials.

Everything is prepared when the cluster starts: participants, credentials, assets, policies, and offers. You go straight to the exchange: request the catalog, negotiate, transfer, download. The setup includes one offer that the consumer cannot obtain, so you can see a policy decline a request.

MVD is the better choice when you want to read the Dataspace Protocol and Decentralized Claims Protocol messages between two independent parties without a platform layer around them.

- [README](https://github.com/eclipse-dataspace-hub/MinimumViableDataspace/blob/main/README.md) for installation and the request collection.

## Around the demonstrators

**Core Platform Distribution.** The platform chart that JAD builds on is a project of its own and can be installed without JAD. See [eclipse-cfm/core-platform-distribution](https://github.com/eclipse-cfm/core-platform-distribution) and the lecture [Install the core platform](../platform-setup/04-install-the-core-platform/).

**EDC Samples.** [eclipse-edc/Samples](https://github.com/eclipse-edc/Samples) teaches the connector one feature at a time: runtime basics, policies, the federated catalog, and advanced topics. Use them when you want to extend or embed EDC itself.

**Hub repositories in preparation.** The Eclipse Dataspace Hub organization has further repositories that are being set up and do not have usable content yet:

| Repository | Intended content |
|---|---|
| [samples](https://github.com/eclipse-dataspace-hub/samples) | Samples that span several Eclipse dataspace projects |
| [file-sharing-app](https://github.com/eclipse-dataspace-hub/file-sharing-app) | A use-case application for file sharing, built with the data plane SDK |
| [jad-ui](https://github.com/eclipse-dataspace-hub/jad-ui) | A user interface for JAD with operator and participant roles |
| [redline](https://github.com/eclipse-dataspace-hub/redline) | A backend for tenant and participant management with the Connector Fabric Manager |
| [edc-administration-api-client](https://github.com/eclipse-dataspace-hub/edc-administration-api-client) | A client for the administration APIs of the connector, Identity Hub, and Issuer Service |

**A community tutorial.** [Bootstrap a dataspace from scratch](https://github.com/Metaform/profile-edc-cx/tree/main/tutorial) builds a fictional dataspace step by step on the Core Platform Distribution, including the profile design. It is not an Eclipse project, and it is a good companion to the platform and trust paths.

## After the demonstrator

| You ran | You saw | Go deeper with |
|---|---|---|
| JAD, operator steps | Tenants, participant profiles, provisioning | [Access and workload identity](../platform-setup/05-access-and-workload-identity/), [Provision a participant](../platform-setup/09-provision-a-participant/) |
| JAD, provider and consumer steps | Assets, policies, catalog, negotiation, transfer | [Build a Dataspace Application](../application/) |
| JAD, profile chart | Credential definitions, policy expressions, scopes | [Write a dataspace profile](../platform-setup/06-write-a-dataspace-profile/), [Apply the profile](../platform-setup/07-apply-the-profile/), [Design Trust, Credentials, and Dataspace Profiles](../trust-and-profiles/) |
| MVD | Two independent connectors, credential presentation | [Self-hosted participants](../platform-setup/12-self-hosted-participants/), [Credentials and claims](../application/13-credentials-and-claims/) |
